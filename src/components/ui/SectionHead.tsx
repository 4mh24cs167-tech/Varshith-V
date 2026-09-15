type SectionHeadProps = {
  num: string;
  label: string;
};

export function SectionHead({ num, label }: SectionHeadProps) {
  return (
    <div className="section-label">
      <span className="tnum">{num}</span>
      <span aria-hidden="true" className="section-label-slash">
        /
      </span>
      <span>{label}</span>
      <span aria-hidden="true" className="section-label-line" />
    </div>
  );
}