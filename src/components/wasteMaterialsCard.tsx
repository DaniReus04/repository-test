import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import IsoIcon from '@mui/icons-material/Iso';
import { IStoredWasteMaterials, IWasteMaterial } from '../interfaces/wasteMaterials';
import { PhosphorIcon } from './phosphorIcon';
import CardActionArea from '@mui/material/CardActionArea';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import AddWasteMaterialModal from './addWasteMaterialModal';
import IStation from '../interfaces/station';

interface IWasteMaterialCardProps {
  wasteMaterial: IWasteMaterial;
  storedVolume: number | undefined;
  station: IStation;
  stationsState: IStation[];
  setStationsState: Dispatch<SetStateAction<IStation[]>>
};

function WasteMaterialCard({
  wasteMaterial,
  storedVolume,
  station,
  stationsState,
  setStationsState,
}: IWasteMaterialCardProps) {
  const [openModifyModal, setOpenModifyModal] = useState<boolean>(false);
  const [wasteMaterialVolume, setWasteMaterialVolume] = useState<IStoredWasteMaterials | null>(null);

  useEffect(() => {
    if (wasteMaterialVolume) {
      const updatedStations = [...stationsState];
  
      const stationIndex = updatedStations.findIndex((s) => s.id === station.id);
      if (stationIndex !== -1) {
        const updatedStation = { ...updatedStations[stationIndex] };
  
        if (!updatedStation.storedWasteMaterials) {
          updatedStation.storedWasteMaterials = [];
        }
  
        const materialIndex = updatedStation.storedWasteMaterials.findIndex(
          (material) => material.id === wasteMaterialVolume.id
        );
  
        if (materialIndex !== -1) {
          updatedStation.storedWasteMaterials[materialIndex].volume = wasteMaterialVolume.volume;
        } else {
          updatedStation.storedWasteMaterials.push(wasteMaterialVolume);
        }

        const totalVolumeUsed = updatedStation.storedWasteMaterials.reduce(
          (acc, material) => acc + material.volume,
          0
        );
        updatedStation.volume = totalVolumeUsed;
  
        if (totalVolumeUsed >= 0.8 * updatedStation.capacity) {
          updatedStation.hasPendingPickup = true;
        } else {
          updatedStation.hasPendingPickup = false;
        }
  
        updatedStations[stationIndex] = updatedStation;
        setStationsState(updatedStations);
      }
    }
  }, [wasteMaterialVolume]);

  const handleCloseModal = () => {
    setOpenModifyModal(false);
  };

  const handleOpenModal = () => {
    setOpenModifyModal(true);
  };

  return (
    <>
      <Card className="w-full border-none" elevation={0}>
        <CardActionArea onClick={handleOpenModal} disabled={station.hasPendingPickup}>
          <Box className="flex flex-col items-center">
            <Box>
              <PhosphorIcon
                name={wasteMaterial.phosphorIcon}
                size={64}
                color="#1E7AB9"
              />
            </Box>
            <CardContent className="py-5 px-10 text-center w-full font-black uppercase">
              <Typography
                component="div"
                className="text-sm text-white bg-dark-blue p-2 rounded border-2 border-back-blue line-clamp-1 whitespace-nowrap leading-relaxed"
                fontFamily={'unset'}
              >
                {wasteMaterial.name}
              </Typography>
            </CardContent>
            <Box className="flex items-center w-full justify-center">
              <Typography component="div" className="flex gap-px text-sm whitespace-nowrap">
                {storedVolume ? storedVolume : 0}KG
              </Typography>
              <IconButton>
                <IsoIcon />
              </IconButton>
            </Box>
          </Box>
        </CardActionArea>
      </Card>
      <AddWasteMaterialModal
        openModifyModal={openModifyModal}
        handleCloseMoodal={handleCloseModal}
        wasteMaterial={wasteMaterial}
        storedVolume={storedVolume}
        station={station}
        setWasteMaterialState={setWasteMaterialVolume}
      />
    </>
  );
}

export default WasteMaterialCard;
