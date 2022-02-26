# Quoti-scripts
![Quoti](./schedule.svg)
# Introduction
Utility functions to be used in `quoti` ecosystem

![GitHub branch checks state](https://img.shields.io/github/checks-status/diorla/quoti-scripts/main)
![GitHub language count](https://img.shields.io/github/languages/count/diorla/quoti-scripts)
![GitHub top language](https://img.shields.io/github/languages/top/diorla/quoti-scripts)
![npm bundle size](https://img.shields.io/bundlephobia/min/quoti-scripts)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/quoti-scripts)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/diorla/quoti-scripts)
![GitHub repo size](https://img.shields.io/github/repo-size/diorla/quoti-scripts)
![Lines of code](https://img.shields.io/tokei/lines/github/diorla/quoti-scripts)
![npm](https://img.shields.io/npm/dw/quoti-scripts)
![npm](https://img.shields.io/npm/dm/quoti-scripts)
![npm](https://img.shields.io/npm/dy/quoti-scripts)
![GitHub commit merge status](https://img.shields.io/github/commit-status/diorla/quoti-scripts/main/7346ec04986f62c83ae40a6c4b53bc4dea224b05)
![GitHub issues](https://img.shields.io/github/issues/diorla/quoti-scripts)
![GitHub pull requests](https://img.shields.io/github/issues-pr/diorla/quoti-scripts)
![GitHub](https://img.shields.io/github/license/diorla/quoti-scripts)
![GitHub package.json version](https://img.shields.io/github/package-json/v/diorla/quoti-scripts)
![node-current](https://img.shields.io/node/v/quoti-scripts)
![GitHub commit activity](https://img.shields.io/github/commit-activity/m/diorla/quoti-scripts)
![GitHub last commit](https://img.shields.io/github/last-commit/diorla/quoti-scripts)
![npm collaborators](https://img.shields.io/npm/collaborators/quoti-scripts)

![Twitter Follow](https://img.shields.io/twitter/follow/dihorla?style=social)
# Functions

## ```isDue```

```ts
startDate: string | number | Date | Dayjs;
currentDate: string | number | Date | Dayjs;
frequencyType: "D" | "d" | "W" | "w" | "M" | "m" | "Y" | "y";
frequencyValue: number;
// day of the weeks, 0 (sun) to 6 (sat)
dayOfWeek: number[] = [];
```

```ts
const { isDue } = require("quoti-scripts");

// Tue Nov 20 2012
const startDate = new Date(2012, 10, 20)
// Fri Nov 23 2012
const currentDate = new Date(2012, 10, 23);

// Every 3 days
console.log(isDue(startDate, currentDate, "D", 3)); // true
```

```ts
const { isDue } = require("quoti-scripts");

// Tue Nov 20 2012
const startDate = new Date(2012, 10, 20)
// Fri Nov 23 2012
const currentDate = new Date(2012, 10, 23);

// Fri & Sat, every 5 weeks
const weekdays = [5, 6]
console.log(isDue(startDate, currentDate, "W", 3, [5])); // true
```

```ts
const { isDue } = require("quoti-scripts");

// Tue Nov 20 2012
const startDate = new Date(2012, 10, 20);

// Wed Mar 20 2013
const currentDate = new Date(2013, 2, 20);

// Every 5 months
console.log(isDue(startDate, currentDate, "M", 5)); // true
```

```ts
const { isDue } = require("quoti-scripts");

// Sun Apr 28 2013
const startDate = new Date(2013, 3, 28);

// Wed Apr 28 2021
const currentDate = new Date(2021, 3, 28);

// Every 8 years
console.log(isDue(startDate, currentDate, "Y", 8)); // true
```