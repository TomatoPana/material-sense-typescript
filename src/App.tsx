import React, { Component } from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import './App.css';
import theme from "./Theme";
import Routes from './Routes';

class App extends Component {
  render() {
    return (
      <div>
        <MuiThemeProvider theme = { theme }>
          <Routes />
        </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
