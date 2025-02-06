---
series: Canvas — Lesson 1
type: gallery
title: Ithaca Paintball
description: Research Lab logos
color: F3E9F0
date: '2025-01-27'
author: 'Dantès'
categories:
  - sveltekit
  - svelte
published: true
---

<script>

  import Gallery from '$lib/components/Gallery.svelte'

  let images = [
    { url: 'paintball-01', caption: '' },
    { url: 'paintball-02', caption: '' },
    { url: 'paintball-03', caption: '' },
    { url: 'paintball-04', caption: '' },
    { url: 'paintball-05', caption: '' },
    { url: 'paintball-06', caption: '' },
    { url: 'paintball-07', caption: '' },
    { url: 'paintball-08', caption: '' },
    { url: 'paintball-09', caption: '' },
  ]

</script>

The <a href = ''> Learning + Recursion Lab </a> is a


<Gallery images = {images} />