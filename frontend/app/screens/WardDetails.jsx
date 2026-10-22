import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { AppContext } from "../Context";
import { useContext, useEffect, useState } from "react";
import axios from "axios";

const WardDetails = () => {
  const { _id } = useLocalSearchParams(); // Get worker details from params
  const { workersList, userListWithWordNo, fetchUserListWithWardNo } =
    useContext(AppContext);
  const [worker, setWorker] = useState();
  // const [worker, setWorker] = useState();

  useEffect(() => {
    setWorker(workersList.find((w) => w._id === _id)); // Find worker by ID
  }, []);

  useEffect(() => {
    fetchUserListWithWardNo(worker?.wardNo);
  }, [worker]);

  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Worker Info Section */}
      <ScrollView style={styles.container}>
        <View style={styles.workerCard}>
          <Text style={styles.workerName}>{worker?.name}</Text>
          <Text style={styles.workerContact}>📞 {worker?.contact}</Text>
        </View>

        {/* House Table */}
        <View style={styles.table}>
          <View style={styles.rowHeader}>
            <Text style={styles.cellHeader}>House No</Text>
            <Text style={styles.cellHeader}>Owner's Name</Text>
            <Text style={styles.cellHeader}>Action</Text>
          </View>

          <FlatList
            data={userListWithWordNo}
            keyExtractor={(item) => item.houseNo}
            renderItem={({ item }) => (
              <View style={styles.row}>
                <Text style={[styles.cell, item.overdue && styles.overdue]}>
                  {item.overdue ? "• " : ""}
                  {item.houseNo}
                </Text>
                <Text style={styles.cell}>{item.owner}</Text>
                <TouchableOpacity
                  style={styles.detailsButton}
                  onPress={() =>
                    router.push({
                      pathname: "./HouseDetails",
                      params: {
                        houseNo: item.houseNo,
                      },
                    })
                  }
                >
                  <Text style={styles.detailsText}>Details</Text>
                </TouchableOpacity>
              </View>
            )}
          />
        </View>
      </ScrollView>
      {/* Overdue Payment Indicator */}
      <Text style={styles.overdueNote}>• indicates overdue payment</Text>
    </View>
  );
};

export default WardDetails;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#DFF6E4" },
  workerCard: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  workerName: { fontSize: 18, fontWeight: "bold" },
  workerContact: { fontSize: 16, color: "#555", marginTop: 5 },

  table: { backgroundColor: "white", borderRadius: 10, overflow: "hidden" },
  rowHeader: { flexDirection: "row", backgroundColor: "#ddd", padding: 10 },
  cellHeader: { flex: 1, fontWeight: "bold", textAlign: "center" },

  row: {
    flexDirection: "row",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  cell: { flex: 1, textAlign: "center", fontSize: 15 },
  overdue: { color: "red", fontWeight: "bold" },

  detailsButton: { backgroundColor: "#216D58", padding: 8, borderRadius: 5 },
  detailsText: { color: "white", fontWeight: "bold", textAlign: "center" },

  overdueNote: {
    marginTop: 10,
    fontSize: 14,
    color: "gray",
    textAlign: "center",
  },
});
