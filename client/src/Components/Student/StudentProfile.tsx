import React from 'react';
import { AppBar, Toolbar, Typography, Container, Grid, Avatar, Card, CardContent, CardActions, Button, TextField, Rating, Box } from '@mui/material';
import { styled } from '@mui/system';

interface Offer {
  recruiterName: string;
  band: string;
  offerAmount: string;
  status: 'accepted' | 'pending';
  dateSent: string;
}

interface Video {
  id: number;
  title: string;
  dateUploaded: string;
  viewCount: number;
}

interface Comment {
  recruiterName: string;
  rating: number;
  content: string;
}

const ProfileContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  marginTop: '20px'
}));

const LeftSidebar = styled('div')(({ theme }) => ({
  flex: 1,
  marginRight: '20px'
}));

const RightPanel = styled('div')(({ theme }) => ({
  flex: 3,
}));

const StudentProfile: React.FC = () => {
  const offers: Offer[] = [
    { recruiterName: 'John Smith', band: 'Big Marching Band', offerAmount: '$5,000', status: 'pending', dateSent: '2024-08-01' },
    { recruiterName: 'Jane Doe', band: 'Pep Band', offerAmount: '$3,500', status: 'accepted', dateSent: '2024-07-15' }
  ];

  const videos: Video[] = [
    { id: 1, title: 'Performance 1', dateUploaded: '2024-06-12', viewCount: 120 },
    { id: 2, title: 'Performance 2', dateUploaded: '2024-06-18', viewCount: 200 }
  ];

  const comments: Comment[] = [
    { recruiterName: 'John Smith', rating: 4, content: 'Great performance!' },
    { recruiterName: 'Jane Doe', rating: 5, content: 'Outstanding work!' }
  ];

  return (
    <Container>
      {/* Header */}
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h6">Recruiting Platform</Typography>
        </Toolbar>
      </AppBar>

      {/* Profile Container */}
      <ProfileContainer>
        {/* Left Sidebar (Profile Card) */}
        <LeftSidebar>
          <Card>
            <CardContent>
              <Avatar sx={{ width: 100, height: 100, margin: '0 auto' }}>JD</Avatar>
              <Typography variant="h5" align="center">John Doe</Typography>
              <Typography variant="subtitle1" align="center">Graduation Year: 2024</Typography>
              <Typography variant="subtitle1" align="center">Instrument: Trumpet</Typography>
              <Typography variant="subtitle1" align="center">High School: Music High</Typography>
              <Box textAlign="center" mt={2}>
                <Rating name="read-only" value={4.5} precision={0.5} readOnly />
              </Box>
            </CardContent>
          </Card>
        </LeftSidebar>

        {/* Right Panel (Main Content) */}
        <RightPanel>
          {/* Offers Section */}
          <Typography variant="h5" gutterBottom>Offers</Typography>
          <Grid container spacing={2}>
            {offers.map((offer, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">{offer.recruiterName}</Typography>
                    <Typography variant="subtitle1">Band: {offer.band}</Typography>
                    <Typography variant="subtitle1">Offer: {offer.offerAmount}</Typography>
                    <Typography variant="subtitle2">Status: {offer.status}</Typography>
                    <Typography variant="subtitle2">Date: {offer.dateSent}</Typography>
                  </CardContent>
                  <CardActions>
                    <Button variant="contained">Send a New Offer</Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Videos Section */}
          <Typography variant="h5" gutterBottom mt={4}>Videos</Typography>
          <Grid container spacing={2}>
            {videos.map((video) => (
              <Grid item xs={12} md={6} key={video.id}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">{video.title}</Typography>
                    <Typography variant="subtitle2">Uploaded: {video.dateUploaded}</Typography>
                    <Typography variant="subtitle2">Views: {video.viewCount}</Typography>
                  </CardContent>
                  <CardActions>
                    <TextField label="Comment" variant="outlined" fullWidth />
                    <Rating name={`rating-${video.id}`} value={0} />
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Comments & Ratings Section */}
          <Typography variant="h5" gutterBottom mt={4}>Comments & Ratings</Typography>
          {comments.map((comment, index) => (
            <Box key={index} mb={2}>
              <Typography variant="subtitle1">{comment.recruiterName}</Typography>
              <Rating value={comment.rating} readOnly />
              <Typography>{comment.content}</Typography>
            </Box>
          ))}
        </RightPanel>
      </ProfileContainer>
    </Container>
  );
};

export default StudentProfile;
