import { Button, Typography } from '@mui/material';
import { useMyContext } from './components/Context';
import Title from './components/Title';
import BoilerplateItem from './components/BoilerplateItem';
import { useNavigate } from 'react-router-dom';
import { useFetcher } from './fetcher';
import { IBoilerplate } from './types';

function Boilerplate() {
  const navigate = useNavigate();
  const { state } = useMyContext();

  const boilerplateData = useFetcher<IBoilerplate[]>(
    `repo/${state.repoURL}/${state.activeIssue?.id}/create-boilerplate`,
    { disabled: !state.activeIssue, method: 'POST' }
  );

  return (
    <>
      <Title />
      <Button variant="contained" onClick={() => navigate('/')} sx={{ mb: 3 }}>
        Back
      </Button>

      {state.activeIssue && (
        <>
          <Typography variant="h6">{state.activeIssue.title}</Typography>
          {boilerplateData.data?.map((item, index) => (
            <BoilerplateItem key={index}>{item}</BoilerplateItem>
          ))}
        </>
      )}
    </>
  );
}

export default Boilerplate;
