// import { AuthProvider } from "./context/AuthContext";// Helper to simulate delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));


export const api = {
    // Auth
    login: async (email, password) => {
        // await delay(500); // Temporarily remove delay for debugging
        const users = JSON.parse(localStorage.getItem('sp_users'));
        const user = users.find(u => u.email === email && u.password === password);
        if (!user) throw new Error('Invalid credentials');
        return { ...user, password: '' }; // Sanitize
    },

    register: async (userData) => {
        await delay(800);
        const users = JSON.parse(localStorage.getItem('sp_users'));
        if (users.find(u => u.email === userData.email)) {
            throw new Error('Email already exists');
        }
        const newUser = { ...userData, id: `u${Date.now()}`, role: 'user' };
        users.push(newUser);
        localStorage.setItem('sp_users', JSON.stringify(users));
        return newUser;
    },

    // Lots
    getLots: async () => {
        await delay(400);
        return JSON.parse(localStorage.getItem('sp_lots')) || [];
    },

    getLotById: async (id) => {
        await delay(300);
        const lots = JSON.parse(localStorage.getItem('sp_lots'));
        return lots.find(l => l.id === id);
    },

    // Bookings
    getUserBookings: async (userId) => {
        await delay(400);
        const bookings = JSON.parse(localStorage.getItem('sp_bookings'));
        return bookings.filter(b => b.userId === userId).sort((a, b) => new Date(b.startTime) - new Date(a.startTime));
    },

    createBooking: async (bookingData) => {
        await delay(1000);
        const bookings = JSON.parse(localStorage.getItem('sp_bookings'));
        const newBooking = {
            ...bookingData,
            id: `b${Date.now()}`,
            status: 'upcoming',
            createdAt: new Date().toISOString()
        };
        bookings.push(newBooking);
        localStorage.setItem('sp_bookings', JSON.stringify(bookings));

        // Update lot capacity (simplified)
        const lots = JSON.parse(localStorage.getItem('sp_lots'));
        const lotIndex = lots.findIndex(l => l.id === bookingData.lotId);
        if (lotIndex !== -1) {
            lots[lotIndex].spotsBooked += 1;
            lots[lotIndex].spotsLeft = lots[lotIndex].spotsTotal - lots[lotIndex].spotsBooked; // update derived
            // Update status if full
            if (lots[lotIndex].spotsBooked >= lots[lotIndex].spotsTotal) {
                lots[lotIndex].status = 'full';
            }
            localStorage.setItem('sp_lots', JSON.stringify(lots));
        }

        return newBooking;
    },

    // Admin
    getAllStats: async () => {
        await delay(600);
        const lots = JSON.parse(localStorage.getItem('sp_lots'));
        const bookings = JSON.parse(localStorage.getItem('sp_bookings'));

        const totalRevenue = bookings.reduce((sum, b) => sum + (b.totalAmount || 0), 0);
        const activeBookings = bookings.filter(b => b.status === 'upcoming' || b.status === 'active').length;
        const totalCapacity = lots.reduce((sum, l) => sum + l.spotsTotal, 0);
        const currentOccupancy = lots.reduce((sum, l) => sum + l.spotsBooked, 0);

        return {
            revenue: totalRevenue,
            activeBookings,
            totalCapacity,
            currentOccupancy,
            occupancyRate: Math.round((currentOccupancy / totalCapacity) * 100)
        };
    }
};
