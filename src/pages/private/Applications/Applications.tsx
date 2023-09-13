import { Table } from "react-bootstrap";
import "./Applications.scss";
import Check from "../../../assets/svg/check.svg";
import msgIcon from "../../../assets/svg/msgicon.svg";
import { useNavigate } from "react-router-dom";
import { dummyObject } from "../../../helper/dummy";

const Applications = () => {
  const navigate = useNavigate();
  return (
    <div className="applicationsSec">
      <div className="heading">
        <h3>Applications</h3>
      </div>
      <div className="aplicationTop">
        <Table className={` common_table  aplicationTable `}>
          <thead>
            <tr>
              <th>
                <button className="opnBtn">Open</button>
                <button className="closeBtn">Close</button>
              </th>
              <th>Reviews</th>
              <th>Assignee</th>
            </tr>
          </thead>

          <tbody>
            {dummyObject.map((item, idx) => (
              <tr  onClick={() => {
                navigate(`/auth/projects/`);
              }}>
                <td key={idx}>
                  <p>
                    {item.name}
                    <img src={Check} />
                  </p>
                  <p>{item.review}</p>
                </td>
                <td>
                  <img src={msgIcon} /> {item.count}
                </td>
                <td>
                  <div className="multiImgsDiv">
                    {item.image.map((items: string, index) => (
                      <img key={index} src={items} className="multiImg" />
                    ))}
                  </div>
                </td>
                
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default Applications;
