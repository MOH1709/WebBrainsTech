import { useState } from "react";
import { makeStyles } from "@material-ui/core";
import { RiProfileFill } from "react-icons/ri";

//-----------------------------------------------> custom imports
import { COLOR } from "../theme";

export default function InputBox(props) {
  const styles = useStyles();
  const { Icon, title, isError, style, ...rest } = props;

  // states
  const [isFocus, setIsFocus] = useState(false);



  return (
    <div
      className={styles.container}
      style={{
        ...style || {},
        backgroundColor: isFocus ? COLOR.primary : COLOR.bgSecondary,
        border: isError ? "2px solid red" :
          isFocus ? `2px solid ${COLOR.secondary}` : "none"
      }}
    >

      <div className={styles.left}>
        <p
          className={styles.title}
          style={{
            color: isFocus ? COLOR.secondary : COLOR.text
          }}
        >{title}</p>
        <input
          {...rest}
          className={styles.input}
          onFocus={() => { setIsFocus(true) }}
          onBlur={() => { setIsFocus(false) }}
        />
      </div>

      <div className={styles.icon}>
        {Icon || <RiProfileFill size={23} />}
      </div>
    </div>
  );
}

//------------------------------------------->custom styles
const useStyles = makeStyles({
  container: {
    display: "flex",
    alignItems: "center",
    flex: 1,
    height: 50,
    paddingBlock: 5,
    paddingInline: 20,
    margin: 10,
    borderRadius: 10,
  },
  left: {
    flex: 1,
  },
  title: {
    fontSize: 12,
    margin: 0,
  },
  input: {
    width: "100%",
    height: 20,
    paddingRight: 10,
    fontSize: 13,
    border: "none",
    outline: "none",
    overflow: "hidden",
    caretColor: COLOR.secondary,
    backgroundColor: "transparent",
  },
  icon: {
    width: 23,
    height: 23,
    borderRadius: "50%",
    overflow: "hidden",
    color: COLOR.text,
  }
});