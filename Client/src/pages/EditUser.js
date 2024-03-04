import { LoadingButton } from '@mui/lab';
import { Container, IconButton, InputAdornment, Stack, TextField, styled } from '@mui/material';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Iconify from '../components/iconify';

function EditUser() {
    const [showPassword, setShowPassword] = useState(false);
  
      
     
      
      const StyledContent = styled('div')(({ theme }) => ({
        maxWidth: 480,
        margin: 'auto',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        padding: theme.spacing(12, 0),
      }));
  return (
    <Container maxWidth="sm">

        <Stack spacing={3}>
            <TextField id='id' name="id" label="ID" />
              <TextField id='name' name="name" label="Name" />
              <TextField id='email' name="email" label="Email address" />


              <TextField
                id='password'
                name="password"
                label="Password"
                type={showPassword ? 'text' : 'password'}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                        <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}  
              />
              <TextField id='role' name="role" label="Role" />
            </Stack>
                <br/>
            <LoadingButton fullWidth size="large" type="submit" variant="contained" >
              Login
            </LoadingButton>
     
    </Container>
  );
}

export default EditUser;