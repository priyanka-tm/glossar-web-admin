import * as React from 'react';
import { useState, useCallback } from 'react';
import styled from '@emotion/styled';
import { BASE_URL, getToken } from 'src/utils/comman';
import { apiInstance } from 'src/httpClient';
import { PeopleSharp } from '@mui/icons-material';
import { Box } from '@mui/system';
import {
  Grid,
  IconButton,
  Stack,
  TextField,
  Typography,
  Button,
  CircularProgress
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 1100,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 3
};

export default function UserModel(props) {
  console.log('props:00000========== ', props.UserGet);

  const [formData, setFormData] = useState({
    name: props?.alldata?.name || '',
    email: props?.alldata?.email || '',
    number: props?.alldata?.number || '',
    userName: props?.alldata?.userName || '',
    address: props?.alldata?.address || '',
    password: props?.alldata?.password || ''
  });

  const hendelFormData = useCallback((e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  });

  const [loader, setLoader] = useState(false);

  // const token = getToken();

  const handleSubmit = async () => {
    console.log('handleSubmit: ', handleSubmit);

    setLoader(true);
    try {
      let res = {};
      if (props.isUserEdit) {
        const userData = {
          userName: formData.userName,
          name: formData.name,
          phone: formData.phone,
          address: formData.address
        };

        res = await apiInstance.put(`user/update/${props.alldata._id}`, userData);
        console.log('upodate res: ', res);
        // console.log("========SubmitData==========");
        props.onClose();
        props.UserGet();
      } else {
        console.log('else: ');

        const adduserData = {
          userName: formData.userName,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
          address: formData.address
        };
        console.log('adduserData: ', adduserData);
        res = await apiInstance.post(`user/register`, adduserData);
        // console.log('post call ', res);
        setLoader(false);
        props.onClose();
        props.getAllUser();
      }
    } catch (error) {
      // console.log('error ', error.response);
    }
  };

  const Input = styled('input')({
    display: 'none'
  });

  return (
    <Box sx={style}>
      <Grid container>
        <Grid item xs={12}>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Typography variant="h4" gutterBottom component="div">
              {props.isUserEdit ? 'Edit User' : 'Add User'}
            </Typography>

            <IconButton onClick={props.onClose} aria-label="delete" color="primary">
              <CloseIcon />
            </IconButton>
          </Stack>
        </Grid>

        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={6}>
            <Box
              sx={{
                maxWidth: '100',
                my: 1
              }}
            >
              <TextField
                fullWidth
                name="name"
                label="User Name"
                value={formData.name}
                onChange={hendelFormData}
                id="fullWidth"
              />
            </Box>
          </Grid>

          <Grid item xs={6}>
            <Box
              sx={{
                maxWidth: '100',
                my: 1
              }}
            >
              <TextField
                fullWidth
                name="email"
                label="User Email"
                value={formData.email}
                onChange={hendelFormData}
                id="fullWidth"
              />
            </Box>
          </Grid>

          <Grid item xs={6}>
            <Box
              sx={{
                maxWidth: '100',
                my: 1
              }}
            >
              <TextField
                fullWidth
                label="Phone Number"
                name="number"
                type="number"
                value={formData.number}
                onChange={hendelFormData}
                id="fullWidth"
              />
            </Box>
          </Grid>

          <Grid item xs={6}>
            <Box
              sx={{
                maxWidth: '100',
                my: 1
              }}
            >
              <TextField
                fullWidth
                label="Password"
                name="password"
                value={formData.password}
                onChange={hendelFormData}
                id="fullWidth"
              />
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Box
              sx={{
                maxWidth: '100',
                my: 1
              }}
            >
              <TextField
                fullWidth
                label="User Name"
                name="userName"
                value={formData.userName}
                onChange={hendelFormData}
                id="fullWidth"
              />
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Box
              sx={{
                maxWidth: '100',
                my: 1
              }}
            >
              <TextField
                fullWidth
                label="User Address"
                name="address"
                value={formData.address}
                onChange={hendelFormData}
                id="fullWidth"
              />
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Box sx={{ my: 2 }}>
              <Button
                style={{ width: '100%' }}
                sx={{ py: 2 }}
                variant="contained"
                onClick={handleSubmit}
              >
                {props.isUserEdit ? 'Edit' : 'Add'}
                {loader ? (
                  <CircularProgress color="inherit" size={15} style={{ marginLeft: '5px' }} />
                ) : null}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
