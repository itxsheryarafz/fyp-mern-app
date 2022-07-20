import React from "react";
export default function Forget() {
  return (
    <>
      <div className="Signup">
        <div className="box">
          <div className="form-group">
            <h1>Login Form</h1>
            <br></br>
            <br></br>
            <input
              type="text"
              name="name"
              placeholder="Please Enter your Name"
            ></input>
            <br></br>
            <br></br>
            <input
              type="number"
              name="phone_number"
              placeholder="Please Enter your Phone Number"
            ></input>
            <br></br>
            <br></br>
            <button className="btn btn-primary">Login</button>
          </div>
        </div>
      </div>
    </>
  );
}
