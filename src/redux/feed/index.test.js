import asyncStatus from '../common/async-status';
import * as actions from './actions';
import * as photosActions from '../photos/actions';
import * as photosSelectors from '../photos/selectors';
import * as selectors from './selectors';
import { initStore } from '../store';

it('initially has a status of NONE', () => {
  const store = initStore();
  const state = store.getState();
  const status = selectors.selectStatus(state);
  expect(status).toEqual(asyncStatus.NONE);
});

it('sets status to SUCCESS and updates current, next', () => {
  const store = initStore();
  store.dispatch(actions.feedResponse({
    items: [
      { link: '1' },
      { link: '2' },
      { link: '3' },
    ],
  }));
  
  const state = store.getState();
  const status = selectors.selectStatus(state);
  const current = selectors.selectCurrent(state);
  const next = selectors.selectNext(state);
  const nextCount = selectors.selectNextCount(state);
  expect(status).toEqual(asyncStatus.SUCCESS);
  expect(current).toEqual([
    { link: '1', favorited: false, id: '1' },
    { link: '2', favorited: false, id: '2' },
    { link: '3', favorited: false, id: '3' },
  ]);
  expect(next).toEqual([ '1', '2', '3' ]);
  expect(nextCount).toEqual(3);
});

it('dedupes items in the updates', () => {
  const store = initStore();
  store.dispatch(actions.feedResponse({
    items: [
      { link: '1' },
      { link: '2' },
      { link: '3' },
    ],
  }));
  store.dispatch(actions.updatesResponse({
    items: [
      { link: '2' },
      { link: '3' },
      { link: '4' },
      { link: '5' },
    ],
  }));
  store.dispatch(actions.updatesResponse({
    items: [
      { link: '6' },
      { link: '4' },
      { link: '7' },
    ],
  }));

  const state = store.getState();
  const status = selectors.selectStatus(state);
  const current = selectors.selectCurrent(state);
  const next = selectors.selectNext(state);
  const nextCount = selectors.selectNextCount(state);
  expect(status).toEqual(asyncStatus.SUCCESS);
  expect(current).toEqual([
    { link: '1', favorited: false, id: '1' },
    { link: '2', favorited: false, id: '2' },
    { link: '3', favorited: false, id: '3' },
  ]);
  expect(next).toEqual(['6', '7', '4', '5','1', '2', '3' ]);
  expect(nextCount).toEqual(7);
});

it('sets the dirty flag when there are updates', () => {
  const store = initStore();
  store.dispatch(actions.feedResponse({
    items: [
      { link: '1' },
      { link: '2' },
      { link: '3' },
    ],
  }));
  let state = store.getState();
  expect(selectors.selectDirty(state)).toEqual(false);
  store.dispatch(actions.updatesResponse({
    items: [
      { link: '5' },
    ],
  }));
  state = store.getState();
  expect(selectors.selectDirty(state)).toEqual(true);
});

it('accepts updates and resets the dirty flag', () => {
  const store = initStore();
  store.dispatch(actions.feedResponse({
    items: [
      { link: '1' },
      { link: '2' },
      { link: '3' },
    ],
  }));
  store.dispatch(actions.updatesResponse({
    items: [
      { link: '5' },
    ],
  }));
  store.dispatch(actions.acceptUpdates());

  const state = store.getState();
  const current = selectors.selectCurrent(state);
  const next = selectors.selectNext(state);
  const dirty = selectors.selectDirty(state);
  expect(current).toEqual([
    { link: '5', favorited: false, id: '5' },
    { link: '1', favorited: false, id: '1' },
    { link: '2', favorited: false, id: '2' },
    { link: '3', favorited: false, id: '3' },
  ]);
  expect(next).toEqual([ '5', '1', '2', '3' ]);
  expect(dirty).toEqual(false);
});

it('does not stomp over the favorited flag when merging entities', () => {
  const store = initStore();
  store.dispatch(actions.feedResponse({
    items: [
      { link: '1' },
      { link: '2' },
      { link: '3' },
    ],
  }));
  store.dispatch(photosActions.addFavorite('1', 0));
  store.dispatch(actions.updatesResponse({
    items: [
      { link: '1' },
      { link: '5' },
    ],
  }));
  const state = store.getState();
  const favorites = photosSelectors.selectFavorites(state);
  expect(favorites).toEqual([
    { link: '1', favorited: true, id: '1' },
  ]);
});
