import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function HomeDashboard() {
  const [userName] = useState('Sarah');
  
  // Mock data
  const prescriptions = [
    { id: 1, medicine: 'Amoxicillin 500mg', date: 'Oct 5, 2025', doctor: 'Dr. Smith' },
    { id: 2, medicine: 'Vitamin D3', date: 'Oct 1, 2025', doctor: 'Dr. Johnson' },
  ];

  const medicineReminders = [
    { id: 1, medicine: 'Amoxicillin', time: '2:00 PM', taken: false },
    { id: 2, medicine: 'Vitamin D3', time: '8:00 PM', taken: false },
  ];

  const labReports = [
    { id: 1, test: 'Blood Sugar', date: 'Sep 28, 2025', result: '110 mg/dL', status: 'Normal' },
    { id: 2, test: 'Cholesterol', date: 'Sep 25, 2025', result: '180 mg/dL', status: 'Normal' },
  ];

  const handleMarkTaken = (id) => {
    console.log('Mark taken:', id);
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
          <View>
            <Text style={styles.greeting}>Hi, {userName}!</Text>
            <Text style={styles.subGreeting}>Here's your health overview</Text>
          </View>
          <TouchableOpacity style={styles.profileButton}>
            <View style={styles.profileCircle}>
              <Text style={styles.profileInitial}>{userName[0]}</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Latest Prescriptions */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Latest Prescriptions</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          
          {prescriptions.map(prescription => (
            <TouchableOpacity key={prescription.id} style={styles.card}>
              <View style={styles.cardIcon}>
                <Text style={styles.cardIconText}>💊</Text>
              </View>
              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>{prescription.medicine}</Text>
                <View style={styles.cardMeta}>
                  <Text style={styles.cardMetaText}>{prescription.date}</Text>
                  <Text style={styles.cardMetaDot}>•</Text>
                  <Text style={styles.cardMetaText}>{prescription.doctor}</Text>
                </View>
              </View>
              <Text style={styles.chevron}>›</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Upcoming Medicine Reminders */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Medicine Reminders</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          
          {medicineReminders.map(reminder => (
            <View key={reminder.id} style={styles.reminderCard}>
              <View style={styles.reminderLeft}>
                <View style={styles.reminderIcon}>
                  <Text style={styles.reminderIconText}>💊</Text>
                </View>
                <View style={styles.reminderContent}>
                  <Text style={styles.reminderTitle}>{reminder.medicine}</Text>
                  <Text style={styles.reminderTime}>{reminder.time}</Text>
                </View>
              </View>
              <TouchableOpacity 
                style={styles.takenButton}
                onPress={() => handleMarkTaken(reminder.id)}
              >
                <Text style={styles.takenButtonText}>Take</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* Recent Lab Reports */}
        <View style={[styles.section, styles.lastSection]}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Lab Reports</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          
          {labReports.map(report => (
            <TouchableOpacity key={report.id} style={styles.card}>
              <View style={styles.cardIcon}>
                <Text style={styles.cardIconText}>📋</Text>
              </View>
              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>{report.test}</Text>
                <View style={styles.cardMeta}>
                  <Text style={styles.cardMetaText}>{report.date}</Text>
                </View>
                <View style={styles.resultContainer}>
                  <Text style={styles.resultText}>{report.result}</Text>
                  <View style={styles.statusBadge}>
                    <Text style={styles.statusText}>{report.status}</Text>
                  </View>
                </View>
              </View>
              <Text style={styles.chevron}>›</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 70,
    backgroundColor: '#fff',
  },
  greeting: {
    fontSize: 28,
    fontWeight: '700',
    color: '#000',
    marginBottom: 4,
  },
  subGreeting: {
    fontSize: 15,
    color: '#8e8e93',
  },
  profileButton: {
    padding: 4,
  },
  profileCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#0a84ff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileInitial: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
  section: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  lastSection: {
    paddingBottom: 30,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000',
  },
  seeAllText: {
    fontSize: 15,
    color: '#0a84ff',
    fontWeight: '600',
  },
  card: {
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
  cardIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#f5f5f7',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  cardIconText: {
    fontSize: 24,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
  },
  cardMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardMetaText: {
    fontSize: 14,
    color: '#8e8e93',
  },
  cardMetaDot: {
    fontSize: 14,
    color: '#8e8e93',
    marginHorizontal: 6,
  },
  chevron: {
    fontSize: 24,
    color: '#c7c7cc',
    marginLeft: 8,
  },
  reminderCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  reminderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  reminderIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#f5f5f7',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  reminderIconText: {
    fontSize: 24,
  },
  reminderContent: {
    flex: 1,
  },
  reminderTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
  },
  reminderTime: {
    fontSize: 14,
    color: '#8e8e93',
  },
  takenButton: {
    backgroundColor: '#0a84ff',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  takenButtonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
  resultContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  resultText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#000',
    marginRight: 8,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 60,
  },
  statusBadge: {
    backgroundColor: '#e8f5e9',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#4caf50',
  },
});