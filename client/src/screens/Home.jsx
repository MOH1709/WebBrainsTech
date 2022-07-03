import { makeStyles } from "@material-ui/core";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

//-----------------------------------------------> custom import 
import { Button, EmployeeCard } from "../components";
import Axios from "../helpers/configAxios"

export default function Home() {
  const styles = useStyles();
  const navigate = useNavigate();

  //states
  const [employees, setEmployees] = useState([]);

  //-----------------------------------------------> on load
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const token = Cookies.get("token");

        const response = await Axios.get("/api/employee", {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        setEmployees(response.data?.employees || []);
      } catch (error) {
        alert("error in getting employes");
      }
    };

    fetchEmployees();
  }, [navigate])


  //-----------------------------------------------> logout
  const handleLogout = async () => {
    try {
      const token = Cookies.get("token");

      await Axios.get("/api/manager/auth/logout", {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      Cookies.remove("token");
      window.location.reload();
    } catch (error) {
      alert("error");
    }
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        Employee's list
      </header>
      <div className={styles.list}>
        {
          employees.map((data) => (
            <EmployeeCard key={data._id} data={data} />
          ))
        }

      </div>

      <div className={styles.btnDiv}>
        <Button
          text="Add Employee"
          onClick={() => { navigate("/emp/add"); }}
        />
        <Button
          text="LOGOUT"
          onClick={handleLogout}
        />

      </div>
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
    height: "100vh",
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
  },
  list: {
    flex: 1,
  },
  btnDiv: {
    display: "flex",
    justifyContent: "space-evenly",
    flexWrap: "wrap",
  }
});