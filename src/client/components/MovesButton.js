import React, {useState} from 'react';
import Button from '@material-ui/core/Button';



export default function ContainedButtons(props) {
  const [clicks, setClicks] = useState(0);

  function handleClick() {
      console.log(clicks + props.name + " button was clicked");
      setClicks(clicks+1);
      if (clicks>0) {
        fetch("http://192.168.18.21:3001/namedmoves?move="+props.name)
        .then((response)=>{return response.json()})
        .then((json)=>{
          console.log(json)
          props.setterFunc(JSON.stringify(json))
        })
        .then(setClicks(clicks+1));
        // .then(console.log(json));
        // props.setterFunc(moves);

        
      }
      
  };
  
  return (
    <div>
      <Button 
          variant="contained" 
          color={props.name.includes("'")?"secondary":"primary"}
          onClick={handleClick}>
        {props.name}
      </Button>
    </div>
  );
  }