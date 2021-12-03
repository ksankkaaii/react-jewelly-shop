// ----------------------------------------------------------------------

function path(root, sublink) {
  return `${root}${sublink}`;
}

const ROOTS_DASHBOARD = '/dashboard';

// ----------------------------------------------------------------------

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  general: {
    pageOne: path(ROOTS_DASHBOARD, '/one'),
    analytics: path(ROOTS_DASHBOARD, '/Analytics'),
    enquiries: path(ROOTS_DASHBOARD, '/Enquiries'),
    profile: path(ROOTS_DASHBOARD, '/Profile'),
    tasks: path(ROOTS_DASHBOARD, '/Tasks')
  }
};
