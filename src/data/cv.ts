/*
 * CV content that has no home in a collection. Jobs come from the experience
 * collection and projects from the projects collection, so dates and facts
 * match the rest of the site.
 */

/** Served from public/; `npm run cv:pdf` regenerates it from the /cv page. */
export const CV_PDF = '/nelson-otazo-cv.pdf';

export const cv = {
  name: 'Nelson Otazo',
  headline: 'Senior Software Engineer · Laravel · Vue',
  location: 'Asunción, Paraguay · Remote',
  contact: [
    { label: 'nelson.otazo@gmail.com', href: 'mailto:nelson.otazo@gmail.com' },
    { label: 'linkedin.com/in/nelson-otazo', href: 'https://www.linkedin.com/in/nelson-otazo' },
    { label: 'nelson.otazo.com.py', href: 'https://nelson.otazo.com.py' },
  ],
  summary: [
    'Software engineer, backend focused, with 15+ years building scalable web products. I build and own production software end to end, including the AI parts, working remotely with US teams.',
    'A quick learner who prioritizes solid, elegant code, balancing technical excellence with simplicity.',
  ],
  skills: [
    { area: 'Architecture', items: 'REST APIs, layered design, vertical slices' },
    { area: 'Backend', items: 'PHP (Laravel, Filament, WinterCMS, Yii, Lumen)' },
    { area: 'Frontend', items: 'JavaScript, TypeScript, Vue.js, Nuxt, Inertia, HTML5, CSS3 (Tailwind, Bootstrap)' },
    { area: 'Testing', items: 'Pest, PHPUnit, test-driven development' },
    { area: 'Data & infrastructure', items: 'MySQL, PostgreSQL, Redis, AWS' },
    { area: 'Tools & process', items: 'Git, GitHub, Bitbucket, Jira, Confluence, Agile/Scrum' },
  ],
  education: [
    {
      school: 'Facultad Politécnica, Universidad Nacional de Asunción',
      degree: 'Bachelor of Computer Science (Systems Analysis emphasis), 7 semesters completed',
      years: '2009 – 2014',
    },
    {
      school: 'Colegio Técnico Nacional, Asunción',
      degree: 'Technical baccalaureate in Computer Science',
      years: '2005 – 2007',
    },
  ],
  languages: ['Spanish (native)', 'English (professional working)', 'Portuguese (elementary)'],
  certifications: ['Vueconf.US 2021', 'Laravel Advanced Course'],
};
