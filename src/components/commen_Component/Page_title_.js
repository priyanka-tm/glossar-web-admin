

import {
    Typography,
  } from '@mui/material';

export default function PageTitle (props){

    return(
        <Typography variant="h4" gutterBottom>
        {props.pageTitle}
        </Typography>
    );
};