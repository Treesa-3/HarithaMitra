import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Picker } from "@react-native-picker/picker";
import Icon from "react-native-vector-icons/Ionicons";
import { AppContext } from "../Context";
import axios from "axios";

const RegisterComplaint = () => {
  const { user, API_HOST } = useContext(AppContext);
  const [complaintType, setComplaintType] = useState("");
  const [description, setDescription] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState(null);

  const handlePickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.5,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const registerComplaint = async (complaintData) => {
    try {
      const response = await axios.post(
        `${API_HOST}/api/complaint/reg-complaint`,
        complaintData
      );
      return response.data;
    } catch (error) {
      console.error("Error while registering complaint:", error);
      throw error;
    }
  };

  const handleSubmit = async () => {
    if (!complaintType || !description || !phone || !location) {
      alert("Please fill all required fields.");
      return;
    }
    const complaintPayload = {
      type: complaintType,
      wardNo: user.wardNo,
      userName: user.owner,
      description: description,
      location: location,
      contact: phone,
    };
    // Add your API call or state/context update logic here
    try {
      const response = await registerComplaint(complaintPayload);
      console.log("Complaint submitted:", response);
      alert("Complaint registered successfully!");
    } catch (err) {
      alert("Failed to register complaint. Please try again.");
    }
  };
  console.log(user, "user");
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register Complaint</Text>

      <Text style={styles.label}>Complaint Type*</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={complaintType}
          onValueChange={(itemValue) => setComplaintType(itemValue)}
        >
          <Picker.Item label="Select complaint type" value="" />
          <Picker.Item label="Garbage Not Collected" value="garbage" />
          <Picker.Item label="Damaged Bin" value="bin" />
          <Picker.Item label="Others" value="other" />
        </Picker>
      </View>

      <Text style={styles.label}>Problem Description*</Text>
      <TextInput
        multiline
        placeholder="Describe your problem here..."
        style={[styles.input, styles.textArea]}
        value={description}
        onChangeText={setDescription}
      />

      <Text style={styles.label}>Phone Number*</Text>
      <TextInput
        placeholder="Enter your phone number"
        style={styles.input}
        keyboardType="phone-pad"
        value={phone}
        onChangeText={setPhone}
      />

      <Text style={styles.label}>Location*</Text>
      <View style={styles.locationRow}>
        <TextInput
          placeholder="Enter location"
          style={[styles.input, { flex: 1 }]}
          value={location}
          onChangeText={setLocation}
        />
        <Icon
          name="location-outline"
          size={24}
          color="#555"
          style={{ marginLeft: 10 }}
        />
      </View>

      {/* <Text style={styles.label}>Add Photo</Text>
          <TouchableOpacity style={styles.uploadBox} onPress={handlePickImage}>
            {image ? (
              <Image source={{ uri: image }} style={styles.uploadedImage} />
            ) : (
              <>
                <Icon name="camera-outline" size={30} color="#555" />
                <Text style={{ color: "#777" }}>Click to upload (JPG, PNG)</Text>
              </>
            )}
          </TouchableOpacity> */}

      <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
        <Text style={styles.submitText}>File Complaint</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#d7fbe5" },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#227a3b",
  },
  label: {
    marginTop: 15,
    marginBottom: 5,
    fontWeight: "600",
    color: "#333",
  },
  input: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  pickerContainer: {
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  uploadBox: {
    marginTop: 10,
    height: 130,
    borderWidth: 2,
    borderColor: "#ccc",
    borderStyle: "dashed",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  uploadedImage: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
  },
  submitBtn: {
    backgroundColor: "#2e8b57",
    padding: 15,
    marginTop: 25,
    borderRadius: 10,
    alignItems: "center",
  },
  submitText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default RegisterComplaint;
