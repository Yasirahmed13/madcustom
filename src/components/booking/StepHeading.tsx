/** The heading and sub-line at the top of each wizard step. */
export function StepHeading({ heading, sub }: { heading: string; sub: string }) {
  return (
    <>
      <h3 className="font-display m-0 mb-1.5 text-[26px] tracking-[.01em] uppercase">
        {heading}
      </h3>
      <p className="text-bone-55 m-0 mb-[22px] text-[14px]">{sub}</p>
    </>
  );
}
