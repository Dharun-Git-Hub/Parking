import React, { useState, useEffect } from 'react';
import Header from '../Layout/Header';
import { api } from "../../service/api";
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import SheetyService from '../../service/sheetyservice';

export default function MyBookings() {
    const { user } = useAuth();
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if (user?.id) {
            const fetchBookings = async () => {
                try {
                    const data = await SheetyService.getBookings(user.email) || [];
                    console.log(data?.bookings)
                    let mine = []
                    mine.push(data?.bookings?.find(e=>e?.email == user.email))
                    console.log(mine)
                    setBookings(mine);
                } catch (err) {
                    setError("Failed to load bookings");
                    console.error(err);
                } finally {
                    setLoading(false);
                }
            };
            fetchBookings();
        }
    }, [user]);

    const handleCancelBooking = async (bookingId, slotId) => {
        try {
            setLoading(true);
            // Cancel via local API
            await api.cancelBooking(bookingId);
            // Update local state
            setBookings(prev => prev.filter(b => b.id !== bookingId));
        } catch (err) {
            setError("Failed to cancel booking: " + err.message);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950/20 to-slate-950 text-white flex items-center justify-center">Loading Bookings...</div>;

    return (
        <div className="w-screen h-screen bg-gradient-to-br from-slate-950 via-purple-950/20 to-slate-950 text-white flex flex-col overflow-hidden">
            <Header />

            <main className="flex-1 p-6 md:p-10 overflow-y-auto w-full">
                <div className="max-w-7xl mx-auto">
                    <div className="flex justify-between items-center mb-8">
                        <h1 className="text-3xl font-bold">My Bookings</h1>
                        <button onClick={() => navigate('/parkingMap')} className="bg-[#9333ea] text-white px-4 py-2 rounded-lg hover:bg-[#9333ea]/90 font-medium">
                            Book New Spot
                        </button>
                    </div>

                    {error && <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400 text-sm">{error}</div>}

                    {bookings.length === 0 ? (
                        <div className="text-center py-20 bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl border border-purple-500/20">
                            <div className="w-16 h-16 bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                            </div>
                            <h3 className="text-lg font-bold mb-2 text-white">No bookings yet</h3>
                            <p className="text-slate-400">It seems you haven't booked any parking spots yet.</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {bookings.map(booking => (
                                <div key={booking.id} className="bg-gradient-to-br from-slate-800 to-slate-900 border border-purple-500/20 rounded-xl p-6 flex flex-col md:flex-row gap-6 md:items-center hover:border-cyan-500/30 transition-all">
                                    <div className="flex-1">
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="font-bold text-xl">{booking.slotId}</h3>
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${booking.status === 'active' || booking.status === 'upcoming'
                                                    ? 'bg-emerald-500/20 text-emerald-400'
                                                    : 'bg-[#283039] text-[#9dabb9]'
                                                }`}>
                                                {booking.status}
                                            </span>
                                        </div>
                                        <div className="text-[#9dabb9] text-sm mb-4">
                                            Slot {booking.slotId} • {new Date(booking.startTime).toLocaleDateString()}
                                        </div>

                                        <div className="flex gap-8 text-sm">
                                            <div>
                                                <div className="text-[#9dabb9] text-xs uppercase font-bold mb-1">Time</div>
                                                <div className="font-mono">
                                                    {new Date(booking.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {new Date(booking.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                </div>
                                            </div>
                                            <div>
                                                <div className="text-[#9dabb9] text-xs uppercase font-bold mb-1">Amount</div>
                                                <div className="font-mono text-white font-bold">${booking.totalAmount?.toFixed(2)}</div>
                                            </div>
                                    </div>
                                </div>

                                <div className="flex md:flex-col gap-2">
                                    <button className="flex-1 md:w-32 py-2 px-3 bg-[#101922] border border-[#283039] rounded text-sm hover:text-white text-[#9dabb9] transition-colors">
                                        View Receipt
                                    </button>
                                    {(booking.status === 'upcoming' || booking.status === 'confirmed') && (
                                        <button 
                                            onClick={() => handleCancelBooking(booking.id, booking.slotId)}
                                            disabled={loading}
                                            className="flex-1 md:w-32 py-2 px-3 bg-red-500/10 border border-red-500/30 rounded text-sm text-red-400 hover:bg-red-500/20 transition-colors disabled:opacity-50"
                                        >
                                            {loading ? 'Cancelling...' : 'Cancel'}
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                </div>
            </main>
        </div>
    );
}
