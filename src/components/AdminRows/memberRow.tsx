"use client";
import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import ClearIcon from "@mui/icons-material/Clear";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

async function deleteMember(memberName) {
  try {
    const res = await fetch("http://127.0.0.1:8000/members/delete/" + memberName, {
      method: "DELETE",
    });

    if (!res.ok) {
      throw Error("Failed to delete member");
    }
  } catch (error) {
    console.error(error.message);
    // Handle the error as needed, e.g., show a notification to the user
  }
}

async function editMember(name, formData) {
  console.log(formData)
  try {
    const res = await fetch("http://127.0.0.1:8000/members/update/" + name, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!res.ok) {
      throw Error("Failed to edit member");
    }
  } catch (error) {
    console.error(error.message);
    // Handle the error as needed, e.g., show a notification to the user
  }
}

const style = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "16px",
  width: "100%",
  height: "80px", // Set a fixed height for each row
  backgroundColor: "#f5f5f5", // Light gray background color
};

const formStyle = {
  padding: "16px",
  backgroundColor: "#ffffff", // White background color
  width: "100%",
};

interface IMemberRowProps {
  name: string;
  role: string;
  major: string;
  image: string;
}

const MemberRow: React.FC<IMemberRowProps> = ({ name, role, major, image }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({
    name: name,
    role: role,
    major: major,
    image: image,
  });

  const handleDelete = async () => {
    await deleteMember(name);
  };

  const handleEdit = () => {
    setEditedData({ name, role, major, image });
    setIsEditing(!isEditing);
  };

  const handleSubmitEdit = async (e: any) => {
    e.preventDefault();

    editMember(name, editedData);
  };

  const handleChange = (field) => (e) => {
    setEditedData({ ...editedData, [field]: e.target.value });
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Stack direction={{ xs: "column", md: "row" }}>
        <ListItem sx={style}>
          <ListItemText primary={name} secondary={`Role: ${role}`} />
          <div style={{ display: "flex", alignItems: "center" }}>
            {/* <IconButton onClick={handleEdit}>
              <EditIcon />
            </IconButton> */}

            <IconButton onClick={handleDelete}>
              <ClearIcon />
            </IconButton>
          </div>
        </ListItem>
        <Divider />

        {isEditing && (
          <form onSubmit={handleSubmitEdit} sx={formStyle}>
            {/* Add form fields for editing */}
            <TextField
              label="Edit Role"
              fullWidth
              margin="normal"
              value={editedData.role}
              onChange={handleChange("role")}
            />
            <TextField
              label="Edit Major"
              fullWidth
              margin="normal"
              value={editedData.major}
              onChange={handleChange("major")}
            />
            <TextField
              label="Edit Image"
              fullWidth
              margin="normal"
              value={editedData.image}
              onChange={handleChange("image")}
            />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              style={{ marginTop: "16px" }}
            >
              Save Changes
            </Button>
          </form>
        )}
      </Stack>
    </Box>
  );
};

export default MemberRow;
