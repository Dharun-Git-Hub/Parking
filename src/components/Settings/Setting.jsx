import React, { useState } from 'react';
import Header from '../Layout/Header';

export default function Settings() {
    const [notifications, setNotifications] = useState({
        email: true,
        push: true,
        promo: false
    });

    return (
        <div className="w-screen h-screen bg-gradient-to-br from-slate-950 via-purple-950/20 to-slate-950 text-white flex flex-col overflow-hidden">
            <Header />
            <main className="flex-1 p-6 md:p-8 overflow-y-auto w-full">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-3xl font-bold mb-8">Settings</h1>

                    <div className="space-y-6">
                        <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-xl border border-purple-500/20">
                            <h2 className="text-xl font-bold mb-4 text-white">Notifications</h2>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="font-medium text-white">Email Notifications</div>
                                        <div className="text-sm text-slate-400">Receive booking confirmations via email</div>
                                    </div>
                                    <button
                                        onClick={() => setNotifications(p => ({ ...p, email: !p.email }))}
                                        className={`w-12 h-6 rounded-full transition-colors relative ${notifications.email ? 'bg-gradient-to-r from-purple-600 to-cyan-600' : 'bg-slate-700'}`}
                                    >
                                        <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${notifications.email ? 'left-7' : 'left-1'}`}></div>
                                    </button>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="font-medium text-white">Push Notifications</div>
                                        <div className="text-sm text-slate-400">Get reminded before your booking ends</div>
                                    </div>
                                    <button
                                        onClick={() => setNotifications(p => ({ ...p, push: !p.push }))}
                                        className={`w-12 h-6 rounded-full transition-colors relative ${notifications.push ? 'bg-gradient-to-r from-purple-600 to-cyan-600' : 'bg-slate-700'}`}
                                    >
                                        <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${notifications.push ? 'left-7' : 'left-1'}`}></div>
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-xl border border-red-500/20">
                            <h2 className="text-xl font-bold mb-4 text-white">Account</h2>
                            <button className="text-red-400 hover:text-red-300 font-medium transition-colors">Delete Account</button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
