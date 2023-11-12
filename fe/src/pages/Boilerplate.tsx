import { Typography } from '@mui/material';
import { useMyContext } from '../components/Context';
import BoilerplateItem from '../components/BoilerplateItem';
import { IBoilerplate } from '../types';
import { useEffect, useState } from 'react';
import { fetcher } from '../fetcher';
import NavBar from '../components/NavBar';

function Boilerplate() {
  const { state } = useMyContext();

  const [boilerplateData, setBoilerplateData] = useState<IBoilerplate[]>();

  useEffect(() => {
    if (
      !state.repoURL ||
      !state.issues ||
      state.activeIssue === undefined ||
      !state.issues[state.activeIssue] ||
      !state.issues[state.activeIssue].subtasks
    )
      return;

    fetcher<{ error: string | null; boilerplate: IBoilerplate[] }>(
      `repo/${state.repoURL}/${state.issues[state.activeIssue].id}/create-boilerplate`,
      'POST'
    ).then((data) => {
      setBoilerplateData(data.boilerplate);
    });
  }, [state]);

  return (
    <>
      <NavBar />

      {state.issues && state.activeIssue !== undefined && (
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
