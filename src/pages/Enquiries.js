// material
import { Container, Typography, Grid } from '@mui/material';
// hooks
import useSettings from '../hooks/useSettings';
// components
import Page from '../components/Page';
import { BookingDetails } from '../components/_dashboard/general-enquiries';

// ----------------------------------------------------------------------

export default function PageTwo() {
  const { themeStretch } = useSettings();

  return (
    <Page title="Enquiries | Minimal-UI">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Typography variant="h3" component="h1" paragraph>
          Enquiries
        </Typography>
        <Typography variant="h6" component="h1" paragraph>
          Today's Enquiries
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <BookingDetails />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
