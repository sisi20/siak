import { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
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
  const [ruang, setRuang] = useState({
    ruang: '',
    id: ''
  });
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);
  const navigate = useNavigate();

  function submit(e) {
    e.preventDefault();
    fetch('https://limitless-ocean-86312.herokuapp.com/api/ruangan', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: new Date().getTime(), ruang: ruang.ruang.trim() })
    }).then((result) => {
      if (result.status === 412) {
        handleOpen();
      } else {
        result.json().then((res) => {
          navigate('/app/ruangan');
          console.warn('res', res);
        });
      }
    });
  }

  function handel(e) {
    const newdata = { ...ruang };
    newdata[e.target.name] = e.target.value;
    setRuang(newdata);
    console.log(newdata);
  }

  return (
    <form autoComplete="off" {...props} onSubmit={(e) => submit(e)}>
      <Card>
        <CardHeader subheader="Lengkapi Data Berikut" title="Tambah Ruangan" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={12} xs={12}>
              <TextField
                fullWidth
                helperText="Masukan Kode Ruangan"
                label="Ruangan"
                name="ruang"
                onChange={(e) => handel(e)}
                required
                value={ruang.ruang}
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
