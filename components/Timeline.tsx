import { AcademicCapIcon, BriefcaseIcon } from '@heroicons/react/24/solid';
import { ScrollShadow } from '@nextui-org/scroll-shadow';

export default function Timeline() {
  const size = 18;

  return (
    <ScrollShadow
      hideScrollBar
      size={60}
      className="min-w-fit min-h-full xl:h-[50svh]"
    >
      <ul className="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical">
        <li>
          <div className="timeline-middle">
            <AcademicCapIcon width={size} height={size} />
          </div>
          <div className="timeline-start md:text-end mb-auto">
            <time className="font-mono italic">2016</time>
            <div className="text-lg font-black">
              BEng at Xi&apos;an Jiaotong-Liverpool University
            </div>
            Conquered the fundamentals of engineering, mastering complex
            calculations and innovative problem-solving. Graduated with top
            marks and an impressive collection of late-night study hacks.
          </div>
          <hr />
        </li>
        <li>
          <hr />
          <div className="timeline-middle">
            <AcademicCapIcon width={size} height={size} />
          </div>
          <div className="timeline-end mb-auto">
            <time className="font-mono italic">2018</time>
            <div className="text-lg font-black">
              BEng at University of Liverpool
            </div>
            Delved into advanced engineering concepts, leading group projects
            and acing exams. Engineered brilliant solutions and survived on a
            strict diet of fish and chips. Left with honors and an impressive
            Beatles playlist.
          </div>
          <hr />
        </li>
        <li>
          <hr />
          <div className="timeline-middle">
            <AcademicCapIcon width={size} height={size} />
          </div>
          <div className="timeline-start md:text-end mb-auto">
            <time className="font-mono italic">2020</time>
            <div className="text-lg font-black">
              MSc at Imperial College London
            </div>
            Mastered machine learning and discovered the secret coffee spots of
            London. Walked away with a degree and a habit of speaking in
            algorithms.
          </div>
          <hr />
        </li>
        <li>
          <hr />
          <div className="timeline-middle">
            <BriefcaseIcon width={size} height={size} />
          </div>
          <div className="timeline-end mb-auto">
            <time className="font-mono italic">2022</time>
            <div className="text-lg font-black">Software Engineer at AMD</div>
            Enhanced GPU performance and optimized code, ensuring smooth
            graphics for gamers worldwide. Became a debugging ninja and a master
            of efficient code.
          </div>
          <hr />
        </li>
        <li>
          <hr />
          <div className="timeline-middle">
            <AcademicCapIcon width={size} height={size} />
          </div>
          <div className="timeline-start md:text-end mb-auto">
            <time className="font-mono italic">2024</time>
            <div className="text-lg font-black">
              PhD at University of Oxford
            </div>
            Currently decoding the universe&apos;s secrets and occasionally
            rowing on the Thames. Mixing groundbreaking research with tea breaks
            and punting adventures
          </div>
          <hr />
        </li>
        <li>
          <hr />
          <div className="timeline-middle">
            <AcademicCapIcon width={size} height={size} />
          </div>
          <div className="timeline-start md:text-end mb-auto">
            <time className="font-mono italic">Present</time>
          </div>
        </li>
      </ul>
    </ScrollShadow>
  );
}
