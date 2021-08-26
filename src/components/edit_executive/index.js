import React, { Component, createRef } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { editExecuctive } from "../../redux/action";
class EditExecutive extends Component {
    constructor(props) {
        super(props);
        this.lName = createRef();
        this.fName = createRef();
        this.dob = createRef();
        this.experience = createRef();
        this.password = createRef();
        this.state = {
            created: false,
            fName: this.props.executive.firstName,
            lName: this.props.executive.lastName,
            password: this.props.executive.password,
            dob: this.props.executive.dateOfBirth,
            experience: this.props.executive.experienceYears,
            gender: this.props.executive.gender
        }
    }
    editExecutive = () => {
        const executive = this.props.executive;
        const executives = JSON.parse(localStorage.getItem("executives"));
        const index = executives.findIndex(item => item.id === executive.id);
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
        const newExecutive = {
            firstName: fName,
            lastName: lName,
            dateOfBirth: dob,
            gender: gender,
            experienceYears: experience,
            password: password,
            id: executive.id
        }
        executives.splice(index, 1 , newExecutive);
        localStorage.setItem("executives", JSON.stringify(executives))
        this.props.update(executives)
        this.setState({created: true})
    }
render() {
    return (
        <div className="main">
            <div className="mb-1 width">
                <label for="fName" className="form-label">First Name</label>
                <input onChange={(e) => this.setState({fName: e.target.value})} value={this.state.fName} ref={this.fName} type="text" className="form-control" id="fName" />
            </div>
            <div className="mb-1 width">
                <label for="lName" className="form-label">Last Name</label>
                <input onChange={(e) => this.setState({lName: e.target.value})} value={this.state.lName} ref={this.lName} type="text" className="form-control" id="lName" />
            </div>
            <div style={{ textAlign: "left" }} className="mb-1 width">
                <label for="dob" className="form-label">Date of Birth</label>
                <input onChange={(e) => this.setState({dob: e.target.value})} value={this.state.dob}  ref={this.dob} type="date" className="form-control" id="dob" />
            </div>
            <div >
                Gender: <br />
                <input  value="male" type="radio" name="gender" id="male" />
                <label for="male">
                    Male
                </label>
                <input  value="female" type="radio" name="gender" id="female" />
                <label for="female">
                    Female
                </label>
            </div>
            <div className="mb-1 width">
                <label onChange={(e) => this.setState({experience: e.target.value})} value={this.state.experience} for="experience" className="form-label">Experience Years</label>
                <input ref={this.experience} type="number" className="form-control" id="experience" />
            </div>
            <div className="mb-1 width">
                <label onChange={(e) => this.setState({password: e.target.value})} value={this.state.password} for="password" className="form-label">Password</label>
                <input ref={this.password} type="password" className="form-control" id="password" />
            </div>
            <button onClick={this.editExecutive} className="btn btn-success">Edit Executive</button>
            {this.state.created && <Redirect to="/view_executives" />}
        </div>
    )
}
}

const mapStateToProps = (state) => ({
    executive: state.executiveReducer.edit_executive
})
const mapDispatchToProps = (dispatch) => ({
   update: (payload) => dispatch(editExecuctive(payload))
})
export default connect(mapStateToProps, mapDispatchToProps)(EditExecutive);