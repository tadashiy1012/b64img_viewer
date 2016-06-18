import React from 'react';
import { render } from 'react-dom';
import { Provider, connect } from 'react-redux';
import { createStore } from 'redux';
import { createAction, handleAction, handleActions } from 'redux-actions';

const remote = window.require('electron').remote;

const App = React.createClass({
  render: function() {
    return (
      <div>
        <img src={this.props.picture} />
        <hr />
        <button onClick={this.props.setPict}>open</button>
      </div>
    );
  }
});

const setPict = createAction('SET_PICT');
const resetPict = createAction('RESET_PICT');
const reducer = handleActions({
  [setPict]: (state, action) => Object.assign({}, state, {
    picture: action.payload
  }),
  [resetPict]: (state, action) => Object.assign({}, state, {
    picture: ''
  })
}, {
  picture: ''
});

const store = createStore(reducer);

const mapStateToProps = (state, props) => state;
const mapDispatchToProps = (dispatch, props) => {
  return {
    setPict: () => {
      remote.require('./openFile')((resp) => {
        dispatch(setPict(resp));
      });
    },
    resetPict: () => {
      dispatch(resetPict());
    }
  }
};

const RApp = connect(mapStateToProps, mapDispatchToProps)(App);

render(
  <Provider store={store}>
    <RApp />
  </Provider>,
  document.getElementById('root')
);