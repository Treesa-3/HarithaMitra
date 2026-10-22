import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { useRouter } from "expo-router";
import axios from "axios";
import { AppContext } from "../Context";

const RegisterScreen = () => {
  const router = useRouter();
  const [name, setName] = useState();
  const [wardNo, setWardNo] = useState();
  const [houseNo, setHouseNo] = useState();
  const [email, setEmail] = useState();
  const [address, setAddress] = useState();
  const [contact, setContact] = useState();
  const [password, setPassword] = useState();
  const { setUser,API_HOST } = useContext(AppContext);

  const handleLogin = async () => {
    data = {
      owner: name,
      wardNo,
      houseNo,
      email,
      address,
      contact,
      password,
    };
    try {
      const response = await axios.post(
        `${API_HOST}/api/user/register`,
        data
      );
      if (response.data.success) {
        console.log(response.data, "data");
        router.push("../screens/UserLanding");
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      {/* <Image source={require("../../assets/profile-icon.png")} style={styles.profileIcon} /> */}
      <Text style={styles.title}>Register</Text>
      <Text style={styles.subtitle}>Please sign up to continue</Text>

      {/* Input Fields */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Name</Text>
        <View style={styles.inputWrapper}>
          {/* <Image source={require("../../assets/user-icon.png")} style={styles.inputIcon} /> */}
          <TextInput
            placeholder="Enter your name"
            style={styles.input}
            onChangeText={(value) => setName(value)}
          />
        </View>

        <Text style={styles.label}>Ward NO</Text>
        <View style={styles.inputWrapper}>
          {/* <Image source={require("../../assets/user-icon.png")} style={styles.inputIcon} /> */}
          <TextInput
            placeholder="Enter your Ward No"
            style={styles.input}
            onChangeText={(value) => setWardNo(value)}
          />
        </View>

        <Text style={styles.label}>House No</Text>
        <View style={styles.inputWrapper}>
          {/* <Image source={require("../../assets/user-icon.png")} style={styles.inputIcon} /> */}
          <TextInput
            placeholder="Enter your HouseNo"
            style={styles.input}
            onChangeText={(value) => setHouseNo(value)}
          />
        </View>

        <Text style={styles.label}>Email</Text>
        <View style={styles.inputWrapper}>
          {/* <Image source={require("../../assets/user-icon.png")} style={styles.inputIcon} /> */}
          <TextInput
            placeholder="Enter your Email"
            style={styles.input}
            onChangeText={(value) => setEmail(value)}
          />
        </View>

        <Text style={styles.label}>Address</Text>
        <View style={styles.inputWrapper}>
          {/* <Image source={require("../../assets/user-icon.png")} style={styles.inputIcon} /> */}
          <TextInput
            placeholder="Enter your Address"
            style={styles.input}
            onChangeText={(value) => setAddress(value)}
          />
        </View>

        <Text style={styles.label}>Phone</Text>
        <View style={styles.inputWrapper}>
          {/* <Image source={require("../../assets/user-icon.png")} style={styles.inputIcon} /> */}
          <TextInput
            placeholder="Enter your Phone No"
            style={styles.input}
            onChangeText={(value) => setContact(value)}
          />
        </View>

        <Text style={styles.label}>Password</Text>
        <View style={styles.inputWrapper}>
          {/* <Image source={require("../../assets/lock-icon.png")} style={styles.inputIcon} /> */}
          <TextInput
            placeholder="Enter your password"
            secureTextEntry
            style={styles.input}
            onChangeText={(value) => setPassword(value)}
          />
        </View>

        <TouchableOpacity
          style={styles.signInButton}
          onPress={() => handleLogin()}
        >
          <Text style={styles.signInText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D2F5D1",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  profileIcon: {
    width: 50,
    height: 50,
    marginBottom: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#2E573A",
  },
  subtitle: {
    fontSize: 14,
    color: "#333",
    marginBottom: 20,
  },
  inputContainer: {
    width: "100%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#2E573A",
    marginBottom: 5,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
  },
  inputIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  input: {
    flex: 1,
  },
  signInButton: {
    backgroundColor: "#2E573A",
    padding: 12,
    borderRadius: 5,
    alignItems: "center",
    marginVertical: 10,
  },
  signInText: {
    color: "#fff",
    fontWeight: "bold",
  },
  forgotPassword: {
    color: "#2E573A",
    textAlign: "center",
    marginTop: 5,
  },
  altLoginButton: {
    backgroundColor: "#A7D9A6",
    padding: 12,
    borderRadius: 5,
    alignItems: "center",
    marginVertical: 5,
    width: "100%",
  },
});
