import axios from "axios";

const useMovies = async () => {
  const res = await axios.get("https://musical-stroopwafel-5842ea.netlify.app/api/movies");

  console.log("res.data", res.data);
  return res.data;
};

export default useMovies;
