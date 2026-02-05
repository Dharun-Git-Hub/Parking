// ==================== CONFIG ====================
const BASE_URL =
    "https://api.sheety.co/16e959ef3387605ab7b1f1bc96aa6262/parkingLotSheet";

const headers = {
    "Content-Type": "application/json",
};

const SheetyService = {

    getParkingMap: async () => {
        const res = await fetch(`${BASE_URL}/parkingMap`, { headers });
        const data = await res.json();
        return data.parkingMap.map((lot) => ({
            id: lot.id,
            name: lot.name,
            address: lot.address,
            distance: lot.distance,
            rate: Number(lot.rate),
            status: lot.status,
            spotsTotal: Number(lot.spotsTotal),
            spotsBooked: Number(lot.spotsBooked),

            amenities: JSON.parse(lot.amenities),
            position: JSON.parse(lot.position),
        }));
    },

    getParkingSlots: async () => {
        const res = await fetch(
            `${BASE_URL}/parkingSlots`,
            { headers },
        );

        const data = await res.json();
        console.log('Slots: ',data)

        return data.parkingSlots.map((slot) => ({
            id: slot.id,
            section: slot.section,
            status: slot.status,
            ev: slot.ev === true || slot.ev === "TRUE",
        }));
    },

    updateSlotStatus: async (slotId, status) => {
        console.log(slotId, status)
        const res = await fetch(`${BASE_URL}/parkingSlots/${slotId}`, {
            method: "PUT",
            headers,
            body: JSON.stringify({
                parkingslot: { status },
            }),
        });
        
        console.log(res)
        const data = await res.json();
        console.log('Update Status: ',data)
        return data
    },

    // ==================== USERS ====================

    getParkingUsers: async () => {
        const res = await fetch(`${BASE_URL}/parkingUsers`, { headers });
        if (!res.ok) throw new Error("Failed to fetch users");
        return res.json();
    },

    registerUser: async (userData) => {
        const res = await fetch(`${BASE_URL}/parkingUsers`, {
            method: "POST",
            headers,
            body: JSON.stringify({
                parkinguser: {
                    name: userData.name,
                    email: userData.email,
                    password: userData.password,
                    role: userData.role || "user",
                    createdAt: new Date().toISOString(),
                },
            }),
        });
        console.log(res);
        if (!res.ok) {
            const text = await res.text();
            throw new Error(text || "User registration failed");
        }

        return res.json();
    },

    loginUser: async (email, password) => {
        const res = await fetch(`${BASE_URL}/parkingUsers`, { headers });
        if (!res.ok) throw new Error("Login failed");

        const data = await res.json();
        const users = data.parkingUsers || [];
        console.log("Users: ", users);
        const user = users.find(
            (u) => u.email === email && u.password === password,
        );
        if (!user) throw new Error("Invalid email or password");
        return user;
    },

    getUserByEmail: async (email) => {
        const res = await fetch(`${BASE_URL}/parkingUsers`, { headers });
        if (!res.ok) throw new Error("Failed to fetch user");

        const data = await res.json();
        const users = data.parkingUsers || [];

        return users.find((u) => u.email === email);
    },

    getAllUsers: async () => {
        const res = await fetch(`${BASE_URL}/parkingUsers`, { headers });
        if (!res.ok) throw new Error("Failed to fetch users");
        return res.json();
    },

    updateUser: async (userId, userData) => {
        const res = await fetch(`${BASE_URL}/parkingUsers/${userId}`, {
            method: "PUT",
            headers,
            body: JSON.stringify({
                parkingUser: userData,
            }),
        });
        if (!res.ok) throw new Error("Failed to update user");
        return res.json();
    },

    deleteUser: async (userId) => {
        const res = await fetch(`${BASE_URL}/parkingUsers/${userId}`, {
            method: "DELETE",
            headers,
        });
        if (!res.ok) throw new Error("Failed to delete user");
        return res.json();
    },

    // ==================== BOOKINGS ====================

    getBookings: async () => {
        const res = await fetch(`${BASE_URL}/bookings`, { headers });
        if (!res.ok) throw new Error("Failed to fetch bookings");
        const data = await res.json();
        console.log('Data: ',data)
        return data
    },

    createBooking: async (bookingData) => {
        console.log('Booking: ',bookingData)
        const res = await fetch(`${BASE_URL}/bookings`, {
            method: "POST",
            headers,
            body: JSON.stringify({
                booking: {
                    ...bookingData,
                    status: "confirmed",
                    createdAt: new Date().toISOString(),
                },
            }),
        });
        if (!res.ok) throw new Error("Booking failed");
        const data = await res.json();
        console.log("Booking Data: ",data)
        return data
    },

    getUserBookings: async (userId) => {
        const res = await fetch(`${BASE_URL}/bookings`, { headers });
        if (!res.ok) throw new Error("Failed to fetch bookings");

        const data = await res.json();
        const bookings = data.bookings || [];

        return bookings.filter((b) => b.userId === userId);
    },

    cancelBooking: async (bookingId) => {
        const res = await fetch(`${BASE_URL}/bookings/${bookingId}`, {
            method: "PUT",
            headers,
            body: JSON.stringify({
                booking: {
                    status: "cancelled",
                    updatedAt: new Date().toISOString(),
                },
            }),
        });
        if (!res.ok) throw new Error("Cancel booking failed");
        return res.json();
    },

    // ==================== PAYMENTS ====================

    getPayments: async () => {
        const res = await fetch(`${BASE_URL}/payments`, { headers });
        if (!res.ok) throw new Error("Failed to fetch payments");
        return res.json();
    },

    createPayment: async (paymentData) => {
        const res = await fetch(`${BASE_URL}/payments`, {
            method: "POST",
            headers,
            body: JSON.stringify({
                payment: {
                    ...paymentData,
                    status: "completed",
                    createdAt: new Date().toISOString(),
                },
            }),
        });
        if (!res.ok) throw new Error("Payment failed");
        return res.json();
    },
};

export default SheetyService;
