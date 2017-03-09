import $ from 'jquery';

const resolveHandlers = [];

window.jsonFlickrFeed = feed => {
  if (resolveHandlers.length < 1) {
    return;
  }
  const [handler] = resolveHandlers.splice(0, 1);
  handler(feed);
}

const feedService = {

  getFeed () {
    return new Promise((resolve, reject) => {
      resolveHandlers.push(resolve);
      $.getScript('https://api.flickr.com/services/feeds/photos_public.gne?format=json')
        .fail(args => {
          reject(args);
          resolveHandlers.splice(0, 1);
        });
    });
  }
};

export default feedService;
