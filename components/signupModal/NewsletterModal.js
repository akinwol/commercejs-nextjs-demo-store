import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Card from '@mui/material/Card';
import LogRocket from 'logrocket';


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

export default function NewsModal({ open, setOpen }){
    const handleClose = () => {
        LogRocket.track('NewsletterSignup', {
            customer: 'new'
        })
        setOpen(false)
      };

    return (
        <>
        <Modal 
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
          <Card  variant="outlined">
            <Box sx={style}>
            <>
                    <Typography id="modal-modal-title" variant="h5" component="h2">
                Thanks for signin up
            </Typography>
            <div style={{ marginTop: '20px '}}>
            <div>
                    This is just a test you will not get an email
                </div>
              

            </div>
            </>
            
            
            </Box>

          </Card>
        
      </Modal>
        </>
    )
}