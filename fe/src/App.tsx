import { Box, Button, Paper, Typography } from '@mui/material';
import { useState } from 'react';
import Issues from './components/Issues';
import DefineRepoModal from './components/DefineRepoModal';

function App() {
  const [activeIssue, setActiveIssue] = useState(0);

  return (
    <>
      <DefineRepoModal />
      <Box sx={{ display: 'flex', flexDirection: 'row' }}>
        <Paper sx={{ padding: 3 }}>
          <Issues selected={activeIssue} handleSelect={(index) => setActiveIssue(index)} />
        </Paper>
        <Paper sx={{ flex: 1, display: 'flex', padding: 3, ml: 3, flexDirection: 'column' }}>
          <Typography variant="h6">Why do we use it {activeIssue}?</Typography>
          <Typography variant="body1">
            It is a long established fact that a reader will be distracted by the readable content of a page when
            looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of
            letters, as opposed to using 'Content here, content here', making it look like readable English
          </Typography>
          <Box sx={{ mt: 'auto' }}>
            <Button variant="contained" onClick={() => {}} sx={{ mr: 3 }}>
              Generate BL
            </Button>
            <Button variant="contained" onClick={() => {}} sx={{ mr: 3 }}>
              Generate Code
            </Button>
          </Box>
        </Paper>
      </Box>
    </>
  );
}

export default App;
