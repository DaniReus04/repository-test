import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import IsoIcon from '@mui/icons-material/Iso';
import { IWasteMaterial } from '../interfaces/wasteMaterials';
import { PhosphorIcon } from './phosphorIcon';
import CardActionArea from '@mui/material/CardActionArea';
import { useState } from 'react';
import AddWasteMaterialModal from './addWasteMaterialModal';
import IStation from '../interfaces/station';

interface IWasteMaterialCardProps {
  wasteMaterial: IWasteMaterial;
  storedVolume: number | undefined;
  station: IStation;
}

function WasteMaterialCard({
  wasteMaterial,
  storedVolume,
  station
}: IWasteMaterialCardProps) {
  const [openModifyModal, setOpenModifyModal] = useState<boolean>(false);

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
            <CardContent className=" py-5 px-10 text-center w-full font-black uppercase">
              <Typography
                component="div"
                className="text-sm text-white bg-dark-blue p-2"
                fontFamily={'unset'}
              >
                {wasteMaterial.name}
              </Typography>
            </CardContent>
            <Box className="flex items-center">
              <Typography component="div" className="text-sm">
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
      />
    </>
  );
}

export default WasteMaterialCard;
