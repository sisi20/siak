/* eslint-disable no-underscore-dangle */
import { useState, useEffect } from 'react';
import {
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
  Box,
  Button,
  Typography,
  Autocomplete
} from '@material-ui/core';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

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
    kecamatan: '',
    kecamatanmu: '',
    kota: '',
    kotamu: '',
    provinsi: '',
    provinsimu: '',
    id_prodi: '',
    id_kelas: '',
    kodepos: '',
    kodeposs: '',
    foto: null,
    image: null
  });
  const { id } = useParams();

  const getPostById = async () => {
    const response = await fetch(
      `https://limitless-ocean-86312.herokuapp.com/api/datamhs/${id}`
    );
    const mhs = await response.json();
    setMahasiswa(mhs);
  };

  useEffect(() => {
    getPostById();
  }, []);

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
    form.append('foto', Mahasiswa.foto);
    form.append('kecamatanmu', Kcmtnmu.nama);
    form.append('kecamatan', Kcmtn.nama);
    form.append('kotamu', Ktmu.nama);
    form.append('kota', Kt.nama);
    form.append('provinsimu', Prvnmu.nama);
    form.append('provinsi', Prvn.nama);
    form.append('id_kelas', Kls._id);
    form.append('id_prodi', Prd._id);

    axios
      .put(`https://limitless-ocean-86312.herokuapp.com/api/datamhs/${id}`, form, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      .then((result) => {
        navigate('/app/dataMahasiswa');
        console.warn('responMahasiswa', result);
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
  const getKota = async (iid) => {
    const response = await fetch(
      `https://dev.farizdotid.com/api/daerahindonesia/kota?id_provinsi=${iid}`
    );
    const kota = await response.json();
    setKota(kota.kota_kabupaten);
  };

  useEffect(() => {
    getKota();
  }, []);

  const [Kecamatan, setKecamatan] = useState([]);
  const getKecamatan = async (iid) => {
    const response = await fetch(
      `https://dev.farizdotid.com/api/daerahindonesia/kecamatan?id_kota=${iid}`
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
    <form autoComplete="off" noValidate {...props} onSubmit={(e) => submit(e)}>
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
                      id="tags-outlined"
                      options={Provinsi}
                      getOptionLabel={(option) => option.nama || ''}
                      filterSelectedOptions
                      onChange={(e, value) => {
                        setPrvnmu(value);
                        getKota(value.id);
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
                        setKtmu(value);
                        getKecamatan(value.id);
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
                      onChange={(e, value) => setKcmtnmu(value)}
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
                        setPrvn(value);
                        getKota(value.id);
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
                        setKt(value);
                        getKecamatan(value.id);
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
                      onChange={(e, value) => setKcmtn(value)}
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
                        name="jenis_kelamin"
                        value={Mahasiswa.jenis_kelamin}
                        onChange={(e) => handel(e)}
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
    </form>
  );
};

export default AccountProfileDetails;
