import React, { useState, useContext } from "react";
import { View, Text, Button, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Checkbox } from "react-native-paper";
import { AppContext } from "../Context";
import axios from "axios";

const ServiceBooking = () => {
  const { API_HOST, user } = useContext(AppContext);
  const router = useRouter();
  const [date, setDate] = useState(new Date());
  const [services, setServices] = useState({
    clothBag: false,
    wasteBin: false,
    biogas: false,
  });

  const handleServiceChange = (name) => {
    setServices({ ...services, [name]: !services[name] });
  };

  const registerService = async (serviceData) => {
    try {
      const response = await axios.post(
        `${API_HOST}/api/service/reg-service`,
        serviceData
      );
      return response.data;
    } catch (error) {
      console.error("Register Service Error:", error);
      throw error;
    }
  };

  const handleSubmit = () => {
    const selectedServices = Object.keys(services).filter(
      (key) => services[key]
    );

    if (selectedServices.length === 0) {
      alert("Select at least one service");
      return;
    }

    // Submit logic here (API call or Context update)

    const serviceData = {
      user: user.owner,
      userId: user.userName,
      wardNo: user.wardNo,
      serviceOpt: selectedServices,
      date: date,
    };
    registerService(serviceData)
      .then((res) => {
        console.log("Service Registered:", res);
        alert("Request Submitted");
      })
      .catch((err) => {
        console.error("Error registering service", err);
      });
  };

  //date pickeer config

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    if (date) {
      setDate(date);
    }
    hideDatePicker();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Service Booking</Text>

      <Text>Select Date</Text>
      <View>
        <Button title={date.toDateString()} onPress={showDatePicker} />
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
      </View>

      <View style={styles.checkboxContainer}>
        <Checkbox.Item
          label="Reusable Cloth Bag"
          status={services.clothBag ? "checked" : "unchecked"}
          onPress={() => handleServiceChange("clothBag")}
        />

        <Checkbox.Item
          label="Household Waste Bin"
          status={services.wasteBin ? "checked" : "unchecked"}
          onPress={() => handleServiceChange("wasteBin")}
        />

        <Checkbox.Item
          label="Biogas Plant Installation"
          status={services.biogas ? "checked" : "unchecked"}
          onPress={() => handleServiceChange("biogas")}
        />
      </View>

      <TouchableOpacity onPress={handleSubmit} style={styles.submitBtn}>
        <Text style={styles.submitText}>Submit Request</Text>
      </TouchableOpacity>
    </View>
  );
};

const CheckboxItem = ({ label, checked, onChange }) => (
  <View style={styles.checkboxItem}>
    <CheckBox value={checked} onValueChange={onChange} />
    <Text style={styles.label}>{label}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#DFFCEF" },
  header: { fontSize: 20, fontWeight: "bold", marginBottom: 20 },
  dateBtn: { backgroundColor: "#D9E7E9", padding: 10, borderRadius: 10 },
  dateText: { fontSize: 16 },
  checkboxContainer: { marginTop: 20 },
  checkboxItem: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
  },
  label: { fontSize: 16, marginLeft: 8 },
  submitBtn: {
    marginTop: 30,
    backgroundColor: "#2D837D",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  submitText: { color: "#fff", fontSize: 16 },
});

export default ServiceBooking;
