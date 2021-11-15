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
  Autocomplete
} from '@material-ui/core';
import { useNavigate, useParams } from 'react-router-dom';

const AccountProfileDetails = (props) => {
  const [content, setContent] = useState({
    kelas: ''
  });
  const [kodeMatkul, setMatkul] = useState([]);
  const history = useNavigate();
  const { id } = useParams();

  const getPostById = async () => {
    const response = await fetch(
      `https://limitless-ocean-86312.herokuapp.com/api/kelas/${id}`
    );
    const kelas = await response.json();
    setContent(kelas);
  };

  useEffect(() => {
    getPostById();
  }, []);

  function submit(e) {
    e.preventDefault();
    fetch(`https://limitless-ocean-86312.herokuapp.com/api/kelas/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ kelas: content.kelas, id_matakuliah: kodeMatkul })
    }).then((result) => {
      result.json().then((res) => {
        history('/app/kelas');
        console.warn('res', res);
      });
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

  function handel(e) {
    const newdata = { ...content };
    newdata[e.target.name] = e.target.value;
    setContent(newdata);
    console.log(newdata);
  }
  /* eslint no-underscore-dangle: 0 */
  return (
    <form autoComplete="off" noValidate {...props} onSubmit={(e) => submit(e)}>
      <Card>
        <CardHeader subheader="Lengkapi Data Berikut" title="Edit Kelas" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={12} xs={12}>
              <TextField
                fullWidth
                helperText="Masukan Kelas"
                label="Kelas"
                name="kelas"
                onChange={(e) => handel(e)}
                required
                value={content.kelas}
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
                    placeholder="Favorites"
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
    </form>
  );
};

export default AccountProfileDetails;
