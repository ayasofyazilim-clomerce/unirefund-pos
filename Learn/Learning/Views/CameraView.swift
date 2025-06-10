//
//  CameraView.swift
//  Learning
//
//  Created by Eren Odacı on 4.06.2025.
//

import SwiftUI
import UIKit

struct CameraView: UIViewControllerRepresentable {
    func makeUIViewController(context: Context) -> CameraViewController {
        return CameraViewController()
    }

    func updateUIViewController(_ uiViewController: CameraViewController, context: Context) {}
}
 
