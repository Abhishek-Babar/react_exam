import React, { Component, createRef } from "react";
import "./style.css"
import {Redirect} from "react-router-dom";
import { connect } from "react-redux";
import { user, filter} from "../../redux/action";
class Login extends Component{
    constructor(props){
        super(props);
        this.name  = createRef();
        this.password = createRef();
        this.state = {
            success: false,
        }
    }
    showCLick1 = () => {
      const form =  document.getElementsByClassName("login")[0];
      form.style.display = "flex";
      form.id = "manager"
    }
    showCLick2 = () => {
        const form =  document.getElementsByClassName("login")[0];
        form.style.display = "flex";
        form.id = "executive"
      }
    checkLogin = (e) => {
        e.preventDefault();
        const form =  document.getElementsByClassName("login")[0];
        if(form.id === "manager"){
            const user = this.name.current.value;
            const password = this.password.current.value;
            if(user === "test-admin" && password === "test-admin") {
                localStorage.setItem("logged", "manager");
                const user = localStorage.getItem("logged")
                const info = {
                    log: false,
                    user: user
                }
                this.props.user(info);
                localStorage.setItem("log", false);
                const allorders = this.props.orders;
                this.props.filter(allorders);
                this.setState({success: true});
            } else {
                alert("wrong username or password")
            }
        } else if(form.id === "executive"){
            const user = this.name.current.value;
            const password = this.password.current.value;
            const users = JSON.parse(localStorage.getItem("executives")) === null ? [] : JSON.parse(localStorage.getItem("executives"));
            const findUser = users.find(item => item.firstName === user);
            if(findUser){
                   if(findUser.password === password){
                    const order = async () => {
                    const details = findUser.id;
                    await localStorage.setItem("logged", JSON.stringify(details));
                    const user = localStorage.getItem("logged")
                    const info = {
                        log: false,
                        user: user
                    }
                    this.props.user(info)
                    const allorders = this.props.orders;
                    const filter = allorders.filter(item => item.creatorID == user); 
                    this.props.filter(filter)
                    this.setState({success: true});
                    }
                    order();
                   }
            }else if(user === "test-sales" && password === "test-sales") {
                const order = async () => {
                await localStorage.setItem("logged", "executive");
                const user = localStorage.getItem("logged")
                const info = {
                    log: false,
                    user: user
                }
                this.props.user(info)
                const allorders = this.props.orders;
                const filter = await allorders.filter(item => item.creatorID == user); 
                this.props.filter(filter);
                this.setState({success: true});
                }
                order()
            } else {
                alert("wrong username or password")
            }
        }
    }
    close = () => {
        const form =  document.getElementsByClassName("login")[0];
        form.style.display = "none";
    }
    render(){
        return(
            <div className="main">
                {this.props.isLoggedIn && < Redirect to="/home" />}
                <h1>Login Page</h1>
                <article onClick={this.showCLick1}>
                 Manager
                </article>
                <article onClick={this.showCLick2}>
                    Sales Executive
                </article>
                <form className="login">
                    <button onClick={this.close} id="close" type="button">&#10006;</button>
                    <input placeholder="Enter first name or username" ref={this.name} className="form-control" type="text"></input>
                    <input placeholder="Enter Password" ref={this.password} className="form-control" type="password"></input>
                    <button onClick={this.checkLogin} className="btn btn-warning btn-lg">Login</button>
                    {this.state.success && < Redirect to="/home" />}
                </form>
            </div>
        )
    }
}
const mapStateToProps = (state) => ({
    isLoggedIn: state.userReducer.checkUser,
    orders: state.orderReducer.orders
})
const mapDispatchToProps = (dispatch) => ({
    user: (payload) => dispatch(user(payload)),
    filter: (payload) => dispatch(filter(payload)) 
})
export default connect(mapStateToProps, mapDispatchToProps)(Login);