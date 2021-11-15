import { Helmet } from 'react-helmet-async';
import { Box, Container } from '@material-ui/core';
import DitailMahasiswa from '../components/DataMahasiswa/DitailMahasiswa';

const FormMahasiswa = () => (
  <>
    <Helmet>
      <title>Customers | Material Kit</title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3
      }}
    >
      <Container maxWidth={false}>
        <Box sx={{ pt: 3 }}>
          <DitailMahasiswa />
        </Box>
      </Container>
    </Box>
  </>
);

export default FormMahasiswa;
