import React, { useEffect, useState } from 'react';

function Profile() {
  const [profile, setProfile] = useState(null);

  // ดึงข้อมูลโปรไฟล์จาก API
  useEffect(() => {
    fetch('http://localhost:5000/api/profiles') // ดึงข้อมูลจาก API
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch profile');
        }
        return response.json();
      })
      .then((data) => {
        // เลือกข้อมูลที่มี id มากที่สุด (ข้อมูลล่าสุด)
        if (data.length > 0) {
          const latestProfile = data.reduce((latest, current) => 
            current.id > latest.id ? current : latest, data[0]
          );
          setProfile(latestProfile);
        }
      })
      .catch((error) => {
        console.error('Error fetching profile:', error);
      });
  }, []);

  // หากยังไม่มีข้อมูล ให้แสดงข้อความ Loading
  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="container-fluid px-2 px-md-4">
        <div
          className="page-header min-height-300 border-radius-xl mt-4"
          style={{
            backgroundImage: `url("http://localhost:5000/uploads/${profile.cover_image}")`,
          }}
        >
          <span className="mask bg-gradient-dark opacity-6" />
        </div>
        <div className="card card-body mx-2 mx-md-2 mt-n6">
          <div className="row gx-4 mb-2">
            <div className="col-auto">
              <div className="avatar avatar-xl position-relative">
                <img
                  src={`http://localhost:5000/uploads/${profile.profile_image}`}
                  alt="profile_image"
                  className="w-100 border-radius-lg shadow-sm"
                />
              </div>
            </div>
            <div className="col-auto my-auto">
              <div className="h-100">
                <h5 className="mb-1">{profile.full_name}</h5>
                <p className="mb-0 font-weight-normal text-sm">{profile.bio}</p>
              </div>
            </div>
          </div>
          <div className="row">
            {/* Profile Information */}
            <div className="col-12 col-xl-6">
              <div className="card card-plain h-100">
                <div className="card-header pb-0 p-3">
                  <div className="row">
                    <div className="col-md-8 d-flex align-items-center">
                      <h6 className="mb-0">Profile Information</h6>
                    </div>
                    <div className="col-md-4 text-end">
                      <a href="/EditProfile">
                        <i
                          className="fas fa-user-edit text-secondary text-sm"
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          title="Edit Profile"
                        />
                      </a>
                    </div>
                  </div>
                </div>
                <div className="card-body p-3">
                  <p className="text-sm">{profile.bio}</p>
                  <hr className="horizontal gray-light my-4" />
                  <ul className="list-group">
                    <li className="list-group-item border-0 ps-0 pt-0 text-sm">
                      <strong className="text-dark">Full Name:</strong> &nbsp; {profile.full_name}
                    </li>
                    <li className="list-group-item border-0 ps-0 text-sm">
                      <strong className="text-dark">Mobile:</strong> &nbsp; {profile.mobile}
                    </li>
                    <li className="list-group-item border-0 ps-0 text-sm">
                      <strong className="text-dark">Email:</strong> &nbsp; {profile.email}
                    </li>
                    <li className="list-group-item border-0 ps-0 text-sm">
                      <strong className="text-dark">Location:</strong> &nbsp; {profile.location}
                    </li>
                    <li className="list-group-item border-0 ps-0 pb-0">
                      <strong className="text-dark text-sm">Social:</strong> &nbsp;
                      <a className="btn btn-facebook btn-simple mb-0 ps-1 pe-2 py-0" href="javascript:;">
                        <i className="fab fa-facebook fa-lg" />
                      </a>
                      <a className="btn btn-twitter btn-simple mb-0 ps-1 pe-2 py-0" href="javascript:;">
                        <i className="fab fa-twitter fa-lg" />
                      </a>
                      <a className="btn btn-instagram btn-simple mb-0 ps-1 pe-2 py-0" href="javascript:;">
                        <i className="fab fa-instagram fa-lg" />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
