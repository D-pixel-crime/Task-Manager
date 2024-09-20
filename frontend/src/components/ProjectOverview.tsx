import MainContainer from "../containers/MainContainer";
import CircularWithValueLabel from "./Progress";

const ProjectOverview = () => {
  return (
    <MainContainer>
      <section className="flex-center w-full h-screen">
        <article className="w-full h-full p-20 grid grid-cols-3 gap-5 relative">
          <div className="flex-center flex-col gap-10 w-full p-10">
            <CircularWithValueLabel value={84} color="#3cca35" />
            <h2 className="flex items-center gap-2">
              <span className="w-[10px] h-[10px] bg-green-500 rounded-full" />
              Completed
            </h2>
          </div>
          <div className="flex-center flex-col gap-10 w-full p-10">
            <CircularWithValueLabel value={46} color="#3d7ccd" />
            <h2 className="flex items-center gap-2">
              <span className="w-[10px] h-[10px] bg-blue-500 rounded-full" />
              In-Progress
            </h2>
          </div>
          <div className="flex-center flex-col gap-10 w-full p-10">
            <CircularWithValueLabel value={15} color="#ec1010" />
            <h2 className="flex items-center gap-2">
              <span className="w-[10px] h-[10px] bg-red-500 rounded-full" />
              Not Started
            </h2>
          </div>
        </article>
      </section>
    </MainContainer>
  );
};
export default ProjectOverview;
