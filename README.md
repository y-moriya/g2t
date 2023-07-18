# Google Calendar to Todoist

Create task by Google Calendar.

## Usage

Create .env file

```.env
TODOIST_TOKEN=YOUR_TODOIST_TOKEN
UUID=URL_UUID
```

Serve

```bash
deno run --allow-net main.ts
```

Post request

```bash
curl -X POST -H "Content-Type: application/json" -d '{"title": "タイトル", "starts": "July 24, 2023 at 09:00AM", "ends": "July 24, 2023 at 01:00PM"}'  http://localhost:8000/UUID
```

## License

MIT License
