import { useNavigate } from "react-router-dom";
import { FormEvent } from "react";
import axios from "axios";
import styled from "styled-components";
import React, { useState } from "react";
import { toast } from "react-toastify";

function Login() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [username, setUsername] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    // const formData = new FormData();
    // formData.append("title", title);
    // formData.append("blogcategory", category);
    // formData.append("content", content);
    // formData.append("coverImage", image);
   const payload = {
      title,
      blogcategory: category,
      user:username,
      content,
      coverImage: image,
      isActive: true,
    };
  //   const formData = new FormData();
  //   for (const key in payload) {
  //     formData.append(key, payload[key]);
  //  }
    try {
      const response = await axios.post("/api/blog/create", payload,{
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.status === 201 || response.status === 200) {
        toast.success("Blog Created Successfully");
        navigate("/");
      }
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <WriteBlog>
      <RegisterForm>
        <Title className="mt-5">Write Blog</Title>
        <InputField
          type="text"
          placeholder="Username"
          name="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <InputField
          type="text"
          placeholder="Title"
          value={title}
          name="title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <InputField
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <InputField
          type="text"
          placeholder="image url"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        <textarea
          className="textarea px-3 py-3"
          placeholder="write your content here"
          value={content}
          cols={7}
          onChange={(e) => setContent(e.target.value)}
        />
        <RegisterButton type="submit" onClick={handleSubmit}>
          Submit
        </RegisterButton>
      </RegisterForm>
    </WriteBlog>
  );
}

const WriteBlog = styled.div`
  /* background: #f4f4f4; */
  width: 100%;
  display: flex;
  justify-content: center;

  textarea {
    width: 100%;
    min-height: 200px;
  }
`;

const RegisterForm = styled.form`
  border-radius: 10px;
  min-width: 50%;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 20px;
  color: #333;
`;

const InputField = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const RegisterButton = styled.button`
  background: #007bff;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

export default Login;
