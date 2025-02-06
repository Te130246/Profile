import React from 'react';

function ContactInfo() {
  return (
    <div className="row">
      <div className="col-12 col-xl-4">
        <div className="card card-plain h-100">
          <div className="card-header pb-0 p-3">
            <h6 className="mb-0">ข้อมูลติดต่อ</h6>
          </div>
          <div className="card-body p-3">
            <p className="text-sm"><strong>ช่องทางการติดต่อเพิ่มเติม:</strong></p>
            <ul className="list-group">
              <li className="list-group-item border-0 ps-0 text-sm">
                <i className="fab fa-facebook me-2 text-primary"></i>
                <strong>Facebook:</strong> <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Nattanan kaewwiset</a>
              </li>
              <li className="list-group-item border-0 ps-0 text-sm">
                <i className="fab fa-twitter me-2 text-info"></i>
                <strong>Twitter:</strong> <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">-.-</a>
              </li>
              <li className="list-group-item border-0 ps-0 text-sm">
                <i className="fab fa-instagram me-2 text-danger"></i>
                <strong>Instagram:</strong> <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">@yourusername</a>
              </li>
            </ul>
            {/* แผนที่ */}
            <div className="mt-4">
              <h6>แผนที่ตำแหน่งที่ตั้ง</h6>
              <iframe
                title="map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387190.2799014434!2d-74.25987468775193!3d40.69767006351485!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a17f3f5b2f5%3A0x7c8f0c4c2d3f3e8f!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sth!4v1630811351852!5m2!1sen!2sth"
                width="100%"
                height="200"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
              />
            </div>
            <button className="btn btn-primary float-end mt-3">แก้ไขข้อมูล</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactInfo;
