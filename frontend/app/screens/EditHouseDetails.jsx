import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useForm, Controller } from "react-hook-form";
import { AppContext } from "../Context";
import { useState, useContext, useEffect } from "react";
import { Picker } from "@react-native-picker/picker";
import axios from "axios";

const EditHouseDetails = () => {
  const { userListWithWordNo, API_HOST, fetchUserListWithWardNo } =
    useContext(AppContext);
  const { houseNo } = useLocalSearchParams();
  const router = useRouter();

  // Fetch house details
  const house = userListWithWordNo.find((h) => h.houseNo === houseNo);
  if (!house) return <Text style={styles.error}>House not found!</Text>;

  // Local state for form fields
  const [wardNo, setWardNo] = useState(house.wardNo);
  const [hNo, setHNo] = useState(house.houseNo);
  const [owner, setOwner] = useState(house.owner);
  const [address, setAddress] = useState(house.address);
  const [phone, setPhone] = useState(house.contact.toString());
  const [email, setEmail] = useState(house.email);

  const handleSubmit = async () => {
    try {
      const response = await axios.put(`${API_HOST}/api/user/update`, {
        wardNo,
        houseNo: hNo,
        owner,
        address,
        contact: phone,
        email,
        _id: house._id,
      });
      if (response.data.success) {
        console.log(response.data);
        fetchUserListWithWardNo(wardNo);
        alert("User Data Updated");
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    console.log(phone, "house");
  }, [house]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Details</Text>
      <View style={styles.formContainer}>
        <Text style={styles.label}>Ward No</Text>

        <Picker
          selectedValue={wardNo}
          onValueChange={(itemValue) => setWardNo(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="I" value="Ward-1" />
          <Picker.Item label="II" value="Ward-2" />
          <Picker.Item label="III" value="Ward-3" />
          <Picker.Item label="IV" value="Ward-4" />
          <Picker.Item label="V" value="Ward-5" />
          <Picker.Item label="VI" value="Ward-6" />
          <Picker.Item label="VII" value="Ward-7" />
          <Picker.Item label="VIII" value="Ward-8" />
          <Picker.Item label="IX" value="Ward-9" />
          <Picker.Item label="X" value="Ward-10" />
        </Picker>

        <Text style={styles.label}>House No</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter House No"
          keyboardType="defualt"
          value={hNo}
          onChangeText={(value) => {
            setHNo(value);
          }}
        />
        <Text style={styles.label}>Owner</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Name"
          keyboardType="defualt"
          value={owner}
          onChangeText={(value) => {
            setOwner(value);
          }}
        />
        <Text style={styles.label}>Address</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Address"
          keyboardType="defualt"
          value={address}
          onChangeText={(value) => {
            setAddress(value);
          }}
        />
        <Text style={styles.label}>Phone</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Phone number"
          keyboardType="Numeric"
          value={phone}
          onChangeText={(value) => setPhone(value)}
        />
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Email"
          keyboardType="defualt"
          value={email}
          onChangeText={(value) => setEmail(value)}
        />

        <TouchableOpacity
          style={styles.submitButton}
          onPress={() => handleSubmit()}
        >
          <Text style={styles.submitText}>Submit Changes</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default EditHouseDetails;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#DFF6E4" },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 15,
    color: "#216D58",
  },
  picker: {
    width: 100,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginTop: 5,
    fontSize: 14,
    backgroundColor: "#383A38",
  },
  input: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  submitButton: {
    backgroundColor: "#216D58",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  submitText: { color: "white", fontWeight: "bold", fontSize: 16 },
  error: { textAlign: "center", fontSize: 18, color: "red", marginTop: 20 },
  formContainer: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
  },
});
