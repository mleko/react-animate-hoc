import {animate} from "react-easing";
import {FloatingDiv} from "../FloatingDiv";

export const WrappedElement = animate({duration: 600, easing: "ease-in-out"})(FloatingDiv);
