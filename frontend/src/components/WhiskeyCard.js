import React from "react";
import "../style/WhiskeyCard.css";

const WhiskeyCard = ({ whiskey, tagClicked }) => {
  return (
    <div className="whiskeyCard">
      <h5>{whiskey?.whiskeyTitle}</h5>
      <p>
        {whiskey?.region} {whiskey.country}
      </p>

      <p>{whiskey?.description}</p>
      <p>{whiskey?.price} € / 2cl</p>
      <div className="tagsContainer">
        {whiskey?.tags?.map((tag, i) => (
          <button onClick={tagClicked} value={tag} className="tag" key={i}>
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
};

export default WhiskeyCard;
