import * as actions from './actions';
import * as selectors from './selectors';
import { initStore } from '../store';

it('starts with no favorites', () => {
  const store = initStore();
  const state = store.getState();
  const favorites = selectors.selectFavorites(state);
  expect(favorites).toEqual([]);
});

it('adds a favorite and sets the favorited flag', () => {
  const store = initStore();
  store.dispatch(actions.mergeEntities([
    { id: 'foo', favorited: false },
  ]));
  store.dispatch(actions.addFavorite('foo', 1000));

  const state = store.getState();
  const favorites = selectors.selectFavorites(state);
  expect(favorites).toEqual([
    {
      id: 'foo',
      favorited: true,
    }
  ]);
});

it('sorts favorites by timestamp descending', () => {
  const store = initStore();
  store.dispatch(actions.mergeEntities([
    { id: 'foo', favorited: false },
    { id: 'bar', favorited: false },
  ]));
  store.dispatch(actions.addFavorite('foo', 1500));
  store.dispatch(actions.addFavorite('bar', 2000));
  
  const state = store.getState();
  const favorites = selectors.selectFavorites(state);
  expect(favorites).toEqual([
    {
      id: 'bar',
      favorited: true,
    },
    {
      id: 'foo',
      favorited: true,
    },
  ])
});
