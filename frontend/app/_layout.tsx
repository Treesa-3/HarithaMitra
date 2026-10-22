// @ts-ignore
import { Stack } from "expo-router";
// @ts-ignore
import { AppProvider } from "./Context";

export default function Layout() {
  return (
    <AppProvider>
      <Stack>
        <Stack.Screen
          name="screens/GetStartedScreen"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="screens/LoginScreen"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="screens/AdminLanding"
          options={{ headerShown: true, title: "Dashboard" }}
        />
        <Stack.Screen
          name="screens/AddWorker"
          options={{ headerShown: true, title: "Add Worker" }}
        />
        <Stack.Screen
          name="screens/ChangeWorker"
          options={{ headerShown: true, title: "Change Worker" }}
        />
        <Stack.Screen
          name="screens/AddNewHouse"
          options={{ headerShown: true, title: " AddNewHouse" }}
        />
        <Stack.Screen
          name="screens/HouseDetails"
          options={{ headerShown: true, title: " House Details" }}
        />
        <Stack.Screen
          name="screens/WorkerDetails"
          options={{ headerShown: true, title: " Worker Details" }}
        />
        <Stack.Screen
          name="screens/WorkerDashboard"
          options={{ headerShown: true, title: " Worker Dashboard" }}
        />
        <Stack.Screen
          name="ServiceBooking"
          options={{ headerShown: true, title: "Service Booking" }}
        />
        <Stack.Screen
          name="SlotBooking"
          options={{ headerShown: true, title: "Slot Booking" }}
        />
        <Stack.Screen
          name="RegisterComplaint"
          options={{ headerShown: true, title: "Register Complaint" }}
        />
        <Stack.Screen
          name="PaymentScreen"
          options={{ headerShown: true, title: "Payment Screen" }}
        />
        <Stack.Screen
          name="ReceiptScreen"
          options={{ headerShown: true, title: "Receipt Screen" }}
        />
        <Stack.Screen
          name="SendNotificationScreen"
          options={{ headerShown: true, title: "Send Notification Screen" }}
        />
        <Stack.Screen
          name="UserNotificationScreen"
          options={{ headerShown: true, title: "User rNotification Screen" }}
        />
      </Stack>
    </AppProvider>
  );
}
