import { useState, ChangeEvent, FormEvent } from 'react';
// import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
// import FormControlLabel from '@mui/material/FormControlLabel';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
// import Checkbox from '@mui/material/Checkbox';
import IconifyIcon from 'components/base/IconifyIcon';
import { instance } from 'config/config';
import { useNavigate } from 'react-router-dom';
import Image from 'components/base/Image';
import LogoImg from 'assets/images/wellinit_logo.png';

interface SigninData {
  email: string;
  password: string;
}

interface UserResponse {
  success: boolean;
  code: number;
  data: [];
  message: string;
}

const Signin = () => {
  const [user, setUser] = useState<SigninData>({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, seterror] = useState<string>();

  const AUTHURL = '/user/user_data';

  const navigate = useNavigate();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const Handlesingin_Data = async (data: SigninData): Promise<UserResponse | null> => {
    const response = await instance.get(
      `${AUTHURL}?email=${data?.email}&password=${data?.password}`,
    );
    return response?.data;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(user);

    Handlesingin_Data(user)
      .then((res) => {
        Redirect(res?.data?.length ?? 0);
        localStorage.setItem('Singin_Data', JSON.stringify(res?.data));
      })
      .catch((err) => {
        console.log(err);
        seterror('Try again later !');
      });
  };

  const Redirect = (length: number) => {
    if (length === 1) {
      navigate('/');
    } else {
      seterror('Check Your Eamil or Password !');
    }
  };

  return (
    <>
      <Stack
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
        sx={{ marginBottom: '50px', marginTop: '20px' }}
      >
        <Image src={LogoImg} alt="logo" height={40} width={40} sx={{ mr: 1.25 }} />
        <Typography variant="h3" color="text.primary" letterSpacing={1}>
          Wellinit
        </Typography>
      </Stack>
      <Typography align="center" variant="h4">
        Sign In
      </Typography>
      <Typography mt={1.5} mb={5} align="center" variant="body2">
        Welcome back! Let's continue with,
      </Typography>


      <Stack component="form" mt={4} onSubmit={handleSubmit} direction="column" gap={3} p={1}>
        <TextField
          id="email"
          name="email"
          type="email"
          value={user.email}
          onChange={handleInputChange}
          placeholder="Your Email"
          autoComplete="email"
          fullWidth
          autoFocus
          variant="standard"
          label="Email"
          required
          InputProps={{
            sx: {
              marginTop: '30px !important',
            },
            startAdornment: (
              <InputAdornment position="start">
                <IconifyIcon icon="hugeicons:mail-at-sign-02" />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          id="password"
          name="password"
          type={showPassword ? 'text' : 'password'}
          value={user.password}
          onChange={handleInputChange}
          placeholder="Your Password"
          autoComplete="current-password"
          fullWidth
          required
          variant="standard"
          label="Password"
          InputProps={{
            sx: {
              marginTop: '30px !important',
            },
            startAdornment: (
              <InputAdornment position="start">
                <IconifyIcon icon="hugeicons:lock-key" />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment
                position="end"
                sx={{
                  opacity: user.password ? 1 : 0,
                  pointerEvents: user.password ? 'auto' : 'none',
                }}
              >
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowPassword(!showPassword)}
                  sx={{ border: 'none', bgcolor: 'transparent !important' }}
                  edge="end"
                >
                  <IconifyIcon
                    icon={showPassword ? 'fluent-mdl2:view' : 'fluent-mdl2:hide-3'}
                    color="neutral.light"
                  />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Button
          type="submit"
          variant="contained"
          size="medium"
          fullWidth
          
          style={{ marginBottom: '20px', marginTop: '10px', background: "#00A9E5" }}
        >
          Sign In
        </Button>
      </Stack>

      {error ? (
        <Typography mt={5} variant="body2" color="red" align="center" letterSpacing={0.25}>
          {error}
        </Typography>
      ) : null}
    </>
  );
};

export default Signin;
