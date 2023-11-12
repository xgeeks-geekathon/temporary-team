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

  const generateSubtasks = () => {
    if (!state.repoURL || !item) return;

    fetcher<ISubtask[]>(`repo/${state.repoURL}/issues/${item.id}`, 'POST').then((data) => {
      const nextState = { ...state };

      if (state.activeIssue === undefined || !Array.isArray(data)) return;

      _set(nextState, ['issues', state.activeIssue, 'subtasks'], data);

      handleChange(nextState);
    });
  };

  const navigateToBoilerplate = (index: number) => () => {
    navigate('/boilerplate');
  };

  const navigateToGenerateCode = () => {
    navigate('/generate-code');
  };

  const generateAndOpenPR = (subtaskIndex: number) => () => {
    if (!state.repoURL || !item) return;

    fetcher<{ error: string | null; data: any }>(
      `repo/${state.repoURL}/${item.subtasks?.[subtaskIndex].id}/create-boilerplate`,
      'POST'
    ).then((data) => {
      if (!data || data.error || state.activeIssue === undefined || !state.issues) return;

      const nextState = { ...state };

      _set(nextState, ['issues', state.activeIssue, 'subtasks', subtaskIndex, 'prLink'], data.data);

      handleChange(nextState);
    });
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
        {item.body.split('\n').map((partialBody) => (
          <Typography key={partialBody} variant="body1" sx={{ mt: 2 }}>
            {partialBody}
          </Typography>
        ))}

        {item.subtasks ? (
          <>
            {item.subtasks.map((it, index) => (
              <Paper key={index} sx={{ my: 2, p: 2 }}>
                <Typography variant="body1">{it.title}</Typography>
                {it.body.split('\n').map((partialBody) => (
                  <Typography key={partialBody} variant="body1" sx={{ mt: 2 }}>
                    {partialBody}
                  </Typography>
                ))}
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
                      {/* <Button variant="contained" onClick={navigateToBoilerplate(index)} sx={{ mr: 3 }}>
                        Get Boilerplate
                      </Button>
                      <Button variant="contained" onClick={navigateToGenerateCode} sx={{ mr: 3 }}>
                        Generate Code
                      </Button> */}
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
          <Button variant="contained" onClick={generateSubtasks} sx={{ mt: 3 }}>
            Generate Subtasks
          </Button>
        )}
      </Paper>

      <ValidationFeedback open={open} handleClose={handleClose} />
    </>
  );
}

export default Issues;
