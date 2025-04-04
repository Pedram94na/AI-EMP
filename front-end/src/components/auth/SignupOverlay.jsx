import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalState } from "../../utils/globalStateContext";
import { sendRegistration } from "../../services/auth";

const SignUpOverlay = ({ onCancel }) => {
    const { setSignup, setSignin } = useGlobalState();
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    
    const handleSignup = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        const firstName = formData.get("firstName");
        const lastName = formData.get("lastName");
        const email = formData.get("email");
        const username = formData.get("username");
        const password = formData.get("password");
        const repeatPassword = formData.get("repeatPassword");

        const validationErrors = {};
        if (!firstName) validationErrors.firstName = "First Name is required";
        if (!lastName) validationErrors.lastName = "Last Name is required";
        if (!email) validationErrors.email = "Email is required";
        if (!username) validationErrors.username = "Username is required";
        if (!password) validationErrors.password = "Password is required";
        if (password !== repeatPassword) {
            validationErrors.password = "Passwords do not match";
            validationErrors.repeatPassword = "Passwords do not match";
        }

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        const formValues = {
            firstName,
            lastName,
            email,
            username: formData.get("username"),
            companyName: formData.get("companyName"),
            password,
        };

        const result = await sendRegistration(formValues);
        
        if (result.success) {
            setSignup(false);
            navigate("/profile");
        }
    };

    return (
        <section className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center bg-dark bg-opacity-75" style={{ zIndex: 1050, backdropFilter: "blur(5px)" }}>
            <div className="card p-4 shadow-lg w-50">
                <h3 className="text-center">Create Account</h3>
                <form onSubmit={handleSignup} className="mt-3">
                    <div className="mb-3">
                        <input type="text" placeholder="First Name" name="firstName" className="form-control" />
                        {errors.firstName && <small className="text-danger">{errors.firstName}</small>}
                    </div>
                    <div className="mb-3">
                        <input type="text" placeholder="Last Name" name="lastName" className="form-control" />
                        {errors.lastName && <small className="text-danger">{errors.lastName}</small>}
                    </div>
                    <div className="mb-3">
                        <input type="email" placeholder="Email" name="email" className="form-control" />
                        {errors.email && <small className="text-danger">{errors.email}</small>}
                    </div>
                    <div className="mb-3">
                        <input type="text" placeholder="Username" name="username" className="form-control" />
                    </div>
                    <div className="mb-3">
                        <input type="text" placeholder="Company Name (Optional)" name="companyName" className="form-control" />
                    </div>
                    <div className="mb-3">
                        <input type="password" placeholder="Password" name="password" className="form-control" />
                        {errors.password && <small className="text-danger">{errors.password}</small>}
                    </div>
                    <div className="mb-3">
                        <input type="password" placeholder="Repeat Password" name="repeatPassword" className="form-control" />
                        {errors.repeatPassword && <small className="text-danger">{errors.repeatPassword}</small>}
                    </div>
                    <div className="d-flex justify-content-between">
                        <button type="submit" className="btn btn-primary" style={{ backgroundColor: '#4D869C'}}>Sign Up</button>
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
                    <button 
                        className="btn btn-link"
                        style={{ color: '#4D869C'}}
                        onClick={() => {
                            setSignin(true);
                            setSignup(false);
                        }}
                    >Have An Account?</button>
                </div>
            </div>
        </section>
    );
};

export default SignUpOverlay;