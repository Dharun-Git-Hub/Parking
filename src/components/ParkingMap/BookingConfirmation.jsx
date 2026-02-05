import React from 'react';

export default function BookingConfirmation() {

  const bookingDetails = {
    location: 'Central Plaza Garage',
    address: '123 Main St, New York',
    slot: 'A-42',
    level: 'Lvl 1',
    vehicle: 'ABC-1234',
    entryTime: '09:00 AM',
    exitTime: '05:00 PM',
    date: 'Oct 24, 2023',
    duration: '8 Hours',
    total: '$24.00',
    paymentMethod: 'Visa ending in 4242'
  };

  return (
    <div className="bg-gradient-to-br from-slate-950 via-purple-950/20 to-slate-950 text-white w-screen h-screen flex flex-col overflow-hidden">
      {/* Header */}
      <header className="flex items-center justify-between border-b border-purple-500/20 px-6 lg:px-10 py-3 bg-gradient-to-r from-slate-900 via-purple-900/20 to-slate-900 sticky top-0 z-50 flex-shrink-0">
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 flex items-center justify-center bg-gradient-to-r from-purple-600 to-cyan-600 rounded-lg">
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M13 3L6 8v13h5v-6h2v6h5V8l-5-5z"/>
            </svg>
          </div>
          <h2 className="text-lg font-bold">SmartPark</h2>
        </div>
        <div className="flex flex-1 justify-end gap-8">
          <nav className="hidden md:flex items-center gap-9">
            <a className="text-sm font-medium text-slate-400 hover:text-cyan-400 transition-colors" href="/dashboard">Dashboard</a>
            <a className="text-sm font-medium text-white" href="my-bookings">My Bookings</a>
            <a className="text-sm font-medium text-slate-400 hover:text-cyan-400 transition-colors" href="#">Support</a>
          </nav>
          <div className="w-10 h-10 rounded-full border border-gray-200 dark:border-gray-700 overflow-hidden">
            <img src="https://sohohindipro.com/wp-content/uploads/2022/11/14_girls-dp-sohohindipro.com_-1024x1024.jpg" alt="Profile" className="w-full h-full"/>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-start p-6 lg:p-10 overflow-y-auto w-full">
        {/* Status Banner */}
        <div className="w-full max-w-6xl mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-500/20 text-green-500">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                </div>
                <h1 className="text-3xl md:text-4xl font-black">Booking Confirmed</h1>
              </div>
              <p className="text-slate-400 text-base md:pl-11">
                Your space at <span className="font-semibold text-white">{bookingDetails.location}</span> is reserved.
              </p>
            </div>
            <div className="flex gap-3">
              <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-white text-sm font-medium transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"/>
                </svg>
                Share
              </button>
              <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white text-sm font-medium shadow-lg shadow-purple-500/20">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
                </svg>
                Download Receipt
              </button>
            </div>
          </div>
        </div>

        {/* Main Content Layout */}
        <div className="w-full max-w-6xl flex flex-col lg:flex-row gap-6 items-start">
          {/* Left Column - Digital Ticket */}
          <div className="w-full lg:w-1/3 flex flex-col gap-4">
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 shadow-sm border border-purple-500/20 relative overflow-hidden">
              {/* Top gradient */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-600 to-cyan-600"></div>
              
              {/* Ticket Header */}
              <div className="flex justify-between items-start mb-6">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Entry Pass</p>
                  <h3 className="text-xl font-bold text-white">Central Plaza</h3>
                </div>
                <div className="bg-purple-600/20 text-purple-300 px-3 py-1 rounded-full text-xs font-bold uppercase">
                  Paid
                </div>
              </div>

              {/* QR Code */}
              <div className="flex flex-col items-center justify-center py-6 bg-white dark:bg-slate-900 rounded-xl border-2 border-dashed border-purple-500/20 mb-6 relative">
                <div className="w-48 h-48 bg-white p-2 rounded">
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    <rect width="100" height="100" fill="white"/>
                    {/* QR code pattern */}
                    <g fill="black">
                      <rect x="10" y="10" width="8" height="8"/>
                      <rect x="26" y="10" width="8" height="8"/>
                      <rect x="42" y="10" width="8" height="8"/>
                      <rect x="66" y="10" width="8" height="8"/>
                      <rect x="82" y="10" width="8" height="8"/>
                      <rect x="10" y="18" width="8" height="8"/>
                      <rect x="42" y="18" width="8" height="8"/>
                      <rect x="66" y="18" width="8" height="8"/>
                      <rect x="10" y="26" width="8" height="8"/>
                      <rect x="34" y="26" width="8" height="8"/>
                      <rect x="50" y="26" width="8" height="8"/>
                      <rect x="74" y="26" width="8" height="8"/>
                      <rect x="82" y="26" width="8" height="8"/>
                      <rect x="18" y="34" width="8" height="8"/>
                      <rect x="42" y="34" width="8" height="8"/>
                      <rect x="58" y="34" width="8" height="8"/>
                      <rect x="10" y="42" width="8" height="8"/>
                      <rect x="26" y="42" width="8" height="8"/>
                      <rect x="50" y="42" width="8" height="8"/>
                      <rect x="66" y="42" width="8" height="8"/>
                      <rect x="82" y="42" width="8" height="8"/>
                      <rect x="34" y="50" width="8" height="8"/>
                      <rect x="58" y="50" width="8" height="8"/>
                      <rect x="74" y="50" width="8" height="8"/>
                      <rect x="10" y="58" width="8" height="8"/>
                      <rect x="26" y="58" width="8" height="8"/>
                      <rect x="50" y="58" width="8" height="8"/>
                      <rect x="82" y="58" width="8" height="8"/>
                      <rect x="18" y="66" width="8" height="8"/>
                      <rect x="42" y="66" width="8" height="8"/>
                      <rect x="66" y="66" width="8" height="8"/>
                      <rect x="10" y="74" width="8" height="8"/>
                      <rect x="34" y="74" width="8" height="8"/>
                      <rect x="58" y="74" width="8" height="8"/>
                      <rect x="74" y="74" width="8" height="8"/>
                      <rect x="26" y="82" width="8" height="8"/>
                      <rect x="42" y="82" width="8" height="8"/>
                      <rect x="66" y="82" width="8" height="8"/>
                      <rect x="82" y="82" width="8" height="8"/>
                    </g>
                  </svg>
                </div>
                <p className="mt-3 text-sm font-medium text-gray-500">Scan at Gate 2</p>
              </div>

              {/* Key Stats */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex flex-col p-3 bg-gray-50 dark:bg-[#111418] rounded-lg border border-gray-100 dark:border-[#283039]">
                  <span className="text-xs text-gray-500 dark:text-[#9dabb9]">Slot Number</span>
                  <span className="text-2xl font-bold text-[#9333ea]">{bookingDetails.slot}</span>
                </div>
                <div className="flex flex-col p-3 bg-gray-50 dark:bg-[#111418] rounded-lg border border-gray-100 dark:border-[#283039]">
                  <span className="text-xs text-gray-500 dark:text-[#9dabb9]">Floor Level</span>
                  <span className="text-2xl font-bold">{bookingDetails.level}</span>
                </div>
              </div>

              {/* Vehicle Info */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-[#283039]">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99z"/>
                  </svg>
                  <span className="text-sm text-gray-500 dark:text-[#9dabb9]">Vehicle</span>
                </div>
                <span className="font-mono font-bold text-base tracking-wider">{bookingDetails.vehicle}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="bg-white dark:bg-[#1c2127] rounded-xl p-4 shadow-sm border border-gray-100 dark:border-[#283039] flex flex-col gap-2">
              <button className="w-full py-2.5 px-4 rounded-lg border border-gray-200 dark:border-[#3b4754] hover:bg-gray-50 dark:hover:bg-[#283039] text-sm font-medium flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
                </svg>
                Modify Booking
              </button>
              <button className="w-full py-2.5 px-4 rounded-lg border border-red-200 dark:border-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/10 text-sm font-medium flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"/>
                </svg>
                Cancel Booking
              </button>
            </div>
          </div>

          {/* Right Column */}
          <div className="w-full lg:w-2/3 flex flex-col gap-6">
            {/* Timeline Card */}
            <div className="bg-white dark:bg-[#1c2127] rounded-2xl p-6 lg:p-8 shadow-sm border border-gray-100 dark:border-[#283039]">
              <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                <svg className="w-6 h-6 text-[#9333ea]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
                </svg>
                Booking Itinerary
              </h3>

              <div className="flex flex-col gap-8">
                {/* Entry */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-2 lg:gap-4">
                  <div className="flex flex-col lg:w-1/3">
                    <span className="text-xs font-semibold uppercase text-gray-400 dark:text-[#9dabb9] mb-1">Entry Time</span>
                    <div className="text-xl font-bold">{bookingDetails.entryTime}</div>
                    <div className="text-sm text-gray-500">{bookingDetails.date}</div>
                  </div>
                  <div className="hidden lg:flex items-center justify-center flex-1">
                    <div className="h-[1px] w-full bg-gray-200 dark:bg-[#3b4754] relative">
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-2 bg-white dark:bg-[#1c2127] text-xs font-medium text-gray-400 whitespace-nowrap">
                        {bookingDetails.duration} Duration
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col lg:items-end lg:w-1/3 mt-2 lg:mt-0">
                    <div className="lg:text-right">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">{bookingDetails.location}</div>
                      <div className="text-xs text-gray-500">{bookingDetails.address}</div>
                    </div>
                  </div>
                </div>

                {/* Exit */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-2 lg:gap-4">
                  <div className="flex flex-col lg:w-1/3">
                    <span className="text-xs font-semibold uppercase text-gray-400 dark:text-[#9dabb9] mb-1">Exit Time</span>
                    <div className="text-xl font-bold">{bookingDetails.exitTime}</div>
                    <div className="text-sm text-gray-500">{bookingDetails.date}</div>
                  </div>
                  <div className="hidden lg:block flex-1"></div>
                  <div className="flex flex-col lg:items-end lg:w-1/3 mt-2 lg:mt-0">
                    <div className="lg:text-right">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">Exit via Gate 2</div>
                      <div className="text-xs text-gray-500">Show QR at barrier</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Cost Summary */}
              <div className="mt-8 pt-6 border-t border-gray-100 dark:border-[#283039]">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-500 dark:text-[#9dabb9]">Total Paid</span>
                    <span className="text-xs text-gray-400">{bookingDetails.paymentMethod}</span>
                  </div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">{bookingDetails.total}</div>
                </div>
              </div>
            </div>

            {/* Location Map */}
            <div className="bg-white dark:bg-[#1c2127] rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-[#283039]">
              <div className="flex items-center justify-between mb-4 px-2">
                <h3 className="text-base font-bold flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#9333ea]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.5 3l-.16.03L15 5.1 9 3 3.36 4.9c-.21.07-.36.25-.36.48V20.5c0 .28.22.5.5.5l.16-.03L9 18.9l6 2.1 5.64-1.9c.21-.07.36-.25.36-.48V3.5c0-.28-.22-.5-.5-.5zM15 19l-6-2.11V5l6 2.11V19z"/>
                  </svg>
                  Location
                </h3>
                <a className="text-sm text-[#9333ea] font-medium hover:underline flex items-center gap-1" href="#">
                  Get Directions
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"/>
                  </svg>
                </a>
              </div>
              <div className="relative w-full h-48 lg:h-64 rounded-xl overflow-hidden bg-gray-300 dark:bg-gray-700">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-300 to-gray-400 dark:from-gray-700 dark:to-gray-800"></div>
                {/* Map Pin */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                  <svg className="w-12 h-12 text-red-500 drop-shadow-md" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                  </svg>
                  <span className="bg-white text-black text-xs font-bold px-2 py-1 rounded shadow-lg mt-1">Entrance A</span>
                </div>
                {/* Map Controls */}
                <div className="absolute bottom-3 right-3 flex flex-col gap-2">
                  <button className="w-8 h-8 bg-white dark:bg-[#111418] rounded shadow flex items-center justify-center hover:bg-gray-100 dark:hover:bg-[#283039]">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
                    </svg>
                  </button>
                  <button className="w-8 h-8 bg-white dark:bg-[#111418] rounded shadow flex items-center justify-center hover:bg-gray-100 dark:hover:bg-[#283039]">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 13H5v-2h14v2z"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}