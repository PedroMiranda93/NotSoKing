import React from "react";
//import classes from "./Modal.module.css";
import "./Modal.css";
import Aux from "../../../hoc/_Aux";
import Backdrop from "../Backdrop/Backdrop";


const modal = (props) => (
    <Aux>
        <Backdrop show={props.show} clicked={props.modalClosed} />
        <div className={"Modal " + props.show} >
           
            {props.children}
        </div>
    </Aux>
);

export default modal;