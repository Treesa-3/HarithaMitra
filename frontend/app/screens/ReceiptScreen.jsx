import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { AppContext } from "../Context";

const ReceiptScreen = () => {
  const { user } = useContext(AppContext);
  const handleDownload = () => {};
  const [date, setDate] = useState();
  useEffect(() => {
    user?.wasteData.map((item) => {
      if (item.paymentStatus === true) {
        setDate(item.date);
      }
    });
  }, []);

  return (
    date && (
      <View style={styles.container}>
        <Text style={styles.title}>Receipt</Text>

        <View style={styles.card}>
          <Text style={styles.receiptNo}>Receipt No: #WC2025001</Text>
          <Text style={styles.date}>
            Date: {new Date().toLocaleDateString()}
          </Text>

          <View style={styles.divider} />

          <View style={styles.row}>
            <Text style={styles.label}>Name:</Text>
            <Text style={styles.value}>{user.owner}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>House Number:</Text>
            <Text style={styles.value}>{user.houseNo}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Ward Number:</Text>
            <Text style={styles.value}>{user.wardNo}</Text>
          </View>

          <View style={styles.divider} />
          <Text style={styles.message}>
            The monthly waste collection fee has been fully paid through {date}
          </Text>

          <View style={styles.divider} />

          <View style={styles.verifiedSection}>
            <Icon name="checkmark-circle" size={28} color="#444" />
            <Text style={styles.verifiedLabel}>Digitally Verified by</Text>
            <Text style={styles.signer}>Panchayat President</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleDownload}>
          <Icon name="download-outline" size={20} color="#fff" />
          <Text style={styles.buttonText}> Download Receipt</Text>
        </TouchableOpacity>
      </View>
    )
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#d5f7df",
    padding: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#226c48",
    marginBottom: 15,
  },
  card: {
    backgroundColor: "#fff",
    padding: 20,
    width: "100%",
    borderRadius: 12,
    elevation: 3,
    marginBottom: 20,
  },
  receiptNo: {
    fontSize: 15,
    color: "#444",
    marginBottom: 5,
  },
  date: {
    fontSize: 15,
    color: "#444",
  },
  divider: {
    borderBottomColor: "#ddd",
    borderBottomWidth: 1,
    marginVertical: 12,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 2,
  },
  label: {
    fontWeight: "600",
    color: "#555",
  },
  value: {
    color: "#111",
    fontWeight: "600",
  },
  message: {
    textAlign: "center",
    color: "#333",
    fontSize: 15,
    marginBottom: 10,
  },
  verifiedSection: {
    alignItems: "center",
    marginTop: 10,
  },
  verifiedLabel: {
    fontSize: 13,
    color: "#666",
    marginTop: 5,
  },
  signer: {
    fontWeight: "bold",
    fontSize: 15,
    marginTop: 3,
    color: "#000",
  },
  button: {
    flexDirection: "row",
    backgroundColor: "#226c48",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default ReceiptScreen;
