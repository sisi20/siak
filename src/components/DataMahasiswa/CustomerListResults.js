/* eslint-disable object-curly-spacing */
/* eslint-disable object-curly-newline */
/* eslint-disable no-undef */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable operator-linebreak */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react/jsx-indent */
import { useState, useEffect } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Button,
  Stack,
  Modal,
  Typography,
  Avatar,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  AlertTitle,
  Alert
} from '@material-ui/core';
import { Link, useNavigate } from 'react-router-dom';
import {UserPlus, Trash2, Edit, Search } from 'react-feather';

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

function CustomerListResults() {
  const [dataMahasiswa, setMahasiswa] = useState([]);
  const [open, setOpen] = useState(false);
  const [itemID, setID] = useState('');
  const handleOpen = (id) => {
    setOpen(true);
    setID(id);
  };
  const handleClose = () => setOpen(false);
  const [search, setSearch] = useState('');

  const getMatkul = async () => {
    const response = await fetch(
      'https://limitless-ocean-86312.herokuapp.com/api/datamhs'
    );
    const mahasiswa = await response.json();
    setMahasiswa(mahasiswa);
  };

  function deleteData(id) {
    fetch(`https://limitless-ocean-86312.herokuapp.com/api/datamhs/${id}`, {
      method: 'DELETE'
    }).then((result) => {
      result.json().then((res) => {
        console.warn(res);
        handleClose();
        getMatkul();
      });
    });
  }

  useEffect(() => {
    getMatkul();
  }, []);

  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const history = useNavigate();
  function editForm(id) {
    history(`/app/editMhs/${id}`);
  }
  function ditailMhs(id) {
    history(`/app/ditailMhs/${id}`);
  }
  /* eslint no-underscore-dangle: 0 */
  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end'
        }}
      >
        <Link to="/app/tambahMahasiswa">
          <Button color="primary" variant="contained">
            <SvgIcon fontSize="small" color="action">
              <UserPlus color="white" />
            </SvgIcon>
            &nbsp; Add Mahasiswa
          </Button>
        </Link>
      </Box>
      <Box sx={{ mt: 3 }}>
        <Card>
          <CardContent>
            <Box sx={{ maxWidth: 500 }}>
              <TextField
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SvgIcon fontSize="small" color="action">
                        <Search />
                      </SvgIcon>
                    </InputAdornment>
                  )
                }}
                placeholder="Search Kelas"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                variant="outlined"
              />
            </Box>
          </CardContent>
        </Card>
      </Box>
      {dataMahasiswa.length === 0 ? (
        <>
          <Box sx={{ mt: 3 }}>
            <Card>
              <Stack sx={{ width: '100%' }} spacing={2}>
                <Alert severity="info">
                  <AlertTitle>Info</AlertTitle>
                  Tabel Mahasiswa — <strong> KOSONG</strong>
                </Alert>
              </Stack>
            </Card>
          </Box>
          <Box sx={{ mt: 3 }}>
            <Card>
              <PerfectScrollbar>
                <Box sx={{ minWidth: 1050 }}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>No.</TableCell>
                        <TableCell>Ruangan</TableCell>

                        <TableCell>Aksi</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody></TableBody>
                  </Table>
                </Box>
              </PerfectScrollbar>
              <TablePagination
                component="div"
                count={dataMahasiswa.length}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleLimitChange}
                page={page}
                rowsPerPage={limit}
                rowsPerPageOptions={[5, 10, 25]}
              />
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <Typography
                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                  >
                    Apakah yakin akan menghapus ?
                  </Typography>
                  <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                    <Button
                      variant="outlined"
                      onClick={() => deleteData(itemID)}
                    >
                      ya
                    </Button>
                    <Button variant="outlined" onClick={handleClose}>
                      Tidak
                    </Button>
                  </Stack>
                </Box>
              </Modal>
            </Card>
          </Box>
        </>
      ) : (
        <Box sx={{ pt: 3 }}>
          <Card>
            <PerfectScrollbar>
              <Box sx={{ minWidth: 1050 }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>No</TableCell>
                      <TableCell>Nim</TableCell>
                      <TableCell>Nama</TableCell>
                      <TableCell>Prodi</TableCell>
                      <TableCell>Kelas</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell>Aksi</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {dataMahasiswa
                      .filter(
                        (data) =>
                          data.nama_depan.toLowerCase().includes(search) ||
                          data.nama_belakang.toLowerCase().includes(search)
                      )
                      .slice(page * limit, limit * page + limit)
                      .map((customer, i) => (
                        <TableRow hover key={customer.id}>
                          <TableCell>
                            <Box
                              sx={{
                                alignItems: 'center',
                                display: 'flex'
                              }}
                            >
                              <Typography
                                color="textPrimary"
                                variant="body1"
                                sx={{ mr: 2 }}
                              >
                                {i + 1}
                              </Typography>
                              <Avatar
                                src={`https://limitless-ocean-86312.herokuapp.com/gambar/${customer.foto}`}
                              />
                            </Box>
                          </TableCell>

                          <TableCell>{customer.nim}</TableCell>
                          <TableCell>
                            {`${customer.nama_depan} ${customer.nama_belakang}`}
                          </TableCell>
                          <TableCell>{customer.id_prodi.nama_prodi}</TableCell>
                          <TableCell>{customer.id_kelas.kelas}</TableCell>
                          <TableCell>{customer.email}</TableCell>
                          <TableCell>
                            <Stack direction="row" spacing={2}>
                              <Button
                                variant="outlined"
                                startIcon={<Trash2 />}
                                onClick={() => handleOpen(customer._id)}
                              >
                                Delete
                              </Button>
                              <Button
                                variant="contained"
                                endIcon={<Edit />}
                                onClick={() => editForm(customer._id)}
                              >
                                Edit
                              </Button>
                              <Button
                                variant="outlined"
                                endIcon={<Search />}
                                onClick={() => ditailMhs(customer._id)}
                              >
                                Detail
                              </Button>
                            </Stack>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </Box>
            </PerfectScrollbar>
            <TablePagination
              component="div"
              count={dataMahasiswa.length}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleLimitChange}
              page={page}
              rowsPerPage={limit}
              rowsPerPageOptions={[5, 10, 25]}
            />
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Apakah yakin akan menghapus ?
                </Typography>
                <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                  <Button variant="outlined" onClick={() => deleteData(itemID)}>
                    ya
                  </Button>
                  <Button variant="outlined" onClick={handleClose}>
                    Tidak
                  </Button>
                </Stack>
              </Box>
            </Modal>
          </Card>
        </Box>
      )}
    </Box>
  );
}
export default CustomerListResults;
