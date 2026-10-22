import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Button,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useLocalSearchParams, useRouter } from "expo-router";
import axios from "axios";
import { AppContext } from "../Context";

const WorkerDashboard = () => {
  const router = useRouter();
  const { API_HOST } = useContext(AppContext);
  const { _id, houseNo } = useLocalSearchParams(); // Get houseNo from params
  const [house, setHouse] = useState();
  const [collectionStatus, setCollectionStatus] = useState("Pending");
  const [date, setDate] = useState(new Date());
  const [wasteData, setWasteData] = useState({
    plastic: "0.00",
    eWaste: "0.00",
    domestic: "0.00",
  });

  //fetch House
  const fetchHouse = async () => {
    try {
      const response = await axios.post(`${API_HOST}/api/user/fetchUser`, {
        houseNo,
      });
      if (response.data.success) {
        console.log(response.data.user);
        setHouse(response.data.user[0]);
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchHouse();
  }, [houseNo]);
  useEffect(() => {
    console.log(house, "house");
  }, []);

  const handleInputChange = (name, value) => {
    setWasteData({ ...wasteData, [name]: value });
  };

  const submitData = async () => {
    const collectionData = {
      date: date.toDateString(),
      collectionStatus: collectionStatus === "Collected" ? true : false,
      Amount: 50,
      paymentStatus: false,
      fine: 0,
      plastic: Number(wasteData.plastic),
      eWaste: Number(wasteData.eWaste),
      domestic: Number(wasteData.domestic),
    };
    try {
      const response = await axios.post(`${API_HOST}/api/user/add-collection`, {
        _id,
        collectionData,
      });
      if (response.data.success) {
        alert("Data Updated");
        router.back();
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //date pickeer config

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    if (date) {
      setDate(date);
    }
    hideDatePicker();
  };

  return (
    <ScrollView style={styles.container}>
      <View style={{ padding: 20, backgroundColor: "#D4F5E3", flex: 1 }}>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>
          Worker Dashboard
        </Text>

        {/* House Details */}
        <View
          style={{
            padding: 15,
            backgroundColor: "#fff",
            marginVertical: 10,
            borderRadius: 10,
          }}
        >
          <Text>House Number: {house?.houseNo} </Text>
          <Text>Name: {house?.owner}</Text>
          <Text>Address: {house?.address}</Text>
          <Text>Contact: {house?.contact}</Text>
        </View>

        {/* Collection Status */}
        <View>
          <Text>Collection Status</Text>
          <Picker
            selectedValue={collectionStatus}
            onValueChange={(value) =>
              setCollectionStatus(
                value === "Collected" ? "Collected" : "Pending"
              )
            }
            style={{
              height: 50,
              width: 200,
              marginBottom: 100,
              borderRadius: 10,
              color: "red",
            }}
          >
            <Picker.Item
              label="Collected"
              value="Collected"
              style={{
                height: 50,
                width: 200,

                borderRadius: 10,
              }}
            />
            <Picker.Item
              label="Pending"
              value="Pending"
              style={{
                height: 20,
                width: 200,
                borderRadius: 10,
              }}
            />
          </Picker>
        </View>
        {/* Date Picker */}
        <Text>Select Date</Text>
        <View>
          <Button title={date.toDateString()} onPress={showDatePicker} />
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />
        </View>
        {/* Waste Collection Input Fields */}
        {["plastic", "eWaste", "domestic"].map((key, index) => (
          <View>
            <Text>{key}</Text>
            <TextInput
              key={index}
              style={{
                padding: 10,
                backgroundColor: "#fff",
                marginVertical: 5,
              }}
              placeholder={key.replace(/([A-Z])/g, " $1") + " (kg)"}
              keyboardType="numeric"
              value={wasteData[key]}
              onChangeText={(value) => handleInputChange(key, value)}
            />
          </View>
        ))}

        {/* Submit Button */}
        <TouchableOpacity
          style={{
            backgroundColor: "#2C786C",
            padding: 15,
            marginTop: 20,
            borderRadius: 10,
          }}
          onPress={submitData}
        >
          <Text
            style={{ color: "#fff", textAlign: "center", fontWeight: "bold" }}
          >
            Submit Collection Data
          </Text>
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
    color: "black",
    borderRadius: 10,
    marginBottom: 10,
    textDecorationColor: "black",
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
export default WorkerDashboard;
