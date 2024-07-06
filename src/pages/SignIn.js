import React, { useContext, useState } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { app, db } from "../firebase";
import authContext from "../AuthContext";
import { useNavigate } from "react-router-dom";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { CartContext } from "../CartContext";
import { toast } from "react-toastify";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState(null);
  const {isLoggedIn, setIsLoggedIn} = useContext(authContext);
  const {cart, setCart} = useContext(CartContext)
  const auth = getAuth(app);
  const navigate = useNavigate();

  const handleSignIn = async () => {
    // toast.success("success message");
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const cartDoc = await getDoc(doc(db, "carts", user.uid));
      if (cartDoc.exists()) {
        setCart(cartDoc.data());
        // console.log("Cart data fetched:", cartDoc.data());
      } else {
        // console.log("No cart found");
      }
      if(user){
        toast.success("User signed in");
      }
      
      // console.log("User signed in", user);
      setIsLoggedIn(true)
      navigate('/');
    } catch (e) {
      setErr(e.message);
      // console.log(e.message)
      toast.error(e.message)
      setIsLoggedIn(false)
    }
  };

  const handleSignUp = async () => {
    try {
      const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredentials.user;
      await setDoc(doc(db, "carts", user.uid), {
        items: []
      });
      setIsLoggedIn(true)
      navigate('/');
      // console.log("User signed up and cart created");
      toast.success("User signed up and cart created")
      // console.log("User Signed up");
    } catch (e) {
      setErr(e.message);
      console.log(e.message);
      toast.error(e.message);
    }
  };

  return (
    <div className="login-container">
  <h1>Sign in Page</h1>
  <div className="login-form">
    <input
      type="email"
      placeholder="Email"
      onChange={(e) => setEmail(e.target.value)}
    />
    <input
      type="password"
      placeholder="Password"
      onChange={(e) => setPassword(e.target.value)}
    />
    <div className="login-buttons">
      <button onClick={handleSignIn}>Sign In</button>
      <button onClick={handleSignUp}>Sign Up</button>
    </div>
  </div>
  {/* {err && <p className="error-message">{err}</p>} */}
</div>
  );
};

export default SignIn;
