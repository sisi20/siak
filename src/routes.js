/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
import { Navigate } from 'react-router-dom';
import DashboardLayout from './components/DashboardLayout';
import MainLayout from './components/MainLayout';
import Master from './pages/Master';
import Absensi from './pages/Absensi';
import DataMahasiswa from './pages/DataMahasiswa';
import DataKehadiran from './pages/DataKehadiran';
import TambahMahasiswa from './pages/TambahMahasiswa';
import TambahKelas from './pages/TambahKelas';
import TambahMatkul from './pages/TambahMatkul';
import TambahProdi from './pages/TambahProdi';
import TambahRuangan from './pages/TambahRuangan';
import EditRuangan from './pages/EditRuangan';
import MasterKelas from './pages/MasterKelas';
import MasterMatkul from './pages/MasterMatkul';
import MasterProdi from './pages/MasterProdi';
import MasterRuangan from './pages/MasterRuangan';
import TambahAbsensi from './pages/TambahAbsensi';
import EditMatkul from './pages/EditMatkul';
import EditKelas from './pages/EditKelas';
import EditProdi from './pages/EditProdi';
import EditMahasiswa from './pages/EditMahasiswa';
import DitailMahasiswa from './pages/DitailMahasiswa';
import Login from './pages/Login';

const routes = [
  {
    path: 'app',
    element: <DashboardLayout />,
    children: [
      { path: 'master', element: <Master /> },
      { path: 'absensi', element: <Absensi /> },
      { path: 'dataMahasiswa', element: <DataMahasiswa /> },
      { path: 'dataKehadiran', element: <DataKehadiran /> },
      { path: 'tambahMahasiswa', element: <TambahMahasiswa /> },
      { path: 'kelas', element: <MasterKelas /> },
      { path: 'ruangan', element: <MasterRuangan /> },
      { path: 'prodi', element: <MasterProdi /> },
      { path: 'matkul', element: <MasterMatkul /> },
      { path: 'formKelas', element: <TambahKelas /> },
      { path: 'formRuangan', element: <TambahRuangan /> },
      { path: 'formProdi', element: <TambahProdi /> },
      { path: 'formMatkul', element: <TambahMatkul /> },
      { path: 'formAbsensi', element: <TambahAbsensi /> },
      { path: 'editRuangan/:id', element: <EditRuangan /> },
      { path: 'editKelas/:id', element: <EditKelas /> },
      { path: 'editMatkul/:id', element: <EditMatkul /> },
      { path: 'editProdi/:id', element: <EditProdi /> },
      { path: 'editMhs/:id', element: <EditMahasiswa /> },
      { path: 'ditailMhs/:id', element: <DitailMahasiswa /> },
      { path: 'login', element: <Login /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: '/', element: <Navigate to="/app/dataMahasiswa" /> },
      { path: 'login', element: <Login /> },
    ]
  }
];

export default routes;
