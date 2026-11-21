---
slug: ai-osaa-lukea-dataasi-mutta-ymmartaaako-se-sita
title: AI osaa lukea dataasi. Mutta ymmärtääkö se sitä?
description: Tekoäly voi kysyä dataa, mutta ilman yhteisiä käsitteitä se voi antaa uskottavan vastauksen väärään kysymykseen.
type: expert-article
authorId: johannes-hovi
publishedAt: 2026-11-21
updatedAt: 2026-11-21
coverImage: /images/ai-meaning-in-motion.webp
tags:
  - semanttinen kerros
  - data
  - tekoäly
  - datahallinta
relatedEventId: ai-tarvitsee-muutakin-kuin-teknologiaa
draft: false
---

**Tekoäly osaa jo kysyä tietokannoilta ja muodostaa vastauksia luonnollisella kielellä. Mutta ymmärtääkö se, mitä organisaation data oikeasti tarkoittaa?**

Data-alustoihin voidaan nykyään kytkeä tekoälyavustaja, jolta kysytään esimerkiksi: ”Kuinka monta aktiivista asiakasta meillä on?” Tekoäly osaa tutkia tietokannan tauluja, muodostaa SQL-kyselyn ja laskea vastauksen.

Ongelma on, ettei tietokannan rakenteesta voi välttämättä päätellä, mitä aktiivinen asiakas tarkoittaa. Onko se asiakas, jolla on voimassa oleva sopimus? Joka on ostanut viimeisen kuuden kuukauden aikana? Lasketaanko konserni yhtenä asiakkaana vai jokainen tytäryhtiö erikseen?

Tekoäly saattaa löytää teknisesti oikean vastauksen väärään kysymykseen. Ja mikä pahinta, vastaus näyttää täysin uskottavalta.

## Miten tähän on päädytty?

Data-alustoja on rakennettu pitkään teknologia edellä. Dataa siirretään lähdejärjestelmistä, muunnetaan ja yhdistellään tietokantoihin. Kehitystä ohjaavat usein kiireelliset raportointitarpeet ja yksittäiset työpyynnöt.

Tietomallit, yhteiset käsitemääritelmät ja dokumentaatio ovat saattaneet jäädä vähälle huomiolle. Liiketoiminnan säännöt on usein kirjoitettu suoraan SQL-koodiin tai yksittäisiin raportteihin. Tieto siitä, miksi jokin luku lasketaan tietyllä tavalla, on vain muutaman asiantuntijan päässä.

Tämä on ollut ongelma jo perinteisessä raportoinnissa. Tekoälyn myötä siitä tulee entistä näkyvämpi: kun ihminen ei enää ole tulkitsemassa kysymystä ja valitsemassa oikeaa raporttia, puuttuva merkitys ei täydenny itsestään.

## Semanttinen kerros kertoo, mitä data tarkoittaa

Ratkaisuksi tarvitaan semanttinen kerros. Se yhdistää liiketoiminnan käyttämät käsitteet tietokantojen teknisiin rakenteisiin.

Semanttiseen kerrokseen kuuluu esimerkiksi käsitteiden ja KPI-mittareiden määritelmiä, datamalleja, laskentasääntöjä, metadataa sekä tietoa omistajuudesta ja vastuista.

Keskeinen osa on tietomalli (data model), joka kuvaa liiketoiminnan käsitteet ja niiden väliset suhteet. Asiakas tekee tilauksen, tilaus liittyy sopimukseen ja sopimus kuuluu tietylle organisaatiolle. Mallia voidaan rikastaa liiketoiminnan säännöillä ja linkittää tietokantojen tauluihin.

Pidemmälle vietynä käsitteitä, suhteita ja sääntöjä voidaan kuvata ontologiana, joka esittää merkitykset rakenteisessa, koneellisesti tulkittavassa muodossa. Knowledge graph puolestaan voi yhdistää nämä merkitykset konkreettisiin tietoihin ja niiden suhteisiin.

Kaiken tavoitteena on sama asia: tekoälylle annetaan datan lisäksi ymmärrys siitä, mitä data tarkoittaa.

## Kuka määrittelee aktiivisen asiakkaan?

Tässä tullaan olennaisimpaan kysymykseen. Microsoft, Databricks, Snowflake ja muut teknologiatoimittajat kehittävät nopeasti semanttisia kyvykkyyksiä. Teknologia pystyy tallentamaan määritelmiä ja tarjoamaan niitä tekoälyn käyttöön.

**Mutta teknologia ei voi päättää, mitä aktiivinen asiakas tarkoittaa juuri teidän liiketoiminnassanne.**

Se on liiketoiminnan päätös.

Ja vielä tärkeämpää on, mitä tapahtuu, kun määritelmä muuttuu. Jos aktiivisen asiakkaan rajaus muutetaan kuudesta kuukaudesta kahteentoista, miten tämä tieto päätyy data-alustalle? Kuka hyväksyy muutoksen? Kuka huolehtii siitä, että raportit, mittarit ja tekoälyavustajat käyttävät jatkossa samaa määritelmää?

Pelkkä dokumentoitu määritelmä ei riitä. Tarvitaan toimintamalli, jolla merkitykset pysyvät ajan tasalla.

Tämä muuttaa myös datatiimien roolia. Sen sijaan, että ne toteuttavat yksittäisiä raporttipyyntöjä, niiden pitäisi kehittää ja ylläpitää yhteisiä tietotuotteita yhdessä liiketoiminnan kanssa. Liiketoiminta vastaa tiedon merkityksestä ja datatiimi siitä, että määritelmät ovat johdonmukaisesti kaikkien niitä käyttävien järjestelmien saatavilla.

## Kolme asiaa, joita toimiva semanttinen kerros tarvitsee

1. **Yhteiset käsitteet ja määritelmät.** Liiketoiminta määrittelee, mitä asiat tarkoittavat, ja tiedon omistajat vastaavat niiden oikeellisuudesta.
2. **Teknologia.** Tietomallit, metadata ja laskentasäännöt yhdistetään dataan ja tuodaan raporttien sekä tekoälyn käyttöön.
3. **Jatkuva prosessi.** Muutokset päätetään, dokumentoidaan ja viedään hallitusti kaikkiin tietoa käyttäviin järjestelmiin.

Semanttinen kerros ei siis ole pelkkä tekninen komponentti tai kertaluonteinen projekti. Se on liiketoiminnan ja datatiimien yhteinen, jatkuvasti kehitettävä kyvykkyys.

**Tekoäly ei poista tarvetta sopia, mitä data tarkoittaa. Se tekee siitä entistä tärkeämpää.**

*Johannes Hovi, Ari Hovi / Hovi Competence Development Oy*

---

**AI ETTÄ! · 10.12.2026**

Johannes jatkaa aiheesta ensimmäisessä AI ETTÄ! -keskustelussa.

[Tutustu tapahtumaan](/tapahtumat/ai-tarvitsee-muutakin-kuin-teknologiaa/)
