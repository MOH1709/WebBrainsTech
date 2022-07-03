import { makeStyles } from "@material-ui/core";

//----------------------------------------> custom imports
import Router from "./Router";
import { COLOR } from "./theme";

export default function App() {
  const styles = useStyles();

  return (
    <div className={styles.container}>
      <Router />
    </div>
  );
}

//-------------------------------------------> custom styles
const useStyles = makeStyles({
  container: {
    width: "100%",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    backgroundColor: COLOR.primary,
  },
});