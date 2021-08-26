import React, { Component , createRef} from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { edit_orders } from "../../redux/action";

class EditOrder extends Component{
    constructor(props){
        super(props)
        this.name = createRef();
        this.contact = createRef();
        this.amount = createRef();
        this.quantity = createRef();
        this.search = createRef();
        this.state = {
            addedMedicines: [],
            totalAmount: 0,
            medicines: this.props.medicines,
            created: false,
            customer: this.props.foundOrder.customerName,
            contact: this.props.foundOrder.contactNumber
        }
    }
    addMedicine = (e) => {
        const medicines = this.props.medicines;
        const id = e.currentTarget.id;
        const medicine = medicines.find(item => item.id === id);
        const quantity = document.getElementById(medicine.name).value;
        const addMed = {
            name: medicine.name,
            price: medicine.price,
            quantity: quantity,
            discount: medicine.discount
        }
        const tillMed = this.state.addedMedicines;
        tillMed.push(addMed)
        let total = 0;
        this.setState({addedMedicines: tillMed}, () => {
            const all =  this.state.addedMedicines;
            for(let al of all) {
                let amount = ((parseInt(al.price) * parseInt(al.quantity)))
                let discount = ((amount / 100) * parseInt(al.discount))
                total += (amount - discount) 
                console.log(total, amount, al.quantity)
            }
            this.setState({totalAmount: total})
        })
        
    }
    editOrder = () => {
          const allOrders = JSON.parse(localStorage.getItem("orders")) === null ? [] : JSON.parse(localStorage.getItem("orders"));
          const filteredOrders = this.props.filteredOrders;          
          const foundOrder = this.props.foundOrder;
          const odrderIndex = allOrders.findIndex(item => item.orderId === foundOrder.orderId);
          const index = filteredOrders.findIndex(item => item.orderId === foundOrder.orderId)
          const customer = this.name.current.value;
          const contact = this.contact.current.value;
          const products = this.state.addedMedicines;
          const total = this.state.totalAmount;
          const newOrder = {
              customerName: customer,
              contactNumber: contact,
              products: products,
              totalAmount: total,
              orderId: foundOrder.orderId,
              creatorID: this.props.user
          }
          allOrders.splice(odrderIndex, 1 , newOrder);
          filteredOrders.splice(index, 1 , newOrder)
          localStorage.setItem("orders", JSON.stringify(allOrders))
          this.props.update({orders:allOrders, filter: filteredOrders});
          this.setState({created: true})
    }
    searchMed = () => {
       const search = this.search.current.value;
       const medicines = this.props.medicines;
       const filter = medicines.filter(item => item.name.toLowerCase().includes(search));
       this.setState({medicines: filter})
    }
    
    render(){
        return(
            <div className="main">
                <div className="mb-1 width">
                    <label for="name"  className="form-label">Customer Name</label>
                    <input onChange={(e) => this.setState({customer: e.target.value})}  value={this.state.customer} ref={this.name} type="text" className="form-control" id="name" />
                </div>
                <div className="mb-1 width">
                    <label for="contact" className="form-label">Contact Number</label>
                    <input onChange={(e) => this.setState({contact: e.target.value})}  value={this.state.contact} ref={this.contact} type="number" className="form-control" id="contact" />
                </div>
                <p  className="form-label">Select Medicine</p>
                <div id="product" className="mb-1">
                <div className="mb-1 width">
                    <label for="search" className="form-label">Search Medicines</label>
                    <input  onChange={this.searchMed} ref={this.search} type="text" className="form-control" id="search" />
                </div>
                {this.state.medicines.length > 0 ?  this.state.medicines.map(item => (
                 <div className="addMedicine">
                    <p><b>Medicine Name:</b> {item.name}</p>
                    <p><b>Medicine Price:</b> Rs {item.price}</p>
                    <p><b>Total Discount:</b> {item.discount}%</p>
                    <input type="number" id={item.name} placeholder="Enter Quantity" className="quantity" name="quantity"></input>
                    <button onClick={this.addMedicine} id={item.id} className="btn btn-warning ms-2">Add</button>
                   
                 </div>
             )) : <h1>No Medicines Available</h1>}
                </div>
                <div className="mb-1 width">
                    <label for="amount" className="form-label">Total Amount: {this.state.totalAmount}</label>
                </div>
                <button onClick={this.editOrder} className="btn btn-success">Edit Order</button>
                {this.state.created && <Redirect to={"/view_orders"}/>}
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    medicines: state.medicineReducer.medicines,
    user: state.userReducer.checkUser,
    foundOrder: state.orderReducer.findOrder,
    filteredOrders: state.orderReducer.filteredOrders
})
const mapDispatchToProps = (dispatch) => ({
     update: (payload) => dispatch(edit_orders(payload))
})
export default connect(mapStateToProps, mapDispatchToProps)(EditOrder);