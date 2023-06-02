// Components
import BasicSelect from './BasicSelect';

// Utils
import getValueFromSearchParams from '../utils/get-value-from-search-params';

/**
 * ReviewFiltersSelect is a wrapper around `BasicSelect`.
 * It is sed to render the Select inputs responsible for filtering Reviews.
 * @param { String } searchParamKey - should be unique per component rendered.
  - used as fallback value of `label` prop if one is not explicitly supplied
  - used to set a distinct id for each instance
  - used to define value of `initialState` & `onChange` props
 * @param { Boolean | undefined } [ error ] - if true, renders `FormControl` in an error state - i.e. red border and label.
 * @param { Boolean | undefined } [ displayEmpty ] - if true, sets the following props in `BasicSelect`:
  - `<InputLabel shrink />`
  - `<Select displayEmpty notched />`
 ---
 * See `BasicSelect` for documentation on the remaining props.
 */
const ReviewFiltersSelect = ({
  // Used in ReviewFiltersSelect to generate prop values for BasicSelect
  searchParamKey,
  error,
  displayEmpty,

  // Props passed down to BasicSelect
  label,
  onChange: handleChange,
  removeDefaultOption,
  noSelectionText = 'No filter',
  options,

  BoxProps,
  FormControlProps,
  InputLabelProps,
  SelectProps,
  MenuItemProps,
}) => {
  const labelText =
    label ?? searchParamKey[0].toUpperCase() + searchParamKey.slice(1);

  return (
    <BasicSelect
      id={`select-${searchParamKey}`}
      label={labelText}
      initialState={() => getValueFromSearchParams(searchParamKey)}
      onChange={(event) => handleChange(event, searchParamKey)}
      locationDependent // Update Select value on browser navigation
      removeDefaultOption={removeDefaultOption}
      noSelectionText={noSelectionText}
      options={options}
      BoxProps={{ ...BoxProps }}
      FormControlProps={{ error, ...FormControlProps }}
      InputLabelProps={{ shrink: displayEmpty, ...InputLabelProps }}
      SelectProps={{ displayEmpty, notched: displayEmpty, ...SelectProps }}
      MenuItemProps={{ ...MenuItemProps }}
    />
  );
};

export default ReviewFiltersSelect;
