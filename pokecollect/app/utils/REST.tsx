export const fetchUser = async (id: number) => {
  const params = new URLSearchParams({
    select: "*",
    id: `eq.${id}`,
  });

  const url = `https://pnejhgrpcbwmwrkzovtd.supabase.co/rest/v1/users?${params.toString()}`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      apikey:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBuZWpoZ3JwY2J3bXdya3pvdnRkIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODE5MTIxOTAsImV4cCI6MTk5NzQ4ODE5MH0.tH6M1qE524yfe1Nl5A-bFExqASNkdm3s_Z8Pvnlkniw",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBuZWpoZ3JwY2J3bXdya3pvdnRkIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODE5MTIxOTAsImV4cCI6MTk5NzQ4ODE5MH0.tH6M1qE524yfe1Nl5A-bFExqASNkdm3s_Z8Pvnlkniw",
    },
  });
  const data = await response.json();

  return data[0];
};
