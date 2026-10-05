# Homepage visual and content updates

## What will change

- Give the homepage Practice Areas and Recent Writing sections a clearly separated, bordered grid treatment against a contrasting section background.
- Replace the static Meet Our Team cards with a responsive, touch-friendly slideshow using the attorneys’ large portrait photos, names, roles, and focus areas.
- Replace case emojis with responsive editorial images. Case images will come from each case row’s existing image URL field, so administrators can change them; local site images will remain as fallbacks.
- Replace the statistics strip containing “180+” with a responsive contact strip: firm phone and email on the left, Owerri location on the right.
- Preserve current admin editing and live content refresh behavior.

## Technical details

- Add a focused team carousel component using the site’s existing accessible carousel controls.
- Extend the case display data with an optional image and render it in the existing cases carousel.
- Read attorney and case `image_url` values from editable site content, falling back to bundled portraits and case imagery.
- Read phone, email, and location from the existing editable global/footer content rows.
- Verify the homepage on desktop and mobile, including carousel controls, image rendering, and current build status.
