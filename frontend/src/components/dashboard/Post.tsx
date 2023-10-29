import styled from "styled-components";
import { RxAvatar } from "react-icons/rx";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { BsTrash } from "react-icons/bs";
import { MyModal } from "../userBlogPage/Editblog"

// Styled components for the blog card
const CardContainer = styled.div`
	border: 1px solid #e1e1e1;
	border-radius: 8px;
	box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
	overflow: hidden;
	margin: 16px;
	/* max-width: 300px; */
	max-width: 60%;
	background-color: #fff;
	display: flex;
	flex-direction: row-reverse;

	@media only screen and (max-width: 768px) {
		max-width: 100%;
		margin: 16px 10px;
	}
`;

const CardImage = styled.img`
	width: 30%;
	height: 200px;
	object-fit: cover;
`;

const CardContent = styled.div`
	padding: 16px;
	width: 70%;
	display: flex;
	flex-direction: column;
	gap: 10px;
`;

const CardTitle = styled.h2`
	font-size: 20px;
	margin: 0;
	cursor: pointer;
`;

const CardAuthor = styled.p`
	font-size: 14px;
	color: #666;
`;

const CardExcerpt = styled.p`
	font-size: 16px;
	margin-top: 8px;
	cursor: pointer;
`;

const CardFooter = styled.div`
	display: flex;
	justify-content: start;
	margin-top: 16px;
	gap: 10px;
`;

const CardCategory = styled.span`
	font-size: 14px;
	color: #666;

	@media only screen and (max-width: 768px) {
		font-size: 12px;
	}
`;

const CardDateTime = styled.span`
	font-size: 14px;
	color: #666;

	@media only screen and (max-width: 768px) {
		font-size: 12px;
	}
`;

interface Props {
	title: string;
	author: string;
	excerpt: string;
	imageSrc: string;
	category: string;
	date: string;
	time: string;
	postId: string;
}

const Post = ({ title, author, excerpt, imageSrc, category, date, time, postId }: Props) => {
	const { id } = useParams()
	console.log(postId)
	

	return (
		<CardContainer>
			<CardImage src={imageSrc} alt={title} />
			<CardContent>
				<CardAuthor>
					<RxAvatar /> {author}
				</CardAuthor>
				<CardTitle>
					<Link to={`/post-detail/${postId}`} style={{ textDecoration: "none", color: "black" }}>
						{title}
					</Link>
				</CardTitle>
				<CardExcerpt>{excerpt}...</CardExcerpt>
				<CardFooter>
					<CardDateTime>
						{date} | {time}
					</CardDateTime>
					<CardCategory>{category}</CardCategory>
				</CardFooter>
				{/* <div style={{ display: "flex", gap: "10px" }}>
					<button className="btn btn-primary">Edit</button>
					<button  className="btn btn-secondary"><BsTrash /></button>
				</div> */}
			</CardContent>
		</CardContainer>
	);
};

export default Post;
