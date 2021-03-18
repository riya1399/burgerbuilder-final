import React from 'react';
import classes from './Buildcontrols.module.css'
import BuildControl from './Buildcontrol/Buildcontrol'

const controls=[
    {label:'Salad',type:'salad'},
    {label:'Meat',type:'meat'},
    {label:'Bacon',type:'bacon'},
    {label:'Cheese',type:'cheese'}
]

const buildcontrols =(props) =>{
    return (
        <div className={classes.BuildControl}>
            <p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>
            {controls.map(ctrl => (
                <BuildControl key={ctrl.label}  label={ctrl.label}
                added={() => props.ingredientAdded(ctrl.type)}
                removed={() => props.ingredientremoved(ctrl.type)}
                disabled={props.disabled[props.type]}/>

             ))}
             <button className={classes.OrderButton} 
             disabled={!props.purchaseable}
              onClick={props.ordered}>ORDER NOW</button>
        </div>
    );
}
export default buildcontrols;