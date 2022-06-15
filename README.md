# React Turbo

[![npm](https://img.shields.io/npm/v/react-turbo?style=flat-square)](https://www.npmjs.com/package/react-turbo)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/react-turbo?style=flat-square)](https://bundlephobia.com/result?p=react-turbo)
[![npm type definitions](https://img.shields.io/npm/types/typescript?style=flat-square)](https://github.com/oney/react-turbo/blob/master/src/index.tsx)
[![GitHub](https://img.shields.io/github/license/oney/react-turbo?style=flat-square)](https://github.com/oney/react-turbo/blob/master/LICENSE)

## The ultimate solution for React performance optimization

`react-turbo` transforms your React apps to have truly **fine-grained reactivity**, so you don't need to worry about performance optimization anymore.

## Installatoin

`react-turbo` comes with a babel plugin, so the prerequisite is `react-app-rewired`. Follow the steps of [`react-app-rewired`](https://github.com/timarney/react-app-rewired) and [`customize-cra`](https://github.com/arackaf/customize-cra).

```
npm i --save-dev react-app-rewired customize-cra
```
Modify `package.json`, add `config-overrides.js` and `.babelrc`.

Then, install `react-turbo` and the plugin
```
npm i --save-dev babel-plugin-react-turbo
npm i react-turbo
```
Modify `.babelrc`
```
{
  "plugins": ["babel-plugin-react-turbo"]
}
```
You can see all changes of installation in [this commit](https://github.com/oney/react-turbo-demo/commit/0158d28896468162636daba3aaf7431a7b3d03b4).
