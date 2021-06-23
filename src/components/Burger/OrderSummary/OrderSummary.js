import React from "react";
import Aux from "../../../hoc/_Aux";
import classes from "./OrderSummary.module.css";
import Button from "../../UI/Button/Button";

const orderSUmmary = (props) => {

    const ingredientSummary = Object.entries(props.ingredients)
        .map(([key, val]) => (
            <li className={classes.Modal} key={key}>
                <span >{key}: </span>{val}
            </li>
        ));

    console.log(ingredientSummary);
    return (
        <Aux>
            <h3>Your oder</h3>
            <p>A delicious Burger with the following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p> Continue to checkout?</p>
            <p><strong>Price: {props.totalValue.toFixed(2)}€</strong></p>
            <Button btnType="Danger" clicked={props.purchaseCancelled}> Back</Button>
            <Button btnType="Success" clicked={props.purchaseContinued}> Continue </Button>
        </Aux>
    )
};

export default orderSUmmary;