# REST API

Merupakan API yang menggunakan protokol HTTP dan banyak digunakan sebagai standard pembuatan API. Ada 2 method yang sering membingungkan:

- `PATCH`: update partial field of resource `(approve, change status, etc)`
- `PUT`: update full field of resource

## Typical GET for list

Biasanya dikirimkan sebagai `query params`

- `sorting` sort=price_asc
- `filtering` category=thriller
- `pagination` page=2&limit=3
- offset

gunakan noun plural untuk url

## Response Status and Code

- `201` created
- `204` no content

- `404` not found, `ketika get/update/delete specific data dan gaada`
- `401` unauthorized
