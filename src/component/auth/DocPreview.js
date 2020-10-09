import React, { Component, Fragment } from "react";
import { Document, Page, pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.js";
import "antd/dist/antd.css";
import { Row, Col, Modal } from "antd";

export class DocPreview extends Component {
  state = {
    title: "",
    url: "",
  };

  componentDidMount = () => {
    this.setState({
      title: this.props.title,
      url: this.props.url,
    });
  };

  render() {
    return (
      <Fragment>
        <Modal
          title={this.state.title}
          visible={this.props.visible}
          centered={true}
          closable={true}
          width="auto"
          onCancel={this.props.handleCancel}
        >
          <Document file={this.state.url}>
            <Page pageNumber={1}></Page>
          </Document>
        </Modal>
      </Fragment>
    );
  }
}

export default DocPreview;
