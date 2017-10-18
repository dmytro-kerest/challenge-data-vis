# Data Vis Challenge

This challenge is create a component that displays a scatter plot of data from an iris dataset.

![Reference Solution](https://thumbs.gfycat.com/GrotesqueAdvancedKagu-size_restricted.gif)

See the reference solution here: http://ixc-datavis.surge.sh/

### Setup & Running

*  run ```npm i``` in order to install required packages.

* run `npm start` in to run the app in development mode.

## Rules:

* Follow these [coding style guidelines](https://gist.github.com/davidguttman/9fbdd0e9ee1fb3b33f5cf693195f2edb#code-style).

* Do not add any additional modules/dependencies.

* Create a component `scatter.jsx` that will display the data from `props.dataset` in a scatter plot, and _at a minimum_:

  * Component takes its dimensions from `props.width` and `props.height`.

  * Each point in the scatter plot is an individual row (flower).

  * X axis is `petalWidth`, and Y axis is `petalLength`.

  * Color each point by `species` (e.g. virginica is blue, versicolor is green, setosa is orange).

  * On point hover, show all stats (`species`, `petalWidth`, `petalLength`, `sepalWidth`, and `sepalLength`).
