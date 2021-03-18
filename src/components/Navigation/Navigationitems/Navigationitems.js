import React from 'react'
import classes from './Navigationitems.module.css'
import NavigationItem from './Navigationitem/Navigationitem'

const navigationitems =(props)=>(
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/">Burger Builder</NavigationItem>
        <NavigationItem link="/">Checkout</NavigationItem>
    </ul>
);

export default navigationitems;