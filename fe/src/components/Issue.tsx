import { Box, Button, Paper, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { IIssue, ISubtask } from '../types';
import { useMyContext } from './Context';
import { fetcher } from '../fetcher';

interface Props {
  item: IIssue;
}

function Issue({ item }: Props) {
  const navigate = useNavigate();
  const { state, handleChange } = useMyContext();

  const execute = () => {
    if (!state.repoURL) return;

    fetcher<ISubtask[]>(`repo/${state.repoURL}/${item.id}`, 'POST').then((data) => {
      const nextIssues = state.issues ? [...state.issues] : [];
      const index = nextIssues.findIndex((it) => it.id === item.id);

      if (!data || nextIssues[index].subTasks) return;

      nextIssues[index] = { ...nextIssues[index], subTasks: data };
      const nextState = { ...state, issues: nextIssues, activeIssue: nextIssues[index] };

      handleChange(nextState);
    });
  };

  const navigateToBoilerplate = () => {
    navigate('/boilerplate');
  };

  const navigateToGenerateCode = () => {
    navigate('/generate-code');
  };

  return (
    <>
      <Typography variant="h6">{item.title}</Typography>
      <Typography variant="body1" sx={{ mt: 2 }}>
        {item.description}
      </Typography>

      {item.subTasks ? (
        <>
          {item.subTasks.map((it) => (
            <Paper sx={{ m: 2, p: 2 }}>
              <Typography variant="body1">{it.title}</Typography>
              <Typography variant="body2">{it.description}</Typography>
              <Box sx={{ mr: 1, pt: 2 }}>
                <Button variant="contained" onClick={navigateToBoilerplate} sx={{ mr: 3 }}>
                  Generate Boilerplate
                </Button>
                <Button variant="contained" onClick={navigateToGenerateCode} sx={{ mr: 3 }}>
                  Generate Code
                </Button>
              </Box>
            </Paper>
          ))}
        </>
      ) : (
        <Button variant="contained" onClick={execute} sx={{ mt: 3 }}>
          Generate Subtasks
        </Button>
      )}
    </>
  );
}

export default Issue;
