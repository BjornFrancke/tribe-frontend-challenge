# tribe-frontend-challenge

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
yarn
```

### Compile and Hot-Reload for Development

```sh
yarn dev
```

### Type-Check, Compile and Minify for Production

```sh
yarn build
```

# Challenge: Shopping basket

By using only Vue.js and no other dependencies, create a small application that handles like a shopping basket.
Upload to CodeSandbox, JSFiddle or similar to share the application when done.

Requirements:
- Show a list of clickable items (ie. foods like burger, pizza, pasta etc)
- When clicking on an item, the item should be added to the shopping basket
- If the item already exists in the shopping basket, the item should only be shown only once and with a number indicating the quantity of that item
- It should be possible to add and remove items from the shopping basket one by one (ie with +/- buttons)
- It should be possible to clear the whole shopping basket
- Each item should have a unique price and the shopping basket should always show the total amount of the value of the items in the basket

Happy coding!
