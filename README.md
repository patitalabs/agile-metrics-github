## Agile Metrics Github

Agile metrics tools allows you to track metrics from different github in order to identify trends and patterns on how
your team performance is affected by its environment Inspired by `Agile Metrics in Action` book
and https://github.com/cwhd/measurementor project

Pulls data from:

- Github

### Env configurations

Please refer to docker-compose.yml file

### Endpoints

#### http://localhost:3001/metrics/

````
{
	"shouldUpdateEntries": true,
	"config": {
    "repositoryName": "your-repo",
    "teamName": "someTeam",
    "orgName": "orgName/owner",
    "since": "2018-12-03T00:00:00Z"
  }
}
````