import { useNavigate } from "react-router-dom";

export const signout = (setIsSessionActive, navigate) => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');

    setIsSessionActive(false);

    navigate('/');
};
