import ProjectDetailsPage from "@/components/Project/ProjectDetailsPage";

const getProjectById = async (id) => {
  try {
    const result = await fetch(`http://localhost:3000/api/projects/${id}`, {
      cache: "no-store",
    });

    if (!result.ok) {
      throw new Error("Failed to fetch topic");
    }
    return result.json();
  } catch (error) {
    console.log(error);
  }
};

const ProjectDetails = async ({ params }) => {
  const { id } = params;
  const { project } = await getProjectById(id);
  const { title, description, instituteName, domainName } = project;
  return (
    <div>
      <ProjectDetailsPage
        title={title}
        description={description}
        instituteName={instituteName}
        domainName={domainName}
      />
    </div>
  );
};

export default ProjectDetails;
