import { useRef, useState } from 'react';
// material
import { alpha } from '@mui/material/styles';
import { Box, MenuItem, ListItemIcon, ListItemText } from '@mui/material';
// components
import MenuPopover from '../../components/MenuPopover';
import { MIconButton } from '../../components/@material-extend';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

// ----------------------------------------------------------------------

const LANGS = [
  {
    value: 'en',
    label: 'Add Enquiry',
    icon: '/static/icons/ic_flag_en.svg'
  },
  {
    value: 're',
    label: 'Add Repair',
    icon: '/static/icons/ic_flag_de.svg'
  },
  {
    value: 'or',
    label: 'Add Order',
    icon: '/static/icons/ic_flag_fr.svg'
  }
];

// ----------------------------------------------------------------------

export default function LanguagePopover() {
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <MIconButton
        ref={anchorRef}
        onClick={handleOpen}
        sx={{
          padding: 0,
          width: 44,
          height: 44,
          ...(open && {
            bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.focusOpacity)
          })
        }}
      >
        {/* <img src={LANGS[0].icon} alt={LANGS[0].label} /> */}
        {/* <AddCircleOutlineIcon sx={{ color: 'black', fontSize: 40 }} /> */}
        <Fab style={{ backgroundColor: '#B98900' }} size="small">
          <AddIcon />
        </Fab>
      </MIconButton>

      <MenuPopover open={open} onClose={handleClose} anchorEl={anchorRef.current}>
        <Box sx={{ py: 1 }}>
          {LANGS.map((option) => (
            <MenuItem
              key={option.value}
              selected={option.value === LANGS[0].value}
              onClick={handleClose}
              sx={{ py: 1, px: 2.5 }}
            >
              {/* <ListItemIcon>
                <Box component="img" alt={option.label} src={option.icon} />
              </ListItemIcon> */}
              <ListItemText primaryTypographyProps={{ variant: 'body2' }}>{option.label}</ListItemText>
            </MenuItem>
          ))}
        </Box>
      </MenuPopover>
    </>
  );
}
