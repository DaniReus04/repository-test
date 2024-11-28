import { useEffect, useState } from 'react';
import useStations from '../hooks/useStations';
import useWasteMaterials from '../hooks/useWasteMaterials';
import IStation from '../interfaces/station';
import {
  Alert,
  Box,
  Button,
  Card,
  Chip,
  CircularProgress,
  Divider,
} from '@mui/material';
import WasteMaterialCard from '../components/wasteMaterialsCard';
import Typography from '@mui/material/Typography';
import Station from '../components/station';
import { IPickupHistory } from '../interfaces/pickup';
import usePickupHistory from '../hooks/usePickupHistory';
import PickupHistoryList from '../components/pickupHistoryList';
import { EAlertSeverity, IAlert } from '../interfaces/alert';
import AlertBox from '../components/alert';
import Wrapper from '../components/wrapper';

function Home() {
  const [stationsState, setStationsState] = useState<IStation[]>([]);
  const [pickupHistoryState, setPickupHistoryState] = useState<
    IPickupHistory[]
  >([]);
  const [alert, setAlert] = useState<IAlert>({
    open: false,
    message: '',
    severity: EAlertSeverity.Success,
  });

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
    //refresh: refreshWasteMaterials,
  } = useWasteMaterials();

  const {
    pickupHistory,
    loading: pickupHistoryLoading,
    syncError: syncPickupHistoryError,
    refresh: refreshPickupHistory,
  } = usePickupHistory();

  useEffect(() => {
    setStationsState(stations);
    setPickupHistoryState(pickupHistory);
  }, [stations, pickupHistory]);

  const handleConfirmPickup = (station: IStation) => {
    const updatedStations = [...stationsState];
    const stationIndex = updatedStations.findIndex((s) => s.id === station.id);

    if (stationIndex !== -1) {
      const updatedStation = { ...updatedStations[stationIndex] };

      updatedStations[stationIndex] = updatedStation;
      const body: IPickupHistory = {
        collectedAt: Date.now(),
        id: 6,
        stationId: updatedStation.id,
        storedWasteMaterials: updatedStation.storedWasteMaterials!,
        volume: updatedStation.volume,
      };
      setPickupHistoryState([...pickupHistoryState, body]);

      updatedStation.hasPendingPickup = false;
      updatedStation.storedWasteMaterials = [];
      updatedStation.volume = 0;
      setStationsState(updatedStations);

      setAlert({
        open: true,
        message: `Pickup confirmed for station ${updatedStation.id}.`,
        severity: EAlertSeverity.Success,
      });
    }
  };

  const handleCloseAlert = () => {
    setAlert({ ...alert, open: false });
  };

  if (syncStationError || syncWasteMaterialsError)
    return (
      <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <Alert
          severity="success"
          variant="outlined"
          color="warning"
          action={
            <Button
              color="inherit"
              size="small"
              variant="contained"
              onClick={() => refreshStations}
            >
              Refresh service
            </Button>
          }
        >
          {syncStationError}
        </Alert>
      </Box>
    );

  if (stationsLoading || wasteMaterialsLoading || pickupHistoryLoading) {
    return (
      <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <main className="w-full py-10">
      <Wrapper>
        <Typography
          component="div"
          className="flex justify-center text-dark-blue font-bold !text-3xl uppercase pb-10"
        >
          Waste materials stations control
        </Typography>
        {stationsState.map((station, stationIndex) => {
          const stationVolume = station.storedWasteMaterials
            ? station.storedWasteMaterials
                .map((item) => item.volume)
                .reduce((a, b) => a + b, 0)
            : 0;
          return (
            <div key={station.id} className="flex flex-col justify-center">
              <Typography
                component="div"
                className="flex justify-center text-light-blue font-bold !text-2xl uppercase py-5"
              >
                {`Station ${station.id}`}
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
                      className={`flex p-4 w-1/6 justify-center relative border-gray-400 box-border ${
                        index % itemsPerRow !== itemsPerRow - 1
                          ? 'border-r border-dashed'
                          : ''
                      } ${!isInLastRow ? 'border-b border-dashed' : ''}`}
                    >
                      <WasteMaterialCard
                        wasteMaterial={wasteMaterial}
                        storedVolume={storedMaterial?.volume}
                        station={station}
                        stationsState={stationsState}
                        setStationsState={setStationsState}
                      />
                    </li>
                  );
                })}
              </ul>
              <Card
                elevation={0}
                className="flex w-full justify-evenly items-center"
              >
                <Box
                  component="section"
                  className="flex items-center text-white bg-dark-blue font-bold !text-xl uppercase py-3 px-3 my-5 rounded border-2 border-back-blue shadow-md"
                >
                  {`Total capacity: ${station.capacity}kg`}
                </Box>
                <Box
                  component="section"
                  className="flex items-center text-white bg-dark-blue font-bold !text-xl uppercase py-3 px-3 my-5 rounded border-2 border-back-blue shadow-md"
                >
                  {`Volume used: ${stationVolume}kg`}
                </Box>
              </Card>
              {station.hasPendingPickup && (
                <Alert
                  severity="success"
                  variant="outlined"
                  color="warning"
                  className="my-4 flex items-center"
                  action={
                    <Button
                      color="warning"
                      size="small"
                      variant="contained"
                      onClick={() => handleConfirmPickup(station)}
                      className="whitespace-nowrap"
                    >
                      Confirm Pickup
                    </Button>
                  }
                >
                  <div>
                    Your storage has reached 80% capacity, and an automatic
                    collection request has been generated. Please confirm the
                    collection once it has been completed to update our records.
                  </div>
                </Alert>
              )}
              <Station
                stationCapacity={station.capacity}
                stationVolume={stationVolume}
              />
              {stationIndex < stationsState.length - 1 && (
                <Divider className="py-12">
                  <Chip size="medium" />
                </Divider>
              )}
            </div>
          );
        })}
        {pickupHistoryState && (
          <div>
            <Divider className="py-12">
              <Chip size="medium" />
            </Divider>
            <Typography
              component="div"
              className="flex justify-center text-light-blue font-bold !text-2xl uppercase py-5"
            >
              Pickup request history
            </Typography>
            <PickupHistoryList pickupHistoryState={pickupHistoryState} />
          </div>
        )}
        <AlertBox alert={alert} handleCloseAlert={handleCloseAlert} />
      </Wrapper>
    </main>
  );
}

export default Home;
