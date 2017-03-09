import React from 'react';
import './favorite-button.css';

const FavoriteButton = ({ className, favorited, onFavorite, onUnfavorite }) => {
  const onChange = () => {
    if (favorited) {
      onUnfavorite();
    } else {
      onFavorite();
    }
  };
  return (
    <div className={className}>
      <input
        className='favorite-button__input'
        type='checkbox'
        checked={favorited}
        onChange={onChange}
      />
      <label className='favorite-button__label'>
        Favorited
      </label>
    </div>
  );
};

export default FavoriteButton;
