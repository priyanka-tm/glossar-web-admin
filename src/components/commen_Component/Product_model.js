import * as React from 'react';
import { useState, useCallback, useEffect } from 'react';
import {
  CircularProgress,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack
} from '@mui/material';
import Box from '@mui/material/Box';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { apiInstance } from 'src/httpClient';
import { Col, Row } from 'react-bootstrap';
import { BASE_URL, IMG_URL } from 'src/utils/comman';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 1100,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 3,
  overflow: 'scroll'
};

export default function ProductModel(props) {
  const [productData, setProductData] = useState({
    image: props?.allProductData?.image || '',
    name: props?.allProductData?.name || '',
    detail: props?.allProductData?.detail || '',
    price: props?.allProductData?.price || '',
    quantity: props?.allProductData?.quantity || '',
    weight: props?.allProductData?.weight || '',
    category: props?.allProductData?.category || ''
  });
  console.log('props?.allProductData?.image: ', props?.allProductData?.image);

  const [age, setAge] = useState('');
  const [loader, setLoader] = useState(false);
  const [allData, setAllData] = useState([]);
  const [file, setFile] = useState([]);
  const [images, setImages] = useState([]);
  const [imgUrl, setImgUrl] = useState([]);

  useEffect(() => {
    getAllCategory();
  }, []);

  const hendelFormData = useCallback((e) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  });

  const handleChange = (event) => {
    console.log('event: ', event.target.value);
    setAge(event.target.value);
  };

  const handleSubmit = async () => {
    const formData = new FormData();

    for (let i = 0; i < images.length; i++) {
      formData.append('singleFile', images[i]);
    }

    console.log('imges---', images);
    for (var pair of formData.entries()) {
      console.log(pair[0] + ', ' + pair[1]);
    }

    setLoader(true);
    try {
      const res = await apiInstance.post(`file/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('res.status: ', res.status);

      if (res.status == 200) {
        console.log('status: ');
        setImgUrl(res.data.data.url);
        console.log('res.data.data.url: ', res.data.data.url);
        console.log('---imgUrl', imgUrl);
        const productAllData = {
          image: res.data.data.url,
          name: productData.name,
          detail: productData.detail,
          price: productData.price,
          quantity: productData.quantity,
          weight: productData.weight,
          category: age
        };
        console.log('bodyyy', productAllData);

        if (props.isProductEdit) {
          try {
            const res = await apiInstance.put(
              `product/update/${props.allProductData._id}`,
              productAllData
            );
            console.log('-=-=-=-=-=-=-=-=-= product all data  -=-=-=-=-=-=-=-=-=');
            console.log('product update', res.data.data);
            console.log('------------------------');
            setLoader(false);
            props.onClose();
            props.ProductGet;
          } catch (e) {
            console.log('eeeee--upp-0000-', e.response);
          }
        } else {
          try {
            const resp = await apiInstance.post(`product/create`, productAllData);
            console.log('---add----', resp);
          } catch (e) {
            console.log('eeeee---0000-', e.response);
          }
        }

        // try {
        //   if (props.isProductEdit) {
        //     res = await apiInstance.put(`product/update/${props.allProductData._id}`, productAllData);
        //     console.log('-=-=-=-=-=-=-=-=-= product all data  -=-=-=-=-=-=-=-=-=');
        //     console.log('product', res);
        //     console.log('------------------------');
        //     setLoader(false);
        //     props.onClose();
        //     props.ProductGet;
        //   }
        // } catch (e) {
        //   console.log('eeeee---0000-', e.response);
        // }
      }
    } catch (e) {
      console.log('eeeee----', e.response);
    } finally {
    }

    // setLoader(true);
    // try {
    //   let res = {};
    //   if (props.isProductEdit) {
    //     res = await apiInstance.put(`product/update/${props.allProductData._id}`, productData);
    //     // console.log('-=-=-=-=-=-=-=-=-= product all data  -=-=-=-=-=-=-=-=-=');
    //     // console.log('product', res);
    //     // console.log('------------------------');
    //     setLoader(false);
    //     props.onClose();
    //     props.ProductGet;
    //   } else {
    //     console.log(' else part of product section  ');

    //     // const addProductData = {
    //     //   image: formData.image,
    //     //   name: formData.name,
    //     //   detail: formData.detail,
    //     //   price: formData.price,
    //     //   quantity: formData.quantity,
    //     //   weight: formData.weight,
    //     //   category: allData._id
    //     // };
    //     console.log('=============addProductData============= ', productData);
    //     res = await apiInstance.post(`product/create`, productData.image);
    //     console.log('imagessssssssssss', productData.image);
    //     console.log('post call ', res);
    //     setLoader(false);
    //     props.onClose();
    //     props.ProductGet;
    //   }
    // } catch (error) {
    //   console.log('error ', error.response);
    // }
  };

  const getAllCategory = async () => {
    // console.log('getAllUser: ');
    try {
      const res = await apiInstance.get(`category/get-all`);
      // console.log('all user data', res);
      setAllData(res.data.data);
    } catch (error) {
      console.log('error', error);
    }
  };

  const Input = styled('input')({
    display: 'none'
  });

  const uploadMultipleFiles = async (e) => {
    let fileObj = [];
    let fileArray = [];
    fileObj.push(e.target.files);
    for (let i = 0; i < fileObj[0].length; i++) {
      fileArray.push(URL.createObjectURL(fileObj[0][i]));
    }
    setFile([...file, ...fileArray]);
    setImages([...images, ...fileObj[0]]);

    // setTimeout(async () => {
    //   const formData = new FormData();
    //   for (let i = 0; i < file.length; i++) {
    //     formData.append('singleFile', file[i]);
    //   }
    //   console.log('images: ', images);

    //   for (var pair of formData.entries()) {
    //     console.log(pair[0] + ', ' + pair[1]);
    //   }
    //   try {
    //     const res = await apiInstance.post(`file/upload`, formData);
    //     console.log('iiiiii-------', res);
    //   } catch (e) {
    //     console.log('weeeeee: ', e.response);
    //   }
    // }, 2000);
  };

  return (
    <Box sx={style}>
      <Grid container>
        <Grid item xs={12}>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Typography variant="h4" gutterBottom component="div">
              {props.isProductEdit ? 'Edit Product' : 'Add Product'}
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
                value={productData.name}
                onChange={hendelFormData}
                label="Product Name"
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
                name="detail"
                value={productData.detail}
                onChange={hendelFormData}
                label="Product Detail"
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
                name="price"
                value={productData.price}
                onChange={hendelFormData}
                label="Product Price"
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
                name="qunantity"
                value={productData.qunantity}
                onChange={hendelFormData}
                label="Product Quantity"
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
                name="weight"
                value={productData.weight}
                onChange={hendelFormData}
                label="Product Weight"
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
              <FormControl sx={{ m: 1, minWidth: 80 }}>
                <InputLabel id="demo-simple-select-autowidth-label">category</InputLabel>
                <Select
                  labelId="demo-simple-select-autowidth-label"
                  id="demo-simple-select-autowidth"
                  value={age}
                  onChange={handleChange}
                  autoWidth
                  label="Age"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>

                  {allData.map((e) => {
                    {
                      /* const {name} = e; */
                    }
                    {
                      /* console.log('this is all data', e);/ */
                    }
                    return <MenuItem value={e.id}>{e.name}</MenuItem>;
                  })}
                </Select>
              </FormControl>
            </Box>
          </Grid>

          <Grid item xs={6}>
            <Row>
              <Col>
                <div className="form-group">
                  <input
                    type="file"
                    className="form-control"
                    onChange={uploadMultipleFiles}
                    multiple
                  />
                </div>
                {(file || []).map((url, index) => {
                  console.log('url: ', url);
                  return (
                    <div
                      key={url}
                      style={{
                        width: '200px',
                        height: '170px',
                        position: 'relative',
                        marginRight: '10px',
                        marginBottom: '20px'
                      }}
                    >
                      <img src={url.image} alt="" style={{ height: '100%', width: '100%' }} />
                    </div>
                  );
                })}

                {/* {props?.allProductData?.image.map((e) => {
                  console.log('e: ', e);
                  {
                    props?.allProductData && props?.allProductData?.image ? (
                      <img src={IMG_URL + props?.allProductData?.image} />
                    ) : null;
                  }
                  return <img src={e.image} />;
                })} */}
                <div>
                  {props?.allProductData?.image && props.allProductData?.image.length
                    ? props?.allProductData?.image.map((ele) => {
                        console.log('ele:======= ', ele);
                        return <img src={IMG_URL + ele} alt="img" />;
                      })
                    : 'hellooo'}
                </div>

                {/* <div className="form-group multi-preview">
                  {file && file.length > 0
                    ? (file || []).map((url) => {
                        console.log('url:-------- ', url);
                        <img src={url} alt="img" height="60px" />;
                      })
                    : 'hello'}
                </div> */}
              </Col>
            </Row>

            {/* <MultipleImageUploadComponent name="image" value={formData.image} /> */}
          </Grid>

          <Grid item xs={12}>
            <Box sx={{ my: 2 }}>
              <Button
                style={{ width: '100%' }}
                sx={{ py: 2 }}
                variant="contained"
                onClick={handleSubmit}
              >
                {props.isProductEdit ? 'Update' : 'Add Product'}
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
