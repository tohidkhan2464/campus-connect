import { TeamCard } from "./TeamMember";
function About() {

  const ahad = {
    name: "Tohid Khan",
    designation: "Full-Stack Developer",
    image:
      `https://api.dicebear.com/7.x/initials/svg?seed=Tohid Khan`,
  };
  const danish = {
    name: "Ganesh Parmar",
    designation: "Backend-end Engineer",
    image:
    `https://api.dicebear.com/7.x/initials/svg?seed=Ganesh Parmar`
  };
  const abubakar = {
    name: "Aditi Tamboli",
    designation: "Front End Developer",
    image:
    `https://api.dicebear.com/7.x/initials/svg?seed=Aditi Tamboli`
  };
  const muneeb = {
    name: "Urvi Raje Rathore",
    designation: "UI/UX Designer",
    image:
    `https://api.dicebear.com/7.x/initials/svg?seed=Urvi Raje Rathore`,
  };
  

  return (
    <div className=" h-screen w-screen">
      <h1 className="font-bold text-white text-center text-5xl">
        Meet Our Team!
      </h1>
      <div className="py-20 sm:py-25 flex gap-10 flex-wrap justify-center align-center">
        <TeamCard member={ahad} />
        <TeamCard member={danish} />
        <TeamCard member={abubakar} />
        <TeamCard member={muneeb} />
      </div>
    </div>
  );
}
export { About };
