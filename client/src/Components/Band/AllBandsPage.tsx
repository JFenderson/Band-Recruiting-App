import React, { useEffect, useState } from 'react';
import { getBands } from '../../services/bandService';
import { Band } from '../../models/Band';

const AllBandsPage: React.FC = () => {
    const [bands, setBands] = useState<Band[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchBands = async () => {
            try {
                const data = await getBands();
                setBands(data);
            } catch (err) {
                setError('Error fetching bands');
            } finally {
                setLoading(false);
            }
        };
        fetchBands();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <h1>Bands</h1>
            <ul>
                {bands.map((band) => (
                    <li key={band.bandId}>{band.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default AllBandsPage;