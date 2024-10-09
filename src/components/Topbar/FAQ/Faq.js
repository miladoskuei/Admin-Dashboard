import React from "react";
import { useList } from "react-firebase-hooks/database";
import { ref } from "firebase/database";
import { database } from "../../../firebaseConfig";
import Faq from "react-faq-component";
import { Link } from "react-router-dom";
import styled from "styled-components";
import "./faq.css"

const AddButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  color: white;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;
  display: block;
  margin-left: auto;
  margin-right: auto;

  &:hover {
    background-color: #0056b3;
  }
`;

const styles = {
  bgColor: "#f9f9f9",
  titleTextColor: "#0d47a1",
  rowTitleColor: "#1e88e5",
  rowContentColor: "#424242",
  arrowColor: "#0d47a1",
  rowContentPaddingTop: "10px",
  rowContentPaddingBottom: "10px",
  rowContentPaddingLeft: "20px",
  rowContentPaddingRight: "20px",
  transitionDuration: "0.5s",
  timingFunc: "ease-in-out",
  fontFamily: "Roboto, sans-serif",
};

const config = {
  animate: true,
  arrowIcon: "V",
  tabFocus: true,
};

const FaqComponent = () => {
  const [snapshots, loading, error] = useList(ref(database, "faqs"));

  if (loading) return <div> Loading... </div>;
  if (error) return <div> Error: {error.message} </div>;

  const data = {
    title: "Frequently Asked Questions",
    rows: snapshots.map((snapshot) => ({
      title: snapshot.val().question,
      content: snapshot.val().answer,
    })),
  };

  return (
    <div className="container">
      <Faq data={data} styles={styles} config={config} />{" "}
      <Link to="/faq/add">
        <AddButton> اضافه کردن سوال جدید </AddButton>{" "}
      </Link>{" "}
    </div>
  );
};

export default FaqComponent;
