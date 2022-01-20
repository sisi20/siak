import React, { useState } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { methodPOSTSignIn } from 'src/store/action/usersAction';
import swal from 'sweetalert';
import validator from 'validator';

const theme = createTheme();

export default function SignInSide() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    console.log({
      email: data.get('email'),
      password: data.get('password')
    });
  };

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const sendDataToAPI = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);

    if (validator.isEmail(email)) {
      methodPOSTSignIn({
        endpoint: '/signin',
        body: {
          email,
          password
        }
      }).then((res) => {
        if (res?.message) {
          swal(res.message, '', 'error');
        } else {
          swal('Berhasil Login', '', 'success');
          window.sessionStorage.setItem('key', res.username);
          window.location.href = '/app/dataMahasiswa';
        }
      });
    } else {
      swal('Gagal', 'Email tidak valid', 'error');
      setEmail('');
      setPassword('');
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />

        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          component={Paper}
          elevation={6}
          square
        >
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            <br />
            <br />

            <Typography component="h1" variant="h5">
              LOGIN
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 2 }}
            >
              <Grid item md={12} xs={12}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  value={email}
                  name="email"
                  label="Masukkan Email"
                  type="email"
                  id=""
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="current-email"
                />
              </Grid>
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

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={sendDataToAPI}
              >
                Sign In
              </Button>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                onClick={sendDataToAPI}
              >
                Sign UP
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
