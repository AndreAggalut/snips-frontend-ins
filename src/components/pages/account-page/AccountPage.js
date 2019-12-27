import React, { Component } from 'react';

import PropTypes from 'prop-types';
import AccountForm from '../../account-form';

export default class AccountPage extends Component {
  static propTypes = {
    onLogin: PropTypes.func.isRequired,
    onSignup: PropTypes.func.isRequired,
  };
  constructor(props) {
    super(props);
    this.state = {
      isLogin: false,
    };
  }

  handleSwitchForm = () => {
    this.setState(prevState => ({ isLogin: !prevState.isLogin }));
  };

  render() {
    // HACK: Short circuiting the design with a single form
    return (
      <>
        {this.state.isLogin ? (
          <>
            <AccountForm
              isLogin={this.state.isLogin}
              onSubmit={this.props.onLogin}
            />
            <button onClick={this.handleSwitchForm}>Sign up?</button>
          </>
        ) : (
          <>
            <AccountForm
              isLogin={this.state.isLogin}
              onSubmit={this.props.onSignup}
            />
            <button onClick={this.handleSwitchForm}>Login?</button>
          </>
        )}
      </>
    );
  }
}
