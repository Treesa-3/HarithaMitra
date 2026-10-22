import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import { AppContext } from "../Context";
import { useState, useContext, useEffect } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const UserLanding = () => {
  const { user } = useContext(AppContext);
  const router = useRouter();

 

  return (
    <ScrollView style={styles.container}>
      {/* User Details */}
      <View style={styles.card}>
        <View style={styles.innerCard}>
          <View>
            <Text style={styles.cardTitle}>User Details</Text>
            <Text>
              <Text style={styles.bold}>House Number:</Text> {user?.houseNo}
            </Text>
            <Text>
              <Text style={styles.bold}>Name:</Text> {user?.owner}
            </Text>
            <Text>
              <Text style={styles.bold}>Address:</Text> {user?.address}
            </Text>
            <Text>
              <Text style={styles.bold}>Phone:</Text> {user?.contact}
            </Text>
          </View>
          <View style={styles.logout}>
            <TouchableOpacity>
              <Ionicons
                name="notifications-outline"
                size={24}
                color="black"
                onPress={() => router.push("../screens/UserNotificationScreen")}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push("./LoginScreen")}>
              <MaterialIcons name="logout" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {/* Collection History */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Collection History</Text>
        <View style={styles.tableHeader}>
          <Text style={styles.headerText}>Date</Text>
          <Text style={styles.headerText}>Status</Text>
          <Text style={styles.headerText}>Amount</Text>
          <Text style={styles.headerText}>Payment</Text>
          <Text style={styles.headerText}>Fine</Text>
        </View>
        {user?.wasteData.map((item) => (
          <View style={styles.tableRow}>
            <Text style={styles.rowText}>{item.date.slice(3, 15)}</Text>
            <Text style={styles.rowText}>
              {item.collectionStatus ? "Collected" : "Pending"}
            </Text>
            <Text style={styles.rowText}>Rs.{item.Amount}</Text>
            <Text style={styles.rowText}>
              {item.paymentStatus ? "Paid" : "Pending"}
            </Text>
            <Text style={styles.rowText}>{item.fine}</Text>
          </View>
        ))}
      </View>
      {/* Action Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("../screens/PaymentScreen")}
        >
          <Text style={styles.buttonText}>Make Payment</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("../screens/ReceiptScreen")}
        >
          <Text style={styles.buttonText}>View Receipt</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("../screens/SlotBooking")}
        >
          <Text style={styles.buttonText}>Slot Booking</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("../screens/ServiceBooking")}
        >
          <Text style={styles.buttonText}>Service Booking</Text>
        </TouchableOpacity>
      </View>{" "}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("../screens/RegisterComplaint")}
        >
          <Text style={styles.buttonText}>File Complaint</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#CFF6E4",
    padding: 10,
  },
  card: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  innerCard: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  logout: {
    gap: 20,
  },
  cardTitle: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 10,
  },
  bold: {
    fontWeight: "bold",
  },
  tableHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    fontWeight: "bold",
    marginBottom: 5,
  },
  headerText: {
    fontWeight: "bold",
    flex: 1,
    textAlign: "center",
  },
  tableRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  rowText: {
    flex: 1,
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },
  button: {
    backgroundColor: "#287B63",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    flex: 1,
    marginHorizontal: 5,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default UserLanding;
