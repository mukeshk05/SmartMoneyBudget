"use strict";
import React from "react";
import "antd/dist/antd.css";
import "../../styles/index.css";
import {
  Form,
  Select,

  Button,
  Upload,
  Icon,

} from "antd";

const { Option } = Select;

class Cash extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
      }
    });
  };

  normFile = e => {
    console.log("Upload event:", e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="ant-layout">
        <Form onSubmit={this.handleSubmit}>
          <Form.Item label="Dragger">
            {getFieldDecorator("dragger", {
              valuePropName: "fileList",
              getValueFromEvent: this.normFile
            })(
              <Upload.Dragger name="files">
                <p className="ant-upload-drag-icon">
                  <Icon type="inbox" />
                </p>
                <p className="ant-upload-text">
                  Click or drag file to this area to upload
                </p>
                <p className="ant-upload-hint">
                  Support for a single or bulk upload.
                </p>
              </Upload.Dragger>
            )}
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

//const ScanPDF = Form.create({ name: 'validate_other' })(ScanPDF);

export default Form.create({ name: "validate_other" })(Cash);
