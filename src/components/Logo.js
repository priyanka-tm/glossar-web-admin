import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
// material
import { Box } from '@mui/material';
import { ReactComponent as YourSvg } from '../Attech/Images/logo.svg';
import logo from '../Attech/Images/logo.gif';

// ----------------------------------------------------------------------

Logo.propTypes = {
  sx: PropTypes.object
};

export default function Logo({ sx }) {
  return (
    <RouterLink to="/">
      <Box sx={{ width: 150, height: 10, ...sx }}>
        <YourSvg />
        {/* <Image source={{ uri: '../Attech/logo.gif' }} /> */}
        {/* <img src={logo} alt="" /> */}
      </Box>
    </RouterLink>
  );
}
