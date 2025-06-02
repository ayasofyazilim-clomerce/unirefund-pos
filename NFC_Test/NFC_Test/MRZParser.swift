import Foundation

struct MRZInfo {
    let firstName: String
    let lastName: String
    let birthDate: String
    let documentNumber: String
}

struct MRZParser {
    static func parseDG1(data: Data) -> MRZInfo? {
        // Örnek parse: DG1 verisini string yapıp basit ayırma
        guard let str = String(data: data, encoding: .utf8) else { return nil }
        // MRZ verisi genellikle 2 satır, 44 karakter: Basit bir parse örneği:
        let lines = str.components(separatedBy: "\n").filter { !$0.isEmpty }
        guard lines.count >= 2 else { return nil }
        let line1 = lines[0]
        let line2 = lines[1]

        // Burada gerçek MRZ parsing yapılmalı ama örnek:
        // Pasaport No: line2[0..<9]
        // Doğum tarihi: line2[13..<19]
        // İsmi: line1/line2 ayrımı karmaşık, örnek olarak:
        let documentNumber = String(line2.prefix(9)).trimmingCharacters(in: .whitespaces)
        let birthDate = String(line2.dropFirst(13).prefix(6))

        // İsimleri ayırmak basitçe:
        let names = line1.components(separatedBy: "<<")
        let lastName = names.first?.replacingOccurrences(of: "<", with: " ") ?? ""
        let firstName = names.dropFirst().first?.replacingOccurrences(of: "<", with: " ") ?? ""

        return MRZInfo(firstName: firstName, lastName: lastName, birthDate: birthDate, documentNumber: documentNumber)
    }
}
