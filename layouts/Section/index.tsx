import useStyles from './styles';

const Section = ({children, ...rest}) => {
  const classes = useStyles({});

  return (
    <section className={classes.root}>
      {children}
    </section>
  )
};

export default Section;
