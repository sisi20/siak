import React, { useState } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { methodPOSTSignIn } from 'src/store/action/usersAction';
import swal from 'sweetalert';

const theme = createTheme();
function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const sendDataToAPI = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);
    methodPOSTSignIn({
      endpoint: '/signin',
      body: formData,
    }).then((res) => {
      if (res?.message) {
        swal(res.message, '', 'error');
      } else {
        swal({
          title: 'Login Berhasil',
          timer: 5000
        });
        window.location.href = '/app/dataMahasiswa';
      }
    });
  };
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <br />
        <br />
        <br />
        <br />
        <div>
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            <Typography component="h1" variant="h5">
              LOGIN
            </Typography>
            <Box component="form" noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                value={email}
                name="email"
                label="Masukkan E-Mail"
                type="email"
                id=""
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="current-email"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                value={password}
                label="Masukkan Password"
                type="password"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Ingat Akun Saya"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={sendDataToAPI}
              >
                Login
              </Button>
              <Button
                fullWidth
                variant="contained"
                onClick={sendDataToAPI}
              >
                Sing Up
              </Button>
            </Box>
          </Box>
        </div>
      </Container>
    </ThemeProvider>
  );
}
export default Login;
