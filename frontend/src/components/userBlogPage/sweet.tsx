import Swal from "sweetalert2";
import axios from "axios";
// import { useState } from 'react';

export const handleDelete = () => {
  Swal.fire({
    title: "Are you sure?",
    text: "You will not be able to recover this post!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, delete it!",
    cancelButtonText: "No, cancel!",
    reverseButtons: true,
  }).then((result) => {
    // const [users,setUsers] = useState({})
    if (result.isConfirmed) {
      axios.delete("/blog/delete/").catch((err) => console.log(err));

      // For example, call a function or dispatch a delete action
      console.log("Item deleted");
    }
  });
};
