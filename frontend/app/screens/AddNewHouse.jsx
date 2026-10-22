import React from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const AddNewHouse = () => {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      wardNo: "",
      houseNo: "",
      ownerName: "",
      address: "",
      phoneNo: "",
      email: "",
    },
  });

  // Submit Handler
  const onSubmit = (data) => {
    console.log("New House Data:", data);
    alert("New House Added Successfully!");
  };

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>

      {/* Title */}
      <Text style={styles.title}>Add New House</Text>

      <View style={styles.formContainer}>
        {/* Ward No */}
        <Text style={styles.label}>Ward No</Text>
        <Controller
          control={control}
          name="wardNo"
          rules={{ required: "Ward number is required" }}
          render={({ field: { onChange, value } }) => (
            <TextInput style={styles.input} value={value} onChangeText={onChange} />
          )}
        />
        {errors.wardNo && <Text style={styles.errorText}>{errors.wardNo.message}</Text>}

        {/* House No */}
        <Text style={styles.label}>House No</Text>
        <Controller
          control={control}
          name="houseNo"
          rules={{ required: "House number is required" }}
          render={({ field: { onChange, value } }) => (
            <TextInput style={styles.input} value={value} onChangeText={onChange} />
          )}
        />
        {errors.houseNo && <Text style={styles.errorText}>{errors.houseNo.message}</Text>}

        {/* Owner's Name */}
        <Text style={styles.label}>Owner's Name</Text>
        <Controller
          control={control}
          name="ownerName"
          rules={{ required: "Owner's name is required" }}
          render={({ field: { onChange, value } }) => (
            <TextInput style={styles.input} value={value} onChangeText={onChange} />
          )}
        />
        {errors.ownerName && <Text style={styles.errorText}>{errors.ownerName.message}</Text>}

        {/* Address */}
        <Text style={styles.label}>Address</Text>
        <Controller
          control={control}
          name="address"
          rules={{ required: "Address is required" }}
          render={({ field: { onChange, value } }) => (
            <TextInput style={[styles.input, styles.textarea]} value={value} onChangeText={onChange} multiline />
          )}
        />
        {errors.address && <Text style={styles.errorText}>{errors.address.message}</Text>}

        {/* Phone No */}
        <Text style={styles.label}>Phone No</Text>
        <Controller
          control={control}
          name="phoneNo"
          rules={{
            required: "Phone number is required",
            pattern: {
              value: /^[0-9]{10}$/,
              message: "Enter a valid 10-digit number",
            },
          }}
          render={({ field: { onChange, value } }) => (
            <TextInput style={styles.input} keyboardType="numeric" value={value} onChangeText={onChange} />
          )}
        />
        {errors.phoneNo && <Text style={styles.errorText}>{errors.phoneNo.message}</Text>}

        {/* E-mail ID */}
        <Text style={styles.label}>E-mail ID</Text>
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
            <TextInput style={styles.input} keyboardType="email-address" value={value} onChangeText={onChange} />
          )}
        />
        {errors.email && <Text style={styles.errorText}>{errors.email.message}</Text>}

        {/* Confirm Button */}
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit(onSubmit)}>
          <Text style={styles.submitText}>Confirm</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AddNewHouse;

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
});
