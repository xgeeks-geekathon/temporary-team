import { Box, Button, Link, Paper, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ISubtask } from '../types';
import { useMyContext } from './Context';
import { fetcher } from '../fetcher';
import _set from 'lodash.set';
import { useState } from 'react';
import ValidationFeedback from './ValidationFeedback';

function Issues() {
  const navigate = useNavigate();
  const { state, handleChange } = useMyContext();
  const [open, setOpen] = useState(false);

  const item = state.issues && state.activeIssue !== undefined ? state.issues[state.activeIssue] : undefined;

  const execute = () => {
    if (!state.repoURL || !item) return;

    fetcher<ISubtask[]>(`repo/${state.repoURL}/issues/${item.id}`, 'POST').then((data) => {
      const nextState = { ...state };

      if (state.activeIssue === undefined) return;

      _set(nextState, ['issues', state.activeIssue, 'subtasks'], data);

      handleChange(nextState);
    });
  };

  const navigateToBoilerplate = () => {
    navigate('/boilerplate');
  };

  const navigateToGenerateCode = () => {
    navigate('/generate-code');
  };

  const generateAndOpenPR = (subtaskIndex: number) => () => {
    const data = {} as ISubtask;

    if (!data || state.activeIssue === undefined || !state.issues) return;

    const nextState = { ...state };

    _set(nextState, ['issues', state.activeIssue, 'subtasks', subtaskIndex, 'prLink'], 'https://google.com');

    handleChange(nextState);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  if (!item) return <></>;

  return (
    <>
      <Paper sx={{ flex: 1, display: 'flex', padding: 3, ml: 3, flexDirection: 'column' }}>
        <Typography variant="h6">{item.title}</Typography>
        <Typography variant="body1" sx={{ mt: 2 }}>
          {item.description}
        </Typography>

        {item.subtasks ? (
          <>
            {item.subtasks.map((it, index) => (
              <Paper key={index} sx={{ my: 2, p: 2 }}>
                <Typography variant="body1">{it.title}</Typography>
                <Typography variant="body2">{it.description}</Typography>
                <Box sx={{ mr: 1, pt: 2 }}>
                  {it.prLink ? (
                    <>
                      <Button variant="outlined" sx={{ mr: 3 }}>
                        <Link href={it.prLink} target="_blank">
                          See open PR
                        </Link>
                      </Button>
                      <Button variant="outlined" onClick={handleOpen}>
                        Validate code in PR
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button variant="contained" onClick={navigateToBoilerplate} sx={{ mr: 3 }}>
                        Get Boilerplate
                      </Button>
                      <Button variant="contained" onClick={navigateToGenerateCode} sx={{ mr: 3 }}>
                        Generate Code
                      </Button>
                      <Button variant="contained" onClick={generateAndOpenPR(index)} sx={{ mr: 3 }}>
                        Generate Code and PR
                      </Button>
                    </>
                  )}
                </Box>
              </Paper>
            ))}
          </>
        ) : (
          <Button variant="contained" onClick={execute} sx={{ mt: 3 }}>
            Generate Subtasks
          </Button>
        )}
      </Paper>

      <ValidationFeedback open={open} handleClose={handleClose} />
    </>
  );
}

export default Issues;
