//
//  OCR.swift
//  Learning
//
//  Created by Eren Odacı on 4.06.2025.
//

import UIKit
import Vision

class OCR: UIViewController {
    override func viewDidLoad() {
        super.viewDidLoad()

        // Görseli yükle (Assets'te "test.jpg" olmalı)
        guard let image = UIImage(named: "test")?.cgImage else {
            print("Görsel bulunamadı.")
            return
        }

        // 1. Adım: Belgeyi algıla
        let documentRequest = VNDetectDocumentSegmentationRequest { request, error in
            if let error = error {
                print("Belge tespiti hatası: \(error)")
                return
            }

            guard let results = request.results as? [VNRectangleObservation],
                     let document = results.first else {
                   print("Belge bulunamadı.")
                   return
               }

            // 2. Adım: Belgenin sınırlarını al (normalize koordinatlar)
            let boundingBox = document.boundingBox

            // 3. Adım: OCR (Yazı tanıma) isteği oluştur
            let textRequest = VNRecognizeTextRequest { (request, error) in
                if let error = error {
                    print("OCR hatası: \(error)")
                    return
                }

                guard let observations = request.results as? [VNRecognizedTextObservation] else {
                    print("OCR sonucu yok.")
                    return
                }

                for observation in observations {
                    if let bestCandidate = observation.topCandidates(1).first {
                        print("Okunan metin: \(bestCandidate.string)")
                    }
                }
            }

            textRequest.recognitionLevel = .accurate
            textRequest.usesLanguageCorrection = true

            // 4. Adım: OCR işlemini çalıştır
            let handler = VNImageRequestHandler(cgImage: image, options: [:])
            do {
                try handler.perform([textRequest])
            } catch {
                print("OCR isteği çalıştırılamadı: \(error)")
            }
        }

        // 5. Adım: Belge tespit isteğini çalıştır
        let handler = VNImageRequestHandler(cgImage: image, options: [:])
        DispatchQueue.global(qos: .userInitiated).async {
            do {
                try handler.perform([documentRequest])
            } catch {
                print("Belge tespiti çalıştırılamadı: \(error)")
            }
        }
    }
}
