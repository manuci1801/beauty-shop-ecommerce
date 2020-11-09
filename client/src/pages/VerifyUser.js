import React, { useState, useEffect } from "react";
import { useParams, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

function VerifyUser() {
  let { token } = useParams();

  const [verifyString, setVerifyString] = useState("");

  const isAuthenticated = useSelector(({ auth }) => auth.isAuthenticated);

  function handleVerifyUser() {
    axios
      .get(`/api/auth/verify/${token}`)
      .then((res) => {
        setVerifyString(
          "Đã xác thực tài khoản thành công. Bạn có thể đăng nhập"
        );
      })
      .catch((err) => setVerifyString("Token không hợp lệ"));
  }

  useEffect(() => {
    if (!isAuthenticated) {
      handleVerifyUser();
    }
  }, [isAuthenticated]);

  return (
    <>
      {!isAuthenticated ? (
        <div>
          <div className="container">
            <div className="contact-main">
              <div className="row">
                <div className="map-wrap col-sm-7 col-md-8 col-lg-9">
                  <h2 style={{ padding: "14px", fontSize: "24px" }}>
                    <strong>{verifyString}</strong>
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Redirect to="/" />
      )}
    </>
  );
}

export default VerifyUser;
