import logo from "../../assets/img/frogbyteenfeite.png";
import "../css/frogbyte.css";

export const Frogbyte = () => {
  return (
    <div className="frogbyte">
      <img
        src={logo}
        alt="Mascote Frogbyte"
        className="frogbyte-image"
      />
    </div>
  );
};

export default Frogbyte;