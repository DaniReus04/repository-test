import { Snackbar, Alert } from '@mui/material';
import { IAlert } from '../interfaces/alert';

interface IAlertBoxProps {
  handleCloseAlert: () => void;
  alert: IAlert;
}

function AlertBox({ handleCloseAlert, alert }: IAlertBoxProps) {
  return (
    <Snackbar
      open={alert.open}
      autoHideDuration={6000}
      onClose={handleCloseAlert}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <Alert onClose={handleCloseAlert} severity={alert.severity} variant='filled'>
        {alert.message}
      </Alert>
    </Snackbar>
  );
}

export default AlertBox;
