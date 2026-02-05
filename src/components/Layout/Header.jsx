import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function Header() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    return (
        <header className="flex items-center justify-between border-b border-purple-500/20 bg-gradient-to-r from-slate-900 via-purple-900/20 to-slate-900 px-6 py-3 shrink-0 z-50">
            <div className="flex items-center gap-8">
                <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/parkingMap')}>
                    <div className="w-8 h-8 flex items-center justify-center bg-gradient-to-r from-purple-600 to-cyan-600 rounded-lg">
                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M13 3L6 8v13h5v-6h2v6h5V8l-5-5zm-2 14H9v-2h2v2zm0-4H9v-2h2v2zm4 4h-2v-2h2v2zm0-4h-2v-2h2v2z" />
                        </svg>
                    </div>
                    <h2 className="text-lg font-bold text-white">SmartPark</h2>
                </div>
            </div>

            <div className="flex items-center gap-6">
                <nav className="hidden lg:flex items-center gap-6">
                    <NavLink to="/dashboard" className={({ isActive }) => `text-sm font-medium ${isActive ? 'bg-gradient-to-r from-purple-600 to-cyan-600 bg-clip-text text-transparent' : 'text-slate-300 hover:text-white'}`}>Dashboard</NavLink>
                    <NavLink to="/parkingMap" className={({ isActive }) => `text-sm font-medium ${isActive ? 'bg-gradient-to-r from-purple-600 to-cyan-600 bg-clip-text text-transparent' : 'text-slate-300 hover:text-white'}`}>Parking Map</NavLink>
                    <NavLink to="/my-bookings" className={({ isActive }) => `text-sm font-medium ${isActive ? 'bg-gradient-to-r from-purple-600 to-cyan-600 bg-clip-text text-transparent' : 'text-slate-300 hover:text-white'}`}>My Bookings</NavLink>
                </nav>

                {user ? (
                    <div className="flex gap-2 items-center">
                        <div className="text-right hidden sm:block mr-2">
                            <div className="text-white text-sm font-medium">{user.name}</div>
                            <div className="text-[#9dabb9] text-xs capitalize">{user.role}</div>
                        </div>
                        <button className="w-9 h-9 rounded-full bg-slate-800 border border-purple-500/20 overflow-hidden">
                            <img src="https://sohohindipro.com/wp-content/uploads/2022/11/14_girls-dp-sohohindipro.com_-1024x1024.jpg" alt="Profile" className="w-full h-full" />
                        </button>
                        <button onClick={() => {
                            logout();
                            navigate('/');
                        }} className="ml-2 text-xs text-red-400 hover:text-red-300 transition-colors">
                            Logout
                        </button>
                    </div>
                ) : (
                    <div className="flex gap-2">
                        <button onClick={() => navigate('/')} className="text-white text-sm hover:text-[#9333ea]">Login</button>
                    </div>
                )}
            </div>
        </header>
    );
}
