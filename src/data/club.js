// Single place to edit club content.

export const faculty = [
  { name: 'Faculty Coordinator 1', role: 'Faculty Coordinator', dept: 'Department of Information Technology' },
  { name: 'Faculty Coordinator 2', role: 'Faculty Coordinator', dept: 'Department of Information Technology' },
  { name: 'Faculty Coordinator 3', role: 'Faculty Coordinator', dept: 'Department of Information Technology' },
  { name: 'Faculty Coordinator 4', role: 'Faculty Coordinator', dept: 'Department of Information Technology' },
]

// Source: AI CLUB team structure PDF
export const president = { role: 'President', members: ['Harshal'] }
export const vicePresident = { role: 'Vice President', members: ['Tejaswini'] }

export const leads = [
  { domain: 'Finance', role: 'Finance Lead', members: ['Amit'] },
  { domain: 'Media', role: 'Media Lead', members: ['Parth', 'Sarthak'] },
  { domain: 'AI & Machine Learning (AIML)', role: 'AI/ML Lead', members: ['Tanishq', 'Siddheshwar'] },
  { domain: 'Generative AI (GenAI)', role: 'Gen-AI Lead', members: ['Prathmesh', 'Akash'] },
  { domain: 'Data Science', role: 'Data Science Lead', members: ['Sandesh'] },
  { domain: 'Design', role: 'Design Lead', members: ['Pooja', 'Mayur'] },
  { domain: 'Public Relations (PR)', role: 'PR Lead', members: ['Prerak', 'Shrishaily'] },
  { domain: 'Documentation', role: 'Documentation Lead', members: ['Roman'] },
  { domain: 'Events & Activities', role: 'Event & Activities Lead', members: ['Sanika', 'Shubham'] },
  { domain: 'Web Development', role: 'Technical Lead', members: ['Akshat', 'Sojval'] },
]

// Source: AI Club Coordinators PDF
export const coordinators = [
  { domain: 'Web Development', members: ['Sanika Takare'] },
  { domain: 'Data Science', members: ['Vedika Chaudhari', 'Sanjeev'] },
  { domain: 'AI & Machine Learning (AIML)', members: ['Sarvesh Channewar', 'Shreyash'] },
  { domain: 'Generative AI (GenAI)', members: ['Krishna Tripathi', 'Anushka Nayarkar', 'Mohit'] },
  { domain: 'Finance', members: ['Raghav Salunke', 'Pranjal More'] },
  { domain: 'Documentation', members: ['Aditi Bodke', 'Vishwajit Dagabaj', 'Tanisha Lal'] },
  { domain: 'Media', members: ['Tirthkak Patil','Ganesh'] },
  {
    domain: 'Events & Activities',
    members: ['Ruchika More', 'Swarupa Shingare', 'Ayush Pardhi', 'Hemanshu', 'Manmath'],
  },
  {
    domain: 'Public Relations (PR)',
    members: ['Ritu Ahlawat', 'Mohan', 'Aryan Uttarwar', 'Samarth', 'Nidhish', 'Ajay Ingle'],
  },
  // { domain: 'Editing', members: ['Ganesh'] },
  { domain: 'Design', members: ['Riddhi', 'Pranali'] },
]

// Add events here. Shape:
// { title, date: 'DD Mon YYYY', time, venue, description, link }
export const events = {
  past: [],
  ongoing: [],
  upcoming: [],
}

export const domains = [
  {
    title: 'AI & Machine Learning',
    text: 'Models, algorithms and the maths behind intelligent systems.',
    icon: '◈',
  },
  {
    title: 'Generative AI',
    text: 'LLMs, diffusion and prompt craft for building with generative tools.',
    icon: '✦',
  },
  {
    title: 'Data Science',
    text: 'From raw data to insight: analysis, visualisation and storytelling.',
    icon: '◉',
  },
  {
    title: 'Web & Technical',
    text: 'Shipping real products and bringing AI ideas to the browser.',
    icon: '⬡',
  },
]
