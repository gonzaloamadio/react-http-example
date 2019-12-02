import React, { Component } from 'react';

// importComponent will be a function reference. A function that returns a promise.
// This will return a component. It returns a class with a render method. It will
// load a component that will be the argument of importComponent function.
const asyncComponent = importComponent => {
  return class extends Component {
    // This component state will be set to the dynamically loaded component.
    state = {
      component: null
    };

    // Code that implements the set of component state. i.e. will set
    // the component to be loaded dynamically.
    // That will be set once this HOC is mounted, so inside componentDidMount.
    componentDidMount() {
      importComponent()
        // In the function of the "then", we will receive an arg
        // which will have one property, default, which will be the
        // component we loaded dynamically.
        // This property is there, because we know the app was created with
        // create-react-app. So it is heavily coupled.
        .then(cmp => {
          this.setState({ component: cmp.default });
        });
    }

    render() {
      const C = this.state.component;
      // if C exists, return component C with any props we should need to pass,
      //  else null (if it has not been resolved yet.)
      return C ? <C {...this.props} /> : null;
    }
  };
};

export default asyncComponent;
