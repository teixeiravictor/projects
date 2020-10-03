// TODO: Use .env file
const apiKey = '';

export function getProductValues() {
  const URL = ``;

  const myResponse = fetch(URL)
    .then((response) => response.json())
    .then((data) => {
      return data;
    });

  return myResponse;
}
