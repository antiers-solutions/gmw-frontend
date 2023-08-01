import CommonButton from "../../CommonButton/CommonButton";
import CommonModal from "../CommonModal/CommonModal";
import PerfectScrollbar from "react-perfect-scrollbar";
import Checkbox from "../../Formik/Checkbox/Checkbox";
import "./TeamMergeModal.scss";
import { useEffect, useState } from "react";
import { api } from "../../../../api/api";
import UseGetApi from "../../../../hooks/UseGetApi";
import { Spinner } from "react-bootstrap";
import { alphaNumeric } from "../../../../helper/alphaNumeric";

const TeamMergeModal = (props: any) => {
  const [search, setSearch] = useState<string>("");
  const [teamName, setTeamName] = useState<string>("");
  const [searchedTeam, setSearchedTeam] = useState<any>([]);
  const [selectedTeam, setSelectedTeam] = useState<any>([]);
  const [selectedTeamName, setSelectedTeamName] = useState<any>([]);
  const [error, setError] = useState<string>("");
  const [loader, setLoader] = useState<boolean>(false);

  const { teamByName, mergeTeam } = api;
  const getTeamData = async (url: string) => {
    setLoader(true);
    try {
      // Fetch team data using the provided API URL
      const teamResponse = await UseGetApi(url);
      const fetchedTeams: any = teamResponse?.data?.teams || [];

      // Filter out teams with ids that are in the selectedTeam array
      const filteredTeams: any = fetchedTeams.filter(
        (team: any) => !selectedTeam.includes(team.id)
      );

      // Add the selected teams to the beginning of the array
      const mergedTeams: any = selectedTeam.map((id: any, index: number) => ({
        id,
        name: selectedTeamName[index],
      }));

      setSearchedTeam([...mergedTeams, ...filteredTeams] || []);
    } catch (e) {
      setSearchedTeam([]);
    }
    setLoader(false);
  };

  const handleChange = (value: boolean, id: string, name: string): void => {
    setSelectedTeam((prevSelectedTeam: string[]) => {
      if (value && !prevSelectedTeam.includes(id)) {
        return [...prevSelectedTeam, id];
      } else if (!value) {
        return prevSelectedTeam.filter((teamId: string) => teamId !== id);
      }
      return prevSelectedTeam;
    });

    setSelectedTeamName((prevSelectedTeamName: string[]) => {
      if (value && !prevSelectedTeamName.includes(name)) {
        return [...prevSelectedTeamName, name];
      } else if (!value) {
        return prevSelectedTeamName.filter(
          (teamName: string) => teamName !== name
        );
      }
      return prevSelectedTeamName;
    });
  };

  const onSubmit = async () => {
    if (selectedTeam.length > 1) {
      try {
        await UseGetApi(mergeTeam(), "put", {
          updatedName: teamName,
          teamIds: selectedTeam,
        });
        setError("");
        props.onHide();
      } catch (e) {}
    } else {
      setError("Atleast select two teams");
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (search) {
        getTeamData(teamByName(search));
      }
    }, 800);

    return () => clearTimeout(timer);
  }, [search]);

  // Assuming the alphaNumeric regex pattern is already defined somewhere in your code
  const setInputState = (value: string, name: string) => {
    if (alphaNumeric.test(value)) {
      name === "search" ? setSearch(value) : setTeamName(value);
    }
    if (!value) {
      name === "search" ? setSearch(value) : setTeamName(value);
    }
  };

  return (
    <CommonModal
      show={props.show}
      onHide={props.onHide}
      title="Team Merge"
      className="team-modal"
    >
      <div className={`common_input`}>
        <input
          type="text"
          placeholder="Enter Team Name"
          onChange={(e: any) => setInputState(e.target.value, "search")}
          name="search"
          value={search}
          className="form-control"
        />
      </div>
      <ul>
        <p>Select Team</p>
        <div className="loader">
          {loader ? (
            <Spinner animation="border" variant="primary"></Spinner>
          ) : null}
          <PerfectScrollbar
            className="textCenter"
            options={{ wheelPropagation: false }}
          >
            {searchedTeam.length ? (
              searchedTeam?.map((item: any, index: number) => (
                <li key={index}>
                  <span>{item.name}</span>
                  <Checkbox
                    onChange={(e: any) =>
                      handleChange(e.target.checked, item.id, item.name)
                    }
                    value={selectedTeam.includes(item.id)}
                  />
                </li>
              ))
            ) : (
              <span>
                {!loader
                  ? !search
                    ? "Search the team"
                    : "No Record found"
                  : null}
              </span>
            )}
          </PerfectScrollbar>
        </div>
      </ul>

      {selectedTeam.length > 1 ? (
        <div className="team-name">
          <p>Team Name</p>
          <div className={`common_input`}>
            <input
              type="text"
              placeholder="Team Name"
              className="form-control"
              value={teamName}
              onChange={(e) => setInputState(e.target.value, "teamName")}
            />
          </div>
        </div>
      ) : null}
      {error ? <span className="error-msg">{error}</span> : null}
      <div className="d-flex justify-content-center">
        <CommonButton
          title="Create Team"
          className="primary btn-lg"
          onClick={onSubmit}
          disabled={!selectedTeam.length}
        />
      </div>
    </CommonModal>
  );
};

export default TeamMergeModal;
