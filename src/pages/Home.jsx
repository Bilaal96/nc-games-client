import { useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

// Components
import { Grid, Stack } from '@mui/material';
import PageWrapper from '../components/PageWrapper';
import DisplayMessage from '../components/DisplayMessage';
import PageSpinner from '../components/PageSpinner';
import ReviewFiltersSelect from '../components/ReviewFiltersSelect';
import PreviewCard from '../components/PreviewCard';

// Utils
import * as gamesApi from '../api';
import {
  categoryFilterOptions,
  sortByFilterOptions,
  orderFilterOptions,
} from '../utils/review-filter-options';

// Render Previews of Reviews
const Home = () => {
  const hasDefaultSearchParams = useRef(false);
  const [searchParams, setSearchParams] = useSearchParams();

  // When mounting this component, set default searchParams for sort_by & order
  useEffect(() => {
    console.log('set default searchParams');
    if (!hasDefaultSearchParams.current) {
      hasDefaultSearchParams.current = true;
      setSearchParams({ sort_by: 'created_at', order: 'desc' });
    }
  }, [setSearchParams]);

  // Fetch review categories
  const { isLoading: isLoadingCategories, data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: gamesApi.fetchReviewCategories,

    /**
     * `select` transforms the result of `queryFn`.
     * @returns { Object } categories
     * @property { Array } categories.meta - an array with elements in format of: { slug: ..., description: ... }
     * @property { Array } categories.filters - an array with elements in format: { value: category.slug }. Passed to ReviewFiltersSelect's `options` prop to generate Select input that filters reviews by category.
     */
    select: (categories) => ({
      meta: categories,
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

    // Update search params shown in browser url when an option is selected
    const newSearchParams = {
      ...Object.fromEntries(searchParams),
      [key]: selectedValue,
    };

    if (selectedValue) {
      // apply selected filter
      setSearchParams(newSearchParams);
    } else {
      // clear filter of the event.target
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

  const sharedFiltersProps = {
    onChange: handleSelectChange,
    displayEmpty: true,
  };

  const categoryFilterProps = {
    ...sharedFiltersProps,
    searchParamKey: 'category',
    noSelectionText: 'all',
    options: categories?.filters || categoryFilterOptions,
    // Push siblings to the right
    BoxProps: { sx: { mr: 'auto' } },
  };

  const sortByFilterProps = {
    ...sharedFiltersProps,
    searchParamKey: 'sort_by',
    label: 'Sort by',
    options: sortByFilterOptions,
  };

  const orderFilterProps = {
    ...sharedFiltersProps,
    searchParamKey: 'order',
    options: orderFilterOptions,
    removeDefaultOption: true,
  };

  // Error UI
  if (error) {
    // 404: Error occurred due to invalid searchParams value
    if (error.message === 'invalid review filter') {
      return (
        <PageWrapper heading="Reviews">
          {/* Renders Select inputs (used to filter reviews) with error state when appropriate */}
          <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
            <ReviewFiltersSelect
              {...categoryFilterProps}
              error={error.category}
            />
            <ReviewFiltersSelect {...sortByFilterProps} error={error.sort_by} />
            <ReviewFiltersSelect {...orderFilterProps} error={error.order} />
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
      {/* Renders Select inputs (used to filter reviews) */}
      <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
        <ReviewFiltersSelect {...categoryFilterProps} />
        <ReviewFiltersSelect {...sortByFilterProps} />
        <ReviewFiltersSelect {...orderFilterProps} defaultValue="" />
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
