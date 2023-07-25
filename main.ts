import { Hono } from "https://deno.land/x/hono@v3.3.1/mod.ts";
import { serve } from "https://deno.land/std@0.167.0/http/server.ts";
import { datetime } from "https://deno.land/x/ptera@v1.0.2/mod.ts";

const app = new Hono();

app.post("/" + Deno.env.get("UUID"), async (c) => {
  const json = await c.req.json();
  const title = json["title"];
  const starts = json["starts"];
  const ends = json["ends"];

  if (!title || !starts || !ends) {
    const statusCode = "400";
    return c.json({ statusCode });
  }

  const response = await createTask(title, starts, convertEnds(ends));
  console.log(response);

  if (response && response.ok) {
    return c.json({ result: "ok" }, 200);
  } else {
    return c.json({ result: "ng" }, 500);
  }
});

serve(app.fetch);

// function to convert ends to description
// ex. from: July 24, 2023 at 01:00PM to: `July 24 2023 01:00PM`, and
// to: 2023-07-24 13:00:00
export function convertEnds(ends: string) {
  const str = ends.replace(/,/, "").replace(/ at /, " ").trim();
  const date = datetime().parse(str, "MMMM dd YYYY hh:mma");
  return date.format("YYYY-MM-dd HH:mm まで");
}

// function to create task request to todoist api
async function createTask(title: string, starts: string, ends: string) {
  const url = "https://api.todoist.com/rest/v2/tasks";
  const token = Deno.env.get("TODOIST_TOKEN");
  const project_id = Deno.env.get("PROJECT_ID");
  const data = {
    content: title,
    due_string: starts,
    description: ends,
    project_id: project_id,
  };
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  const body = JSON.stringify(data);
  const response = await fetch(url, { method: "POST", headers, body });
  return response;
}
