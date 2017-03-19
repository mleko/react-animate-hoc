import {animate} from "react-animate-hoc";
import {FloatingDiv} from "../FloatingDiv";

export const WrappedElement = animate({duration: 600, timingFunction: "ease-in-out"})(FloatingDiv);
