import React from 'react';
import log from 'loglevel';
import paper from 'paper';
import chroma from 'chroma-js';

// Styles
import './canvas.scss';

const POINT_RADIUS = 5;
const NOTES = ['A','B','C','D','E','F','G'];

class Canvas extends React.Component {
  constructor(props) {
    super(props);

    this._groups = {
      notes: {}
    };

    this._colorScale = chroma.scale(['rgb(230, 95, 147)', 'rgb(219, 247, 11)']);

    this._notes = [];

  }

  componentWillMount() {
    paper.install(window);
    this._updateContainerDims();

  }

  _getNoteFromIndex(i) {
    const rem = i % NOTES.length;
    const offset = Math.floor(i / NOTES.length);

    const key = NOTES[rem];

    return { octave: 2 + offset, key };
  }

  _setupCanvas() {
    paper.setup(this.refs.canvas);

    paper.view.onResize = this._onResize.bind(this);
    paper.view.onFrame = this._onFrame.bind(this);

  }

  componentDidMount() {

    this._setupCanvas();

    this._drawGuides();

    // this._addNote('C', 20, 2000);
    // this._addNote('A', 30, 4000);

    /*for (let i = 0; i < 20; i++) {
      this._addNote(`0_${i}`, i, 1 + (i * 0.4), 4000 + (i * 10));
    }*/

    for (let i = 0; i < 20; i++) {
      this._addNote(`1_${i}`, i, 1 + (i * 2), 4000 + (i * 10));
    }

    // create piano
    Synth.setVolume(0.40);
    this._piano = Synth.createInstrument('piano');

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

  _addNote(id, i, r, speed) {

    this._groups.notes[id] = new Group();

    const pos = this._getPos(50 - r, 50);
    let point = new Shape.Circle(new Point(pos), POINT_RADIUS);
    const note = this._getNoteFromIndex(i);

    const scaleFactor = (20 * r / this.state.width);
    const color = this._colorScale(scaleFactor);

    point.fillColor = color.hex();

    // point.fillOpacity = 0;

    this._notes.push({ id, speed, note });

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
    const height = window.innerHeight;
    const origin = { x: width / 2, y: height / 2 };

    this.setState({ width, height, origin });
  }

  _onResize() {
    this._updateContainerDims();
  }

  _onFrame(params) {
    const { delta, time, count } = params;

    this._notes.forEach(note => {

      const node = this._groups.notes[note.id];
      const { x, y } = node.position;

      if (x > this.state.origin.x && Math.abs(y - this.state.origin.y) < 1) {
        this._piano.play(note.note.key, note.note.octave, 1);
      }
      node.rotate((360 / note.speed) * delta * 1000, this.state.origin);



      // this._piano.play('C', 2, 1);
    }, this);
  }

  render() {

    return (
      <canvas className='canvas' ref='canvas' width={ this.state.width } height={ this.state.height } />
    );
  }
}

export default Canvas;
