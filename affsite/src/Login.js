import { Link, Redirect } from "react-router-dom";
import { useLogin } from "./helpers/useLogin";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Axios from "axios";
import { isValidEmail } from "./helpers/validation";
import { popper } from "./helpers/popper";
import { useEffect } from "react";

export function Login() {
  const loginkey = "login-key";
  const [values, handleValues] = useLogin(loginkey, {
    email: "",
    password: "",
  });

  const handleLogin = () => {
    const emailInput = document.getElementById('email-input').value;
    const passwordInput = document.getElementById('password-input').value;
    const loginBtn = document.getElementById('login-btn');

    if (!isValidEmail(emailInput) || passwordInput.length <= 6) popper("Invalid Email or Password");

    else {
      const url = `http://localhost:9000/login/?email=${emailInput}&password=${passwordInput}`;
      Axios.get(url)
        .then((res) => {
          if (res.data.status === 200 && res.data.data[0]['COUNT(*)'] > 0) {
            popper("Login success :) Please wait..");
            localStorage.setItem("userDetails",JSON.stringify({email: emailInput}));
            <Redirect push to="/profile" />
          }
          else
            popper("No user exists :(");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  return (

    <div className="login">
      <div className="login-panel">
        <TextField
          type="email"
          fullWidth
          onChange={(e) => {
            handleValues(e);
          }}
          value={values.email}
          name="email"
          id="email-input"
          label="Email id"
          variant="outlined"
        />
        <TextField
          type="password"
          fullWidth
          value={values.password}
          onChange={(e) => {
            handleValues(e);
          }}
          name="password"
          id="password-input"
          label="Password"
          variant="outlined"
        />
        <Button
          id="login-btn"
          variant="contained"
          size="medium"
          color="primary"
          onClick={() => { handleLogin() }}
        >
          Login
        </Button>
        <span className="link-holder">
          Don't have an account ? <Link to="/register">Register</Link>
        </span>
      </div>
    </div>
  );
}
