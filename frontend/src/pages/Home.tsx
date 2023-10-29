import BlogCard from "../components/blog/BlogCard";
// import imageSrc from "../assets/tech.jpeg";
import Hero from "../components/home/Hero";
import { useEffect, useState } from "react";
import axios from "axios";


interface Post {
  blogcategory: string;
  content: string;
  coverImage: string;
  createdAt: string;
  id: string;
  isActive: boolean;
  title: string;
  updatedAt: string;
  user: string;
}

const Home = () => {
  const [allPost, setPost] = useState<Post[]>();

  async function fetchData() {
    try {
      const response = await axios.get("/api/blog/get-blogs");
      const data = response.data;
      setPost(data.product);
      console.log("Fetched data:", data.product);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Hero />
      <div className="container py-5">
      <div>
        <h3 style={{ margin: "40px 20px" }}>Latest Posts</h3>
        {allPost &&
          allPost.map((post) => (
            <BlogCard
              key={post.id}
              title={post.title}
              author={post.user}
              excerpt={post.content.substring(0, 120)}
              imageSrc={post.coverImage}
              category={post.blogcategory}
              date={new Date(post.createdAt).toDateString()}
              time={new Date(post.createdAt).toLocaleTimeString("en-US")}
              postId={post.id}
            />
          ))}
          </div>
          <div className="col-md-4 mt-5 px-5">
      <div className="position-sticky top: 2rem;">
        <div className="p-4 mb-3 bg-body-tertiary rounded">
          <h4 className="fst-italic">About</h4>
          <p className="mb-0">Whether you're here for expert insights, engaging stories, or practical tips, we aim to be your go-to destination for latest trends. Our team is dedicated to crafting articles that go beyond the surface, delving into the heart of topics to provide you with valuable perspectives and knowledge.</p>
        </div>

        <div>
          <h4 className="fst-italic">Recent posts</h4>
          <ul className="list-unstyled">
          {allPost &&
  allPost
    .slice(0, 3) // This extracts the first three items from the array
    .map((post) => (
      <li key={post.id}>
        <a
          className="d-flex flex-column flex-lg-row gap-3 align-items-start align-items-lg-center py-3 link-body-emphasis text-decoration-none border-top"
          href="#"
        >
          <img className="100%" height="96" src={post.coverImage} alt="" />
          <div className="col-lg-8">
            <h6 className="mb-0">{post.title}</h6>
            <small className="text-body-secondary">{new Date(post.createdAt).toDateString()}</small>
          </div>
        </a>
      </li>
    ))}

            {/* <li>
              <a className="d-flex flex-column flex-lg-row gap-3 align-items-start align-items-lg-center py-3 link-body-emphasis text-decoration-none border-top" href="#">
                <svg className="bd-placeholder-img" width="100%" height="96" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" preserveAspectRatio="xMidYMid slice" focusable="false"><rect width="100%" height="100%" fill="#777"></rect></svg>
                <div className="col-lg-8">
                  <h6 className="mb-0">This is another blog post title</h6>
                  <small className="text-body-secondary">January 14, 2023</small>
                </div>
              </a>
            </li>
            <li>
              <a className="d-flex flex-column flex-lg-row gap-3 align-items-start align-items-lg-center py-3 link-body-emphasis text-decoration-none border-top" href="#">
                <svg className="bd-placeholder-img" width="100%" height="96" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" preserveAspectRatio="xMidYMid slice" focusable="false"><rect width="100%" height="100%" fill="#777"></rect></svg>
                <div className="col-lg-8">
                  <h6 className="mb-0">Longer blog post title: This one has multiple lines!</h6>
                  <small className="text-body-secondary">January 13, 2023</small>
                </div>
              </a>
            </li> */}
          </ul>
        </div>

        <div className="p-4">
          <h4 className="fst-italic">Archives</h4>
          <ol className="list-unstyled mb-0">
            <li><a href="#">October 2023</a></li>
            <li><a href="#">September 2023</a></li>
            <li><a href="#">August 2023</a></li>
            <li><a href="#">July 2023</a></li>
          </ol>
        </div>

        <div className="p-4">
          <h4 className="fst-italic">Elsewhere</h4>
          <ol className="list-unstyled">
            <li><a href="#">GitHub</a></li>
            <li><a href="#">Twitter</a></li>
            <li><a href="#">Facebook</a></li>
          </ol>
        </div>
      </div>
    </div>
      
      </div>
    </>
  );
};

export default Home;
