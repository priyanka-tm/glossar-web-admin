import * as Yup from 'yup';
import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';

import { Link, Stack, Checkbox, TextField, CircularProgress } from '@mui/material';
import { BASE_URL, setUserSession } from 'src/utils/comman';
import { apiInstance } from 'src/httpClient';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();
  const [email, setemail] = useState('');
  const [password, setPassword] = useState('');
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const hendelEmail = (e) => {
    console.log('login email ', e.target.value);
    setemail(e.target.value);

    // {(e.data.status === 200) ? <p>loglin success full</p>  : <p>login unsuccessfull</p>}
  };

  const hendelPassword = (e) => {
    console.log('login password', e.target.value);
    setPassword(e.target.value);
  };

  const handleLogin = async () => {
    const loginData = {
      email: email,
      password: password
    };
    setLoader(true);
    try {
      let res = await apiInstance.post(`auth/login`, loginData);
      res = res.data.data;
      setUserSession(res.token, res.name, res.email, res.phone, res);
      navigate('dashboard/user', { replace: true });
    } catch (error) {
      console.log('eeeeee----', error);
      setError('error login fiild');
      // {(e.data.status === 200) ? <p>loglin success full</p>  : <p>login unsuccessfull</p>}
      setErrorMessage('Email or Password invelid!');
    }
    // finally {
    //   setLoader(false);
    // }
  };

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required')
  });

  return (
    <>
      <form>
        <Stack spacing={3}>
          <TextField
            fullWidth
            label="Email address"
            value={email}
            onChange={hendelEmail}
            id="fullWidth"
          />
          <TextField label="Password" value={password} onChange={hendelPassword} />
        </Stack>

        <Stack spacing={3} style={{ my: 3 }}>
          {errorMessage && (
            <div style={{ color: 'red' }} className="error">
              {' '}
              {errorMessage}{' '}
            </div>
          )}
          {/* { res.status === 200 ? <div color='red' className="error"> {errorMessage} </div> : null } */}
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
          <Checkbox defaultChecked />
          <Link href=""> Forgot password?</Link>
        </Stack>

        <Stack>
          <Button sx={{ py: 2 }} onClick={handleLogin} variant="contained">
            {' '}
            Login{' '}
            {loader ? (
              <CircularProgress color="inherit" size={15} style={{ marginLeft: '5px' }} />
            ) : null}
          </Button>
        </Stack>
      </form>
    </>
  );
}
