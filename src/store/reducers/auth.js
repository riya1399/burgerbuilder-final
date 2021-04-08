// import * as actionTypes from '../actions/actionTypes'
// import {updateObject} from '../utility'

// const initialState={
//     token:null,
//     userId:null,
//     error:null,
//     loading:false
// }
// const authStart =(state,action) =>{
//     return updateObject(state,{error:null,loading:true});
// }
// const authLogout = (state,action)=>{
//     return updateObject(state,{token:null,userId:null})
// }

// const authSuccess =(state,action)=> {
//     return updateObject(state,{token:action.idToken,userId:action.userId,error:null,loading:false})

// }

// const authFail =(state,action) =>{
//     return updateObject(state,{
//         error:action.error,
//         loading:false
//     });
// }
// const reducer =(state=initialState,action) =>{
//     switch(action.types) {
//         case actionTypes.AUTHSTART:return authStart (state,action)
//         case actionTypes.AUTHSUCCESS:return authSuccess (state,action)
//         case actionTypes.AUTHFAIL:return authFail (state,action)
//         case actionTypes.AUTHLOGOUT:return authLogout(state,action)
//         default : return state;
//     }


// }

// export default reducer


import * as actionTypes from '../actions/actionTypes';
// import { logout } from '../actions/auth';
import {updateObject} from '../../shared/utility';
const initailState={
token:null,
userId:null,
error:null,
loading:false,
authRedirectPath:'/',

};
const authStart=(state,action)=>{
return updateObject(state,{error:null,loading:true});

}

const authLogout=(state,action)=>{
return updateObject(state,{token:null,userId:null});
}

const authSuccess=(state,action)=>{
return updateObject(state,{token:action.idToken,userId:action.userId,error:null,loading:false})
}

const authFail=(state,action)=>{
return updateObject(state,{error:action.error,loading:false});
}

const setAuthRedirectPath=(state,action)=>{
return updateObject(state,{authRedirectPath:action.path});
}

const reducer=(state=initailState,action)=>{
switch (action.type) {
case actionTypes.AUTHSTART:
return authStart(state,action);
case actionTypes.AUTHSUCCESS:
return authSuccess(state,action);
case actionTypes.AUTHFAIL:
return authFail(state,action);
case actionTypes.AUTHLOGOUT:
return authLogout(state,action);
case actionTypes.SETAUTHREDIRECTPATH:
return setAuthRedirectPath(state,action);
default:
return state;
}
};

export default reducer;