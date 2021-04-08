import reducer from './auth'
import * as actionTypes from '../actions/actionTypes'


describe ('auth reducer',() =>{

    it('should return the inital state',()=>{
        expect(reducer(undefined, {})).toEqual({
            token:null,
userId:null,
error:null,
loading:false,
authRedirectPath:'/',
        })

        })

        it('should return the inital state',()=>{
            expect(reducer({
                token:null,
    userId:null,
    error:null,
    loading:false,
    authRedirectPath:'/',
            },{
                type:actionTypes.AUTHSUCCESS,
                idToken:'some-token',
                userId:'some-user-id'
            })).toEqual({
                token:'some-token',
                userId:'some-user-id',
                error:null,
                loading:false,
                authRedirectPath:'/',
            })

        })
    })