import React from "react";

export default function GetUser() {
  function getCurrentUser() {
    console.log("get curr user");
  }
  return (
    <section>
      <h4>Get User</h4>
      <button onClick={getCurrentUser}>Submit to Get User</button>
    </section>
  );
}
