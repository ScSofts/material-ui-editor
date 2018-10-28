import React, { Component } from 'react';
import './app.css';
import ReactImage from './react.png';
import download from 'downloadjs';
import Button from '@material-ui/core/Button';

export default class App extends Component {
  componentDidMount() {
  }

  render() {
    return (
      <div>
        <div>
          <Button onClick={this.handleDownload}>Download</Button>
          <Button component="a" href="/api/download">Download Link</Button>
        </div>
        <div>
          <form action="/api/upload" method="post" encType="multipart/form-data">
            <input
              hidden
              accept=".zip"
              id="flat-button-file"
              multiple
              type="file"
              name="project"
            />
            <label htmlFor="flat-button-file">
              <Button component="span">
                Upload
              </Button>
            </label>
            <Button type="submit">Submit</Button>
          </form>
        </div>
        <div><img src={ReactImage} alt="react" /></div>
      </div>
    );
  }

  handleDownload = () => {
    const downloadUrl = '/api/download';
    fetch(downloadUrl)
    .then(response => { 
      return response.blob(); 
    })
    .then(function(blob) {
      download(blob,'testProject.zip','application/zip');
    });
  }
}
