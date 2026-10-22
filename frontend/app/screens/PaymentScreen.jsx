import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import axios from "axios";
import { AppContext } from "../Context";

const PaymentScreen = () => {
  const { user, API_HOST } = useContext(AppContext);

  const [upiId, setUpiId] = useState("");
  useEffect(() => {
    console.log(user.wasteData, "user");
  }, []);

  const amount =
    user?.wasteData.filter((item) => !item.paymentStatus).length * 50;
  const dueAmount = user?.wasteData.filter((item) => item.fine).length * 10;
  const totalAmount = amount + dueAmount;

  const handlePayment = async () => {
    try {
      const response = await axios.put(
        `${API_HOST}/api/user/${user._id}/payments`
      );
      if (response.data.success) {
        alert("Payment Success");
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
    // Here you can make API call or navigation logic
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Payment Details</Text>

      <View style={styles.card}>
        <View style={styles.row}>
          <Text style={styles.label}>Amount</Text>
          <Text style={styles.value}>₹{amount.toFixed(2)}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Due Amount</Text>
          <Text style={styles.value}>₹{dueAmount.toFixed(2)}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.totalLabel}>Total Amount</Text>
          <Text style={styles.totalValue}>₹{totalAmount.toFixed(2)}</Text>
        </View>
      </View>

      <Text style={[styles.label, { marginTop: 20 }]}>Enter UPI ID</Text>
      <TextInput
        placeholder="username@bankname"
        style={styles.input}
        value={upiId}
        onChangeText={setUpiId}
      />

      <TouchableOpacity style={styles.payButton} onPress={handlePayment}>
        <Text style={styles.payText}>Proceed to Pay</Text>
      </TouchableOpacity>

      <View style={styles.secureNote}>
        <Icon name="lock-closed-outline" size={16} color="#888" />
        <Text style={styles.secureText}> Secure Payment</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#dffce2", padding: 20 },
  heading: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 25,
    color: "#227a3b",
  },
  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    elevation: 2,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 6,
    borderBottomWidth: 0.5,
    borderColor: "#ccc",
  },
  label: {
    fontSize: 15,
    color: "#444",
  },
  value: {
    fontSize: 15,
    fontWeight: "600",
    color: "#000",
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  totalValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  input: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    borderColor: "#ddd",
    borderWidth: 1,
    marginTop: 8,
  },
  payButton: {
    backgroundColor: "#2e8b57",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 30,
  },
  payText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  secureNote: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 15,
  },
  secureText: {
    color: "#888",
    fontSize: 13,
  },
});

export default PaymentScreen;
