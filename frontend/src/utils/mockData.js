export const mockElections = [
  {
    id: '1',
    title: 'Student Council Elections 2025',
    description: 'Annual student council elections for all positions',
    date: 'Dec 15-20, 2025',
    voters: 1250,
    status: 'live',
    liveViewers: 45,
    code: 'VOTE2025',
    organization: 'Springfield High School',
  },
  {
    id: '2',
    title: 'HOA Board Member Selection',
    description: 'Homeowners association board member election',
    date: 'Jan 10, 2026',
    voters: 340,
    status: 'draft',
    code: 'HOA2026',
    organization: 'Sunset Valley HOA',
  },
  {
    id: '3',
    title: 'Club President Elections',
    description: 'Annual club president and vice president elections',
    date: 'Nov 5-7, 2025',
    voters: 89,
    status: 'ended',
    code: 'CLUB2025',
    organization: 'Tech Innovation Club',
  },
];

export const mockPositions = [
  {
    id: 1,
    title: 'President',
    description: 'Lead the student council and represent students',
    candidates: [
      {
        id: 1,
        name: 'Sarah Johnson',
        party: 'Progressive Alliance',
        bio: 'Senior class president with 3 years experience',
      },
      {
        id: 2,
        name: 'Michael Chen',
        party: 'Student Voice',
        bio: 'Debate team captain and honor student',
      },
      {
        id: 3,
        name: 'Emma Davis',
        party: 'Independent',
        bio: 'Volunteer coordinator and community leader',
      },
    ],
  },
  {
    id: 2,
    title: 'Vice President',
    description: 'Support the president and manage committees',
    candidates: [
      {
        id: 4,
        name: 'James Wilson',
        party: 'Progressive Alliance',
        bio: 'Class treasurer and math club president',
      },
      {
        id: 5,
        name: 'Olivia Martinez',
        party: 'Student Voice',
        bio: 'Drama club president and arts advocate',
      },
    ],
  },
  {
    id: 3,
    title: 'Secretary',
    description: 'Maintain records and communications',
    candidates: [
      {
        id: 6,
        name: 'David Lee',
        party: 'Independent',
        bio: 'Yearbook editor and writing award winner',
      },
      {
        id: 7,
        name: 'Sophia Anderson',
        party: 'Progressive Alliance',
        bio: 'Journalism club head and school newspaper editor',
      },
      {
        id: 8,
        name: 'Ryan Thompson',
        party: 'Student Voice',
        bio: 'Technology coordinator and coding club founder',
      },
    ],
  },
];

export const mockResults = {
  President: [
    { name: 'Sarah Johnson', votes: 456, winner: true },
    { name: 'Michael Chen', votes: 398 },
    { name: 'Emma Davis', votes: 289 },
  ],
  'Vice President': [
    { name: 'James Wilson', votes: 612, winner: true },
    { name: 'Olivia Martinez', votes: 531 },
  ],
  Secretary: [
    { name: 'Sophia Anderson', votes: 423, winner: true },
    { name: 'Ryan Thompson', votes: 389 },
    { name: 'David Lee', votes: 331 },
  ],
};

export const generateElectionCode = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = '';
  for (let i = 0; i < 8; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
};
