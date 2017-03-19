# react-easing
> Higher-order component easing/animating prop changes for React

[![NPM](https://nodei.co/npm/react-easing.png?compact=true)](https://nodei.co/npm/react-easing/)

## Demo

Live demo is available https://mleko.gitlab.io/react-easing/

## Installation

Library can be installed via [npm](https://www.npmjs.com/package/react-easing).

```
$ npm install react-easing
```

## Usage
Component you wish to animate
```
export function ColorBox(p: RgbColor): JSX.Element {
	let style = {
		height: 50,
		width: 50,
		backgroundColor: `rgb(${p.r.toFixed()},${p.g.toFixed()},${p.b.toFixed()}`,
		border: "1px black solid",
		display: "inline-block",
		margin: 3
	};
	return (<div style={style}/>);
}
```

to animate property transition wrap component in `animate` HOC
```
export const AnimatedColorBox = animate()(ColorBox)
```

or annotate new component
```
@animate()
export class AnnotatedColorBox extends React.Component<RgbColor, any> {
	public render(): JSX.Element {
		return (<ColorBox {...this.props}/>);
	}
}
```

Now you can use animated components just like regular one
```
    <ColorBox {...this.state}/>
    <AnimatedColorBox {...this.state}/>
    <AnnotatedColorBox {...this.state}/>
```
## Running examples

  *Have `node.js` and `npm` installed.*

 1. Clone this repo.
 2. Run `npm install` to get all dependencies.
 3. Run `npm start` to run Webpack dev server.


### [License (MIT)](LICENSE.md)
