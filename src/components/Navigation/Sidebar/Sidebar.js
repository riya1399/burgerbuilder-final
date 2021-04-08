import React from 'react'
import Logo from '../../Logo/Logo'
import NavigationItems from '../Navigationitems/Navigationitems'
import classes from './Sidebar.module.css'
import Backdrop from '../../UI/Backdrop/backdrop'
import Aux from '../../../hoc/Aux'


const sidebar =(props)=>{
    let attachedClasses= [classes.Sidebar, classes.close];
    if (props.open){
        attachedClasses=[classes.Sidebar, classes.Open];
    }return(
    <Aux>
    <Backdrop show={props.open} clicked={props.closed} />
    <div className={attachedClasses.join(' ')} onClick={props.closed}>
        <div className={classes.Logo}>
        <Logo/>
        </div>
        <nav>
            <NavigationItems isAuthenticated={props.isAuth}/>
        </nav>
    </div>
    </Aux>
    )};



export default sidebar;