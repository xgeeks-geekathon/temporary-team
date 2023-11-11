import { Paper, Typography } from '@mui/material';

interface Props {
  children: string;
}

function BoilerplateItem({ children }: Props) {
  return (
    <Paper sx={{ mt: 3, p: 1 }} variant="outlined">
      <Typography variant="body1">{children}</Typography>
    </Paper>
  );
}

export default BoilerplateItem;
