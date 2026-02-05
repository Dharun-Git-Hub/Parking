import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from "../../service/api";
import Header from '../Layout/Header';
import SheetyService from '../../service/sheetyservice';

export default function ParkingMap() {
  const [selectedLotId, setSelectedLotId] = useState(1);
  const [parkingLots, setParkingLots] = useState([]);
  const [parkingSlots, setParkingSlots] = useState([]);
  const [parkingUsers, setParkingUsers] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const sidebarOpen = false;

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setLoading(true);
        const lotsData = await SheetyService.getParkingMap()
        console.log("lots Data: ",lotsData)
        setParkingLots(lotsData);
      } catch (err) {
        console.error("Failed to fetch data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  const selectedLot = parkingLots.find(lot => lot.id === selectedLotId);

  const getStatusColor = (status) => {
    switch (status) {
      case 'available': return 'emerald';
      case 'limited': return 'yellow';
      case 'full': return 'red';
      default: return 'gray';
    }
  };

  const getStatusText = (lot) => {
    if (lot.spotsBooked >= lot.spotsTotal) return 'Full';
    const spotsLeft = lot.spotsTotal - lot.spotsBooked;
    return `${spotsLeft} spots left`;
  };

  if (loading) return <div className="w-screen h-screen bg-gradient-to-br from-slate-950 via-purple-950/20 to-slate-950 flex items-center justify-center text-white">Loading Map...</div>;

  return (
    <div className="bg-gradient-to-br from-slate-950 via-purple-950/20 to-slate-950 text-white w-screen h-screen flex flex-col overflow-hidden">
      <Header />

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden relative w-full">
        {/* Sidebar */}
        <aside className={`w-full max-w-[400px] flex flex-col border-r border-purple-500/20 bg-gradient-to-b from-slate-900 to-slate-950 z-10 shadow-xl h-full absolute md:relative transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-transform`}>
          {/* Sidebar Header */}
          <div className="p-5 border-b border-purple-500/20 flex flex-col gap-4 bg-gradient-to-r from-slate-900 to-slate-950">
            <div className="flex items-center justify-between">
              <h1 className="text-lg font-bold text-white">Nearby Parking</h1>
              <span className="text-slate-300 text-xs font-medium bg-gradient-to-r from-slate-800 to-slate-900 px-2 py-1 rounded border border-purple-500/10">TamilNadu,India</span>
            </div>

            {/* Search */}
            <div className="flex items-stretch rounded-lg h-12 bg-gradient-to-r from-slate-800 to-slate-900 border border-purple-500/20 overflow-hidden focus-within:border-cyan-500/50 transition-all">
              <input
                className="flex-1 bg-transparent border-none text-white placeholder-slate-400 px-4 focus:outline-none"
                placeholder="Find a specific lot..."
              />
              <button className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white px-4 transition-all">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-2">
              <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-purple-600/20 to-cyan-600/20 text-cyan-400 border border-cyan-500/30 text-xs font-medium hover:border-cyan-500/50 transition-colors">
                Available
              </button>
              <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-slate-800 to-slate-900 text-slate-300 border border-purple-500/20 text-xs font-medium hover:text-white hover:border-purple-500/40 transition-all">
                <span>⚡</span> EV Charging
              </button>
            </div>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {parkingLots.map(lot => (
              <div
                key={lot.id}
                onClick={() => setSelectedLotId(lot.id)}
                className={`p-4 rounded-xl cursor-pointer transition-all ${selectedLotId === lot.id
                    ? 'bg-gradient-to-br from-slate-800 to-slate-900 border border-cyan-500/50 shadow-[0_0_15px_rgba(34,211,238,0.1)]'
                    : 'bg-gradient-to-br from-slate-900 to-slate-950 border border-purple-500/20 hover:border-purple-500/40'
                  } ${lot.status === 'full' ? 'opacity-75' : ''}`}
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-semibold text-white">{lot.name}</h3>
                    <p className="text-slate-400 text-xs mt-0.5">{lot.address} • {lot.distance}</p>
                  </div>
                  <span className="text-white font-bold">
                    ${lot.rate.toFixed(2)}
                    <span className="text-slate-400 text-xs font-normal">/hr</span>
                  </span>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full bg-${getStatusColor(lot.status)}-500`}></span>
                    <span className={`text-${getStatusColor(lot.status)}-400 text-sm font-medium`}>
                      {getStatusText(lot)}
                    </span>
                  </div>
                  <div className="flex gap-2 text-slate-400 text-sm">
                    {lot.amenities.map(a => (
                      <span key={a} title={a}>
                        {a === 'covered' && '🏠'}
                        {a === 'ev' && '⚡'}
                        {a === 'security' && '📹'}
                        {a === 'handicap' && '♿'}
                        {a === '24/7' && '🕐'}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </aside>

        {/* Map */}
        <main className="flex-1 relative bg-slate-950 overflow-hidden">
          {/* Map Background */}
          <div className="absolute inset-0 bg-[#191a1a]" style={{
            backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)',
            backgroundSize: '100px 100px',
            opacity: 0.1
          }}></div>

          {/* Markers */}
          {parkingLots.map(lot => (
            <div
              key={lot.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10 hover:z-20"
              style={{ top: lot.position.top, left: lot.position.left }}
              onClick={() => setSelectedLotId(lot.id)}
            >
              <div className="flex flex-col items-center">
                {selectedLotId === lot.id && (
                  <div className="bg-gradient-to-r from-slate-800 to-slate-900 border border-cyan-500/50 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg mb-2 flex items-center gap-2 whitespace-nowrap animate-bounce">
                    ${lot.rate.toFixed(2)} <span className="w-[1px] h-3 bg-slate-600"></span> {lot.spotsTotal - lot.spotsBooked} Spots
                  </div>
                )}
                <div className={`relative ${selectedLotId === lot.id ? 'animate-pulse' : ''}`}>
                  {selectedLotId === lot.id && (
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#9333ea] opacity-75"></span>
                  )}
                  <div className={`relative inline-flex rounded-full h-8 px-3 items-center justify-center shadow-lg border-2 ${lot.status === 'full' ? 'bg-red-500 border-white' :
                      selectedLotId === lot.id ? 'bg-gradient-to-r from-purple-600 to-cyan-600 border-white' :
                        `bg-gradient-to-r from-slate-800 to-slate-900 border-${getStatusColor(lot.status)}-500`
                    }`}>
                    {lot.status === 'full' ? (
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <span className="text-white text-xs font-bold">P</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* User Location */}
          <div className="absolute top-[70%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
            <div className="relative flex items-center justify-center">
              <div className="absolute w-16 h-16 bg-[#9333ea]/20 rounded-full animate-pulse"></div>
              <div className="w-4 h-4 bg-[#9333ea] border-2 border-white rounded-full shadow-xl z-10"></div>
            </div>
          </div>

          {/* Detail Card */}
          {selectedLot && (
            <div
              className="absolute mt-12 transform -translate-x-1/2 z-30 w-72"
              style={{ top: selectedLot.position.top, left: selectedLot.position.left }}
            >
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-purple-500/20 rounded-xl shadow-2xl overflow-hidden">
                <div className="relative h-24 bg-gradient-to-r from-purple-600/30 to-cyan-600/30">
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent"></div>
                  <button
                    onClick={(e) => { e.stopPropagation(); setSelectedLotId(null); }}
                    className="absolute top-2 right-2 p-1 bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
                <div className="p-4 pt-2">
                  <h3 className="font-bold text-white text-lg">{selectedLot.name}</h3>
                  <p className="text-slate-300 text-sm mb-3">{selectedLot.address}</p>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex flex-col">
                      <span className="text-[10px] text-[#9dabb9] uppercase font-bold tracking-wider">Rate</span>
                      <span className="text-white font-medium">${selectedLot.rate.toFixed(2)}/hr</span>
                    </div>
                    <div className="w-[1px] h-8 bg-[#283039]"></div>
                    <div className="flex flex-col">
                      <span className="text-[10px] text-[#9dabb9] uppercase font-bold tracking-wider">Availability</span>
                      <span className="text-emerald-400 font-medium">{selectedLot.spotsTotal - selectedLot.spotsBooked} Spots</span>
                    </div>
                  </div>
                  <div className="flex gap-2 w-full">
                    <button className="flex-1 h-9 rounded-lg bg-[#9333ea] hover:bg-[#9333ea]/90 text-white font-semibold text-sm shadow-lg shadow-[#9333ea]/20" onClick={() => navigate('/parkingSlots', { state: { lotId: selectedLot.id } })}>
                      Reserve Spot
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
