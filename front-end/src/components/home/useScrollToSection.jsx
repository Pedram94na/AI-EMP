import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const UseScrollToSection = () => {
    const location = useLocation();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const sectionId = params.get("scrollTo");

        if (sectionId) {
            setTimeout(() => {
                document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
            }, 300);
        }
    }, [location]);
}
