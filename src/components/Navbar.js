import React, { useContext } from 'react'
import { Link, Outlet } from 'react-router-dom'
import authContext from '../AuthContext'
import { getAuth, signOut } from 'firebase/auth';
import { app } from '../firebase';

const Navbar = () => {
    const {isLoggedIn, setIsLoggedIn} = useContext(authContext);
    // console.log(isLoggedIn);
    const auth = getAuth(app);
    const logOut = async () => {
        await signOut(auth);
        setIsLoggedIn(false);
        console.log("User has been signed out");
    }
  return (
    <>
    <div className='navbar'>
    <div className='navbar-title'>Busy Buy</div>
    <div className='navbar-links'>
        {isLoggedIn ? (
            <Link to="/orders"><h1>My Orders</h1></Link>
        ) : null}
        {isLoggedIn ? (
            <Link to="/cart"><h1>Cart</h1></Link>
        ) : null}
        <Link to="/"><h1>Home</h1></Link>
        {isLoggedIn ? (
            <h1 onClick={logOut}>Logout</h1>
        ) : (
            <Link to="/login"><h1>Login</h1></Link>
        )}
    </div>
</div>
    <Outlet />
    </>
  )
}

export default Navbar

// style={{display:'flex',justifyContent:'space-between' ,width: '200px', alignItems:'center'}}