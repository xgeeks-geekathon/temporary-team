import { Box, Button, Input, Modal, Typography } from '@mui/material';
import { useMyContext } from './Context';
import { useState } from 'react';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function DefineRepoModal() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState<string>();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { handleChange } = useMyContext();

  return (
    <>
      <Button variant="contained" onClick={handleOpen} sx={{ mb: 3 }}>
        Define Repo URL
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Typography variant="h6" component="h2">
            Define Repo URL
          </Typography>
          <Input onChange={(e) => setInput(e.target.value)} sx={{ width: '100%' }} />
          <Button
            variant="contained"
            onClick={() => {
              handleChange({ repoURL: input });
              handleClose();
            }}
            sx={{ mt: 3 }}
          >
            Save
          </Button>
        </Box>
      </Modal>
    </>
  );
}

export default DefineRepoModal;
