import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalState } from "../../utils/globalStateContext";
import { sendRegistration } from "../../services/auth";

const SignUpOverlay = ({ onCancel }) => {
    const { setSignup, setSignin } = useGlobalState();
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const [showOverlay, setShowOverlay] = useState(false);
    const [role, setRole] = useState("User");

    const handleSignup = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        const firstName = formData.get("firstName");
        const lastName = formData.get("lastName");
        const email = formData.get("email");
        const username = formData.get("username");
        const password = formData.get("password");
        const repeatPassword = formData.get("repeatPassword");

        const passwordRules = {
            length: password.length >= 12,
            digit: /\d/.test(password),
            lowercase: /[a-z]/.test(password),
            uppercase: /[A-Z]/.test(password),
            special: /[^a-zA-Z0-9]/.test(password)
        };

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
        
        if (!passwordRules.length) validationErrors.password = "Password must be at least 12 characters";
        else if (!passwordRules.digit) validationErrors.password = "Password must contain at least one digit";
        else if (!passwordRules.lowercase) validationErrors.password = "Password must contain a lowercase letter";
        else if (!passwordRules.uppercase) validationErrors.password = "Password must contain an uppercase letter";
        else if (!passwordRules.special) validationErrors.password = "Password must contain a special character";

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        const formValues = {
            firstName,
            lastName,
            email,
            username,
            password,
            role,
        };

        console.log(formValues);

        const result = await sendRegistration(formValues);
        console.log(result.response);
        
        if (result.success) {
            setSignup(false);
            navigate("/profile");
        }

        else
        {
            validationErrors.username = result.response;
            setErrors(validationErrors);
        }
    };

    return (
        <section className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center bg-dark bg-opacity-75" style={{ zIndex: 1050, backdropFilter: "blur(5px)" }}>
            <div className="card p-4 shadow-lg w-50">
                <h3 style={{ fontFamily: "Georgia, serif" }} className="text-center">Create Account</h3>

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
                        {errors.username && <small className="text-danger">{errors.username}</small>}
                    </div>

                    <div className="mb-3">
                        <input type="password" placeholder="Password (min 12 letters, at least 1 upper, 1 lower, 1 digit, 1 special character)" name="password" className="form-control" />
                        {errors.password && <small className="text-danger">{errors.password}</small>}
                    </div>

                    <div className="mb-3">
                        <input type="password" placeholder="Repeat Password" name="repeatPassword" className="form-control" />
                        {errors.repeatPassword && <small className="text-danger">{errors.repeatPassword}</small>}
                    </div>

                    <div className="mb-3">
                        <label className="me-3">Register as:</label>

                        <div className="form-check form-check-inline">
                            <input 
                                className="form-check-input" 
                                type="radio" 
                                name="role" 
                                value="User" 
                                checked={role === "User"} 
                                onClick={() => setRole("User")} 
                            />

                            <label className="form-check-label">User</label>
                        </div>

                        <div className="form-check form-check-inline">
                            <input 
                                className="form-check-input" 
                                type="radio" 
                                name="role" 
                                value="Admin" 
                                checked={role === "Admin"} 
                                onClick={() => setRole("Admin")} 
                            />

                            <label className="form-check-label">Admin</label>
                        </div>
                    </div>

                    <div className="d-flex justify-content-between">
                        <button type="submit" className="btn btn-primary" style={{ backgroundColor: '#4D869C' }}>Sign Up</button>
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
