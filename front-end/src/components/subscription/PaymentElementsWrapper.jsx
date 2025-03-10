import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Payment from "./Payment";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const PaymentElementsWrapper = ({ onPaymentSuccess }) => {
    return (
        <Elements stripe={stripePromise}>
            <Payment onPaymentSuccess={onPaymentSuccess} />
        </Elements>
    );
};

export default PaymentElementsWrapper;
