import { Chip, styled } from '@mui/material';

const StyledChip = styled(Chip)`
  height: 1.5rem;
  background-color: #e4c5ea;
  border-color: ${({ theme }) => theme.palette.secondary.light};
`;

export default StyledChip;
