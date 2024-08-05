import { ScrollShadow } from '@nextui-org/scroll-shadow';

import { AcademicCapIcon, BriefcaseIcon } from '@/components/ui/Icons';

import { Glowing } from '../ui';

const timelineData = [
  {
    year: '2016',
    title: "BEng at Xi'an Jiaotong-Liverpool University",
    description:
      'Conquered the fundamentals of engineering, mastering complex calculations and innovative problem-solving. Graduated with top marks and an impressive collection of late-night study hacks.',
    icon: 'academic',
    alignment: 'start',
  },
  {
    year: '2018',
    title: 'BEng at University of Liverpool',
    description:
      'Delved into advanced engineering concepts, leading group projects and acing exams. Engineered brilliant solutions and survived on a strict diet of fish and chips. Left with honors and an impressive Beatles playlist.',
    icon: 'academic',
    alignment: 'end',
  },
  {
    year: '2020',
    title: 'MSc at Imperial College London',
    description:
      'Mastered machine learning and discovered the secret coffee spots of London. Walked away with a degree and a habit of speaking in algorithms.',
    icon: 'academic',
    alignment: 'start',
  },
  {
    year: '2022',
    title: 'Software Engineer at AMD',
    description:
      'Enhanced GPU performance and optimized code, ensuring smooth graphics for gamers worldwide. Became a debugging ninja and a master of efficient code.',
    icon: 'briefcase',
    alignment: 'end',
  },
  {
    year: '2024',
    title: 'PhD at University of Oxford',
    description:
      "Currently decoding the universe's secrets and occasionally rowing on the Thames. Mixing groundbreaking research with tea breaks and punting adventures.",
    icon: 'academic',
    alignment: 'start',
  },
  {
    year: 'Present',
    icon: 'academic',
    alignment: 'start',
  },
];

export function Timeline() {
  return (
    <Glowing variant="container">
      <ScrollShadow hideScrollBar className="min-w-fit h-[60svh]">
        <ul className="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical">
          {timelineData.map((item, index) => (
            <li key={index}>
              <hr />
              <div className="timeline-middle">
                {item.icon === 'academic' ? (
                  <AcademicCapIcon />
                ) : (
                  <BriefcaseIcon />
                )}
              </div>
              <div
                className={`timeline-${item.alignment} ${item.alignment === 'start' ? 'md:text-end' : ''} mb-auto`}
              >
                <time className="font-mono italic">{item.year}</time>
                {item.title && (
                  <div className="text-lg font-black">{item.title}</div>
                )}
                {item.description && <div>{item.description}</div>}
              </div>
              <hr />
            </li>
          ))}
        </ul>
      </ScrollShadow>
    </Glowing>
  );
}
