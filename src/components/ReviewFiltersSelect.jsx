// Components
import DropdownSelect from './DropdownSelect';

// Utils
import getValueFromSearchParams from '../utils/get-value-from-search-params';

/**
 * Wrapper around `DropdownSelect`.
 * Used to render the Select inputs responsible for filtering Reviews.
 ---
 * See `DropdownSelect` for documentation of props.
 */
const ReviewFiltersSelect = ({
  inputName,

  // FormControl props
  error,

  // MenuItem props
  menuItems,
  noSelectionText = 'No filter',

  // Select props
  onChange: handleChange,
  ...otherSelectProps
}) => {
  const label = inputName[0].toUpperCase() + inputName.slice(1);

  return (
    <DropdownSelect
      id={`select-${inputName}`}
      label={label}
      menuItems={menuItems}
      onChange={(event) => handleChange(event, inputName)}
      initialState={() => getValueFromSearchParams(inputName)}
      // Update Select value on browser navigation
      locationDependent
      noSelectionText={noSelectionText}
      // Instance specific props
      error={error}
      displayEmpty
      {...otherSelectProps}
    />
  );
};

export default ReviewFiltersSelect;
