import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../Layout/Header';
import { useAuth } from "../../context/Authcontext";
import { api } from "../../service/api";

export default function AdminDashboard() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) {
            navigate('/register');
        }
    }, [user, navigate]);

    useEffect(() => {
        // Simulate fetching stats
        const fetchStats = async () => {
            try {
                const data = await api.getAllStats();
                setStats(data);
            } catch {
                console.error("Failed to fetch admin stats");
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    if (!user) {
        return null;
    }

    if (loading) return <div className="min-h-screen bg-gradient-to-br from-slate-950 to-slate-900 text-white flex items-center justify-center">Loading Admin Panel...</div>;

    return (
        <div className="w-screen h-screen bg-gradient-to-br from-slate-950 via-purple-950/20 to-slate-950 text-white flex flex-col overflow-hidden">
            <Header />

            <main className="flex-1 p-6 md:p-8 overflow-y-auto w-full">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <div className="bg-slate-900/50 backdrop-blur p-6 rounded-xl border border-purple-500/20">
                            <h3 className="text-slate-400 text-sm font-bold uppercase tracking-wider mb-2">Total Revenue</h3>
                            <p className="text-3xl font-bold text-white">${stats?.revenue.toFixed(2)}</p>
                            <div className="mt-2 text-emerald-400 text-sm font-medium flex items-center gap-1">
                                <span>↑ 12%</span>
                                <span className="text-slate-400">vs last week</span>
                            </div>
                        </div>

                        <div className="bg-slate-900/50 backdrop-blur p-6 rounded-xl border border-purple-500/20">
                            <h3 className="text-slate-400 text-sm font-bold uppercase tracking-wider mb-2">Occupancy Rate</h3>
                            <p className="text-3xl font-bold text-white">{stats?.occupancyRate}%</p>
                            <div className="mt-2 h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                                <div className="h-full bg-gradient-to-r from-purple-500 to-cyan-500" style={{ width: `${stats?.occupancyRate}%` }}></div>
                            </div>
                        </div>

                        <div className="bg-slate-900/50 backdrop-blur p-6 rounded-xl border border-pink-500/20">
                            <h3 className="text-slate-400 text-sm font-bold uppercase tracking-wider mb-2">Active Bookings</h3>
                            <p className="text-3xl font-bold text-white">{stats?.activeBookings}</p>
                            <div className="mt-2 text-slate-300 text-sm">
                                Across {stats?.activeBookings > 0 ? '3' : '0'} locations
                            </div>
                        </div>

                        <div className="bg-slate-900/50 backdrop-blur p-6 rounded-xl border border-cyan-500/20">
                            <h3 className="text-slate-400 text-sm font-bold uppercase tracking-wider mb-2">System Status</h3>
                            <p className="text-3xl font-bold text-emerald-400">Operational</p>
                            <div className="mt-2 text-slate-400 text-sm">
                                Last check: Just now
                            </div>
                        </div>
                    </div>

                    {/* Recent Activity / Controls */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 bg-slate-900/50 backdrop-blur rounded-xl border border-purple-500/20 overflow-hidden">
                            <div className="p-6 border-b border-purple-500/20 flex justify-between items-center">
                                <h3 className="font-bold text-lg">Booking Overview</h3>
                                <button className="text-purple-400 text-sm font-medium hover:text-purple-300">View All</button>
                            </div>
                            <div className="p-6">
                                <div className="flex items-center justify-center h-48 text-slate-400 border-2 border-dashed border-purple-500/20 rounded-lg">
                                    <p>Chart Visualization Area</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-slate-900/50 backdrop-blur rounded-xl border border-purple-500/20 overflow-hidden">
                            <div className="p-6 border-b border-purple-500/20">
                                <h3 className="font-bold text-lg">Quick Actions</h3>
                            </div>
                            <div className="p-6 space-y-4">
                                <button className="w-full py-3 px-4 bg-slate-800 hover:bg-slate-700 border border-purple-500/20 rounded-lg flex items-center gap-3 transition-colors text-left">
                                    <div className="w-8 h-8 rounded-full bg-red-500/20 text-red-500 flex items-center justify-center">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                                    </div>
                                    <div>
                                        <div className="font-semibold text-sm">Emergency Closure</div>
                                        <div className="text-xs text-[#9dabb9]">Close specific lot</div>
                                    </div>
                                </button>

                                <button className="w-full py-3 px-4 bg-slate-800 hover:bg-slate-700 border border-purple-500/20 rounded-lg flex items-center gap-3 transition-colors text-left">
                                    <div className="w-8 h-8 rounded-full bg-yellow-500/20 text-yellow-500 flex items-center justify-center">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg>
                                    </div>
                                    <div>
                                        <div className="font-semibold text-sm">Update Rates</div>
                                        <div className="text-xs text-[#9dabb9]">Global pricing adjustment</div>
                                    </div>
                                </button>

                                <button className="w-full py-3 px-4 bg-slate-800 hover:bg-slate-700 border border-purple-500/20 rounded-lg flex items-center gap-3 transition-colors text-left">
                                    <div className="w-8 h-8 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                                    </div>
                                    <div>
                                        <div className="font-semibold text-sm">Export Reports</div>
                                        <div className="text-xs text-[#9dabb9]">Download monthly summary</div>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}