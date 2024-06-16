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
          The Apple Macintosh—later rebranded as the Macintosh 128K—is the
          original Apple Macintosh personal computer. It played a pivotal role
          in establishing desktop publishing as a general office function. The
          motherboard, a 9 in (23 cm) CRT monitor, and a floppy drive were
          housed in a beige case with integrated carrying handle; it came with a
          keyboard and single-button mouse.
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
          iMac is a family of all-in-one Mac desktop computers designed and
          built by Apple Inc. It has been the primary part of Apple's consumer
          desktop offerings since its debut in August 1998, and has evolved
          through seven distinct forms
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
          The iPod is a discontinued series of portable media players and
          multi-purpose mobile devices designed and marketed by Apple Inc. The
          first version was released on October 23, 2001, about 8+1⁄2 months
          after the Macintosh version of iTunes was released. Apple sold an
          estimated 450 million iPod products as of 2022. Apple discontinued the
          iPod product line on May 10, 2022. At over 20 years, the iPod brand is
          the oldest to be discontinued by Apple
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
          iPhone is a line of smartphones produced by Apple Inc. that use
          Apple's own iOS mobile operating system. The first-generation iPhone
          was announced by then-Apple CEO Steve Jobs on January 9, 2007. Since
          then, Apple has annually released new iPhone models and iOS updates.
          As of November 1, 2018, more than 2.2 billion iPhones had been sold.
          As of 2022, the iPhone accounts for 15.6% of global smartphone market
          share
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
          The Apple Watch is a line of smartwatches produced by Apple Inc. It
          incorporates fitness tracking, health-oriented capabilities, and
          wireless telecommunication, and integrates with iOS and other Apple
          products and services
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
