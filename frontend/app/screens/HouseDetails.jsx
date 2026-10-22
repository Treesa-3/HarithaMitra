import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { AppContext } from "../Context";
import { useContext, useEffect, useState } from "react";
import axios from "axios";

const HouseDetails = () => {
  const router = useRouter();
  const { houseNo } = useLocalSearchParams();
  let _id = "";
  const { userListWithWordNo, API_HOST, fetchUserListWithWardNo } =
    useContext(AppContext);

  const [house, setHouse] = useState();

  useEffect(() => {
    setHouse(userListWithWordNo?.find((u) => u.houseNo === houseNo)); // Find worker by ID
  }, [houseNo, userListWithWordNo]);

  useEffect(() => {
    _id = house?._id;
  }, [house]);

  const deleteHouse = async () => {
    console.log(house._id, "inside delete");

    try {
      const response = await axios.put(`${API_HOST}/api/user/delete`, {
        _id,
      });
      if (response.data.success) {
        console.log(response.data);
        fetchUserListWithWardNo(house?.wardNo);
        router.back();
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleSendNotification = async () => {
    const payload = {
      message: `your waste collection fee payment is overdue and a fine [amount] has been applied.please make the payment promptly to avoid further charges!`,
      type: "payment_due",
    };
    try {
      const response = await axios.post(
        `${API_HOST}/api/user/notification/${_id}`,
        payload
      );
      return response.data;
    } catch (error) {
      console.error("Error adding notification:", error);
      throw error;
    }
  };
  return (
    <View style={styles.container}>
      <ScrollView style={styles.container}>
        {/* House Info */}
        <View style={styles.houseCard}>
          <View style={styles.headerRow}>
            <Text style={styles.houseTitle}>House {house?.houseNo}</Text>
          </View>
          <Text style={styles.owner}>{house?.owner}</Text>
          <Text style={styles.info}>📍 {house?.address}</Text>
          <Text style={styles.info}>📞 {house?.contact}</Text>

          {/* Send SMS Button */}
          <TouchableOpacity
            style={styles.smsButton}
            onPress={() => handleSendNotification()}
          >
            <Text style={styles.smsText}>📩 Send SMS</Text>
          </TouchableOpacity>
          <View style={styles.editButtonContainer}>
            <TouchableOpacity
              style={styles.editButton}
              onPress={() =>
                router.push({
                  pathname: "./EditHouseDetails",
                  params: {
                    houseNo: houseNo,
                  },
                })
              }
            >
              <Text style={styles.editText}>Modify</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.editButton}
              onPress={() => deleteHouse()}
            >
              <Text style={styles.editText}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Waste Collection Table */}
        <View style={styles.table}>
          <View style={styles.rowHeader}>
            <Text style={styles.cellHeader}>Month</Text>
            <Text style={styles.cellHeader}>Plastic (Kg)</Text>
            <Text style={styles.cellHeader}>E-waste (Kg)</Text>
            <Text style={styles.cellHeader}>Domestic (Kg)</Text>
            <Text style={styles.cellHeader}>Payment Status</Text>
            <Text style={styles.cellHeader}>Fine Imposed</Text>
          </View>

          <FlatList
            data={house?.wasteData}
            keyExtractor={(item) => item.month}
            renderItem={({ item }) => (
              <View style={styles.row}>
                <Text style={styles.cell}>{item.date.slice(4, 15)}</Text>
                <Text style={styles.cell}>{item.plastic}</Text>
                <Text style={styles.cell}>{item.eWaste}</Text>
                <Text style={styles.cell}>{item.domestic}</Text>
                <Text style={styles.cell}>{`${
                  item.paymentStatus ? "Yes" : "No"
                }`}</Text>
                <Text style={styles.cell}>{`${item.fine ? "Yes" : "No"}`}</Text>
              </View>
            )}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default HouseDetails;

const styles = StyleSheet.create({
  editButtonContainer: {
    display: "flex",
    flexDirection: "row",
    padding: 5,
    justifyContent: "space-evenly",
  },
  container: { flex: 1, padding: 5, backgroundColor: "#DFF6E4" },
  houseCard: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  houseTitle: { fontSize: 18, fontWeight: "bold" },
  editButton: {
    backgroundColor: "#ccc",
    padding: 5,
    borderRadius: 5,
    padding: 10,
  },
  editText: { fontSize: 12, fontWeight: "bold" },

  owner: { fontSize: 16, fontWeight: "bold", marginTop: 5 },
  info: { fontSize: 14, color: "#555", marginTop: 5 },

  smsButton: {
    backgroundColor: "#216D58",
    padding: 10,
    marginTop: 10,
    borderRadius: 5,
  },
  smsText: { color: "white", fontWeight: "bold", textAlign: "center" },

  table: {
    backgroundColor: "white",
    borderRadius: 10,
    overflow: "hidden",
    marginTop: 10,
  },
  rowHeader: { flexDirection: "row", backgroundColor: "#ddd", padding: 10 },
  cellHeader: { flex: 1, fontWeight: "bold", textAlign: "center" },

  row: {
    flexDirection: "row",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  cell: { flex: 1, textAlign: "center", fontSize: 14 },

  error: { textAlign: "center", fontSize: 18, color: "red", marginTop: 20 },
});
