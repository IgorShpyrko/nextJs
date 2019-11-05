// import { forwardRef } from 'react';

// const CustomButton = forwardRef(
//   ({ onClick, href }, ref) => (
//     <a href={href} onClick={onClick} ref={ref}>
//       Click Me
//     </a>
//   )
// );

import WithRef from "../../HOC/WithRef";
import useStyles from './styles';

const CustomButton = ({ forwardedRef, children, ...rest }) => {
  const classes = useStyles({});

  return (
    <div>
    <button
      className={classes.root}
      ref={forwardedRef}
      {...rest}
    >
      {children}
    </button>
  </div>
  )
};

export default WithRef(CustomButton);

