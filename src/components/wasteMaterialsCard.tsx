import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import { IWasteMaterials } from '../interfaces/wasteMaterials';
import { PhosphorIcon } from './phosphorIcon';

interface IWasteMaterialCardProps {
  wasteMaterial: IWasteMaterials,
  storedVolume: number | undefined
}

function WasteMaterialCard({ wasteMaterial, storedVolume }: IWasteMaterialCardProps) {
  return (
    <Card className='w-full border-none' elevation={0}>
      <Box className='flex flex-col items-center'>
        <Box>
          <PhosphorIcon name={wasteMaterial.phosphorIcon} size={64} color='#1E7AB9'/>
        </Box>
        <CardContent className=' py-5 px-10 text-center w-full font-black uppercase'>
          <Typography component="div" className='text-sm text-white bg-dark-blue p-2' fontFamily={'unset'}>
            {wasteMaterial.name}
          </Typography>
        </CardContent>
        <Box className='flex items-center'>
          <Typography component="div" className='text-sm'>
            {storedVolume ? storedVolume : 0}
          </Typography>
          <IconButton aria-label="play/pause">
            <AddIcon />
          </IconButton>
        </Box>
      </Box>
    </Card>
  );
}

export default WasteMaterialCard;
