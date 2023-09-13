import { Table } from "react-bootstrap";
import "../Applications/Applications.scss";
import Check from "../../../assets/svg/check.svg";
import msgIcon from "../../../assets/svg/msgicon.svg";
import { dummyObject } from "../../../helper/dummy";

const Applications = () => {
  return (
    <div className="applicationsSec">
      <div className="heading">
        <h3>Deliveries</h3>
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
              <tr>
                <td key={idx}>
                  <p>
                    {item.name}
                    <img src={Check} />
                  </p>
                  <p>{item.review}</p>
                </td>
                <td>
                  <div className="multiImgsDiv">
                    {item.image.map((items: string, index) => (
                      <img key={index} src={items} className="multiImg" />
                    ))}
                  </div>
                </td>
                <td>
                  <img src={msgIcon} /> {item.count}
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
