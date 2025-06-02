import Foundation
import CryptoKit

struct BACKeys {
    let kEnc: Data
    let kMac: Data
}

class BACKeyGenerator {
    static func deriveKeys(fromMRZ mrz: String) -> BACKeys? {
        guard mrz.count == 90 else { return nil }
        let mrzData = mrz.data(using: .ascii)!

        // BAC key seed: MRZ'deki 16 karakterden oluşur
        let keySeed = mrzData.prefix(16)

        // SHA-1 hash
        let sha1 = Insecure.SHA1.hash(data: keySeed)
        var hashData = Data(sha1)

        // kEnc and kMac oluşturma (ilk 16 ve sonraki 16 byte)
        let kEnc = hashData.prefix(16)
        let kMac = hashData.dropFirst(16).prefix(16)

        return BACKeys(kEnc: kEnc, kMac: kMac)
    }
}
