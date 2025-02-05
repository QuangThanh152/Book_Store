import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

const AdminRoute = ({children}) => {
  const token = localStorage.getItem('token');
  
  // người dùng chưa đăng nhập, chuyển về trang đăng nhập
  if (!token) {
    return <Navigate to="/admin" replace  />
  }
  return children ? children : <Outlet />;
}

export default AdminRoute