import { useCallback, useEffect, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import * as gamesApi from '../api';

// Components
import { Grid, Stack } from '@mui/material';
import PageWrapper from '../components/PageWrapper';
import DisplayMessage from '../components/DisplayMessage';
import PageSpinner from '../components/PageSpinner';
import PreviewCard from '../components/PreviewCard';
import DropdownSelect from '../components/DropdownSelect';

// Render Previews of Reviews
const Home = () => {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  console.log({ searchParams: searchParams.toString() || 'none' });

  const getCategoryFromSearchParams = useCallback(() => {
    return searchParams.has('category') ? searchParams.get('category') : '';
  }, [searchParams]);

  const [categoryFilters, setCategoryFilters] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(
    getCategoryFromSearchParams
  );

  // Fetch Reviews; use query/search parameters if available
  const {
    isLoading: isLoadingReviews,
    error,
    data: reviews,
    refetch: refetchReviews,
  } = useQuery({
    queryKey: ['reviews', Object.fromEntries(searchParams)],
    queryFn: () => gamesApi.fetchAllReviews(searchParams),
  });

  // Fetch review categories
  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: gamesApi.fetchReviewCategories,
  });

  // Generate categoryFilters using the fetched categories
  // DropdownSelect's `menuItems` prop is an array of objects
  // Each object must contain a `value` property
  useEffect(() => {
    if (categories) {
      setCategoryFilters(
        categories.map((category) => ({ value: category.slug }))
      );
    }
  }, [categories]);

  // Update selectedCategory on browser navigation
  useEffect(() => {
    setSelectedCategory(getCategoryFromSearchParams);
  }, [location, getCategoryFromSearchParams]);

  const handleCategorySelect = (event) => {
    const selectedValue = event.target.value;

    // Update select input
    setSelectedCategory(selectedValue);

    // Update search params shown in browser url
    const newSearchParams = {
      ...Object.fromEntries(searchParams),
      category: selectedValue,
    };

    if (selectedValue) {
      setSearchParams(newSearchParams);
    } else {
      delete newSearchParams.category;
      setSearchParams(newSearchParams);
    }

    // Refetch reviews with new search params
    refetchReviews();
  };

  if (isLoadingReviews) {
    return (
      <PageWrapper heading="Reviews">
        <PageSpinner />
      </PageWrapper>
    );
  }

  if (error) {
    return (
      <PageWrapper heading="Reviews">
        <DisplayMessage
          error={error.message}
          message="Something went wrong whilst fetching the reviews. Please try again later."
        />
      </PageWrapper>
    );
  }

  return (
    <PageWrapper heading="Reviews">
      {/* Filters */}
      <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
        {/* Filter by category */}
        {categoryFilters.length && (
          <DropdownSelect
            id="select-category"
            label="Category"
            noSelectionText="Clear filter"
            menuItems={categoryFilters}
            value={selectedCategory}
            onChange={handleCategorySelect}
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
