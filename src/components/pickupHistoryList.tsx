import {
  Paper,
  styled,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { IPickupHistory } from '../interfaces/pickup';
import { IStoredWasteMaterials } from '../interfaces/wasteMaterials';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';

interface IPickupHistoryListProps {
  pickupHistoryState: IPickupHistory[];
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#006BDB',
    color: theme.palette.common.white,
    fontSize: 18
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    fontWeight: 700
  },
}));

function PickupHistoryList({ pickupHistoryState }: IPickupHistoryListProps) {
  const pickupVolume = (pickupRowMaterials: IStoredWasteMaterials[]) => {
    return pickupRowMaterials
      ? pickupRowMaterials.map((item) => item.volume).reduce((a, b) => a + b, 0)
      : 0;
  };

  return (
    <TableContainer component={Paper}>
      <Table aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell></StyledTableCell>
            <StyledTableCell align="center">Station</StyledTableCell>
            <StyledTableCell align="center">Pickup date</StyledTableCell>
            <StyledTableCell align="center">Volume</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {pickupHistoryState.map((row) => (
            <TableRow key={row.id}>
              <StyledTableCell component="th" scope="row">
                <LocalShippingIcon className='!text-light-blue'/>
              </StyledTableCell>
              <StyledTableCell align="center">
                Station {row.stationId}
              </StyledTableCell>
              <StyledTableCell align="center">{new Date(row.collectedAt).toISOString().split('T')[0]}</StyledTableCell>
              <StyledTableCell align="center">
                {pickupVolume(row.storedWasteMaterials)} kg
              </StyledTableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default PickupHistoryList;
