const vercelProjects = async () => {
  let projects = [];
  try {
    const response = await fetch(`https://api.vercel.com/v9/projects`, {
      headers: {
        Authorization: `Bearer ${process.env.vercel_token}`,
      },
      next: { revalidate: 36000 }, // Add revalidation
    });
    const data = await response.json();
    // console.log(
    //   "vercelProjectsData >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>",
    //   data
    // );
    projects = data.projects || []; // ตรวจสอบว่า data.projects มีอยู่ไหม
  } catch (error) {
    console.error("Error fetching projects:", error);
  }

  return projects;
};
export default vercelProjects;
