// import  { useState } from "react";
// import { Button, Modal } from "react-bootstrap";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { FaRegEdit } from "react-icons/fa";

// export const MyModal = () => {
//   const [show, setShow] = useState(false);
//   const [title, setTitle] = useState("");
//   const [imageUrl, setImageUrl] = useState("");
//   const [content, setContent] = useState("");

//   const handleClose = () => setShow(false);
//   const handleShow = () => setShow(true);

//   const handleTitleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
//     setTitle(event.target.value);
//   };

//   const handleImageUrlChange = (
//     event: React.ChangeEvent<HTMLTextAreaElement>
//   ) => {
//     setImageUrl(event.target.value);
//   };

//   const handleContentChange = (
//     event: React.ChangeEvent<HTMLTextAreaElement>
//   ) => {
//     setContent(event.target.value);
//   };

//   const handleSaveChanges = () => {
//     handleClose();
//   };

//   return (
//     <>
//       <Button variant="" onClick={handleShow}>
//         <FaRegEdit /> Edit
//       </Button>

//       <Modal show={show} onHide={handleClose} centered>
//         <Modal.Header closeButton >
//           <Modal.Title>Edit Content</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <div className="form-group">
//             <label htmlFor="title">Title:</label>
//             <textarea
//               className="form-control"
//               id="title"
//               placeholder="Enter blog post title here"
//               style={{ width: "100%" }}
//               rows={2}
//               value={title}
//               onChange={handleTitleChange}></textarea>
//           </div>
//           <div className="form-group">
//             <label htmlFor="image-url">Image URL:</label>
//             <textarea
//               className="form-control"
//               id="image-url"
//               placeholder="Enter image URL here"
//               style={{ width: "100%" }}
//               rows={1}
//               value={imageUrl}
//               onChange={handleImageUrlChange}></textarea>
//           </div>
//           <div className="form-group">
//             <label htmlFor="content">Content:</label>
//             <textarea
//               className="form-control"
//               id="content"
//               placeholder="Enter blog post content here"
//               style={{ width: "100%" }}
//               rows={10}
//               value={content}
//               onChange={handleContentChange}></textarea>
//           </div>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleClose}>
//             Close
//           </Button>
//           <Button variant="primary" onClick={handleSaveChanges}>
//             Save Changes
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </>
//   );
// };
// // export default MyModal;
import { useState } from "react";
import axios from "axios";
import { Button, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaRegEdit } from "react-icons/fa";
import { useParams } from "react-router-dom";
//import { useNavigate } from "react-router-dom";

export const MyModal = () => {
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [content, setContent] = useState("");
  const { id } = useParams<{ id: string }>();
   //const navigate = useNavigate();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleTitleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTitle(event.target.value);
  };

  const handleImageUrlChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setImageUrl(event.target.value);
  };

  const handleContentChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setContent(event.target.value);
  };

  const handleSaveChanges = () => {
    // Create a payload with the data you want to save
    const data = {
      title: title,
    coverImage: imageUrl,
      content: content,
    };

    // Make a POST request to your backend API to save the data
    axios
      .patch(`/api/blog/update/${id}`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        if (response.status === 200) {
          console.log("Data saved successfully");
          // navigate("/d");
          // Data saved successfully, you can add further actions if needed
          handleClose();
        } else {
          // Handle errors, for example, show an error message to the user
          console.error("Failed to save data");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <>
      <Button variant="" onClick={handleShow}>
        <FaRegEdit /> Edit Post
      </Button>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Content</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {" "}
          {/* Make the modal wider */}
          <div className="form-group">
            <label htmlFor="title">Title:</label>
            <textarea
              className="form-control"
              id="title"
              placeholder="Enter blog post title here"
              rows={2}
              value={title}
              onChange={handleTitleChange}
              style={{ width: "100%" }} // Make the textarea wider
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="image-url">Image URL:</label>
            <textarea
              className="form-control"
              id="image-url"
              placeholder="Enter image URL here"
              rows={1}
              value={imageUrl}
              onChange={handleImageUrlChange}
              style={{ width: "100%" }} // Make the textarea wider
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="content">Content:</label>
            <textarea
              className="form-control"
              id="content"
              placeholder="Enter blog post content here"
              rows={10}
              value={content}
              onChange={handleContentChange}
              style={{ width: "100%" }} // Make the textarea wider
            ></textarea>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveChanges}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

