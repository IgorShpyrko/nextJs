import { FC, forwardRef } from 'react';

const WithRef = (Component: FC) => {
  const _forwardRef = (props, ref) => {
    return (
      <Component forwardedRef={ref} {...props} />
    );
  };
  return forwardRef(_forwardRef);
};

export default WithRef;
