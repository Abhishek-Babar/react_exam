import React, { Component, createRef } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { editMedicine } from "../../redux/action";
import {v4 as uuidv4} from "uuid"
import "./style.css"
class AddMedicine extends Component {
    constructor(props) {
        super(props);
        this.name = createRef();
        this.manufacturer = createRef();
        this.price = createRef();
        this.stock = createRef();
        this.discount = createRef();
        this.state = {
            created: false
        }
    }
    createMedicine = () => {
        const medicines = JSON.parse(localStorage.getItem("medicines")) === null ? [] : JSON.parse(localStorage.getItem("medicines"));
        const name = this.name.current.value;
        const manufacturer = this.manufacturer.current.value;
        const price = this.price.current.value;
        const stock = this.stock.current.value;
        const discount = this.discount.current.value;
        if(name !== "", manufacturer !== "",price !== "", stock !== "", discount !== ""){
        const medicine = {
            name: name,
            manufacturer: manufacturer,
            price: price,
            stock: stock,
            discount: discount,
            id: uuidv4()
        }
        medicines.push(medicine);
        localStorage.setItem("medicines", JSON.stringify(medicines))
        this.setState({created: true});
        this.props.addNewMedicine(medicines);
    }
    }
    render() {
        return (
            <form className="main">
                <div className="mb-1 width">
                    <label for="name" className="form-label">Medicine Name</label>
                    <input ref={this.name} type="text" className="form-control" id="name" required/>
                </div>
                <div className="mb-1 width">
                    <label for="manufacturer" className="form-label">Manufacturer</label>
                    <input ref={this.manufacturer} type="text" className="form-control" id="manufacturer" required/>
                </div>
                <div className="mb-1 width">
                    <label for="price" className="form-label">Price</label>
                    <input ref={this.price} type="number" className="form-control" id="price" required/>
                </div>
                <div className="mb-1 width">
                    <label for="stock" className="form-label">Stock</label>
                    <input ref={this.stock} type="number" className="form-control" id="stock" required/>
                </div>
                <div className="mb-1 width">
                    <label for="discount" className="form-label">Discount</label>
                    <input ref={this.discount} type="number" className="form-control" id="discount" required/>
                </div>
                <button onClick={this.createMedicine} className="btn btn-success">Add Medicine</button>
                {this.state.created && <Redirect to="/view_medicines"/>}
            </form>
        )
    }
}
const mapDispatchToProps = (dispatch) => ({
    addNewMedicine: (payload) => dispatch(editMedicine(payload))
})
export default connect(null, mapDispatchToProps)(AddMedicine);