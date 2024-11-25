import { IStoredWasteMaterials } from './wasteMaterials';

interface IStation {
  id: number;
  capacity: number;
  volume: number;
  hasPendingPickup: boolean;
  storedWasteMaterials?: IStoredWasteMaterials[];
}

export default IStation;
