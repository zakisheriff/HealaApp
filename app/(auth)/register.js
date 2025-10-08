import { router } from 'expo-router';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { auth } from '../firebaseConfig';

export default function Register () {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  // New fields for DOB
  const [dobDay, setDobDay] = useState('');
  const [dobMonth, setDobMonth] = useState('');
  const [dobYear, setDobYear] = useState('');

  const handleNext = () => {
    if (password !== confirmPassword) {
        Alert.alert("Incorrect Password", "Passwords do not match.");
        return;
    }
    if (
        firstName && lastName && email && phoneNumber &&
        password && confirmPassword &&
        dobDay && dobMonth && dobYear
    ) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log('User registered:', user);
          router.replace('/details');
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          Alert.alert('Registration Error', errorMessage);
        });
      
    } else {
        Alert.alert("Error", "Please fill in all fields.");
    }
  };


  const handleLogin = () => {
    router.replace('/login');
  }

  return (
    <View style={styles.container}>
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.glassCard}>
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>Enter your details to get started</Text>
          
          <TextInput
            style={styles.input}
            placeholder="First Name"
            placeholderTextColor="#666"
            value={firstName}
            onChangeText={setFirstName}
            autoCapitalize="words"
          />
          
          <TextInput
            style={styles.input}
            placeholder="Last Name"
            placeholderTextColor="#666"
            value={lastName}
            onChangeText={setLastName}
            autoCapitalize="words"
          />

          {/* DOB Inputs */}
          <View style={styles.dobContainer}>
            <TextInput
                style={[styles.input, styles.dobInput]}
                placeholder="DD"
                placeholderTextColor="#666"
                value={dobDay}
                onChangeText={text => {
                    const day = text.replace(/[^0-9]/g, ''); // remove non-numbers
                    if (day === '') setDobDay('');
                    else if (+day > 31) setDobDay('31'); // limit to 31
                    else setDobDay(day);
                }}
                keyboardType="numeric"
                maxLength={2}/>

            <TextInput
                style={[styles.input, styles.dobInput]}
                placeholder="MM"
                placeholderTextColor="#666"
                value={dobMonth}
                onChangeText={text => {
                    const month = text.replace(/[^0-9]/g, ''); // remove non-numbers
                    if (month === '') setDobMonth('');
                    else if (+month > 12) setDobMonth('12'); // limit to 12
                    else setDobMonth(month);
                }}
                keyboardType="numeric"
                maxLength={2}/>
            <TextInput
              style={[styles.input, styles.dobInput]}
              placeholder="YYYY"
              placeholderTextColor="#666"
              value={dobYear}
              onChangeText={text => {
                    const year = text.replace(/[^0-9]/g, ''); // remove non-numbers
                    if (year === '') setDobYear('');
                    else setDobYear(year);
                }}
              keyboardType="numeric"
              maxLength={4}
            />
          </View>
          
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#666"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          
          <TextInput
            style={styles.input}
            placeholder="Phone Number"
            placeholderTextColor="#666"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            keyboardType="phone-pad"
          />
          
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#666"
            value={password}
            onChangeText={setPassword}
            autoCapitalize="none"
          />
          
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            placeholderTextColor="#666"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            autoCapitalize="none"
          />
          
          <TouchableOpacity style={styles.button} onPress={handleNext}>
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
          
          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>Already have an account? </Text>
            <TouchableOpacity onPress={handleLogin}>
              <Text style={styles.loginLink}>Sign in</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f7' },
  scrollContent: {
    flexGrow: 1, justifyContent: 'center', alignItems: 'center',
    padding: 20, paddingTop: 60, paddingBottom: 40,
  },
  glassCard: {
    width: '100%', maxWidth: 440,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 20, padding: 30,
    shadowColor: '#000', shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1, shadowRadius: 20, elevation: 10,
    borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.5)',
  },
  title: { color: '#000', fontSize: 32, marginBottom: 8, fontWeight: '600', letterSpacing: 0.3, textAlign: 'center' },
  subtitle: { color: '#8e8e93', fontSize: 15, marginBottom: 30, textAlign: 'center' },
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
  },
  dobContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  dobInput: { flex: 1, marginHorizontal: 4 },
  button: {
    backgroundColor: '#0a84ff', width: '100%',
    padding: 16, borderRadius: 10, alignItems: 'center', marginTop: 8,
    shadowColor: '#0a84ff', shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3, shadowRadius: 8, elevation: 5,
  },
  buttonText: { color: '#fff', fontWeight: '600', fontSize: 17 },
  loginContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 25 },
  loginText: { color: '#8e8e93', fontSize: 15 },
  loginLink: { color: '#0a84ff', fontSize: 15, fontWeight: '600' },
});
