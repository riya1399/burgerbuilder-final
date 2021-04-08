import React from 'react'
import classes from './Navigationitems.module.css'
import NavigationItem from './Navigationitem/Navigationitem'


const navigationitems =(props)=>(
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/">Burger Builder</NavigationItem>
        {props.isAuthenticated ? <NavigationItem link="/orders">Orders</NavigationItem> :null }
       {!props.isAuthenticated ? <NavigationItem link="/auth">Authenticate</NavigationItem> :
       <NavigationItem link="/logout">Logout</NavigationItem> }
    </ul>
);

export default navigationitems;