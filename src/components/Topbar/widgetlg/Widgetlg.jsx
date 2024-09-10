import React from "react";
import "./widgetls.css";
import { transactions } from "../../../datas/routes/transaction";
import { useQueryClient } from "react-query";

export default function Widgetlg() {
  const Button = ({ type }) => (
    <button className={"widgetLgButton  " + type}> {type} </button>
  );
  const useGetFetchQuery = (name) => {
    const queryClient = new useQueryClient();

    return queryClient.getQueryData([name]);
  };

  const data = useGetFetchQuery("Users");
  console.log("data in useGetFetchQuery is", data);

  return (
    <div className="widgetlg">
      <h3 className="widgetLgTitle"> latest transactions </h3>{" "}
      <table className="widgetLgTable">
        <tr className="widgetLgTr">
          <th className="widgetLgTh"> customer </th>{" "}
          <th className="widgetLgTh"> date </th>{" "}
          <th className="widgetLgTh"> amount </th>{" "}
          <th className="widgetLgTh"> status </th>{" "}
        </tr>{" "}
        {transactions.map((transaction) => (
          <tr className="widgetLgTr">
            <td className="widgetLgUser">
              <img className="widgetLgImg" src={`${process.env.PUBLIC_URL}/logo192.png`} alt="" />
              <span className="widgetLgName">
                {" "}
                {transaction.customer}{" "}
              </span>{" "}
            </td>{" "}
            <td className="widgetLgDate"> {transaction.date} </td>{" "}
            <td className="widgetLgAmount"> {transaction.amount} </td>{" "}
            <td className="widgetLgStatus">
              <Button type="Approved"> </Button>{" "}
            </td>{" "}
          </tr>
        ))}{" "}
      </table>{" "}
    </div>
  );
}
