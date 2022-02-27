# Quoti-scripts
Utility functions to be used in `quoti` ecosystem

![Quoti](https://github.com/Diorla/quoti-scripts/raw/main/schedule.svg)

# Badges
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

## ```color```

### ```darken``` and ```lighten```
Adjust the shade of the colour to a lighter or darker shade.
```ts
color: string;
percent: number;
type?: "rgb" | "hsl" | "hex" | "keyword";
```
the default value of `type` is `hex`

```ts
const { color } = require("quoti-scripts")

// css colour keywords
const initialColour = "blue";
const finalColour = color.darken(initialColour, 50, "keyword")

console.log(finalColour); // "#000080"
```

```ts
const { color } = require("quoti-scripts")

// hex colour
const initialColour = "#fa5a51";
const finalColour = color.lighten(initialColour, 45)

console.log(finalColour); // "#FEE4E3"
```

```ts
const { color } = require("quoti-scripts")

// hsl
const initialColour = "hsl(234 79% 55%)";
const finalColour = color.darken(initialColour, 45, "hsl")

console.log(finalColour); // "hsl(234deg 79% 30.25%)"
```

```ts
const { color } = require("quoti-scripts")

// rgb
const initialColour = "rgb(140, 37, 14)";
const finalColour = color.lighten(initialColour, 45, "rgb")

console.log(finalColour); // "rgb(202, 53, 20)"
```

### ```contrastColor```
Returns a contrast colour that is best for accessibility. It only returns `white` if the colour provided is too dark or `black` if the colour is too light.

```ts
color: string;
type?: "rgb" | "hsl" | "hex" | "keyword";
```

```ts
const { color } = require("quoti-scripts")

const firstColour = "rgb(140, 37, 14)";
const secondColour = "rgb(202, 100, 120)";

const firstResult = color.contrastColor(firstColour, "rgb");
const secondResult = color.contrastColor(secondColour, "rgb");

console.log(firstResult); // white
console.log(secondResult); // black
```

```ts
const { color } = require("quoti-scripts")

const firstColour = "hsl(140deg 37% 14%)";
const secondColour = "hsl(202deg 100% 78%)";

const firstResult = color.contrastColor(firstColour, "hsl");
const secondResult = color.contrastColor(secondColour, "hsl");

console.log(firstResult); // white
console.log(secondResult); // black
```

```ts
const { color } = require("quoti-scripts")

const firstColour = "#ade";
const secondColour = "#ad301a";

const firstResult = color.contrastColor(firstColour);
const secondResult = color.contrastColor(secondColour);

console.log(firstResult); // black
console.log(secondResult); // white
```

```ts
const { color } = require("quoti-scripts")

const firstColour = "pink";
const secondColour = "forestgreen";

const firstResult = color.contrastColor(firstColour, "keyword");
const secondResult = color.contrastColor(secondColour, "keyword");

console.log(firstResult); // black
console.log(secondResult); // white
```