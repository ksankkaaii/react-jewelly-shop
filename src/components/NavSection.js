import PropTypes from 'prop-types';
import { useState } from 'react';
import { Icon } from '@iconify/react';
import { NavLink as RouterLink, matchPath, useLocation } from 'react-router-dom';
import arrowIosForwardFill from '@iconify/icons-eva/arrow-ios-forward-fill';
import arrowIosDownwardFill from '@iconify/icons-eva/arrow-ios-downward-fill';
import useCollapseDrawer from '../hooks/useCollapseDrawer';
// material
import { alpha, useTheme, styled } from '@mui/material/styles';
import { Box, List, Collapse, ListItemText, ListItemIcon, ListSubheader, ListItemButton } from '@mui/material';

// ----------------------------------------------------------------------

const ListSubheaderStyle = styled((props) => <ListSubheader disableSticky disableGutters {...props} />)(
  ({ theme }) => ({
    ...theme.typography.overline,
    marginTop: theme.spacing(6.875),
    marginBottom: theme.spacing(3),
    paddingLeft: theme.spacing(6.75),
    // color: theme.palette.text.primary
    color: '#8C9094'
  })
);

const ListItemStyle = styled(ListItemButton)(({ theme }) => ({
  ...theme.typography.body2,
  width: 215,
  height: 35,
  position: 'relative',
  textTransform: 'capitalize',
  paddingLeft: theme.spacing(1.5),
  // paddingRight: theme.spacing(2.5),
  marginLeft: theme.spacing(5.125),
  marginBottom: theme.spacing(2),
  color: theme.palette.text.secondary,
  borderRadius: 4
  // '&:before': {
  //   top: 0,
  //   right: 0,
  //   width: 3,
  //   bottom: 0,
  //   content: "''",
  //   display: 'none',
  //   position: 'absolute',
  //   borderTopLeftRadius: 4,
  //   borderBottomLeftRadius: 4,
  //   backgroundColor: theme.palette.primary.main
  // }
}));

const ListItemIconStyle = styled(ListItemIcon)({
  width: 22,
  height: 22,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
});

// ----------------------------------------------------------------------

NavItem.propTypes = {
  isShow: PropTypes.bool,
  item: PropTypes.object
};

function NavItem({ item, isShow }) {
  const theme = useTheme();
  const { pathname } = useLocation();
  const { title, path, icon, info, children } = item;
  const isActiveRoot = path ? !!matchPath({ path, end: false }, pathname) : false;
  const { isCollapse, collapseClick, collapseHover, onToggleCollapse, onHoverEnter, onHoverLeave } =
    useCollapseDrawer();

  const [open, setOpen] = useState(isActiveRoot);

  const handleOpen = () => {
    setOpen(!open);
  };

  const activeRootStyle = {
    // color: 'primary.main',
    color: 'white',
    fontWeight: 'fontWeightMedium',
    // bgcolor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
    bgcolor: '#916A00',
    '&:before': { display: 'block' }
  };

  const activeSubStyle = {
    color: 'text.primary',
    fontWeight: 'fontWeightMedium'
  };

  if (children) {
    return (
      <>
        <ListItemStyle
          onClick={handleOpen}
          sx={{
            ...(isActiveRoot && activeRootStyle),
            ...(isCollapse && {
              width: 36,
              height: 32,
              mt: 3.75,
              ml: theme.spacing(0),
              textTransform: 'capitalize',
              padding: theme.spacing(1)
            })
          }}
        >
          <ListItemIconStyle>{icon && icon}</ListItemIconStyle>

          {isShow && (
            <>
              <ListItemText disableTypography primary={title} />
              {info && info}
              <Box
                component={Icon}
                icon={open ? arrowIosDownwardFill : arrowIosForwardFill}
                sx={{ width: 16, height: 16, ml: 1 }}
              />
            </>
          )}
        </ListItemStyle>

        {isShow && (
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {children.map((item) => {
                const { title, path } = item;
                const isActiveSub = path ? !!matchPath({ path, end: false }, pathname) : false;

                return (
                  <ListItemStyle
                    key={title}
                    component={RouterLink}
                    to={path}
                    sx={{
                      ...(isActiveSub && activeSubStyle),
                      ...(isCollapse && {
                        width: 36,
                        height: 32,
                        mt: 3.75,
                        ml: theme.spacing(0),
                        textTransform: 'capitalize',
                        padding: theme.spacing(1)
                      })
                    }}
                  >
                    <ListItemIconStyle>
                      <Box
                        component="span"
                        sx={{
                          width: 4,
                          height: 4,
                          display: 'flex',
                          borderRadius: '50%',
                          alignItems: 'center',
                          justifyContent: 'center',
                          bgcolor: 'text.disabled',
                          transition: (theme) => theme.transitions.create('transform'),
                          ...(isActiveSub && {
                            transform: 'scale(2)',
                            bgcolor: 'primary.main'
                          })
                        }}
                      />
                    </ListItemIconStyle>
                    <ListItemText disableTypography primary={title} />
                  </ListItemStyle>
                );
              })}
            </List>
          </Collapse>
        )}
      </>
    );
  }

  return (
    <ListItemStyle
      component={RouterLink}
      to={path}
      sx={{
        ...(isActiveRoot && activeRootStyle),
        ...(isCollapse && {
          width: 36,
          height: 32,
          mt: 3.75,
          ml: theme.spacing(0),
          textTransform: 'capitalize',
          padding: theme.spacing(1)
        })
      }}
    >
      <ListItemIconStyle>{icon && icon}</ListItemIconStyle>
      {isShow && (
        <>
          <ListItemText disableTypography primary={title} />
          {info && info}
        </>
      )}
    </ListItemStyle>
  );
}

NavSection.propTypes = {
  isShow: PropTypes.bool,
  navConfig: PropTypes.array
};

export default function NavSection({ navConfig, isShow = true, ...other }) {
  return (
    <Box {...other}>
      {navConfig.map((list) => {
        const { subheader, items } = list;
        return (
          <List key={subheader} disablePadding>
            {isShow && <ListSubheaderStyle>{subheader}</ListSubheaderStyle>}
            {items.map((item) => (
              <NavItem key={item.title} item={item} isShow={isShow} />
            ))}
          </List>
        );
      })}
    </Box>
  );
}
