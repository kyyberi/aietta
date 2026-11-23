# AI ETTÄ!

Staattinen Astro-sivusto, joka julkaistaan GitHub Pagesissa.

## Oivallukset-julkaisut

Oivallukset lisätään hyväksyttyinä Markdown-tiedostoina hakemistoon `src/content/oivallukset/`. Julkaisu näkyy sivustolla vasta, kun `draft` on `false`.

```md
---
slug: kirjoituksen-pysyva-osoite
title: Kirjoituksen otsikko
description: Lyhyt ingressi sekä hakukone- ja jakokuvaus.
type: event-insights # event-insights | expert-article | discussion
authorId: jarkko-moilanen
publishedAt: 2026-12-10
updatedAt: 2026-12-10
coverImage: /images/oivallukset/kirjoituksen-kuva.webp # suositus 1200 × 630 px
tags:
  - datatuotteet
  - tuoteajattelu
relatedEventId: ai-tarvitsee-muutakin-kuin-teknologiaa # tai null
draft: true
---

Kirjoituksen Markdown-sisältö tähän.
```

Kirjoittajat määritellään kerran tiedostossa `src/data/authors.ts`. Ennen julkaisemista järjestäjä tarkistaa tekstin, kirjoittajatiedot, kuvan käyttöoikeuden, tapahtumaviittauksen ja asettaa `draft: false`. Julkaisu tapahtuu normaalilla Git-commitilla ja GitHub Pages -deploylla; sivustossa ei ole automaattista asiantuntijajulkaisua tai CMS:ää.

## Ilmoittautuneiden määrän päivitys

Tapahtumasivu voi näyttää vahvistettujen ilmoittautuneiden määrän. Päivitä se paikallisesti MailerLite API:lla ja julkaise muutos normaalina Git-commitina:

```bash
MAILERLITE_API_TOKEN='…' MAILERLITE_FORM_ID='…' node tools/update-event-registration-count.mjs
```

`MAILERLITE_FORM_ID` on MailerLite API:n lomaketunniste. Se voi olla eri kuin sivulle upotetun lomakkeen tunniste. Tarkista tunniste MailerLite-hallinnasta tai Forms API:sta. Skripti laskee vain aktiiviset tilaajat, kirjoittaa luvun tapahtuman `registrationCount`-kenttään ja jättää API-avaimen Gitin ulkopuolelle. Lisää `--dry-run`, jos haluat vain tarkistaa määrän.
