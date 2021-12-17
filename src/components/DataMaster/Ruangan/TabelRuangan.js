/* eslint-disable react/jsx-indent */
/* eslint-disable react/jsx-indent-props */
/* eslint-disable object-curly-spacing */
/* eslint-disable object-curly-newline */
/* eslint-disable react/self-closing-comp */
/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable react/jsx-one-expression-per-line */
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
  Typography,
  Modal,
  SvgIcon,
  CardContent,
  TextField,
  InputAdornment,
  AlertTitle,
  Alert
} from '@material-ui/core';
import { Edit, Trash2, Search, UserPlus } from 'react-feather';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowBack } from '@material-ui/icons';

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
  const [ruangan, setRuangan] = useState([]);
  const [open, setOpen] = useState(false);
  const [itemID, setID] = useState('');
  const [search, setSearch] = useState('');
  const handleOpen = (id) => {
    setOpen(true);
    setID(id);
  };
  const handleClose = () => setOpen(false);
  const getRuangan = async () => {
    const response = await fetch(
      'https://limitless-ocean-86312.herokuapp.com/api/ruangan'
    );
    const matkuliah = await response.json();
    setRuangan(matkuliah);
  };

  function deleteData(id) {
    fetch(`https://limitless-ocean-86312.herokuapp.com/api/ruangan/${id}`, {
      method: 'DELETE'
    }).then((result) => {
      result.json().then((res) => {
        console.warn(res);
        handleClose();
        getRuangan();
      });
    });
  }

  useEffect(() => {
    getRuangan();
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
    history(`/app/editRuangan/${id}`);
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
        <Stack direction="row" spacing={2}>
          <Link to="/app/master" spacing={2}>
            <Button color="primary" variant="contained">
              <SvgIcon fontSize="small" color="action">
                <ArrowBack color="white" />
              </SvgIcon>
              &nbsp; Kembali
            </Button>
          </Link>
          <Link to="/app/formRuangan">
            <Button color="primary" variant="contained">
              <SvgIcon fontSize="small" color="action">
                <UserPlus />
              </SvgIcon>
              &nbsp; Add Ruangan
            </Button>
          </Link>
        </Stack>
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
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search Kelas"
                variant="outlined"
              />
            </Box>
          </CardContent>
        </Card>
      </Box>
      {ruangan.length === 0 ? (
        <>
          <Box sx={{ mt: 3 }}>
            <Card>
              <Stack sx={{ width: '100%' }} spacing={2}>
                <Alert severity="info">
                  <AlertTitle>Info</AlertTitle>
                  Tabel Ruangan — <strong> KOSONG</strong>
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
                count={ruangan.length}
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
                  <TableBody>
                    {ruangan
                      .filter((data) =>
                        data.ruang.toLowerCase().includes(search)
                      )
                      .slice(page * limit, limit * page + limit)
                      .map((customer, i) => (
                        <TableRow hover key={customer._id}>
                          <TableCell>{i + 1}</TableCell>
                          <TableCell>{customer.ruang}</TableCell>
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
              count={ruangan.length}
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
