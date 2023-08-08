import { Col, Row } from "react-bootstrap";
import {
  CommonButton,
  CustomSelect,
  InfoCard,
  Loader,
} from "../../../components/ui";
import { DocIcon, ProjectIcon } from "../../../assets/svg/SvgIcon";
import "./Projects.scss";
import React, { useEffect, useState } from "react";
import MarkdownIt from "markdown-it";
import markdownItEmoji from "markdown-it-emoji";
import { getStatusClass, getStatusName } from "../../../helper/getStatusClass";
import UseGetApi from "../../../hooks/UseGetApi";
import { useParams } from "react-router-dom";
import { api } from "../../../api/api";
import ProjectDetail from "../../../components/ProjectDetail/ProjectDetail";

const Projects = ({ ID }: { ID?: string }) => {
  const { id } = useParams(); // get id
  const { projectStatusChange } = api;
  //state
  const [cardData, setCardData] = useState([
    {
      text: "-",
      subText: "Project ID",
      icon: <DocIcon />,
    },
    {
      text: "-",
      subText: "Project Name",
      icon: <ProjectIcon />,
      class: "pink",
    },
  ]);

  // State variable to store the markdown content
  const [mdContent, setMdContent] = useState("");
  // State variable to control the loading state
  const [loader, setLoader] = useState(false);
  // State variable to store the type of CommonButton (probably a CSS class name)
  const [commonButton, setCommonButton] = useState("info");
  const [projectStatus, setProjectStatus] = useState("");

  // Function to render markdown content into HTML with emojis
  const renderMarkdown = (markdown: string) => {
    const md: typeof MarkdownIt = MarkdownIt();
    md.use(markdownItEmoji);
    return md.render(markdown);
  };

  // Function to set the active class for the CommonButton
  const setactiveClass = (value: string) => {
    setCommonButton(value);
  };

  useEffect(() => {
    if (commonButton !== "info") {
      const payload = {
        updatedStatus: projectStatus,
        id: id || ID,
      };
      UseGetApi(projectStatusChange(), "put", payload);
    }
  }, [projectStatus]);

  const StatusOptions = [
    {
      value: "active",
      label: "In-Progress",
    },
    {
      value: "complete",
      label: "Completed",
    },
    {
      value: "hold",
      label: "Hold",
    },
  ];
  return (
    <div className="project inner-layout">
      {loader ? <Loader /> : null}
      <h6 className="title">Project Detail page</h6>
      <Row className="mb-3 mb-lg-5">
        {cardData.length
          ? cardData.map((item, index) => (
              <Col xxl={3} sm={6} key={index} className="mb-4 mb-xxl-0">
                <InfoCard
                  className={item.class}
                  icon={item.icon}
                  text={item.text}
                  subText={item.subText}
                />
              </Col>
            ))
          : null}
        <div className="col-md-2 offset-xxl-4 col-sm-1 dropdown_project">
          <CustomSelect
            className={`${getStatusClass(projectStatus)} `}
            options={StatusOptions}
            defaultValue={StatusOptions[0]}
            value={{
              value: projectStatus,
              label: getStatusName(projectStatus),
            }}
            label="Project Status"
            onChange={(e: any) => {
              setProjectStatus(e.value);
            }}
          />
        </div>
      </Row>
      <div className="inner-layout__btns">
        <CommonButton
          title="Information"
          type="button"
          onClick={() => setactiveClass("info")}
          className={commonButton === "info" && "active"}
        />
        <CommonButton
          title="Overview"
          type="button"
          onClick={() => setactiveClass("link")}
          className={commonButton === "link" && "active"}
        />
      </div>
      {commonButton === "info" ? (
        <ProjectDetail
          setLoader={(value: boolean) => setLoader(value)}
          setMdContent={(value: any) => setMdContent(value)}
          setCardData={(value: any) => {
            setCardData(value);
          }}
          ID={ID || id}
          setProjectStatus={(value: string) => setProjectStatus(value)}
          projectStatus={projectStatus}
        />
      ) : (
        <div className="project_info mb-5">
          <div
            className="project_info_wrapper"
            dangerouslySetInnerHTML={{ __html: renderMarkdown(mdContent) }}
          />
        </div>
      )}
    </div>
  );
};

export default Projects;
