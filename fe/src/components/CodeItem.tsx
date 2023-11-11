import { Box, Paper, Typography } from '@mui/material';

interface Props {
  children: string;
}

function CodeItem({ children }: Props) {
  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', mt: 3 }}>
        <Typography variant="body2">file.tsx</Typography>

        <Typography
          variant="body2"
          sx={{ '&:hover': { cursor: 'pointer' } }}
          onClick={async () => {
            await navigator.clipboard.writeText(children);
          }}
        >
          Copy
        </Typography>
      </Box>
      <Paper sx={{ mb: 3, p: 1 }} variant="outlined">
        <Typography variant="body1">{children}</Typography>
      </Paper>
    </>
  );
}

export default CodeItem;
