import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { makeStyles } from "@material-ui/core";
import { MdMail, MdMapsHomeWork } from "react-icons/md";
import { FaMoneyCheck, FaMoneyCheckAlt, FaPhoneAlt } from "react-icons/fa";
import { AiFillClockCircle } from "react-icons/ai";
import Cookies from "js-cookie";

//-----------------------------------------------> custom imports
import { Button, InputBox } from "../components";
import Axios from "../helpers/configAxios";
import { SHADOW } from "../theme";

export default function EmployeeDetail() {
  const styles = useStyles();
  const navigate = useNavigate();
  const { state } = useLocation();
  const [fname, lname] = state?.name?.split(" ") || [];

  // states
  const [input, setInput] = useState({
    fname: fname || "",
    lname: lname || "",
    email: state?.email || "",
    phoneNumber: state?.phoneNumber || undefined,
    workHours: state?.workHours || undefined,
    salaryType: state?.salaryType || "",
    salary: state?.salary || undefined,
    department: state?.department || "",
  });

  //-----------------------------------------------> 

  //-----------------------------------------------> on change
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
        method: "put",
        url: "/api/employee",
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
      if (error.message.split(" ").pop() === "409") {
        alert("Email already exist");
      } else {
        alert("please check your internet connection or try again later")
      }
    }
  }

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>
        Employee
      </h3>

      <form className={styles.form} onSubmit={handleSubmit}>
        <InputBox
          title={"First name*"}
          value={input.fname}
          name="fname"
          required={true}
          onChange={handleChange}
        />
        <InputBox
          title={"Last name*"}
          value={input.lname}
          name="lname"
          required={true}
          onChange={handleChange}
        />
        <InputBox
          title={"Email*"}
          value={input.email}
          name="email"
          required={true}
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
          required={true}
          onChange={handleChange}
          Icon={<MdMapsHomeWork size={23} />}
        />


        <div style={{ display: "flex", justifyContent: "flex-end" }} >

          <Button
            text={"Update"}
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