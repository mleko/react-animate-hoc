import * as React from "react";

export class FloatingDiv extends React.Component<Props, void> {
	public render(): JSX.Element {
		let brickStyle = {
			width: 30,
			height: 30,
			position: "relative",
			left: (this.props.x) + "%",
			backgroundColor: "orange"
		};
		let containerStyle = {
			width: "100% - 30px",
			position: "relative",
			padding: "3px 33px 3px 3px",
			borderBottom: "1px black solid",
			backgroundColor: "#ddd",
			marginBottom: 5,
			cursor: "pointer",
			margin: "0 100px 5px 100px"
		};
		return (
			<div style={containerStyle} onClick={this.click}>
				<div
					style={{position: "absolute", textAlign: "center", width: "100%", zIndex: 1}}
				>
					{this.props.text} value: {this.props.x.toFixed(2)}
				</div>
				<div style={brickStyle}/>
			</div>
		);
	}

	private click = () => {
		if (this.props.onClick) this.props.onClick(this.props.index);
	}
}

export interface Props {
	x: number;
	text?: string;
	index?: number;

	onClick?: (id: number) => void;
}
