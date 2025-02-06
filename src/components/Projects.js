import React from 'react';
import Projects from './Projects'; // Import ไฟล์ Projects.js

function Profile() {
  return (
    <>
            <div className="col-12 col-xl-6">
              <div className="mb-5 ps-3">
                <h6 className="mb-1">Projects</h6>
                <p className="text-sm">Architects design houses</p>
              </div>
              <div className="row">
                <div className="col-xl-6 col-md-6 mb-xl-0 mb-4">
                  <div className="card card-blog card-plain">
                    <div className="card-header p-0 m-2">
                      <a className="d-block shadow-xl border-radius-xl">
                        <img
                          src="https://via.placeholder.com/150"
                          alt="img-blur-shadow"
                          className="img-fluid shadow border-radius-lg"
                        />
                      </a>
                    </div>
                    <div className="card-body p-3">
                      <p className="mb-0 text-sm">Project #1</p>
                      <a href="javascript:;">
                        <h5>Modern Design</h5>
                      </a>
                      <p className="mb-4 text-sm">
                        A sample project description goes here.
                      </p>
                      <div className="d-flex align-items-center justify-content-between">
                        <button type="button" className="btn btn-outline-primary btn-sm mb-0">View Project</button>
                        <button type="button" className="btn btn-outline-primary btn-sm mb-0">Add Project</button>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Add more project cards as required */}
              </div>
            </div>
    </>
  );
}

export default Profile;
