import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/AddProfile.css';

function EditProfile() {
  const [fullName, setFullName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [location, setLocation] = useState('');
  const [bio, setBio] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const [profilePreview, setProfilePreview] = useState(null);
  const [coverPreview, setCoverPreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  // ดึงข้อมูลโปรไฟล์ล่าสุด
  useEffect(() => {
    setIsLoading(true);
    fetch('http://localhost:5000/api/profiles')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch profile');
        }
        return response.json();
      })
      .then((data) => {
        if (data.length > 0) {
          const latestProfile = data.reduce((latest, current) =>
            current.id > latest.id ? current : latest,
            data[0]
          );

          setFullName(latestProfile.full_name || '');
          setMobile(latestProfile.mobile || '');
          setEmail(latestProfile.email || '');
          setLocation(latestProfile.location || '');
          setBio(latestProfile.bio || '');
          setProfilePreview(
            latestProfile.profile_image
              ? `http://localhost:5000/uploads/${latestProfile.profile_image}`
              : null
          );
          setCoverPreview(
            latestProfile.cover_image
              ? `http://localhost:5000/uploads/${latestProfile.cover_image}`
              : null
          );
        }
      })
      .catch((error) => {
        console.error('Error fetching profile:', error);
        setError('Error fetching profile. Please try again later.');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  // Handle profile image change
  const handleProfileImageChange = (event) => {
    const file = event.target.files[0];
    setProfileImage(file);
    if (file) {
      setProfilePreview(URL.createObjectURL(file));
    }
  };

  // Handle cover image change
  const handleCoverImageChange = (event) => {
    const file = event.target.files[0];
    setCoverImage(file);
    if (file) {
      setCoverPreview(URL.createObjectURL(file));
    }
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();

    if (!fullName || !mobile || !email || !location || !bio) {
      alert('Please fill in all required fields.');
      return;
    }

    const formData = new FormData();
    formData.append('fullName', fullName);
    formData.append('mobile', mobile);
    formData.append('email', email);
    formData.append('location', location);
    formData.append('bio', bio);
    if (profileImage) {
      formData.append('profileImage', profileImage);
    }
    if (coverImage) {
      formData.append('coverImage', coverImage);
    }

    setIsLoading(true);
    fetch('http://localhost:5000/api/update-profile', {
      method: 'POST',
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to update profile');
        }
        return response.json();
      })
      .then((data) => {
        alert('Profile updated successfully!');
        navigate('/Dashboard');
      })
      .catch((error) => {
        console.error('Error updating profile:', error);
        alert('Error updating profile. Please try again later.');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  // Handle delete profile
  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this profile?')) {
      setIsLoading(true);
      fetch('http://localhost:5000/api/delete-profile', {
        method: 'DELETE',
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Failed to delete profile');
          }
          return response.json();
        })
        .then((data) => {
          alert('Profile deleted successfully!');
          navigate('/Dashboard');
        })
        .catch((error) => {
          console.error('Error deleting profile:', error);
          alert('Error deleting profile. Please try again later.');
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  return (
    <div className="add-profile-container">
      <div className="form-card">
        <h2 className="form-title">Edit Your Profile</h2>

        {error && <p className="error-message">{error}</p>}
        {isLoading && <p>Loading...</p>}

        {!isLoading && (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                className="form-control"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Mobile</label>
              <input
                type="text"
                className="form-control"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Location</label>
              <input
                type="text"
                className="form-control"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Bio</label>
              <textarea
                className="form-control"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Profile Image</label>
              <input
                type="file"
                className="form-control"
                accept="image/*"
                onChange={handleProfileImageChange}
              />
              {profilePreview && (
                <img
                  src={profilePreview}
                  alt="Profile Preview"
                  className="image-preview"
                />
              )}
            </div>

            <div className="form-group">
              <label>Cover Image</label>
              <input
                type="file"
                className="form-control"
                accept="image/*"
                onChange={handleCoverImageChange}
              />
              {coverPreview && (
                <img
                  src={coverPreview}
                  alt="Cover Preview"
                  className="image-preview"
                />
              )}
            </div>

            <button type="submit" className="btn btn-primary" disabled={isLoading}>
              {isLoading ? 'Updating...' : 'Update'}
            </button>

            <button
              type="button"
              className="btn btn-danger"
              onClick={handleDelete}
              disabled={isLoading}
            >
              {isLoading ? 'Deleting...' : 'Delete'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default EditProfile;
