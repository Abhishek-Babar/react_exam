import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { filter } from "../../redux/action";

class Executive extends Component{
    constructor(props){
        super(props)
    } 
    data = () => {
        if(this.props.user !== "manager"){
          const orders = this.props.orders.filter(item => item.creatorID == this.props.user);
           this.props.filter(orders)
        } else {
            const orders = this.props.orders;
            this.props.filter(orders)
        }
    }
    render(){
        return(
            <div className="main">
                <Link to={"/new_order"}>
                <article>Create Order</article>
                </Link>
                <Link to={"/view_orders"}>
                <article onClick={this.data}>View All Orders</article>
                </Link>
            </div>
        )
    }
}
const mapStateToProps = (state) => ({
    orders: state.orderReducer.orders,
    user: state.userReducer.checkUser
})
const mapDispatchToProps = (dispatch) => ({
    filter: (payload) => dispatch(filter(payload)) 
})
export default connect(mapStateToProps, mapDispatchToProps)(Executive);