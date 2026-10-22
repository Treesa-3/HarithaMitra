import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useState, useContext, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { AppContext } from "../Context";
import { useRouter } from "expo-router";

const WorkerLanding = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [tableData, seTtableData] = useState([]);
  const { worker, userListWithWordNo } = useContext(AppContext);

  // Filter houses based on search input

  useEffect(() => {
    let tempData = [];
    userListWithWordNo?.map((item) => {
      tempData.push({
        _id: item._id,
        houseNo: item.houseNo,
        owner: item.owner,
        contact: item.contact,
      });
    });
    seTtableData(tempData);
  }, [userListWithWordNo]);

  useEffect(() => {
    let tempData = [];
    tempData = userListWithWordNo?.filter((house) =>
      house.houseNo.toLowerCase().includes(searchQuery.toLowerCase())
    );
    seTtableData(tempData);
  }, [searchQuery]);

  return (
    <View style={styles.container}>
      {/* Worker Profile Section */}
      <View style={styles.profileSection}>
        <Ionicons
          name="paper-plane-outline"
          size={20}
          color="black"
          onPress={() => router.push("../screens/SendNotificationScreen")}
        />
        <Text style={styles.workerName}>{worker?.name}</Text>
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => router.push("../screens/LoginScreen")}
        >
          <Text style={styles.logoutText}>Log out</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.workerInfo}>🏠 WORKER ID: {worker?.userName}</Text>
      <Text style={styles.workerInfo}>📍 WARD: {worker?.wardNo}</Text>

      {/* Search Bar & Notification Icon */}
      <View style={styles.searchSection}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search house number..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <Ionicons
          name="notifications-outline"
          size={24}
          color="black"
          onPress={() => router.push("../screens/WorkerNotificationScreen")}
        />
      </View>

      {/* House List Table */}
      <View style={styles.tableHeader}>
        <Text style={styles.tableHeaderText}>House No</Text>
        <Text style={styles.tableHeaderText}>Owner's Name</Text>
        <Text style={styles.tableHeaderText}>Phone Number</Text>
      </View>

      <FlatList
        data={tableData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              router.push({
                pathname: "../screens/WorkerDashboard",
                params: {
                  _id: item._id,
                  houseNo: item.houseNo,
                },
              })
            }
          >
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>{item.houseNo}</Text>
              <Text style={styles.tableCell}>{item.owner}</Text>
              <Text style={styles.tableCell}>{item.contact}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default WorkerLanding;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15, backgroundColor: "#DFF6E4" },
  profileSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  workerName: { fontSize: 18, fontWeight: "bold", marginLeft: 10 },
  logoutButton: { backgroundColor: "#1C4E3C", padding: 8, borderRadius: 5 },
  logoutText: { color: "white", fontWeight: "bold" },
  workerInfo: { fontSize: 14, marginTop: 5, marginLeft: 5 },
  searchSection: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  searchInput: {
    flex: 1,
    padding: 8,
    backgroundColor: "white",
    borderRadius: 5,
    marginRight: 10,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#1C4E3C",
    padding: 8,
    borderRadius: 5,
  },
  tableHeaderText: {
    flex: 1,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
  tableRow: {
    flexDirection: "row",
    backgroundColor: "white",
    padding: 8,
    borderRadius: 5,
    marginVertical: 5,
  },
  tableCell: { flex: 1, textAlign: "center" },
});
