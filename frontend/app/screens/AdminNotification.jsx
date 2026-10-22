import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AppContext } from "../Context";

const mockNotifications = [
  {
    id: "1",
    type: "Slot Booking",
    name: "Sreeleela",
    userId: "#USR001",
    wardNo: 12,
    address: "123 Main St, City",
    status: "New",
  },
  {
    id: "2",
    type: "Waste Bin",
    name: "Leela",
    userId: "#USR002",
    wardNo: 15,
    address: "456 Oak Ave, City",
    status: "Pending",
  },
  {
    id: "3",
    type: "Waste Bin",
    name: "Kavitha",
    userId: "#USR002",
    wardNo: 15,
    address: "456 Oak Ave, City",
    status: "Pending",
  },
  {
    id: "4",
    type: "Biogas",
    name: "John",
    userId: "#USR002",
    wardNo: 15,
    address: "456 Oak Ave, City",
    status: "Pending",
  },
  {
    id: "5",
    type: "Cloth Bag",
    name: "Alex",
    userId: "#USR002",
    wardNo: 15,
    address: "456 Oak Ave, City",
    status: "Pending",
  },
];

const requestTypes = ["Slot Booking", "Service Booking", "Complaints"];

const AdminNotification = () => {
  const [selectedType, setSelectedType] = useState("Slot Booking");
  const { API_HOST } = useContext(AppContext);
  const [slotBookingList, setSlotBookingList] = useState([]);
  const [complaintList, setComplaintList] = useState([]);
  const [serviceList, setServiceList] = useState([]);

  // Filter notifications based on selected category

  const fetchComplaints = async () => {
    try {
      const response = await axios.get(
        `${API_HOST}/api/complaint/list-complaint`
      );
      if (response.data.success) {
        setComplaintList(response.data.complaintList);
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const fetchServices = async () => {
    try {
      const response = await axios.get(`${API_HOST}/api/service/list-service`);
      if (response.data.success) {
        const tempData = response?.data?.data?.filter(
          (item) => item.adminAcceptStatus == false
        );
        setServiceList(tempData);
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const fetchSlotBookings = async () => {
    try {
      const response = await axios.get(`${API_HOST}/api/slot/list-slotBooking`);
      if (response.data.success) {
        const tempData = response?.data?.data?.filter(
          (item) => item.adminAcceptStatus == false
        );
        setSlotBookingList(tempData);
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const assignToWorker = async (_id, status) => {
    try {
      const response = await axios.post(`${API_HOST}/api/slot/${_id}`, {
        status,
        admin: true,
      });
      if (response.data.success) {
        alert("assigned to worker");
        fetchSlotBookings();
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateStatusForService = async (serviceId, status) => {
    try {
      const response = await axios.put(
        `${API_HOST}/api/service/update-status/${serviceId}`,
        {
          status,
        }
      );
      if (response.data.success) {
        fetchServices();
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchComplaints();
    fetchServices();
    fetchSlotBookings();
  }, []);

  const sendNotificationToUser = async (
    userId,
    date,
    optServices,
    serviceId,
    status
  ) => {
    const payload = {
      message: `Your service booking for ${optServices.map(
        (item) => `${item} ,`
      )} on ${date}  has been successfully confirmed.Thank you for choosing Harithamitra`,
      type: "Service Booking",
    };

    try {
      const response = await axios.post(
        `${API_HOST}/api/user/notification/${userId}`,
        payload
      );
      if (response) {
        updateStatusForService(serviceId, status);
      }
    } catch (error) {
      console.error("Error adding notification:", error);
      throw error;
    }
  };

  useEffect(() => {
    console.log(serviceList, "serviceList");
    console.log(selectedType, "selectedType");
  }, [serviceList, selectedType]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notifications</Text>

      {/* Request Type Tabs */}
      <View style={styles.tabs}>
        {requestTypes.map((type) => (
          <TouchableOpacity
            key={type}
            style={[styles.tab, selectedType === type && styles.activeTab]}
            onPress={() => setSelectedType(type)}
          >
            <Text style={styles.tabText}>{type}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {selectedType === "Complaints" ? (
        <FlatList
          data={complaintList}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.cardTitleComplaint}>
                {item.type} Complaint
              </Text>
              <Text>
                <Text style={styles.label}>Name:</Text> {item.userName}
              </Text>
              <Text>
                <Text style={styles.label}>Ward No:</Text> {item.wardNo}
              </Text>
              <Text>
                <Text style={styles.label}>Address:</Text> {item.location}
              </Text>
              <Text>
                <Text style={styles.label}>description:</Text>{" "}
                {item.description}
              </Text>
              <Text>
                <Text style={styles.label}>contact:</Text> {item.contact}
              </Text>
            </View>
          )}
        />
      ) : selectedType === "Service Booking" ? (
        <>
          <FlatList
            data={serviceList}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <Text style={styles.cardTitleComplaint}>Booked Services</Text>
                <Text>
                  <Text style={styles.label}>Name: </Text> {item.user}
                </Text>
                <Text>
                  <Text style={styles.label}>Ward No: </Text> {item.wardNo}
                </Text>
                <Text>
                  <Text style={styles.label}>Requested Services: </Text>
                  {item.serviceOpt.map((item) => (
                    <Text style={styles.label}>{`${item} `}</Text>
                  ))}
                </Text>
                <Text>
                  <Text style={styles.label}>Date:</Text> {item.date}
                </Text>
                {/* Action Buttons */}
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={styles.acceptButton}
                    onPress={() => {
                      sendNotificationToUser(
                        item.userId,
                        item.date,
                        item.serviceOpt,
                        item._id,
                        true
                      );
                    }}
                  >
                    <Text style={styles.buttonText}>Accept</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
        </>
      ) : (
        <FlatList
          data={slotBookingList}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.cardTitleComplaint}>Slot Bookings</Text>
              <Text>
                <Text style={styles.label}>Name: </Text> {item.userName}
              </Text>
              <Text>
                <Text style={styles.label}>Ward No: </Text> {item.wardNo}
              </Text>
              <Text>
                <Text style={styles.label}>Location: </Text>
                {item.location}
              </Text>
              <Text>
                <Text style={styles.label}>Requested Date: </Text>
                {item.date}
              </Text>
              <Text>
                <Text style={styles.label}>Requested Time: </Text>
                {item.time}
              </Text>
              {/* Action Buttons */}
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.acceptButton}
                  onPress={() => {
                    assignToWorker(item._id, true);
                  }}
                >
                  <Text style={styles.buttonText}>Assign to Worker</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
};

export default AdminNotification;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#DFF6E4" },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 15,
    color: "#216D58",
  },
  tabs: {
    flexDirection: "row",
    marginBottom: 10,
    display: "grid",
    gridTemplateColumn: "1fr 1fr",
  },
  tab: {
    flex: 1,
    padding: 10,
    margin: 3,
    backgroundColor: "#1C4E3C",
    alignItems: "center",
    borderRadius: 5,
  },
  activeTab: { backgroundColor: "#32a38c" },
  tabText: { color: "white", fontWeight: "bold" },
  card: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  cardTitle: { fontSize: 16, fontWeight: "bold", color: "#1C4E3C" },
  cardTitleComplaint: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FF3838",
    marginBottom: 10,
  },
  statusBadge: (status) => ({
    alignSelf: "flex-end",
    backgroundColor: status === "New" ? "#4CAF50" : "#FFA500",
    color: "white",
    paddingHorizontal: 10,
    borderRadius: 5,
  }),
  label: { fontWeight: "bold" },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  acceptButton: {
    backgroundColor: "#1C4E3C",
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginRight: 5,
  },
  rejectButton: {
    backgroundColor: "#D9534F",
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginLeft: 5,
  },
  buttonText: { textAlign: "center", color: "white", fontWeight: "bold" },
});
