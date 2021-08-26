import React, { Component } from "react";
import {Redirect, Route} from "react-router-dom";
import Executive from "../executive";
import Manager from "../manger";
class Home extends Component{
    constructor(props){
        super(props);
        this.state = {
            checkUser: localStorage.getItem("logged")
        }
    }
    render(){
        return( 
           <Route component={() => {
               if(this.state.checkUser === "manager"){
                   return(
                       <div><Manager/></div>
                   )
               } else if(this.state.checkUser === "executive" || this.state.checkUser){
                return(
                    <div><Executive/></div>
                )
               } else {
                   return(
                       <div>{<Redirect to={"/"} />}</div>
                   )
                }
           }}/>
        )
    }
}
export default Home;