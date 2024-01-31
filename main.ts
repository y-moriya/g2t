import { Hono } from "https://deno.land/x/hono@v3.3.1/mod.ts";
import { serve } from "https://deno.land/std@0.167.0/http/server.ts";
import { datetime, diffInMin } from "https://deno.land/x/ptera@v1.0.2/mod.ts";
import "https://deno.land/x/dotenv@v3.2.2/load.ts";

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

  const response = await createTask(title, starts, ends);
  console.log(response);

  if (response && response.ok) {
    return c.json({ result: "ok" }, 200);
  } else {
    return c.json({ result: "ng" }, 500);
  }
});

serve(app.fetch);

export function calculateDuration(starts: string, ends: string) {
  const startsDate = datetime(starts);
  const endsDate = datetime(ends);
  const duration = diffInMin(endsDate, startsDate);
  return duration;
}

// function to create task request to todoist api
async function createTask(title: string, starts: string, ends: string) {
  const url = "https://api.todoist.com/rest/v2/tasks";
  const token = Deno.env.get("TODOIST_TOKEN");
  const project_id = Deno.env.get("PROJECT_ID");
  const duration = calculateDuration(starts, ends);
  const durationUnit = "minute";
  const data = {
    content: title,
    due_string: starts,
    project_id: project_id,
    duration: duration,
    duration_unit: durationUnit,
  };
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  const body = JSON.stringify(data);
  const response = await fetch(url, { method: "POST", headers, body });
  return response;
}
