import { MenuItem, MenuList, Typography } from '@mui/material';

interface Props {
  selected: number;
  handleSelect: (index: number) => void;
}

function Issues({ selected, handleSelect }: Props) {
  return (
    <>
      <Typography variant="h5">Issues</Typography>
      <MenuList>
        {new Array(4).fill(null).map((_, index) => (
          <MenuItem selected={selected === index} onClick={() => handleSelect(index)}>
            Issue {index}
          </MenuItem>
        ))}
      </MenuList>
    </>
  );
}

export default Issues;
