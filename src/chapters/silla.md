---
series: Canvas — Lesson 1
title: King of Samhan
description: Second post.
date: '2025-01-27'
author: 'Dantès'
categories:
  - sveltekit
  - svelte
published: true
---

<script>
  import Counter from './counter.svelte'
</script>

### Introduction


Just an ordinary day in the kingdom of Silla.

The Silla kingdom was born on

Meanwhile, her husband **Chunchu (29)** and young son **Bupmin (6**) and daughter **Gotaso (5)** are preparing

Silla is a

Everything in life is determined by one’s rank.

The **Royals** run the affairs of the state, looking after the nation lik ea family.
The **Nobles** dominate politics, the military, and all avenues of public life.
The **6th Ranks** can become officials,
The **5th Rank** was a
The **4th Rank** was. a

Everything below that? Well, the **1st, 2nd**, and **3rd** Ranks may as well as not be human.
You could only really see them in the slave-quarters of rich families.

The Harmony Council convenes to discuss the next king.

&nbsp;
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <canvas id = 'canvas'></canvas>
</body>
</html>
```

&nbsp;
```css
/* style.css */
canvas{
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: black;
}
```

^ This means that the canvas should take up the entire screen, with a black background!

^^ This works well for fullscreen games, especially. We'll discuss "small-screen" canvas implementation later.


```js
// script.js
const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')
```

^ T

## Counter

<Counter />
