import { IPickupRequest } from '../interfaces/pickupRequest';
import mockPickupRequest from '../mocks/pickupRequest';

const fetchPickupRequest = async (): Promise<IPickupRequest> => new Promise((resolve) => {
  setTimeout(() => {
    resolve(mockPickupRequest);
  }, 1000);
});

export default fetchPickupRequest;
