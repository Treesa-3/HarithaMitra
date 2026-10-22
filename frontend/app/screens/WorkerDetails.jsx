import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { AppContext } from "../Context";
import { useContext, useEffect, useState } from "react";

const WorkerDetails = ({ route }) => {
  const { _id } = useLocalSearchParams(); // Get ID from URL
  const { workersList } = useContext(AppContext);
  console.log(workersList, "workersList");

  const worker = workersList.find((w) => w._id === _id); // Find worker by ID

  if (!worker) {
    return <Text style={styles.error}>Worker not found</Text>;
  }
  return (
    <View style={styles.container}>
      <Text style={styles.name}>{worker.name}</Text>
      <Text style={styles.workerId}>Worker ID: #{worker.wardNo}</Text>

      <View style={styles.card}>
        <Text style={styles.label}>📍 Address</Text>
        <Text style={styles.value}>{worker.address}</Text>

        <Text style={styles.label}>📞 Contact Number</Text>
        <Text style={styles.value}>{worker.contact}</Text>

        <Text style={styles.label}>✉️ Email Address</Text>
        <Text style={styles.value}>{worker.email}</Text>
      </View>
    </View>
  );
};

export default WorkerDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9F9",
    padding: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2E573A",
    textAlign: "center",
  },
  workerId: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#184A2C",
    marginTop: 10,
  },
  value: {
    fontSize: 16,
    color: "#333",
  },
});
