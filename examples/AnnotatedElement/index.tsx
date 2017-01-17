import * as React from "react";
import {animate} from "../../src";
import {FloatingDiv, Props} from "../FloatingDiv";

@animate({duration: 600, easing: "ease-in-out"})
export class AnnotatedElement extends React.Component<Props, void> {
	public render(): JSX.Element {
		return (<FloatingDiv {...this.props}/>);
	}
}
