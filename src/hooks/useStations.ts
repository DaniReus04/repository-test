import { useEffect, useState } from 'react';
import fetchStations from '../services/stations';
import IStation from '../interfaces/station';

const useStations = () => {
  const [stations, setStations] = useState<IStation[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [syncError, setSyncError] = useState<string>('');

  const stationsSync = async () => {
    setLoading(true);
    try {
      const data = await fetchStations();
      setStations(data);
    } catch (error) {
      console.error('Error while fetching the stations:', error);
      setSyncError('Failed to fetch stations');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    stationsSync();
  }, []);

  return {
    stations,
    loading,
    syncError,
    refresh: stationsSync,
  };
};

export default useStations;
