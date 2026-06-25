## Fonts for front end

### Head snippet code

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=family=Figtree:ital,wght@0,300..900;1,300..900&family=Playfair+Display:ital,wght@0,400..900;1,400..900&" rel="stylesheet">
```
### Playfair Display: CSS class for a variable style. Use these for large headers

// <weight>: Use a value from 400 to 900
// <uniquifier>: Use a unique and descriptive class name
```css
.font-playfair-display {
  font-family: "Playfair Display", serif;
  font-optical-sizing: auto;
  font-weight: 400;
  font-style: normal;
}
```
### Figtree: CSS class for a variable style. Use this for body and UI copy. The bulk of the pages. 

// <weight>: Use a value from 300 to 900
// <uniquifier>: Use a unique and descriptive class name
```css
.font-figtree {
  font-family: "Figtree", sans-serif;
  font-optical-sizing: auto;
  font-weight: 400;
  font-style: normal;
}

/* Font stack variables, to start: */
:root {
    --font-serif: "Playfair Display", serif;
    --font-sans: "Figtree", sans-serif;
}
```