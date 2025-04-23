import React, { useEffect, useState } from "react";
import { auth } from "../firebase";
import { useAuth } from "../contexts/AuthContext";

const SUPPORT_EMAIL = "support@shivamformpilot.com";

const Dashboard = () => {
  const { currentUser } = useAuth();
  const [userData, setUserData] = useState(null);

 useEffect(() => {
    if (currentUser) {
      const data = JSON.parse(localStorage.getItem(currentUser.email)) || {
        apiKey: crypto.randomUUID(),
        apiUrl: `https://api.yourdomain.com/${crypto.randomUUID()}`,
        credits: 4,
        recharged: false
      };
      localStorage.setItem(currentUser.email, JSON.stringify(data));
      setUserData(data);
    }
  }, [currentUser]);

  const handleRecharge = () => {
    if (!userData) return;
    if (userData.recharged) {
      alert("Credits exhausted. Cannot recharge again.");
    } else {
      const updated = { ...userData, credits: 4, recharged: true };
      localStorage.setItem(currentUser.email, JSON.stringify(updated));
      setUserData(updated);
      alert("Credits recharged successfully.");
    }
  };

  const useCredit = () => {
    if (userData.credits <= 0) {
      alert("Credits exhausted. Please send an email to recharge.");
      return;
    }
    const updated = { ...userData, credits: userData.credits - 1 };
    localStorage.setItem(currentUser.email, JSON.stringify(updated));
    setUserData(updated);
  };

  const handleLogout = () => {
    auth.signOut();
    localStorage.removeItem(currentUser.email);
  };

  return (
    <div style={{ padding: "2rem" }} className="container">
      <h2>Welcome, {currentUser?.displayName}</h2>
      <p><strong>API URL:</strong> {userData?.apiUrl}</p>
      <p><strong>API KEY:</strong> {userData?.apiKey}</p>
      <p><strong>Credits Left:</strong> {userData?.credits}</p>

      <button onClick={useCredit}>Use 1 Credit</button>
      <button onClick={handleRecharge}>Simulate Email Recharge</button>
      <p>Send email to: <strong>{SUPPORT_EMAIL}</strong></p>
      <p>Subject: <code>Please recharge my credits</code></p>

      <button onClick={handleLogout} style={{ marginTop: "1rem" }}>Logout</button>
    </div>
  );
};

export default Dashboard;
