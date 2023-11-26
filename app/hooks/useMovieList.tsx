import axios from "axios";

const useMovies = async () => {
  const res = await axios.get("http://localhost:3000//api/movies");

  console.log("res.data", res.data);
  return res.data;
};

export default useMovies;
