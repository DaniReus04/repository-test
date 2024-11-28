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
import { IStoredWasteMaterials, IWasteMaterial } from '../interfaces/wasteMaterials';
import IStation from '../interfaces/station';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

interface IAddWasteMaterialModalProps {
  openModifyModal: boolean;
  handleCloseMoodal: () => void;
  wasteMaterial: IWasteMaterial;
  storedVolume: number | undefined;
  station: IStation;
  setWasteMaterialState: Dispatch<SetStateAction<IStoredWasteMaterials | null>>
}

function AddWasteMaterialModal({
  openModifyModal,
  handleCloseMoodal,
  wasteMaterial,
  storedVolume,
  station,
  setWasteMaterialState,
}: IAddWasteMaterialModalProps) {
  const [isModified, setIsModified] = useState(false);
  const volume = station.storedWasteMaterials ? station.storedWasteMaterials.map((item) => item.volume).reduce((a, b) => a + b, 0) : 0;

  const remainingCapacity = station.capacity - volume;

  const validationSchema = yup.object().shape({
    weight: yup
      .number()
      .required('Weight is required')
      .min(0)
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
    reset
  } = useForm<{ weight: number }>({
    mode: 'onChange',
    resolver: yupResolver(validationSchema),
    defaultValues: {
      weight: storedVolume ? storedVolume : 0,
    },
  });

  useEffect(() => {
    reset({
      weight: storedVolume ? storedVolume : 0,
    });
  }, [storedVolume, reset]);

  const currentWeight = watch('weight');
  const initialWeight = storedVolume ? storedVolume : 0;
  useEffect(() => {
    setIsModified(Number(currentWeight) !== initialWeight);
  }, [currentWeight, initialWeight]);

  const onSubmit = (data: { weight: number | string }) => {
    setWasteMaterialState({id: wasteMaterial.id, volume: Number(data.weight)});
    handleCloseMoodal();
  };

  const handleCustomChange = (value: string, onChange: (value: number) => void) => {
    const parsedValue = parseFloat(value);
    if (!Number.isNaN(parsedValue) && parsedValue >= 0) {
      onChange(parsedValue);
    }
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
              render={({ field: { onChange, value } }) => (
                <TextField
                  value={value}
                  label="Weight"
                  type='number'
                  error={!!errors.weight}
                  onChange={(e) => handleCustomChange(e.target.value, onChange)}
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
