import { Box, Button } from '@mui/material';
import Title from './Title';
import DefineRepoModal from './DefineRepoModal';
import { useLocation, useNavigate } from 'react-router-dom';

function NavBar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
      <Title />
      {pathname === '/' ? (
        <DefineRepoModal />
      ) : (
        <Button variant="contained" onClick={() => navigate('/')} sx={{ mb: 3 }}>
          Back
        </Button>
      )}
    </Box>
  );
}

export default NavBar;
