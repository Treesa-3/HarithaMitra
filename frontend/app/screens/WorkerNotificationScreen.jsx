import React, { useEffect, useState, useContext } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import axios from "axios";
import { AppContext } from "../Context";

const WorkerNotificationScreen = () => {
  const { worker, API_HOST } = useContext(AppContext);
  const [slotBookingList, setSlotBookingList] = useState([]);

  const handleSendNotification = async (userId, date, timeSlot) => {
    // Here you can loop through all users and send notifications using your API

    const payload = {
      message: `Your slot booking request on ${date} at ${timeSlot} has been successfully confirmed.Thank you for choosing Harithamitra`,
      type: "Slot Booking",
    };

    try {
      const response = await axios.post(
        `${API_HOST}/api/user/notification/${userId}`,
        payload
      );
      if (response) alert("notification send");
    } catch (error) {
      console.error("Error adding notification:", error);
      throw error;
    }

    // TODO: Use addNotification API here
  };

  const handleAccept = async (_id, status, userId, date, timeSlot) => {
    // Add API call logic here
    console.log(_id, "_id");

    try {
      const response = await axios.post(`${API_HOST}/api/slot/${_id}`, {
        status,
        admin: false,
      });
      if (response.data.success) {
        fetchSlotBookings();
        handleSendNotification(userId, date, timeSlot);
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
          (item) =>
            item.adminAcceptStatus === true &&
            item.workerAcceptStatus === false &&
            item.wardNo === worker.wardNo
        );
        setSlotBookingList(tempData);
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchSlotBookings();
  }, []);
  useEffect(() => {
    console.log(slotBookingList, "slotBookingList");
  }, [slotBookingList]);

  const renderCard = ({ item }) => (
    <View
      style={{
        backgroundColor: "#fff",
        borderColor: "#CCF5E7",
        borderWidth: 2,
        borderRadius: 10,
        padding: 15,
        marginVertical: 8,
      }}
    >
      <Text style={{ color: "red", fontWeight: "bold", marginBottom: 5 }}>
        Slot Bookings
      </Text>
      <Text>
        <Text style={{ fontWeight: "bold" }}>Name:</Text> {item.userName}
      </Text>
      <Text>
        <Text style={{ fontWeight: "bold" }}>Ward No:</Text> {item.wardNo}
      </Text>
      <Text>
        <Text style={{ fontWeight: "bold" }}>House No:</Text>
        {item.userId}
      </Text>
      <Text>
        <Text style={{ fontWeight: "bold" }}>Date:</Text>{" "}
        {new Date(item.date).toLocaleString()}
      </Text>
      <Text>
        <Text style={{ fontWeight: "bold" }}>Time:</Text>{" "}
        {new Date(item.time).toLocaleString()}
      </Text>
      <Text>
        <Text style={{ fontWeight: "bold" }}>Location:</Text>
        {item.location}
      </Text>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 15,
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: "#0f4c3a",
            paddingVertical: 10,
            paddingHorizontal: 20,
            borderRadius: 6,
            width: "100%",
          }}
          onPress={() =>
            handleAccept(item._id, true, item.userId, item.date, item.time)
          }
        >
          <Text style={{ color: "#fff", fontWeight: "bold" }}>Accept</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={{ flex: 1, padding: 16, backgroundColor: "#CCF5E7" }}>
      {slotBookingList.length ? (
        <FlatList
          data={slotBookingList}
          keyExtractor={(item) => item.id}
          renderItem={renderCard}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View>
          <Text style={{ fontWeight: "bold", flex: "center", padding: 15 }}>
            Slot Booking List is empty
          </Text>
        </View>
      )}
    </View>
  );
};

export default WorkerNotificationScreen;
