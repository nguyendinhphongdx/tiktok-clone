// import { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { privateRoutes, publicRoutes } from '~/routes/routes';
import DefaultLayout, { DefaultLayoutv3, DefaultLayoutDashBoard } from '~/layouts';
import DefaultLayoutv2 from './layouts/DefaultLayoutv2';
import ModalKey from './components/ModalKey';
import { Fragment } from 'react';
import config from './config';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ModalChooseFavorite from './components/ModalChooseFavorite/ModalChooseFavorite';

function App({ children }) {
    const check = localStorage.getItem('isNewUser')

    return (
        <>
            {check === 'true' ? (
                <ModalChooseFavorite/>
            ) : (
                <Router>
                    <div className="App">
                        <ToastContainer />
                        <Routes>
                            {publicRoutes.map((route, index) => {
                                //Muốn dùng biến trong jsx thì phải viết hoa chữ cái đầu

                                let Layout = DefaultLayout;

                                if (route.layout) {
                                    Layout = route.layout;
                                } else if (route.layout === DefaultLayoutv2) {
                                    Layout = DefaultLayoutv2;
                                } else if (route.layout === DefaultLayoutv3) {
                                    Layout = DefaultLayoutv3;
                                } else if (route.layout === null) {
                                    Layout = DefaultLayoutDashBoard;
                                } else if (route.layout === 'div') {
                                    Layout = <Fragment />;
                                }

                                const Page = route.component;
                                if (route.path === config.routes.dashboard) {
                                    return (
                                        <Route
                                            key={index}
                                            path={route.path}
                                            element={
                                                <Layout>
                                                    <Page />
                                                </Layout>
                                            }
                                        >
                                            {privateRoutes.map((item) => {
                                                const ItemPage = item.component;
                                                return <Route key={index} path={item.path} element={<ItemPage />} />;
                                            })}
                                        </Route>
                                    );
                                }
                                return (
                                    <Route
                                        key={index}
                                        path={route.path}
                                        element={
                                            <Layout>
                                                <Page />
                                            </Layout>
                                        }
                                    />
                                );
                            })}
                        </Routes>
                        <ModalKey styles={{ visibility: 'hidden' }} />
                    </div>
                </Router>
            )}
        </>
    );
}

export default App;
