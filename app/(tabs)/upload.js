import { useState } from 'react';
import { ActivityIndicator, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function UploadScan() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [extractedData, setExtractedData] = useState(null);
  const [showOptions, setShowOptions] = useState(false);
  const [uploadType, setUploadType] = useState('');

  const handleUpload = (type, source) => {
    setUploadType(type);
    setShowOptions(false);
    setIsProcessing(true);
    
    // Simulate OCR processing
    setTimeout(() => {
      setIsProcessing(false);
      setExtractedData({
        type: type,
        data: type === 'prescription' 
          ? {
              medicines: [
                { name: 'Amoxicillin', dosage: '500mg', frequency: 'Twice daily', duration: '7 days' },
                { name: 'Vitamin D3', dosage: '1000 IU', frequency: 'Once daily', duration: '30 days' }
              ],
              doctor: 'Dr. Sarah Johnson',
              date: 'Oct 8, 2025'
            }
          : {
              testName: 'Complete Blood Count',
              date: 'Oct 5, 2025',
              values: [
                { test: 'Hemoglobin', value: '14.2 g/dL', status: 'Normal' },
                { test: 'WBC Count', value: '7,500/μL', status: 'Normal' },
                { test: 'Platelets', value: '250,000/μL', status: 'Normal' }
              ],
              lab: 'City Medical Lab'
            }
      });
    }, 2500);
  };

  const handleSave = () => {
    console.log('Saving data:', extractedData);
    setExtractedData(null);
  };

  const handleEdit = () => {
    console.log('Edit data');
  };

  const openUploadOptions = (type) => {
    setUploadType(type);
    setShowOptions(true);
  };

  return (
    <View style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Upload & Scan</Text>
          <Text style={styles.headerSubtitle}>Add your health records</Text>
        </View>

        {!isProcessing && !extractedData && (
          <>
            {/* Upload Options */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>What would you like to add?</Text>
              
              <TouchableOpacity 
                style={styles.uploadCard}
                onPress={() => openUploadOptions('prescription')}
              >
                <View style={styles.uploadIconContainer}>
                  <Text style={styles.uploadIcon}>💊</Text>
                </View>
                <View style={styles.uploadContent}>
                  <Text style={styles.uploadTitle}>Prescription</Text>
                  <Text style={styles.uploadSubtitle}>Upload or scan your prescription</Text>
                </View>
                <Text style={styles.chevron}>›</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.uploadCard}
                onPress={() => openUploadOptions('lab')}
              >
                <View style={styles.uploadIconContainer}>
                  <Text style={styles.uploadIcon}>📋</Text>
                </View>
                <View style={styles.uploadContent}>
                  <Text style={styles.uploadTitle}>Lab Report</Text>
                  <Text style={styles.uploadSubtitle}>Upload or scan your lab results</Text>
                </View>
                <Text style={styles.chevron}>›</Text>
              </TouchableOpacity>
            </View>

            {/* Tips Section */}
            <View style={styles.tipsContainer}>
              <View style={styles.tipCard}>
                <Text style={styles.tipIcon}>💡</Text>
                <Text style={styles.tipText}>
                  Ensure photos are clear and well-lit for best extraction results
                </Text>
              </View>
            </View>
          </>
        )}

        {/* Processing State */}
        {isProcessing && (
          <View style={styles.processingContainer}>
            <View style={styles.processingCard}>
              <ActivityIndicator size="large" color="#0a84ff" />
              <Text style={styles.processingTitle}>Analyzing Document...</Text>
              <Text style={styles.processingSubtitle}>
                Extracting information using AI
              </Text>
            </View>
          </View>
        )}

        {/* Extracted Data Display */}
        {extractedData && (
          <View style={styles.extractedContainer}>
            <View style={styles.extractedHeader}>
              <Text style={styles.extractedTitle}>
                {extractedData.type === 'prescription' ? 'Prescription Details' : 'Lab Report Details'}
              </Text>
              <TouchableOpacity onPress={handleEdit} style={styles.editButton}>
                <Text style={styles.editButtonText}>Edit</Text>
              </TouchableOpacity>
            </View>

            {extractedData.type === 'prescription' ? (
              <View style={styles.dataCard}>
                <View style={styles.dataRow}>
                  <Text style={styles.dataLabel}>Doctor:</Text>
                  <Text style={styles.dataValue}>{extractedData.data.doctor}</Text>
                </View>
                <View style={styles.dataRow}>
                  <Text style={styles.dataLabel}>Date:</Text>
                  <Text style={styles.dataValue}>{extractedData.data.date}</Text>
                </View>
                
                <Text style={styles.subsectionTitle}>Medicines</Text>
                {extractedData.data.medicines.map((med, index) => (
                  <View key={index} style={styles.medicineCard}>
                    <Text style={styles.medicineName}>{med.name}</Text>
                    <Text style={styles.medicineDetails}>
                      {med.dosage} • {med.frequency}
                    </Text>
                    <Text style={styles.medicineDuration}>{med.duration}</Text>
                  </View>
                ))}
              </View>
            ) : (
              <View style={styles.dataCard}>
                <View style={styles.dataRow}>
                  <Text style={styles.dataLabel}>Test:</Text>
                  <Text style={styles.dataValue}>{extractedData.data.testName}</Text>
                </View>
                <View style={styles.dataRow}>
                  <Text style={styles.dataLabel}>Lab:</Text>
                  <Text style={styles.dataValue}>{extractedData.data.lab}</Text>
                </View>
                <View style={styles.dataRow}>
                  <Text style={styles.dataLabel}>Date:</Text>
                  <Text style={styles.dataValue}>{extractedData.data.date}</Text>
                </View>
                
                <Text style={styles.subsectionTitle}>Results</Text>
                {extractedData.data.values.map((result, index) => (
                  <View key={index} style={styles.resultRow}>
                    <View style={styles.resultLeft}>
                      <Text style={styles.resultTest}>{result.test}</Text>
                      <Text style={styles.resultValue}>{result.value}</Text>
                    </View>
                    <View style={[styles.statusBadge, result.status === 'Normal' && styles.statusNormal]}>
                      <Text style={styles.statusText}>{result.status}</Text>
                    </View>
                  </View>
                ))}
              </View>
            )}

            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <Text style={styles.saveButtonText}>Save to Records</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.viewRecordsButton}>
              <Text style={styles.viewRecordsText}>View in Records</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

      {/* Upload Options Modal */}
      <Modal
        visible={showOptions}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Choose Upload Method</Text>
            
            <TouchableOpacity
              style={styles.modalOption}
              onPress={() => handleUpload(uploadType, 'camera')}
            >
              <Text style={styles.modalOptionIcon}>📷</Text>
              <Text style={styles.modalOptionText}>Take Photo</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.modalOption}
              onPress={() => handleUpload(uploadType, 'gallery')}
            >
              <Text style={styles.modalOptionIcon}>🖼️</Text>
              <Text style={styles.modalOptionText}>Choose from Gallery</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.modalOption}
              onPress={() => handleUpload(uploadType, 'file')}
            >
              <Text style={styles.modalOptionIcon}>📄</Text>
              <Text style={styles.modalOptionText}>Upload File (PDF)</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.modalCancelButton}
              onPress={() => setShowOptions(false)}
            >
              <Text style={styles.modalCancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f7',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 30,
  },
  header: {
    padding: 20,
    paddingTop: 70,
    backgroundColor: '#fff',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#000',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 15,
    color: '#8e8e93',
  },
  section: {
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#000',
    marginBottom: 16,
  },
  uploadCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
  },
  uploadIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#f5f5f7',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  uploadIcon: {
    fontSize: 28,
  },
  uploadContent: {
    flex: 1,
  },
  uploadTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
  },
  uploadSubtitle: {
    fontSize: 14,
    color: '#8e8e93',
  },
  chevron: {
    fontSize: 24,
    color: '#c7c7cc',
  },
  tipsContainer: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  tipCard: {
    flexDirection: 'row',
    backgroundColor: 'rgba(10, 132, 255, 0.1)',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(10, 132, 255, 0.2)',
  },
  tipIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  tipText: {
    flex: 1,
    fontSize: 14,
    color: '#0a84ff',
    lineHeight: 20,
  },
  processingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 100,
  },
  processingCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 20,
    padding: 40,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 5,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
  },
  processingTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
    marginTop: 20,
    marginBottom: 8,
  },
  processingSubtitle: {
    fontSize: 15,
    color: '#8e8e93',
  },
  extractedContainer: {
    paddingHorizontal: 20,
  },
  extractedHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  extractedTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000',
  },
  editButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#f5f5f7',
    borderRadius: 8,
  },
  editButtonText: {
    color: '#0a84ff',
    fontSize: 15,
    fontWeight: '600',
  },
  dataCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
  },
  dataRow: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  dataLabel: {
    fontSize: 15,
    color: '#8e8e93',
    width: 80,
  },
  dataValue: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
    color: '#000',
  },
  subsectionTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#000',
    marginTop: 16,
    marginBottom: 12,
  },
  medicineCard: {
    backgroundColor: '#f5f5f7',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  medicineName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
  },
  medicineDetails: {
    fontSize: 14,
    color: '#8e8e93',
    marginBottom: 4,
  },
  medicineDuration: {
    fontSize: 14,
    color: '#0a84ff',
    fontWeight: '500',
  },
  resultRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f5f5f7',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  resultLeft: {
    flex: 1,
  },
  resultTest: {
    fontSize: 15,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
  },
  resultValue: {
    fontSize: 14,
    color: '#8e8e93',
  },
  scrollContent: {
    paddingBottom: 60,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    backgroundColor: '#e0e0e0',
  },
  statusNormal: {
    backgroundColor: '#e8f5e9',
  },
  statusText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#4caf50',
  },
  saveButton: {
    backgroundColor: '#0a84ff',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#0a84ff',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '600',
  },
  viewRecordsButton: {
    padding: 16,
    alignItems: 'center',
  },
  viewRecordsText: {
    color: '#0a84ff',
    fontSize: 15,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
    textAlign: 'center',
    marginBottom: 20,
  },
  modalOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f7',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  modalOptionIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  modalOptionText: {
    fontSize: 17,
    color: '#000',
    fontWeight: '500',
  },
  modalCancelButton: {
    padding: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  modalCancelText: {
    color: '#0a84ff',
    fontSize: 17,
    fontWeight: '600',
  },
});