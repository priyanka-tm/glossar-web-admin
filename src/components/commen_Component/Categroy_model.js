import * as React from 'react';
import { useState, useCallback } from 'react';
import { Grid, IconButton, Stack } from '@mui/material';
import Box from '@mui/material/Box';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { apiInstance } from 'src/httpClient';
import { Col, Row } from 'react-bootstrap';
import { IMG_URL } from 'src/utils/comman';

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

export default function Category_Model(props) {
  console.log('props:00000========== ', props.allCategoryGet);
  const [category, setCategory] = useState({
    image: props?.allCategoryGet?.image || '',
    name: props?.allCategoryGet?.name || ''
  });
  console.log('props?.allCategoryGet?.image: ', props?.allCategoryGet?.image);

  const [imgUrl, setImgUrl] = useState([]);
  const [file, setFile] = useState([]);

  const [loader, setLoader] = useState(false);

  const hendelCategory = useCallback((e) => {
    setCategory({ ...category, [e.target.name]: e.target.value });
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
      const res = await apiInstance.post(`category/create`, formData);

      console.log('============ categoty respon =============', res.status);

      if (res.status == 200) {
        console.log('res.status: ', res.status);
        setImgUrl(res.data.data.url);
        console.log('res.data.data.url: ', res.data.data.url);
        console.log(' img url ', imgUrl);

        const categoryData = {
          image: res.data.data.url,
          name: category.name
        };
        console.log('categoryData: ', categoryData);

        if (props.isCategoryEdit) {
          try {
            const res = await apiInstance.put(
              `category/update/${props.allCategoryGet._id}`,
              categoryData
            );
            console.log('category respons', res.data.data);
            setLoader(false);
            props.onClose();
            props.CategoryGet;
          } catch (error) {
            console.log('error ', error.respons);
          }
        } else {
          try {
            const respons = await apiInstance.post(`category/create`, categoryData);
            console.log('respons: ', respons);
          } catch (error) {
            console.log('category post call error', error.response);
          }
        }
      }
    } catch (error) {
      console.log('================ error ================', error.response);
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
              {props.isCategoryEdit ? 'Edit Category' : 'Add Category'}
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
                value={category.name}
                onChange={hendelCategory}
                id="fullWidth"
              />
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

                {category.image.map((e) => {
                  console.log('e: ', e);
                  {
                    props?.allCategoryGet && props?.allCategoryGet?.image ? (
                      <img src={IMG_URL + props?.allCategoryGet?.image} />
                    ) : null;
                  }
                  return <img src={e.image} />;
                })}

                {/* {category.image.map((e) => {
                  console.log('e: ', e);
                  {
                    props?.allCategoryGet && props?.allCategoryGet?.image ? (
                      <img src={IMG_URL + props?.allCategoryGet?.image} />
                    ) : null;
                  }
                  return <img src={e.image} />;
                })} */}
              </Col>
            </Row>
          </Grid>

          <Grid item xs={12}>
            <Box sx={{ my: 2 }}>
              <Button
                style={{ width: '100%' }}
                sx={{ py: 2 }}
                variant="contained"
                onClick={handleSubmit}
              >
                {props.isCategoryEdit ? 'Update' : 'Add Category'}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
