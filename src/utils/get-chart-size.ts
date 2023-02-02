type Params = {
  container_width: number;
  chart_width?: number;
  padding?: number;
};

const DEFAULT_PADDING = 1; // 1 is 100% of the width
const DEFAULT_CHART_WIDTH = 0.9; // 90% of the width

export function getChartSize({
  container_width,
  chart_width = DEFAULT_CHART_WIDTH,
  padding = DEFAULT_PADDING,
}: Params) {
  return container_width * DEFAULT_CHART_WIDTH * padding;
}
