# Update the footer office and admin controls

## What will change
- Remove the “Est. 1994” label from the site header on every screen size.
- Replace the footer’s Abuja, Lagos, and Port Harcourt office list with one office: **Owerri, Imo State, Nigeria**.
- Add a dedicated editable footer entry to the existing admin content area.
- Let the administrator change the footer heading, office address, phone/email details, and legal notice using the existing fields.
- Keep the firm name and tagline connected to the existing editable firm entry.

## Live updates and fallback
- Footer edits will use the site’s existing live content refresh, so saved changes appear across public pages immediately.
- The built-in fallback will also identify Owerri as the only office, preventing old office locations from returning if content loading fails.

## Validation
- Confirm the admin can see and save the footer entry.
- Confirm the public footer shows only Owerri and no “Est. 1994” label on desktop and mobile.
- Check the site for build and browser errors.

## Technical details
- Store the footer entry as `global / footer` in the existing editable content table.
- Map its fields to footer heading, address, contact line, and regulatory/legal notice without adding a new admin system.
