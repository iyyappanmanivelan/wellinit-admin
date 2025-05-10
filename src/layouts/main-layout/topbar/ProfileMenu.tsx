import {useState } from 'react';
import Menu from '@mui/material/Menu';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';
import ListItemIcon from '@mui/material/ListItemIcon';
import IconifyIcon from 'components/base/IconifyIcon';
import { useNavigate } from 'react-router-dom';
import wellinitlogo from 'assets/images/wellinit_logo.png'

interface MenuItems {
  id: number;
  title: string;
  icon: string;
  link : string;
}

const menuItems: MenuItems[] = [
  {
    id: 1,
    title: 'View Profile',
    icon: 'hugeicons:user-circle-02',
    link : '/'
  },
  // {
  //   id: 2,
  //   title: 'Account Settings',
  //   icon: 'hugeicons:account-setting-02',
  // },
  // {
  //   id: 3,
  //   title: 'Notifications',
  //   icon: 'solar:bell-outline',
  // },
  // {
  //   id: 4,
  //   title: 'Switch Account',
  //   icon: 'hugeicons:user-switch',
  // },
  // {
  //   id: 5,
  //   title: 'Help Center',
  //   icon: 'carbon:help',
  // },
  {
    id: 2,
    title: 'Logout',
    icon: 'hugeicons:logout-03',
    link : '/authentication/signin'
  },
];

const ProfileMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const router = useNavigate()

  const handleProfileClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const value: string | null = localStorage.getItem('Singin_Data')
  const Maindata: { role: string  , email : string }[] | [] = value ? JSON.parse(value) : ''

  const Logout = ()=>{
    localStorage.removeItem('Singin_Data');
  }


  return (
    <>
      <ButtonBase
        onClick={handleProfileClick}
        aria-controls={open ? 'account-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        disableRipple
      >
        <Avatar
          src={wellinitlogo}
          sx={{
            height: 48,
            width: 48,
            backgroundColor : "#fff",
          }}
        />
      </ButtonBase>

      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleProfileMenuClose}
        onClick={handleProfileMenuClose}
        sx={{
          mt: 1.5,
          '& .MuiList-root': {
            p: 0,
            width: 230,
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <Box p={1}>
          <MenuItem onClick={handleProfileMenuClose} sx={{ '&:hover': { bgcolor: 'info.light' } }}>
            <Avatar src={wellinitlogo} sx={{ mr: 1, height: 42, width: 42  ,  backgroundColor : "#fff",}} />
            <Stack direction="column">
              <Typography variant="body2" color="text.primary" fontWeight={600}>
                {
                  Maindata[0] ? Maindata[0]?.role  : ''
                }
              </Typography>
              <Typography variant="caption" color="text.secondary" fontWeight={400}>
               {
                Maindata[0] ? Maindata[0]?.email : ''
               }
              </Typography>
            </Stack>
          </MenuItem>
        </Box>

        <Divider sx={{ my: 0 }} />

        <Box p={1}>
          {menuItems.map((item , i) => {
            return (
            <div key={i}  onClick={()=>{router(item?.link) ; item.id === 2 ?  Logout() : ''}} >
                <MenuItem key={item.id} onClick={handleProfileMenuClose} sx={{ py: 1 }}>
                <ListItemIcon sx={{ mr: 1, color: 'text.secondary', fontSize: 'h5.fontSize' }}>
                  <IconifyIcon icon={item.icon} />
                </ListItemIcon>
                <Typography variant="body2" color="text.secondary" fontWeight={500}>
                  {item.title}
                </Typography>
              </MenuItem>
            </div>
            );
          })}
        </Box>
      </Menu>
    </>
  );
};

export default ProfileMenu;
