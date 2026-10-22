import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [loginId, setLoginId] = useState();
  const [worker, setWorker] = useState(null);
  const [workersList, setWorkersList] = useState([]);
  const [userList, setUserList] = useState([]);
  const [user, setUser] = useState(null);
  const [userListWithWordNo, setUserListWithWordNo] = useState(null);
  const API_HOST = "http://192.168.1.3:8000";

  const fetchUserListWithWardNo = async (wardNo) => {
    console.log("inside api", wardNo);
    if (wardNo) {
      try {
        const response = await axios.post(`${API_HOST}/api/user/list-Ward`, {
          wardNo,
        });

        if (response.data.success) {
          setUserListWithWordNo(response.data.users);
        } else {
          console.log(response.data.message);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  const fetchUserList = async () => {
    try {
      const response = await axios.post(`${API_HOST}/api/user/list`);
      if (response.data.success) {
        console.log(response.data.userList);
        setUserList(response.data.userList);
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const applyFineToUsers = async () => {
    try {
      const response = await axios.get(`${API_HOST}/api/admin/apply-fines`);

      if (response.data.status) {
        console.log("fine applied");
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (worker?.wardNo) fetchUserListWithWardNo(worker?.wardNo);
  }, [worker]);
  useEffect(() => {
    fetchUserList();
  }, []);
  useEffect(() => {
    applyFineToUsers();
  }, [loginId]);

  const value = {
    API_HOST,
    worker,
    setWorker,
    user,
    setUser,
    fetchUserListWithWardNo,
    setWorkersList,
    workersList,
    userListWithWordNo,
    setLoginId,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
