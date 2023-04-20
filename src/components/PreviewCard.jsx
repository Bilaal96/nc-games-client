import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Chip,
  Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';

const PreviewCard = ({
  category,
  created_at,
  designer,
  owner,
  review_id,
  review_img_url,
  title,
  votes,
}) => {
  const formattedCreatedAt = new Date(created_at).toLocaleDateString(
    undefined,
    {
      weekday: 'short',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }
  );

  return (
    <CardActionArea component={Link} to={`/reviews/${review_id}`}>
      <Card sx={{ height: 400 }} elevation={4}>
        {/* Card Image */}
        <CardMedia
          component="img"
          height="140"
          image={review_img_url}
          alt={title}
        />

        {/* Card Body */}
        <CardContent sx={{ position: 'relative', height: 260 }}>
          {/* Card Main */}
          <Box>
            <Chip
              label={category}
              variant="outlined"
              sx={(theme) => ({
                height: '1.5rem',
                backgroundColor: '#e4c5ea',
                borderColor: 'secondary.light',
                mb: theme.spacing(1),
              })}
            />
            <Typography
              component="h3"
              sx={(theme) => ({
                fontSize: '1rem',
                fontWeight: 700,
                color: 'primary.main',
                mb: theme.spacing(2),
              })}
            >
              {title}
            </Typography>

            <Typography sx={{ fontSize: '0.875rem' }}>
              <strong>Designer:</strong> {designer}
            </Typography>
            <Typography sx={{ fontSize: '0.875rem' }}>
              <strong>Review By:</strong> {owner}
            </Typography>
          </Box>

          {/* Card Footer */}
          <Box
            sx={(theme) => ({ position: 'absolute', bottom: theme.spacing(2) })}
          >
            <Typography sx={{ fontSize: '0.875rem' }}>
              <strong>{votes}</strong> Votes
            </Typography>
            <Typography sx={{ fontSize: '0.875rem', color: 'grey' }}>
              <em>{formattedCreatedAt}</em>
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </CardActionArea>
  );
};

export default PreviewCard;
