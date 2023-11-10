import { Button, Paper, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useMyContext } from './components/Context';

function Boilerplate() {
  const navigate = useNavigate();
  const { state } = useMyContext();

  return (
    <>
      <Button variant="contained" onClick={() => navigate('/')} sx={{ mr: 3, mb: 3 }}>
        Back
      </Button>
      <Paper sx={{ flex: 1, display: 'flex', padding: 3, flexDirection: 'column' }}>
        <Typography variant="h6">Why do we use it {state.activeIssue}?</Typography>
        <Paper sx={{ my: 3, p: 1 }} variant="outlined">
          <Typography variant="body1">
            It is a long established fact that a reader will be distracted by the readable content of a page when
            looking at its layout.
          </Typography>
        </Paper>
        <Paper sx={{ mb: 3, p: 1 }} variant="outlined">
          <Typography variant="body1">
            There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in
            some form, by injected humour, or randomised words which don't look even slightly believable.
          </Typography>
        </Paper>
        <Paper sx={{ mb: 3, p: 1 }} variant="outlined">
          <Typography variant="body1">
            The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections
            1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact
            original form, accompanied by English versions from the 1914 translation by H. Rackham.
          </Typography>
        </Paper>
        <Paper sx={{ mb: 3, p: 1 }} variant="outlined">
          <Typography variant="body1">
            The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections
            1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact
            original form, accompanied by English versions from the 1914 translation by H. Rackham.
          </Typography>
        </Paper>
        <Paper sx={{ mb: 3, p: 1 }} variant="outlined">
          <Typography variant="body1">
            The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections
            1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact
            original form, accompanied by English versions from the 1914 translation by H. Rackham.
          </Typography>
        </Paper>
        <Paper sx={{ mb: 3, p: 1 }} variant="outlined">
          <Typography variant="body1">
            The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections
            1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact
            original form, accompanied by English versions from the 1914 translation by H. Rackham.
          </Typography>
        </Paper>
        <Paper sx={{ mb: 3, p: 1 }} variant="outlined">
          <Typography variant="body1">
            The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections
            1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact
            original form, accompanied by English versions from the 1914 translation by H. Rackham.
          </Typography>
        </Paper>
        <Paper sx={{ p: 1 }} variant="outlined">
          <Typography variant="body1">
            The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to
            using 'Content here, content here', making it look like readable English
          </Typography>
        </Paper>
      </Paper>
    </>
  );
}

export default Boilerplate;
