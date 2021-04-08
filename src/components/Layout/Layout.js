import React ,{ useState}from 'react';
import Aux from '../../hoc/Aux'
import classes from './Layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar'
import Sidebar from '../Navigation/Sidebar/Sidebar'
import { render } from '@testing-library/react';
import {connect} from 'react-redux';

const Layout =props =>{
 const [sideDrawerIsVisible , setSideDrawerIsVisible]=useState(false);
const sidebarclosedHandler= () =>{
    setSideDrawerIsVisible(false)

}
const sidebarToggleHandler=()=>{
    setSideDrawerIsVisible(!sideDrawerIsVisible)
}

    return(
        <Aux>
        <Toolbar isAuth={props.isAuthenticated}
        drawerToggleClicked={sidebarToggleHandler}/> 
        <Sidebar isAuth={props.isAuthenticated}
         open={sideDrawerIsVisible} closed={sidebarclosedHandler}/>
        <main className={classes.Content}>
            {props.children}
        </main>
        </Aux>);
}


const mapStateToProps= state =>{
    return {
        isAuthenticated:state.auth.token!==null
    }
}

export default connect(mapStateToProps)(Layout);