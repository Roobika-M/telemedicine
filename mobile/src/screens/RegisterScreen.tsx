import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { initDB, queueRegister, getAllUsers } from '../services/sqliteService';

export default function RegisterScreen() {
  const [role, setRole] = useState<'patient' | 'doctor'>('patient');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [language, setLanguage] = useState('');
  const [qualifications, setQualifications] = useState('');
  const [hospital, setHospital] = useState('');
  const [idDoc, setIdDoc] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      await initDB();
    })();
  }, []);

  async function handleRegister() {
    const user = {
      role,
      name,
      phone,
      email,
      age: Number(age),
      gender,
      language,
      bio: qualifications,
      hospital,
      id_doc_uri: idDoc
    };

    try {
      const localId = await queueRegister(user);
      Alert.alert('Saved locally!', `User queued with ID: ${localId}`);
    } catch (err) {
      console.error('Queue error:', err);
      Alert.alert('Error', 'Could not save registration');
    }
  }

  async function showAllUsers() {
    const users = await getAllUsers();
    console.log('All users in DB:', users);
    Alert.alert('Users in DB', JSON.stringify(users, null, 2));
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Role Selector */}
      <View style={styles.roleRow}>
        <TouchableOpacity
          style={[styles.roleButton, role === 'patient' && styles.roleActive]}
          onPress={() => setRole('patient')}
        >
          <Text>Patient</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.roleButton, role === 'doctor' && styles.roleActive]}
          onPress={() => setRole('doctor')}
        >
          <Text>Doctor</Text>
        </TouchableOpacity>
      </View>

      {/* Common fields */}
      <TextInput style={styles.input} placeholder="Name" value={name} onChangeText={setName} />
      <TextInput style={styles.input} placeholder="Phone" value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
      <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" />
      <TextInput style={styles.input} placeholder="Age" value={age} onChangeText={setAge} keyboardType="numeric" />
      <TextInput style={styles.input} placeholder="Gender" value={gender} onChangeText={setGender} />
      <TextInput style={styles.input} placeholder="Native Language" value={language} onChangeText={setLanguage} />

      {/* Doctor-only fields */}
      {role === 'doctor' && (
        <>
          <TextInput
            style={styles.input}
            placeholder="Qualifications & Specialization"
            value={qualifications}
            onChangeText={setQualifications}
          />
          <TextInput
            style={styles.input}
            placeholder="Hospital/Clinic Info"
            value={hospital}
            onChangeText={setHospital}
          />
          <Button title={idDoc ? 'ID Uploaded' : 'Upload ID Document (dummy)'} onPress={() => setIdDoc('dummy-path.jpg')} />
        </>
      )}

      <View style={{ marginTop: 20 }}>
        <Button title="Register" onPress={handleRegister} />
      </View>

      <View style={{ marginTop: 10 }}>
        <Button title="Show All Users (debug)" onPress={showAllUsers} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 16, backgroundColor: '#fff' },
  roleRow: { flexDirection: 'row', justifyContent: 'center', marginBottom: 16 },
  roleButton: { padding: 10, marginHorizontal: 8, borderWidth: 1, borderRadius: 6 },
  roleActive: { backgroundColor: '#4CAF50', borderColor: '#4CAF50' },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 6, padding: 10, marginBottom: 12 },
});
