import { Col, Row } from "react-bootstrap";
import { CommonButton, InfoCard, Loader } from "../../../components/ui";
import { DocIcon, ProjectIcon } from "../../../assets/svg/SvgIcon";
import "./Projects.scss";
import { useState } from "react";
import MarkdownIt from "markdown-it";
import markdownItEmoji from "markdown-it-emoji";
import ProjectDetail from "./components/ProjectDetail";

const Projects = () => {
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

  return (
    <div className="project inner-layout">
      {loader ? <Loader /> : null}
      <h6 className="title">Project Detail page</h6>
      <Row className="mb-3 mb-lg-5">
        {cardData.length
          ? cardData.map((item) => (
              <Col xxl={3} sm={6} className="mb-4 mb-xxl-0">
                <InfoCard
                  className={item.class}
                  icon={item.icon}
                  text={item.text}
                  subText={item.subText}
                />
              </Col>
            ))
          : null}
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
