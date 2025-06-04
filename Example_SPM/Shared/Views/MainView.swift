//
//  MainView.swift
//  NFCPassportReaderApp
//
//  Created by Andy Qua on 04/06/2019.
//  Copyright © 2019 Andy Qua. All rights reserved.
//

import SwiftUI
import OSLog
import Combine
import NFCPassportReader
import UniformTypeIdentifiers
import Vision
import VisionKit

let appLogging = Logger(subsystem: Bundle.main.bundleIdentifier!, category: "app")

struct ImagePicker: UIViewControllerRepresentable {
    var sourceType: UIImagePickerController.SourceType = .camera
    var completion: (UIImage) -> Void

    func makeUIViewController(context: Context) -> UIImagePickerController {
        let picker = UIImagePickerController()
        picker.sourceType = sourceType
        picker.delegate = context.coordinator
        return picker
    }

    func updateUIViewController(_ uiViewController: UIImagePickerController, context: Context) {}

    func makeCoordinator() -> Coordinator {
        Coordinator(self)
    }

    class Coordinator: NSObject, UINavigationControllerDelegate, UIImagePickerControllerDelegate {
        let parent: ImagePicker

        init(_ parent: ImagePicker) {
            self.parent = parent
        }

        func imagePickerController(_ picker: UIImagePickerController, didFinishPickingMediaWithInfo info: [UIImagePickerController.InfoKey : Any]) {
            picker.dismiss(animated: true)

            if let image = info[.originalImage] as? UIImage {
                parent.completion(image)
            }
        }

        func imagePickerControllerDidCancel(_ picker: UIImagePickerController) {
            picker.dismiss(animated: true)
        }
    }
}


struct MainView : View {
    @EnvironmentObject var settings: SettingsStore
    @Environment(\.colorScheme) var colorScheme
    @State private var showOCRCamera = false
    @State private var showingAlert = false
    @State private var showingSheet = false
    @State private var showDetails = false
    @State private var alertTitle : String = ""
    @State private var alertMessage : String = ""
    @State private var showSettings : Bool = false
    @State private var showScanMRZ : Bool = false
    @State private var showSavedPassports : Bool = false
    @State private var gettingLogs : Bool = false

    @State var page = 0
    
    @State var bgColor = Color( UIColor.systemBackground )
    
    private let passportReader = PassportReader()

    var body: some View {
        NavigationView {
            ZStack {
                NavigationLink( destination: SettingsView(), isActive: $showSettings) { Text("") }
                NavigationLink( destination: PassportView(), isActive: $showDetails) { Text("") }
                NavigationLink( destination: StoredPassportView(), isActive: $showSavedPassports) { Text("") }

                VStack {
                    HStack {
                        Spacer()
                        
                    }
                    MRZEntryView()
                    Button(action: {
                        self.scanPassport()
                    }) {
                        Text("Scan Passport")
                            .font(.largeTitle)
                           
                    }
                    Button(action: {
                        self.showOCRCamera = true
                    }) {
                        Text("Scan with OCR")
                            .font(.title3)
                    }
                    .sheet(isPresented: $showOCRCamera) {
                        ImagePicker(sourceType: .camera) { image in
                            performOCR(from: image)
                        }
                    }
                    Spacer()
                  
                }
                
                if gettingLogs {
                    VStack {
                        VStack(alignment:.center) {
                            Text( "Retrieving logs....." )
                                .font(.title)
                                .frame(maxWidth:.infinity, maxHeight:150)
                        }
                        .shadow(radius: 10)
                        .background(.white)
                        .cornerRadius(20) /// make the background rounded
                        .overlay( /// apply a rounded border
                            RoundedRectangle(cornerRadius: 20)
                                .stroke(.gray, lineWidth: 2)
                        )
                        .padding()
                        Spacer()
                        
                       
                        
                    }
                }
            }
            .navigationBarTitle("Passport details", displayMode: .automatic)
            .toolbar {
                ToolbarItem(placement: .primaryAction) {
                    Menu {
                        Button(action: {showSettings.toggle()}) {
                            Label("Settings", systemImage: "gear")
                        }
                        Button(action: {self.showSavedPassports.toggle()}) {
                            Label("Show saved passports", systemImage: "doc")
                        }
                    } label: {
                        Image(systemName: "gear")
                            .foregroundColor(Color.secondary)
                    }
                }
            }
            .alert(isPresented: $showingAlert) {
                    Alert(title: Text(alertTitle), message:
                        Text(alertMessage), dismissButton: .default(Text("Got it!")))
            }
            .background(colorScheme == .dark ? Color.black : Color.white)
        }
    }
}



// MARK: Action Functions
extension MainView {

    func shareLogs() {
        gettingLogs = true
        Task {
            hideKeyboard()
            PassportUtils.shareLogs()
            gettingLogs = false
        }
    }

    func performOCR(from image: UIImage) {
        guard let cgImage = image.cgImage else {
            print("Failed to get CGImage from UIImage")
            return
        }

        let request = VNRecognizeTextRequest { request, error in
            if let err = error {
                print("OCR error: \(err.localizedDescription)")
                return
            }

            guard let observations = request.results as? [VNRecognizedTextObservation] else {
                print("No text found")
                return
            }

            for observation in observations {
                if let topCandidate = observation.topCandidates(1).first {
                    print("Detected text: \(topCandidate.string)")
                    // İstersen buradan tanımlı MRZ, TCKN, vb. bilgiyi çekebilirsin
                }
            }
        }

        request.recognitionLevel = .accurate
        request.recognitionLanguages = ["tr-TR", "en-US"]

        let handler = VNImageRequestHandler(cgImage: cgImage, options: [:])
        DispatchQueue.global(qos: .userInitiated).async {
            do {
                try handler.perform([request])
            } catch {
                print("Failed to perform OCR: \(error.localizedDescription)")
            }
        }
    }

    
    func scanPassport( ) {
        lastPassportScanTime = Date.now

        hideKeyboard()
        self.showDetails = false
        
        let df = DateFormatter()
        df.timeZone = TimeZone(secondsFromGMT: 0)
        df.dateFormat = "YYMMdd"
        
        let pptNr = settings.passportNumber
        let dob = df.string(from:settings.dateOfBirth)
        let doe = df.string(from:settings.dateOfExpiry)
        let useExtendedMode = settings.useExtendedMode

        let passportUtils = PassportUtils()
        let mrzKey = passportUtils.getMRZKey( passportNumber: pptNr, dateOfBirth: dob, dateOfExpiry: doe)

        // Set the masterListURL on the Passport Reader to allow auto passport verification
        let masterListURL = Bundle.main.url(forResource: "masterList", withExtension: ".pem")!
        passportReader.setMasterListURL( masterListURL )
        
        // Set whether to use the new Passive Authentication verification method (default true) or the old OpenSSL CMS verifiction
        passportReader.passiveAuthenticationUsesOpenSSL = !settings.useNewVerificationMethod
        
        // If we want to read only specific data groups we can using:
//        let dataGroups : [DataGroupId] = [.COM, .SOD, .DG1, .DG2, .DG7, .DG11, .DG12, .DG14, .DG15]
//        passportReader.readPassport(mrzKey: mrzKey, tags:dataGroups, completed: { (passport, error) in
        
        appLogging.error( "Using version \(UIApplication.version)" )
        
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
                let passport = try await passportReader.readPassport( mrzKey: mrzKey, useExtendedMode: useExtendedMode,  customDisplayMessage:customMessageHandler)
                
                if let _ = passport.faceImageInfo {
                    print( "Got face Image details")
                }
                
                if settings.savePassportOnScan {
                    // Save passport
                    let dict = passport.dumpPassportData(selectedDataGroups: DataGroupId.allCases, includeActiveAuthenticationData: true)
                    if let data = try? JSONSerialization.data(withJSONObject: dict, options: .prettyPrinted) {
                        
                        let savedPath = FileManager.cachesFolder.appendingPathComponent("\(passport.documentNumber).json")
                        
                        try? data.write(to: savedPath, options: .completeFileProtection)
                    }
                }
                
                DispatchQueue.main.async {
                    self.settings.passport = passport
                    self.showDetails = true
                }
            } catch {
                self.alertTitle = "Oops"
                self.alertTitle = error.localizedDescription
                self.showingAlert = true

            }
        }
    }
}

//MARK: PreviewProvider
#if DEBUG
struct ContentView_Previews : PreviewProvider {

    static var previews: some View {
        let settings = SettingsStore()
        
        return Group {
            MainView()
                .environmentObject(settings)
                .environment( \.colorScheme, .light)
            MainView()
                .environmentObject(settings)
                .environment( \.colorScheme, .dark)
        }
    }
}
#endif



