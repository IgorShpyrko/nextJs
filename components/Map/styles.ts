import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles<Theme>((theme: Theme) => ({
  root: () => ({
    height: '300px',
    width: '100%'
  }),
}))

export default useStyles;
