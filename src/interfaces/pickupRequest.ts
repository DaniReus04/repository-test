import { IStoredWasteMaterials } from './wasteMaterials';

export enum EPickupStatus {
  Pending = 'Pending',
  Completed = 'Completed',
}

export interface IPickupRequest {
  id: number;
  stationId: number;
  requestAt: number;
  storedWasteMaterials: IStoredWasteMaterials[];
  status: EPickupStatus;
}
