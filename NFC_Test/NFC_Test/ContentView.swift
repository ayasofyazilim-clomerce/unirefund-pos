import SwiftUI
import CoreNFC

struct ContentView: View {
    @State private var isScanning = false
    @State private var mrzInfo: MRZInfo?
    @State private var errorMessage: String?

    let bacHandler: BACSessionHandler

    var body: some View {
        VStack(spacing: 20) {
            if let info = mrzInfo {
                Text("Ad: \(info.firstName)")
                Text("Soyad: \(info.lastName)")
                Text("Doğum Tarihi: \(info.birthDate)")
                Text("Pasaport No: \(info.documentNumber)")
            } else if let error = errorMessage {
                Text(error)
                    .foregroundColor(.red)
            } else {
                Text("Kimlik kartını okutun")
            }

            Button(action: {
                guard !isScanning else { return }
                errorMessage = nil
                mrzInfo = nil
                isScanning = true

                bacHandler.startSession()
                bacHandler.onTagReady = { tag in
                    bacHandler.readDG1(tag: tag) { data in
                        if let data = data {
                            let info = MRZParser.parseDG1(data: data)
                            DispatchQueue.main.async {
                                if let info = info {
                                    self.mrzInfo = info
                                } else {
                                    self.errorMessage = "DG1 verisi çözümlenemedi."
                                }
                                self.isScanning = false
                            }
                        } else {
                            DispatchQueue.main.async {
                                self.errorMessage = "DG1 okunamadı."
                                self.isScanning = false
                            }
                        }
                    }
                }
            }) {
                Text(isScanning ? "Tarama Devam Ediyor..." : "NFC Tara")
                    .frame(minWidth: 150, minHeight: 44)
                    .background(isScanning ? Color.gray : Color.blue)
                    .foregroundColor(.white)
                    .cornerRadius(8)
            }
            .disabled(isScanning)
        }
        .padding()
    }
}
