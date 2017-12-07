import React from 'react';
import ReactDOM from 'react-dom';
import { Grid } from 'react-flexbox-grid';
import { MuiThemeProvider, getMuiTheme, lightBaseTheme } from 'material-ui/styles';

import Form from './MuiForm';

const Main = () => (
  <Grid fluid>
    <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
      <Form />
    </MuiThemeProvider>
  </Grid>
);

ReactDOM.render((<Main />), document.getElementById('app'));
