import type { RootState } from 'redux/reducer';
import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { connect } from 'react-redux';

const ProtectedRoute = ({
  component: Component,
  authenticated,
  ...rest
}: RouteProps & {
  component: () => JSX.Element;
  authenticated: boolean;
  name?: string;
}) => {
  return (
    <Route
      {...rest}
      render={(props: any) => {
        if (authenticated) {
          return <Component {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: '/login',
                state: { referrer: props.location },
              }}
            />
          );
        }
      }}
    />
  );
};

const mapState = (state: RootState) => {
  return { authenticated: state.authenticated };
};

export default connect(mapState)(ProtectedRoute);
