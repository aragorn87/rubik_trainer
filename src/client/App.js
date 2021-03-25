import react from 'react';
import ClawCard from './components/ClawCard.js';
import WristCard from './components/WristCard.js';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import AndroidRoundedIcon from '@material-ui/icons/AndroidRounded';
import { green, red } from '@material-ui/core/colors';




function App() {
  return (
    <div justify="center">

      <Grid container spacing={4} justify="center" direction="column" xs={12}>
        <Grid item xs={12} align="center">
          <AndroidRoundedIcon style={{ color: green[500] }} />
        </Grid>
        <Grid item>
          <Grid container spacing={4} justify="center">
          <Grid item>
            <WristCard name="leftWrist"/>
          </Grid>
          <Grid item>
          <ClawCard name="leftClaw"/>
          </Grid>
          <Grid item>
          <WristCard name="rightWrist"/>
          </Grid>
          <Grid item>
          <ClawCard name="rightClaw"/>
          </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
