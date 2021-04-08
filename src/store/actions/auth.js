import * as actionTypes from './actionTypes';
import axios from 'axios'

export const authStart =() =>{
    return {
        type:actionTypes.AUTHSTART
    }
}

export const authSuccess =(token, userId) =>{
    // console.log(token)
    console.log(userId)
    return {
        type:actionTypes.AUTHSUCCESS,
        idToken:token,
        userId:userId
    }
}

export const authFail =(error) =>{
    return {
        type:actionTypes.AUTHFAIL,
        error :error
    }
}
export const logout=() =>{
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate')
    localStorage.removeItem('userId')
    return {
        type:actionTypes.AUTHLOGOUT
    }
}
export const checkAuthTimeout =(expirationTime) =>{
    return dispatch=>{
        setTimeout(() =>{
            dispatch(logout());
        },expirationTime*1000)

    }
}

export const auth =(email,password,isSignup)=>{
    return dispatch =>{
        dispatch(authStart());
        const authData={
            email:email,
            password:password,
            returnSecureToken:true
        }
        let url='https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBAEuJPwWVpybGJnnmX5zClNYXFllrZrww'
        if (!isSignup){
            url='https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBAEuJPwWVpybGJnnmX5zClNYXFllrZrww'
        }
        axios.post(url,authData)
        .then(response =>{
            const expirationDate=new Date().getTime() + response.data.expiresIn*1000
            localStorage.setItem('token',response.data.idToken);
            localStorage.setItem('expirationDate',expirationDate);
            localStorage.setItem('userId',response.data.localId);
            dispatch(authSuccess(response.data.idToken,response.data.localId))
            dispatch(checkAuthTimeout(response.data.expiresIn))
        })
        .catch(err => {
            dispatch(authFail(err.response.data.error))
        })
    }
}

export const setAuthRedirectPath =(path) =>{
    return {
        type:actionTypes.SETAUTHREDIRECTPATH,
        path:path
    }
}

export const authCheckState =() =>{
    return dispatch =>{
        const token =localStorage.getItem('token');
        if(!token){
            dispatch(logout());
        }
        else{
            const expirationDate=new Date(localStorage.getItem('expirationDate'));
            if (expirationDate <=new Date()){
                dispatch(logout());
            }else{
                const userId=localStorage.getItem('userId');
                dispatch(authSuccess(token,userId));
                dispatch(checkAuthTimeout((expirationDate.getTime()-new Date().getTime()/1000)))
            }
            
        }
    }
}