import Foundation
import CoreNFC

class BACSessionHandler: NSObject, NFCTagReaderSessionDelegate {    private let kEnc: Data
    private let kMac: Data

    private var session: NFCTagReaderSession?
    var onTagReady: ((NFCISO7816Tag) -> Void)?

    init(kEnc: Data, kMac: Data) {
        self.kEnc = kEnc
        self.kMac = kMac
        super.init()
    }

    func startSession() {
        session = NFCTagReaderSession(pollingOption: .iso14443, delegate: self, queue: nil)
        session?.alertMessage = "Kimlik kartını okutun"
        session?.begin()
    }

    func tagReaderSessionDidBecomeActive(_ session: NFCTagReaderSession) { }

    func tagReaderSession(_ session: NFCTagReaderSession, didInvalidateWithError error: Error) {
        print("Session hata: \(error.localizedDescription)")
    }

    func tagReaderSession(_ session: NFCTagReaderSession, didDetect tags: [NFCTag]) {
        guard let firstTag = tags.first else {
            session.invalidate(errorMessage: "Tag bulunamadı")
            return
        }

        session.connect(to: firstTag) { [weak self] error in
            if let error = error {
                session.invalidate(errorMessage: "Tag bağlanamadı: \(error.localizedDescription)")
                return
            }

            if case let NFCTag.iso7816(tag) = firstTag {
                DispatchQueue.main.async {
                    self?.onTagReady?(tag)
                }
            } else {
                session.invalidate(errorMessage: "Desteklenmeyen tag tipi")
            }
        }
    }

    func readDG1(tag: NFCISO7816Tag, completion: @escaping (Data?) -> Void) {
        let selectDG1 = NFCISO7816APDU(instructionClass: 0x00,
                                      instructionCode: 0xA4,
                                      p1Parameter: 0x02,
                                      p2Parameter: 0x0C,
                                      data: Data([0x01, 0x01]),
                                      expectedResponseLength: 256)

        tag.sendCommand(apdu: selectDG1) { (_, sw1, sw2, error) in
            guard sw1 == 0x90 && sw2 == 0x00 else {
                print("DG1 dosyası seçilemedi. sw1: \(sw1), sw2: \(sw2)")
                completion(nil)
                return
            }

            var fullData = Data()
            var offset: Int = 0

            func readNextChunk() {
                let maxChunkSize = 0xFF
                let p1 = UInt8((offset >> 8) & 0xFF)
                let p2 = UInt8(offset & 0xFF)

                let readAPDU = NFCISO7816APDU(instructionClass: 0x00, instructionCode: 0xB0,
                                              p1Parameter: p1, p2Parameter: p2,
                                              data: Data(), expectedResponseLength: maxChunkSize)

                tag.sendCommand(apdu: readAPDU) { (data, sw1, sw2, error) in
                    guard sw1 == 0x90 && sw2 == 0x00 else {
                        if sw1 == 0x6C {
                            let expectedLength = Int(sw2)
                            let correctedAPDU = NFCISO7816APDU(instructionClass: 0x00, instructionCode: 0xB0,
                                                               p1Parameter: p1, p2Parameter: p2,
                                                               data: Data(), expectedResponseLength: expectedLength)
                            tag.sendCommand(apdu: correctedAPDU) { (correctedData, sw1c, sw2c, error) in
                                if sw1c == 0x90 && sw2c == 0x00 {
                                    fullData.append(correctedData)
                                    offset += correctedData.count
                                    readNextChunk()
                                } else {
                                    completion(fullData)
                                }
                            }
                            return
                        }

                        completion(fullData)
                        return
                    }

                    fullData.append(data)
                    if data.count < maxChunkSize {
                        completion(fullData)
                    } else {
                        offset += data.count
                        readNextChunk()
                    }
                }
            }

            readNextChunk()
        }
    }
}
