import React, { useEffect, useState, useContext } from "react";
import { database } from "../../firebaseConfig";
import { ref, set } from "firebase/database";
import UsersContext from "../../contexts/UsersContexts";
import ErrorModal from "../../components/Topbar/errorModal/ErrorModal";
import { Spinner } from "react-bootstrap";
import { TextField, Button, Container, Typography, Box } from "@mui/material";

const AddUser = () => {
  const [userCode, setUserCode] = useState("");
  const [userName, setUserName] = useState("");
  const [userMail, setUserMail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const {
    users: Users,
    fetchUsers,
    isLoading: loading,
    isError: error,
  } = useContext(UsersContext);

  useEffect(() => {
    if (Users && Users.length > 0) {
      const lastUser = Users[Users.length - 1].code;
      setUserCode(lastUser + 1);
    } else {
      setUserCode(1);
    }
  }, [Users]);

  useEffect(() => {
    setIsLoading(isLoading);
    setIsError(isError);
  }, [isLoading, isError]);

  function validationCheck(name, mail, password) {
    const nameRegex = /^[^\d]{3,}$/;
    const mailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[!؟]).{8,}$/;

    if (!nameRegex.test(name)) {
      setMessage("نام کاربر باید حداقل ۳ کاراکتر داشته باشد و شامل عدد نباشد.");
      return false;
    }
    if (!mailRegex.test(mail)) {
      setMessage("ایمیل وارد شده معتبر نیست.");
      return false;
    }
    if (!passwordRegex.test(password)) {
      setMessage(
        "رمز عبور باید حداقل ۸ کاراکتر داشته باشد و شامل حداقل یکی از علامتهای ! یا ؟ باشد."
      );
      return false;
    }
    return true;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValid = validationCheck(userName, userMail, userPassword);

    if (isValid){
      const newUser = {
        code: userCode,
        name: userName,
        mail: userMail,
        password: userPassword,
        status: "Not Active",
        transition: "",
      };
  
      setIsLoading(true);
  
      const addUserPromise = set(ref(database, "users/" + userCode), newUser);
  
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(
          () => reject(new Error("دسترسی خود به اینترنت را چک کنید")),
          5000
        )
      );
  
      try {
        await Promise.race([addUserPromise, timeoutPromise]);
        setMessage("کاربر با موفقیت اضافه شد!");
        setUserCode((prev) => Number(prev) + 1);
        setUserName("");
        setUserMail("");
        setUserPassword("");
        fetchUsers();
      } catch (error) {
        setIsError(true);
        setMessage(error.message);
      } finally {
        setIsLoading(false);
      }

    }

    
  };

  return (
    <div className="container">
      <Container maxWidth="sm" style={{ flex: 4 }}>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            mt: 5,
            p: 3,
            borderRadius: 2,
            boxShadow: 3,
            bgcolor: "background.paper",
          }}
        >
          <Typography variant="h5" component="h2" gutterBottom>
            Add New User
          </Typography>
          <TextField label="User Code" value={userCode} disabled fullWidth />
          <TextField
            label="User Name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
            fullWidth
          />
          <TextField
            label="User Mail"
            type="email"
            value={userMail}
            onChange={(e) => setUserMail(e.target.value)}
            required
            fullWidth
          />
          <TextField
            label="User Password"
            type="password"
            value={userPassword}
            onChange={(e) => setUserPassword(e.target.value)}
            required
            fullWidth
          />
          <Button variant="contained" color="primary" type="submit">
            Add User
          </Button>
        </Box>
        {isLoading && <Spinner />}
        {message && (
          <ErrorModal
            message={message}
            onClose={() => {
              setMessage(null);
            }}
          />
        )}
      </Container>
    </div>
  );
};

export default AddUser;
