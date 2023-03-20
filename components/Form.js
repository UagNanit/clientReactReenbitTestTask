import * as React from "react";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import FormHelperText from "@mui/joy/FormHelperText";
import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";
import Box from "@mui/joy/Box";
import { useState } from "react";
import { variables } from "./variables";

export default function InputSubscription() {
  const [data, setData] = useState({
    email: "",
    status: "initial"
  });

  const [file, setFile] = useState();

  const handleFileChange = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!file) {
      setData((current) => ({ ...current, status: "no file" }));
      return;
    }
    setData((current) => ({ ...current, status: "loading" }));

    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("uploadedFile", file);

    await fetch(variables.API_URL_Upload, {
      method: "POST",
      //mode: "no-cors",
      headers: {
        "Content-Type": "multipart/form-data"
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData
    })
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((data) => {
        console.log("Success:", data);
        setData((current) => ({ ...current, status: "sent" }));
      })
      .catch((error) => {
        console.error("Error:", error);
        console.error("Error:", error.mes);
        setData((current) => ({ ...current, status: "failure" }));
      });
  };

  return (
    <form onSubmit={handleSubmit} id="demo">
      <FormControl>
        <FormLabel
          sx={(theme) => ({
            "--FormLabel-color": theme.vars.palette.primary.plainColor
          })}
        >
          Enter user email and add .docx file
        </FormLabel>

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            marginBottom: "1%"
          }}
        >
          <Button
            sx={{ marginRight: "5%" }}
            variant="outlined"
            component="label"
          >
            Upload
            <input
              hidden
              accept=".docx"
              multiple
              type="file"
              onChange={handleFileChange}
            />
          </Button>
          {file?.name}
        </Box>

        <Input
          sx={{ "--Input-decoratorChildHeight": "45px" }}
          placeholder="mail@mui.com"
          type="email"
          required
          value={data.email}
          onChange={(event) =>
            setData({ email: event.target.value, status: "initial" })
          }
          error={data.status === "failure"}
          endDecorator={
            <Button
              variant="solid"
              color="primary"
              loading={data.status === "loading"}
              type="submit"
              sx={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
            >
              Submit
            </Button>
          }
        />

        {data.status === "failure" && (
          <FormHelperText
            sx={(theme) => ({ color: theme.vars.palette.danger[400] })}
          >
            Oops! something went wrong, please try again later.
          </FormHelperText>
        )}

        {data.status === "sent" && (
          <FormHelperText
            sx={(theme) => ({ color: theme.vars.palette.primary[400] })}
          >
            You are all set!
          </FormHelperText>
        )}

        {data.status === "no file" && (
          <FormHelperText
            sx={(theme) => ({ color: theme.vars.palette.danger[400] })}
          >
            Oops! please upload file.
          </FormHelperText>
        )}
      </FormControl>
    </form>
  );
}
