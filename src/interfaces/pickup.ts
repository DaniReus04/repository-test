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

export interface IPickupHistory {
  id: number;
  stationId: number;
  collectedAt: number;
  volume: number;
  storedWasteMaterials: IStoredWasteMaterials[];
}
