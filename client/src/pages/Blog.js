import axios from "axios";
import parseHTML from "html-react-parser";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { formatDate } from "../utils/formatDate";

function Blog() {
  const [blogs, setBlogs] = useState([]);
  const [blogCategories, setBlogCategories] = useState([]);
  const [blogTags, setBlogTags] = useState([]);

  const [searchInput, setSearchInput] = useState("");
  const [tagFilter, setTagFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  useEffect(() => {
    document.title = "Blog";

    axios
      .get("/api/blogs")
      .then((res) => setBlogs(res.data))
      .catch((err) => console.log(err));

    axios
      .get("/api/blogs/categories")
      .then((res) => setBlogCategories(res.data))
      .catch((err) => console.log(err));

    axios
      .get("/api/blogs/tags")
      .then((res) => setBlogTags(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <div className="container-fluid page-heading blog-heading">
        <div className="heading-content">
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
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                  />
                </div>
                <button type="submit" className="btn btn-default">
                  <i className="fa fa-search" />
                </button>
              </form>
            </li>
            <li className="nav-title" onClick={() => setCategoryFilter("")}>
              <a data-toggle="display-all">
                <h4>Danh mục bài viết</h4>
              </a>
            </li>
            {blogCategories &&
              blogCategories.length > 0 &&
              blogCategories.map((category) => (
                <li key={category._id}>
                  <button
                    className={
                      categoryFilter === category._id
                        ? "product-group active"
                        : "product-group"
                    }
                    // type="button"
                    // data-toggle="filter-display"
                    // data-target=".room"
                    onClick={() => setCategoryFilter(category._id)}
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

            <li className="nav-title" onClick={() => setTagFilter("")}>
              <a data-toggle="display-all">
                <h4>Blog Tag</h4>
              </a>
            </li>
            <li className="tags">
              {blogTags &&
                blogTags.length > 0 &&
                blogTags.map((tag) => (
                  <button
                    key={tag._id}
                    type="button"
                    className={tagFilter === tag.tag ? "active" : ""}
                    // data-toggle="filter-display"
                    // data-target=".dining-room"
                    onClick={() => setTagFilter(tag.tag)}
                  >
                    <h5>{tag.tag}</h5>
                  </button>
                ))}
            </li>
          </ul>
          <div className="blog-list pull-left col-md-9 col-sm-8 col-xs-12">
            {blogs &&
              blogs.length > 0 &&
              blogs
                .filter((blog) =>
                  new RegExp(searchInput, "gi").test(blog.title)
                )
                .filter((blog) =>
                  tagFilter ? blog.tags.includes(tagFilter) : true
                )
                .filter((blog) =>
                  categoryFilter ? blog.category._id === categoryFilter : true
                )
                .map((blog) => (
                  <div className="col-item col-xs-12">
                    <div className="item-container">
                      <div className="blog-img">
                        <Link to={`/blog/${blog._id}`}>
                          <img
                            src={`/images/${blog.cover}`}
                            className="img-responsive"
                            alt="image"
                          />
                          <span className="cross" />
                        </Link>
                      </div>
                      <div className="blog-content-small">
                        <h3>
                          <Link className="max-2-line" to={`/blog/${blog._id}`}>
                            {blog.title}
                          </Link>
                        </h3>
                        <span className="blog-info">
                          <span className="date">
                            <i className="fa fa-clock-o" />
                            {formatDate(blog.createdAt)}
                          </span>
                          <span className="author">
                            <i className="fa fa-pencil-square-o" />
                            <span>{blog.author.name}</span>
                          </span>
                          {/* <span className="comments">
                          <i className="fa fa-comments-o" />
                          <a href="#">2</a>
                        </span> */}
                        </span>
                        <div className="blog-excerpt">
                          <div
                            class="max-2-line"
                            style={{ maxHeight: "100px" }}
                          >
                            {parseHTML(blog.content)}
                          </div>
                          <div className="link-container">
                            <Link className="link-to" to={`/blog/${blog._id}`}>
                              Đọc thêm <i className="fa fa-angle-right" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Blog;
