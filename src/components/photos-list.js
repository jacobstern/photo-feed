import React from 'react';
import PhotosListItem from './photos-list-item';
import './photos-list.css';

const PhotosList = ({ photos, onPhotoFavorite, onPhotoUnfavorite, header }) => {
  // Currently, just limit items to 200 to prevent a huge DOM
  const items = photos.filter(photo => photo != null).slice(0, 200).map(photo => {
    const onFavorite = () => onPhotoFavorite(photo);
    const onUnfavorite = () => onPhotoUnfavorite(photo);
    return (
      <PhotosListItem
        key={photo.id}
        link={photo.link}
        author={photo.author}
        title={photo.title}
        favorited={photo.favorited}
        onFavorite={onFavorite}
        onUnfavorite={onUnfavorite}
        image={photo.media ? photo.media.m : null}
      />
    );
  });
  return (
    <div className="photos-list">
      {header}
      {items}
    </div>
  );
};

export default PhotosList;
