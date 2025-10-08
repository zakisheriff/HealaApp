import { router } from 'expo-router';
import { useState } from 'react';
import { Alert, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function MedicalDetails () {
  const [bloodGroup, setBloodGroup] = useState('');
  const [allergies, setAllergies] = useState('');
  const [medications, setMedications] = useState('');
  const [physician, setPhysician] = useState('');
  const [emergencyContact, setEmergencyContact] = useState('');
  const [showBloodGroupPicker, setShowBloodGroupPicker] = useState(false);

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  const handleSubmit = () => {
    if (bloodGroup && allergies && medications && physician && emergencyContact) {
        Alert.alert("Success", "Medical details saved successfully.", [
            { text: "Continue", onPress: () => router.replace('/(tabs)') }
        ]);
    } else {
        Alert.alert("Error", "Please fill in all fields.");
    }
  }

  return (
    <View style={styles.container}>
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.glassCard}>
          <Text style={styles.title}>Medical Details</Text>
          <Text style={styles.subtitle}>Help us provide better care</Text>
          
          <TouchableOpacity 
            style={styles.input}
            onPress={() => setShowBloodGroupPicker(true)}
          >
            <Text style={[styles.inputText, !bloodGroup && styles.placeholder]}>
              {bloodGroup || 'Blood Group'}
            </Text>
          </TouchableOpacity>
          
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Allergies / Chronic Conditions"
            placeholderTextColor="#666"
            value={allergies}
            onChangeText={setAllergies}
            multiline
            numberOfLines={3}
            textAlignVertical="top"
          />
          
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Current Medications"
            placeholderTextColor="#666"
            value={medications}
            onChangeText={setMedications}
            multiline
            numberOfLines={3}
            textAlignVertical="top"
          />
          
          <TextInput
            style={styles.input}
            placeholder="Primary Physician / Clinic Info"
            placeholderTextColor="#666"
            value={physician}
            onChangeText={setPhysician}
          />
          
          <TextInput
            style={styles.input}
            placeholder="Emergency Contact (Name & Phone)"
            placeholderTextColor="#666"
            value={emergencyContact}
            onChangeText={setEmergencyContact}
          />
          
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Save Details</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.skipButton}>
            <Text style={styles.skipText}>Skip for now</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Blood Group Picker Modal */}
      <Modal
        visible={showBloodGroupPicker}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Blood Group</Text>
            
            <View style={styles.bloodGroupGrid}>
              {bloodGroups.map(bg => (
                <TouchableOpacity
                  key={bg}
                  style={[styles.bloodGroupOption, bloodGroup === bg && styles.bloodGroupOptionSelected]}
                  onPress={() => {
                    setBloodGroup(bg);
                    setShowBloodGroupPicker(false);
                  }}
                >
                  <Text style={[styles.bloodGroupText, bloodGroup === bg && styles.bloodGroupTextSelected]}>
                    {bg}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity 
              style={styles.modalCancelButton}
              onPress={() => setShowBloodGroupPicker(false)}
            >
              <Text style={styles.modalCancelButtonText}>Cancel</Text>
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
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    paddingTop: 60,
    paddingBottom: 40,
  },
  glassCard: {
    width: '100%',
    maxWidth: 440,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 20,
    padding: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
  },
  title: {
    color: '#000',
    fontSize: 32,
    marginBottom: 8,
    fontWeight: '600',
    letterSpacing: 0.3,
    textAlign: 'center',
  },
  subtitle: {
    color: '#8e8e93',
    fontSize: 15,
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    color: '#000',
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
    fontSize: 17,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    justifyContent: 'center',
  },
  textArea: {
    minHeight: 80,
    paddingTop: 16,
  },
  inputText: {
    color: '#000',
    fontSize: 17,
  },
  placeholder: {
    color: '#666',
  },
  button: {
    backgroundColor: '#0a84ff',
    width: '100%',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 8,
    shadowColor: '#0a84ff',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 17,
  },
  skipButton: {
    marginTop: 15,
    alignItems: 'center',
  },
  skipText: {
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
  bloodGroupGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  bloodGroupOption: {
    width: '23%',
    padding: 16,
    backgroundColor: '#f5f5f7',
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  bloodGroupOptionSelected: {
    backgroundColor: '#0a84ff',
  },
  bloodGroupText: {
    fontSize: 17,
    color: '#000',
    fontWeight: '600',
  },
  bloodGroupTextSelected: {
    color: '#fff',
  },
  modalCancelButton: {
    padding: 16,
    alignItems: 'center',
    marginTop: 10,
  },
  modalCancelButtonText: {
    color: '#0a84ff',
    fontSize: 17,
    fontWeight: '600',
  }
});