import { useAuth } from "../../context/AuthContext";
import { useState } from "react";
import Header from "../Layout/Header";

export default function Profile() {
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState('personal');
    const [isEditing, setIsEditing] = useState(false);
    const [showAddVehicleModal, setShowAddVehicleModal] = useState(false);
    const [formData, setFormData] = useState({
        name: user?.name || "John Doe",
        email: user?.email || "john@example.com",
        phone: "+1 (555) 000-0000",
        city: "San Francisco",
        country: "United States"
    });

    const [vehicles, setVehicles] = useState([
        { id: 1, name: "Tesla Model 3", plate: "ABC-1234", icon: "🚗", isPrimary: true },
        { id: 2, name: "Ford F-150", plate: "TRK-9988", icon: "🚙", isPrimary: false }
    ]);

    const [newVehicle, setNewVehicle] = useState({
        name: "",
        plate: "",
        icon: "🚗"
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        setIsEditing(false);
        // API call would go here
    };

    const handleAddVehicle = () => {
        if (newVehicle.name && newVehicle.plate) {
            setVehicles([...vehicles, { 
                id: Date.now(), 
                name: newVehicle.name, 
                plate: newVehicle.plate.toUpperCase(),
                icon: newVehicle.icon,
                isPrimary: false 
            }]);
            setNewVehicle({ name: "", plate: "", icon: "🚗" });
            setShowAddVehicleModal(false);
        }
    };

    const handleDeleteVehicle = (id) => {
        setVehicles(vehicles.filter(v => v.id !== id));
    };

    return (
        <div className="bg-gradient-to-br from-slate-950 via-purple-950/20 to-slate-950 text-white w-screen h-screen flex flex-col overflow-hidden">
            {/* Header */}
            <Header />

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto w-full">
                {/* Profile Header Banner */}
                <div className="bg-gradient-to-r from-purple-600/30 via-cyan-500/20 to-transparent border-b border-purple-500/20 px-6 md:px-10 py-8 md:py-12">
                    <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                        <div className="flex items-end gap-6">
                            {/* Profile Avatar */}
                            <div className="relative group">
                                <div className="w-24 h-24 md:w-32 md:h-32 rounded-2xl bg-gradient-to-br from-purple-500 to-cyan-500 p-1 shadow-lg shadow-purple-500/30">
                                    <img 
                                        src="https://sohohindipro.com/wp-content/uploads/2022/11/14_girls-dp-sohohindipro.com_-1024x1024.jpg" 
                                        alt="Profile" 
                                        className="w-full h-full rounded-xl object-cover"
                                    />
                                </div>
                                <button className="absolute bottom-0 right-0 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white p-2 rounded-full shadow-lg transition-all transform hover:scale-110">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25z" />
                                        <path d="M20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
                                    </svg>
                                </button>
                            </div>

                            {/* User Info */}
                            <div>
                                <h1 className="text-3xl md:text-4xl font-bold mb-2">{formData.name}</h1>
                                <p className="text-slate-300 text-sm md:text-base mb-2">Premium Member</p>
                                <div className="flex items-center gap-2">
                                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                                        <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                                        Account Verified
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Quick Stats */}
                        <div className="grid grid-cols-3 gap-4">
                            <div className="text-center">
                                <div className="text-2xl font-bold text-cyan-400">12</div>
                                <p className="text-slate-400 text-xs mt-1">Total Bookings</p>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-emerald-400">4.8</div>
                                <p className="text-slate-400 text-xs mt-1">Rating</p>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-amber-400">$145</div>
                                <p className="text-slate-400 text-xs mt-1">Savings</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content Area */}
                <div className="max-w-7xl mx-auto px-6 md:px-10 py-8">
                    {/* Tabs */}
                    <div className="flex gap-1 mb-8 bg-gradient-to-r from-slate-800 to-slate-900 rounded-lg p-1 w-fit border border-purple-500/20">
                        {[
                            { id: 'personal', label: 'Personal Info', icon: '👤' },
                            { id: 'vehicles', label: 'My Vehicles', icon: '🚗' },
                            { id: 'payments', label: 'Payment Methods', icon: '💳' },
                            { id: 'history', label: 'Booking History', icon: '📋' }
                        ].map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`px-4 py-2 rounded-md font-medium text-sm transition-all whitespace-nowrap ${
                                    activeTab === tab.id
                                        ? 'bg-gradient-to-r from-purple-600 to-cyan-600 text-white shadow-lg shadow-purple-500/30'
                                        : 'text-slate-400 hover:text-slate-200'
                                }`}
                            >
                                <span className="mr-2">{tab.icon}</span>{tab.label}
                            </button>
                        ))}
                    </div>

                    {/* Tab Content */}
                    {activeTab === 'personal' && (
                        <div className="space-y-6">
                            {/* Personal Information Card */}
                            <div className="bg-slate-900/50 border border-purple-500/20 rounded-2xl overflow-hidden backdrop-blur">
                                <div className="px-6 py-5 border-b border-purple-500/20 flex items-center justify-between">
                                    <h3 className="text-xl font-bold">Personal Information</h3>
                                    <button 
                                        onClick={() => setIsEditing(!isEditing)}
                                        className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white font-medium text-sm transition-all"
                                    >
                                        {isEditing ? 'Cancel' : 'Edit Profile'}
                                    </button>
                                </div>

                                <div className="p-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {/* Full Name */}
                                        <div>
                                            <label className="block text-sm font-medium text-slate-300 mb-2">Full Name</label>
                                            {isEditing ? (
                                                <input
                                                    type="text"
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleInputChange}
                                                    className="w-full px-4 py-2.5 bg-slate-800 border border-purple-500/30 rounded-lg text-white focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 transition-all"
                                                />
                                            ) : (
                                                <p className="text-white text-base">{formData.name}</p>
                                            )}
                                        </div>

                                        {/* Email */}
                                        <div>
                                            <label className="block text-sm font-medium text-slate-400 mb-2">Email Address</label>
                                            {isEditing ? (
                                                <input
                                                    type="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleInputChange}
                                                    className="w-full px-4 py-2.5 bg-slate-800 border border-purple-500/30 rounded-lg text-white focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 transition-all"
                                                />
                                            ) : (
                                                <p className="text-white text-base">{formData.email}</p>
                                            )}
                                        </div>

                                        {/* Phone */}
                                        <div>
                                            <label className="block text-sm font-medium text-slate-400 mb-2">Phone Number</label>
                                            {isEditing ? (
                                                <input
                                                    type="tel"
                                                    name="phone"
                                                    value={formData.phone}
                                                    onChange={handleInputChange}
                                                    className="w-full px-4 py-2.5 bg-slate-800 border border-purple-500/30 rounded-lg text-white focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 transition-all"
                                                />
                                            ) : (
                                                <p className="text-white text-base">{formData.phone}</p>
                                            )}
                                        </div>

                                        {/* City */}
                                        <div>
                                            <label className="block text-sm font-medium text-slate-400 mb-2">City</label>
                                            {isEditing ? (
                                                <input
                                                    type="text"
                                                    name="city"
                                                    value={formData.city}
                                                    onChange={handleInputChange}
                                                    className="w-full px-4 py-2.5 bg-slate-800 border border-purple-500/30 rounded-lg text-white focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 transition-all"
                                                />
                                            ) : (
                                                <p className="text-white text-base">{formData.city}</p>
                                            )}
                                        </div>

                                        {/* Country */}
                                        <div>
                                            <label className="block text-sm font-medium text-slate-400 mb-2">Country</label>
                                            {isEditing ? (
                                                <input
                                                    type="text"
                                                    name="country"
                                                    value={formData.country}
                                                    onChange={handleInputChange}
                                                    className="w-full px-4 py-2.5 bg-slate-800 border border-purple-500/30 rounded-lg text-white focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 transition-all"
                                                />
                                            ) : (
                                                <p className="text-white text-base">{formData.country}</p>
                                            )}
                                        </div>
                                    </div>

                                    {isEditing && (
                                        <div className="mt-8 flex justify-end gap-4">
                                            <button 
                                                onClick={() => setIsEditing(false)}
                                                className="px-6 py-2.5 rounded-lg border border-purple-500/30 text-slate-400 hover:text-white hover:border-purple-500/50 transition-colors"
                                            >
                                                Cancel
                                            </button>
                                            <button 
                                                onClick={handleSave}
                                                className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white font-medium transition-all shadow-lg shadow-purple-500/30"
                                            >
                                                Save Changes
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Additional Info Cards */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Member Since */}
                                <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-purple-500/20 rounded-xl p-6">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="w-10 h-10 rounded-lg bg-purple-600/20 flex items-center justify-center text-purple-400">
                                            📅
                                        </div>
                                        <h4 className="font-semibold text-slate-300">Member Since</h4>
                                    </div>
                                    <p className="text-2xl font-bold text-white">March 15, 2023</p>
                                </div>

                                {/* Account Status */}
                                <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-purple-500/20 rounded-xl p-6">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                                            ✓
                                        </div>
                                        <h4 className="font-semibold text-slate-300">Account Status</h4>
                                    </div>
                                    <p className="text-2xl font-bold text-emerald-400">Active & Verified</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'vehicles' && (
                        <div className="space-y-6">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-xl font-bold">My Vehicles</h3>
                                <button 
                                    onClick={() => setShowAddVehicleModal(true)}
                                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white font-medium transition-all">
                                    <span>➕</span> Add Vehicle
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {vehicles.map((vehicle) => (
                                    <div key={vehicle.id} className="bg-gradient-to-br from-slate-800 to-slate-900 border border-[#283039] rounded-xl p-6 group hover:border-[#137fec] transition-all">
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="w-12 h-12 rounded-lg bg-[#137fec]/20 flex items-center justify-center text-[#137fec] text-2xl group-hover:bg-[#137fec] group-hover:text-white transition-all">
                                                {vehicle.icon}
                                            </div>
                                            {vehicle.isPrimary && (
                                                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#137fec]/20 text-[#137fec]">Primary</span>
                                            )}
                                        </div>
                                        <h4 className="text-lg font-bold text-white mb-1">{vehicle.name}</h4>
                                        <p className="text-[#9dabb9] text-sm mb-4">License Plate: {vehicle.plate}</p>
                                        <div className="flex gap-3">
                                            <button className="flex-1 px-3 py-2 rounded-lg bg-[#137fec]/20 text-[#137fec] hover:bg-[#137fec] hover:text-white font-medium text-sm transition-all">
                                                Edit
                                            </button>
                                            <button 
                                                onClick={() => handleDeleteVehicle(vehicle.id)}
                                                className="flex-1 px-3 py-2 rounded-lg border border-red-500/30 text-red-400 hover:bg-red-500/20 font-medium text-sm transition-all">
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Add Vehicle Modal */}
                            {showAddVehicleModal && (
                                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
                                    <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-[#283039] rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl">
                                        <h3 className="text-2xl font-bold mb-6">Add New Vehicle</h3>

                                        <div className="space-y-4">
                                            {/* Vehicle Name */}
                                            <div>
                                                <label className="block text-sm font-medium text-[#9dabb9] mb-2">Vehicle Name</label>
                                                <input
                                                    type="text"
                                                    placeholder="e.g., Tesla Model 3"
                                                    value={newVehicle.name}
                                                    onChange={(e) => setNewVehicle({...newVehicle, name: e.target.value})}
                                                    className="w-full px-4 py-2.5 bg-[#111418] border border-[#283039] rounded-lg text-white placeholder-[#9dabb9] focus:border-[#137fec] focus:ring-2 focus:ring-[#137fec]/30 transition-all"
                                                />
                                            </div>

                                            {/* License Plate */}
                                            <div>
                                                <label className="block text-sm font-medium text-[#9dabb9] mb-2">License Plate</label>
                                                <input
                                                    type="text"
                                                    placeholder="e.g., ABC-1234"
                                                    value={newVehicle.plate}
                                                    onChange={(e) => setNewVehicle({...newVehicle, plate: e.target.value})}
                                                    className="w-full px-4 py-2.5 bg-[#111418] border border-[#283039] rounded-lg text-white placeholder-[#9dabb9] focus:border-[#137fec] focus:ring-2 focus:ring-[#137fec]/30 transition-all"
                                                />
                                            </div>

                                            {/* Vehicle Icon */}
                                            <div>
                                                <label className="block text-sm font-medium text-[#9dabb9] mb-2">Vehicle Type</label>
                                                <div className="grid grid-cols-4 gap-2">
                                                    {['🚗', '🚙', '🚕', '🚌'].map((icon) => (
                                                        <button
                                                            key={icon}
                                                            onClick={() => setNewVehicle({...newVehicle, icon})}
                                                            className={`py-3 rounded-lg text-2xl transition-all ${
                                                                newVehicle.icon === icon
                                                                    ? 'bg-[#137fec] border-2 border-[#137fec]'
                                                                    : 'bg-[#111418] border border-[#283039] hover:border-[#137fec]'
                                                            }`}
                                                        >
                                                            {icon}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Buttons */}
                                        <div className="mt-8 flex gap-3">
                                            <button 
                                                onClick={() => setShowAddVehicleModal(false)}
                                                className="flex-1 px-4 py-2.5 rounded-lg border border-[#283039] text-[#9dabb9] hover:text-white transition-colors font-medium"
                                            >
                                                Cancel
                                            </button>
                                            <button 
                                                onClick={handleAddVehicle}
                                                className="flex-1 px-4 py-2.5 rounded-lg bg-[#137fec] hover:bg-[#137fec]/90 text-white font-medium transition-all shadow-lg shadow-[#137fec]/30"
                                            >
                                                Add Vehicle
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {activeTab === 'payments' && (
                        <div className="space-y-6">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-xl font-bold">Payment Methods</h3>
                                <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#137fec] hover:bg-[#137fec]/90 text-white font-medium transition-all">
                                    <span>➕</span> Add Card
                                </button>
                            </div>

                            {/* Card 1 */}
                            <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl p-6 text-white relative overflow-hidden group cursor-pointer hover:shadow-lg hover:shadow-blue-500/20 transition-all">
                                <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform"></div>
                                <div className="relative">
                                    <p className="text-sm font-semibold opacity-80 mb-8">VISA</p>
                                    <p className="text-2xl font-bold tracking-widest mb-6">•••• •••• •••• 4242</p>
                                    <div className="flex justify-between items-end">
                                        <div>
                                            <p className="text-xs opacity-80 mb-1">Card Holder</p>
                                            <p className="font-semibold">John Doe</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-xs opacity-80 mb-1">Expires</p>
                                            <p className="font-semibold">12/24</p>
                                        </div>
                                    </div>
                                </div>
                                <span className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold bg-white/30 backdrop-blur">Default</span>
                            </div>

                            {/* Card 2 */}
                            <div className="bg-gradient-to-br from-red-600 to-red-800 rounded-xl p-6 text-white relative overflow-hidden group cursor-pointer hover:shadow-lg hover:shadow-red-500/20 transition-all">
                                <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform"></div>
                                <div className="relative">
                                    <p className="text-sm font-semibold opacity-80 mb-8">MASTERCARD</p>
                                    <p className="text-2xl font-bold tracking-widest mb-6">•••• •••• •••• 5567</p>
                                    <div className="flex justify-between items-end">
                                        <div>
                                            <p className="text-xs opacity-80 mb-1">Card Holder</p>
                                            <p className="font-semibold">John Doe</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-xs opacity-80 mb-1">Expires</p>
                                            <p className="font-semibold">09/25</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Auto-pay Toggle */}
                            <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-[#283039] rounded-xl p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h4 className="font-semibold text-white mb-1">Auto-pay for Bookings</h4>
                                        <p className="text-[#9dabb9] text-sm">Automatically charge your default payment method</p>
                                    </div>
                                    <input type="checkbox" defaultChecked className="w-5 h-5 rounded cursor-pointer" />
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'history' && (
                        <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-[#283039] rounded-2xl overflow-hidden">
                            <div className="px-6 py-5 border-b border-[#283039]">
                                <h3 className="text-xl font-bold">Recent Booking History</h3>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="border-b border-[#283039] bg-[#111418]">
                                        <tr>
                                            <th className="px-6 py-4 text-left text-[#9dabb9] font-semibold text-sm">Location</th>
                                            <th className="px-6 py-4 text-left text-[#9dabb9] font-semibold text-sm">Date & Time</th>
                                            <th className="px-6 py-4 text-left text-[#9dabb9] font-semibold text-sm">Duration</th>
                                            <th className="px-6 py-4 text-left text-[#9dabb9] font-semibold text-sm">Amount</th>
                                            <th className="px-6 py-4 text-left text-[#9dabb9] font-semibold text-sm">Status</th>
                                            <th className="px-6 py-4 text-right text-[#9dabb9] font-semibold text-sm">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-[#283039]">
                                        <tr className="hover:bg-[#111418] transition-colors">
                                            <td className="px-6 py-4">
                                                <div>
                                                    <p className="font-semibold text-white">Central Plaza Garage</p>
                                                    <p className="text-[#9dabb9] text-xs mt-1">Slot A-45</p>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-[#9dabb9]">Oct 24, 2023 | 9:00 AM</td>
                                            <td className="px-6 py-4 text-[#9dabb9]">2h 15m</td>
                                            <td className="px-6 py-4 font-semibold text-white">$12.50</td>
                                            <td className="px-6 py-4">
                                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-400">
                                                    <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                                                    Completed
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <button className="text-[#137fec] hover:text-white transition-colors">
                                                    ⬇️
                                                </button>
                                            </td>
                                        </tr>
                                        <tr className="hover:bg-[#111418] transition-colors">
                                            <td className="px-6 py-4">
                                                <div>
                                                    <p className="font-semibold text-white">Downtown West</p>
                                                    <p className="text-[#9dabb9] text-xs mt-1">Slot B-12</p>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-[#9dabb9]">Oct 20, 2023 | 2:30 PM</td>
                                            <td className="px-6 py-4 text-[#9dabb9]">45m</td>
                                            <td className="px-6 py-4 font-semibold text-white">$5.00</td>
                                            <td className="px-6 py-4">
                                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-400">
                                                    <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                                                    Completed
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <button className="text-[#137fec] hover:text-white transition-colors">
                                                    ⬇️
                                                </button>
                                            </td>
                                        </tr>
                                        <tr className="hover:bg-[#111418] transition-colors">
                                            <td className="px-6 py-4">
                                                <div>
                                                    <p className="font-semibold text-white">Airport Long Term</p>
                                                    <p className="text-[#9dabb9] text-xs mt-1">Slot L-09</p>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-[#9dabb9]">Sep 15, 2023 | 6:00 AM</td>
                                            <td className="px-6 py-4 text-[#9dabb9]">-</td>
                                            <td className="px-6 py-4 font-semibold text-white">$0.00</td>
                                            <td className="px-6 py-4">
                                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-red-500/20 text-red-400">
                                                    <span className="w-2 h-2 rounded-full bg-red-400"></span>
                                                    Cancelled
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <button className="text-[#137fec] opacity-50 cursor-not-allowed">
                                                    ⬇️
                                                </button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <div className="px-6 py-4 border-t border-[#283039] bg-[#111418] text-center">
                                <button className="text-[#137fec] hover:text-[#137fec]/80 font-medium text-sm transition-colors">
                                    Load more activity →
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
