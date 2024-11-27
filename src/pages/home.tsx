import { Alert, AlertTitle, Box, Card, Chip, Divider } from '@mui/material';
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
                    station={station}
                  />
                </li>
              );
            })}
          </ul>
          <Card elevation={0} className='flex w-full justify-evenly items-center'>
            <Box
              component="section"
              className="flex items-center text-white bg-dark-blue font-bold !text-xl uppercase py-3 px-3 my-5"
            >
              Total capacity: {station.capacity}kg
            </Box>
            <Box
              component="section"
              className="flex items-center text-white bg-dark-blue font-bold !text-xl uppercase py-3 px-3 my-5"
            >
              Volume used: {station.volume}kg
            </Box>
          </Card>
          <Station station={station}/>
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
