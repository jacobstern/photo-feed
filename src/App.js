import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Link } from 'react-router';
import './app.css';
import { initStore } from './redux/store';
import feedService from './services/feed-service';
import 'normalize.css/normalize.css'

class App extends Component {

  constructor (props) {
    super(props);
    this.store = initStore({ feedService });
  }

  render() {
    return (
      <div className='app'>
        <div className='app__nav-container'>
          <nav className='app__nav'>
            <Link to='/'>Feed</Link>
            <span> | </span>
            <Link to='favorites'>Favorites</Link>
          </nav>
        </div>
        <Provider store={this.store}>
          <div className='app__container'>
            {this.props.children}
          </div>
        </Provider>
      </div>
    );
  }
}

export default App;
