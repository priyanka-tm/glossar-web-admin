import { useEffect, useRef, useState } from 'react';
// material
import {
  Menu,
  Box,
  MenuItem,
  IconButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Modal
} from '@mui/material';
// component
import Iconify from '../../../components/Iconify';
import UserModel from 'src/components/commen_Component/user_model';
import ProductModel from 'src/components/commen_Component/Product_model';
import Category_Model from 'src/components/commen_Component/Categroy_model';
import { apiInstance } from 'src/httpClient';
import Order_Model from 'src/components/commen_Component/Order_Model';

// ----------------------------------------------------------------------

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

export default function UserMoreMenu(props) {
  // console.log('props more menu delet: --------', props);
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    console.log('handleClose: ', handleClose);
    setOpen(false);
    // props.getUser();
  };

  const userDataDelete = async () => {
    if (props.type == 'user') {
      try {
        const res = await apiInstance.delete(`user/hard-delete/${props.data._id}`);
        // console.log('=-=-=-=-= this is delete  =-=-=-=-=-=--=-=', res);
        props.getUser();
      } catch (error) {
        // console.log('error: ', error.response);
      }
    } else if (props.type == 'product') {
      console.log('product: ');
      try {
        const res = await apiInstance.delete(`product/remove/${props.data._id}`);
        // console.log('respo: ', res);
        props.allProductGet();
      } catch (error) {
        // console.log('error: ', error.response);
      }
      console.log('props.data._id: ', props.data._id);
    } else if (props.type == 'category') {
      try {
        const response = await apiInstance.delete(`category/delete/${props.data._id}`);
        // console.log('response: ', response);
        props.getUser();
      } catch (error) {
        // console.log('error: ', error.response);
      }
    } else {
      try {
        const response = await apiInstance.delete(`order/remove/${props.data._id}`);
      } catch (error) {
        // console.log('error: ', error.response);
      }
    }
  };

  return (
    <>
      <IconButton ref={ref} onClick={() => setIsOpen(true)}>
        <Iconify icon="eva:more-vertical-fill" width={20} height={20} />
      </IconButton>

      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: { width: 200, maxWidth: '100%' }
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem onClick={userDataDelete} sx={{ color: 'text.secondary' }}>
          <ListItemIcon>
            <Iconify icon="eva:trash-2-outline" width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Delete" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>

        <MenuItem onClick={handleOpen} sx={{ color: 'text.secondary' }}>
          <ListItemIcon>
            {props.type == 'order' ? (
              <Iconify icon="eva:info-fill" width={24} height={24} />
            ) : (
              <Iconify icon="eva:edit-fill" width={24} height={24} />
            )}
          </ListItemIcon>
          <ListItemText primary="Edit" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>

        <Modal open={open} onClose={handleClose}>
          <Box sx={style}>
            {props.type == 'user' ? (
              <UserModel
                UserGet={props.getUser}
                alldata={props.data}
                isUserEdit
                buttonName="Edit User"
                onClose={handleClose}
              />
            ) : null}
            {props.type == 'product' ? (
              <ProductModel
                allProductGet={props.allProductGet}
                allProductData={props.data}
                isProductEdit
                name="Edit Product"
                buttonName="Edit Product"
                onClose={handleClose}
              />
            ) : null}
            {props.type == 'category' ? (
              <Category_Model
                CategoryGet={props.CategoryGet}
                allCategoryData={props.data}
                isCategoryEdit
                name="Edit Category"
                buttonName="Edit Category"
                onClose={handleClose}
              />
            ) : null}
            {/* {props.type == 'order' ? (
              <Category_Model
                CategoryGet={props.CategoryGet}
                allCategoryData={props.data}
                isOrderEdit
                name="Edit Order"
                buttonName="Edit Order"
                onClose={handleClose}
              />
            ) : null} */}
            {props.type == 'order' ? (
              <Order_Model
                OrderGet={props.OrderGet}
                allOrderData={props.data}
                isOrderEdit
                name="Edit Order"
                buttonName="Edit Order"
                onClose={handleClose}
              />
            ) : null}
          </Box>
        </Modal>
      </Menu>
    </>
  );
}
