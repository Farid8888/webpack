import * as $ from "jquery";
import Post from "@post";
import "./style/style.css";
import "./style/less.less";
import "./style/sass.scss";
// import json from "./assets/json.json";
import WebpackLogo from "./assets/icon.png";
// import xml from "@xml";
// import csv from "./assets/data.csv";
import "./babel";
import React from "react";
import { createRoot } from "react-dom/client";

const post = new Post("Webpack Post Title", WebpackLogo);

$("pre").addClass("code").html(post.toString());
// console.log('post to string',post.toString())
// console.log(json,'json')
// console.log(xml,'xml')
// console.log(csv,'csv')

const App = () => {
  return (
    <div className="container">
      <h1>ekmdkw</h1>
      <h2>mskvmdfkmgkjm</h2>
      <hr />
      <div className="logo"></div>
      <pre></pre>
      <div className="box">
        <h2>less border</h2>
      </div>
      <div className="card">
        <h2>scss border</h2>
      </div>
    </div>
  );
};

const root = createRoot(document.getElementById("app"));
root.render(<App />);
