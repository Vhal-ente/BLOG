// import { Component } from "react";
// import "bootstrap/dist/css/bootstrap.css";
// import Container from "react-bootstrap/Container";
// import Row from "react-bootstrap/Row";
// import Col from "react-bootstrap/Col";
// import Button from "react-bootstrap/Button";
// import ListGroup from "react-bootstrap/ListGroup";

// class Dashboard extends Component {
//   constructor(props: unknown) {
//     super(props);

//     // Setting up state
//     this.state = {
//       userInput: "",
//       list: [],
//     };
//   }

//   // Set a user input value
//   updateInput(value: string) {
//     this.setState({
//       userInput: value,
//     });
//   }

//   // Add item if user input is not empty
//   addItem() {
//     if (this.state.userInput !== "") {
//       const userInput = {
//         // Add a random id which is used to delete
//         id: Math.random(),

//         // Add a user value to list
//         value: this.state.userInput,
//       };

//       // Update list
//       const list = [...this.state.list];
//       list.push(userInput);

//       // reset state
//       this.setState({
//         list,
//         userInput: "",
//       });
//     }
//   }

//   // Function to delete an item from the list using id to delete
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   deleteItem(key: any) {
//     const list = [...this.state.list];

//     // Filter values and leave the value which we need to delete
//     const updateList = list.filter((item) => item.id !== key);

//     // Update the list in state
//     this.setState({
//       list: updateList,
//     });
//   }

//   editItem = (index: string | number) => {
//     const editedBlog = prompt("Edit the blog:");
//     if (editedBlog !== null && editedBlog.trim() !== "") {
//       const updatedBlogs = [...this.state.list];
//       updatedBlogs[index].value = editedBlog;
//       this.setState({
//         list: updatedBlogs,
//       });
//     }
//   };

//   render() {
//     return (
//       <Container>
//         <style>{"body{background-color:#f0f2f5} padding: 5px"}</style>
//         <Row>
//           <Col md={{ span: 7, offset: 2 }}>
//             <textarea
//               placeholder="Add item..."
//               rows="20" // Set the initial number of rows
//               value={this.state.userInput}
//               onChange={(event) => this.updateInput(event.target.value)}
//               style={{ width: "100%", resize: "vertical" }}
//             />
//             <Button
//               variant="dark"
//               className="mt-2"
//               onClick={() => this.addItem()}
//             >
//               ADD BLOG
//             </Button>
//           </Col>
//         </Row>
//         <Row>
//           <Col md={{ span: 5, offset: 4 }}>
//             <ListGroup>
//               {this.state.list.map((item, index) => {
//                 return (
//                   <div key={index}>
//                     <ListGroup.Item
//                       variant="dark"
//                       action
//                       style={{
//                         display: "flex",
//                         justifyContent: "space-between",
//                       }}
//                     >
//                       {item.value}
//                       <span style={{ display: "flex" }}>
//                         <Button
//                           style={{ marginRight: "10px" }}
//                           variant="light"
//                           onClick={() => this.deleteItem(item.id)}
//                         >
//                           Delete
//                         </Button>
//                         <Button
//                           variant="light"
//                           onClick={() => this.editItem(index)}
//                         >
//                           Edit
//                         </Button>
//                       </span>
//                     </ListGroup.Item>
//                   </div>
//                 );
//               })}
//             </ListGroup>
//           </Col>
//         </Row>
//       </Container>
//     );
//   }
// };

// export default Dashboard;

// import React, { useState } from "react";
// import BlogCard from "../components/blog/BlogCard";

// interface BlogPost {
// 	title: string;
// 	content: string;
// }

// function Dashboard() {
// 	const [posts, setPosts] = useState<BlogPost[]>([]);
// 	const [title, setTitle] = useState("");
// 	const [content, setContent] = useState("");
// 	const [editIndex, setEditIndex] = useState<number | null>(null);

// 	const addPost = () => {
// 		if (title.trim() !== "" && content.trim() !== "") {
// 			if (editIndex === null) {
// 				setPosts([...posts, { title, content }]);
// 			} else {
// 				const updatedPosts = [...posts];
// 				updatedPosts[editIndex] = { title, content };
// 				setPosts(updatedPosts);
// 				setEditIndex(null);
// 			}
// 			setTitle("");
// 			setContent("");
// 		}
// 	};

// 	const editPost = (index: number) => {
// 		const postToEdit = posts[index];
// 		setTitle(postToEdit.title);
// 		setContent(postToEdit.content);
// 		setEditIndex(index);
// 	};

// 	const deletePost = (index: number) => {
// 		const updatedPosts = [...posts];
// 		updatedPosts.splice(index, 1);
// 		setPosts(updatedPosts);
// 	};

// 	return (
// 		<div className="blog-post-app">
// 			<h1>My Blog Posts</h1>
// 			{/* <div className="blog-form">
// 				<input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
// 				<textarea placeholder="Content" value={content} onChange={(e) => setContent(e.target.value)} />
// 				<button onClick={addPost}>{editIndex === null ? "Add Post" : "Update Post"}</button>
// 			</div>
// 			<ul>
// 				{posts.map((post, index) => (
// 					<li key={index}>
// 						<h2>{post.title}</h2>
// 						<p>{post.content}</p>
// 						<button onClick={() => editPost(index)}>Edit</button>
// 						<button onClick={() => deletePost(index)}>Delete</button>
// 					</li>
// 				))}
// 			</ul> */}
//       <BlogCard/>
// 		</div>
// 	);
// }

// export default Dashboard;

import BlogCard from "../components/blog/BlogCard";
import { useEffect, useState } from "react";
import axios from "axios";
import Post from "../components/dashboard/Post";



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

const Dashboard = () => {
	const [allPost, setPost] = useState<Post[] | any>();

	async function fetchData() {
		try {
			const response = await axios.get("/api/blog/get-user-blogs");
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
		
			<div>
				{allPost && allPost.length > 0? <h3 style={{ margin: "40px 20px" }}>You've Made {allPost.length} published posts</h3>:<h3 style={{ margin: "40px 20px" }}>You haven't made any posts yet</h3>}
				{/* <h3 style={{ margin: "40px 20px" }}>{allPost? `You've Made ${allPost.length} published posts`:"You haven't made any posts yet"} </h3> */}
				{allPost &&
					allPost.map((post:any) => (
						
						<Post
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
		
		</>
	);
};

export default Dashboard;
