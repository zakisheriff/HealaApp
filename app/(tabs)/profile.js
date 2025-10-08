import { router } from 'expo-router';
import { signOut } from 'firebase/auth';
import { useState } from 'react';
import { Alert, Modal, ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import auth from '../firebaseConfig';

export default function ProfileSettings() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [biometricEnabled, setBiometricEnabled] = useState(false);
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('English');

  // Mock user data
  const userInfo = {
    name: 'Sarah Johnson',
    email: 'sarah.j@email.com',
    phone: '+94 77 123 4567',
    dob: '15 March 1995',
    gender: 'Female',
    bloodGroup: 'O+',
    allergies: 'Penicillin, Peanuts'
  };

  const languages = ['English', 'Sinhalese', 'Tamil'];

  const handleLogout = () => {

    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Logout', style: 'destructive', onPress: (handleLogoutConfirmed) }
      ]
    );
  };

  const handleUpgrade = () => {
    console.log('Navigate to subscription');
  };

  const handleLogoutConfirmed = () => {
    signOut(auth).then(() => {
      console.log('User signed out!');
      router.replace('/login');
    }).catch((error) => {
      Alert.alert("Logout Error", error.message);
    });
    // Clear user session and navigate to login screen
    // For demo, we'll just log and navigate
  }

  return (
    <View style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header with Profile */}
        <View style={styles.header}>
          <View style={styles.profileSection}>
            <View style={styles.avatarLarge}>
              <Text style={styles.avatarText}>{userInfo.name[0]}</Text>
            </View>
            <Text style={styles.profileName}>{userInfo.name}</Text>
            <Text style={styles.profileEmail}>{userInfo.email}</Text>
          </View>
        </View>

        {/* Personal Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Personal Information</Text>
          
          <View style={styles.card}>
            <TouchableOpacity style={styles.infoRow}>
              <View style={styles.infoLeft}>
                <Text style={styles.infoLabel}>Full Name</Text>
                <Text style={styles.infoValue}>{userInfo.name}</Text>
              </View>
              <Text style={styles.chevron}>›</Text>
            </TouchableOpacity>

            <View style={styles.divider} />

            <TouchableOpacity style={styles.infoRow}>
              <View style={styles.infoLeft}>
                <Text style={styles.infoLabel}>Date of Birth</Text>
                <Text style={styles.infoValue}>{userInfo.dob}</Text>
              </View>
              <Text style={styles.chevron}>›</Text>
            </TouchableOpacity>

            <View style={styles.divider} />

            <TouchableOpacity style={styles.infoRow}>
              <View style={styles.infoLeft}>
                <Text style={styles.infoLabel}>Gender</Text>
                <Text style={styles.infoValue}>{userInfo.gender}</Text>
              </View>
              <Text style={styles.chevron}>›</Text>
            </TouchableOpacity>

            <View style={styles.divider} />

            <TouchableOpacity style={styles.infoRow}>
              <View style={styles.infoLeft}>
                <Text style={styles.infoLabel}>Blood Group</Text>
                <Text style={styles.infoValue}>{userInfo.bloodGroup}</Text>
              </View>
              <Text style={styles.chevron}>›</Text>
            </TouchableOpacity>

            <View style={styles.divider} />

            <TouchableOpacity style={styles.infoRow}>
              <View style={styles.infoLeft}>
                <Text style={styles.infoLabel}>Allergies / Conditions</Text>
                <Text style={styles.infoValue}>{userInfo.allergies}</Text>
              </View>
              <Text style={styles.chevron}>›</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Account Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account Settings</Text>
          
          <View style={styles.card}>
            <TouchableOpacity style={styles.infoRow}>
              <View style={styles.infoLeft}>
                <Text style={styles.infoLabel}>Email</Text>
                <Text style={styles.infoValue}>{userInfo.email}</Text>
              </View>
              <Text style={styles.chevron}>›</Text>
            </TouchableOpacity>

            <View style={styles.divider} />

            <TouchableOpacity style={styles.infoRow}>
              <View style={styles.infoLeft}>
                <Text style={styles.infoLabel}>Phone Number</Text>
                <Text style={styles.infoValue}>{userInfo.phone}</Text>
              </View>
              <Text style={styles.chevron}>›</Text>
            </TouchableOpacity>

            <View style={styles.divider} />

            <TouchableOpacity style={styles.infoRow}>
              <Text style={styles.infoLabel}>Change Password</Text>
              <Text style={styles.chevron}>›</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Subscription */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Subscription</Text>
          
          <View style={styles.premiumCard}>
            <View style={styles.premiumHeader}>
              <Text style={styles.premiumBadge}>FREE PLAN</Text>
            </View>
            <Text style={styles.premiumTitle}>Upgrade to Premium</Text>
            <Text style={styles.premiumSubtitle}>
              Unlimited storage, advanced analytics, and priority support
            </Text>
            
            <View style={styles.premiumFeatures}>
              <View style={styles.premiumFeature}>
                <Text style={styles.featureIcon}>✓</Text>
                <Text style={styles.featureText}>Unlimited cloud storage</Text>
              </View>
              <View style={styles.premiumFeature}>
                <Text style={styles.featureIcon}>✓</Text>
                <Text style={styles.featureText}>Advanced health analytics</Text>
              </View>
              <View style={styles.premiumFeature}>
                <Text style={styles.featureIcon}>✓</Text>
                <Text style={styles.featureText}>Smart medicine reminders</Text>
              </View>
            </View>

            <TouchableOpacity style={styles.upgradeButton} onPress={handleUpgrade}>
              <Text style={styles.upgradeButtonText}>Upgrade Now</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* App Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>App Settings</Text>
          
          <View style={styles.card}>
            <TouchableOpacity 
              style={styles.infoRow}
              onPress={() => setShowLanguageModal(true)}
            >
              <View style={styles.infoLeft}>
                <Text style={styles.infoLabel}>Language</Text>
                <Text style={styles.infoValue}>{selectedLanguage}</Text>
              </View>
              <Text style={styles.chevron}>›</Text>
            </TouchableOpacity>

            <View style={styles.divider} />

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Notifications</Text>
              <Switch
                value={notificationsEnabled}
                onValueChange={setNotificationsEnabled}
                trackColor={{ false: '#e0e0e0', true: '#0a84ff' }}
                thumbColor='#fff'
              />
            </View>

            <View style={styles.divider} />

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Biometric Login</Text>
              <Switch
                value={biometricEnabled}
                onValueChange={setBiometricEnabled}
                trackColor={{ false: '#e0e0e0', true: '#0a84ff' }}
                thumbColor='#fff'
              />
            </View>

            <View style={styles.divider} />

            <TouchableOpacity style={styles.infoRow}>
              <Text style={styles.infoLabel}>Privacy Policy</Text>
              <Text style={styles.chevron}>›</Text>
            </TouchableOpacity>

            <View style={styles.divider} />

            <TouchableOpacity style={styles.infoRow}>
              <Text style={styles.infoLabel}>Terms of Service</Text>
              <Text style={styles.chevron}>›</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Logout Button */}
        <View style={styles.section}>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Version 1.0.0</Text>
        </View>
      </ScrollView>

      {/* Language Selection Modal */}
      <Modal
        visible={showLanguageModal}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Language</Text>
            
            {languages.map(lang => (
              <TouchableOpacity
                key={lang}
                style={[
                  styles.languageOption,
                  selectedLanguage === lang && styles.languageOptionSelected
                ]}
                onPress={() => {
                  setSelectedLanguage(lang);
                  setShowLanguageModal(false);
                }}
              >
                <Text style={[
                  styles.languageText,
                  selectedLanguage === lang && styles.languageTextSelected
                ]}>
                  {lang}
                </Text>
                {selectedLanguage === lang && (
                  <Text style={styles.checkmark}>✓</Text>
                )}
              </TouchableOpacity>
            ))}

            <TouchableOpacity 
              style={styles.modalCancelButton}
              onPress={() => setShowLanguageModal(false)}
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
    paddingBottom: 60,
  },
  header: {
    backgroundColor: '#fff',
    paddingTop: 70,
    paddingBottom: 30,
    alignItems: 'center',
  },
  profileSection: {
    alignItems: 'center',
  },
  avatarLarge: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#0a84ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatarText: {
    fontSize: 32,
    fontWeight: '600',
    color: '#fff',
  },
  profileName: {
    fontSize: 22,
    fontWeight: '700',
    color: '#000',
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 15,
    color: '#8e8e93',
  },
  section: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#8e8e93',
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 12,
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
    overflow: 'hidden',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  infoLeft: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 15,
    color: '#000',
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 14,
    color: '#8e8e93',
  },
  chevron: {
    fontSize: 20,
    color: '#c7c7cc',
    marginLeft: 8,
  },
  divider: {
    height: 0.5,
    backgroundColor: '#e0e0e0',
    marginLeft: 16,
  },
  premiumCard: {
    backgroundColor: 'rgba(10, 132, 255, 0.05)',
    borderRadius: 12,
    padding: 20,
    borderWidth: 2,
    borderColor: '#0a84ff',
  },
  premiumHeader: {
    marginBottom: 12,
  },
  premiumBadge: {
    fontSize: 11,
    fontWeight: '700',
    color: '#0a84ff',
    letterSpacing: 1,
  },
  premiumTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#000',
    marginBottom: 8,
  },
  premiumSubtitle: {
    fontSize: 15,
    color: '#8e8e93',
    marginBottom: 20,
    lineHeight: 22,
  },
  premiumFeatures: {
    marginBottom: 20,
  },
  premiumFeature: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  featureIcon: {
    fontSize: 16,
    color: '#0a84ff',
    fontWeight: '700',
    width: 24,
  },
  featureText: {
    fontSize: 15,
    color: '#000',
  },
  upgradeButton: {
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
  upgradeButtonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '700',
  },
  logoutButton: {
    backgroundColor: 'rgba(255, 59, 48, 0.1)',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 59, 48, 0.3)',
  },
  logoutText: {
    color: '#ff3b30',
    fontSize: 17,
    fontWeight: '600',
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 30,
  },
  footerText: {
    fontSize: 13,
    color: '#8e8e93',
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
  languageOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f5f5f7',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  languageOptionSelected: {
    backgroundColor: '#0a84ff',
  },
  languageText: {
    fontSize: 17,
    color: '#000',
    fontWeight: '500',
  },
  languageTextSelected: {
    color: '#fff',
    fontWeight: '600',
  },
  checkmark: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '700',
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