import { IPickupRequest, EPickupStatus } from '../interfaces/pickupRequest';

const mockPickupRequest: IPickupRequest = {
  id: 1,
  stationId: 1,
  requestAt: Date.now(),
  storedWasteMaterials: [
    { id: 1, volume: 550 },
    { id: 4, volume: 450 },
    { id: 7, volume: 980 },
  ],
  status: EPickupStatus.Completed,
};

export default mockPickupRequest;
