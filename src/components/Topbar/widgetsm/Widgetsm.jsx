import React from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import "./widget.css";
import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import useFetch from "../../../custom hooks/useFetch";
import { func } from "prop-types";
import { fetchDatas } from "../../../helpers/fetch";

export default function Widgetsm() {
  // const {
  //   data: users,
  //   isPending:isLoading,
  //   error:isError,
  // } = useFetch(
  //   "https://myproject-4e193-default-rtdb.firebaseio.com/user1.json"
  // );
  // console.log('users',users)

  const {
    isLoading,
    isError,
    error,
    data: users,
  } = useQuery("Users",() => fetchDatas("https://myproject-4e193-default-rtdb.firebaseio.com/user1.json"));

  //////////////

  // if(isLoading){
  //   return <h1>is loading users</h1>
  // }
  // if(isError){
  //   return <h1>eror</h1>
  // }
  // if(! isLoading && ! isError){
  //   console.log('data',data)

  // }
  // return ( <h1>data's recivedss</h1>)
  // useEffect(() => {
  //   async function fetchdata() {
  //     const data = await fetch(
  //       "https://myproject-4e193-default-rtdb.firebaseio.com/user1.json"
  //     );
  //     const response = await data.json();
  //     console.log(Object.entries(response));

  //     setUsers(Object.entries(response));
  //   }
  //   fetchdata();
  //   // console.log(users[0][1].username);
  // }, []);

  // setUsers(data);

  return (
    <div className="widget-sm">
      <h3 className="title-widget"> new users </h3>{" "}
      <ul className="widgetsm-list">
        {" "}
        {isLoading && <h1> Loading Data 's ...</h1>}{" "}
        {isError && <h1> fetch error... </h1>}{" "}
        {users &&
          users.map((user, index) => (
            <li key={index} className="widget-list-item">
              <img className="widget-img" src="favicon.ico" alt="User" />
              <div className="user">
                <span className="username"> {user[1].username} </span>{" "}
                <span className="user-role"> {user[1].role} </span>{" "}
              </div>{" "}
              <button className="widget-btn" type="button">
                <VisibilityIcon className="widget-icon"> </VisibilityIcon>{" "}
              </button>{" "}
            </li>
          ))}{" "}
      </ul>{" "}
    </div>
  );
}
