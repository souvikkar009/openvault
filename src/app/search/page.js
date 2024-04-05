import ProjectCard from "@/components/Project/ProjectCard";

const getSearchResult = async (q, filter) => {
  try {
    const result = await fetch(
      `http://localhost:3000/api/projects/${filter}/${q}`,
      {
        cache: "no-store",
      }
    );
    if (!result.ok) {
      console.log("Failed to store data!!!");
    }
    return result.json();
  } catch (error) {
    console.log(error);
  }
};

const Search = async ({ searchParams }) => {
  const { q, filter } = searchParams;
  console.log(q, filter);
  const {projects} = await getSearchResult(q, filter);
  console.log(projects);

  return (
    <>
      <div className="flex flex-col justify-center items-center mt-16 gap-4">
        {projects.map((project) => {
          const { title, instituteName, domainName, _id: id } = project;
          console.log(title, instituteName, domainName, id);
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
    </>
  );
};

export default Search;
