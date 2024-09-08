import React from "react";
import { Link } from "react-router-dom";
import Feature from "../../components/Topbar/features/Feature";
import Chart from "../../components/Topbar/chart/Chart";
import { costChartDatas } from "../../datas/routes/costChartDatas";
import Widgetsm from "../../components/Topbar/widgetsm/Widgetsm";
import Widgetlg from "../../components/Topbar/widgetlg/Widgetlg";


export default function Home() {

  return (
    <div style={{flex:4, padding: "1rem",display:'flex', flexDirection:'column', gap:'2rem',overflowX:'hidden' }}>
      <h1 style={{ textAlign: "center" }}>Welcome dashboard</h1>
      <Feature></Feature>
      <Chart yaxis='value' title="salary" grid data={costChartDatas} dataKey="value" ></Chart>
      {/* <p>This is the home page.</p>
        <Link to={'/users'}>users</Link> */}
      <div className="widgets" style={{display:'flex',gap:'2rem',flexWrap:'wrap'}}>
        <Widgetsm></Widgetsm>
        <Widgetlg></Widgetlg>

      </div>
    </div>
  );
}
