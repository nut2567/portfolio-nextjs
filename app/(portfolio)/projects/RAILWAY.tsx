export const RAILWAY = async () => {
  const response = await fetch("https://backboard.railway.app/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.RAILWAY_TOKEN}`,
    },
    body: JSON.stringify({
      query: `
          query {
            projects {
              id
              name
              environments {
                id
                name
              }
            }
          }
        `,
    }),
  });

  //   const data = await response.json();
  console.log(response);
};
