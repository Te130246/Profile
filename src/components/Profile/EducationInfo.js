import React from 'react';

function EducationInfo() {
  return (
    <div className="row">
      <div className="col-12">
        <div className="card card-plain h-100">
          <div className="card-header pb-0 p-3">
            <h6 className="mb-0">ข้อมูลการศึกษา</h6>
          </div>
          <div className="card-body p-3">
            <ul className="list-group">
              <li className="list-group-item d-flex justify-content-between align-items-center">
                <strong>ชื่อสถาบันการศึกษา:</strong> <span>ชื่อที่ชัดเจนของสถาบัน</span>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center">
                <strong>ประเภทของสถาบัน:</strong> <span>โรงเรียน, มหาวิทยาลัย, วิทยาลัย, หรือสถาบันเฉพาะทาง</span>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center">
                <strong>ระดับการศึกษา:</strong> <span>ประถมศึกษา, มัธยมศึกษา, ปริญญาตรี, ปริญญาโท, ปริญญาเอก</span>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center">
                <strong>สาขาวิชา:</strong> <span>วิทยาศาสตร์, ศิลปศาสตร์, วิศวกรรมศาสตร์</span>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center">
                <strong>ปีที่เริ่มและจบการศึกษา:</strong> <span>2550 - 2553</span>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center">
                <strong>GPA:</strong> <span>เกรดเฉลี่ยที่ได้รับระหว่างการศึกษา (ถ้ามี)</span>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center">
                <strong>กิจกรรมหรือองค์กรที่เข้าร่วม:</strong> <span>สโมสร, กิจกรรมอาสาสมัคร, การแข่งขันต่าง ๆ</span>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center">
                <strong>รางวัลหรือเกียรติบัตรที่ได้รับ:</strong> <span>รางวัลนักเรียนดีเด่น, ทุนการศึกษา</span>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center">
                <strong>บริษัทหรือองค์กรที่ฝึกงาน:</strong> <span>ชื่อองค์กรและระยะเวลาที่ฝึกงาน</span>
              </li>
            </ul>
            <button className="btn btn-primary float-end mt-3">แก้ไขข้อมูล</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EducationInfo;
