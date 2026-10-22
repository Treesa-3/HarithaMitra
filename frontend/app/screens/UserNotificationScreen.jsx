import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import {
  FontAwesome,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AppContext } from "../Context";
const Mnotifications = [
  {
    id: "1",
    type: "payment_due",
    title: "Payment Due",
    message:
      "You have a pending fee of Rs.25.00 for waste collection services.",
  },
  {
    id: "2",
    type: "collection_schedule",
    title: "Collection Schedule",
    message: "Next collection date: January 15, 2025",
    time: "9:00 AM - 11:00 AM",
  },
  {
    id: "3",
    type: "fine_notice",
    title: "Fine Notice",
    message: "Late payment fine: Rs.10.00",
    dueDate: "January 20, 2025",
    buttonText: "Pay Fine",
  },
];

const UserNotificationScreen = () => {
  const { API_HOST, user } = useContext(AppContext);
  const [notifictions, setNotifications] = useState();
  const fetchUserNotifications = async () => {
    try {
      const response = await axios.get(
        `${API_HOST}/api/user/notification/${user._id}`
      );
      if (response) {
        setNotifications(response.data.notifications);
      }
    } catch (error) {
      console.error("Error adding notification:", error);
      throw error;
    }
  };
  useEffect(() => {
    fetchUserNotifications();
  }, []);
  const renderNotification = ({ item }) => {
    let IconComponent;
    let iconName;

    if (item.type === "payment_due") {
      IconComponent = FontAwesome;
      iconName = "info-circle";
    } else if (item.type === "collection") {
      IconComponent = MaterialCommunityIcons;
      iconName = "calendar";
    } else {
      IconComponent = MaterialCommunityIcons;
      iconName = "calendar";
    }

    return (
      <View style={styles.card}>
        <View style={styles.row}>
          <IconComponent name={iconName} size={20} color="#22665D" />
          <Text style={styles.title}> {item.type}</Text>
        </View>

        <Text style={styles.message}>{item.message}</Text>

        {item.date && <Text style={styles.extraInfo}>Date: {item.date}</Text>}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Notifications</Text>
      <FlatList
        data={notifictions}
        renderItem={renderNotification}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
};

export default UserNotificationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#CCF5E1",
    paddingHorizontal: 15,
    paddingTop: 50,
  },
  heading: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 20,
    color: "#22665D",
  },
  card: {
    backgroundColor: "#F8F8F8",
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#22665D",
  },
  message: {
    fontSize: 14,
    marginBottom: 5,
    color: "#333",
  },
  extraInfo: {
    fontSize: 13,
    color: "#666",
    marginBottom: 5,
  },
  button: {
    backgroundColor: "#22665D",
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 6,
    alignSelf: "flex-start",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "500",
  },
});
