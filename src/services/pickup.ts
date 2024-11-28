import { IPickupHistory } from '../interfaces/pickup';
import mockPickupHistory from '../mocks/pickup';

const fetchPickupHistory = async (): Promise<IPickupHistory[]> => new Promise((resolve) => {
  setTimeout(() => {
    resolve(mockPickupHistory);
  }, 1000);
});

export default fetchPickupHistory;
