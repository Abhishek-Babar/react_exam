import React, { Component , createRef } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { editExecuctive } from "../../redux/action";
import {v4 as uuidv4} from "uuid"
class AddExecutive extends Component {
    constructor(props) {
        super(props);
        this.lName = createRef();
        this.fName = createRef();
        this.dob = createRef();
        this.experience = createRef();
        this.password = createRef();
        this.state = {
            created: false
        }
    }
    addNewExecutive = (e) => {
        e.preventDefault();
        const executives = JSON.parse(localStorage.getItem("executives")) === null ? [] : JSON.parse(localStorage.getItem("executives"));
        const fName = this.fName.current.value;
        const lName = this.lName.current.value;
        const dob = this.dob.current.value;
        const experience = this.experience.current.value;
        const password = this.password.current.value;
        const genders = document.getElementsByName("gender");
        let gender;
        for(let genderr of genders){
            if(genderr.checked){
               gender = genderr.value
            }
        }
        if(fName !== "" && lName !== "" && dob !== "" &&experience !== "" && password !== "" ){
        const newExecutive = {
            firstName: fName,
            lastName: lName,
            dateOfBirth: dob,
            gender: gender,
            experienceYears: experience,
            password: password,
            id: uuidv4()
        }
        executives.push(newExecutive);
        localStorage.setItem("executives", JSON.stringify(executives));
        this.props.add(executives)
        this.setState({created: true})
    } else{
         alert("Please Fill All The Input Fields")
    }
    }
    render() {
        return (
            <form className="main">
                <div className="mb-1 width">
                    <label for="fName" className="form-label">First Name</label>
                    <input ref={this.fName} type="text" className="form-control" id="fName"  />
                </div>
                <div className="mb-1 width">
                    <label for="lName" className="form-label">Last Name</label>
                    <input ref={this.lName} type="text" className="form-control" id="lName"  />
                </div>
                <div style={{textAlign:"left"}} className="mb-1 width">
                    <label for="dob" className="form-label">Date of Birth</label>
                    <input ref={this.dob} type="date" className="form-control" id="dob"  />
                </div>
                <div >
                    Gender: <br/>
                    <input value="male" type="radio" name="gender" id="male" />
                    <label  for="male">
                       Male
                    </label>
                    <input value="female" type="radio" name="gender" id="female" />
                    <label  for="female">
                       Female
                    </label>
                </div>
                <div className="mb-1 width">
                    <label for="experience" className="form-label">Experience Years</label>
                    <input ref={this.experience} type="number" className="form-control" id="experience"  />
                </div>
                <div className="mb-1 width">
                    <label for="password" className="form-label">Password</label>
                    <input ref={this.password} type="password" className="form-control" id="password"  />
                </div>
                <button onClick={this.addNewExecutive} className="btn btn-success">Add Executive</button>
                {this.state.created && <Redirect to="/view_executives"/>}
            </form>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    add: (payload) => dispatch(editExecuctive(payload))
})
export default connect(null, mapDispatchToProps)(AddExecutive);