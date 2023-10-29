import { useEffect, useState } from "react";
import { BsPersonCircle, BsShare, BsTrash } from "react-icons/bs";
import { TfiCommentAlt } from "react-icons/tfi";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import styled from "styled-components";
import axios from "axios";
import Swal from "sweetalert2";
import "./sweet";
import { useParams } from "react-router";
import { MyModal } from "./Editblog";

const MainContainer = styled.div`
	display: flex;
	width: 60%;
	flex-wrap: wrap;
	/* flex-direction: column; */
	justify-content: center;
	padding: 10px;
	margin: 0px 200px 0px 200px;
  margin: auto;

	background-image: linear-gradient(135deg, #ffffff 10%, #ffffff 100%);

	@media only screen and (max-width: 786px) {
		background-color: red;
		width: 100%;
		padding: 10px;
		margin: 0;
	}
`;

const ButtonDiv = styled.div`
	display: flex;
	justify-content: space-between;
`;

const Button = styled.button`
	padding: 10px;
	background: inherit;
	border-radius: 5px;
	border: solid;
`;

const FollowBtn = styled.button`
	border: none;
	border-radius: 5px;
	padding: 5px;
	background: #c5c5c5;
`;
const Topic = styled.h1`
	margin: 60px 0px 10px 0px;
	font-size: 2.5rem;
	font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
	margin-bottom: 0px;
	@media only screen and (max-width: 786px) {
		font-size: 2rem;
	}
`;
const Subtopic = styled.h2`
	font-size: 1.5rem;
	margin: auto;
	margin-top: 15px;
	color: gray;
`;
const PostInfo = styled.div`
	display: flex;
	padding-bottom: 10px;
	padding-top: 20px;
	background: inherit;
	margin: auto;
	gap: 15px;
`;
const LargePersonIcon = styled(BsPersonCircle)`
	font-size: 4rem;
	color: gray;
	height: inherit;
`;

const Images = styled.img`
	width: 100%;
	height: 25rem;
`;
const LikeBtn = styled.button`
	background: inherit;
	height: inherit;
	border: none;
  color:#656262c6;
	font-size: 2rem;
`;
const Comment = styled.div`
	display: flex;
	flex-wrap: wrap;
	background: inherit;
	width: 10%;
	border: none;
	font-size: 1.5rem;
	gap: 40px;
	@media only screen and (max-width: 786px) {
		display: flex;
	}
`;

const MyIcons = styled.button`
	display: flex;
	gap: 30px;
	border: none;
	color: #656262c6;
	padding-right: 4px;
	background-color: inherit;
`;

const EditTab = styled.div`
	display: flex;
	justify-content: space-between;
`;
const EditBtn = styled.button`
	padding: 0px 10px;
	background: inherit;
	margin-top: 15px;
	float: right;
	border: none;
	font-size: larger;
`;

const BlogBody = styled.div`
	display: flex;
	flex-direction: column;
	gap: 20px;
  font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
	padding-bottom: 10px;
`;
const Person = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0px;
`;

const Iconic = styled.div`
	display: flex;
	margin: 20px;
	text-decoration: none;
	justify-content: space-between;
	background: inherit;
	/* padding:0px 10px; */
	height: 5%;
`;

/* const BlogDetail = () => {
	const [follow, setFollow] = useState("follow"); */

/* const obj = {
  topic: "Yeah, this is the topic at hand",
  subTopic:"Content",
  img:"https://img.freepik.com/premium-photo/painting-sky-with-clouds-power-line_421632-13707.jpg",
  user:"The software developer",
  createdAt:"Oct 11, 2023",
  blogcategory:"",
  writeUp:"This is the blog detail page.Lorem ipsum dolor sit amet consectinventore atque molestias asperiores otur dolores, voluptate iste Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio, saepe..Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempore, voluptas?"
} */

interface Blog {
	bloglist: {} | any;
	id: string;
	title: string;
	coverImage: string;
	content: string;
	blogcategory: string;
	user: string;
	isActive: boolean;
	createdAt: string;
	msg: string;
}

//	console.log(id);

const BlogDetail = () => {
	const [follow, setFollow] = useState("follow");
	const [details, setDetails] = useState({} as Blog);

	const { id } = useParams();
	const apiUrl = `/api/blog/get-blogs/${id}`;
	const token =
		"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImE1YjdlOWU3LTJlNDktNDAwYy04ZmMzLTFlOWE0NTJjOTdhMiIsImlhdCI6MTY5NzYyMzQzOCwiZXhwIjoxNjk4MDU1NDM4fQ.OBvtV9p5MlXXr0eGfmAiVxIa4OqGBZUgnnBcKF8E6Rk";
	console.log(id);

	useEffect(() => {
		/* axios.get<Blog>("http://localhost:5000/blog/get-blogs/"+ id).then(res => {console.log(res.data.bloglist); setDetails(res.data.bloglist); }).catch(err => console.log(err)) */
		axios({
			method: "get", // or 'post', 'put', etc.
			url: apiUrl,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			// other options like data, etc.
		})
			.then((response) => {
				console.log(response.data);
				setDetails(response.data.bloglist);
			})
			.catch((error) => {
				console.error("Error:", error);
			});
	}, []);
	const timeObject = new Date(details.createdAt);
	const year = timeObject.getFullYear();
	const month = timeObject.getMonth() + 1; // Months are zero-based, so add 1
	const day = timeObject.getDate();
	const formattedDate = `${year}-${month < 10 ? "0" : ""}${month}-${day < 10 ? "0" : ""}${day}`;
	const BlogList: Blog = {
		id: details.id,
		title: details.title,
		coverImage: details.coverImage,
		content: details.content,
		blogcategory: details.blogcategory,
		user: details.user,
		isActive: details.isActive,
		createdAt: formattedDate,
		msg: details.title,
		bloglist: undefined,
	};

	const handleDelete = () => {
		Swal.fire({
			title: "Are you sure?",
			text: "You will not be able to recover this post!",
			icon: "warning",
			showCancelButton: true,
			confirmButtonText: "Yes, delete it!",
			cancelButtonText: "No, cancel!",
			reverseButtons: true,
		}).then((result) => {
			if (result.isConfirmed) {
				axios.delete(`/api/blog/delete/${id}`).catch((err) => console.log(err));

				// For example, call a function or dispatch a delete action
				console.log("Item deleted");
			}
		});
	};

	/* console.log(details) */
	const follows = () => {
		if (follow == "follow") {
			setFollow("following");
		} else setFollow("follow");
	};

	const [like, setLike] = useState(false);
	const Icons = () => {
		if (like) {
			setLike(false);
		} else {
			setLike(true);
		}
	};

	return (
		<>
			<MainContainer>
				<div>
					<EditTab>
						<Topic>{BlogList.title}</Topic>
					</EditTab>

					<Subtopic>{BlogList.blogcategory}</Subtopic>
					<div>
						<PostInfo>
							<LargePersonIcon />
							<Person>
								<p>
									{" "}
									{BlogList.user}  || <FollowBtn onClick={follows}>{follow}</FollowBtn>{" "}
								</p>
								<p>Posted on: {BlogList.createdAt} </p>
							</Person>

						</PostInfo>
						{/* <EditBtn type="submit" onClick={() => {}}>
							<MyModal />
						</EditBtn> */}
					</div>
					<Iconic>
						<div>
							<LikeBtn type="submit" onClick={Icons}>
								{like ? <AiFillHeart color={"red"} /> : <AiOutlineHeart />}
							</LikeBtn>
              
						</div>
					</Iconic>
					<BlogBody>
						<h1>Blog Detail</h1>
						<Images src={BlogList.coverImage} alt="image" />
						<p>{BlogList.content}</p>
					</BlogBody>

					<ButtonDiv>
						{/* <Button onClick={handleDelete}>
							<BsTrash /> Delete post
						</Button> */}
						<MyIcons>
							<TfiCommentAlt size={20} /> <BsShare size={20} />
						</MyIcons>
					</ButtonDiv>
				</div>
			</MainContainer>
		</>
	);
};

export default BlogDetail;
