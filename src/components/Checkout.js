import React, { useState, useEffect } from "react";
import useUser from "src/hooks/useUser";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { buy, getCustomerCards } from "src/services/checkout";
import CardSelect from "./CardSelect";

// const CARDS = [
//   { id: 1, name: "JOSE TULA -xxxx-xxxx-xxxx-3423" },
//   { id: 2, name: "LOREM IPSUM -xxxx-xxxx-xxxx-6534" },
// ];

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

export default function CheckoutForm() {
  const { token } = useUser();
  const [error, setError] = useState(null);
  const [successful, setSuccessful] = useState(false);
  const [processing, setProcessing] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [userCards, setUserCards] = useState([]);
  const [cardSelected, setCardSelected] = useState("empty");
  const [saveCard, setSaveCard] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    getCustomerCards({ token }).then(setUserCards);
  }, [token]);

  const handleChange = async (event) => {
    // Listen for changes in the CardElement
    // and display any errors as the customer types their card details
    if (successful) setSuccessful(false);
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };

  const handleCards = (e) => {
    setCardSelected(e.target.value);
    if (error) setError("");
    if (successful) setSuccessful(false);
    if (e.target.value !== "empty") setDisabled(false);
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    setProcessing(true);

    try {
      let payload;
      let paymentMethodId;
      let stripeError;
      let off_session = false;

      if (cardSelected === "empty") {
        const { paymentMethod, error } = await stripe.createPaymentMethod({
          type: "card",
          card: elements.getElement(CardElement),
        });
        if (!error) {
          paymentMethodId = paymentMethod.id;
        } else {
          stripeError = error;
          setError(`Payment failed:  ${error.message}`);
        }
      } else {
        paymentMethodId = cardSelected;
        off_session = true;
      }

      if (!stripeError && paymentMethodId) {
        payload = {
          paymentMethodId,
          amount: 20,
          saveCard,
          off_session,
        };

        await buy(token, payload)
          .then((response) => {
            if (response.status < 300 && cardSelected === "empty") {
              elements.getElement(CardElement).clear();
            }
            setSuccessful(true);
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
    } catch (e) {
      setError(`Payment failed: ${e.message}`);
      setProcessing(false);
    }
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      {userCards.length > 0 && (
        <div className="mb-3">
          <CardSelect
            cards={userCards}
            cardSelected={cardSelected}
            handleCards={handleCards}
          />
        </div>
      )}
      {stripe && elements && cardSelected === "empty" && (
        <div className="mt-4">
          <CardElement
            id="card-element"
            options={cardStyle}
            onChange={handleChange}
            className="mt-2"
          />
          <div className="mt-3">
            <input
              id="save-card"
              onChange={() => setSaveCard((prev) => !prev)}
              checked={saveCard}
              type="checkbox"
            />
            <label className="mx-2" htmlFor="save-card-boolean">
              Save card
            </label>
            {saveCard && (
              <input name="fullname" placeholder="Enter card name.." />
            )}
          </div>
        </div>
      )}
      <div className="d-flex justify-content-center">
        <button
          className={`btn ${
            disabled ? "btn-secondary " : "btn-primary "
          }mt-2 text-center`}
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
      {successful && (
        <div className="alert alert-primary mt-4" role="alert">
          Successful payment
        </div>
      )}
    </form>
  );
}
