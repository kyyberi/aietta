export type Author = {
  id: string;
  name: string;
  role: string;
  bio: string;
  photo: string;
  linkedinUrl?: string;
  websiteUrl?: string;
};

export const authors: Author[] = [
  {
    id: 'jarkko-moilanen',
    name: 'Jarkko Moilanen',
    role: 'AI ETTÄ! -yhteisön perustaja',
    bio: 'Jarkko työskentelee datan, tekoälyn ja tuoteajattelun risteyksessä. Hän kokoaa yhteisöön ihmisiä, jotka haluavat viedä keskustelun teknologiasta kohti ihmisiä, käytäntöä ja todellista muutosta.',
    photo: '/images/speakers/jarkko-moilanen.webp',
    linkedinUrl: 'https://www.linkedin.com/in/jarkkomoilanen/',
    websiteUrl: 'https://jarkkomoilanen.com/',
  },
  {
    id: 'johannes-hovi',
    name: 'Johannes Hovi',
    role: 'Asiantuntija',
    bio: 'Johannes Hovi on AI ETTÄ! -tapahtumien asiantuntija-alustaja.',
    photo: '/images/speakers/johannes-hovi.webp',
    linkedinUrl: 'https://www.linkedin.com/in/johannes-hovi-010909b/',
  },
  {
    id: 'katri-harjuvetelainen',
    name: 'Katri Harjuveteläinen',
    role: 'Asiantuntija',
    bio: 'Katri Harjuveteläinen on AI ETTÄ! -tapahtumien asiantuntija-alustaja.',
    photo: '/images/speakers/katri-harjuvetelainen.webp',
    linkedinUrl: 'https://www.linkedin.com/in/katriharjuvetelainen/',
  },
];

export const getAuthor = (id: string) => authors.find((author) => author.id === id);
