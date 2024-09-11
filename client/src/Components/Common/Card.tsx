import * as React from 'react';
import MCard from '@mui/material/Card'; // Rename the imported Material-UI Card to avoid conflict
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Container, Paper } from '@mui/material';

interface OfferCardProps {
    band: string;
    amount: number;
    status: string;
    offerDate: string;
}

const OfferCard: React.FC<OfferCardProps> = ({ band, amount, status, offerDate }) => {
    return (
        <Container>

        <MCard>
            <CardContent>
                <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
                    Band: {band}
                </Typography>
                <Typography variant="h5" component="div">
                    Amount: {amount}
                </Typography>
                <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>
                    Status: {status}
                </Typography>
                <Typography variant="body2">
                    Offer Date: {offerDate}
                </Typography>
            </CardContent>
            <Paper elevation={3} />
        </MCard>
        </Container>
    );
};

export default OfferCard;
