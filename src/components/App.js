import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import Header from "./Header";
import Main from "./Main";

import "../index.css";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import { api } from "../utils/api.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import DeleteCardsPopup from "./DeleteCardsPopup";
import Login from "./Login/Login";
import Register from "./Register/Register";
import ProtectedRouteElement from "./ProtectedRouteElement/ProtectedRouteElement";
import * as auth from "../utils/auth";

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isDeletePopupOpen, setDeletePopupOpen] = useState(false);
  const [isOpenImagePopup, setIsOpenImagePopup] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const [selectedCard, setSelectedCard] = useState({});
  const [selectedDeleteCard, setSelectedDeleteCard] = useState({});

  const [cards, setCards] = useState([]);

  const [currentUser, setCurrentUser] = useState({});

  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    handleTokenCheck();
    if (loggedIn) {
      Promise.all([api.getInitialCards(), api.getUserInfo()])
        .then(([cards, user]) => {
          cards.forEach((card) => {
            card.myProfileId = user._id;
          });
          setCurrentUser(user);
          setCards(cards);
        })
        .catch(console.error);
    }
  }, [loggedIn, email]);

  const handleEditAvatarClick = () => {
    setEditAvatarPopupOpen(true);
  };

  const handleEditProfileClick = () => {
    setEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setAddPlacePopupOpen(true);
  };

  const handleDeleteCardsOpen = (propsCard) => {
    setDeletePopupOpen(true);
    setSelectedDeleteCard(propsCard);
  };

  const handleUpdateUser = (data) => {
    setLoading(true);

    api
      .setUserInfo(data)
      .then((user) => {
        setCurrentUser(user);
        closeAllPopups();
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  const handleUpdateAvatar = (data) => {
    setLoading(true);
    api
      .setUserAvatar(data)
      .then((user) => {
        setCurrentUser(user);
        closeAllPopups();
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  const handleAddPlaceSubmit = (data) => {
    setLoading(true);
    api
      .addNewCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  function handleCardClick(propsCard) {
    setIsOpenImagePopup(true);
    setSelectedCard(propsCard);
  }

  const closeAllPopups = () => {
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setIsOpenImagePopup(false);
    setDeletePopupOpen(false);
  };

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
      })
      .catch(console.error);
  }

  function handleCardDelete() {
    setLoading(true);
    api
      .deleteCard(selectedDeleteCard._id)
      .then(() => {
        setCards([...cards].filter((item) => item._id !== selectedDeleteCard._id));
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }

  function handleLogin({ username }) {
    setLoggedIn(true);
    setEmail(username);
  }

  function handleTokenCheck() {
    if (localStorage.getItem("jwt")) {
      const jwt = localStorage.getItem("jwt");
      auth
        .checkToken(jwt)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            setEmail(res.data.email);
            navigate("/", { replace: true });
          }
        })
        .catch(console.error);
    }
  }

  return (
    <CurrentUserContext.Provider value={{ user: currentUser }}>
      <div className="content page__content">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header loggedIn={loggedIn} email={email} />
                <ProtectedRouteElement
                  element={Main}
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onEditAvatar={handleEditAvatarClick}
                  onDeleteCardsPopup={handleDeleteCardsOpen}
                  onCardClick={handleCardClick}
                  onCardLike={handleCardLike}
                  cards={cards}
                  loggedIn={loggedIn}
                />
              </>
            }
          ></Route>
          <Route
            path="/signin"
            element={
              <>
                <Header name={"signin"} />
                <Login handleLogin={handleLogin} />
              </>
            }
          ></Route>
          <Route
            path="/signup"
            element={
              <>
                <Header name={"signup"} />
                <Register />
              </>
            }
          ></Route>
          <Route path="*" element={<Navigate to="/" replace />}></Route>
        </Routes>
        <Footer />
        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} isLoading={isLoading} />
        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} isLoading={isLoading} />
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} isLoading={isLoading} />
        <DeleteCardsPopup isOpen={isDeletePopupOpen} onClose={closeAllPopups} onDeleteCard={handleCardDelete} isLoading={isLoading} />
        <ImagePopup onClose={closeAllPopups} selectedCard={selectedCard} isOpen={isOpenImagePopup} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
