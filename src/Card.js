import "./Card.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faPhone,
  faEnvelope,
  faCalendar,
  faPencil,
} from "@fortawesome/free-solid-svg-icons";

const ICONS = {
  user: faUser,
  phone: faPhone,
  envelope: faEnvelope,
  calendar: faCalendar,
  pencil: faPencil,
};

function Card({ icon, name, content }) {
  return (
    <div>
      <div className="Card">
        <FontAwesomeIcon className="Icon" icon={ICONS[icon]} />
        <div className="Card-Content">
          <h3>{name}</h3>
          <div>{content}</div>
        </div>
      </div>
    </div>
  );
}

export default Card;
