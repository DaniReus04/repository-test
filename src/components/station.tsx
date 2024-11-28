import { useMemo } from 'react';
import { Box, LinearProgress, Typography } from '@mui/material';

interface IStationProps {
  stationCapacity: number;
  stationVolume: number;
}

function Station({ stationCapacity, stationVolume }: IStationProps) {
  const percentage = useMemo(() => {
    return (stationVolume / stationCapacity) * 100;
  }, [stationVolume, stationCapacity]);

  const handleColor = () => {
    if (percentage <= 40) {
      return 'success';
    } else if (percentage > 40 && percentage < 80) {
      return 'warning';
    } else return 'error';
  };

  return (
    <Box className="flex items-center">
      <Box className="w-full mr-2">
        <LinearProgress
          variant="determinate"
          value={percentage}
          color={handleColor()}
        />
      </Box>
      <Box className='bg-dark-blue rounded-full p-2'>
        <Typography variant="body2" className="text-lg font-bold text-white">
          {`${Math.trunc(percentage)}%`}
        </Typography>
      </Box>
    </Box>
  );
}

export default Station;
