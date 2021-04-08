import { bindActionCreators } from 'redux'
import * as actionTypes from '../actions/actionTypes'
import {updateObject} from '../../shared/utility'

const initialState ={
    orders:[],
    loading:false,
    purchased:false

}
const purchaseInit=(state,action) =>{
    return updateObject(state,{purchased:false})
}

const purchaseBurgerStart=(state,action)=>{
    return updateObject(state,{loading:true})
}
const purchaseBurgerSuccess=(state,action)=>{
    const newOrder =updateObject(action.orderData,{id:action.orderId})
    return updateObject(state,{
        loading:false,
        purchased:true,
        orders:state.orders.concat(newOrder)
    })
}
const purchaseBurgerFail=(state,action)=>{
    return updateObject(state,{loading:false})
}

const fetchOrderStart=(state,action)=>{
    return updateObject(state,{loading:true})

}

const fetchOrdersSuccess=(state,action)=>{
    return updateObject(state,{
        orders:action.orders,
        loading:false
    })
}
const fetchOrdersFail=(state,action)=>{
    return updateObject(state,{loading:false})

}
 const reducer =(state=initialState,action) =>{
    switch (action.type){
        case actionTypes.PURCHASE_INIT:return purchaseInit(state,action) 
        case actionTypes.PURCHASEBURGERSTART:return purchaseBurgerStart(state,action)
        case actionTypes.PURCHASEBURGERSUCCESS:return purchaseBurgerSuccess(state,action)
        case actionTypes.PURCHASEBURGERFAIL:return purchaseBurgerFail(state,action)
        case actionTypes.FETCHORDERSTART:return fetchOrderStart(state,action)
        case actionTypes.FETCHORDERSUCCESS:return fetchOrdersSuccess(state,action)
        case actionTypes.FETCHORDERFAIL:return fetchOrdersFail(state,action)
        default:return state;
    }

}

export default reducer