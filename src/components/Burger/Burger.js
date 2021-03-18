import React from 'react'
import classes from './Burger.module.css'
import Burgeringredient from '../Burger/Burgeringredient/Burgeringredient';

const burger = (props) =>{
    let transformedingredients= Object.keys(props.ingredients)
    .map(igkey =>{
        return[...Array(props.ingredients[igkey])].map((_,i) =>
        {
            return <Burgeringredient key={igkey+i} type={igkey}/>;

        });
    })
    .reduce((arr,el) =>{
        return arr.concat(el)
    },[]);

    if (transformedingredients.length === 0){
        transformedingredients=<p>Please start adding ingredients!</p>
    }
    return (
        <div className={classes.Burger}>
            <Burgeringredient type="bread-top"/>
            {transformedingredients}
            <Burgeringredient type="bread-bottom"/>
        </div>
    );

}
export default burger;