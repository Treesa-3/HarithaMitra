import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { AppContext } from "../Context";
import axios from "axios";

const ChangeWorker = () => {
  const router = useRouter();
  const [selectedWard, setSelectedWard] = useState("Ward-1");
  const { workersList, API_HOST, setWorkersList } = useContext(AppContext);
  const [worker, setWorker] = useState(
    workersList.find((w) => w.wardNo === selectedWard)
  );
  const [name, setName] = useState();
  const [address, setAddress] = useState();
  const [contact, setContact] = useState();
  const [email, setEmail] = useState();

  useEffect(() => {
    setWorker(workersList.find((w) => w.wardNo === selectedWard)); // Find worker by ID
  }, [selectedWard]);

  useEffect(() => {
    setName(worker?.name);
    setAddress(worker?.address);
    setContact(worker?.contact);
    setEmail(worker?.email);
  }, [worker]);

  // Submit Handler
  const handleSubmit = async () => {
    const tempData = {
      name: name,
      wardNo: selectedWard,
      email: email,
      address: address,
      contact: contact,
      _id: worker._id,
    };

    try {
      const response = await axios.put(
        `${API_HOST}/api/worker/update`,
        tempData
      );
      if (response.data.success) {
        console.log(response.data.updatedWorker, "updated worker");
        alert("Worker Details Updated Successfully!");
        try {
          const response = await axios.get(`${API_HOST}/api/worker/list`);
          if (response.data.success) {
            setWorkersList(response.data.workers);
          } else {
            alert(response.data.message);
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>

      {/* Title */}
      <Text style={styles.title}>Change Worker Details</Text>

      <View style={styles.formContainer}>
        {/* Ward No */}
        <Text style={styles.label}>Ward No.</Text>

        <Picker
          selectedValue={selectedWard}
          onValueChange={(itemValue) => setSelectedWard(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="I" value="Ward-1" />
          <Picker.Item label="II" value="Ward-2" />
          <Picker.Item label="III" value="Ward-3" />
          <Picker.Item label="IV" value="Ward-4" />
          <Picker.Item label="V" value="Ward-5" />
          <Picker.Item label="VI" value="Ward-6" />
          <Picker.Item label="VII" value="Ward-7" />
          <Picker.Item label="VIII" value="Ward-8" />
          <Picker.Item label="IX" value="Ward-9" />
          <Picker.Item label="X" value="Ward-10" />
        </Picker>

        {/* Worker's Name */}
        <Text style={styles.label}>Worker's Name</Text>

        <TextInput
          style={styles.input}
          value={name}
          onChangeText={(value) => {
            setName(value);
          }}
        />

        {/* Address */}
        <Text style={styles.label}>Address</Text>
        <TextInput
          style={[styles.input, styles.textarea]}
          value={address}
          onChangeText={(value) => {
            setAddress(value);
          }}
          multiline
        />

        {/* Contact No */}
        <Text style={styles.label}>Contact No.</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={contact}
          onChangeText={(value) => {
            setContact(value);
          }}
        />

        {/* Email ID */}
        <Text style={styles.label}>E-mail ID</Text>
        <TextInput
          style={styles.input}
          keyboardType="email-address"
          value={email}
          onChangeText={(value) => {
            setEmail(value);
          }}
        />

        {/* Submit Button */}
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitText}>Submit Changes</Text>
        </TouchableOpacity>

        {/* Note */}
        <Text style={styles.note}>
          Please review all changes before submitting
        </Text>
      </View>
    </View>
  );
};

export default ChangeWorker;

const styles = StyleSheet.create({
  picker: {
    width: 100,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginTop: 5,
    fontSize: 14,
  },
  container: {
    flex: 1,
    backgroundColor: "#D2F5D1",
    padding: 20,
  },
  backButton: {
    marginBottom: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#184A2C",
  },
  formContainer: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 10,
    color: "#184A2C",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginTop: 5,
    fontSize: 14,
  },
  textarea: {
    height: 60,
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 2,
  },
  submitButton: {
    backgroundColor: "#2E573A",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
  },
  submitText: {
    color: "#fff",
    fontWeight: "bold",
  },
  note: {
    fontSize: 12,
    textAlign: "center",
    color: "#666",
    marginTop: 10,
  },
});
