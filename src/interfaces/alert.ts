export enum EAlertSeverity {
  Success = 'success',
  Error = 'error',
  Info = 'info',
  Warning = 'warning'
}

export interface IAlert {
  open: boolean; 
  message: string; 
  severity: EAlertSeverity
}