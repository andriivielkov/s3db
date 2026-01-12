# S3 Destination Builder Test

A universal cloud storage configuration builder built with React + TypeScript.

---

## 🚀 Run

```
git clone https://github.com/andriivielkov/s3db.git
```

```
cd s3db && npm install && npm run dev
```

## Build or Live Preview

`npm run build` or `npm run preview`

---

## 🏗 Architecture (DRY)

The project is fully driven by configuration files, without modifying JSX.

- `backend.data.js` — fields, validation rules, URL templates
- `ui.config.js` — icons, labels, layout

> As part of the test assignment, all styles are defined in a single place.  
> In a real project, styles could be split by components or features.  
> The main focus here is a **config-driven architecture**.

---

## 🛠 Features

- Dynamic form — AWS / GCP / Azure
- Async regions — API request simulation
- Data fields is grouped by `row-{n}` values for correct UI rendering
- Dual validation
  - Frontend: Yup / Formik
  - Mock backend: error on `error`, `bb`, or `aa`
- Container Queries — single-column layout under `< 500px`
- JSON Preview — generated config object with a valid URL

