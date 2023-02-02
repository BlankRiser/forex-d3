export const CrossHairs = (props: { x: any; y: any; chart_dims: any }) => {
  const { x, y, chart_dims } = props;

  if (x + y === 0) {
    return <></>;
  }

  return (
    <>
      <line x1={0} y1={y} x2={chart_dims.pixel_width} y2={y} className={` stroke-white/75`} />
      <line
        x1={x}
        y1={0}
        x2={x}
        y2={chart_dims.pixel_height}
        style={{
          strokeDasharray: 3,
        }}
        className={`stroke-white/75`}
      />
    </>
  );
};
