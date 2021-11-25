import { Helmet } from 'react-helmet-async';
import { Box, Container } from '@material-ui/core';
import TabelKelas from '../components/DataMaster/Kelas/TabelKelas';
import customers from '../__mocks__/customers';

const DataMahasiswa = () => (
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
          <TabelKelas customers={customers} />
        </Box>
      </Container>
    </Box>
  </>
);

export default DataMahasiswa;
