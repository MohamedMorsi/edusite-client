import { createMuiTheme } from '@material-ui/core/styles';
//import blue from '@material-ui/core/colors/blue';
import green from '@material-ui/core/colors/green';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#3f51b5',
    },
    secondary: {
      main: green[500],
    },
  },
});


export default theme;