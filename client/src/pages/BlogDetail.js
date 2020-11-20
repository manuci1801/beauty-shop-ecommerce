import axios from "axios";
import parseHTML from "html-react-parser";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "../App.css";

function BlogDetail() {
  let { id } = useParams();

  const [blog, setBlog] = useState({});
  const [blogs, setBlogs] = useState([]);
  const [blogCategories, setBlogCategories] = useState([]);
  const [blogTags, setBlogTags] = useState([]);

  useEffect(() => {
    axios
      .get("/api/blogs")
      .then((res) => {
        if (res.data.length > 0) {
          setBlogs(res.data);
          const blog = res.data.find((e) => e._id == id);
          setBlog(blog);
        }
      })
      .catch((err) => console.log(err));

    axios
      .get("/api/blogs/categories")
      .then((res) => setBlogCategories(res.data))
      .catch((err) => console.log(err));

    axios
      .get("/api/blogs/tags")
      .then((res) => setBlogTags(res.data))
      .catch((err) => console.log(err));
  }, [id]);

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
              <Link to="/">Trang chủ</Link>
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
            style={{ fontSize: "16px" }}
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
            {blogCategories &&
              blogCategories.length > 0 &&
              blogCategories.map((category) => (
                <li key={category._id}>
                  <button
                    className="product-group"
                    type="button"
                    // data-toggle="filter-display"
                    // data-target=".room"
                  >
                    <h4>{category.name}</h4>
                    <span className="number" />
                  </button>
                </li>
              ))}

            <li className="nav-title">
              <h4>Bài viết gần đây</h4>
            </li>
            {blogs &&
              blogs.length > 0 &&
              blogs.slice(0, 3).map((blog) => (
                <li key={blog._id} className="post">
                  <Link to={`/blog/${blog._id}`}>
                    <h4 className=".max-1-line">{blog.title}</h4>
                  </Link>
                </li>
              ))}

            <li className="nav-title">
              <a data-toggle="display-all">
                <h4>Blog Tag</h4>
              </a>
            </li>
            <li className="tags">
              {blogTags &&
                blogTags.length > 0 &&
                blogTags.map((tag) => (
                  <button
                    type="button"
                    // data-toggle="filter-display"
                    // data-target=".dining-room"
                  >
                    <h5>{tag.tag}</h5>
                  </button>
                ))}
            </li>
          </ul>
          <div className="pull-left col-md-9 col-sm-8 col-xs-12">
            <div
              style={{
                textAlign: "center",
                backgroundColor: "#fff",
                padding: "0 16px",
                marginBottom: "16px",
              }}
            >
              {blog && Object.keys(blog).length > 0 && (
                <div>
                  <h1 style={{ fontSize: "32px", padding: "16px" }}>
                    {blog.title}
                  </h1>
                  <img class="img-responsive" src={`/images/${blog.cover}`} />
                  <div style={{ fontSize: "16px", padding: "16px" }}>
                    {blog.content ? (
                      <div style={{ textAlign: "justify" }}>
                        {parseHTML(blog.content)}
                      </div>
                    ) : null}
                  </div>
                </div>
              )}
            </div>
          </div>
          {/* <nav className="col-xs-12 col-sm-8 col-md-9">
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
          </nav> */}
        </div>
      </div>
    </>
  );
}

export default BlogDetail;
