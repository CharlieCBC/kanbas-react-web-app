import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User } from "./client";
import * as client from "./client";
export default function Signin() {
  const [credentials, setCredentials] = useState<User>({
    _id: "",
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    role: "USER",
  });
  const navigate = useNavigate();
  const signin = async () => {
    if (
      !credentials.username ||
      !credentials.password ||
      credentials.username === "" ||
      credentials.password === ""
    ) {
      window.alert("Username and password are required");
      return;
    }
    try {
      const response = await client.signin(credentials);
      if (response) {
        navigate("/Kanbas/Account/Profile");
      }
    } catch (err: any) {
      if (err.response && err.response.status === 401) {
        console.error("Unauthorized access - please check your credentials.");
        window.alert("Incorrect username or password");
      }
    }
  };

  return (
    <div>
      <h1>Signin</h1>
      <input
        value={credentials.username}
        placeholder="username"
        className="mb-2"
        onChange={(e) =>
          setCredentials({ ...credentials, username: e.target.value })
        }
      />
      <br />
      <input
        value={credentials.password}
        className="mb-2"
        placeholder="password"
        onChange={(e) =>
          setCredentials({ ...credentials, password: e.target.value })
        }
      />
      <br />
      <button className="btn btn-success mb-2" onClick={signin}>
        {" "}
        Signin{" "}
      </button>
      <br />
      <Link to="/Kanbas/Account/Signup" className="btn btn-primary">
        Signup
      </Link>
    </div>
  );
}
