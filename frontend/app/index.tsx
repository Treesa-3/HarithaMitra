import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

const GetStartedScreen = () => {
  const router = useRouter();
  return (
    <View style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity></TouchableOpacity>
        <TouchableOpacity></TouchableOpacity>
        <TouchableOpacity></TouchableOpacity>
      </View>

      {/* Title */}
      <Text style={styles.title}>HARITHAMITRA</Text>

      {/* Circular Images */}
      <View style={styles.imageContainer}></View>

      {/* Get Started Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("./screens/LoginScreen")}
      >
        <Text style={styles.buttonText}>Get Started!</Text>
      </TouchableOpacity>
    </View>
  );
};

export default GetStartedScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8F8",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  topBar: {
    position: "absolute",
    top: 40,
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-around",
  },
  icon: {
    width: 24,
    height: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#2E573A",
    marginTop: 60,
  },
  imageContainer: {
    position: "relative",
    width: "100%",
    height: 300,
    alignItems: "center",
    marginTop: 20,
  },
  circle: {
    position: "absolute",
    borderRadius: 100,
  },
  circle1: {
    width: 100,
    height: 100,
    top: -40,
    left: -60,
  },
  circle2: {
    width: 120,
    height: 120,
    top: 50,
    right: -70,
  },
  circle3: {
    width: 140,
    height: 140,
    bottom: 20,
    left: -40,
  },
  circle4: {
    width: 60,
    height: 60,
    bottom: -50,
    right: -50,
  },
  button: {
    backgroundColor: "#F28C3A",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 10,
    marginTop: 30,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFF",
  },
});
