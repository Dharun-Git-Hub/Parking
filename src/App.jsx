import Login from './components/Auth/Login'
import SignUp from './components/Auth/Signup'
import Dashboard from './components/Dashboard/Dashboard'
import Profile from './components/Dashboard/Profile'
import Settings from './components/Settings/Setting'
import BookingConfirmation from './components/ParkingMap/BookingConfirmation'
import ParkingMap from './components/ParkingMap/ParkingMap'
import ParkingSlots from './components/ParkingMap/ParkingSlots'
import AdminDashboard from './components/Admin/AdminDashboard'
import MyBookings from './components/Booking/MyBookings'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'


function ProtectedRoute({ children, role }) {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  if (role && user.role !== role) {
    return <Navigate to="/parkingMap" replace />;
  }

  return children;
}


function App() {

  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/register' element={<SignUp />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/profile' element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path='/settings' element={<ProtectedRoute><Settings /></ProtectedRoute>} />
          <Route path='/confirmBooking' element={<BookingConfirmation />} />
          <Route path='/parkingMap' element={<ParkingMap />} />
          <Route path='/parkingSlots' element={<ParkingSlots />} />
          <Route path='/admin' element={<ProtectedRoute role="admin"><AdminDashboard /></ProtectedRoute>} />
          <Route path='/my-bookings' element={<ProtectedRoute><MyBookings /></ProtectedRoute>} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
