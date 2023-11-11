import { Box, Button, Paper, Typography } from '@mui/material';
import Issues from './components/Issues';
import DefineRepoModal from './components/DefineRepoModal';
import { useNavigate } from 'react-router-dom';
import { useMyContext } from './components/Context';
import { useFetcher } from './fetcher';
import { useEffect } from 'react';

function Home() {
  const navigate = useNavigate();
  const { state, handleChange } = useMyContext();

  const handleClick = (index: number) => {
    handleChange({ activeIssue: index });
  };

  const navigateToBoilerplate = () => {
    navigate('/boilerplate');
  };

  const navigateToGenerateCode = () => {
    navigate('/generate-code');
  };

  const issuesData = useFetcher(!state.repoURL);

  useEffect(() => {
    if (!issuesData.data) return;

    handleChange({ issues: issuesData.data });
  }, [issuesData.data, handleChange]);

  return (
    <>
      <DefineRepoModal />
      <Box sx={{ display: 'flex', flexDirection: 'row' }}>
        <Paper sx={{ padding: 3 }}>
          <Issues selected={state.activeIssue} handleSelect={(index) => handleClick(index)} />
        </Paper>
        <Paper sx={{ flex: 1, display: 'flex', padding: 3, ml: 3, flexDirection: 'column' }}>
          {state.activeIssue !== undefined && (
            <>
              <Typography variant="h6">Why do we use it {state.activeIssue}?</Typography>
              <Typography variant="body1">
                It is a long established fact that a reader will be distracted by the readable content of a page when
                looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution
                of letters, as opposed to using 'Content here, content here', making it look like readable English
              </Typography>
              <Box sx={{ mt: 'auto' }}>
                <Button variant="contained" onClick={navigateToBoilerplate} sx={{ mr: 3 }}>
                  Generate Boilerplate
                </Button>
                <Button variant="contained" onClick={navigateToGenerateCode} sx={{ mr: 3 }}>
                  Generate Code
                </Button>
              </Box>
            </>
          )}
        </Paper>
      </Box>
    </>
  );
}

export default Home;
