import React, { Component } from 'react';

import Aux from '../../hoc/_Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSUmmary from "../../components/Burger/OrderSummary/OrderSummary";

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    bacon: 0.9,
    meat:2
}

class BurgerBuilder extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {...}
    // }
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice:4,
        
        purchasable: false,
        modalStatus: '',
    
    }

   
   

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        // if (oldCount >= 2 && type=== "salad") {
        //     console.log("if-> i:" + type + " count : " + oldCount );
        //     window.alert("maxed :" + type);
        //     return;
        // }
        // if (oldCount >= 3 && type === "bacon") {
        //     console.log(" if-> i:" + type + " count : " + oldCount );
        //     window.alert("maxed :" + type);
        //     return;
        // }
        
        // if (oldCount >= 1 && type === "cheese") {
        //     console.log("if-> i:" + type + " count : " + oldCount );
        //     window.alert("maxed :" + type);
        //     return;
        // }
        
        // if (oldCount >= 2 && type === "meat") {
        //     console.log("if-> i:" + type + " count : " + oldCount );
        //     window.alert("maxed :" + type);
        //     return;
        // }
        
       // console.log(" i:" + type + " count : " + oldCount);
       //bad aproach
        const updatedCounted = oldCount +1;
        const updatedIngredients =  {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCounted;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({totalPrice: newPrice , ingredients : updatedIngredients});
    
    }


    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount <=0) {
            return;
        }
        const updatedCounted = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCounted;
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
        
    }
    
    showOrder = () => {
        this.setState({ modalStatus: 'Open' }); 
    }

    hideOrder = () => {
        this.setState({ modalStatus: '' });   
    }

    purchaseContinueHandler = () => {
        alert("you continue");
    };
    render () {

        const hasIngredient = () => {
            return Object.values(this.state.ingredients).some((val) => val > 0);      
        };
       
        const disabledInfo = {
            ...this.state.ingredients
        };

        const disabledInfoMax = {
            ...this.state.ingredients
        };
        
       
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        // {salad: true, meat : false,...}
       

        for (let key in disabledInfoMax){
            
           
            if (disabledInfoMax[key] >= 3 && key === "bacon") {
                disabledInfoMax[key] = disabledInfoMax["bacon"] >= 3
               // console.log("bacon render more key value-> " + disabledInfoMax[key]);
                continue
            }

            if (disabledInfoMax[key] >= 2 && key === "salad") {
                disabledInfoMax[key] = disabledInfoMax["salad"] >= 2
                //console.log("salad render more key value-> " + disabledInfoMax[key]);
               continue
            }

            if (disabledInfoMax[key] >= 4 && key === "cheese") {
                disabledInfoMax[key] = disabledInfoMax["cheese"] >= 4
               // console.log("salad render more key value-> " + disabledInfoMax[key]);
               continue
            }

            if (disabledInfoMax[key] >= 3 && key === "meat") {
                disabledInfoMax[key] = disabledInfoMax["meat"] >= 3
              //  console.log("salad render more key value-> " + disabledInfoMax[key]);
               continue
            }

            else {
                disabledInfoMax[key] = disabledInfo[key] < 0
            }
            
            
        }
        // console.log(disabledInfo);
        // console.log(disabledInfoMax);
       
      
        console.log("state ->"+this.state.modalStatus);
        return (
            <Aux>
                <Modal 
                    show={this.state.modalStatus} 
                    modalClosed={this.hideOrder}>
                    <OrderSUmmary 
                        ingredients = {this.state.ingredients} 
                        purchaseCancelled={this.hideOrder}
                        purchaseContinued={this.purchaseContinueHandler} 
                        totalValue={this.state.totalPrice}/>
                </Modal>
                <Burger 
                    ingredients={this.state.ingredients} />
                <BuildControls 
                    ingredientAdded = {this.addIngredientHandler} 
                    ingredientRemoved = {this.removeIngredientHandler}
                    disabled = {disabledInfo}
                    disabledMax = {disabledInfoMax}
                    purchasable = {hasIngredient()}
                    ordered={this.showOrder}
                    price={this.state.totalPrice}
                
                />
            </Aux>
        );
    }
}

export default BurgerBuilder;