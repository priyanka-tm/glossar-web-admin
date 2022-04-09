import * as React from 'react';
import {  Stack,Modal } from '@mui/material';
import Button from '@mui/material/Button';
import PageTitle from './Page_title_';
import Iconify from '../Iconify';
import Category_Model from './Categroy_model';


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

export default function BasicModalCategory() {
  const [open, setOpen] = React.useState(false);
  const handleOpen =() => setOpen (true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <PageTitle pageTitle='Category'  />
            <Button
            variant="contained"
            startIcon={<Iconify icon="eva:plus-fill" />}
            onClick={handleOpen}>
            Add Category
            </Button>
        </Stack> 
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
       <Category_Model  onClose={handleClose}/>
      </Modal>
    </div>
  );
}



