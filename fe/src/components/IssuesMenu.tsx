import { MenuItem, MenuList, Paper, Typography } from '@mui/material';
import { useMyContext } from './Context';

function IssuesMenu() {
  const { state, handleChange } = useMyContext();

  return (
    <Paper sx={{ padding: 3, width: '20%' }}>
      <Typography variant="h5">Issues</Typography>
      <MenuList>
        {state.issues?.map((item) => (
          <MenuItem
            key={item.id}
            selected={state.activeIssue?.id === item.id}
            onClick={() => handleChange({ activeIssue: item })}
            sx={{ px: 1 }}
          >
            {item.title}
          </MenuItem>
        ))}
      </MenuList>
    </Paper>
  );
}

export default IssuesMenu;
