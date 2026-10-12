# Move website content to GitHub files, publish through Vercel

## What changes for you
- All website text, images and links (every section the admin edits today) move into a content file stored in your GitHub repository. The public site reads that file, so it loads on Vercel without the database.
- The admin page looks and works the same: same pages, sections, fields (eyebrow, title, subtitle, body, meta, bullets, image link, link, order). Add, edit, reorder and delete stay available. New: upload images directly (JPG/PNG/WebP, max 5 MB, with preview), and a "Publish" button with real status: saved draft → committed to GitHub → Vercel deploying → live.
- Consultation messages stay in the current secure database (your choice). They are never written to public files. WhatsApp redirect still happens only after the message saves.
- The admin signs in with the same email. Login becomes a real database account with an admin role, so it also works from Vercel.
- Nothing in the database is deleted. The old content stays as a backup until you approve removing it.

## Steps
1. **Audit and export.** Read the live content records and the admin fields. Generate the content file from them, keeping field names and order, and write a check that compares every record and field against the database (counts plus field-by-field). Check that every image link still resolves.
2. **Public site reads the file.** Swap only the content loader. Design, pages, animations and fallbacks stay unchanged. The live database refresh is removed for content.
3. **Admin editor on the file.** The editor is built from the fields found in step 1, not a fixed list. Drafts are kept in the browser and clearly marked "not published".
4. **Secure publish endpoint.** It checks the signed-in admin on the server, validates the content and images, then commits the content file plus new images (to an uploads folder) to your repository and branch. The GitHub key exists only in Vercel's private settings.
5. **Deploy status.** Shows the GitHub commit and, if a Vercel key is provided, the real Vercel deployment state.
6. **Messages inbox.** Visitors can only add messages. Only the signed-in admin can read or delete them.
7. **Vercel build setup.** Set up the build so it runs on Vercel's servers.
8. **Guide for you.** Step-by-step clicks to create the GitHub key and add the Vercel settings.

## What I need from you, and what I can't do from here
- Your repository's full name including the owner (for example `yourname/o.o.kalu-associates`) and the branch name. Also connect GitHub to this project (+ menu → GitHub).
- You add the keys in Vercel yourself; I'll provide the guide.
- I can't open your Vercel account, so the final checks (the deploy succeeds and the live site shows a published edit) are done by you following a short checklist. I'll test everything else here.

## Technical details
- Content file: `content/site-content.json` = `{ version, exportedAt, rows: ContentRow[] }`, using the same shape as the `site_content` table. Imported at build time, so changes go live with each Vercel deploy.
- Export script plus a verification script (`scripts/verify-content.ts`) that reports differences against the database.
- Auth: email/password account plus a `user_roles` table and a `has_role()` check. Messages table rules: anyone may add, only the admin may read or delete. Browser client with the publishable key only, so Vercel needs no secret database key.
- Publish route `src/routes/api/publish.ts`: checks the sign-in token with `getClaims` and the admin role, validates with zod, commits through GitHub's Git Data API (blobs → tree → commit → ref update). Vercel settings: `GITHUB_TOKEN`, `GITHUB_REPO`, `GITHUB_BRANCH`, optional `VERCEL_TOKEN` and `VERCEL_PROJECT_ID`.
- Build target switched to the Vercel preset; Lovable hosting may stop serving this project once that is done.
