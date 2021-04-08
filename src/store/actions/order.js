import order from '../../components/order/Order';
import * as  actionTypes from './actionTypes';
import axios from '../../axios-orders'


export const purchaseBurgerSuccess= (id,orderData) =>{
    return {
        type:actionTypes.PURCHASEBURGERSUCCESS,
        orderID:id,
        orderData:orderData
    }
}

export const purchaseBurgerFail =(error) =>{
    return {
        type:actionTypes.PURCHASEBURGERFAIL,
        error:error
    }
}
export const purchaseBurgerStart=() => {
    return {
        type:actionTypes.PURCHASEBURGERSTART
    }
}
export const purchaseBurger =(orderData,token) =>{
    console.log(orderData)
    return dispatch =>{
        dispatch(purchaseBurgerStart());
        axios.post('/orders.json?auth='+token,orderData)
        .then(response =>{
            dispatch(purchaseBurgerSuccess(response.data.name,orderData));
        })
        .catch(error => {
            dispatch(purchaseBurgerFail(error));
        })
    }
}

export const purchaseInit= () => {
    return{
        type:actionTypes.PURCHASE_INIT
    };
};
export const fetchOrdersSuccess=(orders) =>{
    return{
        type:actionTypes.FETCHORDERSUCCESS,
        orders:orders
    }
   
}

export const fetchOrdersFail=(error) =>{
    return{
        type:actionTypes.FETCHORDERFAIL,
        error:error
    }
   
}
export const fetchOrderStart =() =>{
    return{
        type:actionTypes.FETCHORDERSTART,

    }
}
export const fetchOrders =(token,userId) =>{
    return dispatch=>{
        dispatch(fetchOrderStart());
        const queryParams='?auth='+token+'&orderBy="userId"&equalTo="'+userId+'"';
        axios.get('/orders.json'+queryParams)
        // const queryParams ='?auth=' +token +'&orderBy="userId"&equalTo="' +userId+'"';
        // axios.get('/orders.json'+queryParams)
        .then(res=>{
            console.log(res)
            const fetchedOrders =[];
            for (let key in res.data) {
                fetchedOrders.push({
                    ...res.data[key],
                    id:key
                })
            }
            dispatch(fetchOrdersSuccess(fetchedOrders))

        })
        .catch(err =>{
           dispatch(fetchOrdersFail(err))
        })
    }
    
}