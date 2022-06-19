# React Turbo (beta)

[![npm](https://img.shields.io/npm/v/react-turbo?style=flat-square)](https://www.npmjs.com/package/react-turbo)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/react-turbo?style=flat-square)](https://bundlephobia.com/result?p=react-turbo)
[![npm type definitions](https://img.shields.io/npm/types/typescript?style=flat-square)](https://github.com/oney/react-turbo/blob/master/src/index.tsx)
[![GitHub](https://img.shields.io/github/license/oney/react-turbo?style=flat-square)](https://github.com/oney/react-turbo/blob/master/LICENSE)

Please do not use this in production. The project is still in development and not well tested.

## The ultimate solution for React performance optimization

`react-turbo` transforms your React apps to have truly **fine-grained reactivity**, so you don't need to worry about React performance optimization anymore. Read [this article](https://medium.com/@anokyy/react-turbo-the-ultimate-solution-to-optimize-react-performance-b666ca9db0b5) to know more.

## Installatoin

`react-turbo` comes with a babel plugin, so the prerequisite is `react-app-rewired`. If you've installed it, you can skip and jump to install `react-turbo`.

### Install `react-app-rewired` and `customize-cra`

Follow the steps of [`react-app-rewired`](https://github.com/timarney/react-app-rewired) and [`customize-cra`](https://github.com/arackaf/customize-cra).

```
npm i --save-dev react-app-rewired customize-cra
```
Modify `package.json`, add `config-overrides.js` and `.babelrc`.

### Install `react-turbo` and the plugin
```
npm i react-turbo
npm i --save-dev babel-plugin-react-turbo
```
Modify `.babelrc`
```
{
  "plugins": ["babel-plugin-react-turbo"]
}
```
You can see all changes of installation in [this commit](https://github.com/oney/react-turbo-demo/commit/0158d28896468162636daba3aaf7431a7b3d03b4).

## [Example](https://github.com/oney/react-turbo-demo)

```jsx
function expensiveRandom(a) {
  let k = 0;
  for (let i = 0; i < 10_000_000; i++) k += Math.random();
  console.log('expensiveRandom:', k);
  return a;
}

function App() {
  const [a, setA] = useState(1000);
  const [b, setB] = useState(1000);

  return (
    <div className="App">
      <input value={a} type="number"
        onChange={(e) => setA(parseInt(e.target.value))}/>
      <span>{expensiveRandom(a)}</span>
      <input value={b} type="number"
        onChange={(e) => setB(parseInt(e.target.value))}/>
      <span>{b}</span>
    </div>
  );
}
```

`expensiveRandom` contains some expensive calculation. When `a` or `b` changes, the component will re-render. The rendering will be stuck because it hits `<span>{expensiveRandom(a)}</span>`.

With `react-turbo`, when `b` changes, only the elements that depend on `b` will re-render (`<input value={b}` and `<span>{b}</span>`), so `expensiveRandom(a)` won't be executed.

Note that, `react-turbo` happens in compile time with babel, so you don't need to modify any code to get it work.

## babel-plugin-react-turbo

https://www.npmjs.com/package/babel-plugin-react-turbo

## Details

The above example will be compiled to something like

```jsx
function App() {
  const [$a, setA] = useAtom(1000);
  const [$b, setB] = useAtom(1000);

  return (
    <div className="App">
      <Controller a={$a}>
        {({a}) => (
          <input value={a} type="number"
            onChange={(e) => setA(parseInt(e.target.value))}/>
        )}
      </Controller>
      <Controller a={$a}>
        {({a}) => <span>{expensiveRandom(a)}</span>}
      </Controller>
      <Controller b={$b}>
        {({b}) => (
          <input value={b} type="number"
            onChange={(e) => setB(parseInt(e.target.value))}/>
        )}
      </Controller>
      <Controller b={$b}>
        {({b}) => <span>{b}</span>}
      </Controller>
    </div>
  );
}
```
So no matter how fast `b` changes, the elements depending on `a` won't re-render.

`$a` and `$b` are observable atoms like [Recoil](https://recoiljs.org/), [Jotai](https://jotai.org/) or [effector](https://effector.dev/).
