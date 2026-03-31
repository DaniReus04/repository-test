import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Wrapper from './wrapper';

function Header() {
  return (
    <AppBar position="sticky" elevation={0} className="!bg-light-blue">
      <Wrapper>
        <Toolbar disableGutters className="gap-6">
          <Typography
            component="div"
            className="text-sm text-white"
            fontFamily={'unset'}
          >
            Daniel Carvalho Amaro | github: @DaniReus04
          </Typography>
        </Toolbar>
      </Wrapper>
    </AppBar>
  );
}

export default Header;
