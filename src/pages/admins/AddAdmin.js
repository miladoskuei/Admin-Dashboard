import React, { useState, useContext } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Modal,
  Box,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { ref, set, get, child } from "firebase/database";
import { database } from "../../firebaseConfig";
import AdminsContext from "../../contexts/Admins";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function AddAdmin() {
  const { admins } = useContext(AdminsContext);
  console.log("my admins ", admins);

  const [adminData, setAdminData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    phoneNumber: "",
    accessRights: {
      viewEditUsers: false,
      viewEditProducts: false,
      viewEditInvoices: false,
      viewEditAdminSettings: false,
    },
  });

  const [open, setOpen] = useState(false);
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [error, setError] = useState("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleErrorModalOpen = () => setErrorModalOpen(true);
  const handleErrorModalClose = () => setErrorModalOpen(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setAdminData({
        ...adminData,
        accessRights: {
          ...adminData.accessRights,
          [name]: checked,
        },
      });
    } else {
      setAdminData({
        ...adminData,
        [name]: value,
      });
    }
  };

  const validateForm = () => {
    const {
      firstName,
      lastName,
      username,
      password,
      phoneNumber,
      accessRights,
    } = adminData;
    if (!firstName || !lastName || !username || !password || !phoneNumber) {
      setError("Please fill in all fields.");
      handleErrorModalOpen();
      return false;
    }
    if (!Object.values(accessRights).some((value) => value)) {
      setError("Please select at least one access level.");
      handleErrorModalOpen();
      return false;
    }
    setError("");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    const dbRef = ref(database);
    const snapshot = await get(child(dbRef, `admins/${adminData.username}`));
    if (snapshot.exists()) {
      setError("This username already exists.");
      handleErrorModalOpen();
      return;
    }

    const adminRef = ref(database, `admins/${adminData.username}`);
    set(adminRef, { ...adminData, isLoggedIn: false })
      .then(() => {
        alert("Admin added successfully!");
        setAdminData({
          firstName: "",
          lastName: "",
          username: "",
          password: "",
          phoneNumber: "",
          accessRights: {
            viewEditUsers: false,
            viewEditProducts: false,
            viewEditInvoices: false,
            viewEditAdminSettings: false,
          },
        });
      })
      .catch((error) => {
        alert("Error adding admin: " + error.message);
      });
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" gutterBottom>
        Add Admin
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="First Name"
          name="firstName"
          value={adminData.firstName}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Last Name"
          name="lastName"
          value={adminData.lastName}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Username"
          name="username"
          value={adminData.username}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          value={adminData.password}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Phone Number"
          name="phoneNumber"
          value={adminData.phoneNumber}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <Button
          style={{ marginTop: "1rem", marginBottom: "1rem" }}
          variant="outlined"
          color="primary"
          onClick={handleOpen}
          fullWidth
        >
          Set Access Levels
        </Button>
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Submit
        </Button>
      </form>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Set Access Levels
          </Typography>
          <FormControlLabel
            control={
              <Checkbox
                name="viewEditUsers"
                checked={adminData.accessRights.viewEditUsers}
                onChange={handleChange}
              />
            }
            label="View and Edit Users"
          />
          <FormControlLabel
            control={
              <Checkbox
                name="viewEditProducts"
                checked={adminData.accessRights.viewEditProducts}
                onChange={handleChange}
              />
            }
            label="View and Edit Products"
          />
          <FormControlLabel
            control={
              <Checkbox
                name="viewEditInvoices"
                checked={adminData.accessRights.viewEditInvoices}
                onChange={handleChange}
              />
            }
            label="View and Edit Invoices"
          />
          <FormControlLabel
            control={
              <Checkbox
                name="viewEditAdminSettings"
                checked={adminData.accessRights.viewEditAdminSettings}
                onChange={handleChange}
              />
            }
            label="View and Edit Admin Settings"
          />
          <Button
            onClick={handleClose}
            variant="contained"
            color="primary"
            fullWidth
          >
            Confirm
          </Button>
        </Box>
      </Modal>
      <Modal
        open={errorModalOpen}
        onClose={handleErrorModalClose}
        aria-labelledby="error-modal-title"
        aria-describedby="error-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="error-modal-title"
            variant="h6"
            component="h2"
            color="error"
          >
            Error
          </Typography>
          <Typography id="error-modal-description">{error}</Typography>
          <Button
            onClick={handleErrorModalClose}
            variant="contained"
            color="primary"
            fullWidth
          >
            Confirm
          </Button>
        </Box>
      </Modal>
    </Container>
  );
}
