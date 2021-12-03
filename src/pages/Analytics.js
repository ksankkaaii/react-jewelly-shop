import { useState } from 'react';
// material
import {
  Container,
  Typography,
  Grid,
  Box,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  InputAdornment,
  FormHelperText
} from '@mui/material';
// hooks
import useSettings from '../hooks/useSettings';
// components
import Page from '../components/Page';
import {
  EcommerceProductSold,
  EcommerceYearlySales,
  EcommerceBestSalesman,
  EcommerceLatestProducts
} from '../components/_dashboard/general-ecommerce';

// ----------------------------------------------------------------------

export default function PageOne() {
  const { themeStretch } = useSettings();

  const [day, setDay] = useState('');

  const handleChange = (event) => {
    setDay(event.target.value);
  };

  // const [values, setValues] = useState({
  //   weight: ''
  // });

  // const handleChange = (prop) => (event) => {
  //   setValues({ ...values, [prop]: event.target.value });
  // };

  return (
    <Page title="Analytics | Minimal-UI">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Box sx={{ display: 'flex' }}>
          <Typography variant="h3" component="h1" paragraph sx={{ width: '35%', ml: 2 }}>
            Analytics
          </Typography>
          <div sx={{ width: '65%' }}>
            <FormControl sx={{ m: 1, minWidth: 150, ml: 6 }}>
              <InputLabel id="demo-simple-select-autowidth-label" sx={{ color: 'black' }}>
                Past 30 days
              </InputLabel>
              <Select
                labelId="demo-simple-select-autowidth-label"
                id="demo-simple-select-autowidth"
                value={day}
                onChange={handleChange}
                autoWidth
                label="Past 30 days"
              >
                <MenuItem value="">
                  <em>Past a week</em>
                </MenuItem>
                <MenuItem value={10}>Past 30 days</MenuItem>
                <MenuItem value={21}>Past 45 days</MenuItem>
                <MenuItem value={22}>Past 100 days</MenuItem>
              </Select>
            </FormControl>

            <FormControl sx={{ m: 1, width: '23ch', ml: 6 }} variant="outlined">
              <OutlinedInput
                id="outlined-adornment-weight"
                value={'10/19/2021 -> 11/18/2021'}
                // value={values.weight}
                // onChange={handleChange('weight')}
                // endAdornment={<InputAdornment position="end">kg</InputAdornment>}
                aria-describedby="outlined-weight-helper-text"
                // inputProps={{
                //   'aria-label': 'weight'
                // }}
              />
            </FormControl>
          </div>
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <EcommerceProductSold />
          </Grid>
          <Grid item xs={12} md={8}></Grid>

          <Grid item xs={12} md={6} lg={8}>
            <EcommerceYearlySales />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <EcommerceLatestProducts />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <EcommerceBestSalesman />
          </Grid>

          <Grid item xs={12} md={6} lg={4}></Grid>
        </Grid>
      </Container>
    </Page>
  );
}
