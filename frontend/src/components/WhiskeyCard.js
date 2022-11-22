import React from "react";
import "../style/WhiskeyCard.css";

const WhiskeyCard = ({ whiskey, tagClicked, caskClicked, user }) => {
  return (
    <div className="whiskeyCard">
      <div className="headerContainer">
        <h5>{whiskey?.whiskeyTitle}</h5>

        {user ? <a href={`editwhiskey/` + whiskey._id}>EDIT</a> : ""}
      </div>
      <p>
        {whiskey?.region} {whiskey.country}
      </p>
      {whiskey?.cask ? (
        <div className="caskContainer">
          <p>
            Cask:{" "}
            {whiskey?.cask?.map((cask, i) => {
              return (
                <React.Fragment key={i}>
                  {i > 0 ? "/" : ""}
                  <button className="cask" value={cask} onClick={caskClicked}>
                    {cask}
                  </button>
                </React.Fragment>
              );
            })}
          </p>
        </div>
      ) : (
        <p></p>
      )}
      {whiskey?.alc ? <p>{whiskey?.alc} &#8240;</p> : <p></p>}

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
