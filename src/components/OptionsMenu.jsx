import { useState } from 'react';

// Components
import {
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from '@mui/material';
import { MoreVert } from '@mui/icons-material';

/** 
 * @param { Array } menuItems - Array of objects. Each object should populate a MenuItem component with the following properties:
  - `icon`
  - `text`
  - `handleClick`
 */
const OptionsMenu = ({ menuItems }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  // Opens MUI Menu component and positions it relative to the element that triggers the handler
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        id="more-button"
        onClick={handleMenuOpen}
        aria-label="more comment options"
        aria-controls={open ? 'options-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
      >
        <MoreVert />
      </IconButton>

      <Menu
        id="options-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{ 'aria-labelledby': 'more-button' }}
        anchorOrigin={{ horizontal: -115, vertical: 2 }}
      >
        {menuItems.map(({ icon, text, handleClick }) => (
          <MenuItem
            key={text}
            onClick={() => {
              handleClick();
              handleClose();
            }}
          >
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText>{text}</ListItemText>
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default OptionsMenu;
