import React, { useState } from "react";
import "./Login.css";
import auth from "../../firebase.init";
import {
  useSignInWithGoogle,
  useCreateUserWithEmailAndPassword,
} from "react-firebase-hooks/auth";
import GoogleButton from "react-google-button";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../Context/globalContext";
import signupimg from '../../assets/business-concept-with-graphic-holography.jpg'
import { Link } from "react-router-dom";
const Signup = () => {
  const navigate = useNavigate();
  const { setUserGlobally } = useGlobalContext(); // Get the function from context
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setName] = useState("");
  const [error, setError] = useState("");
  const [createUserWithEmailAndPassword, user, loading, createUserError] =
    useCreateUserWithEmailAndPassword(auth);
  const [signInWithGoogle, googleUser, googleLoading, googleError] =
    useSignInWithGoogle(auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await createUserWithEmailAndPassword(email, password);
      const newUser = { username, email, password ,uid: auth.currentUser.uid };
      console.log(newUser)
      const response = await fetch(`http://localhost:5000/register`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(newUser),
      });
      const data = await response.json();
      
     console.log(data)

      if (data.acknowledged) {
        
        const user = {
          user_id:data.insertedId,
          username,
          email
        };
        console.log(user)
        setUserGlobally(user)
   
        navigate("/dashboard");
      } else {
        setError("Failed to register user.");
      }
    } catch (err) {
      setError(err.message);
      window.alert(err.message);
    }
  };
  const handleGoogleSignIn = async (e) => {
    e.preventDefault();
    try {
      await signInWithGoogle();
      const user = {
        
        email: auth.currentUser.email,
        uid: auth.currentUser.uid,
        displayName: auth.currentUser.displayName,
        photoURL: auth.currentUser.photoURL,
        emailVerified: auth.currentUser.emailVerified,
        createdAt: new Date(),
        updatedAt: new Date(),
        firebaseUid: auth.currentUser.uid ,
       
      };
      console.log(user)
      const response = await fetch(`http://localhost:5000/register`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(user),
      });
      const data = await response.json();
    
      if (data.acknowledged) {
        const user = {
          user_id:data.insertedId,
          username:auth.currentUser.displayName,
          email:auth.currentUser.email,
          uid: auth.currentUser.uid
        };
        setUserGlobally(user)
        console.log(data);
        navigate("/dashboard");
      } else {
        setError("Failed to register user.");
      }
    } catch (err) {
      setError(err.message);
      window.alert(err.message);
    }
  };
  if (createUserError) {
    console.log(createUserError.message);
  }
  if (loading) {
    console.log("loading...");
  }
  if (googleError) {
    console.log(googleError.message);
  }
  if (googleLoading) {
    console.log("loading...");
  }

  return (
    <div className="login-container">

                <div className="login-image-container">
                    <img className="image" src={signupimg} alt="signupImage" />
                </div>


                <div className="login-form-container">
                    <div className="">
                        

                       

                        <div class="d-flex align-items-sm-center">
                            <h3 className="heading1"> Signup </h3>
                        </div>


             
                        <form onSubmit={handleSubmit}>

                            <input className="display-name" style={{ backgroudColor: "red" }}
                                type="username"
                                placeholder="@username "
                                value={username}
                                onChange={(e) => setName(e.target.value)}
                            />

                            

                            <input className="email"
                                type="email"
                                value={email}
                                placeholder="Email address"

                                onChange={(e) => setEmail(e.target.value)}
                            />



                            <input className="password"
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />


                            <div className="btn-login">
                                <button type="submit" className="login-btn">Sign Up</button>
                            </div>
                        </form>
                        <hr />
                        <div className="google-button">
                            <GoogleButton

                                className="g-btn"
                                type="light"
                                onClick={handleGoogleSignIn}

                            />
                        </div>
                        <div className="signup-link">
                            Already have an account?
                            <Link
                                to="/login"
                                style={{
                                    textDecoration: 'none',
                                    color: 'var(--twitter-color)',
                                    fontWeight: '600',
                                    marginLeft: '5px'
                                }}
                            >
                                Log In
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
  )
 
};

export default Signup;
