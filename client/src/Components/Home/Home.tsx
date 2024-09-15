import { Link } from 'react-router-dom';
import React from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Textarea } from '../ui/textarea';
import ReactPlayer from 'react-player'; // External library for video handling
import { useToast } from '../../hooks/use-toast';

const HomePage: React.FC = () => {
  const { toast } = useToast();

  const handleSubmit = () => {
    // Placeholder for submit action
    toast({ title: 'Action Submitted', description: 'This is a placeholder for submitting actions.' });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="w-full p-6 bg-black text-white">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-2xl font-bold">Marching Band Platform</div>
          <div className="space-x-4">
            <Button variant="link">
              <Link to="/">Home</Link>
            </Button>
            <Button variant="link">
              <Link to="/about">About</Link>
            </Button>
            <Button variant="link">
              <Link to="/features">Features</Link>
            </Button>
            <Button variant="link">
              <Link to="/contact">Contact</Link>
            </Button>
            {/* Sign In and Create Profile Buttons with Navigation */}
            <Button variant="link">
              <Link to="/login">Sign In</Link>
            </Button>
            <Button>
              <Link to="/register">Create Profile</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="w-full h-screen flex items-center justify-center bg-gray-800 text-white text-center">
        <div>
          <h1 className="text-5xl font-bold">Showcase Your Talent. Connect with College Bands.</h1>
          <p className="mt-4 text-lg">Audition, Engage, and Be Seen by Recruiters Across the Country.</p>
          <div className="mt-8 space-x-4">
            {/* Create Profile and Learn More buttons */}
            <Button variant="default" size="lg">
              <Link to="/register">Create Profile</Link>
            </Button>
            <Button variant="outline" size="lg">
              <Link to="/about">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto py-16 text-center">
        <h2 className="text-3xl font-bold mb-8">Why Join the College Band Platform?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Upload Your Audition</CardTitle>
            </CardHeader>
            <CardContent>
              Easily upload video auditions and showcase your skills to recruiters nationwide.
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Connect with Recruiters</CardTitle>
            </CardHeader>
            <CardContent>
              Directly communicate with college band recruiters, receive feedback, and start your journey.
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Get Offers & Ratings</CardTitle>
            </CardHeader>
            <CardContent>
              Receive ratings, comments, and even offers from colleges based on your performances.
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Video Highlights Section */}
      <section className="w-full bg-gray-800 py-16 text-center text-white">
        <h2 className="text-3xl font-bold mb-8">See the Best Performances from Students Like You</h2>
        <div className="flex justify-center">
          <ReactPlayer url="https://www.example.com/video.mp4" controls={true} />
        </div>
      </section>

      {/* How It Works Section */}
      <section className="container mx-auto py-16">
        <h2 className="text-3xl font-bold text-center mb-8">How the Platform Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Create a Profile</CardTitle>
            </CardHeader>
            <CardContent>
              Sign up as a student or recruiter and start building your profile.
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Upload & Connect</CardTitle>
            </CardHeader>
            <CardContent>
              Students upload performance videos. Recruiters find and connect with top talent.
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Get Feedback & Offers</CardTitle>
            </CardHeader>
            <CardContent>
              Receive comments, likes, and ratings. Build your presence in the college marching band community.
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full p-6 bg-black text-white text-center">
        <div className="container mx-auto">
          <p>&copy; 2024 College Marching Band Platform. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
