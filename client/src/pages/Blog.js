import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { formatDate } from "../utils/formatDate";

function Blog() {
  const news = useSelector(({ products }) => products.news);

  useEffect(() => {
    document.title = "Tin tức";
  }, []);

  return (
    <>
      <div className="container-fluid page-heading blog-heading">
        <div className="heading-content">
          <h1>Blog</h1>
          <p>
            Nơi MIN chia sẻ những ý tưởng độc đáo, những kiến thức hữu ích, và
            những câu chuyện thú vị về nội thất.
          </p>
          <ol className="breadcrumb">
            <li>
              <a href="home.html">Trang chủ</a>
            </li>
            <li className="active">Blog</li>
          </ol>
        </div>
      </div>
      <div className="container blog-main">
        <nav className="navbar navbar-default">
          <button
            type="button"
            className="navbar-toggle pull-right"
            data-toggle="slide-collapse"
            data-target="#blog-nav"
          >
            <span className="icon-bar" />
            <span className="icon-bar" />
            <span className="icon-bar" />
          </button>
        </nav>
        <div className="row">
          <ul
            className="nav nav-stacked collapse navbar-collapse pull-right"
            id="blog-nav"
          >
            <li className="search-box">
              <div className="nav-title">
                <h4>Tìm kiếm bài viết</h4>
              </div>
              <form className="navbar-form">
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search"
                  />
                </div>
                <button type="submit" className="btn btn-default">
                  <i className="fa fa-search" />
                </button>
              </form>
            </li>
            <li className="nav-title">
              <a data-toggle="display-all">
                <h4>Danh mục bài viết</h4>
              </a>
            </li>
            <li>
              <button
                className="product-group"
                type="button"
                data-toggle="filter-display"
                data-target=".tips"
              >
                <h4>Mẹo hữu ích</h4>
              </button>
              <span className="number" />
            </li>
            <li>
              <button
                className="product-group"
                type="button"
                data-toggle="filter-display"
                data-target=".idea"
              >
                <h4>Ý tưởng độc đáo</h4>
              </button>
              <span className="number" />
            </li>
            <li>
              <button
                className="product-group"
                type="button"
                data-toggle="filter-display"
                data-target=".yinyang"
              >
                <h4>Phong thủy</h4>
              </button>
              <span className="number" />
            </li>
            <li>
              <button
                className="product-group"
                type="button"
                data-toggle="filter-display"
                data-target=".trend"
              >
                <h4>Xu hướng nội thất</h4>
                <span className="number" />
              </button>
            </li>
            <li>
              <button
                className="product-group"
                type="button"
                data-toggle="filter-display"
                data-target=".room"
              >
                <h4>Những căn phòng đẹp</h4>
                <span className="number" />
              </button>
            </li>
            <li className="nav-title">
              <h4>Bài viết gần đây</h4>
            </li>
            <li className="post">
              <a href="blog-detail.html">
                <h4>Nội thất cổ điển cho không gian nhỏ</h4>
              </a>
            </li>
            <li className="post">
              <a href="blog-detail.html">
                <h4>Nội thất đẹp cho căn hộ dưới 40m²</h4>
              </a>
            </li>
            <li className="post">
              <a href="blog-detail.html">
                <h4>5 mẹo giúp căn hộ luôn khô thoáng</h4>
              </a>
            </li>
            <li className="post">
              <a href="blog-detail.html">
                <h4>Một số lưu ý về phong thủy trong thiết kế</h4>
              </a>
            </li>
            <li className="post">
              <a href="blog-detail.html">
                <h4>Ngắm căn hộ với phong cách Rustic độc đáo</h4>
              </a>
            </li>
            <li className="nav-title">
              <a data-toggle="display-all">
                <h4>Blog Tag</h4>
              </a>
            </li>
            <li className="tags">
              <button
                type="button"
                data-toggle="filter-display"
                data-target=".dining-room"
              >
                <h5>Phòng ăn</h5>
              </button>
              <button
                type="button"
                data-toggle="filter-display"
                data-target=".living-room"
              >
                <h5>Phòng khách</h5>
              </button>
              <button
                type="button"
                data-toggle="filter-display"
                data-target=".bedroom"
              >
                <h5>Phòng ngủ</h5>
              </button>
              <button
                type="button"
                data-toggle="filter-display"
                data-target=".tips"
              >
                <h5>Mẹo hay</h5>
              </button>
              <button
                type="button"
                data-toggle="filter-display"
                data-target=".wood"
              >
                <h5>Đồ gỗ</h5>
              </button>
              <button
                type="button"
                data-toggle="filter-display"
                data-target=".idea"
              >
                <h5>Ý tưởng</h5>
              </button>
              <button
                type="button"
                data-toggle="filter-display"
                data-target=".decor"
              >
                <h5>Trang trí</h5>
              </button>
              <button
                type="button"
                data-toggle="filter-display"
                data-target=".trend"
              >
                <h5>Xu hướng</h5>
              </button>
              <button
                type="button"
                data-toggle="filter-display"
                data-target=".yinyang"
              >
                <h5>Phong thủy</h5>
              </button>
            </li>
          </ul>
          <div className="blog-list pull-left col-md-9 col-sm-8 col-xs-12">
            <div className="col-item col-xs-12">
              <div className="item-container">
                <div className="blog-img">
                  <a href="blog-detail.html">
                    <img src="img/blog_3.jpg" className="img-responsive" />
                    <span className="cross" />
                  </a>
                </div>
                <div className="blog-content-small">
                  <h3>
                    <a href="blog-detail.html">
                      Nội thất cổ điển cho không gian nhỏ
                    </a>
                  </h3>
                  <span className="blog-info">
                    <span className="date">
                      <i className="fa fa-clock-o" />
                      20 Th.4, 2017
                    </span>
                    <span className="author">
                      <i className="fa fa-pencil-square-o" />
                      <a href="#">admin</a>
                    </span>
                    <span className="comments">
                      <i className="fa fa-comments-o" />
                      <a href="#">2</a>
                    </span>
                  </span>
                  <div className="blog-excerpt">
                    <p>
                      Nói đến thiết kế cổ điển chúng ta thường hình dung ra
                      những mẫu thiết kế chắc chắn và bề thế. Tuy nhiên để phù
                      hợp với xu hướng hiện đại...
                    </p>
                    <div className="link-container">
                      <a className="link-to" href="blog-detail.html">
                        Đọc thêm <i className="fa fa-angle-right" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-item col-xs-12">
              <div className="item-container">
                <div className="blog-img">
                  <img src="img/blog_6.jpeg" className="img-responsive" />
                  <span className="cross" />
                </div>
                <div className="blog-content-small">
                  <h3>
                    <a href="blog-detail.html">
                      Một số lưu ý về phong thủy trong thiết kế nội thất
                    </a>
                  </h3>
                  <span className="blog-info">
                    <span className="date">
                      <i className="fa fa-clock-o" />
                      03 Th.4, 2017
                    </span>
                    <span className="author">
                      <i className="fa fa-pencil-square-o" />
                      <a href="#">hieudo</a>
                    </span>
                    <span className="comments">
                      <i className="fa fa-comments-o" />
                      <a href="#">5</a>
                    </span>
                  </span>
                  <div className="blog-excerpt">
                    <p>
                      Không gian sống ngày càng thu hẹp nên thiết kế nội thất
                      căn hộ nhỏ hiện đã trở thành mẫu căn hộ phổ biến. Bạn sẽ
                      làm thế nào để bài trí phòng ốc đúng phong thủy nếu phòng
                      ngủ là một phần của phòng khách, và phòng bếp với bàn ăn
                      cũng nằm trong nhau?...
                    </p>
                    <div className="link-container">
                      <a className="link-to" href="blog-detail.html">
                        Đọc thêm <i className="fa fa-angle-right" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-item col-xs-12">
              <div className="item-container">
                <div className="blog-img">
                  <img src="img/blog_10.jpeg" className="img-responsive" />
                  <span className="cross" />
                </div>
                <div className="blog-content-small">
                  <h3>
                    <a href="blog-detail.html">
                      Ngắm căn hộ với phong cách Rustic độc đáo
                    </a>
                  </h3>
                  <span className="blog-info">
                    <span className="date">
                      <i className="fa fa-clock-o" />
                      18 Th.3, 2017
                    </span>
                    <span className="author">
                      <i className="fa fa-pencil-square-o" />
                      <a href="#">hieudo</a>
                    </span>
                    <span className="comments">
                      <i className="fa fa-comments-o" />
                      <a href="#">6</a>
                    </span>
                  </span>
                  <div className="blog-excerpt">
                    <p>
                      Phong cách Rustic có nghĩa là giữ lại những gì đẹp nhất,
                      có hồn nhất của món nội thất để tạo nên sự mộc mạc nhưng
                      không kém phần quyến rũ và cá tính...
                    </p>
                    <div className="link-container">
                      <a className="link-to" href="blog-detail.html">
                        Đọc thêm <i className="fa fa-angle-right" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-item col-xs-12">
              <div className="item-container">
                <div className="blog-img">
                  <img src="img/blog_8.jpg" className="img-responsive" />
                  <span className="cross" />
                </div>
                <div className="blog-content-small">
                  <h3>
                    <a href="blog-detail.html">
                      5 Mẹo giúp nội thất căn hộ luôn khô thoáng
                    </a>
                  </h3>
                  <span className="blog-info">
                    <span className="date">
                      <i className="fa fa-clock-o" />
                      10 Th.4, 2017
                    </span>
                    <span className="author">
                      <i className="fa fa-pencil-square-o" />
                      <a href="#">admin</a>
                    </span>
                    <span className="comments">
                      <i className="fa fa-comments-o" />
                      <a href="#">2</a>
                    </span>
                  </span>
                  <div className="blog-excerpt">
                    <p>
                      Căn nhà của bạn luôn bị thay đổi mỗi khi thời tiết giao
                      mùa hoặc mưa phùn, hiện tượng nồm ẩm xuất hiện mang đến
                      cảm giác khó chịu và bực bội...
                    </p>
                    <div className="link-container">
                      <a className="link-to" href="blog-detail.html">
                        Đọc thêm <i className="fa fa-angle-right" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-item col-xs-12">
              <div className="item-container">
                <div className="blog-img">
                  <img src="img/blog_9.jpg" className="img-responsive" />
                  <span className="cross" />
                </div>
                <div className="blog-content-small">
                  <h3>
                    <a href="blog-detail.html">
                      Mẹo lưu trữ đồ đạc cho phòng bếp thêm gọn gàng
                    </a>
                  </h3>
                  <span className="blog-info">
                    <span className="date">
                      <i className="fa fa-clock-o" />
                      28 Th.3, 2017
                    </span>
                    <span className="author">
                      <i className="fa fa-pencil-square-o" />
                      <a href="#">admin</a>
                    </span>
                    <span className="comments">
                      <i className="fa fa-comments-o" />
                      <a href="#">3</a>
                    </span>
                  </span>
                  <div className="blog-excerpt">
                    <p>
                      Phòng bếp chính là nơi mà bạn phải tốn thời gian và công
                      sức nhất cho việc sắp xếp mọi thứ. Với những mẹo trong
                      thiết kế nội thất dưới đây, bạn sẽ giữ phòng bếp nhà mình
                      thoát khỏi sự lộn xộn, luôn trong trạng thái gọn gàng,
                      ngăn nắp nhất...
                    </p>
                    <div className="link-container">
                      <a className="link-to" href="blog-detail.html">
                        Đọc thêm <i className="fa fa-angle-right" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-item col-xs-12">
              <div className="item-container">
                <div className="blog-img">
                  <img src="img/blog_4.jpg" className="img-responsive" />
                  <span className="cross" />
                </div>
                <div className="blog-content-small">
                  <h3>
                    <a href="blog-detail.html">
                      Nội thất đẹp cho căn hộ dưới 40m²
                    </a>
                  </h3>
                  <span className="blog-info">
                    <span className="date">
                      <i className="fa fa-clock-o" />
                      18 Th.4, 2017
                    </span>
                    <span className="author">
                      <i className="fa fa-pencil-square-o" />
                      <a href="#">hieudo</a>
                    </span>
                    <span className="comments">
                      <i className="fa fa-comments-o" />
                      <a href="#">5</a>
                    </span>
                  </span>
                  <div className="blog-excerpt">
                    <p>
                      Dạng căn hộ dưới 40m² ngày càng phổ biến trên thế giới.
                      Bất chấp diện tích có hạn, chỉ cần sáng tạo và bài trí hợp
                      lý, chúng vẫn là những không gian sống đáng mơ ước...
                    </p>
                    <div className="link-container">
                      <a className="link-to" href="blog-detail.html">
                        Đọc thêm <i className="fa fa-angle-right" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-item col-xs-12">
              <div className="item-container">
                <div className="blog-img">
                  <img src="img/blog_7.jpg" className="img-responsive" />
                  <span className="cross" />
                </div>
                <div className="blog-content-small">
                  <h3>
                    <a href="blog-detail.html">
                      Mở rộng không gian phòng ngủ với nội thất tinh tế
                    </a>
                  </h3>
                  <span className="blog-info">
                    <span className="date">
                      <i className="fa fa-clock-o" />
                      17 Th.4, 2017
                    </span>
                    <span className="author">
                      <i className="fa fa-pencil-square-o" />
                      <a href="#">robin</a>
                    </span>
                    <span className="comments">
                      <i className="fa fa-comments-o" />
                      <a href="#">6</a>
                    </span>
                  </span>
                  <div className="blog-excerpt">
                    <p>
                      Nội thất phòng ngủ bằng chất liệu thông dụng, sử dụng
                      những gam màu trung tính nhẹ nhàng mà vẫn lôi cuốn, là
                      cách để mở rộng hơn không gian sinh hoạt, đồng thời mang
                      đến cho người dùng cảm giác thoải mái và dễ chịu...
                    </p>
                    <div className="link-container">
                      <a className="link-to" href="blog-detail.html">
                        Đọc thêm <i className="fa fa-angle-right" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-item col-xs-12">
              <div className="item-container">
                <div className="blog-img">
                  <img src="img/blog_5.jpg" className="img-responsive" />
                  <span className="cross" />
                </div>
                <div className="blog-content-small">
                  <h3>
                    <a href="blog-detail.html">
                      Những căn bếp tràn ngập ánh sáng
                    </a>
                  </h3>
                  <span className="blog-info">
                    <span className="date">
                      <i className="fa fa-clock-o" />
                      19 Th.4, 2017
                    </span>
                    <span className="author">
                      <i className="fa fa-pencil-square-o" />
                      <a href="#">admin</a>
                    </span>
                    <span className="comments">
                      <i className="fa fa-comments-o" />
                      <a href="#">3</a>
                    </span>
                  </span>
                  <div className="blog-excerpt">
                    <p>
                      Thiết kế những mảng tường bằng kính hoặc cửa sổ lớn sẽ là
                      sự lựa chọn thông minh đem đến cho phòng bếp những góc
                      nhìn tuyệt vời và đầy cảm hứng mỗi ngày...
                    </p>
                    <div className="link-container">
                      <a className="link-to" href="blog-detail.html">
                        Đọc thêm <i className="fa fa-angle-right" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <nav className="col-xs-12 col-sm-8 col-md-9">
            <div className="pagination">
              <a className="prev page-no" href="#">
                <i className="fa fa-long-arrow-left" />
              </a>
              <a href="#" className="page-no">
                1
              </a>
              <a href="#" className="page-no current">
                2
              </a>
              <a href="#" className="page-no">
                3
              </a>
              <a href="#" className="page-no">
                4
              </a>
              <a href="#" className="page-no">
                5
              </a>
              <a className="next page-no" href="#">
                <i className="fa fa-long-arrow-right" />
              </a>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}

export default Blog;
