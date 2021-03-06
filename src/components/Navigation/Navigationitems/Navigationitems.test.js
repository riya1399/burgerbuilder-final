import React from 'react'
import {configure,shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import NavigationItems from './Navigationitems'
import NavigationItem from './Navigationitem/Navigationitem'

configure ({adapter :new Adapter()})

describe('<NavigationItems/>',()=>{
    let wrapper;
    
    beforeEach(()=>{
    wrapper = shallow (<NavigationItems />);
})

    it('should render two <NavigationItem/> element if not authenticated', () =>{
        expect(wrapper.find(NavigationItem)).toHaveLength(2);
    });

    it('should render three <NavigationItem/> element if authenticated', () =>{
        wrapper.setProps({isAuthenticated: true});
        expect(wrapper.find(NavigationItem)).toHaveLength(3);
    });

    it('should an exact logout button', () =>{
        wrapper.setProps({isAuthenticated: true});
        expect(wrapper.contains(<NavigationItem link="/logout">Logout</NavigationItem> )).toEqual(true)
    });
});