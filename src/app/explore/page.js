import ProjectCard from "@/components/Project/ProjectCard";

const getProjects = async () => {
  try {
    const result = await fetch("http://localhost:3000/api/projects", {
      cache: "no-store",
    });
    if (!result.ok) {
      console.log("Failed to store data!!!");
    }
    return result.json();
  } catch (error) {
    console.log(error);
  }
};

const Explore = async () => {
  const { projects } = await getProjects();

  return (
    <>
      <div>
        <div className="flex flex-col justify-center items-center mt-16 gap-4">
          {projects.map((project) => {
            const { title, instituteName, domainName, _id: id } = project;
            return (
              <ProjectCard
                title={title}
                instituteName={instituteName}
                domainName={domainName}
                id={id}
                key={id}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Explore;
