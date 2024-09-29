// // cohereApi.js
// import cohere from 'cohere-ai';

// co = cohere.Client(api_key="HNuszEemO11A2nbVQL6He6hRujnGG1OcvYH87m2c",)

// export const generateChatAnswer = async (topic) => {
//   try {
//     const response = await cohere.chat({
//       preamble: "You are a helpful assistant.",
//       message: topic,
//       model: "command-r-plus",
//     });
//     return response.body; // Adjust based on response structure
//   } catch (error) {
//     console.error("Error generating chat answer:", error);
//     return "Error generating answer.";
//   }
// };
