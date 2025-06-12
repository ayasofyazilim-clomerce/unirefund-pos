//
//  CameraView.swift
//  Learning
//
//  Created by Eren Odacı on 4.06.2025.
//

import SwiftUI
import UIKit
import MRZParser

struct CameraView: UIViewControllerRepresentable {
    @Binding var mrzResult: MRZResult?
    func makeUIViewController(context: Context) -> CameraViewController {
        let vc = CameraViewController()
        vc.onOCRCompletion = { result in
            mrzResult = result
        }
        return vc
    }

    func updateUIViewController(_ uiViewController: CameraViewController, context: Context) {}
}
 
