import React from 'react';
import log from 'loglevel';
import paper from 'paper';

// Styles
import './canvas.scss';

class Canvas extends React.Component {
  constructor(props) {
    super(props);

  }

  componentWillMount() {
    paper.install(window);
    this._updateContainerDims();

  }

  _setupCanvas() {
    paper.setup(this.refs.canvas);

    paper.view.onResize = this._onResize.bind(this);
    paper.view.onFrame = this._onFrame.bind(this);

  }

  componentDidMount() {

    this._setupCanvas();

    this._path = new Path.Rectangle([75, 75], [100, 100]);
    this._path.strokeColor = 'black';

  }

  _draw(obj) {

  }

  _updateContainerDims() {
    const width = window.innerWidth;
    const height = window.innerHeight - 200;

    this.setState({ width, height });
  }

  _onResize() {
    this._updateContainerDims();
  }

  _onFrame(params) {
    const { delta, time, count } = params;
    this._path.rotate(0.5);
  }

  render() {
    return (
      <canvas ref='canvas' width={ this.state.width } height={ this.state.height } />
    );
  }
}

export default Canvas;
