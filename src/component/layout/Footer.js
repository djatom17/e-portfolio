import React from "react";
// import { Menu, Col, Row } from "antd";

const Footer = () => {
  return (
    <footer
      className="d-flex justify-content-center p-2 text-white mt-3"
      style={{ background: "black" }}
    >
      Copyright &copy; {new Date().getFullYear()} Control Alt Elite
    </footer>
  );
};

export default Footer;
