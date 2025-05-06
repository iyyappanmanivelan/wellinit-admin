/* eslint-disable @typescript-eslint/no-explicit-any */
import { Stack, Box } from '@mui/material';
import IconifyIcon from 'components/base/IconifyIcon';

export const Popup = ({ children, open, onClose}: any) => {
  if (!open) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <Stack
     onClick={handleBackdropClick}
      sx={{
        position: 'fixed',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
        background: 'rgba(0, 0, 0, 0.25)',
        backdropFilter: 'blur(15px)',
        zIndex: 1300,
      }}
    >
      <Box
        sx={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: '#fff',
          borderRadius: '15px',
          width: '30%',
          height: 'fit-content',
          display: 'inline-block',
          padding: "20px 30px",
          boxShadow: 3,
        }}
      >
        <IconifyIcon
          icon="hugeicons:cancel-01"
          onClick={onClose}
          sx={{
            cursor: 'pointer',
            position: 'absolute',
            top: -15,
            right: -15,
            fontSize: 30,
            backgroundColor: 'rgb(0, 169, 229)',
            color: '#fff',
            borderRadius: '50%',
            padding: 0.8,
            '&:hover': {
              backgroundColor: '#ff0000',
              color: '#fff',
            },
          }}
        />
        {children}
      </Box>
    </Stack>
  );
};
