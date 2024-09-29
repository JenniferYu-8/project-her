import HTMLFlipBook from "react-pageflip";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const Cover = React.forwardRef(({ name }, ref) => {
  return (
    <div className="demoCover" ref={ref}>
      <div className="cover-content">
        <h1 className="cover-title">{name}'s Story</h1>
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
  const [userData, setUserData] = useState({});
  const [dayInLife, setDayInLife] = useState(""); // State for Day in Life
  const [resourcesUsed, setResourcesUsed] = useState(""); // State for Resources Used
  const [futureOpportunities, setFutureOpportunities] = useState(""); // State for Future Opportunities
  const [impact, setImpact] = useState(""); // State for Impact
  const [givingBack, setGivingBack] = useState(""); // State for Giving Back
  const [howToGetThere, setHowToGetThere] = useState(""); // State for How to Get There

  useEffect(() => {
    console.log("chat.text");

    fetch("/dayInLife")
      .then((res) => res.json())
      .then((dayInLifeData) => {
        setDayInLife(dayInLifeData);
        console.log("setting dayInLife");
        console.log(dayInLifeData);
      });

    fetch("/resourcesUsed")
      .then((res) => res.json())
      .then((resourcesUsedData) => {
        setResourcesUsed(resourcesUsedData);
        console.log("setting resourcesUsed");
        console.log(resourcesUsedData);
      });

    fetch("/futureOpportunities")
      .then((res) => res.json())
      .then((futureOpportunitiesData) => {
        setFutureOpportunities(futureOpportunitiesData);
        console.log("setting futureOpportunities");
        console.log(futureOpportunitiesData);
      });

    fetch("/impact")
      .then((res) => res.json())
      .then((impactData) => {
        setImpact(impactData);
        console.log("setting impact");
        console.log(impactData);
      });

    fetch("/givingBack")
      .then((res) => res.json())
      .then((givingBackData) => {
        setGivingBack(givingBackData);
        console.log("setting givingBack");
        console.log(givingBackData);
      });

    fetch("/howToGetThere")
      .then((res) => res.json())
      .then((howToGetThereData) => {
        setHowToGetThere(howToGetThereData);
        console.log("setting howToGetThere");
        console.log(howToGetThereData);
      });
  }, [answers]);

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
      </HTMLFlipBook>
    </div>
  );
}
