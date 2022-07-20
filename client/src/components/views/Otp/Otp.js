import React from "react";
import { Form, Input, Button } from "antd";
import Axios from "axios";
export default function Otp() {
  Axios.post(`http://localhost:5000/api/users/otp`);

  return <div className="container"></div>;
}
