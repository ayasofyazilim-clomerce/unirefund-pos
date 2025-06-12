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
    @State private var mrzResult = ""
    
    var body: some View {
        NavigationStack {
            VStack(alignment: .leading, spacing: 12 ) {
                
            }}
        
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
