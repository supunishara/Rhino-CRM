import * as React from 'react';

export const navigationRef = React.createRef();

export function navigate(name, params) {
  navigationRef.current?.navigate(name, params);
}

const getNavigation = () => {
  return navigationRef.current && navigationRef.current;
};