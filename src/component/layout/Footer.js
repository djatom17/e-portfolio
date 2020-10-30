import React from "react";
// import { Menu, Col, Row } from "antd";

const Footer = () => {
  return (
    <footer
      className="footer-height d-flex justify-content-center text-white "
      style={{ background: "black" }}
    >
      Copyright &copy; {new Date().getFullYear()} Control Alt Elite
    </footer>
  );
};

export default Footer;
