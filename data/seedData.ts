import { LabExperiment, Teacher, UserProfile } from '../types';

export const INITIAL_USER: UserProfile = {
  id: '',
  name: 'Guest Learner',
  email: '',
  role: 'student',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  college: 'Stanford Institute of Technology',
  grade: 'Junior Year - Physics & CS Major',
  xp: 0,
  completedLabsCount: 0,
};

export const SEED_EXPERIMENTS: LabExperiment[] = [
  {
    id: 'exp-phy-01',
    title: "Simple Pendulum & Gravity Acceleration (g)",
    subject: 'physics',
    difficulty: 'Beginner',
    duration: '35 mins',
    rating: 4.9,
    readsCount: 3420,
    image: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=600&auto=format&fit=crop&q=80',
    aim: 'To determine the acceleration due to gravity (g) at a location using a simple pendulum and plot the L vs T² graph.',
    theory: 'A simple pendulum consists of a small mass (bob) suspended by a light inextensible string. For small angular displacements (< 10°), the period T of a simple pendulum is given by T = 2π √(L/g), where L is length of pendulum and g is acceleration due to gravity. Squaring both sides yields T² = (4π²/g) * L.',
    apparatus: ['Retort Stand & Clamp', 'Light Inextensible String', 'Spherical Metallic Bob', 'Digital Vernier Caliper & Timer', 'Meter Scale'],
    procedure: [
      'Measure the radius of the metallic bob using the vernier caliper.',
      'Attach string to bob and clamp securely to stand at initial length L = 50 cm.',
      'Displace the bob by small angle (< 10 degrees) and release without push.',
      'Measure time taken for 10 complete oscillations using digital timer.',
      'Repeat trials for lengths L = 60cm, 70cm, 80cm, 90cm, and 100cm.',
      'Calculate periodic time T = (Time for 10 oscillations) / 10 and value of T².',
      'Plot L vs T² graph and find slope to calculate experimental g.'
    ],
    safetyInstructions: [
      'Ensure the clamp on the retort stand is tightly screwed.',
      'Do not displace the pendulum bob by more than 10 degrees to preserve simple harmonic motion approximations.',
      'Stand clear of the bob trajectory during oscillation.'
    ],
    observationHeaders: { col1: 'Length L (m)', col2: 'Time for 10 Osc (s)', col3: 'Calculated g (m/s²)' },
    defaultObservations: [
      { id: '1', trial: 1, variable1: '0.50', variable2: '14.20', calculatedResult: '9.79' },
      { id: '2', trial: 2, variable1: '0.60', variable2: '15.55', calculatedResult: '9.82' },
      { id: '3', trial: 3, variable1: '0.70', variable2: '16.80', calculatedResult: '9.80' },
      { id: '4', trial: 4, variable1: '0.80', variable2: '17.95', calculatedResult: '9.81' },
      { id: '5', trial: 5, variable1: '0.90', variable2: '19.04', calculatedResult: '9.78' },
    ],
    resultFormula: 'g = 4π² × (L / T²)',
    expectedResult: 'The value of acceleration due to gravity (g) is determined to be 9.81 m/s².',
    conclusion: 'The L vs T² graph is a straight line passing through origin, verifying T² ∝ L. Average value of g = 9.80 m/s², agreeing with theoretical constant.',
    aiExplanation: 'The force restoring the pendulum bob to its equilibrium point is proportional to sin(θ). For small angles sin(θ) ≈ θ in radians, producing linear harmonic motion independent of bob mass!',
    quiz: [
      {
        id: 'q1',
        question: 'What happens to the period T of a simple pendulum if the mass of the bob is doubled?',
        options: ['T doubles', 'T is quadrupled', 'T remains unchanged', 'T decreases by half'],
        correctAnswer: 2,
        explanation: 'Period T depends only on pendulum length L and gravity g (T = 2π√(L/g)), independent of bob mass.',
        type: 'mcq'
      },
      {
        id: 'q2',
        question: 'If the length of a simple pendulum is quadrupled (4L), its time period will:',
        options: ['Quadruple', 'Double', 'Halve', 'Remain constant'],
        correctAnswer: 1,
        explanation: 'Since T ∝ √L, √4 = 2, so the period doubles.',
        type: 'mcq'
      }
    ],
    vivaQuestions: [
      { q: 'Why must displacement angle be kept under 10 degrees?', a: 'Because sin(θ) ≈ θ approximation holds true only for small angles, ensuring linear simple harmonic motion.' },
      { q: 'Is the motion of a simple pendulum strictly SHM?', a: 'It is approximately SHM for small angular amplitudes.' }
    ]
  },
  {
    id: 'exp-chem-02',
    title: "Acid-Base Titration (HCl with NaOH)",
    subject: 'chemistry',
    difficulty: 'Intermediate',
    duration: '45 mins',
    rating: 4.85,
    readsCount: 2890,
    image: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=600&auto=format&fit=crop&q=80',
    aim: 'To determine the exact concentration (molarity) of an unknown Hydrochloric Acid (HCl) solution using 0.1M Sodium Hydroxide (NaOH) standard solution and Phenolphthalein indicator.',
    theory: 'Acid-base neutralization occurs when H+ ions from acid react with OH- ions from base to form H2O. Neutralization formula: M1 * V1 = M2 * V2, where M1/V1 are molarity/volume of acid, and M2/V2 are molarity/volume of base.',
    apparatus: ['50mL Precision Burette & Clamp', '25mL Volumetric Pipette', '250mL Conical Flask', '0.1M NaOH Solution', 'Unknown HCl Sample', 'Phenolphthalein Indicator'],
    procedure: [
      'Rinse burette with 0.1M NaOH solution and fill to 0.00 mL mark.',
      'Pipette 25.0 mL of unknown HCl solution into a clean conical flask.',
      'Add 2-3 drops of Phenolphthalein indicator into conical flask (solution remains colorless).',
      'Slowly add NaOH solution dropwise while constantly swirling conical flask.',
      'Stop titration when a faint permanent pink color persists for at least 30 seconds.',
      'Record final burette reading and repeat titration until 3 concordant readings are obtained.'
    ],
    safetyInstructions: [
      'Wear safety gloves and splash-proof chemical safety goggles at all times.',
      'Handle corrosive HCl and NaOH reagents with extreme care under fume hood.'
    ],
    observationHeaders: { col1: 'Trial No.', col2: 'Initial NaOH (mL)', col3: 'Concordant Vol NaOH (mL)' },
    defaultObservations: [
      { id: '1', trial: 1, variable1: '0.00', variable2: '24.80', calculatedResult: '0.0992 M' },
      { id: '2', trial: 2, variable1: '0.00', variable2: '25.00', calculatedResult: '0.1000 M' },
      { id: '3', trial: 3, variable1: '0.00', variable2: '25.00', calculatedResult: '0.1000 M' }
    ],
    resultFormula: 'M_acid = (M_base × V_base) / V_acid',
    expectedResult: 'Concentration of unknown HCl solution is calculated to be 0.100 M (±0.002M).',
    conclusion: 'Neutralization point reached at average 25.00 mL NaOH. Molarity of unknown HCl is confirmed as 0.100 M.',
    aiExplanation: 'Phenolphthalein turns pink at pH 8.2 - 10.0. Near equivalence point, 1 drop of NaOH causes rapid pH jump from 3 to 10!',
    quiz: [
      {
        id: 'q1',
        question: 'What color is Phenolphthalein indicator in strong acid solution?',
        options: ['Pink', 'Colorless', 'Deep Blue', 'Yellow'],
        correctAnswer: 1,
        explanation: 'Phenolphthalein remains colorless in acidic solution (pH < 8.2) and turns faint pink in basic media.',
        type: 'mcq'
      }
    ],
    vivaQuestions: [
      { q: 'What is the equivalence point in titration?', a: 'The point at which stoichiometry of added titrant exactly matches analyte in solution.' }
    ]
  },
  {
    id: 'exp-bio-03',
    title: "Microscope Inspection of Onion Peel Plant Cells",
    subject: 'biology',
    difficulty: 'Beginner',
    duration: '30 mins',
    rating: 4.92,
    readsCount: 4100,
    image: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?w=600&auto=format&fit=crop&q=80',
    aim: 'To prepare a temporary stained mount of onion peel epidermal cells and observe plant cell structures under compound light microscope.',
    theory: 'Plant cell walls are composed of rigid cellulose fibers providing structural support. Epidermal cells contain large central vacuoles, cell walls, distinct nuclei, and cytoplasm.',
    apparatus: ['Compound Microscope', 'Glass Slide & Coverslip', 'Safranin Staining Agent', 'Needle & Forceps', 'Fresh Onion Bulb', 'Filter Paper'],
    procedure: [
      'Peel a small thin epidermal membrane from inner side of onion scale leaf.',
      'Place peel in watch glass containing distilled water.',
      'Transfer peel onto clean glass slide and add 1-2 drops of Safranin stain.',
      'Gently lower coverslip with needle avoiding air bubble entrapment.',
      'Observe under low power (10x) objective, then switch to high power (40x).'
    ],
    safetyInstructions: [
      'Handle glass slides and coverslips with care to avoid glass cuts.',
      'Avoid staining skin or clothing with Safranin reagent.'
    ],
    observationHeaders: { col1: 'Magnification', col2: 'Visible Structure', col3: 'Organelle Note' },
    defaultObservations: [
      { id: '1', trial: 1, variable1: '100x', variable2: 'Cell Wall & Nucleus', calculatedResult: 'Rectangular grid layout' },
      { id: '2', trial: 2, variable1: '400x', variable2: 'Vacuole & Cytoplasm', calculatedResult: 'Distinct stained nucleolus' }
    ],
    resultFormula: 'Magnification = Eyepiece Lens × Objective Lens',
    expectedResult: 'Epidermal plant cells show regular rectangular cell walls and prominent stained nuclei.',
    conclusion: 'Onion epidermal tissue exhibits characteristic plant cell organization with prominent cell walls and eccentric nuclei.',
    aiExplanation: 'Safranin binds to lignin and cellulose, making cell walls and nuclei stand out under brightfield illumination!',
    quiz: [
      {
        id: 'q1',
        question: 'Which organelle is present in plant onion cells but absent in animal cells?',
        options: ['Cell Wall', 'Mitochondria', 'Nucleus', 'Ribosome'],
        correctAnswer: 0,
        explanation: 'Plant cells possess rigid cellulose cell walls outside cell membrane, which animal cells lack.',
        type: 'mcq'
      }
    ],
    vivaQuestions: [
      { q: 'Why is Safranin stain used?', a: 'To stain nucleic acids and cell wall polymers, creating contrast.' }
    ]
  },
  {
    id: 'exp-prog-04',
    title: "Binary Search Algorithm & Time Complexity Analysis",
    subject: 'programming',
    difficulty: 'Intermediate',
    duration: '40 mins',
    rating: 4.95,
    readsCount: 5200,
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&auto=format&fit=crop&q=80',
    aim: 'To implement the Binary Search algorithm in JavaScript/Python and compare its execution performance (O(log N)) against Linear Search (O(N)).',
    theory: 'Binary Search works on sorted arrays by repeatedly dividing search interval in half. Time complexity is O(log₂ N), significantly faster than linear search for large datasets.',
    apparatus: ['Web Code IDE Sandbox', 'JavaScript/Python Engine', 'Performance Timer API', 'Array Data Generator'],
    procedure: [
      'Initialize sorted array of 100,000 random integers.',
      'Define low = 0, high = length - 1.',
      'Calculate mid = Math.floor((low + high) / 2).',
      'Compare target with array[mid] and update low/high pointers accordingly.',
      'Record execution clock time in milliseconds.'
    ],
    safetyInstructions: [
      'Prevent infinite while loop condition by ensuring proper low/high pointer increments.'
    ],
    observationHeaders: { col1: 'Array Size N', col2: 'Linear Search Steps', col3: 'Binary Search Steps' },
    defaultObservations: [
      { id: '1', trial: 1, variable1: '1,000', variable2: '1,000 steps', calculatedResult: '10 steps' },
      { id: '2', trial: 2, variable1: '100,000', variable2: '100,000 steps', calculatedResult: '17 steps' },
      { id: '3', trial: 3, variable1: '1,000,000', variable2: '1,000,000 steps', calculatedResult: '20 steps' }
    ],
    resultFormula: 'Steps = log₂ (N)',
    expectedResult: 'Binary Search finds targets in under 20 iterations for 1,000,000 elements.',
    conclusion: 'Logarithmic O(log N) time efficiency confirmed. Binary Search outperforms linear scan by 50,000x on 1 million array size.',
    aiExplanation: 'By cutting search space in half each iteration, Binary Search handles exponentially large inputs with minimal operations!',
    quiz: [
      {
        id: 'q1',
        question: 'What is the precondition for executing Binary Search on an array?',
        options: ['Array must be sorted', 'Array must contain unique elements', 'Array size must be even', 'Array must contain positive numbers'],
        correctAnswer: 0,
        explanation: 'Binary Search relies on sorted order to discard half of remaining search space.',
        type: 'mcq'
      }
    ],
    vivaQuestions: [
      { q: 'What is worst-case time complexity of Binary Search?', a: 'O(log N) operations.' }
    ]
  },
  {
    id: 'exp-elec-05',
    title: "Ohm's Law & Resistor Circuit Analysis",
    subject: 'electronics',
    difficulty: 'Beginner',
    duration: '35 mins',
    rating: 4.88,
    readsCount: 3800,
    image: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=600&auto=format&fit=crop&q=80',
    aim: 'To verify Ohm’s Law V = I × R by measuring current I flowing through a fixed resistor R across varying applied voltages V.',
    theory: 'Ohm’s law states that current I passing through a conductor between two points is directly proportional to voltage V across the two points, provided physical conditions (temperature) remain constant.',
    apparatus: ['DC Power Supply (0-12V)', 'Fixed Resistors (100Ω, 220Ω, 1kΩ)', 'Digital Voltmeter', 'Digital Ammeter', 'Connecting Wires & Breadboard'],
    procedure: [
      'Connect resistor R = 100Ω in series with ammeter and DC variable power source.',
      'Connect voltmeter in parallel across resistor terminals.',
      'Vary power supply voltage from 2V to 12V in 2V increments.',
      'Record voltmeter V and ammeter I readings for each step.',
      'Plot V vs I graph and calculate slope = R.'
    ],
    safetyInstructions: [
      'Ensure DC power supply is switched OFF while making circuit connections.',
      'Do not exceed resistor power rating P = V²/R to prevent thermal damage.'
    ],
    observationHeaders: { col1: 'Voltage V (Volts)', col2: 'Current I (mA)', col3: 'Calculated R = V/I (Ω)' },
    defaultObservations: [
      { id: '1', trial: 1, variable1: '2.00', variable2: '20.0', calculatedResult: '100.0 Ω' },
      { id: '2', trial: 2, variable1: '4.00', variable2: '40.1', calculatedResult: '99.75 Ω' },
      { id: '3', trial: 3, variable1: '6.00', variable2: '60.0', calculatedResult: '100.0 Ω' },
      { id: '4', trial: 4, variable1: '8.00', variable2: '79.9', calculatedResult: '100.1 Ω' },
      { id: '5', trial: 5, variable1: '10.00', variable2: '100.0', calculatedResult: '100.0 Ω' }
    ],
    resultFormula: 'R = V / I',
    expectedResult: 'The calculated resistance R equals 100 Ω, matching nominal resistor value.',
    conclusion: 'Linear V vs I plot confirms Ohm’s Law (V ∝ I). Calculated slope yields circuit resistance R = 100 Ω.',
    aiExplanation: 'Voltage represents electrical potential pressure while resistance opposes electron flow. Their ratio determines current throughput!',
    quiz: [
      {
        id: 'q1',
        question: 'If voltage V across a 220Ω resistor is 11V, what current I flows through it?',
        options: ['0.05 A (50 mA)', '0.5 A', '2 A', '22 A'],
        correctAnswer: 0,
        explanation: 'I = V / R = 11V / 220Ω = 0.05 A = 50 mA.',
        type: 'mcq'
      }
    ],
    vivaQuestions: [
      { q: 'Does Ohm’s Law apply to semiconductors like LEDs?', a: 'No, semiconductor devices are non-ohmic with non-linear I-V characteristics.' }
    ]
  }
];

export const SEED_TEACHERS: Teacher[] = [
  {
    id: 'tch-01',
    name: 'Dr. Evelyn Reed',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80',
    qualification: 'Ph.D. in Applied Quantum Physics, MIT',
    specialization: 'Quantum Mechanics, Thermodynamics & Experimental Physics',
    subject: 'physics',
    experience: '12+ Years',
    languages: ['English', 'German', 'Spanish'],
    hourlyRate: 45,
    rating: 4.96,
    totalReviews: 128,
    bio: 'Former CERN researcher & passionate Physics educator. Specialized in making complex quantum physics concepts simple, visual, and intuitive through interactive digital experiments.',
    availability: ['Mon 10:00 AM', 'Wed 02:00 PM', 'Fri 11:00 AM', 'Sat 04:00 PM'],
    certificates: ['MIT Outstanding Educator Award', 'CERN Research Fellowship', 'Certified Virtual Physics Instructor'],
    reviews: [
      { id: 'r1', studentName: 'Marcus Vance', studentAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80', rating: 5, date: '2 days ago', comment: 'Dr. Reed explained pendulum harmonics so clearly! Her interactive lab breakdown helped me score 98% in my exam.' },
      { id: 'r2', studentName: 'Sarah Lin', studentAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80', rating: 5, date: '1 week ago', comment: 'Amazing session! Super structured and highly engaging.' }
    ]
  },
  {
    id: 'tch-02',
    name: 'Prof. Robert Chen',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&auto=format&fit=crop&q=80',
    qualification: 'M.Sc. Physical Chemistry, Oxford',
    specialization: 'Titration Chemistry, Electrochemistry & Kinetics',
    subject: 'chemistry',
    experience: '9+ Years',
    languages: ['English', 'Mandarin'],
    hourlyRate: 40,
    rating: 4.91,
    totalReviews: 95,
    bio: 'Dedicated Chemistry professor focused on practical laboratory skills, stoichiometric calculations, and visual titration techniques.',
    availability: ['Tue 09:00 AM', 'Thu 01:00 PM', 'Fri 03:00 PM'],
    certificates: ['Royal Society of Chemistry Fellow', 'Best Online STEM Mentor 2024'],
    reviews: [
      { id: 'r3', studentName: 'Emily Watson', studentAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&auto=format&fit=crop&q=80', rating: 5, date: '3 days ago', comment: 'Prof. Chen helped me master chemical equilibrium calculations in one hour!' }
    ]
  },
  {
    id: 'tch-03',
    name: 'Dr. Maya Patel',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&auto=format&fit=crop&q=80',
    qualification: 'Ph.D. Molecular Biology, Cambridge',
    specialization: 'Cell Biology, Genetics & Biotechnology',
    subject: 'biology',
    experience: '11+ Years',
    languages: ['English', 'Hindi'],
    hourlyRate: 42,
    rating: 4.94,
    totalReviews: 112,
    bio: 'Biotechnology researcher and educator empowering students with high-definition digital microscopy and DNA sequencing simulations.',
    availability: ['Mon 03:00 PM', 'Wed 10:00 AM', 'Sat 11:00 AM'],
    certificates: ['Cambridge Biology Excellence Award', 'Genomics Innovation Scholar'],
    reviews: [
      { id: 'r4', studentName: 'Daniel Kim', studentAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80', rating: 5, date: '4 days ago', comment: 'Loved the microscope cell lab walkthrough!' }
    ]
  },
  {
    id: 'tch-04',
    name: 'Alex Rivera',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&auto=format&fit=crop&q=80',
    qualification: 'M.S. Computer Science, Stanford',
    specialization: 'Algorithms, Data Structures & Python/JS',
    subject: 'programming',
    experience: '8+ Years',
    languages: ['English', 'Spanish'],
    hourlyRate: 50,
    rating: 4.98,
    totalReviews: 210,
    bio: 'Senior Software Engineer at Silicon Valley Tech & CS lecturer. Specializes in visual algorithm execution, Big-O optimization, and coding interviews.',
    availability: ['Tue 04:00 PM', 'Thu 05:00 PM', 'Sat 01:00 PM'],
    certificates: ['Stanford CS Teaching Fellow', 'AWS Certified Solutions Architect'],
    reviews: [
      { id: 'r5', studentName: 'Chloe Bennett', studentAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80', rating: 5, date: 'Yesterday', comment: 'Alex makes binary search and dynamic programming feel like child’s play!' }
    ]
  }
];
