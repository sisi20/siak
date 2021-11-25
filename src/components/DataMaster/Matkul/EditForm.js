import { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  Stack
} from '@material-ui/core';
import { useNavigate, useParams } from 'react-router-dom';

const AccountProfileDetails = (props) => {
  const [matkul, setMatkul] = useState({
    kode: '',
    matakuliah: ''
  });

  const navigate = useNavigate();

  const { id } = useParams();

  const getPostById = async () => {
    const response = await fetch(
      `https://limitless-ocean-86312.herokuapp.com/api/matkul/${id}`
    );
    const ruangan = await response.json();
    setMatkul(ruangan);
  };

  useEffect(() => {
    getPostById();
  }, []);

  function submit(e) {
    e.preventDefault();
    fetch(`https://limitless-ocean-86312.herokuapp.com/api/matkul/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id,
        kode: matkul.kode,
        matakuliah: matkul.matakuliah
      })
    }).then((result) => {
      result.json().then((res) => {
        navigate('/app/matkul');
        console.warn('res', res);
      });
    });
  }

  function handel(e) {
    const newdata = { ...matkul };
    newdata[e.target.name] = e.target.value;
    setMatkul(newdata);
    console.log(newdata);
  }

  function batal() {
    navigate('/app/matkul');
  }
  return (
    <form autoComplete="off" {...props} onSubmit={(e) => submit(e)}>
      <Card>
        <CardHeader subheader="Lengkapi Data Berikut" title="Edit Ruangan" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={12} xs={12}>
              <TextField
                fullWidth
                helperText="Masukan Kode Sesuai Spesifikasi"
                label="Kode Matakuliah"
                name="kode"
                onChange={(e) => handel(e)}
                required
                value={matkul.kode}
                variant="outlined"
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <TextField
                fullWidth
                label="Matakuliah"
                name="matakuliah"
                onChange={(e) => handel(e)}
                required
                value={matkul.matakuliah}
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
          <Stack direction="row" spacing={2}>
            <Button color="primary" variant="contained" onClick={() => batal()}>
              Batal
            </Button>
            <Button color="primary" variant="contained" type="submit">
              Save details
            </Button>
          </Stack>
        </Box>
      </Card>
    </form>
  );
};

export default AccountProfileDetails;
