import { Button, Typography } from '@mui/material';
import { useMyContext } from './components/Context';
import Title from './components/Title';
import BoilerplateItem from './components/BoilerplateItem';
import { useNavigate } from 'react-router-dom';
import { IBoilerplate } from './types';
import { useEffect, useState } from 'react';
import { fetcher } from './fetcher';

function Boilerplate() {
  const navigate = useNavigate();
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
      <Title />
      <Button variant="contained" onClick={() => navigate('/')} sx={{ mb: 3 }}>
        Back
      </Button>

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
