import React from "react";
import HeroSection from "../components/heroSection";
import FeatureSection from "../components/featureSection";
import FeatureSection2 from "../components/featureSection2";
import Footer from "../components/footer";

const Home = (props) => {
  const isLoggedIn = props.isLoggedIn
  return (
    <div className="flex justify-center flex-col gap-y-12 w-11/12 max-w-[1160px] py-6 mx-auto gap-x-12   text-white text-xl h-full">
      <HeroSection isLoggedIn={isLoggedIn} />
      <FeatureSection/>
      <FeatureSection2/>
      <Footer/>
      <div></div>
    </div>
  );
};

export default Home;
