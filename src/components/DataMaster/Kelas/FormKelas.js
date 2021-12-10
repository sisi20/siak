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
  Autocomplete,
  Stack,
  Typography,
  Modal
} from '@material-ui/core';

import { useNavigate } from 'react-router-dom';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4
};

const AccountProfileDetails = (props) => {
  const [kelas, setKelas] = useState('');
  const [kodeMatkul, setMatkul] = useState([]);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);

  function submit(e) {
    e.preventDefault();
    fetch('https://limitless-ocean-86312.herokuapp.com/api/kelas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: new Date().getTime(),
        kelas: kelas.trim(),
        id_matakuliah: kodeMatkul.trim()
      })
    }).then((result) => {
      if (result.status === 412) {
        handleOpen();
      } else {
        result.json().then((res) => {
          navigate('/app/kelas');
          console.warn('res', res);
        });
      }
    });
  }

  const [matkul, ssetMatkul] = useState([]);

  const getMatkul = async () => {
    const response = await fetch(
      'https://limitless-ocean-86312.herokuapp.com/api/matkul'
    );
    const matakuliah = await response.json();
    ssetMatkul(matakuliah);
  };

  useEffect(() => {
    getMatkul();
  }, []);

  return (
    <form autoComplete="off" {...props} onSubmit={(e) => submit(e)}>
      <Card>
        <CardHeader subheader="Lengkapi Data Berikut" title="Tambah Kelas" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={12} xs={12}>
              <TextField
                fullWidth
                helperText="Masukan Kelas yang Sesuai"
                label="Kelas"
                onChange={(e) => {
                  setKelas(e.target.value);
                  console.log(kelas);
                }}
                value={kelas}
                required
                variant="outlined"
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <Autocomplete
                multiple
                id="tags-outlined"
                options={matkul}
                getOptionLabel={(option) => option.matakuliah || ''}
                filterSelectedOptions
                onChange={(e, value) => setMatkul(value)}
                value={kodeMatkul}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Matakuliah"
                    placeholder="Pilih Matakuliah"
                  />
                )}
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
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Data yang anda masukkan sudah ada
          </Typography>
          <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
            <Button variant="outlined" onClick={handleClose}>
              Keluar
            </Button>
          </Stack>
        </Box>
      </Modal>
    </form>
  );
};

export default AccountProfileDetails;
