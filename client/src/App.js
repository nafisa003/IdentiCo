import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import NavBar from './components/NavBar/NavBar';
import Companies from './components/Companies/Companies';
import { Container } from 'semantic-ui-react';
import NewCompany from './components/NewCompany/NewCompany';
import { createContext, useState } from 'react';
import CompanyDetail from './components/CompanyDetail/CompanyDetail';
import Products from './components/Products/Products';
import AddProduct from './components/AddProduct/AddProduct';
import BuyProductForm from './components/Products/BuyProductForm';
import Login from './components/Login/Login';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import Home from './components/Home/Home';

export const CompanyContext=createContext();
export const UserContext=createContext();
function App() {
  const [companyName,setCompanyName]=useState(["Gucci"]);
  const [user,setUser]=useState({
    isSignedIn:false,
    name:'',
    email:''
  });
  return (
    <UserContext.Provider value={[user,setUser]}>
    <CompanyContext.Provider value={[companyName,setCompanyName]}>
    <Container>
   <Router>
     <NavBar> </NavBar>
     <Switch>
       <Route exact path="/">
          <Home></Home>
       </Route>
       <PrivateRoute exact path="/companies">
          <Companies></Companies>
       </PrivateRoute>
       <PrivateRoute path="/companies/new">
         <NewCompany></NewCompany>
       </PrivateRoute>
       <Route exact path="/companies/:address">
         <CompanyDetail></CompanyDetail>
       </Route>
       <Route exact path="/companies/:address/products">
         <Products></Products>
       </Route>
       <Route exact path="/companies/:address/products/new">
        <AddProduct></AddProduct>
       </Route>
       <Route exact path="/companies/:address/products/:id">
        <BuyProductForm></BuyProductForm>
       </Route>
       <Route path="/login">
         <Login></Login>
       </Route>
     </Switch>
    
   </Router>
   </Container>
   </CompanyContext.Provider>
   </UserContext.Provider>
  );
}

export default App;
