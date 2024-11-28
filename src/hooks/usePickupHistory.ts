import { useEffect, useState } from 'react';
import { IPickupHistory } from '../interfaces/pickup';
import fetchPickupHistory from '../services/pickup';

const usePickupHistory = () => {
  const [pickupHistory, setPickupHistory] = useState<IPickupHistory[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [syncError, setSyncError] = useState<string>('');

  const pickupHistorySync = async () => {
    setLoading(true);
    try {
      const data = await fetchPickupHistory();
      setPickupHistory(data);
    } catch (error) {
      console.error('Error while fetching the pickup request:', error);
      setSyncError('Error while fetching the pickup request');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    pickupHistorySync();
  }, []);

  return {
    pickupHistory,
    loading,
    syncError,
    refresh: pickupHistorySync,
  };
};

export default usePickupHistory;
