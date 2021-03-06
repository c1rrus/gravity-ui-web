## Purpose

Displays an SVG `<symbol>` defined elsewhere in the document. The desired symbol is referenced by its `id`. Semantically, this element is equivalnet to HTML's `<img>` element. Additionally, the fill color of the graphic is [set to inherit the current CSS `color`](https://css-tricks.com/cascading-svg-fill-color/) of the parent element - in other words, the shape's color will match that of surrounding text automatically.

**Note**: Unless the referenced SVG symbol is being used for decorative purposes, it must have a `<title>` element with an `id` attribute, containing the text alternative (equivalent to the `alt` attribute on `<img>`). This is referenced by the `aria-labelledby` attribute in order to provide a text alternative for the inlined SVG.

**Note:** Most browsers will give this UI element a default size of `300px` × `150px` (the [default for "replaced elements"](https://www.sitepoint.com/replaced-elements-html-myths-realities/)), unless you override it via CSS. _This will happen regardless of the referenced `<symbol>`'s `viewBox` attribute value._ Instead, the referenced `<symbol>`'s aspect ratio will be preserved but, it will be scaled to fit the size of the outer `<svg>` container. If you set `width` and `height` attributes on the outer `<svg>` container, then they will set the _intrinsic_ size. After that, scaling behaves just like it would for an `<img>` (e.g. settings a different width via CSS, will scale the image proportionally).


## Background

While it is possible to use `<img src="some-image.svg" alt="Amazing SVG image!">` to display SVG images (just as you would for any other image format), [SVGs can also be inlined directly into the HTML](https://css-tricks.com/using-svg/#article-header-id-7). Assuming the inlined SVG is indeed a visible picture and thus semantcially equivalent to the HTML `<img>` element, a `role="img"` attribute should be added to indicate that.

One of the main reasons for inlining SVGs, is that the page's CSS can also style the SVG. This is especially useful for icons and logos. Combined with SVG's ability to define re-usable objects as `<symbols>` and then reference them via the `<use>` element, this has become the [preferred way to create icon systems](https://css-tricks.com/svg-symbol-good-choice-icons/) as it offers [many benefits over icon fonts](https://css-tricks.com/icon-fonts-vs-svg/).


## Usage in Gravity

Gravity's `gravity-ui-web` library provides a range of logos and icons as SVG `<symbol>`s in its `symbols.svg` file, which is intended to be inlined into HTML documents. This UI element is then used to display one of the available symbols.

Refer to _**Particles** > **Logos and Icons** > **SVG symbols**_ for a complete list of all available logos and icons and their respective IDs.


### Highlight colours

In addition to the default fill colour matching the text colour of wherever the inline SVG is used, Gravity allows SVG symbols to use up to 3 additional highlight fill colours. This enables SVGs to colour in parts of themselves. To do so, the SVG's elements may use the following classes:

| Class name       | Effect |
|------------------|--------|
| `.grav-svg-hl-1` | Sets the fill colour of that element to Gravity's **group B accent colour**. |
| `.grav-svg-hl-2` | Sets the fill colour of that element to Gravity's **group B alternative control colour**. |
| `.grav-svg-hl-3` | Sets the fill colour of that element to Gravity's **group B attention accent colour**. |

What colour value those colour purposes resolve to is determined by what colour scheme is being applied to the page (area) the SVG is inlined into.

## See also

* [WHATWG HTML5 specificaiton section on SVG](https://html.spec.whatwg.org/#svg-0)
* [W3C ARIA specification for `role="img"`](https://www.w3.org/TR/wai-aria-1.1/#img)
* [CSS Tricks article "How to Scale SVG"](https://css-tricks.com/scale-svg/)
