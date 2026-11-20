export type Speaker = {
  name: string;
  title: string;
  topic: string;
  description: string;
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
  registrationStatus: 'open' | 'soon' | 'closed';
  highlights?: string[];
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
        topic: 'Tuoteajattelusta yhteiseen suuntaan',
        description: 'Miten teknologinen mahdollisuus muutetaan yhteiseksi, hyödylliseksi muutokseksi.',
        photo: '/images/speakers/jarkko-moilanen.png',
        linkedinUrl: 'https://www.linkedin.com/in/jarkkomoilanen/',
      },
      {
        name: 'Johannes Hovi',
        title: 'Asiantuntija',
        topic: 'Ymmärrys ennen ratkaisua',
        description: 'Miten yhteinen kieli ja konteksti auttavat tekemään parempia valintoja.',
        photo: '/images/speakers/johannes-hovi.jpg',
        linkedinUrl: 'https://www.linkedin.com/in/johannes-hovi-010909b/',
      },
      {
        name: 'Katri Harjuveteläinen',
        title: 'Asiantuntija',
        topic: 'Vastuullinen toteutus',
        description: 'Miten vastuullisuus pidetään mukana arjen päätöksissä ja toteutuksessa.',
        photo: '/images/speakers/katri-harjuvetelainen.png',
        linkedinUrl: 'https://www.linkedin.com/in/katriharjuvetelainen/',
      },
    ],
    agenda: [
      '5 min avaus',
      '3 × 10 min alustukset',
      '20 min keskustelu ja yleisökysymykset',
      '5 min yhteenveto',
    ],
    registrationStatus: 'soon',
    published: true,
  },
];

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
