import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import axios from "axios";
import { useRouter } from "expo-router";
import { AppContext } from "../Context";

const LoginScreen = () => {
  const { setWorker, setUser, API_HOST, setLoginId } = useContext(AppContext);
  const router = useRouter();
  const [loginRole, setLoginRole] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (userName?.startsWith("A")) {
      setLoginRole("Admin");
    } else if (userName?.startsWith("U")) {
      setLoginRole("User");
    } else if (userName?.startsWith("W")) {
      setLoginRole("Worker");
    } else {
      setLoginRole("");
    }
  }, [userName]);

  const handleLogin = async (e) => {
    console.log("inside handle login");
    if (loginRole === "") {
      alert("invalid UserName");
    } else if (loginRole === "Admin") {
      try {
        const response = await axios.post(`${API_HOST}/api/user/admin/login`, {
          userName,
          password,
        });
        if (response.data.success) {
          setLoginId("Admin");
          router.push("../screens/AdminLanding");
        } else {
          alert(response.data.message);
        }
      } catch (error) {
        console.log(error);
      }
    } else if (loginRole === "Worker") {
      console.log("inside if worker");
      try {
        const response = await axios.post(`${API_HOST}/api/worker/login`, {
          userName,
          password,
        });
        if (response.data.success) {
          setWorker(response.data.worker);
          setLoginId("Worker");
          router.push("../screens/WorkerLanding");
        } else {
          alert(response.data.message);
        }
      } catch (error) {
        console.log(error);
      }
    } else if (loginRole === "User") {
      try {
        const response = await axios.post(`${API_HOST}/api/user/login`, {
          userName,
          password,
        });
        if (response.data.success) {
          setUser(response.data.user);
          setLoginId("User");
          router.push("../screens/UserLanding");
        } else {
          // toast.error(response.data.message)
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <View style={styles.container}>
      {/* <Image source={require("../../assets/profile-icon.png")} style={styles.profileIcon} /> */}
      <Text style={styles.title}>Login</Text>
      <Text style={styles.subtitle}>Please sign in to continue</Text>

      {/* Input Fields */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Username</Text>
        <View style={styles.inputWrapper}>
          {/* <Image source={require("../../assets/user-icon.png")} style={styles.inputIcon} /> */}
          <TextInput
            placeholder="Enter your username"
            style={styles.input}
            onChangeText={setUserName}
          />
        </View>

        <Text style={styles.label}>Password</Text>
        <View style={styles.inputWrapper}>
          {/* <Image source={require("../../assets/lock-icon.png")} style={styles.inputIcon} /> */}
          <TextInput
            placeholder="Enter your password"
            secureTextEntry
            style={styles.input}
            onChangeText={setPassword}
          />
        </View>

        <TouchableOpacity
          style={styles.signInButton}
          onPress={() => handleLogin()}
        >
          <Text style={styles.signInText}>Sign In</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push("../screens/RegisterScreen")}
        >
          <Text style={styles.forgotPassword}>Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;

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
