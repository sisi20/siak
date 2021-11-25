import { Helmet } from 'react-helmet-async';
import { Box, Container } from '@material-ui/core';
import TabelProdi from '../components/DataMaster/Prodi/TabelProdi';
import customers from '../__mocks__/customers';

const DataMahasiswa = () => (
  <>
    <Helmet>
      <title>Program Studi</title>
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
          <TabelProdi customers={customers} />
        </Box>
      </Container>
    </Box>
  </>
);

export default DataMahasiswa;
