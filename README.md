# Yareyareyaze

## Updating Content

### Hero Banner

Hero banner content can be updated from [`_data/hero.yml`](/_data/hero.yml).

### Contacts

Contact information can be updated from [`_data/contacts.yml`](/_data/contacts.yml).

### Projects

Each project is contained within individual files in [`_posts`](/_posts/). To add a new project entry, create a new file with the filename format `YYYY-MM-DD-<name>`.

The top of the file must contain the preprocessing block as follows:

```
---
layout: project
title: Project Title
tagline: A cool project tagline
tile_image: https://placehold.co/256
header_image: https://placehold.co/1920x240/
---
```

You may replace the title, tagline, tile_image, and header_image with text/images of your choice.

## Deployment

Deploy via GitHub Pages by cloning this repository to your GitHub Pages repository (i.e. `yareyareyaze@github.io`).
