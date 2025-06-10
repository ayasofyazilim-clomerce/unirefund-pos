//
//  StepButton.swift
//  Learning
//
//  Created by Eren Odacı on 4.06.2025.
//

import SwiftUI

struct StepButton: View {
    let isSet: Bool
    let stepNumber: String
    let stepTitle: String
    let onClick: () -> Void
    
    var body: some View {
        Button { 
            onClick()
        } label: {
            HStack {
                Image(systemName: isSet ? "checkmark.circle.fill" : "checkmark.circle")
                    .font(.system(size: 44))
                    .foregroundColor(isSet ? .green : .accentColor)
                
                VStack(alignment: .leading, spacing: 4) {
                    Text(stepNumber)
                        .font(.system(size: 14))
                        .bold()
                        .foregroundColor(.gray)
                    Text(stepTitle)
                        .font(.system(size: 18))
                        .foregroundColor(.black)
                }
            }
        }
    }
}
