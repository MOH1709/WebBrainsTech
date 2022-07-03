import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { makeStyles } from "@material-ui/core";
import { MdMail } from "react-icons/md";
import { RiEyeCloseFill, RiEyeFill } from "react-icons/ri";
import Cookies from "js-cookie";

//-----------------------------------------------> custom imports
import { Button, InputBox } from "../components";
import Axios from "../helpers/configAxios";
import { COLOR, SHADOW } from "../theme";

export default function Signup() {
  const styles = useStyles();
  const navigate = useNavigate();

  // states
  const [input, setInput] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
  });
  const [showPass, setShowPass] = useState(false);

  //-----------------------------------------------> on chane
  const handleChange = (e) => {
    const { name, value } = e.target;

    setInput({
      ...input,
      [name]: value,
    });
  }

  //-----------------------------------------------> submit
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const response = await Axios.post("/api/manager/auth/register", {
        name: `${input.fname} ${input.lname}`,
        email: input.email,
        password: input.password,
      });
      const { token } = response.data || {};

      if (token) {
        Cookies.set("token", token);
        navigate("/");
      }

    } catch (error) {
      alert("please check your internet connection or try again later")
    }
  }

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>
        Create new account
      </h3>

      <div className={styles.linkDiv}>
        <p>Already A Member?</p>
        <p
          style={{ color: COLOR.secondary, cursor: "pointer" }}
          onClick={() => {
            navigate("/login");
          }}
        >
          Log In
        </p>
      </div>

      <form className={styles.form} onSubmit={handleSubmit}>
        <InputBox
          title={"First name"}
          value={input.fname}
          name="fname"
          onChange={handleChange}
        />
        <InputBox
          title={"Last name"}
          value={input.lname}
          name="lname"
          onChange={handleChange}
        />
        <InputBox
          title={"Email"}
          value={input.email}
          name="email"
          onChange={handleChange}
          Icon={<MdMail size={23} />}
        />
        <InputBox
          type={showPass ? "text" : "password"}
          title={"Password"}
          value={input.password}
          name="password"
          onChange={handleChange}
          Icon={
            showPass ?
              <RiEyeFill
                size={23}
                onClick={() => { setShowPass(false) }}
              /> :
              <RiEyeCloseFill
                size={23}
                onClick={() => { setShowPass(true) }}
              />
          }
        />

        <div style={{ display: "flex", justifyContent: "flex-end" }} >

          <Button
            text={"Create Account"}
            type="submit"
          />
        </div>
      </form>
    </div>
  );
}

//------------------------------------------->custom styles
const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    maxWidth: 500,
    padding: 20,
    marginInline: "auto",
    borderRadius: 20,
    boxShadow: SHADOW,
  },
  title: {
    fontSize: 25,
    margin: 10,
  },
  linkDiv: {
    "& p": {
      marginRight: 10,
    },
    display: "flex",
    margin: 10,
  },
  form: {

  }
});