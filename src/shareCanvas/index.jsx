import html2canvas from "html2canvas";
import React, { Component } from "react";

export default class ShareCanvas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      updateImgLength: 0,
      imgsNum: 0,
      base64Url: "",
      paintImgStyle: {},
      patientTimer: ""
    };
  }

  componentDidMount() {
    const parent = document.querySelector(`#${this.props.paintId}`);
    const imgDomList = parent?.querySelectorAll("img") || [];
    imgDomList.forEach((item) => {
      item.onload = () => {
        this.setState({
          imgsNum: this.state.imgsNum + 1
        });
      };
    });
    this.setState({
      updateImgLength: imgDomList.length
    });
  }

  componentWillUnmount() {
    clearInterval(this.patientTimer);
  }

  startPaint = async () => {
    if (this.state.base64Url) return;
    //解决顶部留白问题
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    const runPatient = async () => {
      let poster = document.getElementById(this.props.paintId);
      if (!poster) return;
      const style = window.getComputedStyle(poster);
      this.setState({
        paintImgStyle: {
          width: style.width,
          height: style.height,
          borderRadius: style.borderRadius
        }
      });
      let res = await html2canvas(poster, {
        allowTaint: true,
        useCORS: true,
        scale: window.devicePixelRatio
      });
      if (res) {
        const base64Url = res.toDataURL("image/jpeg");
        this.setState({
          base64Url
        });
      }
    };
    this.patientTimer = setInterval(() => {
      if (this.state.imgsNum < this.state.updateImgLength + 1) {
        runPatient();
      }
      clearInterval(this.patientTimer);
    }, 16.7);
  };

  render() {
    return (
      <div className="component-share-canvas">
        {!this.state.base64Url ? (
          this.props.children
        ) : (
          <img
            style={this.state.paintImgStyle}
            className="share-canvas-paint-img"
            src={this.state.base64Url}
            alt=""
          />
        )}
      </div>
    );
  }
}
