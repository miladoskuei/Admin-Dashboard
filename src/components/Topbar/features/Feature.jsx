import React from "react";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import "../features/feature.css";
import { Row, Container, Col } from "react-bootstrap";

export default function Feature() {
  return (
    <Container>
  <Row className="g-5">
    <Col xl={4}  sm={12}>
      <div className="feature-item">
        <span className="feature-title">Revenue</span>
        <div className="feature-container">
          <span className="feature-cost">$214</span>
          <span className="feature-changes">
            -11.4{" "}
            <ArrowDownwardIcon className="feature-icon negative"></ArrowDownwardIcon>
          </span>
        </div>
        <span className="feature-sub">compared to last month</span>
      </div>
    </Col>
    <Col xl={4}  sm={12}>
      <div className="feature-item">
        <span className="feature-title">Revenue</span>
        <div className="feature-container">
          <span className="feature-cost">$214</span>
          <span className="feature-changes">
            -11.4{" "}
            <ArrowDownwardIcon className="feature-icon negative"></ArrowDownwardIcon>
          </span>
        </div>
        <span className="feature-sub">compared to last month</span>
      </div>
    </Col>
    <Col xl={4}  sm={12}>
      <div className="feature-item">
        <span className="feature-title">Revenue</span>
        <div className="feature-container">
          <span className="feature-cost">$214</span>
          <span className="feature-changes">
            -11.4{" "}
            <ArrowDownwardIcon className="feature-icon negative"></ArrowDownwardIcon>
          </span>
        </div>
        <span className="feature-sub">compared to last month</span>
      </div>
    </Col>
  </Row>
</Container>


  );
}

