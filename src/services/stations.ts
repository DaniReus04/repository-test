import IStation from '../interfaces/station';
import mockStations from '../mocks/stations';

const fetchStations = async (): Promise<IStation[]> => new Promise((resolve) => {
  setTimeout(() => {
    resolve(mockStations);
  }, 1000);
});

export default fetchStations;
