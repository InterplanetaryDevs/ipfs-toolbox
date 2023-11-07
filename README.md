# IPFS Toolbox

![GitHub Workflow Status (branch)](https://img.shields.io/github/workflow/status/InterplanetaryDevs/ipfs-toolbox/Build%20&%20test/master)
![GitHub](https://img.shields.io/github/license/InterplanetaryDevs/ipfs-toolbox)
![GitHub forks](https://img.shields.io/github/forks/InterplanetaryDevs/ipfs-toolbox?style=social)
![GitHub Repo stars](https://img.shields.io/github/stars/InterplanetaryDevs/ipfs-toolbox?style=social)

You can check it out right [here](http://ipfs-toolbox.on.fleek.co/).
Or you can follow the instructions below and build it yourself.

## Screenshots

**Dashboard**
![screenshot](./docs/img/ipfs-toolbox.png)

## Shortcuts

- `ctrl` + `d` - Go to dashboard.
- `ctrl` + `,` - Go to configuration.
- `ctrl` + `m` - Toggle menu.
- `ctrl` + ` ` - Toggle search.

## Notes

**Cluster webui**
The `service.json` file will have to have `restapi.cors_allowed_methods` with at least the values `["GET","POST","DELETE"]`.
Or updating/adding/deleting will not work.

## Getting started

1. Clone this repository
2. install dependencies with `yarn install`
2. start the toolbox `yarn start`
