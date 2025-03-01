import React from "react";
import { useNavigate } from "react-router-dom";

import '../../styles/general/Overlay.css';
import { useGlobalState } from '../../utils/globalStateContext';
import { sendLogin } from '../../services/auth';

const SignInOverlay = ({onCancel}) => {
    const { setSignup, setSignin } = useGlobalState();
    const navigate = useNavigate();

    const handleSignin = async (e) => {
        e.preventDefault();

        // Auth System Here
        const formData = new FormData(e.target);

        // Password check
        
        const formValues = {
            username: formData.get('username'),
            password: formData.get('password')
        };

        const result = await sendLogin(formValues);

        if (result.success)
        {
            setSignin(false);
            navigate('/profile');
        }
    };

    return (
        <section className="overlay auth">
            <div className="content">
                <h3>Enter Account</h3>

                <form onSubmit={handleSignin}>
                    <input type="text" placeholder="Username" name="username"/>
                    <input type="password" placeholder="Password" name="password" />

                    <div>
                        <button type="submit">Sign In</button>

                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                onCancel();
                            }}>Cancel</button>
                    </div>
                </form>

                <div className="extra">
                    <a>Forgot Password?</a>

                    <button className="signup"
                        onClick={(e) => {
                            setSignup(true);
                            setSignin(false);
                        }}>Don't Have An Account?</button>
                </div>
            </div>
        </section>
    );
};

export default SignInOverlay;