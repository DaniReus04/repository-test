import { Alert, AlertTitle, Box, Chip, Divider } from '@mui/material';
import useStations from '../hooks/useStations';
import useWasteMaterials from '../hooks/useWasteMaterials';
import WasteMaterialCard from '../components/wasteMaterialsCard';
import Typography from '@mui/material/Typography';
import Station from '../components/station';

function Home() {
  const {
    stations,
    loading: stationsLoading,
    syncError: syncStationError,
    refresh: refreshStations,
  } = useStations();

  const {
    wasteMaterials,
    loading: wasteMaterialsLoading,
    syncError: syncWasteMaterialsError,
    refresh: refreshWasteMaterials,
  } = useWasteMaterials();

  if (syncStationError)
    return (
      <Alert severity="error">
        <AlertTitle>{syncStationError}</AlertTitle>
      </Alert>
    );

  return (
    <div className="w-full px-80 py-10">
      <Typography
        component="div"
        className="flex justify-center text-dark-blue font-bold !text-3xl uppercase pb-10"
      >
        Waste materials stations control
      </Typography>
      {stations.map((station, stationIndex) => (
        <div key={station.id} className="flex flex-col justify-center">
          <Typography
            component="div"
            className="flex justify-center text-light-blue font-bold !text-2xl uppercase py-5"
          >
            Station {station.id}
          </Typography>
          <ul className="flex flex-wrap w-full justify-center items-center list-none">
            {wasteMaterials.map((wasteMaterial, index) => {
              const storedMaterial = station.storedWasteMaterials?.find(
                (stored) => stored.id === wasteMaterial.id,
              );
              const itemsPerRow = 6;
              const isInLastRow =
                index >=
                wasteMaterials.length -
                  (wasteMaterials.length % itemsPerRow || itemsPerRow);

              return (
                <li
                  key={wasteMaterial.id}
                  className={`flex p-4 w-1/6 justify-center relative border-gray-400 ${
                    index % itemsPerRow !== itemsPerRow - 1
                      ? 'border-r border-dashed'
                      : ''
                  } ${!isInLastRow ? 'border-b border-dashed' : ''}`}
                >
                  <WasteMaterialCard
                    wasteMaterial={wasteMaterial}
                    storedVolume={storedMaterial?.volume}
                  />
                </li>
              );
            })}
          </ul>
          <Box
            component="section"
            className="flex justify-center text-white bg-dark-blue font-bold !text-xl uppercase py-3 my-5"
          >
            Total capacity: {station.capacity}
          </Box>
          <Station />
          {stationIndex < stations.length - 1 && (
            <Divider className="py-12">
              <Chip size="medium" />
            </Divider>
          )}
        </div>
      ))}
    </div>
  );
}

export default Home;
