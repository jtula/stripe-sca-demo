import React from "react";

const CardSelect = ({ cards, cardSelected, handleCards }) => {
  return (
    <>
      <select
        name="cards-select"
        className="form-control"
        value={cardSelected}
        onChange={handleCards}
      >
        {cards.map((card) => (
          <option key={card.id} value={card.id}>
            {`xxxx-xxxx-xxxx-${card.card.last4}`}
          </option>
        ))}
      </select>
    </>
  );
};

export default CardSelect;
