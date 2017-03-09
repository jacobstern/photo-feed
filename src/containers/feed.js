import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import * as feedActions from '../redux/feed/actions';
import * as feedSelectors from '../redux/feed/selectors';
import * as photosActions from '../redux/photos/actions';
import asyncStatus from '../redux/common/async-status';
import PhotosList from '../components/photos-list';
import './feed.css';

export class Feed extends Component {

  componentDidMount () {
    if (this.props.feedStatus !== asyncStatus.SUCCESS) {
      this.props.getFeed();
    }
    this.props.startPollingUpdates();
  }

  onPhotoFavorite = photo => {
    this.props.addFavorite(photo.id, Date.now());
  }

  onPhotoUnfavorite = photo => {
    this.props.removeFavorite(photo.id);
  }

  onUpdatesClick = event => {
    event.preventDefault();
    this.props.acceptUpdates();
  }

  render () {
    const { feed, feedDirty, nextCount } = this.props;
    return (
      <PhotosList
        photos={feed}
        onPhotoFavorite={this.onPhotoFavorite}
        onPhotoUnfavorite={this.onPhotoUnfavorite}
        header={feedDirty &&
          <div className='feed__updates'>
            <a
              href='#'
              onClick={this.onUpdatesClick}
            >
              Show {nextCount - feed.length} new photos
            </a>
          </div>
        }
      />
    );
  }
}

const mapStateToProps = createStructuredSelector({
  feed: feedSelectors.selectCurrent,
  feedStatus: feedSelectors.selectStatus,
  feedDirty: feedSelectors.selectDirty,
  nextCount: feedSelectors.selectNextCount,
});
const mapDispatchToProps = {
  getFeed: feedActions.getFeed,
  addFavorite: photosActions.addFavorite,
  removeFavorite: photosActions.removeFavorite,
  startPollingUpdates: feedActions.startPollingUpdates,
  acceptUpdates: feedActions.acceptUpdates,
};

export default connect(mapStateToProps, mapDispatchToProps)(Feed);
