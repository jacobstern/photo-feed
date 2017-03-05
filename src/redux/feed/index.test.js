import asyncStatus from '../common/async-status';
import * as actions from './actions';
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
      { url: "1" },
      { url: "2" },
      { url: "3" },
    ],
  }));
  
  const state = store.getState();
  const status = selectors.selectStatus(state);
  const current = selectors.selectCurrent(state);
  const next = selectors.selectNext(state);
  expect(status).toEqual(asyncStatus.SUCCESS);
  expect(current).toEqual([ "1", "2", "3" ]);
  expect(next).toEqual([ "1", "2", "3" ]);
});

it('dedupes items in the updates', () => {
  const store = initStore();
  store.dispatch(actions.feedResponse({
    items: [
      { url: "1" },
      { url: "2" },
      { url: "3" },
    ],
  }));
  store.dispatch(actions.updatesResponse({
    items: [
      { url: "2" },
      { url: "3" },
      { url: "4" },
      { url: "5" },
    ],
  }));
  store.dispatch(actions.updatesResponse({
    items: [
      { url: "6" },
      { url: "4" },
      { url: "7" },
    ],
  }));

  const state = store.getState();
  const status = selectors.selectStatus(state);
  const current = selectors.selectCurrent(state);
  const next = selectors.selectNext(state);
  expect(status).toEqual(asyncStatus.SUCCESS);
  expect(current).toEqual([ "1", "2", "3" ]);
  expect(next).toEqual([ "1", "2", "3", "4", "5", "6", "7" ]);
});

it('sets the dirty flag when there are updates', () => {
  const store = initStore();
  store.dispatch(actions.feedResponse({
    items: [
      { url: "1" },
      { url: "2" },
      { url: "3" },
    ],
  }));
  expect(selectors.selectDirty(store.getState())).toEqual(false);
  store.dispatch(actions.updatesResponse({
    items: [
      { url: "5" },
    ],
  }));
  expect(selectors.selectDirty(store.getState())).toEqual(true);
});

it('accepts updates and resets the dirty flag', () => {
  const store = initStore();
  store.dispatch(actions.feedResponse({
    items: [
      { url: "1" },
      { url: "2" },
      { url: "3" },
    ],
  }));
  store.dispatch(actions.updatesResponse({
    items: [
      { url: "5" },
    ],
  }));
  store.dispatch(actions.acceptUpdates());

  const state = store.getState();
  const current = selectors.selectCurrent(state);
  const next = selectors.selectNext(state);
  const dirty = selectors.selectDirty(state);
  expect(current).toEqual([ "1", "2", "3", "5" ]);
  expect(next).toEqual([ "1", "2", "3", "5" ]);
  expect(dirty).toEqual(false);
});
