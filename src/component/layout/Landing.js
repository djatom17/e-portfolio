import React from "react";
import { Link } from "react-router-dom";
import { Row, Col, Button } from "antd";
import "antd/dist/antd.css";

const Landing = () => {
  return (
    <div className="landing">
      <div className="dark-overlay landing-inner text-light">
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-center">
              <h1 className="display-3 mb-4 text-light">Elite Flex</h1>
              <p className="lead">
                {" "}
                Create a developer profile/portfolio, share your achievements
                and flex!
              </p>
              <hr />
              <Row justify="center" gutter={10}>
                <Col>
                  <Button
                    type="primary"
                    style={{ fontSize: "24px", height: "auto" }}
                  >
                    <Link to="/my-profile">Start Flexing</Link>
                  </Button>
                </Col>
                <Col>
                  <Button style={{ fontSize: "24px", height: "auto" }}>
                    <Link to="/browse">Browse</Link>
                  </Button>
                </Col>
              </Row>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
