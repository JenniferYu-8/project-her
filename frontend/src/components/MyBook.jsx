import HTMLFlipBook from "react-pageflip";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import axios from "axios";
import projecther from "./projecther.png"; // Update the path as needed

const Cover = React.forwardRef(({ name }, ref) => {
  return (
    <div className="demoCover" ref={ref}>
      <div className="cover-content">
        <div>
          <img src={projecther} alt="Project Her" className="cover-image" />
          <h1 className="cover-title">{name}'s Story</h1>
        </div>
      </div>
    </div>
  );
});

const Page = React.forwardRef(({ header, children, number }, ref) => {
  return (
    <div className="demoPage" ref={ref}>
      <div className="page-content">
        <h1 className="page-header">{header}</h1>
        <p className="page-text">{children}</p>
        <p className="page-footer">{number}</p>
      </div>
    </div>
  );
});

export default function MyBook(props) {
  const location = useLocation();
  const navigate = useNavigate(); // Hook for navigation

  const { answers } = location.state; // Get answers from location state
  const [dayInLife, setDayInLife] = useState(""); // State for Day in Life
  const [resourcesUsed, setResourcesUsed] = useState(""); // State for Resources Used
  const [futureOpportunities, setFutureOpportunities] = useState(""); // State for Future Opportunities
  const [impact, setImpact] = useState(""); // State for Impact
  const [givingBack, setGivingBack] = useState(""); // State for Giving Back
  const [howToGetThere, setHowToGetThere] = useState(""); // State for How to Get There

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dayInLifeData = await fetch("/dayInLife").then((res) =>
          res.json()
        );
        setDayInLife(dayInLifeData);

        const resourcesUsedData = await fetch("/resourcesUsed").then((res) =>
          res.json()
        );
        setResourcesUsed(resourcesUsedData);

        const futureOpportunitiesData = await fetch(
          "/futureOpportunities"
        ).then((res) => res.json());
        setFutureOpportunities(futureOpportunitiesData);

        const impactData = await fetch("/impact").then((res) => res.json());
        setImpact(impactData);

        const givingBackData = await fetch("/givingBack").then((res) =>
          res.json()
        );
        setGivingBack(givingBackData);

        const howToGetThereData = await fetch("/howToGetThere").then((res) =>
          res.json()
        );
        setHowToGetThere(howToGetThereData);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, []);

  const handleReplay = () => {
    navigate("/"); // Redirect to the survey
  };

  return (
    <div className="book-container">
      <HTMLFlipBook width={450} height={650} showCover="true">
        <Cover name={answers.name}>Title</Cover>
        <Page number="1" header="A Day in the Life">
          {dayInLife.answers}
        </Page>
        <Page number="2" header="Resources Used">
          {resourcesUsed.answers}
        </Page>
        <Page number="3" header="Future Opportunities">
          {futureOpportunities.answers}
        </Page>
        <Page number="4" header="Impact">
          {impact.answers}
        </Page>
        <Page number="5" header="Community Involvement">
          {givingBack.answers}
        </Page>
        <Page number="6" header="How Do You Get There?">
          {howToGetThere.answers}
        </Page>
        {/* Final page repeating the cover content with Replay Button */}
        <Page number="7" header="The Beginning">
          <div className="center-page">
            <h2>This is merely the beginning of your story, {answers.name}!</h2>
            <p className="dream">Go out there and dream BIG!</p>
            <img src={projecther} alt="Project Her" className="cover-image" />
            <button onClick={handleReplay} className="replay-button">
              Replay
            </button>{" "}
            {/* Replay button */}
          </div>
        </Page>
      </HTMLFlipBook>
    </div>
  );
}
