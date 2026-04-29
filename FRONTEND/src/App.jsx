import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Regiseter from './pages/Regiseter'
import Login from './pages/Login'
import Navigation from './components/Navigation'
import { Toaster } from "react-hot-toast"
import Home from './pages/Home'
import Event from './pages/Event'
import Dashboard from './Admin/Dashboard'
import BookingEvents from './pages/BookingEvents'
import Success from './pages/Success'
import About from './pages/About'
import Contact from './pages/Contact'
import BookedEvents from './pages/BookedEvents'
import ProtectAdminRoutes from './Admin/ProtectAdminRoutes'
import AcceptEvent from './Admin/AcceptEvent'
import CreateEvent from './Admin/CreateEvent'
import UpdateEvent from './Admin/UpdateEvent'
import DeleteEvent from './Admin/DeleteEvent'

    const App = () => {
    return (
        <div>
            <Toaster />
            <Navigation />
        <Routes >
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Regiseter />} />
            <Route path="/login" element={<Login />} />
            <Route path="/events" element={<Event />} />
            <Route path="/booked-events" element={<BookedEvents />} />
            <Route path="/success" element={<Success />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/booking-events/:id" element={<BookingEvents />} />

            {/* Admin only route */}

            <Route path="/dashboard" element={
            <ProtectAdminRoutes adminOnly={true}>
                <Dashboard />
            </ProtectAdminRoutes>
            }>
            {/* Nested routes: remove leading / */}
            <Route path="create-event" element={<CreateEvent />} />
            <Route path="update-event" element={<UpdateEvent />} />
            <Route path="delete-event" element={<DeleteEvent />} />
            <Route path="accept-event" element={<AcceptEvent />} />
        </Route>
        </Routes>
        </div>
    )
    }

    export default App
