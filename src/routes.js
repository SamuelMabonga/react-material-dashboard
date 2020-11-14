import React from 'react';
import { Navigate } from 'react-router-dom';
import DashboardLayout from 'src/layouts/DashboardLayout';
import MainLayout from 'src/layouts/MainLayout';
import AccountView from 'src/views/account/AccountView';
import CustomerListView from 'src/views/customer/CustomerListView';
import EmployeeListView from 'src/views/employee/EmployeeListView';
import FarmListView from 'src/views/farm/FarmListView';
import FarmerListView from 'src/views/farmer/FarmerListView';
import DashboardView from 'src/views/reports/DashboardView';
import LoginView from 'src/views/auth/LoginView';
import NotFoundView from 'src/views/errors/NotFoundView';
import ProductListView from 'src/views/product/ProductListView';
import RegisterView from 'src/views/auth/RegisterView';
import SettingsView from 'src/views/settings/SettingsView';

import FarmerForm from 'src/views/forms/addFarmer'
import FarmForm from 'src/views/forms/addFarm'
import FacilityForm from 'src/views/forms/addFacility'
import EmployeeForm from 'src/views/forms/addEmployee'

const routes = [
  {
    path: 'app',
    element: <DashboardLayout />,
    children: [
      { path: 'account', element: <AccountView /> },
      { path: 'employees', element: <EmployeeListView /> },
      { path: 'farmers', element: <FarmerListView /> },
      { path: 'farms', element: <FarmListView /> },
      { path: 'account', element: <AccountView /> },
      { path: 'customers', element: <CustomerListView /> },
      { path: 'dashboard', element: <DashboardView /> },
      { path: 'products', element: <ProductListView /> },
      { path: 'settings', element: <SettingsView /> },
      { path: 'forms/farmer', element: <FarmerForm /> },
      { path: 'forms/farm', element: <FarmForm /> },
      { path: 'forms/facility', element: <FacilityForm /> },
      { path: 'forms/employee', element: <EmployeeForm /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: 'login', element: <LoginView /> },
      { path: 'register', element: <RegisterView /> },
      { path: '404', element: <NotFoundView /> },
      { path: '/', element: <Navigate to="/app/dashboard" /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  }
];

export default routes;
