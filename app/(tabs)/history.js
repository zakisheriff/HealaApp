import { useState } from 'react';
import { Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function RecordsHistory() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [showDetail, setShowDetail] = useState(false);

  const records = [
    {
      id: 1,
      type: 'prescription',
      title: 'Prescription',
      date: 'Oct 5, 2025',
      doctor: 'Dr. Sarah Smith',
      condition: 'Bacterial Infection',
      medicines: [
        { name: 'Amoxicillin', dosage: '500mg', frequency: 'Twice daily', duration: '7 days', notes: 'Take after meals' },
        { name: 'Vitamin D3', dosage: '1000 IU', frequency: 'Once daily', duration: '30 days', notes: 'Morning dose recommended' }
      ]
    },
    {
      id: 2,
      type: 'lab',
      title: 'Complete Blood Count',
      date: 'Oct 1, 2025',
      clinic: 'City Medical Lab',
      testName: 'CBC',
      results: [
        { test: 'Hemoglobin', value: '14.2', unit: 'g/dL', range: '12-16', status: 'normal' },
        { test: 'WBC Count', value: '11,500', unit: '/μL', range: '4,000-11,000', status: 'high' },
        { test: 'Platelets', value: '250,000', unit: '/μL', range: '150,000-400,000', status: 'normal' }
      ]
    },
    {
      id: 3,
      type: 'prescription',
      title: 'Prescription',
      date: 'Sep 28, 2025',
      doctor: 'Dr. John Williams',
      condition: 'Fever',
      medicines: [
        { name: 'Paracetamol', dosage: '500mg', frequency: 'As needed', duration: '5 days', notes: 'For fever or pain' }
      ]
    },
    {
      id: 4,
      type: 'lab',
      title: 'Blood Sugar Test',
      date: 'Sep 25, 2025',
      clinic: 'Health Plus Diagnostics',
      testName: 'Fasting Blood Sugar',
      condition: 'Diabetes',
      chronic: true,
      results: [
        { test: 'Fasting Blood Sugar', value: '110', unit: 'mg/dL', range: '70-100', status: 'high' },
        { test: 'HbA1c', value: '5.6', unit: '%', range: '4.0-5.6', status: 'normal' }
      ]
    },
    {
      id: 5,
      type: 'prescription',
      title: 'Prescription',
      date: 'Sep 20, 2025',
      doctor: 'Dr. Emily Chen',
      condition: 'Hypertension',
      chronic: true,
      medicines: [
        { name: 'Lisinopril', dosage: '10mg', frequency: 'Once daily', duration: 'Ongoing', notes: 'Take in the morning' }
      ]
    }
  ];

  const filters = ['All', 'Prescriptions', 'Lab Reports', 'By Date', 'Chronic Condition'];

  const filteredRecords = records.filter(record => {
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch = searchQuery === '' || 
      record.title.toLowerCase().includes(searchLower) ||
      (record.doctor && record.doctor.toLowerCase().includes(searchLower)) ||
      (record.clinic && record.clinic.toLowerCase().includes(searchLower)) ||
      (record.testName && record.testName.toLowerCase().includes(searchLower)) ||
      (record.medicines && record.medicines.some(m => m.name.toLowerCase().includes(searchLower)));
    
    const matchesFilter = 
      activeFilter === 'All' ||
      (activeFilter === 'Prescriptions' && record.type === 'prescription') ||
      (activeFilter === 'Lab Reports' && record.type === 'lab') ||
      (activeFilter === 'Chronic Condition' && record.chronic) ||
      (activeFilter === 'By Date');
    
    return matchesSearch && matchesFilter;
  });

  // Sort by date if "By Date" filter is active
  const sortedRecords = activeFilter === 'By Date' 
    ? [...filteredRecords].sort((a, b) => new Date(b.date) - new Date(a.date))
    : filteredRecords;

  const RecordCard = ({ record, onPress }) => (
    <TouchableOpacity style={styles.recordCard} onPress={onPress}>
      <View style={styles.recordIcon}>
        <Text style={styles.recordIconText}>
          {record.type === 'prescription' ? '💊' : '🧪'}
        </Text>
      </View>
      <View style={styles.recordContent}>
        <Text style={styles.recordTitle}>{record.title}</Text>
        <View style={styles.recordMeta}>
          <Text style={styles.recordDate}>{record.date}</Text>
          <Text style={styles.recordDot}>•</Text>
          <Text style={styles.recordSubtitle}>{record.doctor || record.clinic}</Text>
        </View>
        {record.chronic && (
          <View style={styles.chronicBadge}>
            <Text style={styles.chronicText}>Chronic</Text>
          </View>
        )}
      </View>
      <Text style={styles.chevron}>›</Text>
    </TouchableOpacity>
  );

  const PrescriptionDetail = ({ record }) => (
    <>
      <View style={styles.detailCard}>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Doctor:</Text>
          <Text style={styles.infoValue}>{record.doctor}</Text>
        </View>
        {record.condition && (
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Condition:</Text>
            <Text style={styles.infoValue}>{record.condition}</Text>
          </View>
        )}
      </View>

      <Text style={styles.subsectionTitle}>Medicines</Text>
      {record.medicines.map((med, idx) => (
        <View key={idx} style={styles.medicineCard}>
          <Text style={styles.medicineName}>{med.name}</Text>
          <View style={styles.medicineInfo}>
            <InfoRow label="Dosage:" value={med.dosage} />
            <InfoRow label="Frequency:" value={med.frequency} />
            <InfoRow label="Duration:" value={med.duration} />
            {med.notes && (
              <View style={styles.notesBox}>
                <Text style={styles.notesLabel}>Notes:</Text>
                <Text style={styles.notesText}>{med.notes}</Text>
              </View>
            )}
          </View>
          <View style={styles.medicineActions}>
            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.actionButtonText}>Mark as Taken</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.actionButton, styles.actionButtonSecondary]}>
              <Text style={styles.actionButtonTextSecondary}>Refill Reminder</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </>
  );

  const LabDetail = ({ record }) => (
    <>
      <View style={styles.detailCard}>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Lab:</Text>
          <Text style={styles.infoValue}>{record.clinic}</Text>
        </View>
        {record.condition && (
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Condition:</Text>
            <Text style={styles.infoValue}>{record.condition}</Text>
          </View>
        )}
      </View>

      <Text style={styles.subsectionTitle}>Test Results</Text>
      {record.results.map((result, idx) => (
        <View key={idx} style={styles.resultCard}>
          <View style={styles.resultHeader}>
            <Text style={styles.resultTest}>{result.test}</Text>
            <View style={[styles.statusBadge, result.status === 'normal' ? styles.statusNormal : styles.statusAbnormal]}>
              <Text style={[styles.statusText, result.status === 'normal' ? styles.statusNormalText : styles.statusAbnormalText]}>
                {result.status === 'normal' ? 'Normal' : 'Abnormal'}
              </Text>
            </View>
          </View>
          <View style={styles.resultValues}>
            <View style={styles.resultValueBox}>
              <Text style={styles.resultLabel}>Your Result</Text>
              <Text style={[styles.resultValue, result.status !== 'normal' && styles.resultValueAbnormal]}>
                {result.value} {result.unit}
              </Text>
            </View>
            <View style={styles.resultValueBox}>
              <Text style={styles.resultLabel}>Normal Range</Text>
              <Text style={styles.resultRange}>{result.range} {result.unit}</Text>
            </View>
          </View>
        </View>
      ))}
    </>
  );

  const InfoRow = ({ label, value }) => (
    <View style={styles.medicineInfoRow}>
      <Text style={styles.medicineLabel}>{label}</Text>
      <Text style={styles.medicineValue}>{value}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Health Records</Text>
        <Text style={styles.headerSubtitle}>Your complete medical history</Text>
      </View>


    
      {/* Search Bar */}
        <View style={styles.searchSection}>
          <View style={styles.searchContainer}>
            <Text style={styles.searchIcon}>🔍</Text>
            <TextInput
              style={styles.searchInput}
              placeholder="Medicine, doctor, or test name..."
              placeholderTextColor="#8e8e93"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            {searchQuery !== '' && (
              <TouchableOpacity onPress={() => setSearchQuery('')}>
                <Text style={styles.clearIcon}>✕</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Filters */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll} contentContainerStyle={styles.filterContainer}>
          {filters.map(filter => (
            <TouchableOpacity
              key={filter}
              style={[styles.filterButton, activeFilter === filter && styles.filterButtonActive]}
              onPress={() => setActiveFilter(filter)}
            >
              <Text style={[styles.filterText, activeFilter === filter && styles.filterTextActive]}>
                {filter}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

      {/* Records List */}
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {sortedRecords.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>📋</Text>
            <Text style={styles.emptyText}>No records found</Text>
            <Text style={styles.emptySubtext}>Try adjusting your search or filters</Text>
          </View>
        ) : (
          sortedRecords.map(record => (
            <RecordCard key={record.id} record={record} onPress={() => { setSelectedRecord(record); setShowDetail(true); }} />
          ))
        )}
      </ScrollView>

      {/* Detail Modal */}
      <Modal visible={showDetail} animationType="slide" presentationStyle="pageSheet">
        {selectedRecord && (
          <View style={styles.container}>
            <View style={styles.detailHeader}>
              <TouchableOpacity onPress={() => setShowDetail(false)}>
                <Text style={styles.backButton}>‹ Back</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => console.log('Share:', selectedRecord.id)}>
                <Text style={styles.shareButton}>Share</Text>
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false} contentContainerStyle={styles.detailContent}>
              <View style={styles.typeBadge}>
                <Text style={styles.typeIcon}>{selectedRecord.type === 'prescription' ? '💊' : '🧪'}</Text>
                <Text style={styles.typeText}>{selectedRecord.type === 'prescription' ? 'Prescription' : 'Lab Report'}</Text>
              </View>

              <Text style={styles.detailTitle}>{selectedRecord.title}</Text>
              <Text style={styles.detailDate}>{selectedRecord.date}</Text>

              {selectedRecord.type === 'prescription' ? 
                <PrescriptionDetail record={selectedRecord} /> : 
                <LabDetail record={selectedRecord} />
              }
            </ScrollView>
          </View>
        )}
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f7', top: 0},
  header: { padding: 20, paddingTop: 70, backgroundColor: '#fff', marginTop: 10 },
  headerTitle: { fontSize: 28, fontWeight: '700', color: '#000', marginBottom: 4 },
  headerSubtitle: { fontSize: 15, color: '#8e8e93' },
  searchSection: { paddingHorizontal: 20, paddingVertical: 16, backgroundColor: '#fff', borderBottomWidth: 0.5, borderBottomColor: '#e0e0e0' },
  searchContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#f5f5f7', borderRadius: 10, paddingHorizontal: 12 },
  searchIcon: { fontSize: 16, marginRight: 8 },
  searchInput: { flex: 1, fontSize: 16, color: '#000', paddingVertical: 10 },
  clearIcon: { fontSize: 16, color: '#8e8e93', padding: 4 },
  filterScroll: { backgroundColor: '#fff', borderBottomWidth: 0.5, borderBottomColor: '#e0e0e0' },
  filterContainer: { paddingHorizontal: 20, paddingVertical: 12, gap: 8 },
  filterButton: { paddingHorizontal: 14, paddingVertical: 6, borderRadius: 16, backgroundColor: '#f5f5f7', marginRight: 8 },
  filterButtonActive: { backgroundColor: '#0a84ff' },
  filterText: { fontSize: 13, fontWeight: '500', color: '#000' },
  filterTextActive: { color: '#fff' },
  scrollView: { flex: 1 },
  scrollContent: { padding: 20, paddingBottom: 80 },
  recordCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 12, padding: 16, marginBottom: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 8, elevation: 2 },
  recordIcon: { width: 48, height: 48, borderRadius: 24, backgroundColor: '#f5f5f7', justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  recordIconText: { fontSize: 24 },
  recordContent: { flex: 1 },
  recordTitle: { fontSize: 17, fontWeight: '600', color: '#000', marginBottom: 4 },
  recordMeta: { flexDirection: 'row', alignItems: 'center' },
  recordDate: { fontSize: 14, color: '#8e8e93' },
  recordDot: { fontSize: 14, color: '#8e8e93', marginHorizontal: 6 },
  recordSubtitle: { fontSize: 14, color: '#8e8e93' },
  chronicBadge: { marginTop: 6, alignSelf: 'flex-start', backgroundColor: '#fff3cd', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 10 },
  chronicText: { fontSize: 11, fontWeight: '600', color: '#856404' },
  chevron: { fontSize: 24, color: '#c7c7cc' },
  emptyState: { alignItems: 'center', paddingTop: 80 },
  emptyIcon: { fontSize: 64, marginBottom: 16 },
  emptyText: { fontSize: 20, fontWeight: '600', color: '#000', marginBottom: 8 },
  emptySubtext: { fontSize: 15, color: '#8e8e93' },
  detailHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, paddingTop: 60, backgroundColor: '#fff', borderBottomWidth: 0.5, borderBottomColor: '#e0e0e0' },
  backButton: { fontSize: 18, color: '#0a84ff', fontWeight: '600' },
  shareButton: { fontSize: 16, color: '#0a84ff', fontWeight: '600' },
  detailContent: { padding: 20, paddingBottom: 40 },
  typeBadge: { flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-start', backgroundColor: '#f5f5f7', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, marginBottom: 16 },
  typeIcon: { fontSize: 16, marginRight: 6 },
  typeText: { fontSize: 14, fontWeight: '600', color: '#8e8e93' },
  detailTitle: { fontSize: 28, fontWeight: '700', color: '#000', marginBottom: 8 },
  detailDate: { fontSize: 16, color: '#8e8e93', marginBottom: 24 },
  detailCard: { backgroundColor: '#fff', borderRadius: 12, padding: 16, marginBottom: 24 },
  infoRow: { flexDirection: 'row', marginBottom: 8 },
  infoLabel: { fontSize: 15, color: '#8e8e93', width: 80 },
  infoValue: { flex: 1, fontSize: 15, fontWeight: '600', color: '#000' },
  subsectionTitle: { fontSize: 20, fontWeight: '700', color: '#000', marginBottom: 16 },
  medicineCard: { backgroundColor: '#fff', borderRadius: 12, padding: 16, marginBottom: 16 },
  medicineName: { fontSize: 20, fontWeight: '700', color: '#000', marginBottom: 12 },
  medicineInfo: { marginBottom: 16 },
  medicineInfoRow: { flexDirection: 'row', marginBottom: 8 },
  medicineLabel: { fontSize: 15, color: '#8e8e93', width: 100 },
  medicineValue: { flex: 1, fontSize: 15, fontWeight: '600', color: '#000' },
  notesBox: { backgroundColor: '#fff3cd', borderRadius: 8, padding: 12, marginTop: 8 },
  notesLabel: { fontSize: 14, fontWeight: '600', color: '#856404', marginBottom: 4 },
  notesText: { fontSize: 14, color: '#856404', lineHeight: 20 },
  medicineActions: { flexDirection: 'row', gap: 8 },
  actionButton: { flex: 1, backgroundColor: '#0a84ff', padding: 12, borderRadius: 8, alignItems: 'center' },
  actionButtonSecondary: { backgroundColor: 'transparent', borderWidth: 1, borderColor: '#0a84ff' },
  actionButtonText: { color: '#fff', fontSize: 14, fontWeight: '600' },
  actionButtonTextSecondary: { color: '#0a84ff', fontSize: 14, fontWeight: '600' },
  resultCard: { backgroundColor: '#fff', borderRadius: 12, padding: 16, marginBottom: 16 },
  resultHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  resultTest: { fontSize: 18, fontWeight: '700', color: '#000' },
  statusBadge: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 12 },
  statusNormal: { backgroundColor: '#e8f5e9' },
  statusAbnormal: { backgroundColor: '#ffebee' },
  statusText: { fontSize: 13, fontWeight: '600' },
  statusNormalText: { color: '#4caf50' },
  statusAbnormalText: { color: '#f44336' },
  resultValues: { flexDirection: 'row', gap: 12 },
  resultValueBox: { flex: 1, backgroundColor: '#f5f5f7', borderRadius: 8, padding: 12 },
  resultLabel: { fontSize: 13, color: '#8e8e93', marginBottom: 4 },
  resultValue: { fontSize: 18, fontWeight: '700', color: '#000' },
  resultValueAbnormal: { color: '#f44336' },
  resultRange: { fontSize: 16, fontWeight: '600', color: '#000' }
});