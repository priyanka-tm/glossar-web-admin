import { Stack } from '@mui/material';
import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import 'src/Attech/Index.css';

export default class MultipleImageUploadComponent extends Component {
  fileObj = [];
  fileArray = [];
  constructor(props) {
    super(props);
    this.state = {
      file: [null]
    };
    this.uploadMultipleFiles = this.uploadMultipleFiles.bind(this);
    this.uploadFiles = this.uploadFiles.bind(this);
  }
  uploadMultipleFiles(e) {
    this.fileObj.push(e.target.files);
    for (let i = 0; i < this.fileObj[0].length; i++) {
      this.fileArray.push(URL.createObjectURL(this.fileObj[0][i]));
    }
    this.setState({ file: this.fileArray });
    setTimeout(() => {
      console.log(this.state.file);
      console.log('----', this.fileObj);
      console.log('--0000--', fileArray);
    }, 1000);
  }
  uploadFiles(e) {
    e.preventDefault();
    console.log(this.state.file);
  }
  render() {
    return (
      <form>
        <Container>
          <Row>
            <Col>
              <div className="form-group multi-preview">
                {(this.fileArray || []).map((url) => (
                  <img src={url} alt="..." height="60px" />
                ))}
              </div>
            </Col>
            <Col>
              <div className="form-group">
                <input
                  type="file"
                  className="form-control"
                  onChange={this.uploadMultipleFiles}
                  multiple
                />
              </div>
            </Col>
          </Row>
        </Container>
        {/* <button type="button" className="btn btn-danger btn-block" onClick={this.uploadFiles}>Upload</button> */}
      </form>
    );
  }
}
