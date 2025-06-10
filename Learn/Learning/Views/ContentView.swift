//
//  ContentView.swift
//  Learning
//
//  Created by Eren Odacı on 4.06.2025.
//

import SwiftUI

struct ContentView: View {
    @State private var showSheet = false
    @State private var isSet = false
    @State private var step1Completed = false
    @State private var step2Completed = false
    @State private var goToScanView = false
    
    var body: some View {
        NavigationStack {
            VStack(alignment: .leading, spacing: 12 ) {
                StepButton(isSet: true,
                           stepNumber: "Adım 1",
                           stepTitle: "Kimlik / Pasaport Taratma") {
                    goToScanView = true
                }.navigationDestination(isPresented: $goToScanView) {
                    OCRView()
                    
                }
                
                StepButton(isSet: step2Completed,
                           stepNumber: "Adım 2",
                           stepTitle: "NFC ile Doğrulama") {
                    print("hoppa")
                }
            }
            .sheet(isPresented: $showSheet, onDismiss: {
                step1Completed.toggle()
            }) {
                BottomSheetView()
                    .presentationDetents([.fraction(0.5)]) // ekranın %50'si kadar
                    .presentationDragIndicator(.visible) // yukarıda drag çubuğu
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
