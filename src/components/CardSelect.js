import React from "react";

const CardSelect = ({ cards, cardSelected, handleCards }) => {
  return (
    <>
      <select name="cards-select" value={cardSelected} onChange={handleCards}>
        {cards.map((card) => (
          <option key={card.id} value={card.id}>
            {card.name}
          </option>
        ))}
      </select>
    </>
  );
};

export default CardSelect;
