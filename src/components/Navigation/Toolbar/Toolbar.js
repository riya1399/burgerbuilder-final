import React from 'react'
import classes from './Toolbar.module.css'
import Logo from '../../Logo/Logo'
import NavigationItems from '../Navigationitems/Navigationitems'
import Drawertoggle from '../Sidebar/Drawertoggle/Drawertoggle'

const toolbar=(props) =>{
    return (
    <header className={classes.Toolbar}>
        <Drawertoggle clicked={props.drawerToggleClicked}/>
        <div className={classes.Logo}>
        <Logo/>
        </div>
        <nav className={classes.DesktopOnly}>
        <NavigationItems isAuthenticated={props.isAuth}/></nav>
    </header>
    )};

export default toolbar;