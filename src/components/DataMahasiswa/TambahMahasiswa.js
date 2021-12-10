/* eslint-disable no-underscore-dangle */
import { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  CardHeader,
  Divider,
  Grid,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  Autocomplete,
  Typography,
  Stack,
  Modal
} from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

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
  const [Mahasiswa, setMahasiswa] = useState({
    nim: '',
    nik: '',
    nama_depan: '',
    nama_belakang: '',
    jenis_kelamin: '',
    email: '',
    alamat: '',
    noTelp: '',
    alamatOrtu: '',
    alamatmu: '',
    kodepos: '',
    kodeposs: '',
    kotamu: '',
    kecamatanmu: '',
    kota: '',
    kecamatan: '',
    id_kelas: '',
    id_prodi: '',
    provinsi: '',
    provinsimu: '',
    foto: null,
    image: null
  });
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);
  const [Kls, setKls] = useState('');
  const [Kcmtn, setKcmtn] = useState('');
  const [Kcmtnmu, setKcmtnmu] = useState('');
  const [Prvnmu, setPrvnmu] = useState('');
  const [Prvn, setPrvn] = useState('');
  const [Kt, setKt] = useState('');
  const [Ktmu, setKtmu] = useState('');
  const [Prd, setPrd] = useState('');
  const navigate = useNavigate();

  function submit(e) {
    e.preventDefault();
    const form = new FormData(e.target);
    form.append('foto', Mahasiswa.foto.trim());
    form.append('kecamatanmu', Kcmtnmu.nama.trim());
    form.append('kecamatan', Kcmtn.nama.trim());
    form.append('kotamu', Ktmu.nama.trim());
    form.append('kota', Kt.nama.trim());
    form.append('provinsimu', Prvnmu.nama.trim());
    form.append('provinsi', Prvn.nama.trim());
    form.append('id_kelas', Kls._id.trim());
    form.append('id_prodi', Prd._id.trim());

    axios
      .post('https://limitless-ocean-86312.herokuapp.com/api/datamhs', form, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      .then(() => {
        navigate('/app/dataMahasiswa');
      })
      .catch((err) => {
        if (err.response.status === 412) {
          handleOpen();
        }
        console.log('res', err);
      });
  }

  const handleSelectFile = (event) => {
    console.log(event.target.files[0]);
    setMahasiswa((v) => ({
      ...v,
      foto: event.target.files[0],
      image: URL.createObjectURL(event.target.files[0])
    }));
  };

  const [Prodi, setProdi] = useState([]);
  const getProdi = async () => {
    const response = await fetch(
      'https://limitless-ocean-86312.herokuapp.com/api/prodi'
    );
    const prodi = await response.json();
    setProdi(prodi);
  };

  useEffect(() => {
    getProdi();
  }, []);

  const [Kelas, setKelas] = useState([]);
  const getKelas = async () => {
    const response = await fetch(
      'https://limitless-ocean-86312.herokuapp.com/api/kelas'
    );
    const kelas = await response.json();
    setKelas(kelas);
  };

  useEffect(() => {
    getKelas();
  }, []);

  const [Kota, setKota] = useState([]);
  const getKota = async (id) => {
    const response = await fetch(
      `https://dev.farizdotid.com/api/daerahindonesia/kota?id_provinsi=${id}`
    );
    const kota = await response.json();
    setKota(kota.kota_kabupaten);
  };

  useEffect(() => {
    getKota();
  }, []);

  const [Kecamatan, setKecamatan] = useState([]);
  const getKecamatan = async (id) => {
    const response = await fetch(
      `https://dev.farizdotid.com/api/daerahindonesia/kecamatan?id_kota=${id}`
    );
    const kecamatan = await response.json();
    setKecamatan(kecamatan.kecamatan);
  };

  useEffect(() => {
    getKecamatan();
  }, []);

  const [Provinsi, setProvinsi] = useState([]);
  const getProvinsi = async () => {
    const response = await fetch(
      'https://dev.farizdotid.com/api/daerahindonesia/provinsi'
    );
    const provinsi = await response.json();
    console.log('provinsi', provinsi.provinsi);
    setProvinsi(provinsi.provinsi);
  };

  useEffect(() => {
    getProvinsi();
  }, []);

  function handel(e) {
    const newdata = { ...Mahasiswa };
    newdata[e.target.name] = e.target.value;
    setMahasiswa(newdata);
    console.log(newdata);
  }

  return (
    <form autoComplete="off" {...props} onSubmit={(e) => submit(e)}>
      <Card>
        <CardHeader
          subheader="Lengkapi Data Berikut"
          title="Tambah Mahasiswa"
        />
        <Divider />

        <Container maxWidth="lg">
          <Grid container spacing={3}>
            <Grid item lg={8} md={9} xs={12}>
              <CardContent>
                <Grid container spacing={3}>
                  <Grid item md={12} xs={12}>
                    <TextField
                      fullWidth
                      helperText="Masukan Nim Anda"
                      label="Nim"
                      name="nim"
                      type="number"
                      onChange={(e) => handel(e)}
                      required
                      value={Mahasiswa.nim}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      fullWidth
                      label="Nama Depan"
                      name="nama_depan"
                      onChange={(e) => handel(e)}
                      required
                      value={Mahasiswa.nama_depan}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      fullWidth
                      label="Nama Belakang"
                      name="nama_belakang"
                      onChange={(e) => handel(e)}
                      required
                      value={Mahasiswa.nama_belakang}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item md={12} xs={12}>
                    <Autocomplete
                      id="tags-outlined"
                      options={Prodi}
                      getOptionLabel={(option) => option.nama_prodi || ''}
                      filterSelectedOptions
                      onChange={(e, value) => setPrd(value)}
                      value={Prd}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Program Studi"
                          placeholder="Pilih Prodi"
                        />
                      )}
                    />
                  </Grid>
                  <Grid item md={12} xs={12}>
                    <TextField
                      fullWidth
                      label="E-MAIL"
                      name="email"
                      onChange={(e) => handel(e)}
                      type="email"
                      value={Mahasiswa.email}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item md={12} xs={12}>
                    <Typography sx={{ py: 1.25 }}>Alamat Anda</Typography>
                  </Grid>
                  <Grid item md={4} xs={12}>
                    <Autocomplete
                      disableCloseOnSelect
                      id="tags-outlined"
                      options={Provinsi}
                      getOptionLabel={(option) => option.nama || ''}
                      filterSelectedOptions
                      onChange={(e, value) => {
                        if (value) {
                          setPrvnmu(value);
                          getKota(value.id);
                        } else {
                          setPrvnmu({});
                          setKtmu({});
                          setKcmtnmu({});
                        }
                      }}
                      value={Prvnmu}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Provinsi"
                          placeholder="Pilih Provinsi"
                        />
                      )}
                    />
                  </Grid>
                  <Grid item md={4} xs={12}>
                    <Autocomplete
                      id="tags-outlined"
                      options={Kota}
                      getOptionLabel={(option) => option.nama || ''}
                      filterSelectedOptions
                      onChange={(e, value) => {
                        if (value) {
                          setKtmu(value);
                          getKecamatan(value.id);
                        } else {
                          setKtmu({});
                          setKcmtnmu({});
                        }
                      }}
                      value={Ktmu}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Kota"
                          placeholder="Pilih Kota"
                        />
                      )}
                    />
                  </Grid>
                  <Grid item md={4} xs={12}>
                    <Autocomplete
                      id="tags-outlined"
                      options={Kecamatan}
                      getOptionLabel={(option) => option.nama || ''}
                      filterSelectedOptions
                      onChange={(e, value) => {
                        if (value) {
                          setKcmtnmu(value);
                        } else {
                          setKcmtnmu({});
                        }
                      }}
                      value={Kcmtnmu}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Kecamatan"
                          placeholder="Pilih Kecamatan"
                        />
                      )}
                    />
                  </Grid>
                  <Grid item md={12} xs={12}>
                    <TextField
                      fullWidth
                      label="Kode Pos"
                      name="kodepos"
                      type="number"
                      onChange={(e) => handel(e)}
                      required
                      value={Mahasiswa.kodepos}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item md={12} xs={12}>
                    <TextField
                      fullWidth
                      label="Alamat"
                      name="alamatmu"
                      onChange={(e) => handel(e)}
                      required
                      value={Mahasiswa.alamatmu}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item md={12} xs={12}>
                    <Typography sx={{ py: 1.25 }}>No-HP Anda</Typography>
                  </Grid>
                  <Grid item md={12} xs={12}>
                    <TextField
                      fullWidth
                      label="NO-HP"
                      name="noTelp"
                      type="number"
                      onChange={(e) => handel(e)}
                      required
                      value={Mahasiswa.noTelp}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item md={12} xs={12}>
                    <Typography sx={{ py: 1.25 }}>Alamat Orang Tua</Typography>
                  </Grid>
                  <Grid item md={4} xs={12}>
                    <Autocomplete
                      id="tags-outlined"
                      options={Provinsi}
                      getOptionLabel={(option) => option.nama || ''}
                      filterSelectedOptions
                      onChange={(e, value) => {
                        if (value) {
                          setPrvn(value);
                          getKota(value.id);
                        } else {
                          setPrvn({});
                          setKt({});
                          setKcmtn({});
                        }
                      }}
                      value={Prvn}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Provinsi"
                          placeholder="Pilih Provinsi"
                        />
                      )}
                    />
                  </Grid>
                  <Grid item md={4} xs={12}>
                    <Autocomplete
                      id="tags-outlined"
                      options={Kota}
                      getOptionLabel={(option) => option.nama || ''}
                      filterSelectedOptions
                      onChange={(e, value) => {
                        if (value) {
                          setKt(value);
                          getKecamatan(value.id);
                        } else {
                          setKt({});
                          setKcmtn({});
                        }
                      }}
                      value={Kt}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Kota"
                          placeholder="Pilih Kota"
                        />
                      )}
                    />
                  </Grid>
                  <Grid item md={4} xs={12}>
                    <Autocomplete
                      id="tags-outlined"
                      options={Kecamatan}
                      getOptionLabel={(option) => option.nama || ''}
                      filterSelectedOptions
                      onChange={(e, value) => {
                        if (value) {
                          setKcmtn(value);
                        } else {
                          setKcmtn({});
                        }
                      }}
                      value={Kcmtn}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Kecamatan"
                          placeholder="Pilih Kecamatan"
                        />
                      )}
                    />
                  </Grid>
                  <Grid item md={12} xs={12}>
                    <TextField
                      fullWidth
                      label="Kode Pos"
                      name="kodeposs"
                      type="number"
                      onChange={(e) => handel(e)}
                      required
                      value={Mahasiswa.kodeposs}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item md={12} xs={12}>
                    <TextField
                      fullWidth
                      label="Alamat"
                      name="alamatOrtu"
                      onChange={(e) => handel(e)}
                      required
                      value={Mahasiswa.alamatOrtu}
                      variant="outlined"
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Grid>
            <Grid item lg={4} md={6} xs={12}>
              <CardContent>
                <Grid container spacing={3}>
                  <Grid item md={12} xs={12}>
                    <Typography sx={{ py: 1.25 }}>Foto Profil</Typography>
                    <input
                      onChange={(e) => handleSelectFile(e)}
                      accept="image/*"
                      id="contained-button-foto"
                      multiple
                      type="file"
                    />
                    {Mahasiswa.image ? (
                      <img
                        alt="Foto profil"
                        src={Mahasiswa.image}
                        width="200"
                        height="200"
                        style={{ display: 'block', paddingTop: 12 }}
                      />
                    ) : null}
                  </Grid>
                  <Grid item md={12} xs={12}>
                    <TextField
                      fullWidth
                      helperText="Masukan Nik Anda"
                      label="Nik"
                      name="nik"
                      onChange={(e) => handel(e)}
                      required
                      value={Mahasiswa.nik}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item md={12} xs={12}>
                    <FormControl component="fieldset">
                      <FormLabel component="legend">Gender</FormLabel>
                      <RadioGroup
                        aria-label="gender"
                        defaultValue="Laki - laki"
                        name="jenis_kelamin"
                        onChange={(e) => handel(e)}
                        value={Mahasiswa.jenis_kelamin}
                      >
                        <FormControlLabel
                          value="Laki - laki"
                          control={<Radio />}
                          label="Laki - laki"
                        />
                        <FormControlLabel
                          value="Perempuan"
                          control={<Radio />}
                          label="Perempuan"
                        />
                      </RadioGroup>
                    </FormControl>
                  </Grid>
                  <Grid item md={12} xs={12}>
                    <Autocomplete
                      id="tags-outlined"
                      options={Kelas}
                      getOptionLabel={(option) => option.kelas || ''}
                      filterSelectedOptions
                      onChange={(e, value) => setKls(value)}
                      value={Kls}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Kelas"
                          placeholder="Pilih Kelas"
                        />
                      )}
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Grid>
          </Grid>
        </Container>

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
