import { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField
} from '@material-ui/core';
import { useNavigate } from 'react-router-dom';

const AccountProfileDetails = (props) => {
  const [prodi, setProdi] = useState({
    nama_prodi: '',
    id: ''
  });

  const navigate = useNavigate();

  function submit(e) {
    e.preventDefault();
    fetch('https://limitless-ocean-86312.herokuapp.com/api/prodi', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: new Date().getTime(), nama_prodi: prodi.nama_prodi })
    }).then((result) => {
      result.json().then((res) => {
        navigate('/app/prodi');
        console.warn('res', res);
      });
    });
  }

  function handel(e) {
    const newdata = { ...prodi };
    newdata[e.target.name] = e.target.value;
    setProdi(newdata);
    console.log(newdata);
  }

  return (
    <form autoComplete="off" noValidate {...props} onSubmit={(e) => submit(e)}>
      <Card>
        <CardHeader subheader="Lengkapi Data Berikut" title="Tambah Ruangan" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={12} xs={12}>
              <TextField
                fullWidth
                helperText="Masukan Prodi"
                label="Prodi"
                name="nama_prodi"
                onChange={(e) => handel(e)}
                required
                value={prodi.nama_prodi}
                variant="outlined"
              />
            </Grid>
          </Grid>
        </CardContent>

        <Divider />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            p: 2
          }}
        >
          <Button color="primary" variant="contained" type="submit">
            Save details
          </Button>
        </Box>
      </Card>
    </form>
  );
};

export default AccountProfileDetails;
