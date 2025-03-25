import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalState } from "../../utils/globalStateContext";
import { sendLogin } from "../../services/auth";

const SignInOverlay = ({ onCancel }) => {
    const { setSignup, setSignin } = useGlobalState();
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});

    const handleSignin = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const username = formData.get("username");
        const password = formData.get("password");

        const validationErrors = {};
        if (!username) validationErrors.username = "Username is required";
        if (!password) validationErrors.password = "Password is required";

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        const formValues = {
            username: username,
            password: password
        };

        const result = await sendLogin(formValues);
        if (result.success) {
            setSignin(false);
            navigate("/profile");
        }
    };

    return (
        <section className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center bg-dark bg-opacity-75" style={{ zIndex: 1050, backdropFilter: "blur(5px)" }}>
            <div className="card p-4 shadow-lg w-50">
                <h3 className="text-center">Enter Account</h3>
                <form onSubmit={handleSignin} className="mt-3">
                    <div className="mb-3">
                        <input type="text" placeholder="Username" name="username" className="form-control" />
                        {errors.username && <small className="text-danger">{errors.username}</small>}
                    </div>
                    <div className="mb-3">
                        <input type="password" placeholder="Password" name="password" className="form-control" />
                        {errors.password && <small className="text-danger">{errors.password}</small>}
                    </div>
                    <div className="d-flex justify-content-between">
                        <button type="submit" className="btn btn-primary">Sign In</button>
                        <button 
                            className="btn btn-secondary"
                            onClick={(e) => {
                                e.preventDefault();
                                onCancel();
                            }}
                        >Cancel</button>
                    </div>
                </form>
                <div className="mt-3 text-center">
                    <a href="#" className="d-block">Forgot Password?</a>
                    <button 
                        className="btn btn-link"
                        onClick={() => {
                            setSignup(true);
                            setSignin(false);
                        }}
                    >Don't Have An Account?</button>
                </div>
            </div>
        </section>
    );
};

export default SignInOverlay;
