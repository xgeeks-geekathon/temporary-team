import { useEffect, useState } from 'react';
import Modal from './Modal';
import { Typography } from '@mui/material';
import { fetcher } from '../fetcher';
import { useMyContext } from './Context';

interface Props {
  open: boolean;
  handleClose: () => void;
}

function ValidationFeedback({ open, handleClose }: Props) {
  const { state } = useMyContext();
  const [feedback, setFeedback] = useState<string>();

  useEffect(() => {
    if (!open) return;

    fetcher<string>(`repo/${state.repoURL}/issues`).then((data) => {
      setFeedback('data');
    });
  }, [state, open]);

  return (
    <Modal open={open} handleClose={handleClose} title="Code validation feedback">
      <Typography variant="body2">{feedback}</Typography>
    </Modal>
  );
}

export default ValidationFeedback;
