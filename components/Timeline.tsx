import { AcademicCapIcon, BriefcaseIcon } from "@heroicons/react/24/solid";

export default function Timeline() {
  const size = "20";

  return (
    <ul className="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical">
      <li>
        <div className="timeline-middle">
          <AcademicCapIcon width={size} height={size} />
        </div>
        <div className="timeline-start md:text-end mb-10">
          <time className="font-mono italic">2016</time>
          <div className="text-lg font-black">
            BEng at Xi&apos;an Jiaotong-Liverpool University
          </div>
          Placeholder
        </div>
        <hr />
      </li>
      <li>
        <hr />
        <div className="timeline-middle">
          <AcademicCapIcon width={size} height={size} />
        </div>
        <div className="timeline-end mb-10">
          <time className="font-mono italic">2018</time>
          <div className="text-lg font-black">
            BEng at University of Liverpool
          </div>
          Placeholder
        </div>
        <hr />
      </li>
      <li>
        <hr />
        <div className="timeline-middle">
          <AcademicCapIcon width={size} height={size} />
        </div>
        <div className="timeline-start md:text-end mb-10">
          <time className="font-mono italic">2020</time>
          <div className="text-lg font-black">
            MSc at Imperial College London
          </div>
          Placeholder
        </div>
        <hr />
      </li>
      <li>
        <hr />
        <div className="timeline-middle">
          <BriefcaseIcon width={size} height={size} />
        </div>
        <div className="timeline-end mb-10">
          <time className="font-mono italic">2022</time>
          <div className="text-lg font-black">Software Engineer at AMD</div>
          Placeholder
        </div>
        <hr />
      </li>
      <li>
        <hr />
        <div className="timeline-middle">
          <AcademicCapIcon width={size} height={size} />
        </div>
        <div className="timeline-start md:text-end mb-10">
          <time className="font-mono italic">2024</time>
          <div className="text-lg font-black">PhD at University of Oxford</div>
          Placeholder
        </div>
        <hr />
      </li>
      <li>
        <hr />
        <div className="timeline-middle">
          <AcademicCapIcon width={size} height={size} />
        </div>
        <div className="timeline-start md:text-end mb-10">
          <time className="font-mono italic">Present</time>
        </div>
      </li>
    </ul>
  );
}
