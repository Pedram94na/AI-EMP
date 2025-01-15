import React from "react";
import '../../styles/Overlay.css';

const SignUp = () => {
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
                        <button>Sign Up</button>
                        <button>Cancel</button>
                    </div>
                </form>

                <div>
                    <p>Have an account? <button>Sign In</button></p>
                </div>
            </div>
        </section>
    );
};

const SignIn = () => {
    return (
        <section className="overlay">
            <div className="content">
                <h3>Enter Account</h3>

                <form>
                    <input type="text" placeholder="Username" />
                    <input type="password" placeholder="Password" />

                    <div>
                        <button>Sign In</button>
                        <button>Cancel</button>
                    </div>
                </form>

                <div>
                    <a>Forgot Password?</a>

                    <p>Don't have an account? <button className="signup">Sign Up</button></p>
                </div>
            </div>
        </section>
    );
};

export { SignUp, SignIn };