import * as React from 'react';
import {  Modal, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import ProductModel from './Product_model';
import PageTitle from './Page_title_';
import Iconify from '../Iconify';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 1100,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 3 ,
};

export default function BasicModalProduct() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  

  const Input = styled('input')({
    display: 'none',
  });

  return (
    <div>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <PageTitle pageTitle='Product'  />
            <Button
            variant="contained"
            startIcon={<Iconify icon="eva:plus-fill" />}
            onClick={handleOpen}>
            Add Product
            </Button>
        </Stack>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      > 
       
       <ProductModel  onClose={handleClose}/>
      </Modal>
    </div>
  );
}



