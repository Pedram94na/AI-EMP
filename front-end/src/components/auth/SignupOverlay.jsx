import React from "react";
import { useNavigate } from "react-router-dom";

import '../../styles/general/Overlay.css';
import '../../styles/general/SignupButton.css';

import { useGlobalState } from '../../utils/globalStateContext';
import { sendRegistration } from "../../services/auth";

const SignUpOverlay = ({onCancel}) => {
    const { setSignup, setSignin } = useGlobalState();
    const navigate = new useNavigate();
    
    const handleSignup = async (e) => {
        e.preventDefault();

        // Auth System Here
        const formData = new FormData(e.target);

        // Password check
        
        const formValues = {
            firstName: formData.get('firstName'),
            lastName: formData.get('lastName'),
            email: formData.get('email'),
            username: formData.get('username'),
            // companyName: formData.get('companyName'),
            password: formData.get('password')
        };

        const result = await sendRegistration(formValues);
        
        if (result.success)
        {
            setSignup(false);
            navigate('/profile');
        }
    };

    return (
        <section className="overlay auth">
            <div className="content">
                <h3>Create Account</h3>

                <form onSubmit={handleSignup}>
                    <input type="text" placeholder="First Name" name="firstName"/>
                    <input type="text" placeholder="Last Name" name="lastName"/>
                    <input type="email" placeholder="Email" name="email"/>
                    <input type="text" placeholder="Username" name="username"/>
                    <input type="text" placeholder="Company Name (Optional)" name="companyName"/>
                    <input type="password" placeholder="Password" name="password"/>
                    <input type="password" placeholder="Repeat Password" name="repeatPassword"/>

                    <div>
                        <button type="submit">Sign Up</button>
                        
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                onCancel();
                            }}>Cancel</button>
                    </div>
                </form>

                <div className="extra">
                    <button
                        onClick={(e) => {
                            setSignin(true);
                            setSignup(false);
                        }}>Have An Account?</button>
                </div>
            </div>
        </section>
    );
};

export default SignUpOverlay;