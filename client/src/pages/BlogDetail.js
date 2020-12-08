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
          <div className="pull-left col-md-12 col-sm-12 col-xs-12">
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
                      <div
                        style={{
                          textAlign: "justify",
                          margin: "0 auto !important",
                        }}
                      >
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
