import React, { useEffect } from "react";

function Home() {
  // const [products, isLoading] = useSelector(({ products, errors }) => [
  //   products.products,
  //   errors.isLoading,
  // ]);

  useEffect(() => {
    document.title = "Trang chủ";
  }, []);

  return (
    <>
      <div className="container-fluid banner">
        <div className="row">
          <div className="box-col col-sm-4 pull-left hidden-xs">
            <div className="box product">
              <div className="content front">
                <img className="img-responsive" src="img/chair.png" />
              </div>
              <div className="content back">
                <div className="count">23</div>
                <h4>Thương hiệu</h4>
              </div>
            </div>
            <div className="box-title product">
              <h4>Sản phẩm Nội thất</h4>
            </div>
          </div>
          <div className="box-col col-sm-4 pull-right hidden-xs">
            <div className="box project">
              <div className="content front">
                <img className="img-responsive" src="img/hammer.png" />
              </div>
              <div className="content back">
                <div className="count">96</div>
                <h4>Dự án</h4>
              </div>
            </div>
            <div className="box-title project">
              <h4>Thiết kế &amp; Thi công</h4>
            </div>
          </div>
          <div className="col-xs-12 col-sm-4">
            <div className="slogan">
              <h1>min</h1>
              <h3>Giản đơn &amp; Tinh tế</h3>
              <a id="to-about" href="#">
                <img src="img/down.png" />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid about" id="about-min">
        <div className="section-title">
          <h2>Giới thiệu về Min</h2>
        </div>
        <i>
          MIN, được viết tắt từ Minimalist, có nghĩa là sự đơn giản, giảm thiểu
          các chi tiết thừa, chỉ giữ lại những phần thật sự cần thiết cho công
          năng và thẩm mỹ để mang lại nét tinh tế thanh lịch cho không gian
          thiết kế.
        </i>
        <br />
        <i>
          MIN mang đến cho khách hàng những sản phẩm nội thất mộc mạc, đơn giản
          mà vẫn có cá tính riêng, đồng thời thực hiện các dự án thiết kế và thi
          công nội thất với mong muốn tạo dựng những không gian khác biệt, tinh
          tế và sáng tạo.
        </i>
        <div className="link-container">
          <a className="link-to" href="about.html">
            Xem thêm <i className="fa fa-angle-right" />
          </a>
        </div>
      </div>
      {/* Sản phẩm mới */}
      <div className="container-fluid">
        <div className="section-title">
          <h2>Sản phẩm mới</h2>
          <p>Những sản phẩm mới nhất T4/2017</p>
        </div>
        <div className="row block-container">
          <div className="block block1 col-xs-6 col-sm-6 col-md-3">
            <div className="banner-content">
              <h3>Bộ bàn ghế sân vườn BJ Pappilon</h3>
              <a href="shop-detail.html">
                Xem chi tiết <i className="fa fa-long-arrow-right" />
              </a>
            </div>
            <img src="img/banner_1.jpg" className="img-responsive" />
          </div>
          <div className="block single block2 col-xs-6 col-sm-6 col-md-3">
            <img src="img/banner_2.jpg" className="img-responsive" />
          </div>
          <div className="block single block5 col-xs-6 col-sm-6 col-md-3">
            <img src="img/banner_5.jpg" className="img-responsive" />
          </div>
          <div className="block double block4 col-xs-12 col-md-6">
            <div className="banner-content">
              <h3>Bộ gốm sứ Kakiemon Unique</h3>
              <a href="shop-detail.html">
                Xem chi tiết <i className="fa fa-long-arrow-right" />
              </a>
            </div>
            <img src="img/banner_4.jpg" className="img-responsive" />
          </div>
          <div className="block double block3 col-xs-12 col-md-6">
            <div className="banner-content">
              <h3>Bộ sofa DH Breland</h3>
              <a href="shop-detail.html">
                Xem chi tiết <i className="fa fa-long-arrow-right" />
              </a>
            </div>
            <img src="img/banner_3.jpg" className="img-responsive" />
          </div>
        </div>
      </div>
      {/* Sản phẩm nổi bật */}
      <div className="container-fluid featured">
        <div className="section-title">
          <h2>Sản phẩm nổi bật</h2>
          <p>Top những sản phẩm được đánh giá cao</p>
        </div>
        <div className="row">
          <ul className="nav nav-tabs">
            <li className="active">
              <a href="#chair" data-toggle="tab">
                Ghế
              </a>
            </li>
            <li>
              <a href="#table" data-toggle="tab">
                Bàn
              </a>
            </li>
            <li>
              <a href="#cabinet" data-toggle="tab">
                Tủ &amp; Giá
              </a>
            </li>
          </ul>
          <div className="tab-content">
            <div className="tab-pane active fade in" id="chair">
              <div className="col-item col-xs-6 col-md-3">
                <div className="item-container">
                  <div className="name">
                    <h3>Eros Papasan</h3>
                    <p>by Kartell</p>
                  </div>
                  <div className="photo">
                    <div
                      id="product1"
                      className="carousel slide"
                      data-ride="carousel"
                      data-interval="false"
                    >
                      <ol className="carousel-indicators">
                        <li
                          data-target="#product1"
                          data-slide-to={0}
                          className="active"
                        />
                        <li data-target="#product1" data-slide-to={1} />
                      </ol>
                      <div className="carousel-inner" role="listbox">
                        <div
                          style={{
                            backgroundImage: `url(img/danhmat.png)`,
                          }}
                          className="item active"
                        ></div>
                        <div
                          style={{
                            backgroundImage: `url(img/product_1b.jpg)`,
                          }}
                          className="item"
                        ></div>
                      </div>
                    </div>
                    <div className="vertical-icon">
                      <a href="#">
                        <i className="fa fa-heart-o" />
                      </a>
                      <a href="#">
                        <i className="fa fa-shopping-cart" />
                      </a>
                      <a href="shop-detail.html">
                        <i className="fa fa-search-plus" />
                      </a>
                    </div>
                  </div>
                  <div className="price">
                    <strong>4.800.000₫</strong>
                  </div>
                </div>
              </div>
              <div className="col-item col-xs-6 col-md-3">
                <div className="item-container">
                  <div className="name">
                    <h3>Signature Chair</h3>
                    <p>by Frits Henningsen</p>
                  </div>
                  <div className="photo">
                    <div
                      id="product2"
                      className="carousel slide"
                      data-ride="carousel"
                      data-interval="false"
                    >
                      <ol className="carousel-indicators">
                        <li
                          data-target="#product2"
                          data-slide-to={0}
                          className="active"
                        />
                        <li data-target="#product2" data-slide-to={1} />
                        <li data-target="#product2" data-slide-to={2} />
                        <li data-target="#product2" data-slide-to={3} />
                      </ol>
                      <div className="carousel-inner" role="listbox">
                        <div className="item active">
                          <img src="img/product_2a.jpg" />
                        </div>
                        <div className="item">
                          <img src="img/product_2b.jpg" />
                        </div>
                        <div className="item">
                          <img src="img/product_2c.jpg" />
                        </div>
                        <div className="item">
                          <img src="img/product_2d.jpg" />
                        </div>
                      </div>
                    </div>
                    <div className="vertical-icon">
                      <a href="#">
                        <i className="fa fa-heart-o" />
                      </a>
                      <a href="#">
                        <i className="fa fa-shopping-cart" />
                      </a>
                      <a href="shop-detail.html">
                        <i className="fa fa-search-plus" />
                      </a>
                    </div>
                  </div>
                  <div className="price">
                    <strong>4.400.000₫</strong>
                  </div>
                  <div className="tag tag-right sale" />
                  <div className="tag-name-right">Sale!</div>
                </div>
              </div>
              <div className="col-item col-xs-6 col-md-3">
                <div className="item-container">
                  <div className="name">
                    <h3>Hansen Ro</h3>
                    <p>by Fritz Hansen</p>
                  </div>
                  <div className="photo">
                    <div
                      id="product3"
                      className="carousel slide"
                      data-ride="carousel"
                      data-interval="false"
                    >
                      <ol className="carousel-indicators">
                        <li
                          data-target="#product3"
                          data-slide-to={0}
                          className="active"
                        />
                        <li data-target="#product3" data-slide-to={1} />
                        <li data-target="#product3" data-slide-to={2} />
                      </ol>
                      <div className="carousel-inner" role="listbox">
                        <div className="item active">
                          <img src="img/product_4a.jpg" />
                        </div>
                        <div className="item">
                          <img src="img/product_4b.jpg" />
                        </div>
                        <div className="item">
                          <img src="img/product_4c.jpg" />
                        </div>
                      </div>
                    </div>
                    <div className="vertical-icon">
                      <a href="#">
                        <i className="fa fa-heart-o" />
                      </a>
                      <a href="#">
                        <i className="fa fa-shopping-cart" />
                      </a>
                      <a href="shop-detail.html">
                        <i className="fa fa-search-plus" />
                      </a>
                    </div>
                  </div>
                  <div className="price">
                    <strong>6.600.000₫</strong>
                  </div>
                </div>
              </div>
              <div className="col-item col-xs-6 col-md-3">
                <div className="item-container">
                  <div className="name">
                    <h3>Cuba Chair</h3>
                    <p>by Morten Goettler</p>
                  </div>
                  <div className="photo">
                    <div
                      id="product4"
                      className="carousel slide"
                      data-ride="carousel"
                      data-interval="false"
                    >
                      <ol className="carousel-indicators">
                        <li
                          data-target="#product4"
                          data-slide-to={0}
                          className="active"
                        />
                        <li data-target="#product4" data-slide-to={1} />
                        <li data-target="#product4" data-slide-to={2} />
                        <li data-target="#product4" data-slide-to={3} />
                      </ol>
                      <div className="carousel-inner" role="listbox">
                        <div
                          style={{
                            backgroundImage: `url(img/product_6a.jpg)`,
                          }}
                          className="item active"
                        ></div>
                        <div
                          style={{
                            backgroundImage: `url(img/product_6b.jpg)`,
                          }}
                          className="item"
                        ></div>
                        <div
                          style={{
                            backgroundImage: `url(img/product_6c.jpg)`,
                          }}
                          className="item"
                        ></div>
                        <div
                          style={{
                            backgroundImage: `url(img/product_6d.jpg)`,
                          }}
                          className="item"
                        ></div>
                      </div>
                    </div>
                    <div className="vertical-icon">
                      <a href="#">
                        <i className="fa fa-heart-o" />
                      </a>
                      <a href="#">
                        <i className="fa fa-shopping-cart" />
                      </a>
                      <a href="shop-detail.html">
                        <i className="fa fa-search-plus" />
                      </a>
                    </div>
                  </div>
                  <div className="price">
                    <strong>1.900.000₫</strong>
                  </div>
                  <div className="tag tag-left new" />
                  <div className="tag-name-left">New!</div>
                </div>
              </div>
            </div>
            <div className="tab-pane fade" id="table">
              <div className="col-item col-xs-6 col-md-3">
                <div className="item-container">
                  <div className="name">
                    <h3>Rio</h3>
                    <p>by Charlotte Perriand</p>
                  </div>
                  <div className="photo">
                    <div
                      id="rio"
                      className="carousel slide"
                      data-ride="carousel"
                      data-interval="false"
                    >
                      <ol className="carousel-indicators">
                        <li
                          data-target="#rio"
                          data-slide-to={0}
                          className="active"
                        />
                        <li data-target="#rio" data-slide-to={1} />
                        <li data-target="#rio" data-slide-to={2} />
                        <li data-target="#rio" data-slide-to={3} />
                      </ol>
                      <div className="carousel-inner" role="listbox">
                        <div className="item active">
                          <img src="img/rio_1.jpg" />
                        </div>
                        <div className="item">
                          <img src="img/rio_2.jpg" />
                        </div>
                        <div className="item">
                          <img src="img/rio_3.jpg" />
                        </div>
                        <div className="item">
                          <img src="img/rio_4.jpg" />
                        </div>
                      </div>
                    </div>
                    <div className="vertical-icon">
                      <a href="#">
                        <i className="fa fa-heart-o" />
                      </a>
                      <a href="#">
                        <i className="fa fa-shopping-cart" />
                      </a>
                      <a href="shop-detail.html">
                        <i className="fa fa-search-plus" />
                      </a>
                    </div>
                  </div>
                  <div className="price">
                    <strong>4.900.000₫</strong>
                  </div>
                </div>
              </div>
              <div className="col-item col-xs-6 col-md-3">
                <div className="item-container">
                  <div className="name">
                    <h3>Rotor</h3>
                    <p>by Piero Lissoni</p>
                  </div>
                  <div className="photo">
                    <div
                      id="rotor"
                      className="carousel slide"
                      data-ride="carousel"
                      data-interval="false"
                    >
                      <ol className="carousel-indicators">
                        <li
                          data-target="#rotor"
                          data-slide-to={0}
                          className="active"
                        />
                        <li data-target="#rotor" data-slide-to={1} />
                      </ol>
                      <div className="carousel-inner" role="listbox">
                        <div className="item active">
                          <img src="img/rotor_1.jpg" />
                        </div>
                        <div className="item">
                          <img src="img/rotor_2.jpg" />
                        </div>
                      </div>
                    </div>
                    <div className="vertical-icon">
                      <a href="#">
                        <i className="fa fa-heart-o" />
                      </a>
                      <a href="#">
                        <i className="fa fa-shopping-cart" />
                      </a>
                      <a href="shop-detail.html">
                        <i className="fa fa-search-plus" />
                      </a>
                    </div>
                  </div>
                  <div className="price">
                    <strong>5.600.000₫</strong>
                  </div>
                  <div className="tag tag-left new" />
                  <div className="tag-name-left">New!</div>
                </div>
              </div>
              <div className="col-item col-xs-6 col-md-3">
                <div className="item-container">
                  <div className="name">
                    <h3>La Rotonda</h3>
                    <p>by Mario Bellini</p>
                  </div>
                  <div className="photo">
                    <div
                      id="rotonda"
                      className="carousel slide"
                      data-ride="carousel"
                      data-interval="false"
                    >
                      <ol className="carousel-indicators">
                        <li
                          data-target="#rotonda"
                          data-slide-to={0}
                          className="active"
                        />
                        <li data-target="#rotonda" data-slide-to={1} />
                      </ol>
                      <div className="carousel-inner" role="listbox">
                        <div className="item active">
                          <img src="img/rotonda_1.jpg" />
                        </div>
                        <div className="item">
                          <img src="img/rotonda_2.jpg" />
                        </div>
                      </div>
                    </div>
                    <div className="vertical-icon">
                      <a href="#">
                        <i className="fa fa-heart-o" />
                      </a>
                      <a href="#">
                        <i className="fa fa-shopping-cart" />
                      </a>
                      <a href="shop-detail.html">
                        <i className="fa fa-search-plus" />
                      </a>
                    </div>
                  </div>
                  <div className="price">
                    <strong>3.200.000₫</strong>
                  </div>
                  <div className="tag tag-right sale" />
                  <div className="tag-name-right">Sale!</div>
                </div>
              </div>
              <div className="col-item col-xs-6 col-md-3">
                <div className="item-container">
                  <div className="name">
                    <h3>Ventaglio</h3>
                    <p>by Charlotte Perriand</p>
                  </div>
                  <div className="photo">
                    <div
                      id="ventaglio"
                      className="carousel slide"
                      data-ride="carousel"
                      data-interval="false"
                    >
                      <ol className="carousel-indicators">
                        <li
                          data-target="#ventaglio"
                          data-slide-to={0}
                          className="active"
                        />
                        <li data-target="#ventaglio" data-slide-to={1} />
                        <li data-target="#ventaglio" data-slide-to={2} />
                      </ol>
                      <div className="carousel-inner" role="listbox">
                        <div className="item active">
                          <img src="img/ventaglio_1.jpg" />
                        </div>
                        <div className="item">
                          <img src="img/ventaglio_2.jpg" />
                        </div>
                        <div className="item">
                          <img src="img/ventaglio_3.jpg" />
                        </div>
                      </div>
                    </div>
                    <div className="vertical-icon">
                      <a href="#">
                        <i className="fa fa-heart-o" />
                      </a>
                      <a href="#">
                        <i className="fa fa-shopping-cart" />
                      </a>
                      <a href="shop-detail.html">
                        <i className="fa fa-search-plus" />
                      </a>
                    </div>
                  </div>
                  <div className="price">
                    <strong>7.700.000₫</strong>
                  </div>
                </div>
              </div>
            </div>
            <div className="tab-pane fade" id="cabinet">
              <div className="col-item col-xs-6 col-md-3">
                <div className="item-container">
                  <div className="name">
                    <h3>Casiers Standard</h3>
                    <p>by Le Corbusier</p>
                  </div>
                  <div className="photo">
                    <div
                      id="casiers"
                      className="carousel slide"
                      data-ride="carousel"
                      data-interval="false"
                    >
                      <ol className="carousel-indicators">
                        <li
                          data-target="#casiers"
                          data-slide-to={0}
                          className="active"
                        />
                        <li data-target="#casiers" data-slide-to={1} />
                      </ol>
                      <div className="carousel-inner" role="listbox">
                        <div className="item active">
                          <img src="img/casiers_1.jpg" />
                        </div>
                        <div className="item">
                          <img src="img/casiers_2.jpg" />
                        </div>
                      </div>
                    </div>
                    <div className="vertical-icon">
                      <a href="#">
                        <i className="fa fa-heart-o" />
                      </a>
                      <a href="#">
                        <i className="fa fa-shopping-cart" />
                      </a>
                      <a href="shop-detail.html">
                        <i className="fa fa-search-plus" />
                      </a>
                    </div>
                  </div>
                  <div className="price">
                    <strong>6.600.000₫</strong>
                  </div>
                </div>
              </div>
              <div className="col-item col-xs-6 col-md-3">
                <div className="item-container">
                  <div className="name">
                    <h3>LC16</h3>
                    <p>by Le Corbusier</p>
                  </div>
                  <div className="photo">
                    <div
                      id="lc16"
                      className="carousel slide"
                      data-ride="carousel"
                      data-interval="false"
                    >
                      <ol className="carousel-indicators">
                        <li
                          data-target="#lc16"
                          data-slide-to={0}
                          className="active"
                        />
                        <li data-target="#lc16" data-slide-to={1} />
                      </ol>
                      <div className="carousel-inner" role="listbox">
                        <div className="item active">
                          <img src="img/lc16_1.jpg" />
                        </div>
                        <div className="item">
                          <img src="img/lc16_2.jpg" />
                        </div>
                      </div>
                    </div>
                    <div className="vertical-icon">
                      <a href="#">
                        <i className="fa fa-heart-o" />
                      </a>
                      <a href="#">
                        <i className="fa fa-shopping-cart" />
                      </a>
                      <a href="shop-detail.html">
                        <i className="fa fa-search-plus" />
                      </a>
                    </div>
                  </div>
                  <div className="price">
                    <strong>4.800.000₫</strong>
                  </div>
                  <div className="tag tag-left new" />
                  <div className="tag-name-left">New!</div>
                </div>
              </div>
              <div className="col-item col-xs-6 col-md-3">
                <div className="item-container">
                  <div className="name">
                    <h3>Nuvola Rossa</h3>
                    <p>by Vico Magistretti</p>
                  </div>
                  <div className="photo">
                    <div
                      id="rossa"
                      className="carousel slide"
                      data-ride="carousel"
                      data-interval="false"
                    >
                      <ol className="carousel-indicators">
                        <li
                          data-target="#rossa"
                          data-slide-to={0}
                          className="active"
                        />
                        <li data-target="#rossa" data-slide-to={1} />
                      </ol>
                      <div className="carousel-inner" role="listbox">
                        <div className="item active">
                          <img src="img/rossa_1.jpg" />
                        </div>
                        <div className="item">
                          <img src="img/rossa_2.jpg" />
                        </div>
                      </div>
                    </div>
                    <div className="vertical-icon">
                      <a href="#">
                        <i className="fa fa-heart-o" />
                      </a>
                      <a href="#">
                        <i className="fa fa-shopping-cart" />
                      </a>
                      <a href="shop-detail.html">
                        <i className="fa fa-search-plus" />
                      </a>
                    </div>
                  </div>
                  <div className="price">
                    <strong>3.900.000₫</strong>
                  </div>
                </div>
              </div>
              <div className="col-item col-xs-6 col-md-3">
                <div className="item-container">
                  <div className="name">
                    <h3>Riflesso</h3>
                    <p>by Charlotte Perriand</p>
                  </div>
                  <div className="photo">
                    <div
                      id="riflesso"
                      className="carousel slide"
                      data-ride="carousel"
                      data-interval="false"
                    >
                      <ol className="carousel-indicators">
                        <li
                          data-target="#riflesso"
                          data-slide-to={0}
                          className="active"
                        />
                        <li data-target="#riflesso" data-slide-to={1} />
                      </ol>
                      <div className="carousel-inner" role="listbox">
                        <div className="item active">
                          <img src="img/riflesso_1.jpg" />
                        </div>
                        <div className="item">
                          <img src="img/riflesso_2.jpg" />
                        </div>
                      </div>
                    </div>
                    <div className="vertical-icon">
                      <a href="#">
                        <i className="fa fa-heart-o" />
                      </a>
                      <a href="#">
                        <i className="fa fa-shopping-cart" />
                      </a>
                      <a href="shop-detail.html">
                        <i className="fa fa-search-plus" />
                      </a>
                    </div>
                  </div>
                  <div className="price">
                    <strong>4.400.000₫</strong>
                  </div>
                  <div className="tag tag-right sale" />
                  <div className="tag-name-right">Sale!</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="link-container">
          <a className="link-to" href="shop.html">
            Xem toàn bộ sản phẩm <i className="fa fa-angle-right" />
          </a>
        </div>
      </div>
      {/* Thương hiệu owl carousel */}
      <div className="container-fluid brand-slide">
        <div className="container">
          <div className="brand-owl owl-carousel">
            <div className="brand-item">
              <img src="img/logo_1.png" className="img-responsive" />
            </div>
            <div className="brand-item">
              <img src="img/logo_2.png" className="img-responsive" />
            </div>
            <div className="brand-item">
              <img src="img/logo_3.png" className="img-responsive" />
            </div>
            <div className="brand-item">
              <img src="img/logo_4.png" className="img-responsive" />
            </div>
            <div className="brand-item">
              <img src="img/logo_5.png" className="img-responsive" />
            </div>
            <div className="brand-item">
              <img src="img/logo_6.png" className="img-responsive" />
            </div>
            <div className="brand-item">
              <img src="img/logo_7.png" className="img-responsive" />
            </div>
            <div className="brand-item">
              <img src="img/logo_8.png" className="img-responsive" />
            </div>
            <div className="brand-item">
              <img src="img/logo_9.png" className="img-responsive" />
            </div>
            <div className="brand-item">
              <img src="img/logo_10.png" className="img-responsive" />
            </div>
            <div className="brand-item">
              <img src="img/logo_11.png" className="img-responsive" />
            </div>
            <div className="brand-item">
              <img src="img/logo_12.png" className="img-responsive" />
            </div>
          </div>
        </div>
      </div>
      {/* Bộ sưu tập nổi bật */}
      <div className="container collection">
        <div className="section-title">
          <h2>Bộ sưu tập mới</h2>
          <p>Ikea VIKTIGT Collection 2017</p>
        </div>
        <div className="col-xs-6 col-item">
          <div className="img-container">
            <div className="img-info">
              <h3>VIKTIGT Long Chair</h3>
              <strong>2.800.000₫</strong>
            </div>
            <span className="top-left" />
            <span className="right-bottom" />
            <img src="img/viktigt_1.jpg" className="img-responsive" />
          </div>
        </div>
        <div className="col-xs-6 col-md-3 col-item right-first">
          <div className="img-container">
            <div className="img-info">
              <h3>VIKTIGT Lamp</h3>
              <strong>700.000₫</strong>
            </div>
            <span className="top-left" />
            <span className="right-bottom" />
            <img src="img/viktigt_2.jpg" className="img-responsive" />
          </div>
        </div>
        <div className="col-xs-6 col-md-3 col-item right-first">
          <div className="img-container">
            <div className="img-info">
              <h3>VIKTIGT Chair</h3>
              <strong>1.000.000₫</strong>
            </div>
            <span className="top-left" />
            <span className="right-bottom" />
            <img src="img/viktigt_3.png" className="img-responsive" />
          </div>
        </div>
        <div className="col-xs-6 col-md-3 col-item">
          <div className="img-container">
            <div className="img-info">
              <h3>VIKTIGT Basket</h3>
              <strong>360.000₫</strong>
            </div>
            <span className="top-left" />
            <span className="right-bottom" />
            <img src="img/viktigt_4.jpg" className="img-responsive" />
          </div>
        </div>
        <div className="col-xs-6 col-md-3 col-item">
          <div className="img-container">
            <div className="img-info">
              <h3>VIKTIGT Sofa</h3>
              <strong>3.200.000₫</strong>
            </div>
            <span className="top-left" />
            <span className="right-bottom" />
            <img src="img/viktigt_5.jpg" className="img-responsive" />
          </div>
        </div>
        <div className="col-xs-6 col-item right-last">
          <div className="img-container">
            <div className="img-info">
              <h3>VIKTIGT Plates</h3>
              <strong>1.300.000₫</strong>
            </div>
            <span className="top-left" />
            <span className="right-bottom" />
            <img src="img/viktigt_6.jpg" className="img-responsive" />
          </div>
        </div>
        <div className="link-container">
          <a className="link-to" href="shop.html">
            Xem trọn bộ sưu tập <i className="fa fa-angle-right" />
          </a>
        </div>
      </div>
      {/* Nhận xét của khách hàng */}
      <div className="container-fluid">
        <div className="row">
          <div
            id="feedback"
            className="carousel slide"
            data-ride="carousel"
            data-interval="false"
          >
            <ol className="carousel-indicators">
              <li data-target="#feedback" data-slide-to={0} />
              <li
                data-target="#feedback"
                data-slide-to={1}
                className="active"
              />
              <li data-target="#feedback" data-slide-to={2} />
            </ol>
            <div className="carousel-inner" role="listbox">
              <div className="item">
                <i className="fa fa-quote-left" />
                <p>
                  Min là địa chỉ yêu thích của mình mỗi khi cần mua đồ nội thất.
                  Sản phẩm nào cũng đẹp, cá tính. Nhân viên lại rất thân thiện.
                  Nhà mình góc nào cũng thấy đồ mua từ Min.
                </p>
                <i className="fa fa-quote-right" />
                <strong>
                  -- <span>Tony Stark</span>, Giám đốc kỹ thuật
                </strong>
              </div>
              <div className="item active">
                <i className="fa fa-quote-left" />
                <p>
                  Một không gian đủ sáng tạo dành cho ai yêu sự độc đáo, đủ ấm
                  áp thân quen với những người đôi chút hoài cổ, đủ phù hợp cho
                  những người tìm kiếm “trang sức” cho ngôi nhà, cửa hàng hay
                  không gian của mình. Yêu Min lắm!
                </p>
                <i className="fa fa-quote-right" />
                <strong>
                  -- <span>Lê Cát Trọng Lý</span>, Nhạc sĩ / Ca sĩ
                </strong>
              </div>
              <div className="item">
                <i className="fa fa-quote-left" />
                <p>
                  Căn hộ chung cư tôi đang ở do Min thiết kế và thi công nội
                  thất. Thật sự là hoàn hảo. Nội thất đơn giản, nhẹ nhàng và ấm
                  áp, tôi luôn thấy thư thái bình yên mỗi khi trở về tổ ấm của
                  mình.
                </p>
                <i className="fa fa-quote-right" />
                <strong>
                  -- <span>Haruki Murakami</span>, Nhà văn
                </strong>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Dự án gần đây */}
      <div className="container-fluid new-project">
        <div className="section-title">
          <h2>Thiết kế &amp; Thi công</h2>
          <p>Các dự án mới thực hiện</p>
        </div>
        <div className="project-container single">
          <div className="project-title">
            <h3>Homestay Lacaito</h3>
            <p>Số 2 ngõ Dã Tượng, phố Dã Tượng, Hà Nội</p>
          </div>
        </div>
        <div className="project-container double">
          <div className="project-title">
            <h3>Văn phòng BnW</h3>
            <p>Số 196 Vương Thừa Vũ, Đống Đa, Hà Nội</p>
          </div>
        </div>
        <div className="project-container double">
          <div className="project-title">
            <h3>Fika Cafe</h3>
            <p>Số 50 Lò Đúc, Hai Bà Trưng, Hà Nội</p>
          </div>
        </div>
        <div className="project-container single">
          <div className="project-title">
            <h3>Gardenista Cafe</h3>
            <p>Số 50 Vạn Bảo, Ba Đình, Hà Nội</p>
          </div>
        </div>
        <div className="link-container">
          <a className="link-to" href="blog.html">
            Xem tất cả dự án <i className="fa fa-angle-right" />
          </a>
        </div>
      </div>
      {/* Phong cách */}
      <div className="section-title style">
        <h2>Phong cách</h2>
        <p>Các phong cách thiết kế tại MIN</p>
      </div>
      <div className="container-fluid project-style">
        <div className="row">
          <div className="style-title">
            <p>Bạn chọn phong cách nào cho</p>
            <div>
              <a href="#">
                <i className="fa fa-home" /> Ngôi Nhà
              </a>{" "}
              |{" "}
              <a href="#">
                <i className="fa fa-coffee" /> Cửa Hàng
              </a>
            </div>
            <p className="separator">hay</p>
            <div>
              <a href="#">
                <i className="fa fa-building-o" /> Không gian Làm việc
              </a>
            </div>
            <p>sắp tới của bạn?</p>
          </div>
          <ul className="nav custom-nav nav-tabs container">
            <li>
              <a href="#scandi" data-toggle="tab">
                Tối giản hiện đại
              </a>
            </li>
            <li className="active ">
              <a href="#modern" data-toggle="tab">
                Scandinavian
              </a>
            </li>
            <li>
              <a href="#wabi" data-toggle="tab">
                Wabi Sabi
              </a>
            </li>
          </ul>
          <div className="link-container">
            <a className="link-to" href="#">
              Xem dự án liên quan <i className="fa fa-angle-right" />
            </a>
          </div>
          <div className="tab-content custom-tab">
            <div className="tab-pane fade" id="scandi"></div>
            <div className="tab-pane active fade in" id="modern"></div>
            <div className="tab-pane fade" id="wabi"></div>
          </div>
        </div>
      </div>
      {/* Blog */}
      <div className="container blog-section">
        <div className="section-title">
          <h2>Blog</h2>
          <p>Bài viết mới nhất</p>
        </div>
        <div className="row">
          <div className="blog-container" id="blog1">
            <div className="blog-thumbnail">
              <a href="blog-detail.html">
                <span className="cross" />
              </a>
            </div>
            <div className="blog-content">
              <h3>Nội thất cổ điển cho không gian nhỏ</h3>
              <p>
                Nói đến thiết kế cổ điển chúng ta thường hình dung ra những mẫu
                thiết kế chắc chắn và bề thế. Tuy nhiên để phù hợp với xu hướng
                hiện đại, các nhà thiết kế nội thất đã sáng tạo ra những mẫu
                thiết kế vừa mang tính chất sang trọng của cổ điển, vừa nhỏ gọn
                và tiết kiệm không gian.
              </p>
              <a className="link-to" href="blog-detail.html">
                Đọc thêm <i className="fa fa-angle-right" />
              </a>
            </div>
          </div>
          <div className="blog-container" id="blog2">
            <div className="blog-thumbnail">
              <a href="blog-detail.html">
                <span className="cross" />
              </a>
            </div>
            <div className="blog-content">
              <h3>Nội thất đẹp cho căn hộ dưới 40m²</h3>
              <p>
                Dạng căn hộ dưới 40m² ngày càng phổ biến trên thế giới. Bất chấp
                diện tích có hạn, chỉ cần sáng tạo và bài trí hợp lý, chúng vẫn
                là những không gian sống đáng mơ ước. Cùng tham khảo 4 mẫu căn
                hộ nhỏ xinh dưới đây và học tập cách bài trí thông minh của
                những căn hộ này nhé.
              </p>
              <a className="link-to" href="blog-detail.html">
                Đọc thêm <i className="fa fa-angle-right" />
              </a>
            </div>
          </div>
        </div>
        <div className="link-container">
          <a className="link-to" href="blog.html">
            Xem tất cả bài viết <i className="fa fa-angle-right" />
          </a>
        </div>
      </div>
    </>
  );
}

export default Home;
