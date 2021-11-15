import { useState, useEffect } from 'react';
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
import { useNavigate, useParams } from 'react-router-dom';

const AccountProfileDetails = (props) => {
  const [content, setContent] = useState({
    ruang: '',
  });
  const history = useNavigate();
  const { id } = useParams();

  const getPostById = async () => {
    const response = await fetch(
      `https://limitless-ocean-86312.herokuapp.com/api/ruangan/${id}`
    );
    const ruangan = await response.json();
    setContent(ruangan);
  };

  useEffect(() => {
    getPostById();
  }, []);

  function submit(e) {
    e.preventDefault();
    fetch(`https://limitless-ocean-86312.herokuapp.com/api/ruangan/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, ruang: content.ruang })
    }).then((result) => {
      result.json().then((res) => {
        history('/app/ruangan');
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
  /* eslint no-underscore-dangle: 0 */
  return (
    <form autoComplete="off" noValidate {...props} onSubmit={(e) => submit(e)}>
      <Card>
        <CardHeader subheader="Lengkapi Data Berikut" title="Edit Ruangan" />
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
                value={content.ruang}
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
