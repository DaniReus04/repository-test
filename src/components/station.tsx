import Slider from '@mui/material/Slider';
import IStation from '../interfaces/station';
import { useMemo } from 'react';

interface IStationProps {
  station: IStation
};

const marks = [
  {
    value: 0,
    label: '0%',
  },
  {
    value: 20,
    label: '20%',
  },
  {
    value: 40,
    label: '40%',
  },
  {
    value: 60,
    label: '60%',
  },
  {
    value: 80,
    label: '80%',
  },
  {
    value: 100,
    label: '100%',
  },
];

function Station({ station }: IStationProps) {
  const percentage = useMemo(() => {
    return (station.volume / station.capacity) * 100;
  }, [station.volume, station.capacity]);

  const handleColor = () => {
    if (percentage <= 40) {
      return 'success'
    } else if (percentage > 40 && percentage < 80) {
      return 'warning'
    } else return 'error'
  }

  return (
    <Slider
      aria-label="Always visible"
      valueLabelDisplay='auto'
      valueLabelFormat={`${percentage}%`}
      defaultValue={percentage}
      disableSwap
      marks={marks}
      color={handleColor()}
    />
  );
}

export default Station;
