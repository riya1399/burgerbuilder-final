import React ,{ Component}from 'react';
import Aux from '../../hoc/Aux'
import classes from './Layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar'
import Sidebar from '../Navigation/Sidebar/Sidebar'
import { render } from '@testing-library/react';

class Layout extends Component{

    state ={
        showsidebar :true
    }
sidebarclosedHandler= () =>{
    this.setState({showsidebar:false})

}
sidebarToggleHandler=()=>{
     this.setState((prevstate) => { return {showsidebar :!prevstate.showsidebar};});
}

render(){
    return(
        <Aux>
        <Toolbar drawerToggleClicked={this.sidebarToggleHandler}/> 
        <Sidebar open={this.state.showsidebar} closed={this.sidebarclosedHandler}/>
        <main className={classes.Content}>
            {this.props.children}
        </main>
        </Aux>);
}
}

export default Layout;