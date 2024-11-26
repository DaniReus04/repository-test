import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

function Header() {
  return (
    <AppBar position="static" elevation={0} className='!bg-light-blue'>
      <Container maxWidth="xl">
        <Toolbar disableGutters className='gap-6'>
            <img
              src="https://cdn.b2blue.com/p/static/img/B2Blue_Logo_borda_branca.png"
              alt="b2blue-logo"
              className="h-16"
            />
            <Typography
              component="div"
              className="text-sm text-white"
              fontFamily={'unset'}
            >
              B2BLUE
            </Typography>
            <Typography
              component="div"
              className="text-sm text-white"
              fontFamily={'unset'}
            >
              PLATAFORM
            </Typography>
            <Typography
              component="div"
              className="text-sm text-white"
              fontFamily={'unset'}
            >
              HOW IT WORKS
            </Typography>
            <Typography
              component="div"
              className="text-sm text-white"
              fontFamily={'unset'}
            >
              PLANS
            </Typography>
            <Typography
              component="div"
              className="text-sm text-white"
              fontFamily={'unset'}
            >
              CONTACT
            </Typography>
            <Typography
              component="div"
              className="text-sm text-white"
              fontFamily={'unset'}
            >
              BLOG
            </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;
