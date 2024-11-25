import { IWasteMaterials } from '../interfaces/wasteMaterials';
import mockWasteMaterials from '../mocks/wasteMaterials';

const fetchWasteMaterials = async (): Promise<IWasteMaterials[]> => new Promise((resolve) => {
  setTimeout(() => {
    resolve(mockWasteMaterials);
  }, 1000);
});

export default fetchWasteMaterials;
