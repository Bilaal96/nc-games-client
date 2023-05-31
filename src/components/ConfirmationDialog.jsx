import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
} from '@mui/material';

/**
 * A modal used to confirm or cancel user actions
 * The open state and corresponding state setter function should be defined in a parent component, then passed to ConfirmationDialog as props
 */
const ConfirmationDialog = ({
  title, // optional
  content,
  open,
  setOpen,
  onConfirm,
  onClose, // optional
  // If not manually passed as a prop, `actions` defaults to an empty object
  // This is so that we can destructure default properties, as below
  actions = {},
}) => {
  const { cancelText = 'Cancel', confirmText = 'Confirm' } = actions;

  const handleConfirm = () => {
    onConfirm();
    setOpen(false); // close modal
  };

  const handleClose = () => {
    // if received as prop, onClose handles additional logic on modal close
    if (onClose instanceof Function) onClose();

    setOpen(false); // close modal
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="confirm-dialog-title"
      aria-describedby="confirm-dialog-description"
    >
      {/* Title (optional) */}
      {title && <DialogTitle id="confirm-dialog-title">{title}</DialogTitle>}

      {/* Content / Prompt / Description */}
      <DialogContent>
        <DialogContentText id="confirm-dialog-description">
          {content}
        </DialogContentText>
      </DialogContent>

      {/* Cancel & Confirm Buttons */}
      <Divider />
      <DialogActions>
        <Button onClick={handleClose} variant="outlined">
          {cancelText}
        </Button>
        <Button onClick={handleConfirm} variant="contained" autoFocus>
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;
