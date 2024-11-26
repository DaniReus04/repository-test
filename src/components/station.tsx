import Slider from '@mui/material/Slider';

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

function Station() {
  return (
    <Slider
      aria-label="Always visible"
      defaultValue={0}
      step={10}
      marks={marks}
    />
  );
}

export default Station;
