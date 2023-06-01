import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

// Components
import { Grid } from '@mui/material';
import PageWrapper from '../components/PageWrapper';
import DisplayMessage from '../components/DisplayMessage';
import PageSpinner from '../components/PageSpinner';
import PreviewCard from '../components/PreviewCard';
import ReviewFilters from '../components/ReviewFilters';

// Utils
import * as gamesApi from '../api';
import {
  categoryFilterOptions,
  sortByFilterOptions,
  orderFilterOptions,
} from '../utils/review-filter-options';

// Render Previews of Reviews
const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Fetch review categories
  const { isLoading: isLoadingCategories, data: categories } = useQuery({
    // placeholderData: { meta: [], filters: [] },
    queryKey: ['categories'],
    queryFn: gamesApi.fetchReviewCategories,
    select: (categories) => ({
      // An array of objects; each object contains a `slug` & `description` property
      meta: categories,
      // Generate the options of the DropdownSelect responsible for filtering reviews by category
      filters: categories.map((category) => ({ value: category.slug })),
    }),
  });

  // Fetch Reviews; uses searchParams if they exist
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

  // Loading UI
  if (isLoadingCategories || isLoadingReviews) {
    return (
      <PageWrapper heading="Reviews">
        <PageSpinner />
      </PageWrapper>
    );
  }

  /**
   * In ReviewFilters, each entry in selectOptions Map renders a FilterReviewsSelect
   * Map values are arrays of elements formatted like so: { value: ... }
   * Map is preferred over object as it preserves order of entries
   */
  const selectOptions = new Map([
    ['category', categories?.filters || categoryFilterOptions],
    ['sort_by', sortByFilterOptions],
    ['order', orderFilterOptions],
  ]);

  const reviewFiltersProps = {
    onChange: handleSelectChange,
    selectOptions,
  };

  // Error UI
  if (error) {
    // 404: Error occurred due to invalid searchParams value
    if (error.message === 'invalid review filter') {
      return (
        <PageWrapper heading="Reviews">
          {/* Renders Select inputs (used to filter reviews) with error state when appropriate */}
          <ReviewFilters error={error} {...reviewFiltersProps} />

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
      {/* Renders Select inputs (used to filter reviews) */}
      <ReviewFilters {...reviewFiltersProps} />

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
