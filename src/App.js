import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Switch, Route, Redirect} from "react-router-dom"
import Login from './components/login';
import Home from './components/home';
import Navbar from './components/nav';
import AddMedicine from './components/add_medicine';
import ViewMedicines from './components/view_medicines';
import EditMedicine from './components/edit_medicine';
import AddExecutive from './components/add_executive';
import ViewExecutive from "./components/view_team"
import EditExecutive from './components/edit_executive';
import Order from './components/order';
import ViewOrders from './components/view_orders';
import Executive from './components/executive';
import EditOrder from './components/edit_order'
function App() {
  return (
    <BrowserRouter>
    <Navbar />
    <Switch>
      <Route exact path="/react_exam1" component={Login}></Route>
      <Route exact path="/">
        <Redirect to="/react_exam1"></Redirect>
      </Route>
      <Route path="/home" component={Home}></Route>
      <Route path="/add_medicine" component={AddMedicine}></Route>
      <Route path="/view_medicines" component={ViewMedicines}></Route>
      <Route path="/edit_medicine" component={EditMedicine}></Route>
      <Route path="/add_executive" component={AddExecutive}></Route>
      <Route path="/view_executives" component={ViewExecutive}></Route>
      <Route path="/edit_executive" component={EditExecutive}></Route>
      <Route path="/new_order" component={Order}></Route>
      <Route path="/view_orders" component={ViewOrders}></Route>
      <Route path="/edit_order" component={EditOrder}></Route>
      <Route path="/manage_orders" component={Executive}></Route>
    </Switch>
    </BrowserRouter>
  );
}

export default App;
