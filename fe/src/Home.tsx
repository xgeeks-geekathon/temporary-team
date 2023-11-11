import { Box, Paper } from '@mui/material';
import IssuesMenu from './components/IssuesMenu';
import DefineRepoModal from './components/DefineRepoModal';
import { useMyContext } from './components/Context';
import { useFetcher } from './fetcher';
import { useEffect } from 'react';
import Title from './components/Title';
import Issue from './components/Issue';

function Home() {
  const { state, handleChange } = useMyContext();

  const issuesData = useFetcher(`repo/${state.repoURL}/issues`, !state.repoURL);

  useEffect(() => {
    if (!issuesData.data) return;

    handleChange({ issues: issuesData.data, activeIssue: 0 });
  }, [issuesData.data, handleChange]);

  return (
    <>
      <Title />
      <DefineRepoModal />
      <Box sx={{ display: 'flex', flexDirection: 'row' }}>
        <IssuesMenu />
        <Paper sx={{ flex: 1, display: 'flex', padding: 3, ml: 3, flexDirection: 'column' }}>
          {state.issues && state.activeIssue !== undefined && <Issue item={state.issues[state.activeIssue]} />}
        </Paper>
      </Box>
    </>
  );
}

export default Home;
