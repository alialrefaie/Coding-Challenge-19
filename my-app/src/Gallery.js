import React, { useState, useEffect } from 'react';
import Tour from './Tour';
import './Gallery.css';

const Gallery = () => {
    const [tours, setTours] = useState ([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('https://course-api.com/react-tours-project')
        .then(response => response.json())
        .then(data => {
            setTours(data);
            setLoading(false);
        })
        .catch(error => {
            setError(error.toString());
            setLoading(false);
        });
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="gallery">
            {tours.map(tour => (
                <Tour key={tour.id} {...tour} removeTour={() => setTours(prevTours => prevTours.filter(t => t.id !== tour.id))} />
            ))}
        </div>
    );
};

export default Gallery;