import React, { useState, useEffect } from "react";

const Dashboard = (props) => {
  const [opacity, setOpacity] = useState("0");
  useEffect(() => {
    setOpacity("1");
  }, []);

  return (
    <div style={{ opacity: opacity, transition: ".8s" }}>
      <h1>Dashboard</h1>
    </div>
  );
};

export default Dashboard;
