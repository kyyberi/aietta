export type Speaker = {
  name: string;
  title: string;
  topic: string;
  description: string;
  discussionPrompt?: string;
  photo?: string;
  linkedinUrl?: string;
};

export type Event = {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  startTime: string;
  endTime: string;
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
    registrationStatus: 'open',
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
