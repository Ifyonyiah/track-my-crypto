import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { AppBar, Box, Button, Tab, Tabs } from '@material-ui/core';
import Login from './Login';
import Signup from './Signup';
import GoogleButton from 'react-google-button';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { CryptoState } from '../../Cryptocontext';
import { auth } from '../../firebase';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
      width: 400,
    backgroundColor: theme.palette.background.paper,
    borderRadius: 10,
    color: "white",
  },
  google: {
    padding: 24,
    paddingTop: 0,
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
    gap: 20,
    fontSize: 20,
    color: "#3279a8",
  },
}));

export default function AuthModal() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
      setValue(newValue);
  };

  const {setAlert} = CryptoState();

  const googleProvider = new GoogleAuthProvider();

  const SignInWithGoogle = () => {
    signInWithPopup(auth, googleProvider).then((res) => {
      setAlert({
        open: true,
        message: `Sign Up Successful. Welcome ${res.user.email}`,
        type: "success",
      });
      handleClose();
    })
    .catch((error) => {
      setAlert({
        open: true,
        message: error.message,
        type: "error",
      });
      return;
    });
  };

  return (
    <div>
      <Button variant="contained"
      style={{
          width: 85,
          height: 40,
          backgroundColor: "#3279a8",
      }}
      onClick={handleOpen}
      >
          Login
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <AppBar position='static'
            style={{backgroundColor: "transparent", color: "#3279a8"}}
            >
            <Tabs value={value} onChange={handleChange} variant="fullwidth"
            style={{borderRadius: 10}}
            >
                <Tab label="Login" />
                <Tab label="Sign Up" />
            </Tabs>
            </AppBar>
            {value === 0 && <Login handleClose={handleClose} />}
            {value === 1 && <Signup handleClose={handleClose} />}
            <Box className={classes.google}>
              <span>OR</span>
              <GoogleButton 
              style={{width: "100%", outline: "none"}}
              onClick={SignInWithGoogle}
              />

            </Box>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}