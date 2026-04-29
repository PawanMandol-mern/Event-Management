    /* eslint-disable react-refresh/only-export-components */
    import axios from "axios";
    import { createContext, useContext, useEffect, useState } from "react";

    const AuthContext = createContext();

    export const AuthProvider = ({ children }) => {
    const [event, setEvent] = useState([]);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const [eventLoaded, setEventLoaded] = useState(false);
    const [user, setUser] = useState(null);

    // Logout
    const logout = async () => {
        try {
        await axios.get("http://localhost:4000/api/users/logout", {
            withCredentials: true,
        });
        setIsAuthenticated(false);
        setUser(null);
        } catch (error) {
        console.log("Error in logout:", error);
        }
    };

    // Check authentication (on page load)
    const checkAuth = async () => {
        try {
        const { data } = await axios.get("http://localhost:4000/api/users/me", {
            withCredentials: true,
        });
        setUser(data.user);
        setIsAuthenticated(true);
        } catch (error) {
        console.log("Auth check failed:", error);
        setIsAuthenticated(false);
        setUser(null);
        }
    };

    // Fetch events
    const fetchEvent = async () => {
        try {
        const { data } = await axios.get(
            "http://localhost:4000/api/events/all-events",
            { withCredentials: true }
        );
        setEvent(data.event);
        setEventLoaded(true);
        } catch (error) {
        console.log("Error in fetchEvents", error);
        setEventLoaded(true);
        }
    };

    useEffect(() => {
        const initializeAuth = async () => {
        try {
            setLoading(true);
            await Promise.all([fetchEvent(), checkAuth()]);
        } catch (error) {
            console.log("Init error:", error);
        } finally {
            setLoading(false);
        }
        };
        initializeAuth();
    }, []);

    return (
        <AuthContext.Provider
        value={{
            event,
            logout,
            isAuthenticated,
            loading,
            eventLoaded,
            fetchEvent,
            user,
            setUser,
            setIsAuthenticated,
        }}
        >
        {children}
        </AuthContext.Provider>
    );
    };

    export const useAuth = () => useContext(AuthContext);