import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { IIssue } from '../types';

interface Props {
  item: IIssue;
}

function Issue({ item }: Props) {
  const navigate = useNavigate();

  const navigateToBoilerplate = () => {
    navigate('/boilerplate');
  };

  const navigateToGenerateCode = () => {
    navigate('/generate-code');
  };

  return (
    <>
      <Typography variant="h6">{item.title}</Typography>
      <Typography variant="body1" sx={{ mt: 2 }}>
        {item.description}
      </Typography>
      <Box sx={{ mt: 'auto', pt: 3 }}>
        <Button variant="contained" onClick={navigateToBoilerplate} sx={{ mr: 3 }}>
          Generate Boilerplate
        </Button>
        <Button variant="contained" onClick={navigateToGenerateCode} sx={{ mr: 3 }}>
          Generate Code
        </Button>
      </Box>
    </>
  );
}

export default Issue;
