import React, { useEffect } from "react";
import Home from "./pages/Home"
import Navbar from "./components/Navbar/navbar"
import Footer from "./components/Footer/footer"
import {Routes,Route} from "react-router-dom";
import AllBooks from "./pages/AllBooks"; // Add this import statement
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Cart from"./pages/cart";
import Profile from "./pages/profile";
import Viewbookdetails from "./components/ViewBookDetails/viewbookdetails";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "./store/auth";
import Favourites from "./components/Profile/Favourites";
import UserOrderHistory from "./components/Profile/UserOrderHistory";
import Settings from "./components/Profile/Settings";
import AllOrders from "./pages/AllOrders"
import AddBook from "./pages/AddBook";
import UpdateBook from "./pages/UpdateBook";
const App=()=>{
  const dispatch= useDispatch();
  const role= useSelector((state)=>state.auth.role);
  useEffect(() => {
    if(
      localStorage.getItem("id") &&
      localStorage.getItem("token") &&
      localStorage.getItem("role")
    ){
      dispatch(authActions.login());
      dispatch(authActions.changeRole(localStorage.getItem("role")));
    }
  }, []);
  return (
    <div>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />}/>
        <Route  path="/all-books" element={<AllBooks />}/>
        <Route  path="/cart" element={<Cart />}/>
        <Route  path="/profile" element={<Profile />}>
        {role ==="user" ? <Route index element={<Favourites/>}/> :
        <Route index element={<AllOrders/>}/>}
        {role ==="admin" && (
           <Route path="/profile/add-book" element={<AddBook/>}/>
        )}
        <Route path="/profile/orderHistory" element={<UserOrderHistory/>}/>
        <Route path="/profile/settings" element={<Settings/>}/>
        </Route>
        <Route  path="/Login" element={<Login />}/>
        <Route  path="/update-book/:id" element={<UpdateBook />}/>
        <Route  path="/Signup" element={<SignUp />}/>
        <Route path="view-book-details/:id" element={<Viewbookdetails />}/>
        </Routes>
        <Footer />
    </div>
  );
};

export default App;