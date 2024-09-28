import HTMLFlipBook from "react-pageflip";
import React from "react";

const Cover = React.forwardRef((props, ref) => {
  return (
    <div className="demoCover" ref={ref}>
      <div className="cover-content">
        <h1 className="cover-title">Name's Story</h1>
      </div>
    </div>
  );
});

const Page = React.forwardRef((props, ref) => {
    return (
      <div className="demoPage" ref={ref}>
        <div className="page-content">
          <h1 className="page-header">{props.header}</h1>
          <p className="page-text">{props.children}</p>
          <p className="page-footer">{props.number}</p>
        </div>
      </div>
    );
  });
  
  export default function MyBook(props) {
    return (
      <div className="book-container">  
        <HTMLFlipBook width={450} height={650} showCover="true">
          <Cover>Title</Cover>
          <Page number="1" header="A Day in the Life"></Page>
          <Page number="2" header="Resources Used">A Day in </Page>
          <Page number="3" header="Future Opportunities">Page text</Page>
          <Page number="4" header="Impact">Page text</Page>
          <Page number="5" header="Giving Back to the Community">Page text</Page>
          <Page number="6" header="How to get there">Page text</Page>
        </HTMLFlipBook>
      </div>

    );
  }