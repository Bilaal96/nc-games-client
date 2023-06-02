import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

// Components
import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';

/**
 * @param { String } id - passed as id attribute to `Select`.
 * @param { String } label - the text content of `InputLabel`.
 ---
 * @param { * } initialState - initialises `selectedValue` state, which is passed as `value` of `Select`.
 * Can be any value accepted by `useState` hook.
 * See `locationDependent` for details on controlling when initialState is set.
 * @param { Boolean | undefined } [ locationDependent ] - indicates whether or not `selectedValue` state is dependent on the browser `location`. 

 * If `true`, when the `location` changes, `selectedValue` is reset to the value of `initialState`. 
 * This means that on `location` change (i.e. browser or site navigation):
  1. Select's `value` prop is reset to the value of `initialState`.   
  2. If `initialState` is a function that sets `selectedValue` based on `URLSearchParams`, browser history is preserved on navigation. See `ReviewFiltersSelect` for this use case - where selectedValue is initialised based on `URLSearchParams`.
 ---
 * @param { Function } [ onChange ] - handles any additional logic to be executed on `MenuItem` click.
 ---
 * @param { Boolean | undefined } [ removeDefaultOption ] - if `true`, does not render the default `<MenuItem value="">` (i.e. the first instance rendered in the `Select` component).
 * @param { String } [ noSelectionText ] - innerText for the default `MenuItem` (i.e. the first instance rendered in the `Select` component).
 * @param { Array } options - an array of objects, where each object represents an option for the Select menu. Each object may contain the following properties:
  - `value` (required)
  - `text` (optional) - use this if you want a Select `value` to be different from the visible option. E.g. { value: 10, text: "Ten"}. 
 ---
 * The following parameters can be used to pass props to constituents of BasicSelect:
 * @param { Object } BoxProps
 * @param { Object } FormControlProps
 * @param { Object } InputLabelProps
 * @param { Object } SelectProps
 * @param { Object } MenuItemProps
 */
const BasicSelect = ({
  // Shared props
  id,
  label,
  initialState = '',
  onChange,
  locationDependent = false,
  removeDefaultOption,
  noSelectionText = 'None',
  options,

  BoxProps,
  FormControlProps, // error
  InputLabelProps, // shrink
  SelectProps, // displayEmpty | notched
  MenuItemProps,
}) => {
  const location = useLocation();
  const [selectedValue, setSelectedValue] = useState(initialState);
  const labelId = `${id}-label`;

  // if `locationDependent` prop is passed, reinitialize `selectedValue` state on URL change
  useEffect(() => {
    if (locationDependent) setSelectedValue(initialState);
  }, [location, initialState, locationDependent]);

  const sxMenuItems = { textTransform: 'capitalize', ...MenuItemProps.sx };

  const handleChange = (event) => {
    // Executes additional logic on input selection
    if (onChange instanceof Function) onChange(event);

    // Update Select input's value
    setSelectedValue(event.target.value);
  };

  return (
    <Box {...BoxProps} sx={{ minWidth: 120, ...BoxProps.sx }}>
      <FormControl fullWidth {...FormControlProps}>
        <InputLabel id={labelId} {...InputLabelProps}>
          {label}
        </InputLabel>
        <Select
          labelId={labelId}
          id={id}
          value={selectedValue}
          label={label}
          onChange={handleChange}
          {...SelectProps}
          sx={{ textTransform: 'capitalize', ...SelectProps?.sx }}
        >
          {/* Default - No selection made */}
          {!removeDefaultOption && (
            <MenuItem value="" {...MenuItemProps} sx={sxMenuItems}>
              <em>{noSelectionText}</em>
            </MenuItem>
          )}
          {/* Options */}
          {options?.map((option) => (
            <MenuItem
              key={option.value}
              value={option.value}
              {...MenuItemProps}
              sx={sxMenuItems}
            >
              {option.text || option.value.toString()}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default BasicSelect;
