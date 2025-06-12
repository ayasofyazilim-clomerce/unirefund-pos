//
//  ContentView.swift
//  Learning
//
//  Created by Eren Odacı on 4.06.2025.
//

import SwiftUI
import MRZParser
import NFCPassportReader

struct ContentView: View {
    @State private var isSet = false
    @State private var goToScanView = false
    @State private var mrzResult:MRZResult? = nil
    @State private var nfcSuccess = false
    @State private var passport: NFCPassportModel?
    private let passportReader = PassportReader()
    
    
    var body: some View {
        NavigationStack {
            VStack(alignment: .leading, spacing: 12 ) {
                StepButton(isSet: mrzResult != nil,
                           isDisabled: false,
                           stepNumber: "Adım 1",
                           stepTitle: "Kimlik / Pasaport Taratma") {
                    goToScanView = true
                }.navigationDestination(isPresented: $goToScanView) {
                    CameraView(mrzResult:$mrzResult)
                }
                StepButton(isSet: passport != nil,
                           isDisabled: mrzResult == nil,
                           stepNumber: "Adım 2",
                           stepTitle: "NFC ile Doğrulama"){
                    self.scanPassport()
                }.navigationDestination(isPresented: $nfcSuccess) {
                    PassportSummaryView(passport: $passport)
                }
            }
        }
    }
    
    func scanPassport() {
        let df = DateFormatter()
        df.timeZone = TimeZone(secondsFromGMT: 0)
        df.dateFormat = "YYMMdd"
        
        let pptNr = mrzResult?.documentNumber ?? ""
        let dob = mrzResult?.birthdate.map { df.string(from: $0) } ?? "Bilinmiyor"
        let doe = mrzResult?.expiryDate.map { df.string(from: $0) } ?? "Bilinmiyor"
        let useExtendedMode = false
  
        let passportUtils = PassportUtils()
        let mrzKey = passportUtils.getMRZKey( passportNumber: pptNr, dateOfBirth: dob, dateOfExpiry: doe)

        // Set the masterListURL on the Passport Reader to allow auto passport verification
        let masterListURL = Bundle.main.url(forResource: "masterList", withExtension: ".pem")!
        passportReader.setMasterListURL( masterListURL )

        passportReader.passiveAuthenticationUsesOpenSSL = true
        
        // If we want to read only specific data groups we can using:
//        let dataGroups : [DataGroupId] = [.COM, .SOD, .DG1, .DG2, .DG7, .DG11, .DG12, .DG14, .DG15]
//        passportReader.readPassport(mrzKey: mrzKey, tags:dataGroups, completed: { (passport, error) in
         
        
        Task {
            let customMessageHandler : (NFCViewDisplayMessage)->String? = { (displayMessage) in
                switch displayMessage {
                    case .requestPresentPassport:
                        return "Hold your iPhone near an NFC enabled passport."
                    default:
                        // Return nil for all other messages so we use the provided default
                        return nil
                }
            }
            
            do {
                self.passport = try await passportReader.readPassport( mrzKey: mrzKey, useExtendedMode: useExtendedMode,  customDisplayMessage:customMessageHandler)
                
                if let _ = passport!.faceImageInfo {
                    print( "Got face Image details")
                }
                nfcSuccess = true
            } catch {
                print(error.localizedDescription)

            }
        }
    }
}

struct BottomSheetView: View {
    var body: some View {
        VStack {
            Text("Kamera açıldı")
                .font(.title)
                .padding()
            Spacer()
        }
        .background(Color(.systemBackground))
    }
}



#Preview {
    ContentView()
}
