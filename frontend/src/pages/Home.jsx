// import React from 'react'
// import Header from '../components/Header'
// import SpecialityMenu from '../components/SpecialityMenu'
// import TopDoctors from '../components/TopDoctors'
// import Banner from '../components/Banner'

// const Home = () => {
//   return (
//     <div>
//       <Header/>
//       <SpecialityMenu/>
//       <TopDoctors/>
//       <Banner/>
      
//     </div>
//   )
// }

// export default Home


// import React from "react";
// import Header from "../components/Header";
// import SpecialityMenu from "../components/SpecialityMenu";
// import TopDoctors from "../components/TopDoctors";
// import Banner from "../components/Banner";

// const Home = () => {
//   return (
//     <>
//       <Header />

//       <div className="mx-4 sm:mx-[8%]">
//         <SpecialityMenu />
//         <TopDoctors />
//         <Banner />
//       </div>
//     </>
//   );
// };

// export default Home;

import React from "react";
import Header from "../components/Header";
import SpecialityMenu from "../components/SpecialityMenu";
import TopDoctors from "../components/TopDoctors";
import Banner from "../components/Banner";

const Home = () => {
  return (
    <>
      <Header />

      {/* Sections with margin */}
      <div className="mx-4 sm:mx-[8%]">
        <SpecialityMenu />
        <TopDoctors />
      </div>

      {/* Full width banner */}
      <Banner />
    </>
  );
};

export default Home;