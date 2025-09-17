import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';

export default function RegisterScreen() {
  const [role, setRole] = useState<'patient' | 'doctor'>('patient');

  // common fields
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [language, setLanguage] = useState('');

  // doctor-only fields
  const [qualifications, setQualifications] = useState('');
  const [hospital, setHospital] = useState('');
  const [idDoc, setIdDoc] = useState<string | null>(null);

  function handleRegister() {
    const userData = {
      role,
      name,
      phone,
      email,
      age,
      gender,
      language,
      ...(role === 'doctor' && { qualifications, hospital, idDoc }),
    };
    console.log('Register data:', userData);
    Alert.alert('Form Submitted', JSON.stringify(userData, null, 2));
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Role Selector */}
      <View style={styles.roleRow}>
        <TouchableOpacity
          style={[styles.roleButton, role === 'patient' && styles.roleActive]}
          onPress={() => setRole('patient')}
        >
          <Text style={styles.roleText}>Patient</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.roleButton, role === 'doctor' && styles.roleActive]}
          onPress={() => setRole('doctor')}
        >
          <Text style={styles.roleText}>Doctor</Text>
        </TouchableOpacity>
      </View>

      {/* Common Fields */}
      <TextInput style={styles.input} placeholder="Name" value={name} onChangeText={setName} />
      <TextInput style={styles.input} placeholder="Phone" value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
      <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" />
      <TextInput style={styles.input} placeholder="Age" value={age} onChangeText={setAge} keyboardType="numeric" />
      <TextInput style={styles.input} placeholder="Gender" value={gender} onChangeText={setGender} />
      <TextInput style={styles.input} placeholder="Native Language" value={language} onChangeText={setLanguage} />

      {/* Doctor Fields */}
      {role === 'doctor' && (
        <>
          <TextInput
            style={[styles.input, styles.multiline]}
            placeholder="Qualifications & Specialization"
            value={qualifications}
            onChangeText={setQualifications}
            multiline
          />
          <TextInput
            style={styles.input}
            placeholder="Hospital/Clinic Info"
            value={hospital}
            onChangeText={setHospital}
          />
          {/* For now, simulate ID upload with a button */}
          <Button title={idDoc ? "ID Uploaded" : "Upload ID Document"} onPress={() => setIdDoc("dummy-file.jpg")} />
        </>
      )}

      <View style={styles.submitBtn}>
        <Button title="Register" onPress={handleRegister} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 16, backgroundColor: '#fff' },
  roleRow: { flexDirection: 'row', justifyContent: 'center', marginBottom: 16 },
  roleButton: { padding: 10, marginHorizontal: 8, borderWidth: 1, borderColor: '#888', borderRadius: 6 },
  roleActive: { backgroundColor: '#4CAF50', borderColor: '#4CAF50' },
  roleText: { color: '#000' },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 6, padding: 10, marginBottom: 12 },
  multiline: { height: 80, textAlignVertical: 'top' },
  submitBtn: { marginTop: 16 },
});
