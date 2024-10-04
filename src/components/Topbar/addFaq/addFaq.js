import React, { useState, useEffect } from "react";
import { ref, get, set } from "firebase/database";
import { database } from "../../../firebaseConfig";
import { TextField, Button, Container, Box } from "@mui/material";

const AddFaq = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [id, setId] = useState(0);

  useEffect(() => {
    // بازیابی لیست FAQها و پیدا کردن آخرین ID
    const fetchLastId = async () => {
      const faqRef = ref(database, "faqs");
      const snapshot = await get(faqRef);
      if (snapshot.exists()) {
        const faqs = snapshot.val();
        const ids = Object.keys(faqs).map((key) => parseInt(key, 10));
        const maxId = Math.max(...ids);
        setId(maxId + 1);
      } else {
        setId(0);
      }
    };

    fetchLastId();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const faqRef = ref(database, `faqs/${id}`);
    await set(faqRef, { id, question, answer });

    setQuestion("");
    setAnswer("");
    setId(id + 1); // افزایش ID برای سوال بعدی
  };

  return (
    <div className="container">
      <Container maxWidth="sm">
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <TextField
            label="ID"
            value={id}
            InputProps={{
              readOnly: true,
            }}
            fullWidth
            margin="normal"
          />
          <TextField
            label="سوال"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="جواب"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            fullWidth
            margin="normal"
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
          >
            اضافه کردن{" "}
          </Button>{" "}
        </Box>{" "}
      </Container>
    </div>
  );
};

export default AddFaq;
