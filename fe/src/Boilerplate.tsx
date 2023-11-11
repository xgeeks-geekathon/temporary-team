import { Typography } from '@mui/material';
import { useMyContext } from './components/Context';
import BoilerplateItem from './components/BoilerplateItem';
import { IBoilerplate } from './types';
import { useEffect, useState } from 'react';
import { fetcher } from './fetcher';
import NavBar from './components/NavBar';

function Boilerplate() {
  const { state } = useMyContext();

  const [boilerplateData, setBoilerplateData] = useState<IBoilerplate[]>();

  useEffect(() => {
    if (!state.repoURL || !state.issues || !state.activeIssue) return;

    fetcher<IBoilerplate[]>(
      `repo/${state.repoURL}/subtask/${state.issues[state.activeIssue].id}/boilerplate`,
      'POST'
    ).then((data) => {
      setBoilerplateData(data);
    });
  }, [state]);

  return (
    <>
      <NavBar />

      {state.issues && state.activeIssue && (
        <>
          <Typography variant="h6">{state.issues[state.activeIssue].title}</Typography>
          {boilerplateData?.map((item, index) => (
            <BoilerplateItem key={index}>{item}</BoilerplateItem>
          ))}
        </>
      )}
    </>
  );
}

export default Boilerplate;
