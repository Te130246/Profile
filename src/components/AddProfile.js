import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import '../css/AddProfile.css'; // Import ไฟล์ CSS

function AddProfile() {
  const [fullName, setFullName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [location, setLocation] = useState('');
  const [bio, setBio] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const [profilePreview, setProfilePreview] = useState(null);
  const [coverPreview, setCoverPreview] = useState(null);

  const navigate = useNavigate(); // ใช้ useNavigate สำหรับการนำทาง

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

    // ส่งข้อมูลไปยัง API
    fetch('http://localhost:5000/api/add-profile', {
      method: 'POST',
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to submit form');
        }
        return response.json();
      })
      .then((data) => {
        alert('Profile added successfully!');
        // นำทางไปยังหน้า /Dashboard
        navigate('/Dashboard');
      })
      .catch((error) => {
        console.error('Error submitting form:', error);
        alert('Error submitting form!');
      });
  };

  return (
    <div className="add-profile-container">
      <div className="form-card">
        <h2 className="form-title">Create Your Profile</h2>
        <form onSubmit={handleSubmit}>
          {/* Full Name */}
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

          {/* Mobile */}
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

          {/* Email */}
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

          {/* Location */}
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

          {/* Bio */}
          <div className="form-group">
            <label>Bio</label>
            <textarea
              className="form-control"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              required
            />
          </div>

          {/* Profile Image */}
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

          {/* Cover Image */}
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

          {/* Submit Button */}
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddProfile;
