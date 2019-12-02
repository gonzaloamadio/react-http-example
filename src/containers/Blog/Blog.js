import React, { Component } from 'react';
// import axios from 'axios';
// eslint-disable-next-line
import { Route, NavLink, Switch, Redirect } from 'react-router-dom';

import './Blog.css';
import Posts from './Posts/Posts';
import asyncComponent from '../../hoc/asyncComponent';
// import NewPost from './NewPost/NewPost';

// Remember that the component take a function that returns a promise.
// When we use this constante, eventually will be a Component,
// as asyncComponent returns a Component, the one in the path of import().
const AsyncNewPost = asyncComponent(() => {
  // The import keyword as a function. It is a special syntax, the
  // dynamic import syntax, which means, whatever comes between the
  // parenthesis here is only imported when the function (the function
  // that is the argument of asyncComponent, in this case the arroy
  // function) is executed. Esta funcion va a ser ejecutada solo cuando
  // renderizemos AsyncNewPost.
  // So './NewPost/NewPost' will be imported, when the
  // constant AsyncNewPost is used somewhere.
  return import('./NewPost/NewPost');
});
// The oneliner version of this function will be:
// const AsyncNewPost = asyncComponent(() => import('./NewPost/NewPost'))

class Blog extends Component {
  state = {
    auth: true
  };
  render() {
    return (
      <div className="Blog">
        <header>
          <nav>
            <ul>
              <li>
                <NavLink to="/posts" exact>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={{
                    pathname: '/new-post',
                    hash: '#submit',
                    search: '?quick-submit=true'
                  }}
                >
                  New Post
                </NavLink>
              </li>
            </ul>
          </nav>
        </header>
        {/* <Route path="/" exact render={() => <h1>Home</h1>} />
                <Route path="/" render={() => <h1>Home 2</h1>} /> */}
        {/* With Switch, stop analyzing routes when first match is encountered */}
        <Switch>
          {/* This is how we control a lot of stuff, not rendering components if some condition happens */}
          {/* This will give null if not auth, and will end up in the Redirect or Route without path, 
                that catch everything that was not cought before. So we will end in /posts */}
          {this.state.auth ? (
            <Route path="/new-post" component={AsyncNewPost} />
          ) : null}
          <Route path="/posts" component={Posts} />
          {/* This is one way, with the Redirect at the end to catch a 404, 
          all unknown pages will be redirected with this. */}
          {/* <Redirect from="/" to="/posts" /> */}
          {/* Another way of doing it, is having a route withouth path */}
          <Route render={() => <h1>Not Found</h1>} />
        </Switch>
      </div>
    );
  }
}

export default Blog;
