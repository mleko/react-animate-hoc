import * as React from "react";

export class ColorBar extends React.Component<Props, void> {
	public render(): JSX.Element {
		const props = this.props;
		let containerStyle = {
			width: "100% - 30px",
			height: this.props.height || 20,
			position: "relative",
			padding: "3px 33px 3px 3px",
			border: "1px black solid",
			backgroundColor: `rgb(${props.r.toFixed()},${props.g.toFixed()},${props.b.toFixed()})`,
			marginBottom: 5,
			cursor: "pointer",
			margin: "0 100px 5px 100px",
			color: ((props.r + props.g + props.b) / 3) < 120 ? "white" : "black"
		};
		return (
			<div style={containerStyle} onClick={this.click}>
				<div
					style={{position: "absolute", textAlign: "center", width: "100%", zIndex: 1}}
				>
					{props.text} value: ({props.r.toFixed(2)}, {props.g.toFixed(2)}, {props.b.toFixed(2)})
				</div>
			</div>
		);
	}

	private click = () => {
		if (this.props.onClick) this.props.onClick(this.props.index);
	}
}

export interface Props {
	r: number;
	g: number;
	b: number;
	text?: string;
	index?: number;
	height?: number;

	onClick?: (id: number) => void;
}
