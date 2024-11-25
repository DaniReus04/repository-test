import { useEffect, useState } from 'react';
import fetchWasteMaterials from '../services/wasteMaterials';
import { IWasteMaterials } from '../interfaces/wasteMaterials';

const useWasteMaterials = () => {
  const [wasteMaterials, setWasteMaterials] = useState<IWasteMaterials[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [syncError, setSyncError] = useState<string | null>(null);

  const wasteMaterialsSync = async () => {
    setLoading(true);
    try {
      const data = await fetchWasteMaterials();
      setWasteMaterials(data);
    } catch (error) {
      console.error('Error while fetching waste materials:', error);
      setSyncError('Failed to fetch waste materials');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    wasteMaterialsSync();
  }, []);

  return {
    wasteMaterials,
    loading,
    syncError,
    refresh: wasteMaterialsSync,
  };
};

export default useWasteMaterials;
