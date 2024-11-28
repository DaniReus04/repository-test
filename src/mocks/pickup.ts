import { IPickupHistory } from '../interfaces/pickup';

const mockPickupHistory: IPickupHistory[] = [
  {
    id: 1,
    stationId: 1,
    collectedAt: Number(new Date(2024, 10, 11)),
    volume: 1780,
    storedWasteMaterials: [
      { id: 1, volume: 550 },
      { id: 4, volume: 750 },
      { id: 7, volume: 480 },
    ],
  },
  {
    id: 2,
    stationId: 2,
    collectedAt: Number(new Date(2024, 10, 13)),
    volume: 1680,
    storedWasteMaterials: [
      { id: 1, volume: 550 },
      { id: 7, volume: 450 },
      { id: 8, volume: 680 },
    ],
  },
  {
    id: 3,
    stationId: 1,
    collectedAt: Number(new Date(2024, 10, 14)),
    volume: 1980,
    storedWasteMaterials: [
      { id: 1, volume: 550 },
      { id: 4, volume: 450 },
      { id: 7, volume: 980 },
    ],
  },
  {
    id: 4,
    stationId: 3,
    collectedAt: Number(new Date(2024, 10, 18)),
    volume: 1580,
    storedWasteMaterials: [
      { id: 1, volume: 550 },
      { id: 3, volume: 750 },
      { id: 5, volume: 280 },
    ],
  },
  {
    id: 5,
    stationId: 1,
    collectedAt: Number(new Date(2024, 10, 20)),
    volume: 2080,
    storedWasteMaterials: [
      { id: 1, volume: 150 },
      { id: 4, volume: 150 },
      { id: 2, volume: 1780 },
    ],
  },
];

export default mockPickupHistory;
