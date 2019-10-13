import React from "react";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import "antd/dist/antd.css";
import "../../../styles/index.css";
import { Upload, Icon,  Form, Button } from "antd";

const UPLOAD_MUTATION = gql`
  mutation submit($file: Upload!) {
    singleUpload(file: $file) {
      filename,
      mimetype,
      createdAt
    }
  }
`;

class ScanPDF extends React.Component {
  state = {
    fileList: [],
    uploading: false
  };

  render() {
    const { uploading, fileList } = this.state;
    const props = {
      onRemove: file => {
        this.setState(state => {
          const index = state.fileList.indexOf(file);
          const newFileList = state.fileList.slice();
          newFileList.splice(index, 1);
          return {
            fileList: newFileList
          };
        });
      },
      beforeUpload: file => {
        this.setState(state => ({
          fileList: [...state.fileList, file]
        }));
        return false;
      },
      fileList
    };

    return (
      <div className="ant-layout">
        <Form.Item label="Dragger">
          <Upload.Dragger name="files" {...props} >
            <p className="ant-upload-drag-icon">
              <Icon type="inbox" />
            </p>
            <p className="ant-upload-text">
              Click or drag file to this area to upload
            </p>
          </Upload.Dragger>
         </Form.Item>

        <Form.Item>
          <Mutation mutation={UPLOAD_MUTATION}>
            {mutation => (
              <Button
                type="primary"
                disabled={fileList.length === 0}
                loading={uploading}
                style={{ marginTop: 16 }}
                onClick={e => {
                  console.log("New file", this.state.fileList[0]);
                  const file = this.state.fileList[0];
                  mutation({
                    variables: {
                      file
                    }
                  });
                }}
              >
                {uploading ? "Uploading" : "Start Upload"}
              </Button>
            )}
          </Mutation>
        </Form.Item>
      </div>
    );
  }
}

//const ScanPDF = Form.create({ name: 'validate_other' })(ScanPDF);

export default Form.create({ name: "validate_other" })(ScanPDF);
