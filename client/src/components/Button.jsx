import { makeStyles } from "@material-ui/core";
import { COLOR } from "../theme";

export default function Button(props) {
  const styles = useStyles();

  return (
    <button  {...props} className={styles.container}>
      {props?.text}
    </button>
  );
}

//------------------------------------------->custom styles
const useStyles = makeStyles({
  container: {
    "&:hover": {
      opacity: 0.8
    },

    width: 200,
    height: 50,
    borderRadius: 50,
    fontSize: 15,
    margin: 10,
    border: "none",
    color: "white",
    backgroundColor: COLOR.secondary,
  },
});