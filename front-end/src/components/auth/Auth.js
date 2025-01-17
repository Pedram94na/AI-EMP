import React from "react";

import '../../styles/Overlay.css';
import { useGlobalState } from '../../utils/gloablStateContext';

export const SignUpOverlay = ({onCancel}) => {
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

export const SignInOverlay = ({onCancel}) => {
    const { setSignup, setSignin } = useGlobalState();

    return (
        <section className="overlay auth">
            <div className="content">
                <h3>Enter Account</h3>

                <form>
                    <input type="text" placeholder="Username" />
                    <input type="password" placeholder="Password" />

                    <div>
                        <button
                            onClick={(e) => {
                                e.preventDefault();

                            }}>Sign In</button>

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