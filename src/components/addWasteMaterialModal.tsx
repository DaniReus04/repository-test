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
import IStation from '../interfaces/station';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';

interface IAddWasteMaterialModalProps {
  openModifyModal: boolean;
  handleCloseMoodal: () => void;
  wasteMaterial: IWasteMaterial;
  storedVolume: number | undefined;
  station: IStation;
}

function AddWasteMaterialModal({
  openModifyModal,
  handleCloseMoodal,
  wasteMaterial,
  storedVolume,
  station,
}: IAddWasteMaterialModalProps) {
  const [isModified, setIsModified] = useState(false);

  const remainingCapacity = station.capacity - station.volume;

  const validationSchema = yup.object().shape({
    weight: yup
      .number()
      .transform((value) => (isNaN(value) ? undefined : value))
      .typeError('Must be a number')
      .required('Weight is required')
      .positive('Weight must be greater than 0')
      .integer('Weight must be an integer')
      .max(
        remainingCapacity,
        `Cannot exceed remaining capacity (${remainingCapacity} kg)`,
      ),
  });

  const {
    handleSubmit,
    control,
    watch,
    formState: { errors, isValid },
  } = useForm<{ weight: number }>({
    mode: 'onChange',
    resolver: yupResolver(validationSchema),
    defaultValues: {
      weight: storedVolume || 0,
    },
  });

  const currentWeight = watch('weight');
  const initialWeight = storedVolume || 0;
  useEffect(() => {
    setIsModified(Number(currentWeight) !== initialWeight);
  }, [currentWeight, initialWeight]);

  const onSubmit = (data: { weight: number | string }) => {
    const weightAsNumber = Number(data.weight);
    console.log('Submitted Weight:', weightAsNumber);
  };

  return (
    <Modal
      open={openModifyModal}
      onClose={handleCloseMoodal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] bg-white border-2 border-back-blue shadow-lg px-2 py-4">
        <Box className="flex justify-evenly items-center">
          <Box className="flex flex-col items-center justify-center">
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
              Station {station.id}
            </Typography>
            <Controller
              name="weight"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Weight"
                  error={!!errors.weight}
                  helperText={errors.weight ? errors.weight.message : ''}
                  sx={{ m: 1, width: '25ch' }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">kg</InputAdornment>
                    ),
                  }}
                />
              )}
            />
          </Box>
        </Box>
        <Box className="flex justify-center items-center mt-6">
          <Button
            variant="contained"
            endIcon={<CheckIcon />}
            onClick={handleSubmit(onSubmit)}
            disabled={!isValid || !isModified}
          >
            Confirm
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default AddWasteMaterialModal;
