// import HTMLFlipBook from "react-pageflip";
// import React from "react";

// const Page = React.forwardRef((props, ref) => {
//     return (
//       <div className="demoPage" ref={ref}> /* ref required */
//         <h1>Page Header</h1>
//         <p>{props.children}</p>
//         <p>Page number: {props.number}</p>
//       </div>
//     );
//   });
  
//   export default function MyBook(props) {
//     return (
//       <HTMLFlipBook width={300} height={500}>
//         <Page number="1">sdkfhfghsdlk text</Page>
//         <Page number="2">Page text</Page>
//         <Page number="3">Page text</Page>
//         <Page number="4">Page text</Page>
//       </HTMLFlipBook>
//     );
//   }

//   export default function MyBook(props) {
//     return (
//       <HTMLFlipBook width={300} height={500}>
//         <div className="demoPage">Page 1</div>
//         <div className="demoPage">Page 2</div>
//         <div className="demoPage">Page 3</div>
//         <div className="demoPage">Page 4</div>
//       </HTMLFlipBook>
//     );
//   }