import React from "react";
import { Link } from "react-router-dom";

function About() {
  return (
    <>
      <div className="container-fluid page-heading about-heading">
        <div className="heading-content">
          <h1>Về MIN</h1>
          <p>Chúng tôi là ai? Chúng tôi có gì? Chúng tôi làm gì?</p>
          <ol className="breadcrumb">
            <li>
              <Link to="/">Trang chủ</Link>
            </li>
            <li className="active">Về MIN</li>
          </ol>
        </div>
      </div>
      <div className="container about-main">
        <div className="row">
          <div className="col-xs-12 col-sm-6 col-md-6 txt-col">
            <h2>Chúng tôi là ai?</h2>
            <p>
              MIN được thành lập vào tháng 11/2016, với xuất phát điểm ban đầu
              là những người bạn chia sẻ chung một tình yêu dành cho những món
              đồ nội thất mộc mạc, đơn giản mà vẫn đầy cá tính.
            </p>
            <p>
              Tên gọi MIN, được viết tắt từ Minimalist, có nghĩa là sự đơn giản,
              giảm thiểu các chi tiết thừa, chỉ giữ lại những phần thật sự cần
              thiết cho công năng và thẩm mỹ để mang lại nét tinh tế thanh lịch
              cho không gian sống.
            </p>
            <p>
              Với đội ngũ thiết kế chuyên nghiệp và chia sẻ chung niềm đam mê
              với phong cách thiết kế này, MIN mong muốn có thể chia sẻ, truyền
              tải trọn vẹn một phong cách cũng là một triết lý sống độc đáo tới
              từng sản phẩm, từng không gian của quý khách hàng.
            </p>
          </div>
          <div className="col-xs-12 col-sm-6 col-md-6 img-col">
            <img src="img/about_1.jpg" className="img-responsive" />
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12 col-sm-6 col-md-8 pull-right txt-col">
            <h2>Chúng tôi có gì?</h2>
            <h3>
              <i className="fa fa-long-arrow-right" /> Sản phẩm nội thất
            </h3>
            <p>
              Mong muốn đem tới điều khác biệt cho thị trường nhưng vẫn phù hợp
              về tính năng sản phẩm cũng như túi tiền, nhu cầu của khách hàng,
              chúng tôi luôn không ngừng tìm kiếm và sáng tạo để ngày một hoàn
              thiện hơn và mang đến cho khách hàng những sản phẩm mới tinh tế và
              độc đáo.
            </p>
            <p>
              Chúng tôi hi vọng mỗi cửa hàng của MIN đều sẽ là một là một không
              gian đủ sáng tạo dành cho ai yêu sự độc đáo, đủ ấm áp thân quen
              với những người đôi chút hoài cổ, đủ phù hợp để mỗi khách hàng đến
              với MIN đều có thể tìm được một vài món đồ cho ngôi nhà, cửa hàng
              hay không gian của mình.
            </p>
          </div>
          <div className="col-xs-12 col-sm-6 col-md-4 pull-left img-col">
            <img src="img/about_2.jpeg" className="img-responsive" />
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12 col-sm-6 col-md-8 txt-col">
            <h2>Chúng tôi làm gì?</h2>
            <h3>
              <i className="fa fa-long-arrow-right" /> Thiết kế và thi công nội
              thất
            </h3>
            <p>
              MIN thực hiện các dự án thiết kế và thi công nội thất: nhà phố,
              biệt thự, căn hộ chung cư, cửa hàng, showroom, nhà hàng, cafe,
              bar, spa, khách sạn, resort...ở tất cả các tỉnh thành.
            </p>
            <p>
              Với mong muốn là bạn đồng hành thân thiết của khách hàng trong
              việc tạo dựng những không gian khác biệt, MIN luôn tôn trọng cái
              tôi và tiếng nói riêng của mỗi khách hàng và lấy đó làm cơ sở, kết
              hợp cùng với những ý tưởng và kinh nghiệm của nhà thiết kế, chắc
              chắn sẽ tạo ra một không gian sống và làm việc thẩm mỹ, cá tính và
              tối ưu hoá công năng sử dụng cho khách hàng.
            </p>
          </div>
          <div className="col-xs-12 col-sm-6 col-md-4 img-col">
            <img src="img/about_3.jpeg" className="img-responsive" />
          </div>
        </div>
      </div>
      {/* Đặc điểm nổi bật */}
      <div className="container commitment">
        <div className="section-title">
          <h2>min cam kết</h2>
          <p>Thêm một số điều tuyệt vời nho nhỏ</p>
        </div>
        <div className="row">
          <div className="icon-box col-xs-6 col-md-3">
            <div className="icon truck">
              <i className="fa fa-truck" />
              <i className="fa fa-truck" />
            </div>
            <div className="icon-content">
              <h3>Giao hàng nhanh</h3>
              <p>Cam kết giao hàng trong vòng 24 giờ.</p>
            </div>
          </div>
          <div className="icon-box col-xs-6 col-md-3">
            <div className="icon card">
              <i className="fa fa-credit-card" />
            </div>
            <div className="icon-content">
              <h3>Thanh toán dễ dàng</h3>
              <p>Hỗ trợ đa dạng các công cụ thanh toán trực tuyến</p>
            </div>
          </div>
          <div className="icon-box col-xs-6 col-md-3">
            <div className="icon guarantee">
              <img src="img/guarantee1.png" />
            </div>
            <div className="icon-content">
              <h3>Bảo hành dài hạn</h3>
              <p>Bảo hành từ 12 đến 24 tháng tùy sản phẩm.</p>
            </div>
          </div>
          <div className="icon-box col-xs-6 col-md-3">
            <div className="icon gift">
              <i className="fa fa-gift" />
            </div>
            <div className="icon-content">
              <h3>Ưu đãi thành viên</h3>
              <p>Quà tặng, giảm giá cho thành viên.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default About;
