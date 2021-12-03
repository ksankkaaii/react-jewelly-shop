import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
// material
import { alpha, styled } from '@mui/material/styles';
import { Box, Link, Stack, Avatar, Drawer, Tooltip, Typography, CardActionArea } from '@mui/material';
// hooks
import useCollapseDrawer from '../../hooks/useCollapseDrawer';
// components
import Logo from '../../components/Logo';
import Scrollbar from '../../components/Scrollbar';
import NavSection from '../../components/NavSection';
//
import { MHidden } from '../../components/@material-extend';
import sidebarConfig from './SidebarConfig';

// ----------------------------------------------------------------------

const DRAWER_WIDTH = 280;
const COLLAPSE_WIDTH = 72;

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('lg')]: {
    flexShrink: 0,
    transition: theme.transitions.create('width', {
      duration: theme.transitions.duration.complex
    })
  }
}));

IconCollapse.propTypes = {
  onToggleCollapse: PropTypes.func,
  collapseClick: PropTypes.bool
};

function IconCollapse({ onToggleCollapse, collapseClick, isCollapse }) {
  return (
    <Tooltip title="Mini Menu">
      <CardActionArea
        onClick={onToggleCollapse}
        sx={{
          display: 'flex',
          cursor: 'pointer',
          alignItems: 'center',
          justifyContent: 'center',
          mr: 3,
          borderRight: 'solid 11px #916A00',
          borderBottom: 'solid 11px transparent',
          borderTop: 'solid 11px transparent',
          ...(collapseClick && {
            borderWidth: 2
          })
        }}
      ></CardActionArea>
    </Tooltip>
  );
}

DashboardSidebar.propTypes = {
  isOpenSidebar: PropTypes.bool,
  onCloseSidebar: PropTypes.func
};

export default function DashboardSidebar({ isOpenSidebar, onCloseSidebar }) {
  const { pathname } = useLocation();

  const { isCollapse, collapseClick, collapseHover, onToggleCollapse, onHoverEnter, onHoverLeave } =
    useCollapseDrawer();

  useEffect(() => {
    if (isOpenSidebar) {
      onCloseSidebar();
    }
  }, [pathname]);

  const renderContent = (
    <Scrollbar
      sx={{
        height: '100%',
        '& .simplebar-content': {
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          ...(isCollapse && {
            alignItems: 'center'
          })
        }
      }}
    >
      <Stack
        spacing={3}
        sx={{
          pl: 3.375,
          pt: 4.25,
          ...(isCollapse && {
            pt: 2.625,
            pl: 0,
            alignItems: 'center'
          })
        }}
      >
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Box component={RouterLink} to="/" sx={{ display: 'inline-flex' }}>
            <Logo />
            {/* {isCollapse && <IconCollapse onToggleCollapse={onToggleCollapse} collapseClick={collapseClick} />} */}
          </Box>

          <MHidden width="lgDown">
            {!isCollapse && <IconCollapse onToggleCollapse={onToggleCollapse} collapseClick={collapseClick} />}
          </MHidden>
        </Stack>
      </Stack>

      <NavSection navConfig={sidebarConfig} isShow={!isCollapse} />
    </Scrollbar>
  );

  return (
    <RootStyle
      sx={{
        width: {
          lg: isCollapse ? COLLAPSE_WIDTH : DRAWER_WIDTH
        },
        ...(collapseClick && {
          position: 'absolute'
        })
      }}
    >
      <MHidden width="lgUp">
        <Drawer
          open={isOpenSidebar}
          onClose={onCloseSidebar}
          PaperProps={{
            sx: { width: DRAWER_WIDTH }
          }}
        >
          {renderContent}
        </Drawer>
      </MHidden>

      <MHidden width="lgDown">
        <Drawer
          open
          variant="persistent"
          // onMouseEnter={onHoverEnter}
          // onMouseLeave={onHoverLeave}
          PaperProps={{
            sx: {
              width: DRAWER_WIDTH,
              bgcolor: 'background.default',
              ...(isCollapse && {
                width: COLLAPSE_WIDTH
              }),
              ...(collapseHover && {
                borderRight: 0,
                backdropFilter: 'blur(6px)',
                WebkitBackdropFilter: 'blur(6px)', // Fix on Mobile
                boxShadow: (theme) => theme.customShadows.z20,
                // bgcolor: (theme) => alpha(theme.palette.background.default, 0.88)
                bgcolor: 'black'
              })
            }
          }}
        >
          {renderContent}
        </Drawer>
      </MHidden>
    </RootStyle>
  );
}
