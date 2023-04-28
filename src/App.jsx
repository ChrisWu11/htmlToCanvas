import React, { Component } from "react";
import ShareCanvas from "./shareCanvas";
import "./styles.scss";

export default class newTest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      imgSrc: ""
    };
    this.ShareCanvas = React.createRef();
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        name: "Chris",
        imgSrc:
          "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2F44603441-f191-4a88-932a-8d1ef3581732%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1685239947&t=2b3fb311325712f7dd9c66fa94db52cb"
      });
      this.codeRef.startPaint();
    }, 0);
  }

  render() {
    return (
      <div>
        <ShareCanvas
          paintId="shareQrCode"
          ref={(e) => {
            this.codeRef = e;
          }}
        >
          <div className="apply-code" id="shareQrCode">
            <div className="header-box"></div>
            <div className="content">
              <div className="doctor-name">{this.state.name}为您推荐了</div>
              <div className="title">Html2Canvas</div>
              <img className="code" src={this.state.imgSrc} alt="" />
              <div className="tips">微信扫一扫，查看更多</div>
            </div>
          </div>
        </ShareCanvas>
      </div>
    );
  }
}
