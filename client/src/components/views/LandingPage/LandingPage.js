import React from "react";
import Pic from "../../../assets/pic.png";
import Pic2 from "../../../assets/pic2.png";
//import { FaCode } from "react-icons/fa";
function LandingPage() {
  return (
    <>
      <div className="back">
        <div className="app">
          <div className="row">
            <div className="col-6">
              <div className="cl">
                <span className="cl2">Let's Start Chatting!</span>
                <br />
                <span style={{ fontSize: "1.5rem" }}>
                  To chat please login!!
                </span>
                <br></br>
                <p>
                  Chatify is web-based chat application that allows users
                  <br></br>
                  to send and receive messages and audio/video calls using
                  browser.<br></br>Chatify will make life simpler for users who
                  send<br></br> and receive messages on instant basis for office
                  or educational purpose
                </p>

                <a href="/login">
                  <button className="button3">Login</button>
                </a>
              </div>
            </div>
            <div className="col-6">
              <img src={Pic2} alt=""></img>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LandingPage;
//<FaCode style={{ fontSize: '4rem' }} /><br />
