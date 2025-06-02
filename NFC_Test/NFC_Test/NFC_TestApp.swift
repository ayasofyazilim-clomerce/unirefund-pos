import SwiftUI

@main
struct NFC_TestApp: App {
    var body: some Scene {
            WindowGroup {
                let mrzLine1 = "I<TURA40C059956<17312320436<<<"
                let mrzLine2 = "9906013M3212242TUR<<<<<<<<<<<0"
                let mrzLine3 = "ODACI<<AHMET<EREN<<<<<<<<<<<<<"
                let mrzExample = mrzLine1 + mrzLine2 + mrzLine3

                if let keys = BACKeyGenerator.deriveKeys(fromMRZ: mrzExample) {
                    ContentView(bacHandler: BACSessionHandler(kEnc: keys.kEnc, kMac: keys.kMac))
                } else {
                    Text("MRZ bilgisi hatalı, anahtarlar oluşturulamadı.")
                }
            }
        }
}
