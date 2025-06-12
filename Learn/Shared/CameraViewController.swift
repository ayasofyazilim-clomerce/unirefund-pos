import UIKit
import AVFoundation
import Vision
import MRZParser

class CameraViewController: UIViewController {
    
    var onOCRCompletion: ((MRZResult) -> Void)?
    private var captureSession = AVCaptureSession()
    private var previewLayer: AVCaptureVideoPreviewLayer!
    private var rectangleLayer = CAShapeLayer()
    private var textRequest = VNRecognizeTextRequest()
    
    override func viewDidLoad() {
        super.viewDidLoad()
        setupCamera()
        setupOverlayLayer()
        setupOCR()
    }
    
    private func setupCamera() {
        captureSession.sessionPreset = .photo
        
        guard let camera = AVCaptureDevice.default(for: .video),
              let input = try? AVCaptureDeviceInput(device: camera) else {
            print("Kamera erişimi başarısız.")
            return
        }
        captureSession.addInput(input)
        
        let output = AVCaptureVideoDataOutput()
        output.setSampleBufferDelegate(self, queue: DispatchQueue(label: "camera.queue"))
        captureSession.addOutput(output)
        
        previewLayer = AVCaptureVideoPreviewLayer(session: captureSession)
        previewLayer.frame = view.bounds
        previewLayer.videoGravity = .resizeAspectFill
        view.layer.addSublayer(previewLayer)
        
        DispatchQueue.global(qos: .userInitiated).async {
            self.captureSession.startRunning()
        }
    }
    
    private func setupOverlayLayer() {
        rectangleLayer.strokeColor = UIColor.green.cgColor
        rectangleLayer.lineWidth = 3
        rectangleLayer.fillColor = UIColor.clear.cgColor
        view.layer.addSublayer(rectangleLayer)
    }
    
    private func setupOCR() {
        textRequest = VNRecognizeTextRequest { (request, error) in
            guard let observations = request.results as? [VNRecognizedTextObservation] else { return }
            for observation in observations { 
                if let topCandidate = observation.topCandidates(1).first {
                    let mrz = topCandidate.string.description.replacingOccurrences(of: " ", with: "")
                    var mrzResult = mrz.description.checkMrz()
                    if (mrzResult != nil) {
                        DispatchQueue.main.async {
                            self.captureSession.stopRunning()
                            if let result = MRZParser(isOCRCorrectionEnabled:true).parse(mrzString: mrzResult!) {
                                self.onOCRCompletion?(result)
                            }
                            if let navController = self.navigationController {
                                navController.popViewController(animated: true)
                            } else {
                                self.dismiss(animated: true)
                            }
                        }
                    }
                }
            }
        } 
        textRequest.recognitionLevel = .accurate
        textRequest.usesLanguageCorrection = true
    }
    
    
    private func handleBuffer(_ pixelBuffer: CVPixelBuffer) {
        let request = VNDetectRectanglesRequest { [weak self] request, error in
            guard let self = self else { return }
            
            DispatchQueue.main.async {
                self.rectangleLayer.path = nil
            }
            
            if let rect = (request.results as? [VNRectangleObservation])?.first {
                DispatchQueue.main.async {
                    self.drawBoundingBox(rect)
                }
                
                let image = self.imageFromPixelBuffer(pixelBuffer: pixelBuffer)
                if let cropped = self.crop(image: image, rect: rect) {
                    self.performOCR(on: cropped)
                }
            }
        }
        
        request.minimumConfidence = 0.8
        request.maximumObservations = 1
        request.minimumAspectRatio = 0.5
        
        let handler = VNImageRequestHandler(cvPixelBuffer: pixelBuffer, options: [:])
        try? handler.perform([request])
    }
    
    private func performOCR(on image: UIImage) {
        guard let cgImage = image.cgImage else { return }
        let handler = VNImageRequestHandler(cgImage: cgImage, options: [:])
        try? handler.perform([textRequest])
    }
    
    private func crop(image: UIImage, rect: VNRectangleObservation) -> UIImage? {
        guard let cgImage = image.cgImage else { return nil }
        
        let width = CGFloat(cgImage.width)
        let height = CGFloat(cgImage.height)
        
        let boundingBox = CGRect(
            x: rect.boundingBox.origin.x * width,
            y: (1 - rect.boundingBox.origin.y - rect.boundingBox.height) * height,
            width: rect.boundingBox.width * width,
            height: rect.boundingBox.height * height
        )
        
        guard let croppedCGImage = cgImage.cropping(to: boundingBox) else { return nil }
        return UIImage(cgImage: croppedCGImage)
    }
    
    private func imageFromPixelBuffer(pixelBuffer: CVPixelBuffer) -> UIImage {
        let ciImage = CIImage(cvPixelBuffer: pixelBuffer)
        let context = CIContext()
        guard let cgImage = context.createCGImage(ciImage, from: ciImage.extent) else { return UIImage() }
        return UIImage(cgImage: cgImage)
    }
    
    private func drawBoundingBox(_ observation: VNRectangleObservation) {
        let path = UIBezierPath()
        
        let topLeft = previewLayer.layerPointConverted(fromCaptureDevicePoint: CGPoint(x: observation.topLeft.x, y: 1 - observation.topLeft.y))
        let topRight = previewLayer.layerPointConverted(fromCaptureDevicePoint: CGPoint(x: observation.topRight.x, y: 1 - observation.topRight.y))
        let bottomRight = previewLayer.layerPointConverted(fromCaptureDevicePoint: CGPoint(x: observation.bottomRight.x, y: 1 - observation.bottomRight.y))
        let bottomLeft = previewLayer.layerPointConverted(fromCaptureDevicePoint: CGPoint(x: observation.bottomLeft.x, y: 1 - observation.bottomLeft.y))
        
        path.move(to: topLeft)
        path.addLine(to: topRight)
        path.addLine(to: bottomRight)
        path.addLine(to: bottomLeft)
        path.close()
        
        rectangleLayer.path = path.cgPath
    }
}

extension CameraViewController: AVCaptureVideoDataOutputSampleBufferDelegate {
    func captureOutput(_ output: AVCaptureOutput,
                       didOutput sampleBuffer: CMSampleBuffer,
                       from connection: AVCaptureConnection) {
        guard let buffer = CMSampleBufferGetImageBuffer(sampleBuffer) else { return }
        self.handleBuffer(buffer)
    }
}
