import React, { Component, createRef } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { editMedicine } from "../../redux/action";

class EditMedicine extends Component{
    constructor(props){
        super(props);
        this.name = createRef();
        this.manufacturer = createRef();
        this.price = createRef();
        this.stock = createRef();
        this.discount = createRef();
        this.state = {
            mName: this.props.medicine.name,
            mManufacturer: this.props.medicine.manufacturer,
            mPrice: this.props.medicine.price,
            mStock: this.props.medicine.stock,
            mDiscount: this.props.medicine.discount,
            edited: false
        }
        
    }
    editMedicine = () => {
        const medicine = this.props.medicine;
        const medicines = JSON.parse(localStorage.getItem("medicines"));
        const index = medicines.findIndex(item => item.id === medicine.id);
        const name = this.name.current.value;
        const manufacturer = this.manufacturer.current.value;
        const price = this.price.current.value;
        const stock = this.stock.current.value;
        const discount = this.discount.current.value;
        const editedmedicine = {
            name: name,
            manufacturer: manufacturer,
            price: price,
            stock: stock,
            discount: discount,
            id: medicine.id
        }
        
        medicines.splice(index, 1 , editedmedicine);
        localStorage.setItem("medicines", JSON.stringify(medicines))
        this.props.update(medicines)
        this.setState({edited: true})
    }
    render(){
        return(
            <div className="main">
            <div className="mb-1 width">
                <label for="name" className="form-label">Medicine Name</label>
                <input onChange={(e) => this.setState({mName: e.target.value})} value={this.state.mName} ref={this.name} type="text" className="form-control" id="name" />
            </div>
            <div className="mb-1 width">
                <label for="manufacturer" className="form-label">Manufacturer</label>
                <input onChange={(e) => this.setState({mManufacturer: e.target.value})} value={this.state.mManufacturer} ref={this.manufacturer} type="text" className="form-control" id="manufacturer" />
            </div>
            <div className="mb-1 width">
                <label for="price" className="form-label">Price</label>
                <input onChange={(e) => this.setState({mPrice: e.target.value})} value={this.state.mPrice} ref={this.price} type="number" className="form-control" id="price" />
            </div>
            <div className="mb-1 width">
                <label for="stock" className="form-label">Stock</label>
                <input onChange={(e) => this.setState({mStock: e.target.value})} value={this.state.mStock} ref={this.stock} type="number" className="form-control" id="stock" />
            </div>
            <div className="mb-1 width">
                <label for="discount" className="form-label">Discount</label>
                <input onChange={(e) => this.setState({mDiscount: e.target.value})} value={this.state.mDiscount} ref={this.discount} type="number" className="form-control" id="discount" />
            </div>
            <button onClick={this.editMedicine} className="btn btn-success">Edit Medicine</button>
            {this.state.edited && <Redirect to="/view_medicines"/>}
        </div>
        )
    }
}
const mapStateToProps = (state) => ({
    medicine: state.medicineReducer.edit_medicine
})
const mapDispatchToProps = (dispatch) => ({
    update: (payload) => dispatch(editMedicine(payload))
})
export default connect(mapStateToProps, mapDispatchToProps)(EditMedicine);