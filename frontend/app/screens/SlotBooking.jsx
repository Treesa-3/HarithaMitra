import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Button,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Icon from "react-native-vector-icons/Ionicons";
import { AppContext } from "../Context";
import axios from "axios";

const SlotBooking = () => {
  const { API_HOST, user } = useContext(AppContext);
  const [location, setLocation] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(new Date());

  const bookingFee = 10.0;
  const serviceCharge = 2.0;
  const totalAmount = bookingFee + serviceCharge;

  const registerSlotBooking = async (bookingData) => {
    try {
      const response = await axios.post(
        `${API_HOST}/api/slot/reg-slotBooking`,
        bookingData
      );
      return response.data;
    } catch (error) {
      console.error("Register Service Error:", error);
      throw error;
    }
  };

  const handleSubmit = () => {
    if (!location) {
      alert("Please enter your location");
      return;
    }
    const bookingData = {
      userName: user.owner,
      userId: user.userName,
      date: selectedDate.toDateString(),
      time: selectedTime.toTimeString(),
      location: location,
      wardNo: user.wardNo,
    };
    registerSlotBooking(bookingData)
      .then((res) => {
        console.log("Slot Booking Registered:", res);
        alert("Request Submitted");
      })
      .catch((err) => {
        console.error("Error registering Slot Booking", err);
      });

    // You can add API call or context saving logic here
  };
  //date picker config
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirmDate = (date) => {
    if (date) {
      setSelectedDate(date);
    }
    hideDatePicker();
  };

  //time picker config

  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const handleConfirmTime = (time) => {
    if (time) {
      setSelectedTime(time);
    }
    hideTimePicker();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Book Your Slot</Text>

      <Text style={styles.label}>Location</Text>
      <View style={styles.inputRow}>
        <Icon name="location-outline" size={20} color="#888" />
        <TextInput
          placeholder="Enter your location"
          value={location}
          onChangeText={setLocation}
          style={styles.input}
        />
      </View>

      <Text style={styles.label}>Select Date</Text>
      <View>
        <Button title={selectedDate.toDateString()} onPress={showDatePicker} />
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirmDate}
          onCancel={hideDatePicker}
        />
      </View>

      <Text style={styles.label}>Collection Time</Text>
      <View>
        <Button title={selectedTime.toTimeString()} onPress={showTimePicker} />
        <DateTimePickerModal
          isVisible={isTimePickerVisible}
          mode="time"
          onConfirm={handleConfirmTime}
          onCancel={hideTimePicker}
        />
      </View>

      <View style={styles.summary}>
        <Text style={styles.summaryTitle}>Booking Summary</Text>
        <View style={styles.summaryRow}>
          <Text>Booking Fee</Text>
          <Text>Rs.{bookingFee.toFixed(2)}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text>Service Charge</Text>
          <Text>Rs.{serviceCharge.toFixed(2)}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.totalText}>Total Amount</Text>
          <Text style={styles.totalText}>Rs.{totalAmount.toFixed(2)}</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitText}>Proceed to Pay</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#dff7dc", padding: 20 },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#256d52",
  },
  label: { marginTop: 15, fontWeight: "600", color: "#333" },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    padding: 10,
    marginTop: 8,
    borderRadius: 8,
  },
  input: { marginLeft: 10, flex: 1 },
  dateText: { marginLeft: 10, color: "#333" },
  summary: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 15,
    marginVertical: 20,
    elevation: 2,
  },
  summaryTitle: { fontWeight: "bold", fontSize: 16, marginBottom: 10 },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 4,
  },
  totalText: { fontWeight: "bold", color: "#000" },
  submitButton: {
    backgroundColor: "#2a7f6b",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  submitText: { color: "#fff", fontWeight: "bold" },
});

export default SlotBooking;
