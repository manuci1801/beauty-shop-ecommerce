import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

import toastNotify from "../utils/toastNotify";

function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [content, setContent] = useState("");

  const sendNewContact = (e) => {
    e.preventDefault();
    axios
      .post("/api/contacts", { name, email, phone, content })
      .then((res) => {
        toastNotify("success", "Bạn đã gửi thành công!");
        setName("");
        setEmail("");
        setPhone("");
        setContent("");
      })
      .catch((err) => {});
  };

  useEffect(() => {
    document.title = "Liên hệ";
  }, []);

  return (
    <div>
      <div className="container">
        <div className="contact-main">
          <div className="row">
            <div className="map-wrap col-sm-7 col-md-8 col-lg-9">
              <div className="embed-responsive embed-responsive-4by3">
                <iframe
                  className="embed-responsive-item"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.0532062336574!2d105.82646221419105!3d21.030556985997347!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab7564abcd1b%3A0x4286eb417a6c6ff1!2zNDAgR2nhuqNuZyBWw7UsIEtpbSBNw6MsIMSQ4buRbmcgxJBhLCBIw6AgTuG7mWksIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1494209242893"
                  width={600}
                  height={450}
                  frameBorder={0}
                  style={{ border: 0 }}
                  allowFullScreen
                />
              </div>
            </div>
            <div className="contact-wrap col-sm-5 col-md-4 col-lg-3">
              <div className="contact">
                <div className="contact-icon">
                  <i className="fa fa-map-marker" />
                </div>
                <div className="contact-content">
                  <h3>Địa Chỉ:</h3>
                  <p>40 Giảng Võ,</p>
                  <p>Đống Đa, Hà Nội</p>
                </div>
              </div>
              <div className="contact">
                <div className="contact-icon">
                  <i className="fa fa-comments-o" />
                </div>
                <div className="contact-content">
                  <h3>Liên Hệ:</h3>
                  <p>
                    <i className="fa fa-mobile-phone" />
                    0985423664
                  </p>
                  <p>
                    <i className="fa fa-envelope-o" />
                    tuannhph07234@fpt.edu.vn
                  </p>
                </div>
              </div>
              <div className="contact">
                <div className="contact-icon">
                  <i className="fa fa-clock-o" />
                </div>
                <div className="contact-content">
                  <h3>Thời gian Làm việc:</h3>
                  <p>Thứ 2 - thứ 6: 8AM - 10PM</p>
                  <p>Thứ 7: 9AM - 8PM</p>
                  <p>Nghỉ Chủ Nhật và các ngày Lễ Tết</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="respond-wrap">
          <div className="section-title">
            <h2>Liên Hệ &amp; Góp Ý</h2>
            <p>Gửi tin nhắn cho chúng tôi</p>
          </div>
          <form className="comment-form">
            <div className="row">
              <div className="comment-form-author col-md-6">
                <input
                  id="author"
                  name="author"
                  type="text"
                  placeholder="Họ tên *"
                  size={30}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="comment-form-email col-md-6">
                <input
                  id="email"
                  name="email"
                  type="text"
                  placeholder="Email *"
                  size={30}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div className="row">
              <div className="comment-form-email col-md-12">
                <input
                  id="phone"
                  name="phone"
                  type="text"
                  placeholder="Điện thoại *"
                  size={30}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            </div>
            <div className="row">
              <div className="comment-form-comment col-md-12">
                <textarea
                  placeholder="Nội dung *"
                  id="comment"
                  name="comment"
                  cols={40}
                  rows={6}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              </div>
              <div className="col-md-12 submit-wrap">
                <div className="form-submit">
                  <input
                    name="submit"
                    id="submit"
                    className="submit"
                    defaultValue="Gửi tin"
                    type="submit"
                    onClick={(e) => sendNewContact(e)}
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Contact;
