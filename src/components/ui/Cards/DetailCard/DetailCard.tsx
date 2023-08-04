import { ReactNode, useEffect, useState } from "react";
import "./DetailCard.scss";
import { useNavigate } from "react-router-dom";
import { splitText } from "../../../../helper/splitText";
import { getStatusClass } from "../../../../helper/getStatusClass";

const DetailCard = ({
  heading,
  children,
  className,
  contentList,
}: {
  heading?: string;
  children?: ReactNode;
  className?: string;
  contentList?: any[];
}) => {
  // State to store some data for content lists
  const [contentLists, setContentList] = useState<any>([]);

  // State to control whether to show CSS styling
  const [showCss, setShowCss] = useState(false);

  // React Router hook to manage navigation
  const navigate = useNavigate();

  // useEffect to update 'contentLists' state when 'contentList' prop changes
  useEffect(() => {
    setContentList(contentList);
  }, [contentList]);

  // useEffect to conditionally set 'showCss' state based on 'heading' prop
  useEffect(() => {
    // If the 'heading' prop is equal to "Team Details", set 'showCss' to true
    if (heading === "Team Details") {
      setShowCss(true);
    }
  }, [heading]);

  return (
    <div className={`detail-card ${className ? className : ""}`}>
      <div className="detail-card__head">
        <p>{heading}</p>
      </div>
      {children ? (
        children
      ) : (
        <ul
          className={`detail-card__content ${
            className ? `${className}__content` : ""
          }`}
        >
          {contentLists?.length
            ? contentLists?.map((item: any, index: number) => (
                <li key={index}>
                  <strong>{item.name}</strong>
                  <span
                    className={
                      showCss
                        ? "cursor-pointer"
                        : getStatusClass(item.name.toLowerCase())
                    }
                    onClick={() =>
                      showCss
                        ? navigate(`/auth/team/${contentLists[1].info}`)
                        : null
                    }
                  >
                    {item.name === "Team ID" ? (
                      <> {splitText(item.info, 4)}</>
                    ) : (
                      item.info
                    )}
                  </span>
                </li>
              ))
            : null}
        </ul>
      )}
    </div>
  );
};

export default DetailCard;
