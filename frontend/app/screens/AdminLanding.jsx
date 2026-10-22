import React, { useEffect, useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ScrollView,
  Image,
} from "react-native";
import { useRouter } from "expo-router";
import Icon from "react-native-vector-icons/Ionicons";
import axios from "axios";
import { AppContext } from "../Context";

const AdminLanding = () => {
  const router = useRouter();
  const { setWorkersList, workersList, API_HOST } = useContext(AppContext);
  // Dummy ward & worker data

  useEffect(async () => {
    try {
      const response = await axios.get(`${API_HOST}/api/worker/list`);
      if (response.data.success) {
        setWorkersList(response.data.workers);
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <View style={styles.container}>
      {/* Admin Header */}
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <View style={styles.adminInfo}>
            <Text style={styles.adminText}>Admin</Text>
          </View>
          <View style={styles.headerButtonGroup}>
            <TouchableOpacity
              style={styles.logoutButton}
              onPress={() => router.push("./LoginScreen")}
            >
              <Text style={styles.logoutText}>Log out</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => router.push("./AdminNotification")}
              style={{ padding: 10 }}
            >
              <Icon name="notifications-outline" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Admin Action Buttons */}
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => router.push("./AddWorker")}
        >
          <Text style={styles.actionText}>Add Worker</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => router.push("./ChangeWorker")}
        >
          <Text style={styles.actionText}>Change Worker</Text>
        </TouchableOpacity>

        {/* Ward & Worker Table */}

        <View style={styles.tableContainer}>
          <Text style={styles.tableTitle}>Ward and Workers</Text>
          <View style={styles.tableHeader}>
            <Text style={styles.tableHeaderText}>WARD</Text>
            <Text style={styles.tableHeaderText}>WORKER</Text>
          </View>

          <FlatList
            data={workersList}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={styles.tableRow}>
                <TouchableOpacity
                  style={styles.tableRow}
                  onPress={() =>
                    router.push({
                      pathname: "./WardDetails",
                      params: {
                        _id: item._id,
                      },
                    })
                  }
                >
                  <Text style={styles.cell}>{item.wardNo}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.tableRow}
                  onPress={() =>
                    router.push({
                      pathname: "./WorkerDetails",
                      params: {
                        _id: item._id,
                      },
                    })
                  }
                >
                  <Text style={styles.cell}>{item.name}</Text>
                </TouchableOpacity>
              </View>
            )}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default AdminLanding;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D2F5D1",
    padding: 20,
  },
  headerButtonGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
  },
  adminInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  adminText: {
    fontWeight: "bold",
    fontSize: 16,
  },
  logoutButton: {
    backgroundColor: "#2E573A",
    padding: 8,
    borderRadius: 5,
  },
  logoutText: {
    color: "#fff",
    fontSize: 14,
  },
  notificationIcon: {
    width: 24,
    height: 24,
  },
  actionButton: {
    backgroundColor: "#2E573A",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 10,
  },
  actionText: {
    color: "#fff",
    fontWeight: "bold",
  },
  tableContainer: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  tableTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  tableHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  tableHeaderText: {
    fontWeight: "bold",
    fontSize: 14,
  },
  tableRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: 0.5,
    borderBottomColor: "#ccc",
  },
  tableCell: {
    fontSize: 14,
  },
});
