import "./Notification.scss";

const notificationList = [
  {
    icon: "",
    title:
      "At rutrum mollis cursus curabitur con dimentum ullamcorper pharetra sed, etiam penatibus auctor",
    time: "Today at 1:30pm",
  },
  {
    icon: "",
    title:
      "At rutrum mollis cursus curabitur con dimentum ullamcorper pharetra sed, etiam penatibus auctor",
    time: "Today at 1:30pm",
  },
  {
    icon: "",
    title:
      "At rutrum mollis cursus curabitur con dimentum ullamcorper pharetra sed, etiam penatibus auctor",
    time: "Today at 1:30pm",
  },
  {
    icon: "",
    title:
      "At rutrum mollis cursus curabitur con dimentum ullamcorper pharetra sed, etiam penatibus auctor",
    time: "Today at 1:30pm",
  },
];

const Notification = ({ className }: any) => {
  return (
    <ul className={`notification ${className}`}>
      {notificationList.map((data, index) => {
        return (
          <li key={index} className="notification__item">
            {/* <div className="notification__icon">
              <img src={data.icon} />
            </div> */}
            <div className="notification__body">
              <p>{data.title}</p>
              <small className="fw-400">{data.time}</small>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default Notification;
