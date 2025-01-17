import React from "react";

import '../../styles/general/Overlay.css';
import { useGlobalState } from '../../utils/gloablStateContext';

const SignInOverlay = ({onCancel}) => {
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

export default SignInOverlay;