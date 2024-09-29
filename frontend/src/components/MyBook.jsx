import HTMLFlipBook from "react-pageflip";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import projecther from './projecther.png'; // Update the path as needed

const Cover = React.forwardRef(({ name }, ref) => {
  return (
    <div className="demoCover" ref={ref}>
      <div className="cover-content">
        <h1 className="cover-title">{name}'s Story</h1>
        <img src={projecther} alt="Project Her" className="cover-image" />
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

  const { answers } = location.state; // Get answers from location state
  const [dayInLife, setDayInLife] = useState(""); // State for Day in Life
  const [resourcesUsed, setResourcesUsed] = useState(""); // State for Resources Used
  const [futureOpportunities, setFutureOpportunities] = useState(""); // State for Future Opportunities
  const [impact, setImpact] = useState(""); // State for Impact
  const [givingBack, setGivingBack] = useState(""); // State for Giving Back
  const [howToGetThere, setHowToGetThere] = useState(""); // State for How to Get There

  useEffect(() => {
    // Using empty dependency array ensures the effect runs once, after initial render
    const fetchData = async () => {
      try {
        const dayInLifeData = await fetch("/dayInLife").then((res) => res.json());
        setDayInLife(dayInLifeData);

        const resourcesUsedData = await fetch("/resourcesUsed").then((res) => res.json());
        setResourcesUsed(resourcesUsedData);

        const futureOpportunitiesData = await fetch("/futureOpportunities").then((res) => res.json());
        setFutureOpportunities(futureOpportunitiesData);

        const impactData = await fetch("/impact").then((res) => res.json());
        setImpact(impactData);

        const givingBackData = await fetch("/givingBack").then((res) => res.json());
        setGivingBack(givingBackData);

        const howToGetThereData = await fetch("/howToGetThere").then((res) => res.json());
        setHowToGetThere(howToGetThereData);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures this runs only once after initial render

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
        {/* Final page repeating the cover content */}
        <Page number="7" header="The Beginning">
          <h2>Time for YOUR Jor{answers.name}</h2>
          <p>Every ending is a new beginning, where your journey continues.</p>
          <img src={projecther} alt="Project Her" className="cover-image" />
        </Page>
      </HTMLFlipBook>
    </div>
  );
}
