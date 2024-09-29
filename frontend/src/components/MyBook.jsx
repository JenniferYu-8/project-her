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
  
  // const { name, gender, interest } = location.state || {}; // Destructure to get name, gender, and interest

  const { answers } = location.state; // Get answers from location state
  const [data, setData] = useState(""); // Update to string state
  const [userData, setUserData] = useState({});


  useEffect(() => {
    console.log("chat.text");

    fetch("/communityResources")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        console.log("setting");
        console.log(data);
      });
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Assuming the API can fetch user data based on name
        const response = await axios.get('http://127.0.0.1:5000/api/get-user-data', {
          params: {
            name: answers.name, // This should be valid if your API is set up accordingly
          },
        });
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    // Fetch user data only if answers are present
    if (answers && answers.name) {
      fetchUserData();
    }
  }, [answers]);


  return (
    <div className="book-container">
      <HTMLFlipBook width={450} height={650} showCover="true">
        <Cover name={answers.name}>Title</Cover>
        <Page number="1" header="A Day in the Life">
        {data.answers}
        </Page>
        <Page number="2" header="Resources Used">
          {data.answers}
        </Page>

        <Page number="3" header="Future Opportunities">
          {data.answers}
        </Page>
        <Page number="4" header="Impact">
          {data.answers}
        </Page>
        <Page number="5" header="Giving Back to the Community">
          {data.answers}
        </Page>
        <Page number="6" header="How to get there">
          {data.answers}
        </Page>
      </HTMLFlipBook>
    </div>
  );
}