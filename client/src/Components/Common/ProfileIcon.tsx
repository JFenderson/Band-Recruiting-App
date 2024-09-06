import React from 'react';

interface ProfileIconProps {
  firstName: string;
  lastName: string;
  profilePicture?: string; // Optional profile picture URL
  size?: number; // Optional size parameter for the icon
}

const ProfileIcon: React.FC<ProfileIconProps> = ({ firstName, lastName, profilePicture, size = 40 }) => {
  const initials = `${firstName.charAt(0).toUpperCase()}${lastName.charAt(0).toUpperCase()}`;

  const style = {
    width: `${size}px`,
    height: `${size}px`,
    borderRadius: '50%',
    backgroundColor: '#007bff', // Default background color
    color: '#fff', // Default text color
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: `${size / 2}px`,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  };

  return (
    <div style={{ position: 'relative', width: `${size}px`, height: `${size}px` }}>
      {profilePicture ? (
        <img src={profilePicture} alt="Profile" style={{ width: '100%', height: '100%', borderRadius: '50%' }} />
      ) : (
        <div  style={style}>
          {initials}
        </div>
      )}
    </div>
  );
};

export default ProfileIcon;
