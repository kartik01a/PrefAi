import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  FlatList,
  I18nManager,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { supportedLanguages, rtlLanguages } from '../i18n/resources';
import { saveLanguage } from '../i18n';

interface LanguageSelectorProps {
  visible: boolean;
  onClose: () => void;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  visible,
  onClose,
}) => {
  const { i18n } = useTranslation();

  const handleLanguageSelect = async (languageCode: string) => {
    try {
      await i18n.changeLanguage(languageCode);
      await saveLanguage(languageCode);
      
      // Handle RTL layout
      const isRTL = rtlLanguages.includes(languageCode);
      if (I18nManager.isRTL !== isRTL) {
        I18nManager.allowRTL(isRTL);
        I18nManager.forceRTL(isRTL);
        // Note: You might need to restart the app for RTL changes to take effect
      }
      
      onClose();
    } catch (error) {
      console.error('Error changing language:', error);
    }
  };

  const renderLanguageItem = ({ item }: { item: typeof supportedLanguages[0] }) => (
    <TouchableOpacity
      style={[
        styles.languageItem,
        i18n.language === item.code && styles.selectedLanguageItem,
      ]}
      onPress={() => handleLanguageSelect(item.code)}
    >
      <Text style={styles.languageName}>{item.nativeName}</Text>
      <Text style={styles.languageCode}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Select Language</Text>
          
          <FlatList
            data={supportedLanguages}
            keyExtractor={(item) => item.code}
            renderItem={renderLanguageItem}
            style={styles.languageList}
          />
          
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    width: '80%',
    maxHeight: '70%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  languageList: {
    maxHeight: 300,
  },
  languageItem: {
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  selectedLanguageItem: {
    backgroundColor: '#e3f2fd',
  },
  languageName: {
    fontSize: 16,
    fontWeight: '600',
  },
  languageCode: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  closeButton: {
    backgroundColor: '#2196f3',
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 20,
  },
  closeButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
});