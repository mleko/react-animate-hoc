import "es6-shim";
import * as React from "react";
import * as ReactDOM from "react-dom";
import {Examples} from "./Examples";

// Render Examples into the body.
let element = document.createElement("div");
document.getElementsByTagName("body")[0].appendChild(element);
ReactDOM.render(<Examples/>, element);
