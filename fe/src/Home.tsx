import { Box, Paper } from '@mui/material';
import IssuesMenu from './components/IssuesMenu';
import DefineRepoModal from './components/DefineRepoModal';
import { useMyContext } from './components/Context';
import { fetcher } from './fetcher';
import { useEffect } from 'react';
import Title from './components/Title';
import Issue from './components/Issue';
import { IIssue } from './types';

function Home() {
  const { state, handleChange } = useMyContext();

  useEffect(() => {
    if (!state.repoURL || state.issues?.length) return;

    fetcher<IIssue[]>(`repo/${state.repoURL}/issues`).then((data) => {
      handleChange({ issues: data, activeIssue: data[0] });
    });
  }, [handleChange, state]);

  return (
    <>
      <Title />
      <DefineRepoModal />
      <Box sx={{ display: 'flex', flexDirection: 'row' }}>
        <IssuesMenu />
        <Paper sx={{ flex: 1, display: 'flex', padding: 3, ml: 3, flexDirection: 'column' }}>
          {state.activeIssue && <Issue item={state.activeIssue} />}
        </Paper>
      </Box>
    </>
  );
}

export default Home;
