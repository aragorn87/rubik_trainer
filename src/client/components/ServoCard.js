import React, { useState }  from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';



function OutlinedCard(props) {

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
        <Typography variant="body2" component="p">
          Min = {props.min} ; Max = {props.max}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          color="primary"
          onClick={() => {
            fetch("http://192.168.18.19:3001/move?limb="+props.name+"&dir=0");
            if (angle=="Closed") {setAngle("Opened");} else {setAngle("Closed");};
          }}
          disabled={angle>=props.max?true:false}
        >Toggle
        </Button>
      </CardActions>
    </Card>
  );
}

export default OutlinedCard;