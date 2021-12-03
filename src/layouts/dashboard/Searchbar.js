import { Icon } from '@iconify/react';
import searchFill from '@iconify/icons-eva/search-fill';
// material
import { styled, alpha } from '@mui/material/styles';
import { Box, Input, InputAdornment } from '@mui/material';
// ----------------------------------------------------------------------

const APPBAR_MOBILE = 40;
const APPBAR_DESKTOP = 56;

const SearchbarStyle = styled('div')(({ theme }) => ({
  flexGrow: 1,
  display: 'flex',
  alignItems: 'center',
  height: APPBAR_MOBILE,
  backdropFilter: 'blur(6px)',
  WebkitBackdropFilter: 'blur(6px)', // Fix on Mobile
  // padding: theme.spacing(0, 3),
  // boxShadow: theme.customShadows.z8,
  backgroundColor: `${alpha(theme.palette.background.default, 0.72)}`,
  [theme.breakpoints.up('md')]: {
    height: APPBAR_DESKTOP
    // padding: theme.spacing(0, 5)
    // paddingRight: theme.spacing(5)
  }
}));

// ----------------------------------------------------------------------

export default function Searchbar() {
  return (
    <SearchbarStyle>
      <Input
        autoFocus
        fullWidth
        disableUnderline
        placeholder="Search by Name or Email"
        startAdornment={
          <InputAdornment position="start">
            <Box component={Icon} icon={searchFill} sx={{ color: 'text.disabled', width: 20, height: 20 }} />
          </InputAdornment>
        }
        sx={{ mr: 1, fontWeight: 'fontWeightBold' }}
      />
    </SearchbarStyle>
  );
}
