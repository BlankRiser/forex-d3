const Candle = (props: { data: any; x: any; candle_width: any; pixelFor: any }) => {
  const { data, x, candle_width, pixelFor } = props;

  const up = data.close > data.open;
  const bar_top = pixelFor(up ? data.close : data.open);
  const bar_bottom = pixelFor(up ? data.open : data.close);
  const bar_height = bar_bottom - bar_top;
  const wick_top = pixelFor(data.high);
  const wick_bottom = pixelFor(data.low);

  return (
    <>
      <rect
        x={x - candle_width / 2}
        y={bar_top}
        width={candle_width}
        height={bar_height}
        className={`
        stroke-1 
        ${up ? 'fill-green-400 stroke-green-400' : 'fill-red-400 stroke-red-400'}
        `}
      />
      <line
        className={`
        stroke-[1.5] ${up ? 'stroke-green-400' : 'stroke-red-400'}
        
       `}
        x1={x}
        y1={bar_top}
        x2={x}
        y2={wick_top}
      />
      <line
        className={`

        stroke-[1.5] ${up ? 'stroke-green-400' : 'stroke-red-400'}

      
          
        `}
        x1={x}
        y1={bar_bottom}
        x2={x}
        y2={wick_bottom}
      />
    </>
  );
};

export default Candle;
