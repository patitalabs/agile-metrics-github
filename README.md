## Agile Metrics Github

Agile metrics tools allows you to track metrics from different github in order to identify trends and patterns on how
your team performance is affected by its environment Inspired by `Agile Metrics in Action` book
and https://github.com/cwhd/measurementor project

Pulls data from:

- Github


### Env configurations

````
GITHUB_TOKEN=
````

### Configurations:



#### github-config.json

````
[
  {
    "repositoryName": "your-repo",
    "teamName": "someTeam",
    "orgName": "orgName/own",
    "since": "2018-12-03T00:00:00Z"
  }
]
````