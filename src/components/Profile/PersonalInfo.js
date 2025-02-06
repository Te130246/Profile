import React, { useState, useEffect } from 'react';
import axios from 'axios';

function PersonalInfo({ userData, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    birthdate: '',
    gender: '',
    nationality: '',
    profileImage: null,
  });

  useEffect(() => {
    if (userData) {
      setFormData({
        first_name: userData.first_name,
        last_name: userData.last_name,
        email: userData.email,
        birthdate: userData.birthdate || '',
        gender: userData.gender || '',
        nationality: userData.nationality || '',
      });
    }
  }, [userData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, profileImage: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    for (const key in formData) {
      form.append(key, formData[key]);
    }

    try {
      await axios.post('http://localhost:5000/api/user/update', form, { // เปลี่ยน URL ที่นี่
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setIsEditing(false);
      onUpdate(); // เรียกใช้ฟังก์ชันเพื่อดึงข้อมูลล่าสุด
    } catch (error) {
      console.error('Error updating user data', error);
    }
  };

  return (
    <div className="row">
      <div className="col-12">
        <div className="card card-plain h-100">
          <div className="card-header pb-0 p-3">
            <h6 className="mb-0">ข้อมูลพื้นฐาน</h6>
          </div>
          <div className="card-body p-3">
            {isEditing ? (
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label>ชื่อ:</label>
                  <input type="text" name="first_name" value={formData.first_name} onChange={handleChange} className="form-control" required />
                </div>
                <div className="mb-3">
                  <label>นามสกุล:</label>
                  <input type="text" name="last_name" value={formData.last_name} onChange={handleChange} className="form-control" required />
                </div>
                <div className="mb-3">
                  <label>อีเมล:</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} className="form-control" required />
                </div>
                <div className="mb-3">
                  <label>วันเกิด:</label>
                  <input type="date" name="birthdate" value={formData.birthdate} onChange={handleChange} className="form-control" />
                </div>
                <div className="mb-3">
                  <label>เพศ:</label>
                  <input type="text" name="gender" value={formData.gender} onChange={handleChange} className="form-control" />
                </div>
                <div className="mb-3">
                  <label>สัญชาติ:</label>
                  <input type="text" name="nationality" value={formData.nationality} onChange={handleChange} className="form-control" />
                </div>
                <div className="mb-3">
                  <label>อัปโหลดรูปโปรไฟล์:</label>
                  <input type="file" name="profileImage" onChange={handleFileChange} className="form-control" />
                </div>
                <button type="submit" className="btn btn-success">บันทึกข้อมูล</button>
                <button type="button" className="btn btn-secondary" onClick={() => setIsEditing(false)}>ยกเลิก</button>
              </form>
            ) : (
              <>
                <ul className="list-group">
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    <strong>ชื่อ:</strong> <span>{userData ? `${userData.first_name} ${userData.last_name}` : 'Loading...'}</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    <strong>วันเกิด:</strong> <span>{userData?.birthdate || 'ไม่ระบุ'}</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    <strong>เพศ:</strong> <span>{userData?.gender || 'ไม่ระบุ'}</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    <strong>สัญชาติ:</strong> <span>{userData?.nationality || 'ไม่ระบุ'}</span>
                  </li>
                </ul>
                <button className="btn btn-primary float-end mt-3" onClick={() => setIsEditing(true)}>แก้ไขข้อมูล</button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PersonalInfo;
