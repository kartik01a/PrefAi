import * as Print from 'expo-print';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { Platform, Alert } from 'react-native';

// Function to download/save PDF to device
export const handleDownloadPDF = async (formData: any) => {
  try {
    // Create HTML content
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            .header { text-align: center; margin-bottom: 30px; }
            .section { margin-bottom: 20px; padding: 15px; border: 1px solid #ddd; }
            .field { margin-bottom: 8px; }
            .label { font-weight: bold; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Form Submission</h1>
            <p>Generated: ${new Date().toLocaleDateString()}</p>
          </div>
          ${Object.keys(formData).map(key => `
            <div class="section">
              <h3>${key}</h3>
              ${typeof formData[key] === 'object' 
                ? Object.keys(formData[key]).map(subKey => 
                    `<div class="field"><span class="label">${subKey}:</span> ${formData[key][subKey]}</div>`
                  ).join('')
                : `<div class="field">${formData[key]}</div>`
              }
            </div>
          `).join('')}
        </body>
      </html>
    `;

    // Generate PDF
    const { uri } = await Print.printToFileAsync({ html: htmlContent });
    
    const fileName = `form_${Date.now()}.pdf`;
    
    if (Platform.OS === 'ios') {
      // iOS: Save to app's document directory
      const fileUri = FileSystem.documentDirectory + fileName;
      await FileSystem.moveAsync({
        from: uri,
        to: fileUri,
      });
      Alert.alert('Success', 'PDF saved to Files app');
      return fileUri;
      
    } else {
      // Android: Use sharing to let user choose where to save
      // This bypasses permission issues
      const fileUri = FileSystem.documentDirectory + fileName;
      await FileSystem.moveAsync({
        from: uri,
        to: fileUri,
      });
      
      // Use sharing with save option
      await Sharing.shareAsync(fileUri, {
        mimeType: 'application/pdf',
        dialogTitle: 'Save PDF',
        UTI: 'com.adobe.pdf'
      });
      
      return fileUri;
    }
    
  } catch (error) {
    console.error('Download error:', error);
    Alert.alert('Error', 'Failed to process PDF');
  }
};

// Alternative: Direct save to Downloads (requires different approach)
export const saveToDownloads = async (formData: any) => {
  try {
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            .header { text-align: center; margin-bottom: 30px; }
            .section { margin-bottom: 20px; padding: 15px; border: 1px solid #ddd; }
            .field { margin-bottom: 8px; }
            .label { font-weight: bold; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Form Submission</h1>
            <p>Generated: ${new Date().toLocaleDateString()}</p>
          </div>
          ${Object.keys(formData).map(key => `
            <div class="section">
              <h3>${key}</h3>
              ${typeof formData[key] === 'object' 
                ? Object.keys(formData[key]).map(subKey => 
                    `<div class="field"><span class="label">${subKey}:</span> ${formData[key][subKey]}</div>`
                  ).join('')
                : `<div class="field">${formData[key]}</div>`
              }
            </div>
          `).join('')}
        </body>
      </html>
    `;

    const { uri } = await Print.printToFileAsync({ html: htmlContent });
    const fileName = `form_${Date.now()}.pdf`;
    
    // For Android API 29+, save to public Downloads directory
    const downloadsDir = `${FileSystem.documentDirectory}../Downloads/`;
    const fileUri = `${downloadsDir}${fileName}`;
    
    // Create Downloads directory if it doesn't exist
    const dirInfo = await FileSystem.getInfoAsync(downloadsDir);
    if (!dirInfo.exists) {
      await FileSystem.makeDirectoryAsync(downloadsDir, { intermediates: true });
    }
    
    // Copy file to Downloads
    await FileSystem.copyAsync({
      from: uri,
      to: fileUri,
    });
    
    Alert.alert('Success', `PDF saved to Downloads: ${fileName}`);
    return fileUri;
    
  } catch (error) {
    console.error('Save error:', error);
    // Fallback to sharing
    return handleDownloadPDF(formData);
  }
};