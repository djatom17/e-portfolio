import React from "react";
import { Menu, Col, Row } from "antd";

const Footer = () => {
  return (
    <footer className="d-flex justify-content-center">
      Copyright &copy; {new Date().getFullYear()} Control Alt Elite
    </footer>
  );
};

export default Footer;
