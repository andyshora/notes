import React from 'react';
import log from 'loglevel';
import paper from 'paper';

// Styles
import './canvas.scss';

class Canvas extends React.Component {
  constructor(props) {
    super(props);

    this._groups = {
      notes: {}
    };

    this._notes = [];

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

    this._drawGuides();

    this._addNote('C', 20, 2000);
    this._addNote('A', 30, 4000);

  }

  _drawGuides() {

    this._groups['guides'] = new Group();

    const fromPos = this._getPos(1, 50);
    const endPos = this._getPos(99, 50);

    let horizonLine = new Path.Line(fromPos, endPos);
    horizonLine.strokeColor = 'white';

    let originPoint = new Shape.Circle(new Point(this.state.origin), 3);
    originPoint.fillColor = 'white';

    this._groups['guides'].addChildren([ originPoint, horizonLine ]);
    // this._groups['guides'].opacity = 0.5;

  }

  _addNote(id, r, speed) {

    const fromPos = this._getPos(1, 1);
    const endPos = this._getPos(99, 99);

    this._groups.notes[id] = new Group();
    this._groups.notes[id].bounds = new Rectangle(fromPos, endPos);

    const pos = this._getPos(50 - r, 50);
    let point = new Shape.Circle(new Point(pos), 3);
    point.fillColor = 'white';

    this._notes.push({ id, speed });

    this._groups.notes[id].addChild(point);
  }

  _getPos(xPerc, yPerc) {
    return [this._getPerc('x', xPerc), this._getPerc('y', yPerc)];
  }

  _getPerc(dir, perc) {
    return dir === 'x' ? this.state.width * (perc / 100) : this.state.height * (perc / 100);
  }

  _updateContainerDims() {
    const width = window.innerWidth;
    const height = window.innerHeight - 50;
    const origin = { x: width / 2, y: height / 2 };

    log.debug(width, height, origin);

    this.setState({ width, height, origin });
  }

  _onResize() {
    log.debug('_onResize');
    this._updateContainerDims();
  }

  _onFrame(params) {
    const { delta, time, count } = params;

    this._notes.forEach(n => {
      this._groups.notes[n.id].rotate((360 / n.speed) * delta * 1000, this.state.origin);
    }, this);
  }

  render() {

    return (
      <canvas className='canvas' ref='canvas' width={ this.state.width } height={ this.state.height } />
    );
  }
}

export default Canvas;
