import IStation from '../interfaces/station';

const mockStations: IStation[] = [
  {
    id: 1,
    capacity: 2400,
    volume: 0,
    hasPendingPickup: false,
    storedWasteMaterials: [{ id: 7, volume: 520 }],
  },
  {
    id: 2,
    capacity: 1800,
    volume: 0,
    hasPendingPickup: false,
  },
  {
    id: 3,
    capacity: 2200,
    volume: 220,
    hasPendingPickup: false,
    storedWasteMaterials: [{ id: 2, volume: 220 }],
  },
];

export default mockStations;
