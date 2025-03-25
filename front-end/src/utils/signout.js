export const signout = (setIsSessionActive, navigate) => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.clear();

    setIsSessionActive(false);

    navigate('/');
};
