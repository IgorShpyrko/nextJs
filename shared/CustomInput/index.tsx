import WithRef from "../../HOC/WithRef";
import useStyles from './styles';

const TextInput = ({ forwardedRef, children, ...rest }) => {
  const classes = useStyles({});

  return (
    <div>
    <input
      className={classes.root}
      ref={forwardedRef}
      {...rest}
    />
    {children}
  </div>
  )
};

export default WithRef(TextInput);
