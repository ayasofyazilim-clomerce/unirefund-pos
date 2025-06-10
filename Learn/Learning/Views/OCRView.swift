//
//  OCRView.swift
//  Learning
//
//  Created by Eren Odacı on 4.06.2025.
//

import SwiftUI
import UIKit

struct OCRView: UIViewControllerRepresentable {
    func makeUIViewController(context: Context) -> OCR {
        return OCR()
    }

    func updateUIViewController(_ uiViewController: OCR, context: Context) {
        // Gerekirse güncelleme kodu yazılır
    }
}
