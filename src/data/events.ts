export type Speaker = {
  name: string;
  title: string;
  topic: string;
  description: string;
  discussionPrompt?: string;
  photo?: string;
  linkedinUrl?: string;
  placeholder?: boolean;
};

export type Event = {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  startTime?: string;
  endTime?: string;
  dateLabel?: string;
  formatLabel?: string;
  timezone: string;
  speakers: Speaker[];
  agenda: string[];
  eventImage?: string;
  registrationUrl?: string;
  registrationFormId?: string;
  registrationCount?: number;
  registrationStatus: 'open' | 'soon' | 'closed';
  highlights?: string[];
  audience?: string[];
  planning?: boolean;
  published: boolean;
};

export const events: Event[] = [
  {
    id: 'ai-tarvitsee-muutakin-kuin-teknologiaa',
    slug: 'ai-tarvitsee-muutakin-kuin-teknologiaa',
    title: 'AI tarvitsee muutakin kuin teknologiaa',
    subtitle: 'Tuoteajattelu · yhteinen ymmärrys · vastuullinen toteutus',
    description:
      'Tekoälyn hyödyntäminen ei ratkea pelkästään teknisillä valinnoilla. Keskustelemme siitä, miten yhteinen ymmärrys, tuoteajattelu ja vastuullinen toteutus tekevät muutoksesta käytännöllistä.',
    startTime: '2026-12-10T11:00:00+02:00',
    endTime: '2026-12-10T12:00:00+02:00',
    timezone: 'Europe/Helsinki',
    speakers: [
      {
        name: 'Jarkko Moilanen',
        title: 'AI ETTÄ! -yhteisön perustaja',
        topic: 'AI-muutos edellyttää siirtymistä projekteista tuotteisiin',
        description:
          'Liiketoiminnan tavoitteista johdetaan käyttötapaukset, datatuotteet, yhteiset semanttiset kyvykkyydet ja uudelleenkäytettävät AI-tuotteet.',
        discussionPrompt: 'Miten omistajuus, rahoitus ja johtaminen muuttuvat?',
        photo: '/images/speakers/jarkko-moilanen.webp',
        linkedinUrl: 'https://www.linkedin.com/in/jarkkomoilanen/',
      },
      {
        name: 'Johannes Hovi',
        title: 'Asiantuntija',
        topic: 'Semanttinen kerros syntyy yhteistyöstä, ei teknologiasta',
        description: 'Miten liiketoiminta ja datatiimit rakentavat yhteistä ymmärrystä?',
        discussionPrompt: 'Miten datatiimien rooli muuttuu palvelupyyntöjen toteuttajasta tuotteiden kehittäjäksi?',
        photo: '/images/speakers/johannes-hovi.webp',
        linkedinUrl: 'https://www.linkedin.com/in/johannes-hovi-010909b/',
      },
      {
        name: 'Katri Harjuveteläinen',
        title: 'Asiantuntija',
        topic: 'Vaatimustenmukaisuus osaksi AI-tuotteen elinkaarta',
        description:
          'Miten EU:n AI Act, standardit ja eri markkinoiden vaatimukset huomioidaan jo tuotteiden suunnittelussa?',
        discussionPrompt: 'Miten vältetään jälkikäteen tehtävä vaatimustenmukaisuuden korjaaminen?',
        photo: '/images/speakers/katri-harjuvetelainen.webp',
        linkedinUrl: 'https://www.linkedin.com/in/katriharjuvetelainen/',
      },
    ],
    agenda: [
      '5 min avaus',
      '3 × 10 min alustukset',
      '20 min keskustelu ja yleisökysymykset',
      '5 min yhteenveto',
    ],
    audience: [
      'Tilaisuus on suunnattu suomalaisille liiketoiminnan, digitalisaation, datan ja tekoälyn kehittämisestä vastaaville johtajille ja asiantuntijoille. Erityisesti niille, jotka pohtivat, miten siirrytään yksittäisistä AI-hankkeista jatkuvasti kehitettäviin tuotteisiin, rakennetaan yhteistä ymmärrystä organisaatiorajojen yli ja huomioidaan tekoälyn vaatimustenmukaisuus osana kehittämistä.',
      'Keskustelussa yhdistyvät liiketoiminnan, tuotejohtamisen, arkkitehtuurin ja AI-hallinnan näkökulmat. Tilaisuus ei edellytä syvällistä teknistä osaamista.',
    ],
    registrationFormId: 'LYjR3h',
    registrationCount: 26,
    registrationStatus: 'open',
    published: true,
  },
  {
    id: 'tammikuun-2027-tapaaminen',
    slug: 'tammikuun-2027-tapaaminen',
    title: 'AI ETTÄ! -tapaaminen tammikuussa 2027',
    subtitle: 'Päivämäärä, agenda ja alustajat tarkentuvat.',
    description:
      'Valmistelemme AI ETTÄ! -yhteisön tammikuun 2027 tapaamista. Timo Lehtonen ja Jarkko Moilanen avaavat keskustelua AI:n roolista ohjelmistokehityksessä ja datatuotteiden rakentamisessa. Päivämäärä ja agenda tarkentuvat myöhemmin, ja etsimme vielä yhtä alustajaa.',
    dateLabel: 'Tammikuu 2027 · päivämäärä tarkentuu',
    formatLabel: 'Toteutustapa tarkentuu',
    timezone: 'Europe/Helsinki',
    speakers: [
      {
        name: 'Timo Lehtonen',
        title: 'AI arkkitehti',
        topic: 'AI koodaa, tarvitaanko tarkistusta?',
        description: 'Laki muuttuu, ja AI-agentit päivittävät julkishallinnon verkkopalvelun avointa lähdekoodia (Open Source). Ohjelmistotehtaan (Software Factory) kokoonpanolinjastolla (Assembly line) tehty muutos näyttää valmiilta — mutta voiko siihen luottaa?',
        discussionPrompt: 'Kuka tarkistaa AI:n työn – ja mistä tiedämme, että tarkistus riittää?',
        photo: '/images/speakers/timo-lehtonen.png',
      },
      {
        name: 'Jarkko Moilanen',
        title: 'AI ETTÄ! -yhteisön perustaja',
        topic: 'Tarvitaanko datatuotteen rakentamiseen enää ihmistä?',
        description: 'Miten liiketoimintadokumentista syntyy datatuote OpenMetadatan markkinapaikkaan? Miten AI löytää tarpeeseen sopivaa dataa, ja mitä AI-koodausavustaja saa Jira-tehtävässä?',
        discussionPrompt: 'Missä vaiheessa ihminen tarkistaa työn?',
        photo: '/images/speakers/jarkko-moilanen.webp',
        linkedinUrl: 'https://www.linkedin.com/in/jarkkomoilanen/',
      },
      {
        name: 'Avoin alustajapaikka 3',
        title: 'Kolmas näkökulma',
        topic: 'Mikä AI- tai data-aihe ansaitsee yhteisen keskustelun?',
        description: 'Tuo pöytään näkökulma, joka auttaa yhteisöä ajattelemaan aihetta uudella tavalla.',
        discussionPrompt: 'Ota yhteyttä ja jutellaan alustuksesta.',
        placeholder: true,
      },
    ],
    agenda: [],
    registrationStatus: 'soon',
    planning: true,
    published: true,
  },
];

export const getEventById = (id: string | null) => events.find((event) => event.id === id && event.published);

export const formatEventDate = (startTime: string) =>
  new Intl.DateTimeFormat('fi-FI', {
    weekday: 'long',
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Europe/Helsinki',
  }).format(new Date(startTime));
