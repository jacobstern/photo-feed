import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import PhotosList from '../components/photos-list';
import * as photosActions from '../redux/photos/actions';
import * as photosSelectors from '../redux/photos/selectors';

export const Favorites = ({ favorites, addFavorite, removeFavorite }) => {
  const onPhotoFavorite = photo => addFavorite(photo.id, Date.now());
  const onPhotoUnfavorite = photo => removeFavorite(photo.id);
  return (
    <PhotosList
      photos={favorites}
      onPhotoFavorite={onPhotoFavorite}
      onPhotoUnfavorite={onPhotoUnfavorite}
    />
  );
}

const mapStateToProps = createStructuredSelector({
  favorites: photosSelectors.selectFavorites,
});
const mapDispatchToProps = {
  addFavorite: photosActions.addFavorite,
  removeFavorite: photosActions.removeFavorite,
};

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);
