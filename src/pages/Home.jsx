import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

// Components
import { Grid, Stack } from '@mui/material';
import PageWrapper from '../components/PageWrapper';
import DisplayMessage from '../components/DisplayMessage';
import PageSpinner from '../components/PageSpinner';
import PreviewCard from '../components/PreviewCard';
import DropdownSelect from '../components/DropdownSelect';

// Utils
import * as gamesApi from '../api';
import getValueFromSearchParams from '../utils/get-value-from-search-params';

// Render Previews of Reviews
const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  console.log({ searchParams: searchParams.toString() || 'none' });

  // Fetch review categories
  const { isLoading: isLoadingCategories, data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: gamesApi.fetchReviewCategories,
    select: (categories) => ({
      // An array of objects; each object contains a `slug` & `description` property
      meta: categories,
      // Generate the options of the DropdownSelect responsible for filtering reviews by category
      filters: categories.map((category) => ({ value: category.slug })),
    }),
  });

  // Fetch Reviews; uses searchParams if applied
  const {
    isLoading: isLoadingReviews,
    error,
    data: reviews,
    refetch: refetchReviews,
  } = useQuery({
    queryKey: ['reviews', Object.fromEntries(searchParams)],
    queryFn: () => gamesApi.fetchAllReviews(searchParams),
  });

  const handleSelectChange = (event, key) => {
    const selectedValue = event.target.value;

    // Update search params shown in browser url
    const newSearchParams = {
      ...Object.fromEntries(searchParams),
      [key]: selectedValue,
    };

    if (selectedValue) {
      setSearchParams(newSearchParams);
    } else {
      delete newSearchParams[key];
      setSearchParams(newSearchParams);
    }

    // Refetch reviews with new search params
    refetchReviews();
  };

  // Reusable instance of DropdownSelect
  const FilterReviewsSelect = ({ inputName, menuItems, error, ...rest }) => {
    const label = inputName[0].toUpperCase() + inputName.slice(1);

    return (
      <DropdownSelect
        id={`select-${inputName}`}
        label={label}
        menuItems={menuItems}
        onChange={(event) => handleSelectChange(event, inputName)}
        initialState={() => getValueFromSearchParams(inputName)}
        // Update Select value on browser navigation
        locationDependent
        noSelectionText="No filter"
        // Instance specific props
        error={error}
        {...rest}
      />
    );
  };

  // Loading UI
  if (isLoadingCategories || isLoadingReviews) {
    return (
      <PageWrapper heading="Reviews">
        <PageSpinner />
      </PageWrapper>
    );
  }

  // Error UI
  if (error) {
    // 404: Error occurred due to invalid searchParams value
    if (error.message === 'invalid review filter') {
      return (
        <PageWrapper heading="Reviews">
          {/* Render Select's with error state where appropriate */}
          <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
            {/* Filter by category */}
            {categories?.filters && (
              <FilterReviewsSelect
                inputName="category"
                menuItems={categories.filters}
                error={error.category}
              />
            )}
          </Stack>

          {/* Render error message */}
          <DisplayMessage
            error={
              'Invalid filter(s) applied. Try again by changing the highlighted filter(s).'
            }
            message="Something went wrong whilst fetching the reviews. Please try again with different filters."
          />
        </PageWrapper>
      );
    }

    // Generic error UI for any other errors
    return (
      <PageWrapper heading="Reviews">
        <DisplayMessage
          error={error.message}
          message="Something went wrong whilst fetching the reviews. Please try again later."
        />
      </PageWrapper>
    );
  }

  // UI with reviews
  return (
    <PageWrapper heading="Reviews">
      {/* Filters */}
      <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
        {/* Filter by category */}
        {categories?.filters && (
          <FilterReviewsSelect
            inputName="category"
            menuItems={categories.filters}
          />
        )}
      </Stack>

      {/* Preview Cards */}
      {reviews.length ? (
        <Grid container spacing={2} sx={{ px: { xs: 4, md: 2, lg: 0 } }}>
          {reviews.map((review) => (
            <Grid key={review.review_id} item xs={12} sm={6} md={4} lg={3}>
              <PreviewCard {...review} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <DisplayMessage message="No reviews found" />
      )}
    </PageWrapper>
  );
};

export default Home;
