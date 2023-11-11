import { Box, Paper } from '@mui/material';
import IssuesMenu from './components/IssuesMenu';
import DefineRepoModal from './components/DefineRepoModal';
import { useMyContext } from './components/Context';
import { useFetcher } from './fetcher';
import { useEffect } from 'react';
import Title from './components/Title';
import Issue from './components/Issue';
import { IIssue } from './types';

function Home() {
  const { state, handleChange } = useMyContext();

  const issuesData = useFetcher<IIssue[]>(`repo/${state.repoURL}/issues`, { disabled: !state.repoURL });

  useEffect(() => {
    if (!issuesData.data) return;

    handleChange({ issues: issuesData.data, activeIssue: issuesData.data[0] });
  }, [issuesData.data, handleChange]);

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
