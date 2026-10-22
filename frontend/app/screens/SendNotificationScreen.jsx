import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { AppContext } from "../Context";

const SendNotificationScreen = () => {
  const { API_HOST, worker } = useContext(AppContext);
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [timeSlot, setTimeSlot] = useState("09:00 AM - 10:00 AM");
  const [message, setMessage] = useState("");

  const handleSendNotification = async () => {
    // Here you can loop through all users and send notifications using your API
    const payload = {
      message: `your waste collection is scheduled to arrive on ${date.toLocaleDateString()} at ${timeSlot},please ensure your items are ready to pickup.${message}`,
      type: "collection",
      wardNo: worker.wardNo,
    };

    try {
      const response = await axios.post(
        `${API_HOST}/api/user/notification/add-to-ward-users`,
        payload
      );
      if (response) alert("notification send");
    } catch (error) {
      console.error("Error adding notification:", error);
      throw error;
    }

    // TODO: Use addNotification API here
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Collection Date</Text>
      <TouchableOpacity
        onPress={() => setShowDatePicker(true)}
        style={styles.dateInput}
      >
        <Text>{date.toLocaleDateString()}</Text>
        <Ionicons name="calendar-outline" size={20} />
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display={Platform.OS === "ios" ? "inline" : "default"}
          onChange={(event, selectedDate) => {
            setShowDatePicker(false);
            if (selectedDate) setDate(selectedDate);
          }}
        />
      )}

      <Text style={styles.label}>Time Slot</Text>
      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={timeSlot}
          onValueChange={(itemValue) => setTimeSlot(itemValue)}
          style={styles.picker}
        >
          <Picker.Item
            label="09:00 AM - 10:00 AM"
            value="09:00 AM - 10:00 AM"
          />
          <Picker.Item
            label="10:00 AM - 11:00 AM"
            value="10:00 AM - 11:00 AM"
          />
          <Picker.Item
            label="11:00 AM - 12:00 PM"
            value="11:00 AM - 12:00 PM"
          />
          <Picker.Item label="2:00 PM - 3:00 PM" value="2:00 PM - 3:00 PM" />
          <Picker.Item label="3:00 PM - 4:00 PM" value="3:00 PM - 4:00 PM" />
        </Picker>
      </View>

      <Text style={styles.label}>Additional Message (Optional)</Text>
      <TextInput
        style={styles.textArea}
        placeholder="Type any additional instructions..."
        value={message}
        onChangeText={setMessage}
        multiline
      />

      <TouchableOpacity
        style={styles.sendButton}
        onPress={handleSendNotification}
      >
        <Ionicons name="send" size={18} color="#fff" />
        <Text style={styles.sendText}>Send Notification to All Users</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SendNotificationScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#DFFFEF",
    flex: 1,
  },
  label: {
    marginBottom: 6,
    fontWeight: "600",
    fontSize: 16,
    color: "#333",
  },
  dateInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 6,
    marginBottom: 16,
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    marginBottom: 16,
    backgroundColor: "#fff",
  },
  picker: {
    height: 50,
    width: "100%",
  },
  textArea: {
    height: 100,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 12,
    backgroundColor: "#fff",
    marginBottom: 20,
  },
  sendButton: {
    backgroundColor: "#2E8B57",
    padding: 14,
    borderRadius: 6,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  sendText: {
    color: "#fff",
    marginLeft: 8,
    fontWeight: "600",
  },
});
