import React, { useState }  from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';



function ClawCard(props) {

  const [angle, setAngle] = useState("Closed");

  return (
    <Card variant="outlined">
      <CardContent>
        <Typography  color="textSecondary" gutterBottom>
          {props.name}
        </Typography>
        <Typography variant="h5" component="h1" align="center">
          { angle }
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          color="primary"
          onClick={() => {
            fetch("http://192.168.18.21:3001/move?limb="+props.name+"&dir=1");
            if (angle=="Closed") {setAngle("Opened");} else {setAngle("Closed");};
          }}
        >Toggle
        </Button>
      </CardActions>
    </Card>
  );
}

export default ClawCard;