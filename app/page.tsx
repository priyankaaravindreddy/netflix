import { getServerSession } from "next-auth";

import { authOptions } from "./api/auth/[...nextauth]/route";
// export async function getServerSideProps(context) {
//   const session = await getServerSession(authOptions);

//   if (!session) {
//     return {
//       redirect: {
//         destination: "/auth",
//         permanent: false,
//       },
//     };
//   }

//   return {
//     props: {},
//   };
// }
const Home = async() => {
  const session = await getServerSession(authOptions);

  return <div>  <h1>Member Server Session</h1>
  <p>{session?.user?.email}</p>
  <p>{session?.user?.role}</p></div>;
};

export default Home;
