import clsx from "clsx";
import { useState } from "react";
import { FaCalendar, FaPhoneAlt, FaUser } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { deleteContact } from "../../redux/contactsOps";
import { isApproved } from "../../utils/confirm";
import Button from "../Button/Button";
import css from "./Contact.module.css";
import { getFormatedDate } from "./utils";

const Contact = ({ contact }) => {
  const dispatch = useDispatch();
  const [active, setActive] = useState(false);
  const { id, name, number, createdAt } = contact;

  const handleDeleteClick = () => {
    if (isApproved()) {
      dispatch(deleteContact(id));
    }
  };

  const handleClick = () => {
    setActive((prevState) => !prevState);
  };

  const classNames = clsx(css.contact, active && css.active);

  return (
    <div className={classNames} onClick={handleClick}>
      <div className={css.content}>
        <div className={clsx(css.row, css.name)}>
          <FaUser />
          <span>{name}</span>
        </div>
        <div className={clsx(css.row, css.number)}>
          <FaPhoneAlt />
          <span>{number}</span>
        </div>
        <div className={clsx(css.row, css.dateRow)}>
          <FaCalendar />
          <span>{getFormatedDate(createdAt)}</span>
        </div>
      </div>
      <div className={css.actions}>
        <Button onClick={handleDeleteClick}>Delete</Button>
      </div>
    </div>
  );
};

export default Contact;
