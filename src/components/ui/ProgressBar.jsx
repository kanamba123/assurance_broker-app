import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/system';

const ProgressBarContainer = styled('div')({
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 9999,
});


const ProgressBar = ({ isLoading }) => {
    return isLoading ? (
        <ProgressBarContainer>
            {/*<Logo src={logo} alt="Logo" />*/}
            <Typography variant="h6" component="div" color="secondary" gutterBottom>
                Loading...
            </Typography>
            <CircularProgress color="secondary" size={80} thickness={4} />
        </ProgressBarContainer>
    ) : null;
};

export default ProgressBar;
