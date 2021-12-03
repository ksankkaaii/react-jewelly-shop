// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import SvgIconStyle from '../../components/SvgIconStyle';

// ----------------------------------------------------------------------

const getIcon = (name) => (
  <SvgIconStyle src={`/static/icons/navbar/${name}.svg`} sx={{ width: '100%', height: '100%' }} />
);

const ICONS = {
  user: getIcon('ic_user'),
  ecommerce: getIcon('ic_ecommerce'),
  analytics: getIcon('ic_analytics'),
  dashboard: getIcon('ic_dashboard')
};

const sidebarConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    subheader: 'general',
    items: [
      { title: 'Analytic', path: PATH_DASHBOARD.general.analytics, icon: ICONS.dashboard },
      { title: 'Enquiry', path: PATH_DASHBOARD.general.enquiries, icon: ICONS.analytics },
      { title: 'Profile', path: PATH_DASHBOARD.general.profile, icon: ICONS.ecommerce },
      { title: 'Task', path: PATH_DASHBOARD.general.tasks, icon: ICONS.analytics }
    ]
  }
];

export default sidebarConfig;
