export const requestOptions = {
  method: "GET",
  redirect: "follow",
  headers: {
    "apikey": process.env.REACT_APP_API_KEY || ""
  }
}