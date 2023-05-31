import { useEffect, useState } from 'react';

// Components
import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useLocation } from 'react-router-dom';

/**
 * @param { String } id - passed as id attribute to `Select`.
 * @param { String } label - the text content of `InputLabel`.
 * @param { Array } menuItems - an array of objects, where each object represents an option for the dropdown menu. Each object may contain the following properties:
  - `value` (required)
  - `text` (optional) - if not provided, `value` is used in its place.

 * @param { * } initialState - the initial state value that controls `Select's` value.
 * @param { Boolean } [ locationDependent ] - a `boolean` that indicates whether or not `Select's` value is dependent on the browser `location`. If set to `true`, when the `location` changes, `Select's` value is reset to the value of `initialState`. This allows us to set the value of `Select` based on the location - e.g. via values in `URLSearchParams`.
 
 * @param { String } [ noSelectionText ] - text for the default `MenuItem` (i.e. the first instance rendered in the `Select` component).
 * @param { Function } [ onChange ] - handles any additional logic on `MenuItem` click - i.e. `Select's` onChange event
 * @param { Boolean } [ error ] - handles `FormControl's` error state
 */
const DropdownSelect = ({
  id,
  label,
  menuItems,
  initialState = '', // can pass value or function
  locationDependent = false,
  noSelectionText = 'None',
  onChange,
  error,
  ...otherSelectProps
}) => {
  const location = useLocation();
  const [value, setValue] = useState(initialState);
  const labelId = `${id}-label`;

  const handleChange = (event) => {
    // Executes additional logic on input selection
    if (onChange instanceof Function) onChange(event);

    // Update select input
    setValue(event.target.value);
  };

  // `value` depends on location, reinitialize `value` state on location change
  useEffect(() => {
    if (locationDependent) setValue(initialState);
  }, [location, initialState, locationDependent]);

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth error={error}>
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
};

export default DropdownSelect;
