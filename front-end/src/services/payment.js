import axios from "axios";

const paymentApi = process.env.REACT_APP_PAYMENT_API;

export const sendPayment = async (data) => {
    try {
        const token = localStorage.getItem("token");

        if (!token) return { success: false, message: "Unauthorized" };

        const response = await axios.post(paymentApi, data, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        return response.status === 200
            ? { success: true, message: "Payment Successful" }
            : { success: false, message: response.data.message || "Payment failed" };
    } catch (e) {
        console.error(e);
        return { success: false, message: "Error processing payment" };
    }
};