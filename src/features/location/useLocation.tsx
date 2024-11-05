import { useState, useEffect } from 'react';

interface Location {
    latitude: number;
    longitude: number;
}

export const useLocation = (): { location: Location | null, error: string | null } => {
    const [location, setLocation] = useState<Location | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!navigator.geolocation) {
            setError('Geolocation is not supported by your browser');
            return;
        }

        const success = (position: GeolocationPosition) => {
            const { latitude, longitude } = position.coords;
            setLocation({ latitude, longitude });
        };

        const error = () => {
            setError('Unable to retrieve your location');
        };

        navigator.geolocation.getCurrentPosition(success, error);
    }, []);

    return { location, error };
};

export default useLocation;