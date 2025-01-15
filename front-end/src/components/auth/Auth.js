import React from "react";
import { useGlobalState } from '../../utils/gloablStateContext';

export const SignUp = ({onCancel}) => {
    const { setSignup, setSignin } = useGlobalState();
    
    return (
        <section className="overlay">
            <div className="content">
                <h3 className="auth-title">Create Account</h3>

                <form className="auth-form">
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

                <div>
                    <p>
                        Have an account?
                        <button
                            onClick={(e) => {
                                setSignin(true);
                                setSignup(false);
                            }}>Sign In</button>
                    </p>
                </div>
            </div>
        </section>
    );
};

export const SignIn = ({onCancel}) => {
    const { setSignup, setSignin } = useGlobalState();

    return (
        <section className="overlay">
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

                <div>
                    <a>Forgot Password?</a>

                    <p>
                        Don't have an account?
                        <button className="signup"
                            onClick={(e) => {
                                setSignup(true);
                                setSignin(false);
                            }}>Sign Up</button>
                    </p>
                </div>
            </div>
        </section>
    );
};