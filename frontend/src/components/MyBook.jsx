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
          <h1 className="page-header">Page Header</h1>
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
          <Page number="1">sdkfhfghsdlk text</Page>
          <Page number="2">Page text</Page>
          <Page number="3">Page text</Page>
          <Page number="4">Page text</Page>
          <Page number="5">Page text</Page>
          <Page number="6">Page text</Page>
        </HTMLFlipBook>
      </div>

    );
  }