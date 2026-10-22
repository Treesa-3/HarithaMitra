import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import axios from "axios";
import { AppContext } from "../Context";

const AddWorker = () => {
  const [selectedWard, setSelectedWard] = useState("1");
  const { setWorkersList, API_HOST } = useContext(AppContext);

  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Form submission handler
  const onSubmit = async (data) => {
    console.log("Worker Data:", data, selectedWard);
    const tempData = {
      name: data.workerName,
      wardNo: selectedWard,
      email: data.email,
      address: data.address,
      contact: data.contactNo,
    };

    try {
      const response = await axios.post(
        `${API_HOST}/api/worker/register`,
        tempData
      );
      if (response.data.success) {
        console.log(response.data.worker, "worker");
        alert("worker added");
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

    alert("Worker Added Successfully!");
  };

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>

      {/* Title */}
      <Text style={styles.title}>Add Worker</Text>

      <View style={styles.formContainer}>
        {/* Ward No */}
        <Text style={styles.label}>Ward No</Text>
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
        {errors.wardNo && (
          <Text style={styles.errorText}>{errors.wardNo.message}</Text>
        )}

        {/* Worker's Name */}
        <Text style={styles.label}>Worker's Name</Text>
        <Controller
          control={control}
          name="workerName"
          rules={{ required: "Worker's name is required" }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="Enter full name"
              value={value}
              onChangeText={onChange}
            />
          )}
        />
        {errors.workerName && (
          <Text style={styles.errorText}>{errors.workerName.message}</Text>
        )}

        {/* Address */}
        <Text style={styles.label}>Address</Text>
        <Controller
          control={control}
          name="address"
          rules={{ required: "Address is required" }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="Enter complete address"
              value={value}
              onChangeText={onChange}
            />
          )}
        />
        {errors.address && (
          <Text style={styles.errorText}>{errors.address.message}</Text>
        )}

        {/* Contact No */}
        <Text style={styles.label}>Contact No</Text>
        <Controller
          control={control}
          name="contactNo"
          rules={{
            required: "Contact number is required",
            pattern: {
              value: /^[0-9]{10}$/,
              message: "Enter a valid 10-digit number",
            },
          }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="Enter contact number"
              keyboardType="numeric"
              value={value}
              onChangeText={onChange}
            />
          )}
        />
        {errors.contactNo && (
          <Text style={styles.errorText}>{errors.contactNo.message}</Text>
        )}

        {/* Email ID */}
        <Text style={styles.label}>Email ID</Text>
        <Controller
          control={control}
          name="email"
          rules={{
            required: "Email is required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Enter a valid email",
            },
          }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="Enter email address"
              keyboardType="email-address"
              value={value}
              onChangeText={onChange}
            />
          )}
        />
        {errors.email && (
          <Text style={styles.errorText}>{errors.email.message}</Text>
        )}

        {/* Submit Button */}
        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleSubmit(onSubmit)}
        >
          <Text style={styles.submitText}>Submit Details</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AddWorker;

const styles = StyleSheet.create({
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
  picker: {
    width: 100,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 1,
    marginTop: 1,
    fontSize: 14,
    backgroundColor: "#fff",
  },
});
