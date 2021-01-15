/**
 * This is a singleton to ensure we only instantiate Stripe once.
 */
import axios from "./axios";
import { loadStripe } from "@stripe/stripe-js";

let stripePromise;
const getStripe = async ({ token }) => {
  if (!stripePromise) {
    await axios
      .get("/checkout/public_key", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then(async (response) => {
        if (response.status === 200) {
          stripePromise = await loadStripe(response.data);
        }
      })
      .catch(() => {
        stripePromise = null;
      });
  }
  return stripePromise;
};

export default getStripe;
