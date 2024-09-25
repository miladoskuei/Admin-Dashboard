import React, { useState, useEffect, useContext } from "react";
import "./user.css"
import Chart from "../../components/Topbar/chart/Chart";
import PublishIcon from "@mui/icons-material/Publish";
import { useMediaQuery } from "react-responsive";
import { database } from "../../firebaseConfig";
import { ref, get, update } from "firebase/database";
import { useParams } from "react-router-dom";
import UsersContext from "../../contexts/UsersContexts";

export default function User() {
  const isSmall = useMediaQuery({ maxWidth: 700 });

  const { fetchUsers } = useContext(UsersContext);

  const [user, setUser] = useState({});
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userStatus, setUserStatus] = useState("");
  const [componentKey, setComponentKey] = useState(Date.now());
  const { userId } = useParams();

  useEffect(() => {
    const fetchUser = async () => {
      const userRef = ref(database, "users/" + userId);
      const snapshot = await get(userRef);
      console.log("Current user data:", snapshot.val());

      if (snapshot.exists()) {
        setUser(snapshot.val());
        setUserName(snapshot.val().name);
        setUserEmail(snapshot.val().mail);
        setUserStatus(snapshot.val().status);
      } else {
        console.log("No such document!");
      }
    };

    fetchUser();
  }, [userId, componentKey]);

  const updateUser = async (userId, updatedUser) => {
    const userRef = ref(database, `users/${userId}`);
    try {
      await update(userRef, updatedUser);
      console.log("User updated successfully!");
      fetchUsers(); // بهروزرسانی لیست کاربران پس از ویرایش
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const submitEditHandler = async (e) => {
    e.preventDefault();
    const updatedUser = {
      name: userName,
      mail: userEmail,
      status: userStatus,
    };
    await updateUser(userId, updatedUser);

    alert("User updated successfully!");
    setComponentKey(Date.now());
  };

  return (
    <div className="user">
      <div className="userTitleContainer">
        <h1>{user.name}</h1>
      </div>
      <div className="userTop">
        <div
          className="userTopLeft"
          style={!isSmall ? { minWidth: "30rem" } : { minWidth: "auto" }}
        >
          <Chart
            yaxis="activity"
            title="User Activity"
            grid
            data={[]} // دادههای فعالیت کاربر را اینجا قرار دهید
            dataKey="activity"
          />
        </div>
        <div
          className="userTopRight"
          style={!isSmall ? { minWidth: "30rem" } : { minWidth: "100%" }}
        >
          <div className="userInfoTop">
            <img
              src={`${process.env.PUBLIC_URL}/logo192.png`}
              alt=""
              className="userInfoImg"
            />
            <span className="userName">{user.name}</span>
          </div>
          <div className="userInfoBottom">
            <div className="userInfoItem">
              <div className="userItemKey">ID</div>
              <div className="userItemValue">{user.code}</div>
            </div>
            <div className="userInfoItem">
              <div className="userItemKey">Name:</div>
              <div className="userItemValue">{user.name}</div>
            </div>
            <div className="userInfoItem">
              <div className="userItemKey">Email:</div>
              <div className="userItemValue">{user.mail}</div>
            </div>
            <div className="userInfoItem">
              <div className="userItemKey">Status:</div>
              <div className="userItemValue">{user.status}</div>
            </div>
          </div>
        </div>
      </div>
      <div className="userBottom">
        <form onSubmit={submitEditHandler} className="userForm">
          <div className="userFormLeft">
            <label htmlFor="userName">User Name:</label>
            <input
              type="text"
              placeholder="Enter user name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
            <label htmlFor="userEmail">Email:</label>
            <input
              type="email"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
            />
            <label htmlFor="userStatus">Status:</label>
            <input
              type="text"
              value={userStatus}
              onChange={(e) => setUserStatus(e.target.value)}
            />
          </div>
          <div className="userFormRight">
            <div className="userUploader">
              <img
                className="userUploadImg"
                src={`${process.env.PUBLIC_URL}/logo192.png`}
                alt=""
              />
              <label htmlFor="file">
                <PublishIcon />
              </label>
              <input type="file" style={{ display: "none" }} id="file" />
            </div>
            <button className="userButton">Update User</button>
          </div>
        </form>
      </div>
    </div>
  );
}
