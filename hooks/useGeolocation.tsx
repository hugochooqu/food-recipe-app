import { useEffect, useState } from "react"

interface Coordinates {
    latitude: number;
    longitude: number;
}

export const useGeolocation = () => {
    const [location, setLocation] = useState<Coordinates | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if(!navigator.geolocation) {
            setError("Geolocation is not supported by your browser");
            setLoading(false)
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                setLocation({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                })
                setLoading(false);
            },
            (err) => {
                setError("Failed to retrieve location. Please enable your location")
                setLoading(false)
            }
        );
    }, [])

    return {location, loading, error}
}