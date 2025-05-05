import { PropsWithChildren } from 'react';
// import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
// import ButtonBase from '@mui/material/ButtonBase';
// import Typography from '@mui/material/Typography';
// import Image from 'components/base/Image';
// import LogoImg from 'assets/images/wellinit_logo.png';
// import ButtonBase from '@mui/material/ButtonBase';
// import Typography from '@mui/material/Typography';
// import Image from 'components/base/Image';
// import LogoImg from 'assets/images/Logo.png';

const AuthLayout = ({ children }: PropsWithChildren) => {
  return (
    <Stack
      component="main"
      alignItems="center"
      justifyContent="center"
      px={1}
      py={7}
      width={1}
      minHeight="100vh"
      position="relative"
      bgcolor="#00A9E5"
    >
      <Paper
        sx={{
          px: 2,
          py: 3,
          width: 1,
          maxWidth: 450,
          boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
        }}
      >
        {children}
      </Paper>
    </Stack>
  );
};

export default AuthLayout;
