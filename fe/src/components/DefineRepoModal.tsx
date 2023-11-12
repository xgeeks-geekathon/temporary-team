import { Box, Button, Input } from '@mui/material';
import { useMyContext } from './Context';
import { useState } from 'react';
import Modal from './Modal';

function DefineRepoModal() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState<string>();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const {
    state: { repoURL },
    handleChange,
    clear,
  } = useMyContext();

  return (
    <>
      <Box>
        <Button variant="contained" onClick={handleOpen} sx={{ mb: 3, mr: 3 }}>
          Define Repo URL
        </Button>
        {repoURL && (
          <Button variant="contained" onClick={clear} sx={{ mb: 3 }}>
            Clear
          </Button>
        )}
      </Box>
      <Modal open={open} handleClose={handleClose} title="Define Repo URL">
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
      </Modal>
    </>
  );
}

export default DefineRepoModal;
