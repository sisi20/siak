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
  const [content, setContent] = useState({
    nama_prodi: '',
  });
  const history = useNavigate();
  const { id } = useParams();

  const getPostById = async () => {
    const response = await fetch(
      `https://limitless-ocean-86312.herokuapp.com/api/prodi/${id}`
    );
    const prodi = await response.json();
    setContent(prodi);
  };

  useEffect(() => {
    getPostById();
  }, []);

  function submit(e) {
    e.preventDefault();
    fetch(`https://limitless-ocean-86312.herokuapp.com/api/prodi/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, nama_prodi: content.nama_prodi })
    }).then((result) => {
      result.json().then((res) => {
        history('/app/prodi');
        console.warn('res', res);
      });
    });
  }

  function handel(e) {
    const newdata = { ...content };
    newdata[e.target.name] = e.target.value;
    setContent(newdata);
    console.log(newdata);
  }

  function batal() {
    history('/app/prodi');
  }
  /* eslint no-underscore-dangle: 0 */
  return (
    <form autoComplete="off" {...props} onSubmit={(e) => submit(e)}>
      <Card>
        <CardHeader subheader="Lengkapi Data Berikut" title="Edit Prodi" />
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
                value={content.nama_prodi}
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
