// utils/applyFines.js
import userModel from "../models/userModel.js";
import dayjs from "dayjs"; // a nice date library

export const applyFinesToUsers = async () => {
  try {
    const users = await userModel.find({});

    for (const user of users) {
      let userUpdated = false;

      user.wasteData.forEach((entry) => {
        const entryDate = dayjs(entry.date);
        const now = dayjs();

        const isMoreThanOneMonth = now.diff(entryDate, "month") >= 1;

        if (!entry.paymentStatus && isMoreThanOneMonth) {
          if (!entry.fine || entry.fine === 0) {
            entry.fine = 10; // or whatever value you want
            userUpdated = true;
          }
        }
      });

      if (userUpdated) {
        await user.save(); // only save if we changed anything
      }
    }

    console.log("✅ Fines updated successfully.");
  } catch (error) {
    console.error("❌ Error updating fines:", error);
  }
};
