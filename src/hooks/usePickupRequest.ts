import { useEffect, useState } from 'react';
import fetchPickupRequest from '../services/pickupRequest';
import { IPickupRequest } from '../interfaces/pickupRequest';

const usePickupRequest = () => {
  const [pickupRequest, setPickupRequest] = useState<IPickupRequest | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [syncError, setSyncError] = useState<string>('');

  const pickupRequestSync = async () => {
    setLoading(true);
    try {
      const data = await fetchPickupRequest();
      setPickupRequest(data);
    } catch (error) {
      console.error('Error while fetching the pickup request:', error);
      setSyncError('Error while fetching the pickup request');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    pickupRequestSync();
  }, []);

  return {
    pickupRequest,
    loading,
    syncError,
    refresh: pickupRequestSync,
  };
};

export default usePickupRequest;
