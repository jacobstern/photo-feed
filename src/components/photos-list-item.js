import React from 'react';
import FavoriteButton from './favorite-button';
import './photos-list-item.css';

const parseAuthorName = (jsonAuthor) => {
  const openParenIndex = jsonAuthor.indexOf('("');
  if (openParenIndex >= 0) {
    const remaining = jsonAuthor.substring(openParenIndex + 2);
    const closeParenIndex = remaining.indexOf('")');
    if (closeParenIndex >= 0) {
      return remaining.substring(0, closeParenIndex);
    }
  }
  return jsonAuthor;
}

const PhotosListItem = ({
  link,
  author,
  title,
  favorited,
  image,
  onFavorite,
  onUnfavorite,
}) => {
  const renderTitle = title.trim() || 'Untitled';
  const renderAuthor = parseAuthorName(author);
  return (
    <div className='photos-list-item'>
      <div className='photos-list-item__container'>
        <a href={link} target='_blank'>
          <img
            className='photos-list-item__image'
            src={image}
            alt={renderTitle}
          />
        </a>
      </div>
      <div className='photos-list-item__footer'>
        <div className='photos-list-item__title'>
          {renderTitle}
        </div>
        <div className='photos-list-item__author'>
          {renderAuthor}
        </div>
        <FavoriteButton
          onFavorite={onFavorite}
          onUnfavorite={onUnfavorite}
          favorited={favorited}
          className='photos-list-item__favorite-button'
        />
      </div>
    </div>
  );
}

export default PhotosListItem;
