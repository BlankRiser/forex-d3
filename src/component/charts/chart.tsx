import { useState } from 'react';

import * as d3 from 'd3';
import Candle from './candle';
import { CrossHairs } from './crosshairs';

const Chart = (props: { data: any; width: any; height: any }) => {
  const { data, width: chart_width, height: chart_height } = props;
  const [mouseCoords, setMouseCoords] = useState({
    x: 0,
    y: 0,
  });

  // find the high and low bounds of all the bars being sidplayed
  const allHigh: any[] = data.map((bar: any) => bar.high);
  const dollar_high: any = d3!.max(allHigh) * 1.05;

  const allLow: any[] = data.map((bar: any) => bar.low);
  const dollar_low: any = d3?.min(allLow) * 0.95;

  const chart_dims = {
    pixel_width: chart_width,
    pixel_height: chart_height,
    dollar_high,
    dollar_low,
    dollar_delta: dollar_high - dollar_low,
  };

  const dollarAt = (pixel: number) => {
    const dollar =
      (Math.abs(pixel - chart_dims.pixel_height) / chart_dims.pixel_height) * chart_dims.dollar_delta +
      chart_dims.dollar_low;

    return pixel > 0 ? dollar.toFixed(2) : '-';
  };

  const pixelFor = (dollar: number) => {
    return Math.abs(
      ((dollar - chart_dims['dollar_low']) / chart_dims['dollar_delta']) * chart_dims['pixel_height'] -
        chart_dims['pixel_height'],
    );
  };

  const onMouseLeave = () => {
    setMouseCoords({
      x: 0,
      y: 0,
    });
  };

  const onMouseMoveInside = (e: any) => {
    setMouseCoords({
      x: e.nativeEvent.x - Math.round(e.currentTarget.getBoundingClientRect().left),
      y: e.nativeEvent.y - Math.round(e.currentTarget.getBoundingClientRect().top),
    });
  };

  const onMouseClickInside = (e: { nativeEvent: { offsetX: any; offsetY: any } }) => {
    console.log(`Click at ${e.nativeEvent.offsetX}, ${e.nativeEvent.offsetY}`);
  };

  // calculate the candle width
  const candle_width = Math.floor((chart_width / data.length) * 0.7);

  return (
    <svg
      width={chart_width}
      height={chart_height}
      className='bg-neutral-800 text-white'
      onMouseMove={onMouseMoveInside}
      onClick={onMouseClickInside}
      onMouseLeave={onMouseLeave}
    >
      {data.map((bar: any, i: number) => {
        const candle_x = (chart_width / (data.length + 1)) * (i + 1);
        return <Candle key={i} data={bar} x={candle_x} candle_width={candle_width} pixelFor={pixelFor} />;
      })}
      <text x='10' y='16' fill='white' fontSize='10'>
        <tspan>
          Mouse: {mouseCoords.x}, {mouseCoords.y}
        </tspan>
        <tspan x='10' y='30'>
          Dollars: ${dollarAt(mouseCoords.y)}
        </tspan>
      </text>
      <CrossHairs x={mouseCoords.x} y={mouseCoords.y} chart_dims={chart_dims} />
    </svg>
  );
};

export default Chart;
