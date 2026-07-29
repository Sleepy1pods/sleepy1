# Sleepy1 Frontend — Asset Requirements

This MVP ships **no photographic or third-party imagery**. Every "photo" placeholder in the
UI (pod exteriors/interiors, hub/location heroes, blog covers) is an original inline SVG
illustration (`PodVisual.vue`, `HubVisual.vue`) generated from brand-coloured gradients and
shapes. This avoids hotlinking or copying imagery (including from the Napyork reference
site) while keeping every screen visually complete.

Before a production launch, replace these illustrations with real photography/video per the
specs below. Nothing needs to be swapped in code beyond the `src`/`id` values passed to the
gallery and card components once real assets exist — see `src/data/locations.ts`,
`src/data/pods.ts`, and `src/data/blog.ts` for where each asset id is referenced.

## Brand & Identity

| Asset | Dimensions | Format | Notes |
|---|---|---|---|
| Logo mark (icon only) | 512×512 | SVG/PNG | Used in header, footer, favicon |
| Favicon | 32×32, 180×180 (apple-touch) | PNG/ICO | Place in `public/` |
| Social/OG share image | 1200×630 | JPG/PNG | For `og:image` meta tag (not yet wired, see `usePageMeta.ts`) |

## Hero & Marketing Photography

| Location | Recommended size | Aspect ratio | Notes |
|---|---|---|---|
| Home hero pod visual | 1200×1500 | 4:5 | Should show pod exterior + soft ambient light |
| Home promo video poster + video file | 1920×1080 | 16:9 | Referenced in `HomePromoVideo.vue` |
| About page story image | 1600×1200 | 4:3 | Founders/pod prototype imagery |
| Corporate/Pod Experience heroes | 1600×1200 | 4:3 | Business traveller context shots |

## Location Photography (per airport/hub)

| Asset | Recommended size | Aspect ratio | Notes |
|---|---|---|---|
| Location hero banner | 1920×1080 | 16:9 | Real terminal/hub photography, with permission |
| Location card thumbnail | 800×450 | 16:9 | Cropped from hero |
| Pod gallery images (×4 per location) | 1200×900 | 4:3 | Interior, exterior, desk/work mode, detail/control panel |

Replace the `heroImage` and `galleryImages` string ids in `src/data/locations.ts` with real
file paths under `src/assets/images/locations/<slug>/...` once available.

## Pod Photography

| Pod type | Recommended size | Aspect ratio | Notes |
|---|---|---|---|
| Solo Rest / Solo Work / Twin Lounge / Premium Suite | 1200×900 each (exterior + interior) | 4:3 | Update `image` field in `src/data/pods.ts` |

## Blog Cover Images

| Asset | Recommended size | Aspect ratio |
|---|---|---|
| Blog post cover | 1600×900 | 16:9 |

## Explicitly Out of Scope for This Build

- Any Napyork.com imagery, iconography, or layout assets — must never be copied or hotlinked.
- Stock photography of unrelated brands presented as Sleepy1 partners/press logos.
- Real airport partnership logos not confirmed by the business (see `src/data/press.ts`,
  which intentionally ships as placeholder-labelled content).
