import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { api } from "../../service/api";
import { useAuth } from '../../context/AuthContext';
import Header from '../Layout/Header';
import SheetyService from '../../service/sheetyservice';

export default function ParkingSlots() {
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedLevel, setSelectedLevel] = useState(1);
  const [loading, setLoading] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const lotId = location.state?.lotId || 'central-plaza';
  console.log('Lot ID: ',lotId)

  // Mock slot data generation based on lotId
  // In a real app, this would come from the API
  const [slots, setSlots] = useState({ A: [], B: [] });

  const transformSlots = (flatSlots) => {
    const grouped = { A: [], B: [] };

    const counters = { A: 1, B: 1 };

    flatSlots.forEach(slot => {
      const section = slot.section;

      const formattedId = `${section}-${String(counters[section]).padStart(2, '0')}`;
      counters[section]++;

      grouped[section].push({
        id: formattedId,
        status: slot.status,
        ev: slot.ev
      });
    });

    return grouped;
  };

  const getSlotData = async () => {
    try {
      const slotData = await SheetyService.getParkingSlots(lotId);
      const formattedSlots = transformSlots(slotData);

      setSlots(formattedSlots);
    } catch (err) {
      console.error("Failed to load slots:", err);
    }
  };


  useEffect(() => {
    getSlotData()
  }, [lotId]);

  const handleBooking = async () => {
    if (!user) {
      alert("Please login to book a spot");
      navigate('/');
      return;
    }
    if (!selectedSlot) {
      alert("Please select a slot first");
      return;
    }

    setLoading(true);
    try {
      const bookingData = {
        userId: user?.id,
        email: user?.email,
        userName: user?.name,
        lotId: lotId,
        lotName: lotId,
        slotId: selectedSlot,
        totalAmount: 14.00,
        startTime: new Date().toISOString(),
        endTime: new Date(Date.now() + 9000000).toISOString()
      };

      try {
        await SheetyService.createBooking(bookingData);
        await SheetyService.updateSlotStatus(selectedSlot, "occupied")
      } catch (apiError) {
        console.error('Booking failed:', apiError);
        throw apiError;
      }

      setBookingSuccess(true);
      setTimeout(() => {
        navigate('/my-bookings');
      }, 2000);
    } catch (error) {
      alert("Booking failed: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const SlotCard = ({ slot }) => {
    const isSelected = selectedSlot === slot.id;

    if (slot.status === 'occupied') {
      return (
        <div className="relative flex flex-col items-center justify-center gap-2 h-32 rounded-lg border border-red-900/30 bg-red-900/10 opacity-75 cursor-not-allowed">
          <svg className="w-10 h-10 text-red-400" fill="currentColor" viewBox="0 0 24 24"><path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99z" /></svg>
          <span className="text-red-300/50 font-medium text-sm">{slot.id}</span>
        </div>
      );
    }

    if (slot.status === 'reserved') {
      return (
        <div className="relative flex flex-col items-center justify-center gap-2 h-32 rounded-lg border border-amber-700/30 bg-amber-900/10 opacity-90 cursor-not-allowed">
          <svg className="w-10 h-10 text-amber-500" fill="currentColor" viewBox="0 0 24 24"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" /></svg>
          <span className="text-amber-500/50 font-medium text-sm">{slot.id}</span>
        </div>
      );
    }

    if (isSelected) {
      return (
        <button onClick={() => setSelectedSlot(null)} className="relative flex flex-col items-center justify-center gap-2 h-32 rounded-lg bg-[#9333ea] shadow-lg shadow-[#9333ea]/30 ring-2 ring-white transform scale-105 z-10 transition-all">
          <div className="absolute -top-3 -right-3 bg-white text-[#9333ea] rounded-full p-1 shadow-sm">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" /></svg>
          </div>
          <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99z" /></svg>
          <span className="text-white font-bold text-lg">{slot.id}</span>
          <span className="text-white/80 text-xs">Tap to Deselect</span>
        </button>
      );
    }

    return (
      <button onClick={() => setSelectedSlot(slot.id)} className="group relative flex flex-col items-center justify-center gap-2 h-32 rounded-lg border-2 border-[#9333ea]/40 bg-[#1c2127] hover:border-[#9333ea] hover:bg-[#9333ea]/10 transition-all">
        {slot.ev ? (
          <svg className="w-10 h-10 text-[#9333ea]/50 group-hover:text-[#9333ea]" fill="currentColor" viewBox="0 0 24 24"><path d="M19.77 7.23l.01-.01-3.72-3.72L15 4.56l2.11 2.11c-.94.36-1.61 1.26-1.61 2.33 0 1.38 1.12 2.5 2.5 2.5.36 0 .69-.08 1-.21v7.21c0 .55-.45 1-1 1s-1-.45-1-1V14c0-1.1-.9-2-2-2h-1V5c0-1.1-.9-2-2-2H6c-1.1 0-2 .9-2 2v16h10v-7.5h1.5v5a2.5 2.5 0 005 0V9c0-.69-.28-1.32-.73-1.77z" /></svg>
        ) : (
          <svg className="w-10 h-10 text-[#9333ea]/50 group-hover:text-[#9333ea]" fill="currentColor" viewBox="0 0 24 24"><path d="M13 3L6 8v13h5v-6h2v6h5V8l-5-5z" /></svg>
        )}
        <span className="text-[#9333ea] font-bold text-sm">{slot.id}</span>
        <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#9333ea] opacity-50 group-hover:opacity-100"></div>
      </button>
    );
  };

  return (
    <div className="bg-gradient-to-br from-slate-950 via-purple-950/20 to-slate-950 text-white w-screen h-screen flex flex-col overflow-hidden">
      <Header />

      <div className="flex flex-1 flex-col lg:flex-row overflow-hidden relative w-full">
        {/* Booking Success Overlay */}
        {bookingSuccess && (
          <div className="absolute inset-0 z-50 bg-slate-950/90 backdrop-blur-sm flex items-center justify-center animate-fade-in">
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-8 rounded-2xl border border-emerald-500/50 shadow-[0_0_50px_rgba(16,185,129,0.2)] text-center max-w-sm mx-4 transform scale-110">
              <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Booking Confirmed!</h2>
              <p className="text-slate-300">Your spot {selectedSlot} has been reserved.</p>
              <p className="text-sm text-slate-400 mt-4">Redirecting to your bookings...</p>
            </div>
          </div>
        )}

        {/* Main Content */}
        <main className="flex-1 flex flex-col overflow-y-auto lg:border-r border-[#3b4754] bg-[#111418]">
          <div className="px-6 py-4 sticky top-0 z-10 bg-[#111418]/95 backdrop-blur-sm border-b border-[#3b4754]">
            <div className="flex flex-wrap gap-2 items-center mb-2">
              <span className="text-slate-400 text-sm font-medium hover:text-white cursor-pointer transition-colors" onClick={() => navigate('/parkingMap')}>Map</span>
              <span className="text-slate-400 text-sm font-medium">/</span>
              <span className="text-white text-sm font-medium">Select Slot</span>
            </div>
            <div className="flex justify-between items-end">
              <h1 className="text-2xl font-bold">Select a Parking Slot</h1>
              <div className="flex bg-[#1c2127] rounded-lg p-1 border border-[#3b4754]">
                {[1].map(level => (
                  <button key={level} onClick={() => setSelectedLevel(level)} className={`px-4 py-1.5 rounded text-sm font-medium transition-colors ${selectedLevel === level ? 'bg-gradient-to-r from-purple-600 to-cyan-600 text-white shadow-sm font-bold' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}>
                    Level {level}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="p-8 flex-1" style={{ background: 'radial-gradient(#283039 1px,transparent 1px)', backgroundSize: '24px 24px' }}>
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-slate-400 font-bold uppercase tracking-wider text-sm">Zone A - Near Entrance</h3>
                <svg className="w-6 h-6 text-slate-400 opacity-50" fill="currentColor" viewBox="0 0 24 24"><path d="M7 10l5 5 5-5z" /></svg>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-4">
                {slots.A.map(s => <SlotCard key={s.id} slot={s} />)}
              </div>
            </div>

            <div className="h-16 w-full flex items-center justify-center mb-8 opacity-30">
              <div className="flex-1 h-0.5 border-t-2 border-dashed border-[#9dabb9]"></div>
              <span className="mx-4 text-xs font-mono text-slate-400 uppercase">Driveway</span>
              <div className="flex-1 h-0.5 border-t-2 border-dashed border-[#9dabb9]"></div>
            </div>

            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-slate-400 font-bold uppercase tracking-wider text-sm">Zone B - Near EV Chargers</h3>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-4">
                {slots.B.map(s => <SlotCard key={s.id} slot={s} />)}
              </div>
            </div>
          </div>
        </main>

        <aside className="w-full lg:w-[400px] xl:w-[450px] bg-[#1c2127] border-l border-[#3b4754] flex flex-col shadow-2xl">
          {selectedSlot ? (
            <>
              <div className="p-6 border-b border-slate-700">
                <h2 className="text-lg font-bold mb-1 text-white">Booking Summary</h2>
                <p className="text-slate-400 text-sm">Review your selection before confirming.</p>
              </div>
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-4 border border-purple-500/20 flex items-center justify-between">
                  <div>
                    <p className="text-slate-400 text-xs uppercase font-bold tracking-wider mb-1">Selected Slot</p>
                    <h3 className="text-3xl font-bold text-white">{selectedSlot}</h3>
                    <p className="text-slate-400 text-sm">Level {selectedLevel} • Zone {selectedSlot.charAt(0)}</p>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-purple-600/20 flex items-center justify-center text-purple-400">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99z" /></svg>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Parking Rate</span>
                    <span className="text-white">$5.00/hr</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Duration</span>
                    <span className="text-white">2.5 hrs</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Service Fee</span>
                    <span className="text-white">$1.50</span>
                  </div>
                  <div className="h-px bg-slate-700 my-2"></div>
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-lg text-white">Total</span>
                    <span className="text-2xl font-bold text-cyan-400 font-mono">$14.00</span>
                  </div>
                </div>
              </div>
              <div className="p-6 bg-[#111418] border-t border-[#3b4754]">
                <button
                  className={`w-full bg-[#9333ea] hover:bg-purple-600 text-white font-bold py-3.5 px-4 rounded-lg shadow-lg shadow-[#9333ea]/25 transition-all text-sm flex items-center justify-center gap-2 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                  onClick={handleBooking}
                  disabled={loading}
                >
                  {loading ? (
                    <span>Processing...</span>
                  ) : (
                    <>
                      <span>Confirm Booking</span>
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" /></svg>
                    </>
                  )}
                </button>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center p-10 text-center text-slate-400">
              <div className="w-20 h-20 bg-[#283039] rounded-full flex items-center justify-center mb-4">
                <svg className="w-10 h-10 opacity-50" fill="currentColor" viewBox="0 0 24 24"><path d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
              </div>
              <h3 className="text-white font-bold text-lg mb-2">Select a Spot</h3>
              <p>Choose an available parking slot from the map to view details and proceed with booking.</p>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
