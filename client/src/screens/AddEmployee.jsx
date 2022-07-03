import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { makeStyles } from "@material-ui/core";
import { MdMail, MdMapsHomeWork } from "react-icons/md";
import { FaMoneyCheck, FaMoneyCheckAlt, FaPhoneAlt } from "react-icons/fa";
import { AiFillClockCircle } from "react-icons/ai";
import Cookies from "js-cookie";

//-----------------------------------------------> custom imports
import { Button, InputBox } from "../components";
import Axios from "../helpers/configAxios";
import { SHADOW } from "../theme";

export default function AddEmpolyee() {
  const styles = useStyles();
  const navigate = useNavigate();

  // states
  const [input, setInput] = useState({
    fname: "",
    lname: "",
    email: "",
    phoneNumber: undefined,
    workHours: undefined,
    salaryType: "",
    salary: undefined,
    department: "",
  });

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
      const {
        email,
        phoneNumber,
        workHours,
        salaryType,
        salary,
        department,
      } = input;
      const token = Cookies.get("token");

      await Axios({
        method: "post",
        url: "/api/employee/add",
        headers: {
          'Authorization': `Bearer ${token}`
        },
        data: {
          name: `${input.fname} ${input.lname}`,
          email,
          phoneNumber,
          workHours,
          salaryType,
          salary,
          department,
        }
      });

      navigate("/");
    } catch (error) {
      alert("please check your internet connection or try again later")
    }
  }

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>
        Add Employee
      </h3>

      <form className={styles.form} onSubmit={handleSubmit}>
        <InputBox
          title={"First name*"}
          value={input.fname}
          name="fname"
          onChange={handleChange}
        />
        <InputBox
          title={"Last name*"}
          value={input.lname}
          name="lname"
          onChange={handleChange}
        />
        <InputBox
          title={"Email*"}
          value={input.email}
          name="email"
          onChange={handleChange}
          Icon={<MdMail size={23} />}
        />
        <InputBox
          title={"Phone Number"}
          type={"number"}
          value={input.phoneNumber}
          name="phoneNumber"
          onChange={handleChange}
          Icon={<FaPhoneAlt size={23} />}
        />
        <InputBox
          title={"Work Hours"}
          type="number"
          value={input.workHours}
          name="workHours"
          onChange={handleChange}
          Icon={<AiFillClockCircle size={23} />}
        />
        <InputBox
          title={"Salary Type"}
          value={input.salaryType}
          name="salaryType"
          onChange={handleChange}
          Icon={<FaMoneyCheckAlt size={23} />}
        />
        <InputBox
          title={"Salary"}
          type="number"
          value={input.salary}
          name="salary"
          onChange={handleChange}
          Icon={<FaMoneyCheck size={23} />}
        />
        <InputBox
          title={"Department*"}
          value={input.department}
          name="department"
          onChange={handleChange}
          Icon={<MdMapsHomeWork size={23} />}
        />


        <div style={{ display: "flex", justifyContent: "flex-end" }} >

          <Button
            text={"Add"}
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
});