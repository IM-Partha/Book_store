import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const PaymentButton = ({ amount }) => {
  const navigate = useNavigate();

  const handlePayment = async () => {
    try {
      // 1. Create order from backend
      const { data: order } = await axios.post(
        "http://localhost:3000/api/payment/orders",
        { amount }
      );

      // 2. Setup Razorpay checkout options
      const options = {
        key: "rzp_test_RBCZxW2LPPhd00", // use your test key
        amount: order.amount,
        currency: order.currency,
        name: "Book Store",
        description: "Purchase Books",
        order_id: order.id, // important
        handler: async function (response) {
          try {
            // 3. Verify payment
            const verifyRes = await axios.post(
              "http://localhost:3000/api/payment/verify",
              {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }
            );

            if (verifyRes.data.success) {
              toast.success("✅ Payment Successful!");

              // Redirect to home after short delay
              setTimeout(() => {
                navigate("/");

                // one-time refresh
                window.location.reload();
              }, 1000);
            } else {
              toast.error("❌ Payment verification failed!");
            }
          } catch (err) {
            console.error(err);
            toast.error("⚠️ Error verifying payment!");
          }
        },
        theme: { color: "#3399cc" },
      };

      // 4. Open Razorpay modal
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error(error);
      toast.error("⚠️ Error creating payment order!");
    }
  };

  return (
    <button
      onClick={handlePayment}
      className="cursor-pointer px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
    >
      Pay ₹{amount}
    </button>
  );
};

export default PaymentButton;
