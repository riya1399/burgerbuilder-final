import * as actionTypes from './actionTypes';
import axios from '../../axios-orders'

export const addIngredient = (name) =>{
    return {
        type:actionTypes.ADDINGREDIENT,
        ingredientName:name
    };
}

export const removeIngredient = (name) =>{
    return {
        type:actionTypes.REMOVEINGREDIENT,
        ingredientName:name
    }
}
export const setIngredients =(ingredients) =>{
    return {
        type:actionTypes.SETINGREDIENTS,
        ingredients:ingredients 
    };
}

export const fetchIngredientsFailed =() =>{
    return {
    type:actionTypes.FETCHINGREDIENTSFAILED
}
}
export const initIngredient =() =>{
    return dispatch =>{
        axios.get('https://react-my-burger-d047d-default-rtdb.firebaseio.com/ingredients.json')
        .then(response => {
          dispatch(setIngredients(response.data))
        })
        .catch(error=> {
            dispatch(fetchIngredientsFailed());
        })
    }
}