import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./style.css"
class Manager extends Component{
    constructor(props){
       super(props)
    }
    render(){
        return(
            <div className="main">
                <Link to={"/add_medicine"}>
                <article>Add New Medicines</article>
                </Link>
                <Link to={"/view_medicines"}>
                <article>View All Medicines</article>
                </Link>
                <Link to={"/add_executive"}> 
                <article>Add New Sales Executive</article>
                </Link>
                <Link to={"/view_executives"}>
                <article>View Sales Team</article>
                </Link>
                <Link to={"/manage_orders"}>
                <article>Manage Orders</article>
                </Link>
            </div>
        )
    }
}
export default Manager;