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
  Typography
} from '@material-ui/core';
import { useParams } from 'react-router-dom';

const AccountProfileDetails = () => {
  const [dataMahasiswa, setMahasiswa] = useState({
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

  return (
    <Card>
      <CardHeader subheader="Biodata Mahasiswa" title="Ditail Mahasiswa" />
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
                    value={dataMahasiswa.nim}
                    required
                    variant="outlined"
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    label="Nama Depan"
                    value={dataMahasiswa.nama_depan}
                    required
                    variant="outlined"
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    label="Nama Belakang"
                    value={dataMahasiswa.nama_belakang}
                    required
                    variant="outlined"
                  />
                </Grid>
                <Grid item md={12} xs={12}>
                  <TextField
                    fullWidth
                    label="Program Studi"
                    value={dataMahasiswa.id_prodi}
                    required
                    variant="outlined"
                  />
                </Grid>
                <Grid item md={12} xs={12}>
                  <TextField
                    fullWidth
                    label="E-MAIL"
                    value={dataMahasiswa.email}
                    variant="outlined"
                  />
                </Grid>
                <Grid item md={12} xs={12}>
                  <Typography sx={{ py: 1.25 }}>Alamat Anda</Typography>
                </Grid>
                <Grid item md={4} xs={12}>
                  <TextField
                    fullWidth
                    label="Provinsi"
                    value={dataMahasiswa.provinsimu}
                    required
                    variant="outlined"
                  />
                </Grid>
                <Grid item md={4} xs={12}>
                  <TextField
                    fullWidth
                    label="Kota"
                    value={dataMahasiswa.kotamu}
                    required
                    variant="outlined"
                  />
                </Grid>
                <Grid item md={4} xs={12}>
                  <TextField
                    fullWidth
                    label="Kecamatan"
                    value={dataMahasiswa.kecamatanmu}
                    required
                    variant="outlined"
                  />
                </Grid>
                <Grid item md={12} xs={12}>
                  <TextField
                    fullWidth
                    label="Kode Pos"
                    value={dataMahasiswa.kodepos}
                    required
                    variant="outlined"
                  />
                </Grid>
                <Grid item md={12} xs={12}>
                  <TextField
                    fullWidth
                    label="Alamat"
                    value={dataMahasiswa.alamatmu}
                    required
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
                    value={dataMahasiswa.noTelp}
                    required
                    variant="outlined"
                  />
                </Grid>
                <Grid item md={12} xs={12}>
                  <Typography sx={{ py: 1.25 }}>Alamat Orang Tua</Typography>
                </Grid>
                <Grid item md={4} xs={12}>
                  <TextField
                    fullWidth
                    label="Provinsi"
                    value={dataMahasiswa.provinsi}
                    required
                    variant="outlined"
                  />
                </Grid>
                <Grid item md={4} xs={12}>
                  <TextField
                    fullWidth
                    label="Kota"
                    value={dataMahasiswa.kota}
                    required
                    variant="outlined"
                  />
                </Grid>
                <Grid item md={4} xs={12}>
                  <TextField
                    fullWidth
                    label="Kecamatan"
                    value={dataMahasiswa.kecamatan}
                    required
                    variant="outlined"
                  />
                </Grid>
                <Grid item md={12} xs={12}>
                  <TextField
                    fullWidth
                    label="Kode Pos"
                    value={dataMahasiswa.kodeposs}
                    required
                    variant="outlined"
                  />
                </Grid>
                <Grid item md={12} xs={12}>
                  <TextField
                    fullWidth
                    label="Alamat"
                    value={dataMahasiswa.alamatOrtu}
                    required
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
                  <img
                    alt="Remy Sharp"
                    width="150"
                    height="150"
                    src={`https://limitless-ocean-86312.herokuapp.com/gambar/${dataMahasiswa.foto}`}
                  />
                </Grid>
                <Grid item md={12} xs={12}>
                  <TextField
                    fullWidth
                    label="Nik"
                    value={dataMahasiswa.nik}
                    required
                    variant="outlined"
                  />
                </Grid>
                <Grid item md={12} xs={12}>
                  <FormControl component="fieldset">
                    <FormLabel component="legend">Gender</FormLabel>
                    <RadioGroup
                      aria-label="gender"
                      value={dataMahasiswa.jenis_kelamin}
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
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    label="Kelas"
                    value={dataMahasiswa.id_kelas}
                    required
                    variant="outlined"
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Grid>
        </Grid>
      </Container>
      <Divider />
    </Card>
  );
};

export default AccountProfileDetails;
