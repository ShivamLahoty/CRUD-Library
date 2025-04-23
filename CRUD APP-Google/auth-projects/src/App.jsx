import React, { useEffect } from "react";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { auth, signInWithPopup, provider } from "./firebase";
import Dashboard from "./components/Dashboard";
import googleLogo from "./assets/google-logo.png";

function AppWrapper() {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
}

function App() {
  const { currentUser } = useAuth();

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Google Sign-in error", error);
    }
  };

  return (
    <div style={{ padding: "2rem" }} className="google-login-container">
      {!currentUser ? (
         <button className="google-btn" onClick={handleGoogleSignIn}>
         <img src={googleLogo} alt="Google" />
         <span>Login with Google</span>
       </button>
      ) : (
        <Dashboard />
      )}
    </div>
  );
}

export default AppWrapper;
