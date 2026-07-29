# VDS Progress Summary Dashboard

A no-build static dashboard generated from **Summary Sheet of VDS.xlsx**.

## Publish on GitHub Pages

1. Open the `VDS-Progress-Summary` repository.
2. Upload all four files from this folder to the repository root:
   - `index.html`
   - `styles.css`
   - `app.js`
   - `data.js`
3. Commit the files.
4. Open **Settings → Pages**.
5. Under **Build and deployment**, select **Deploy from a branch**.
6. Select branch **main** and folder **/(root)**, then save.

The dashboard includes a reporting-period dropdown, KPI cards, district search, and the complete district summary table.

## Updating the data

Replace `data.js` whenever the Excel source is updated. The dashboard code itself does not need to change.
