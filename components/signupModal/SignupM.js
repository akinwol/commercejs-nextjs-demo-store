import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Card from '@mui/material/Card';
import commerce from '../../lib/commerce';
import CircularProgress from '@mui/material/CircularProgress';
import Image from 'next/image'






const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '1px solid #adb5bd',
  boxShadow: 24,
  p: 4,
};

export default function BasicModal({ open, setOpen}) {
//   const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);

  const [state, setState] = React.useState({
      firstName: '',
      lastName: '',
      email: ''
  })
  const [errorState, setErrorState] = React.useState(false)
  const [loading, setLoading] = React.useState(false)
  const [signedUp, setSignedUp] = React.useState(false)
  const handleChange = (e) => {
      setState({
          ...state,
          [e.target.name]: e.target.value,
      })
  }
  const resetState = () =>{
    setState({
        firstName: '',
      lastName: '',
      email: ''
    })
  }
  const handleClose = () => {
    setOpen(false)
    setSignedUp(false)
    resetState()
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
        try {
                setErrorState(false)
                setLoading(true)

            const results = await fetch('/api/createUser', {
                method: 'POST',
                body: JSON.stringify({
                    ...state
                }),
                headers: {  'Content-Type': 'application/json' }
            })
            console.log({ results })
            const data = await results.json();
            console.log({ data 
            })
            if (data.error) {
                console.log('error ')
                const customerToken = await commerce.customer.login(state.email,  `${window.location.origin}/login?token={token}`)
                if (customerToken && customerToken.success) {
                    setSignedUp(true)
                    setErrorState(false)
                    
                } else {
                    setErrorState(true)
                }
                console.log({ customerToken })
            } else {
                console.log({ data, status: data['status_code'], errorState  })
                const customerToken = await commerce.customer.login(state.email,  `${window.location.origin}/login?token={token}`)
                if (customerToken && customerToken.success) {
                    setSignedUp(true)
                    setErrorState(false)
                    
                } else {
                    setErrorState(true)
                }
                
            }
            setLoading(false)

        } catch (error) {
            console.log({ error })
            setErrorState(true)
            setLoading(false)

            
        }
  }

  React.useEffect(() => {
    setSignedUp(false)

  }, [])

  return (
    <div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal 
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
          <Card  variant="outlined">
            <Box sx={style}>
                {signedUp ? <>
                    <Typography id="modal-modal-title" variant="h5" component="h2">
                Congrats
            </Typography>
            <div style={{ marginTop: '20px '}}>
            <div>
                    Check your email for confirmation and use the link to login. If you are getting this message try and purchase something
                </div>
                <div >
                    <Image src="/images/complete.svg" alt="Completed Image" layout='responsive' width={100} height={100}/>

                </div>
              

            </div>
            </>
            :
            <>
            <Typography id="modal-modal-title" variant="h6" component="h2">
                Sign up and get 20% off
            </Typography>
            <div> For new users only. You will get an error if you are not a new user</div>
            {/* <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </Typography> */}
          

           <form style={{ marginTop: '20px'}}>
                <label className="w-100 mb-4">
                    <p className="mb-1 font-size-caption font-color-light text-left">
                        First Name
                    </p>
                    <input
                        name="firstName"
                        type="text"
                        onChange={handleChange}
                        value={state.firstName}
                        className="rounded-0 w-100"
                        required
                    />
                </label>
                <label className="w-100 mb-4">
                    <p className="mb-1 font-size-caption font-color-light text-left">
                        Last Name
                    </p>
                    <input
                        name="lastName"
                        type="text"
                        onChange={handleChange}
                        value={state.lastName}
                        className="rounded-0 w-100"
                        required
                    />
                </label>
                <label className="w-100 mb-4">
                    <p className="mb-1 font-size-caption font-color-light text-left">
                        Email address
                    </p>
                    <input
                        name="email"
                        type="email"
                        onChange={handleChange}
                        value={state.email}
                        className="rounded-0 w-100"
                        required
                    />
                </label>
                {loading && ( 
                    <div style={{ textAlign: 'center' }}>
                    <CircularProgress size={20} />
                    </div>
                )}
                {errorState && (
                    <div style={{ color: 'red', marginBottom: '10px', display: 'flex'}}> Sorry there was an error. Please try again later</div>
                )}
                <button
                    className="bg-black font-color-white w-100 border-none h-56 font-weight-semibold"
                    type="submit"
                    onClick={handleSignUp}
                >
                    Sign up
                </button>
           </form>
            </>
                
               }
            
            
            </Box>

          </Card>
        
      </Modal>
    </div>
  );
}
