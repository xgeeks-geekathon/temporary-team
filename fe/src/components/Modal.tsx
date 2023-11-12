import { Box, Modal as MUIModal, Typography } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #1976d',
  p: 2,
  borderRadius: 1,
};

interface Props {
  children: JSX.Element | JSX.Element[];
  title: string;
  open: boolean;
  handleClose: () => void;
}

function Modal({ children, title, open, handleClose }: Props) {
  return (
    <MUIModal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Typography variant="h6" sx={{ mb: 1 }}>
          {title}
        </Typography>
        {children}
      </Box>
    </MUIModal>
  );
}

export default Modal;
