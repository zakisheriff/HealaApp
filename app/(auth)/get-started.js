import { router } from 'expo-router';
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import auth from '../firebaseConfig';

export default function GetStarted() {
  const [checkingAuth, setCheckingAuth] = useState(true); // 👈 Added

  const handleGetStarted = () => {
    router.push('/login');
  };

  const handleRegister = () => {
    router.navigate('/register');
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.replace('(tabs)');
      } else {
        setCheckingAuth(false); // Only show GetStarted when not logged in
      }
    });

    return unsubscribe;
  }, []);

  // 👇 While checking Firebase, show your logo centered (no flicker)
  if (checkingAuth) {
    return (
      <View style={styles.loadingContainer}>
        <Image 
          source={require('@/assets/images/logo.png')}
          style={{ width: 100, height: 100 }}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Image 
          source={require('@/assets/images/logo.png')}
          style={styles.logo}
        />
          
        <Text style={styles.title}>Heala</Text>
        <Text style={styles.subtitle}>
          Your health, simplified. Access your medical records, book appointments, and stay connected with your healthcare providers.
        </Text>

        <View style={styles.featuresContainer}>
          <View style={styles.feature}>
            <View style={styles.featureIcon}>
              <Text style={styles.featureIconText}>📋</Text>
            </View>
            <Text style={styles.featureText}>Medical Records</Text>
          </View>

          <View style={styles.feature}>
            <View style={styles.featureIcon}>
              <Text style={styles.featureIconText}>📅</Text>
            </View>
            <Text style={styles.featureText}>Easy Appointments</Text>
          </View>

          <View style={styles.feature}>
            <View style={styles.featureIcon}>
              <Text style={styles.featureIconText}>💊</Text>
            </View>
            <Text style={styles.featureText}>Track Medications</Text>
          </View>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleGetStarted}>
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
        
        <View style={styles.registerContainer}>
          <Text style={styles.registerText}>Don't have an account? </Text>
          <TouchableOpacity>
            <Text style={styles.registerLink} onPress={handleRegister}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: '#f5f5f7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#f5f5f7',
    justifyContent: 'space-between',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },
  logo: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 34,
    fontWeight: '700',
    color: '#000',
    marginBottom: 16,
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 17,
    color: '#8e8e93',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 50,
    paddingHorizontal: 20,
  },
  featuresContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    maxWidth: 400,
  },
  feature: {
    alignItems: 'center',
    flex: 1,
  },
  featureIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  featureIconText: {
    fontSize: 28,
  },
  featureText: {
    fontSize: 13,
    color: '#000',
    textAlign: 'center',
    fontWeight: '500',
  },
  buttonContainer: {
    padding: 30,
    paddingBottom: 50,
  },
  button: {
    backgroundColor: '#0a84ff',
    width: '100%',
    padding: 18,
    borderRadius: 14,
    alignItems: 'center',
    shadowColor: '#0a84ff',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 18,
    letterSpacing: 0.5,
  },
  registerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  registerText: {
    color: '#8e8e93',
    fontSize: 15,
  },
  registerLink: {
    color: '#0a84ff',
    fontSize: 15,
    fontWeight: '600',
  },
});
