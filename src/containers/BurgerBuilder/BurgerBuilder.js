import React, { useState, useEffect, useCallback } from 'react';
import {  useDispatch, useSelector } from 'react-redux';

import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/Buildcontrols/Buildcontrols';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import axios from '../../axios-orders';

const BurgerBuilder = props => {
  // constructor(props) {
  //     super(props);
  //     this.state = {...}
  // }
  const [purchasing, setPurchasing] = useState(false);

  const dispatch = useDispatch();

  const ings = useSelector(state => {
    return state.burgerBuilder.ingredients;
  });
  const price = useSelector(state => state.burgerBuilder.totalPrice);
  const error = useSelector(state => state.burgerBuilder.error);
  const isAuthenticated = useSelector(state => state.auth.token !== null);

  const onIngredientAdded = ingName => dispatch(actions.addIngredient(ingName));
  const onIngredientRemoved = ingName =>
    dispatch(actions.removeIngredient(ingName));
  const onInitIngredients = useCallback(
    () => dispatch(actions.initIngredient()),
    [dispatch]
  );
  const onInitPurchase = () => dispatch(actions.purchaseInit());
  const onSetAuthRedirectPath = path =>
    dispatch(actions.setAuthRedirectPath(path));

  useEffect(() => {
    onInitIngredients();
  }, [onInitIngredients]);

//   const updatePurchaseState = ingredients => {
//     const sum = Object.keys(ingredients)
//       .map(igKey => {
//         return ingredients[igKey];
//       })
//       .reduce((sum, el) => {
//         return sum + el;
//       }, 0);
//     return sum > 0;
//   };
const updatePurchaseState = (ingredients) => {

            const sum = Object.keys(ingredients)
                .map(igkey => {
                    return ingredients[igkey];
                })
                .reduce((sum, el) => {
                    return sum + el;
                }, 0);
    
            return sum > 0;
    
    
        }
    

  const purchaseHandler = () => {
    if (isAuthenticated) {
      setPurchasing(true);
    } else {
      onSetAuthRedirectPath('/checkout');
      props.history.push('/auth');
    }
  };

  const purchaseCancelHandler = () => {
    setPurchasing(false);
  };

  const purchaseContinueHandler = () => {
    onInitPurchase();
    props.history.push('/checkout');
  };
  console.log(ings);
  const disabledInfo = {
    ...ings
  };
  for (let key in disabledInfo) {
    disabledInfo[key] = disabledInfo[key] <= 0;
  }
  let orderSummary = null;
  let burger = error ? <p>Ingredients can't be loaded!</p> : <Spinner />;

  if (ings) {
    burger = (
      <Aux>
        <Burger ingredients={ings} />
        <BuildControls
          ingredientAdded={onIngredientAdded}
          ingredientRemoved={onIngredientRemoved}
          disabled={disabledInfo}
          purchaseable={updatePurchaseState(ings)}
          ordered={purchaseHandler}
          isAuth={isAuthenticated}
          price={price}
        />
      </Aux>
    );
    orderSummary = (
      <OrderSummary
        ingredients={ings}
        price={price}
        purchaseCancelled={purchaseCancelHandler}
        purchaseContinued={purchaseContinueHandler}
      />
    );
  }
  // {salad: true, meat: false, ...}
  return (
    <Aux>
      <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
        {orderSummary}
      </Modal>
      {burger}
    </Aux>
  );
};

export default withErrorHandler(BurgerBuilder, axios);
// const BurgerBuilder = props => {

//     const [purchasing, setPurchasing] = useState(false);
//     const {onInitIngredients}=props;
//     useEffect(()=>{
//         onInitIngredients();
//     },[onInitIngredients]) 
    

//     const updatePurchaseState=(ingredients) =>{
//         const sum =Object.keys(ingredients)
//         .map(igkey =>{
//             return ingredients[igkey]
//         })
//         .reduce ((sum,el) => {
//             return sum+el;
//         },0)
//         return sum >0;
//     }


    // addIngredientHandler=(type) =>{
    //     const oldCount =this.state.ingredients[type];
    //     const updatedCount = oldCount +1;
    //     const updatedIngredients ={
    //         ...this.state.ingredients
    //     };
    //     updatedIngredients[type]=updatedCount;
    //     const priceAddition=INGREDIENT_PRICES[type];
    //     const oldPrice=this.state.totalPrice;
    //     const newPrice =oldPrice +priceAddition;
    //     this.setState({totalPrice :newPrice ,ingredients:updatedIngredients});
    //     this.updatePurchaseState(updatedIngredients);
    // }

    // removeIngredientHandler=(type) =>{
    //     const oldCount =this.state.ingredients[type];
    //     if (oldCount <=0){
    //         return;
    //     }
    //     const updatedCount = oldCount -1;
    //     const updatedIngredients ={
    //         ...this.state.ingredients
    //     };
    //     updatedIngredients[type]=updatedCount;
    //     const priceDeduction=INGREDIENT_PRICES[type];
    //     const oldPrice=this.state.totalPrice;
    //     const newPrice =oldPrice -priceDeduction;
    //     this.setState({totalPrice :newPrice ,ingredients:updatedIngredients});
    //     this.updatePurchaseState(updatedIngredients);
    // }


//     const purchaseHandler =() =>{
//         if(props.isAuthenticated) {
//             // this.setState({purchasing:true});
//             setPurchasing(true)

//         }else {
//             props.onSetAuthRedirectPath('/checkout')
//             props.history.push('/auth')
//         }
       
//     }
//     const purchaseCancelHandler= () =>{
//         // this.setState({purchasing:false});
//         setPurchasing(false);
//     }
//     const purchaseContinueHandler =() =>{
//         props.onInitPurchased();
//      props.history.push('/checkout');
// }
    
//         const disabledInfo={
//             ...props.ings
//         };
//         for (let key in disabledInfo){
//             disabledInfo[key]=disabledInfo[key]<=0
//         }
//         let orderSummary =null;
    
    
//         let burger=props.error ? <p>Ingredients can't be loaded</p> :<Spinner/>
//         if (props.ings){
//             burger =(
//                 <Aux>
//      <Burger ingredients={props.ings}/>
//                 <Buildcontrols ingredientAdded={props.onIngredienAdded}
//                 ingredientremoved={props.onIngredientRemoved}
//                 disabled={disabledInfo}
//                 price={props.price}
//                 purchaseable={updatePurchaseState(props.ings)}
//                 isAuth={props.isAuthenticated}
//                 ordered={purchaseHandler}/>
//                 </Aux>
//             );
//             orderSummary= <OrderSummary 
//             ingredients={props.ings}
//             purchaseCanceled={purchaseCancelHandler}
//             purchaseContinue={purchaseContinueHandler}
//             price={props.price}/>
//         }
         
//         return(
//             <Aux>
//                 <Modal show= {purchasing} modalClosed={purchaseCancelHandler}>
//                    {orderSummary}
//                 </Modal>
//                 {burger}
//             </Aux>
//         );
//     }

// const mapStateToProps =state =>{
//     return {
//         ings:state.burgerBuilder.ingredients,
//         price:state.burgerBuilder.totalPrice,
//         error:state.burgerBuilder.error,
//         isAuthenticated:state.auth.token!==null
//     }
// }

// const mapDispatchToProps =dispatch =>{
//     return {
//         onIngredienAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
//         onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
//         onInitIngredients :() => dispatch(actions.initIngredient()),
//         onInitPurchased :() =>dispatch (actions.purchaseInit()),
//         onSetAuthRedirectPath:(path) => dispatch(actions.setAuthRedirectPath(path))
//     }
// }
// export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder,axios));