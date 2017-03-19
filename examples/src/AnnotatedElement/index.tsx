import * as React from "react";
import {animate} from "react-animate-hoc";
import {FloatingDiv, Props} from "../FloatingDiv";

@animate({duration: 600, timingFunction: "ease-in-out"})
export class AnnotatedElement extends React.Component<Props, void> {
	public render(): JSX.Element {
		return (<FloatingDiv {...this.props}/>);
	}
}
