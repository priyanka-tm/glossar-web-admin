import * as React from 'react';
import { useState } from 'react';
import {
  Grid,
  IconButton,
  Stack,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from '@mui/material';
import Box from '@mui/material/Box';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { apiInstance } from 'src/httpClient';

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

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

// const rows = [
//   createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//   createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//   createData('Eclair', 262, 16.0, 24, 6.0),
//   createData('Cupcake', 305, 3.7, 67, 4.3),
//   createData('Gingerbread', 356, 16.0, 49, 3.9)
// ];

export default function Order_Model(props) {
  const [loader, setLoader] = useState(false);

  console.log('props+++++++++++: ', props);
  console.log(' props?.allOrderData?.userName: ', props?.allOrderData?.userName);

  const orderHendelAcceptes = async () => {
    try {
      const orderData = {
        status: 'ACCEPTED'
      };
      const rep = await apiInstance.put(`order/update/${props.allOrderData._id}`, orderData);
      console.log('rep: ACCEPTED ', rep);
      setLoader(false);
      props.onClose();
      props.OrderGet();
    } catch (error) {
      console.log(error.response);
    }
  };

  const orderHendelCencal = async () => {
    try {
      const orderData = {
        status: 'CANCELED'
      };
      const rep = await apiInstance.put(`order/update/${props.allOrderData._id}`, orderData);
      console.log('rep: CANCELED ', rep);
      setLoader(false);
      props.onClose();
      props.OrderGet();
    } catch (error) {
      console.log(error.response);
    }
  };

  const Input = styled('input')({
    display: 'none'
  });

  return (
    <Box sx={style}>
      <Grid item xs={12}>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="h3" gutterBottom component="div">
            Reciver
          </Typography>

          <IconButton onClick={props.onClose} aria-label="delete" color="primary">
            <CloseIcon />
          </IconButton>
        </Stack>
      </Grid>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Box
          sx={{
            mt: 2
          }}
        >
          <Typography variant="h5">Order No : {props.allOrderData.orderId}</Typography>
          <Typography variant="subtitle1" sx={{ my: 1 }}>
            name : {props.allOrderData.buyer_user.userName}
          </Typography>
          <Typography variant="subtitle1" sx={{ my: 1 }}>
            Email : {props.allOrderData.buyer_user.email}
          </Typography>
          <Typography variant="subtitle1" sx={{ my: 1 }}>
            address
          </Typography>
          <Typography variant="subtitle1">
            Phone Number : {props.allOrderData.buyer_user.phone}
          </Typography>
        </Box>

        <Box>
          <Typography variant="subtitle1" sx={{ my: 1 }}>
            Order Date
          </Typography>
        </Box>
      </Stack>

      <Box
        sx={{
          my: 5
        }}
      >
        <TableContainer>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>No</TableCell>
                <TableCell align="right">description</TableCell>
                <TableCell align="right">Qty</TableCell>
                <TableCell align="right">Unit Cost</TableCell>
                <TableCell align="right">Total</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {/* {map((row) => ( */}

              {props.allOrderData.product.map((e) => {
                console.log('e: ', e);
                return (
                  <>
                    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                      <TableCell component="th" scope="row"></TableCell>
                      <TableCell align="right">{e?.item?.name}</TableCell>
                      <TableCell align="right">{e?.item?.quantity}</TableCell>
                      <TableCell align="right">{e?.item?.price}</TableCell>
                      <TableCell align="right">{e?.item?.quantity * e?.item?.price}</TableCell>
                    </TableRow>
                  </>
                );
              })}
              {/* <TableCell align="right">
                  {props.allOrderData.product[0].quantity} * {props.allOrderData.product[0].price}
                </TableCell> */}

              {/* ))} */}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <Box
        sx={{
          mt: 5,
          mb: 4
        }}
      >
        <Stack direction="row" spacing={2} justifyContent="end">
          {/* <Button variant="contained" color="secondary">
            pending
          </Button> */}

          {props.allOrderData.status === 'ACCEPTED' ? (
            <Button variant="contained" color="error" onClick={orderHendelCencal}>
              cancle
            </Button>
          ) : props.allOrderData.status === 'PENDING' ? (
            <Stack direction="row" spacing={2} justifyContent="end">
              <Button
                variant="contained"
                style={{ color: 'white' }}
                color="success"
                onClick={orderHendelAcceptes}
              >
                Accepts
              </Button>
              <Button variant="contained" color="error" onClick={orderHendelCencal}>
                cancle
              </Button>
            </Stack>
          ) : (
            <Typography variant="subtitle1" sx={{ my: 1 }}>
              'order is canclled'
            </Typography>
          )}

          {/* {props.allOrderData.status == 'ACCEPTED' ? (
            <Button
              variant="contained"
              style={{ color: 'white' }}
              color="success"
              onClick={orderHendelAcceptes}
            >
              Acceptes
              {loader ? (
                <CircularProgress color="inherit" size={15} style={{ marginLeft: '5px' }} />
              ) : null}
            </Button>
          ) : (
            <Button
              variant="contained"
              style={{ color: 'white' }}
              color="success"
              onClick={orderHendelAcceptes}
              disabled
            >
              Acceptes
            </Button>
          )} */}

          {/* {props.allOrderData.status == 'CANCEL' ? (
            <Button variant="contained" color="error" onClick={orderHendelCencal}>
              Cencal
              {loader ? (
                <CircularProgress color="white" size={15} style={{ marginLeft: '5px' }} />
              ) : null}
            </Button>
          ) : (
            <Button disabled variant="contained" color="error" onClick={orderHendelCencal}>
              Cencal
            </Button>
          )} */}
        </Stack>
      </Box>
    </Box>
  );
}
