import { MenuItem, MenuList, Paper, Typography } from '@mui/material';
import { useMyContext } from './Context';

function IssuesMenu() {
  const { state, handleChange } = useMyContext();

  if (!state.issues) return <></>;

  return (
    <Paper sx={{ padding: 3, width: '20%' }}>
      <Typography variant="h5">Issues</Typography>
      <MenuList>
        {state.issues.map((item, index) => (
          <MenuItem
            key={item.id}
            selected={
              state.issues && state.activeIssue !== undefined ? state.issues[state.activeIssue].id === item.id : false
            }
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
