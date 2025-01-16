// import React from 'react'
import { useAuth } from '../context/AuthContext'
import { Navigate } from 'react-router-dom'

const PrivateRoute = ({children}) => {
    const {currentUser, loading} = useAuth();
    if (loading) {
        return (
          <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 animate-pulse">
            <div className="w-16 h-24 bg-gray-200 rounded-lg"></div>
            <div className="flex-1">
              <div className="w-3/4 h-4 mb-2 bg-gray-200 rounded"></div>
              <div className="w-1/2 h-3 bg-gray-200 rounded"></div>
            </div>
          </div>
        )
      }
      
    if (currentUser) {
        return children;
    }

    return <Navigate to="/login" replace />
}

export default PrivateRoute