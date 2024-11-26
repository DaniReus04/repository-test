import {
  Box,
  Button,
  Divider,
  InputAdornment,
  Modal,
  TextField,
  Typography,
} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import { PhosphorIcon } from './phosphorIcon';
import { IWasteMaterial } from '../interfaces/wasteMaterials';

interface IAddWasteMaterialModalProps {
  openModifyModal: boolean;
  handleCloseMoodal: () => void;
  wasteMaterial: IWasteMaterial;
  storedVolume: number | undefined;
  stationId: number;
}

function AddWasteMaterialModal({
  openModifyModal,
  handleCloseMoodal,
  wasteMaterial,
  storedVolume,
  stationId,
}: IAddWasteMaterialModalProps) {
  return (
    <Modal
      open={openModifyModal}
      onClose={handleCloseMoodal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] bg-white border-2 border-back-blue shadow-lg px-2 py-4">
        <Box className="flex justify-evenly items-center">
          <Box className='flex flex-col items-center justify-center'>
            <PhosphorIcon
              name={wasteMaterial.phosphorIcon}
              size={64}
              color="#1E7AB9"
            />
            <Typography
              component="div"
              className="text-sm text-white bg-dark-blue py-1 px-2"
              fontFamily={'unset'}
            >
              {wasteMaterial.name}
            </Typography>
          </Box>
          <Divider variant="middle" orientation="vertical" flexItem />
          <Box className="flex flex-col items-center">
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Station {stationId}
            </Typography>
            <TextField
              label="Weight"
              id="outlined-start-adornment"
              defaultValue={storedVolume ? storedVolume : 0}
              sx={{ m: 1, width: '25ch' }}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">kg</InputAdornment>
                  ),
                },
              }}
            />
          </Box>
        </Box>
        <Box className="flex justify-center items-center mt-6">
          <Button variant="contained" endIcon={<CheckIcon />}>
            Confirm
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default AddWasteMaterialModal;
