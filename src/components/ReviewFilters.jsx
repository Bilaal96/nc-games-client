// Components
import { Stack } from '@mui/material';
import ReviewFiltersSelect from './ReviewFiltersSelect';

/**
 * @param { Map } selectOptions - contains arrays in formate: `{ value: ... }`
 * @param { Function } onChange - change event handler passed to MUI `Select`
 * @param { Boolean | undefined } error - prop passed to MUI `FormControl` to render `Select` in an error state (with red outline & text)
 */
const ReviewFilters = ({ selectOptions, onChange, error }) => {
  const inputNames = Array.from(selectOptions.keys());

  return (
    <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
      {inputNames.map((inputName) => (
        <ReviewFiltersSelect
          key={inputName}
          inputName={inputName}
          menuItems={selectOptions.get(inputName)}
          error={error?.[inputName]}
          onChange={onChange}
        />
      ))}
    </Stack>
  );
};

export default ReviewFilters;
