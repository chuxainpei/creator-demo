import { GraduateData } from '../../services/api';

const SampleDataTemplate: GraduateData[] = [
  {
    id: 'sample-1',
    name: 'Graduate A',
    graduationYear: 2026,
    degree: 'Bachelor of Science',
    major: 'Computer Science',
    employmentStatus: 'employed',
    company: 'Example Tech',
    salary: 75000,
    location: 'New York, NY'
  },
  {
    id: 'sample-2',
    name: 'Graduate B',
    graduationYear: 2026,
    degree: 'Bachelor of Arts',
    major: 'English Literature',
    employmentStatus: 'further_study',
    furtherStudyInstitution: 'Example University',
    furtherStudyProgram: 'Master of Fine Arts'
  },
  {
    id: 'sample-3',
    name: 'Graduate C',
    graduationYear: 2026,
    degree: 'Bachelor of Engineering',
    major: 'Mechanical Engineering',
    employmentStatus: 'unemployed',
    location: 'Chicago, IL'
  }
];

export default SampleDataTemplate;
