import { makeStyles } from "@material-ui/core";
import { useNavigate } from "react-router-dom";

//
import { COLOR, SHADOW } from "../theme";

export default function EmployeeCard({ data }) {
  const styles = useStyles();
  const navigate = useNavigate();

  return (
    <button
      onClick={() => {
        navigate("/emp/details", {
          state: data
        });
      }}
      className={styles.container}
    >
      <p className={styles.text}>
        {data.name}
      </p>
    </button>
  );
}

//------------------------------------------->custom styles
const useStyles = makeStyles({
  container: {
    "& :hover": {
      opacity: 0.3,
    },

    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: 50,
    marginBlock: 10,
    borderRadius: 10,
    border: `2px solid ${COLOR.secondary}`,
    outline: "none",
    backgroundColor: "white",
    boxShadow: SHADOW,
  },
  text: {
    fontSize: 14,
    color: COLOR.secondary,
    fontWeight: "bold"
  }
});