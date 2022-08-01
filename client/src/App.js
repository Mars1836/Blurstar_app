import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { publicRoute, privateRoute } from "./routes";
import DefaultLayout from "./layouts/DefaultLayout";
import RequireAuth from "./services/RequireAuth";
import RequireNotAuth from "./services/RequireNotAuth";
import { AuthPrivide } from "./services/auth";

function App() {
  return (
    <AuthPrivide>
      <BrowserRouter>
        <div className="App"></div>
        <Routes>
          {publicRoute.map((page, index) => {
            let Layout = DefaultLayout;
            let Content = page.component;
            if (page.layout === null) {
              Layout = "div";
            }
            return (
              <Route
                key={index}
                path={page.path}
                element={
                  <RequireNotAuth>
                    <Layout>
                      <Content></Content>
                    </Layout>
                  </RequireNotAuth>
                }
              ></Route>
            );
          })}
          {privateRoute.map((page, index) => {
            let Layout = DefaultLayout;
            let Content = page.component;
            if (page.layout === null) {
              Layout = "div";
            }
            return (
              <Route
                key={index}
                path={page.path}
                element={
                  <RequireAuth>
                    <Layout>
                      <Content></Content>
                    </Layout>
                  </RequireAuth>
                }
              ></Route>
            );
          })}
        </Routes>
      </BrowserRouter>
    </AuthPrivide>
  );
}

export default App;
