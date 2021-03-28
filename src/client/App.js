import react, {useState} from 'react';
import ClawCard from './components/ClawCard.js';
import WristCard from './components/WristCard.js';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import AndroidRoundedIcon from '@material-ui/icons/AndroidRounded';
import { green, red } from '@material-ui/core/colors';
import ContainedButton from './components/MovesButton.js';


const possibleMoves = ["U", "U'", "U2", "R", "R'", "R2", "F", "F'", "F2", "D", "D'", "D2", "L", "L'", "L2", "B", "B'", "B2", "X", "X'", "X2", "Y", "Y'", "Y2", "Z", "Z'", "Z2"];



function CreateButtons(array) {
  const [moves, setMoves] = useState("");
  return (
    <Grid item>
    <Grid container spacing={1} justify="center">
      {array.map((move, index) =>
        <Grid item xs={4} align="center" key={index}>
          <ContainedButton name = {move} setterFunc = {setMoves}/>
        </Grid>)}
    </Grid>
    <Grid item>
          <div>
            {moves}
          </div>
        </Grid>
    </Grid>
  );
};

function initRobot() {
  fetch("http://192.168.18.21:3001/init");
}

function App() {

  return (
    <div align="center">

      <Grid container spacing={4} justify="center" direction="column" style={{maxWidth:"800px"}}>
        <Grid item xs={12} align="center">
          <AndroidRoundedIcon 
            style={{ color: green[500] }}
            onClick= {initRobot} />
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
        {CreateButtons(possibleMoves)}
      </Grid>
    </div>
  );
}

export default App;
