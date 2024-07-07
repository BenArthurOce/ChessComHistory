

// Create a function to make an API call.
async function makeAPICall(endpoint) {
    const response = await fetch(endpoint);
    const data = await response.json();
    return data;
}
  
  // Create a function to make multiple API calls in parallel.
  async function makeMultipleAPICalls(endpoints) {
    const promises = endpoints.map(makeAPICall);
    const responses = await Promise.all(promises);
    return responses;
}

// Make multiple API calls in a synchronous way.
const responses = await makeMultipleAPICalls([
    `https://api.chess.com/pub/player/BenArthurOCE/games/2024/07`,
    `https://api.chess.com/pub/player/BenArthurOCE/games/2024/06`,
    `https://api.chess.com/pub/player/BenArthurOCE/games/2024/05`,
    `https://api.chess.com/pub/player/BenArthurOCE/games/2024/04`,
    `https://api.chess.com/pub/player/BenArthurOCE/games/2024/03`,
    `https://api.chess.com/pub/player/BenArthurOCE/games/2024/02`,
    `https://api.chess.com/pub/player/BenArthurOCE/games/2024/01`,
    `https://api.chess.com/pub/player/BenArthurOCE/games/2023/12`,
    `https://api.chess.com/pub/player/BenArthurOCE/games/2023/11`,
]);

// Do something with the responses from the APIs.
console.log(responses);