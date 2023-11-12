import { Box } from '@mui/material';
import IssuesMenu from '../components/IssuesMenu';
import { useMyContext } from '../components/Context';
import { fetcher } from '../fetcher';
import { useEffect } from 'react';
import Issues from '../components/Issues';
import { IIssue } from '../types';
import NavBar from '../components/NavBar';

function Home() {
  const { state, handleChange } = useMyContext();

  useEffect(() => {
    if (!state.repoURL || state.issues?.length) return;

    fetcher<{ issues: IIssue[] }>(`repo/${state.repoURL}/issues`).then((data) => {
      handleChange({ issues: data.issues, activeIssue: 0 });
    });
  }, [handleChange, state]);

  return (
    <>
      <NavBar />

      <Box sx={{ display: 'flex', flexDirection: 'row' }}>
        <IssuesMenu />
        <Issues />
      </Box>
    </>
  );
}

export default Home;
