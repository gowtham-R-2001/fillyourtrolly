import { useLogin } from "./helpers/useLogin";
import { Link, Redirect } from "react-router-dom";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Axios from "axios";
import { isValidEmail } from "./helpers/validation";
import { popper } from "./helpers/popper";
import { WishlistContext } from "./WishlistContext";

export function Register() {
    const registerKey = 'reg-key';
    const [values, handleValues] = useLogin(registerKey, { email: '', password: '', conpassword: '' });

    const handleRegister = (setLoginStatus) => {
        const emailInput = document.getElementById('email-input').value;
        const passwordInput = document.getElementById('password-input').value;
        const conPasswordInput = document.getElementById('conpassword-input').value;
        const regBtn = document.getElementById('reg-btn');

        if (!isValidEmail(emailInput)) popper("Invalid Email");

        else if (passwordInput.length <= 6) popper("Password length should be greater than 6");

        else if (passwordInput !== conPasswordInput) popper("Password mismatching");

        else {
            const url = `http://localhost:9000/register/?email=${emailInput}&password=${passwordInput}`;
            Axios.get(url)
                .then(res => {
                    regBtn.disabled = true;
                    if(res.data.status === 200) {
                        popper("Sign up success :) Please wait..");
                        localStorage.setItem("userDetails",JSON.stringify({email: emailInput}));
                        setTimeout(() => setLoginStatus(true), 1500);
                    }
                    else {
                        popper("User already exists :(");
                    }
                })
                .catch(err => {
                    console.log(err);
                })
        }
    }

    return (
        <div className="register">
            <div className="register-panel">
                <TextField type="email" fullWidth value={values.email} onChange={(e) => { handleValues(e) }} name="email" id="email-input" label="Email id" variant="outlined" />
                <TextField type="password" fullWidth value={values.password} onChange={(e) => { handleValues(e) }} name="password" id="password-input" label="Password" variant="outlined" />
                <TextField type="password" fullWidth value={values.conpassword} onChange={(e) => { handleValues(e) }} name="conpassword" id="conpassword-input" label="Confirm Password" variant="outlined" />
                <WishlistContext.Consumer>
                    {
                        (context) => {
                            return(
                                <Button onClick={() => { handleRegister(context.setLoginStatus) }} id="reg-btn" variant="contained" size="medium" color="primary">
                                    Register
                                </Button>
                            );
                        }
                    }
                </WishlistContext.Consumer>
                <span>
                    Already have an account ? <Link to="/login">Login</Link>
                </span>
            </div>
        </div>
    );
}