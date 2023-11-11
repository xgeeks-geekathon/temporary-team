import { MenuItem, MenuList, Paper, Typography } from '@mui/material';
import { useMyContext } from './Context';

function IssuesMenu() {
  const { state, handleChange } = useMyContext();

  return (
    <Paper sx={{ padding: 3, width: '20%' }}>
      <Typography variant="h5">Issues</Typography>
      <MenuList>
        {state.issues?.map((item, index) => (
          <MenuItem
            selected={state.activeIssue === index}
            onClick={() => handleChange({ activeIssue: index })}
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
