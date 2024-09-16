import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Tables from './pages/Tables';
import OrganizationAuditTable from './components/Tables/OrganizationAuditTable';
import DefaultLayout from './layout/DefaultLayout';
import AuditDashBoard from './pages/Dashboard/AuditDahsBoard';
import AuditDetails from './pages/audit-details';
function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <DefaultLayout>
      <Routes>
          <Route
            path="/"
            element={
              <>
                <PageTitle title="Audit Dashboard | INSA" />
                <AuditDashBoard />
              </>
            }
          />
        <Route
          path="/Dashboard"
          element={
            <>
              <PageTitle title="Audit Dashboard | INSA" />
              <AuditDashBoard />
            </>
          }
        />
        <Route path="/" element={<OrganizationAuditTable />} />
        <Route path="/audit-details/:id" element={<AuditDetails />} />
        <Route
          path="/profile"
          element={
            <>
              <PageTitle title="Profile | Audit Dashboard | INSA" />
              <Profile user={undefined} projects={undefined}/>
            </>
          }
        />
        <Route
          path="/tables"
          element={
            <>
              <PageTitle title="Tables | Audit Dashboard | INSA" />
              <Tables />
            </>
          }
        />
        <Route
          path="/settings"
          element={
            <>
              <PageTitle title="Settings | Audit Dashboard | INSA" />
              <Settings />
            </>
          }
        />
        <Route
          path="/auth/signin"
          element={
            <>
              <PageTitle title="Signin | Audit Dashboard | INSA" />
              <SignIn />
            </>
          }
        />
        <Route
          path="/auth/signup"
          element={
            <>
              <PageTitle title="Signup | Audit Dashboard | INSA" />
              <SignUp />
            </>
          }
        />
      </Routes>
    </DefaultLayout>
  );
}

export default App;
