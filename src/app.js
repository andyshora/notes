import React from 'react';
import log from 'loglevel';

// Styles
import './sass/app.scss';

// Components
import Canvas from 'components/canvas/canvas';


class App extends React.Component {
  constructor(props) {
    super(props);
    log.debug('App');
  }

  render() {
    return (
      <div className='app'>
        <Canvas />
      </div>
    );
  }
}

export default App;
