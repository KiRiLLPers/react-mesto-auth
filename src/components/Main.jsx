import React, { useContext } from "react";
import Card from "./Card.jsx";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

const Main = ({ onEditProfile, onAddPlace, onEditAvatar, onCardClick, onCardLike, cards, onDeleteCardsPopup }) => {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="main content__main">
      <section className="profile main__profile">
        <div className="profile__wrap">
          <button type="button" className="profile__avatar" onClick={onEditAvatar} style={{ backgroundImage: `url(${currentUser.avatar})` }} />
          <div className="profile__info">
            <h1 className="profile__full-name">{currentUser.name}</h1>
            <p className="profile__profession">{currentUser.about}</p>
            <button type="button" className="profile__edit-button" onClick={onEditProfile} />
          </div>
        </div>
        <button type="button" className="profile__add-button" onClick={onAddPlace} />
      </section>
      <section className="photos main__photos" aria-label="Карточки мест">
        <div className="photos__wrap">
          {cards.map((card) => (
            <Card propsCard={card} key={card._id} onCardClick={onCardClick} onCardLike={onCardLike} onCardDeleteOpenPopup={onDeleteCardsPopup} />
          ))}
        </div>
      </section>
    </main>
  );
};

export default Main;
