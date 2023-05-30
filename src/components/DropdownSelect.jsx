// Components
import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';

/**
 * @param { String } id - passed as id attribute to Select.
 * @param { String } label - the text content of InputLabel.
 
 * @param { Array } menuItems - an array of objects, where each object represents an option for the dropdown menu. Each object may contain the following properties:
  - `value` (required)
  - `text` (optional) - if not provided, `value` is used in its place.

 * @param { String } noSelectionText - text for the default MenuItem (i.e. the first instance rendered in the Select component).
 * @param { any } value - the selected value of the Select component. This should be a state value passed from a parent component.
 * @param { Function } onChange - handles change event for the Select component - i.e. executes logic on selection of a MenuItem.
 */
function DropdownSelect({
  id,
  label,
  menuItems,
  noSelectionText = 'None',
  value,
  onChange: handleChange,
  ...otherSelectProps
}) {
  const labelId = `${id}-label`;

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id={labelId}>{label}</InputLabel>
        <Select
          labelId={labelId}
          id={id}
          value={value}
          label={label}
          onChange={handleChange}
          sx={{ textTransform: 'capitalize' }}
          {...otherSelectProps}
        >
          {/* Default - No selection made */}
          <MenuItem value="">
            <em>{noSelectionText}</em>
          </MenuItem>
          {/* Options */}
          {menuItems?.map((menuItem) => (
            <MenuItem
              key={menuItem.value}
              value={menuItem.value}
              sx={{ textTransform: 'capitalize' }}
            >
              {menuItem.text || menuItem.value.toString()}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}

export default DropdownSelect;
