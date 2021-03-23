import react from 'react';
import OutlinedCard from './components/ServoCard.js';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import AndroidRoundedIcon from '@material-ui/icons/AndroidRounded';
import { green, red } from '@material-ui/core/colors';




function App() {
  return (
    <div justify="center">

      <Grid container spacing={4} justify="center" direction="column" xs={10}>
        <Grid item xs={4}>
          <Paper elevation={1}>
          <AndroidRoundedIcon style={{ color: red[500] }} />
        </Paper>
        </Grid>
        <Grid item>
          <Grid container spacing={4} justify="center">
          <Grid item>
            <OutlinedCard name="leftWrist" min={0} max={10}/>
          </Grid>
          <Grid item>
          <OutlinedCard name="leftClaw" min={0} max={100}/>
          </Grid>
          <Grid item>
          <OutlinedCard name="rightWrist" min={0} max={100}/>
          </Grid>
          <Grid item>
          <OutlinedCard name="rightClaw" min={0} max={100}/>
          </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
