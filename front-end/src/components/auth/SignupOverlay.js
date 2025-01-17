import React from "react";

import '../../styles/general/Overlay.css';
import '../../styles/general/SignupButton.css';

import { useGlobalState } from '../../utils/gloablStateContext';

const SignUpOverlay = ({onCancel}) => {
    const { setSignup, setSignin } = useGlobalState();
    
    return (
        <section className="overlay auth">
            <div className="content">
                <h3>Create Account</h3>

                <form>
                    <input type="text" placeholder="First Name" />
                    <input type="text" placeholder="Last Name" />
                    <input type="email" placeholder="Email" />
                    <input type="text" placeholder="Company Name (Optional)" />
                    <input type="password" placeholder="Password" />
                    <input type="password" placeholder="Repeat Password" />

                    <div>
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                            }}>Sign Up</button>
                        
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