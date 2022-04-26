import React, { useMemo } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useSession } from '../components/Session/Provider';
import routeConfig from '../routes/routeConfig';
import NotFound from './NotFound';

const PageContainer = () => {
  const { session, verifySession } = useSession();

  const routes = useMemo(() => {
    if (verifySession()) {
      let { user } = JSON.parse(localStorage.getItem('__session__'));
      return user.role === 'admin'
        ? routeConfig.filter((i) => i.roles.some((it) => it === user?.role))
        : routeConfig.filter((i) => i.roles.length === 0);
    }

    return routeConfig.filter((i) => i.roles.length === 0);
  }, [session, verifySession]);
  return (
    <section className="grow">
      <Routes>
        {routes.map((i) => {
          const Page = i.component;
          return (
            <Route
              path={i.path}
              element={<Page />}
              key={`app-route-${i.path}`}
            />
          );
        })}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </section>
  );
};

export default PageContainer;
