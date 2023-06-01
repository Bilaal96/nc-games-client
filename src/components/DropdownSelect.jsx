import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

// Components
import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';

/**
 * @param { String } id - passed as id attribute to `Select`.
 * @param { String } label - the text content of `InputLabel`.
 * @param { Array } menuItems - an array of objects, where each object represents an option for the dropdown menu. Each object may contain the following properties:
  - `value` (required)
  - `text` (optional) - use if you want Select's options to be different from the `value`. E.g. value: number = 10; text: string = "Ten".

 * @param { * } initialState - assigned as value of `Select`. See `locationDependent` for controlling when this value is set.
 * @param { Boolean | undefined } [ locationDependent ] - indicates whether or not `Select's` value is dependent on the browser `location`. 
 * If set to `true`, when the `location` changes, `Select's` value is reset to the value of `initialState`. 
 * This allows us to set the value of `Select` based on the location - e.g. via values in `URLSearchParams`.
 
 * @param { Function } [ onChange ] - handles any additional logic on `MenuItem` click - i.e. `Select's` onChange event
 * @param { String } [ noSelectionText ] - text for the default `MenuItem` (i.e. the first instance rendered in the `Select` component).
 * @param { Boolean | undefined } [ error ] - handles `FormControl's` error state
 * @param { Boolean | undefined } [ displayEmpty ] - if passed, shows `noSelectionText` when Select value is empty
 */
const DropdownSelect = ({
  // Shared props
  id,
  initialState = '', // can pass value or function
  label,
  locationDependent = false,

  // FormControl props
  error,

  // MenuItem props
  menuItems,
  noSelectionText = 'None',

  // Select props
  onChange,
  displayEmpty, // sets notched (Select) & shrink (InputLabel) to true
  ...otherSelectProps
}) => {
  const location = useLocation();
  const [selectedValue, setSelectedValue] = useState(initialState);
  const labelId = `${id}-label`;

  const handleChange = (event) => {
    // Executes additional logic on input selection
    if (onChange instanceof Function) onChange(event);

    // Update Select input's value
    setSelectedValue(event.target.value);
  };

  // if `locationDependent` prop is passed, reinitialize `selectedValue` state on URL change
  useEffect(() => {
    if (locationDependent) setSelectedValue(initialState);
  }, [location, initialState, locationDependent]);

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth error={error}>
        <InputLabel id={labelId} shrink={displayEmpty}>
          {label}
        </InputLabel>
        <Select
          labelId={labelId}
          id={id}
          value={selectedValue}
          label={label}
          onChange={handleChange}
          sx={{ textTransform: 'capitalize' }}
          displayEmpty={displayEmpty}
          notched={displayEmpty}
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
