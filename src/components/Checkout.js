import React, { useState, useEffect } from "react";
import useUser from "src/hooks/useUser";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { buy, getCustomerCards } from "src/services/checkout";

export default function CheckoutForm() {
  const { token } = useUser();
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [userCards, setUserCards] = useState(null);
  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    getCustomerCards({ token }).then(setUserCards);
  }, [token]);

  const cardStyle = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: "Arial, sans-serif",
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#32325d",
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  };

  const handleChange = async (event) => {
    // Listen for changes in the CardElement
    // and display any errors as the customer types their card details
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    setProcessing(true);

    try {
      await stripe
        .createPaymentMethod({
          type: "card",
          card: elements.getElement(CardElement),
        })
        .then(async ({ paymentMethod, error }) => {
          if (!error) {
            const paymentMethodId = paymentMethod.id;

            const payload = {
              paymentMethodId,
              amount: 20,
              token,
            };

            await buy(payload)
              .then((response) => {
                if (response.status < 300) {
                  elements.getElement(CardElement).clear();
                }
              })
              .catch(({ response }) => {
                const errorData = response.data;
                const code = errorData.code || errorData.message;
                const declineCode =
                  errorData.decline_code || "Something wrong happen!";
                const message = `${code} ${declineCode}`;
                setError(message);
              });
            setProcessing(false);
          }
        });
    } catch (e) {
      setError(`Payment failed: ${e.message}`);
      setProcessing(false);
    }
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      {stripe && elements && (
        <CardElement
          id="card-element"
          options={cardStyle}
          onChange={handleChange}
          className="mt-2"
        />
      )}
      <div className="d-flex justify-content-center">
        <button
          className="btn btn-primary mt-4 text-center"
          disabled={processing || disabled}
          id="submit"
        >
          {processing ? (
            <span
              className="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            ></span>
          ) : (
            "Pay"
          )}
        </button>
      </div>
      {error && (
        <div className="alert alert-danger mt-4" role="alert">
          {error}
        </div>
      )}
      {userCards && (
        <div className="alert alert-primary mt-4" role="alert">
          {JSON.stringify(userCards)}
        </div>
      )}
    </form>
  );
}
