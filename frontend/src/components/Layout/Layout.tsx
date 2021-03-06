import React from 'react';
import { useDispatch } from 'react-redux';
import { Switch, Route, useLocation } from 'react-router';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
// @ts-ignore
import Hammer from 'rc-hammerjs';
import Header from '../Header';
import Sidebar from '../Sidebar';
import BreadcrumbHistory from '../BreadcrumbHistory';
import { openSidebar, closeSidebar } from 'store/actions/navigationActions';
import s from './Layout.module.scss';

import UsersFormPage from 'pages/CRUD/Users/form/UsersFormPage';
import UsersTablePage from 'pages/CRUD/Users/table/UsersTablePage';
import UsersViewPage from 'pages/CRUD/Users/page/UsersViewPage';

import ProductsFormPage from 'pages/CRUD/Products/form/ProductsFormPage';
import ProductsTablePage from 'pages/CRUD/Products/table/ProductsTablePage';
import ProductsViewPage from 'pages/CRUD/Products/page/ProductsViewPage';

import CategoriesFormPage from 'pages/CRUD/Categories/form/CategoriesFormPage';
import CategoriesTablePage from 'pages/CRUD/Categories/table/CategoriesTablePage';
import CategoriesViewPage from 'pages/CRUD/Categories/page/CategoriesViewPage';

import OrdersFormPage from 'pages/CRUD/Orders/form/OrdersFormPage';
import OrdersTablePage from 'pages/CRUD/Orders/table/OrdersTablePage';
import OrdersViewPage from 'pages/CRUD/Orders/page/OrdersViewPage';

import ReviewsFormPage from 'pages/CRUD/Reviews/form/ReviewsFormPage';
import ReviewsTablePage from 'pages/CRUD/Reviews/table/ReviewsTablePage';
import ReviewsViewPage from 'pages/CRUD/Reviews/page/ReviewsViewPage';

import PromocodesFormPage from 'pages/CRUD/Promocodes/form/PromocodesFormPage';
import PromocodesTablePage from 'pages/CRUD/Promocodes/table/PromocodesTablePage';
import PromocodesViewPage from 'pages/CRUD/Promocodes/page/PromocodesViewPage';

import ChangePasswordFormPage from 'pages/CRUD/ChangePassword/ChangePasswordFormPage';
import Dashboard from '../../pages/dashboard';
import { useTypedSelector } from 'hooks/useTypedSelector';

const Layout = () => {
  const sidebarOpened = useTypedSelector((store) => store.navigation.sidebarOpened);
  const sidebarPosition = useTypedSelector((store) => store.navigation.sidebarPosition);
  const sidebarVisibility = useTypedSelector((store) => store.navigation.sidebarVisibility);

  const dispatch = useDispatch();
  const location = useLocation();

  const handleSwipe = (e: any) => {
    if ('ontouchstart' in window) {
      if (e.direction === 4) {
        dispatch(openSidebar());
        return;
      }
      if (e.direction === 2 && sidebarOpened) {
        dispatch(closeSidebar());
        return;
      }
    }
  };

  return (
    <div
      className={[s.root, 'sidebar-' + sidebarPosition, 'sidebar-' + sidebarVisibility].join(' ')}
    >
      <div className={s.wrap}>
        <Header />
        <Sidebar />
        <Hammer onSwipe={handleSwipe}>
          <main className={s.content}>
            <BreadcrumbHistory url={location.pathname} />
            <TransitionGroup>
              <CSSTransition classNames="fade" timeout={200}>
                <Switch>
                  <Route path={'/app/dashboard'} exact component={Dashboard} />
                  <Route path={'/app/profile'} exact component={UsersFormPage} />
                  <Route path={'/app/password'} exact component={ChangePasswordFormPage} />

                  <Route path={'/admin/users'} exact component={UsersTablePage} />
                  <Route path={'/admin/users/new'} exact component={UsersFormPage} />
                  <Route path={'/admin/users/:id/edit'} exact component={UsersFormPage} />
                  <Route path={'/admin/users/:id'} exact component={UsersViewPage} />

                  <Route path={'/admin/products'} exact component={ProductsTablePage} />
                  <Route path={'/admin/products/new'} exact component={ProductsFormPage} />
                  <Route path={'/admin/products/:id/edit'} exact component={ProductsFormPage} />
                  <Route path={'/admin/products/:id'} exact component={ProductsViewPage} />

                  <Route path={'/admin/categories'} exact component={CategoriesTablePage} />
                  <Route path={'/admin/categories/new'} exact component={CategoriesFormPage} />
                  <Route path={'/admin/categories/:id/edit'} exact component={CategoriesFormPage} />
                  <Route path={'/admin/categories/:id'} exact component={CategoriesViewPage} />

                  <Route path={'/admin/orders'} exact component={OrdersTablePage} />
                  <Route path={'/admin/orders/new'} exact component={OrdersFormPage} />
                  <Route path={'/admin/orders/:id/edit'} exact component={OrdersFormPage} />
                  <Route path={'/admin/orders/:id'} exact component={OrdersViewPage} />

                  <Route path={'/admin/reviews'} exact component={ReviewsTablePage} />
                  <Route path={'/admin/reviews/new'} exact component={ReviewsFormPage} />
                  <Route path={'/admin/reviews/:id/edit'} exact component={ReviewsFormPage} />
                  <Route path={'/admin/reviews/:id'} exact component={ReviewsViewPage} />

                  <Route path={'/admin/promocodes'} exact component={PromocodesTablePage} />
                  <Route path={'/admin/promocodes/new'} exact component={PromocodesFormPage} />
                  <Route path={'/admin/promocodes/:id/edit'} exact component={PromocodesFormPage} />
                  <Route path={'/admin/promocodes/:id'} exact component={PromocodesViewPage} />
                </Switch>
              </CSSTransition>
            </TransitionGroup>
            <footer className={s.contentFooter}>
              airdrophq - React admin template made by <a href="https://flatlogic.com">Flatlogic</a>
            </footer>
          </main>
        </Hammer>
      </div>
    </div>
  );
};

export default Layout;
