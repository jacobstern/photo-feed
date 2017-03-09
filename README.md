# photo-feed

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

## Time spent

I spent 6 hours on this:
  - 0.5 hours planning and diagramming Redux state
  - 2 hours building data model and tests
  - 3.5 hours on UI and end-to-end

## Known issues

I noticed last night there is a potential bug in `src/services/feed-service.js`. If there are two interleaving calls and one fails while the other succeeds, one of the Promises will not resolve. I know how to fix this but don't want to exceed the alloted time.

Otherwise, I'm not aware of any issues.

## Nice things

- Favorites saved locally using [redux-persist](https://github.com/rt2zz/redux-persist)! Also, redux-persist is customized to only store the state necessary for favorites, so you don't get a huge persisted state with all of the photo entities. See `src/redux/store.js` line 19.
- Routing between feed and favorites UI using React Router v3. See `src/routes.js`.
- Twitter-style UI prompting users to load more photos so the browsing experience isn't interrupted. See `src/containers/feed.js` line 40.
- Parse the actual Flickr author name from the JSON value which looks like `nobody@flickr.com ("author name")`. See `src/components/photos-list-item.js` line 5.

## How to build and run

Use `npm start` to run the app in development mode, and `npm test` to run tests.
