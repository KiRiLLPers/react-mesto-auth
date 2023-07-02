import React, { useContext, useMemo, useCallback } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

const Card = ({ propsCard, onCardClick, onCardLike, onCardDeleteOpenPopup }) => {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = propsCard.owner._id === currentUser._id;
  const isLiked = propsCard.likes.some((i) => i._id === currentUser._id);

  const handleClick = () => {
    onCardClick(propsCard);
  };

  const handleLikeClick = () => {
    onCardLike(propsCard);
  };

  const handleDeleteCard = () => {
    onCardDeleteOpenPopup(propsCard);
  };

  const currentCard = useMemo(() => {
    return (
      <article className="card">
        <img src={propsCard.link} alt={propsCard.name} className="card__image" onClick={handleClick} />
        <div className="card__wrap">
          <h2 className="card__title">{propsCard.name}</h2>
          <div className="card__like-container">
            <button type="button" className={`card__like-image ${isLiked && "card__like-image_active"}`} onClick={handleLikeClick} />
            <h2 className="card__like-current">{propsCard.likes.length}</h2>
          </div>
        </div>
        {isOwn && <button type="button" className="card__trash-btn" onClick={handleDeleteCard} />}
      </article>
    );
  }, [propsCard.likes.length, propsCard.name, propsCard.link, isLiked, isOwn]);
  return currentCard;
};
export default Card;
