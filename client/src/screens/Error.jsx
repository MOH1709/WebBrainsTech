import { makeStyles } from "@material-ui/core";
import { useNavigate } from "react-router-dom";

//-----------------------------------------------> custom imports
import { Button } from "../components";

export default function Error() {
  const styles = useStyles();
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <h1>404 Page Not found</h1>
      <Button text={"Go Back Home"} onClick={() => {
        navigate("/");
      }} />
    </div>
  );
}

//------------------------------------------->custom styles
const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
});