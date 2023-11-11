import { MenuItem, MenuList, Typography } from '@mui/material';
import { createArray } from '../utils';

interface Props {
  selected: number | undefined;
  handleSelect: (index: number) => void;
}

function Issues({ selected, handleSelect }: Props) {
  return (
    <>
      <Typography variant="h5">Issues</Typography>
      <MenuList>
        {createArray(4).map((_, index) => (
          <MenuItem selected={selected === index} onClick={() => handleSelect(index)}>
            Issue {index}
          </MenuItem>
        ))}
      </MenuList>
    </>
  );
}

export default Issues;
