import * as Print from "expo-print";
import * as Sharing from "expo-sharing";
import { Alert, Platform, StyleSheet } from "react-native";

export const generatePDFWithExpoPrint = async (formData: any) => {
  try {
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body {
              font-family: Arial, sans-serif;
              margin: 0;
              padding: 20px;
              background-color: #fff;
            }
            .container {
              max-width: 800px;
              margin: 0 auto;
            }
            .header {
              text-align: center;
              margin-bottom: 30px;
              border-bottom: 3px solid #4CAF50;
              padding-bottom: 20px;
            }
            .section {
              margin-bottom: 25px;
              background-color: #f9f9f9;
              padding: 20px;
              border-radius: 8px;
              border-left: 4px solid #4CAF50;
            }
            .section-title {
              font-size: 20px;
              font-weight: bold;
              color: #333;
              margin-bottom: 15px;
              text-transform: uppercase;
            }
            .form-row {
              display: flex;
              margin-bottom: 12px;
              align-items: center;
            }
            .label {
              font-weight: bold;
              color: #555;
              min-width: 150px;
              margin-right: 15px;
            }
            .value {
              color: #333;
              flex: 1;
            }
            .footer {
              margin-top: 40px;
              text-align: center;
              color: #666;
              font-size: 12px;
            }
            @media print {
              body { margin: 0; }
              .container { max-width: none; }
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Form Submission Report</h1>
              <p>Date: ${new Date().toLocaleDateString()}</p>
              <p>Time: ${new Date().toLocaleTimeString()}</p>
            </div>

            ${Object.keys(formData)
              .map((sectionKey) => {
                const section = formData[sectionKey];
                if (typeof section === "object" && section !== null) {
                  return `
                  <div class="section">
                    <div class="section-title">${sectionKey
                      .replace(/([A-Z])/g, " $1")
                      .trim()}</div>
                    ${Object.keys(section)
                      .map(
                        (fieldKey) => `
                      <div class="form-row">
                        <div class="label">${fieldKey
                          .replace(/([A-Z])/g, " $1")
                          .trim()}:</div>
                        <div class="value">${
                          section[fieldKey] || "Not provided"
                        }</div>
                      </div>
                    `
                      )
                      .join("")}
                  </div>
                `;
                }
                return "";
              })
              .join("")}

            <div class="footer">
              <p>This document was generated automatically from form submission data.</p>
            </div>
          </div>
        </body>
      </html>
    `;

    const { uri } = await Print.printToFileAsync({
      html: htmlContent,
      base64: false,
    });

    return uri;
  } catch (error) {
    console.error("Error generating PDF with Expo Print:", error);
    throw error;
  }
};

export const handleFormToPDF = async (formData: any) => {
  try {
    const pdfUri = await generatePDFWithExpoPrint(formData);

    if (Platform.OS === "ios") {
      await Sharing.shareAsync(pdfUri);
    } else {
      // On Android, you might want to save to Downloads or share
      await Sharing.shareAsync(pdfUri, {
        mimeType: "application/pdf",
        dialogTitle: "Save or Share PDF",
      });
    }
  } catch (error) {
    console.error("Error handling PDF:", error);
  }
};

