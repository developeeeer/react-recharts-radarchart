import { PolarAngleAxis, Radar, RadarChart as RChart } from "recharts";

// レーダチャート設定
const EVALUATION_NAME_KEY = "EVALUATION_NAME";
const EVALUATION_POINT_KEY = "EVALUATION_POINT_KEY";
// ここの値によって隙間が空いたりする。？？
const GRID_PX_PITCH = 30;
const MAX_EVALUATION_POINT = 5;
const OUTER_RADIUS = GRID_PX_PITCH * MAX_EVALUATION_POINT;
const CHART_WIDTH_HEIGHT = 600;
const evaluationPitch: number[] = [];
for (let i = 1; i <= MAX_EVALUATION_POINT; i++) evaluationPitch.push(i);
const chartsGridData: { [key: string]: number[] } = {};
evaluationPitch.forEach(
  (pitch) =>
    (chartsGridData[pitch] = [
      (pitch - 1) * GRID_PX_PITCH + 1,
      pitch * GRID_PX_PITCH
    ])
);

export type Props = {
  evaluationItems: { [key: string]: 1 | 2 | 3 | 4 | 5 };
  radarFillOpacity?: string | number | undefined;
  gridFillOpacity?: string | number | undefined;
};

export const RadarChart = ({
  evaluationItems,
  radarFillOpacity = 0.7,
  gridFillOpacity = 0.4
}: Props) => {
  if (Object.keys(evaluationItems).length < 2)
    throw new Error("evaluationItems length 2 should be at least 2 in length");

  const data = Object.keys(evaluationItems).map((key) => {
    return Object.assign(
      {
        [EVALUATION_NAME_KEY]: key,
        [EVALUATION_POINT_KEY]: evaluationItems[key] * GRID_PX_PITCH
      },
      chartsGridData,
      {
        fullMark: MAX_EVALUATION_POINT
      }
    );
  });

  return (
    <RChart
      outerRadius={OUTER_RADIUS}
      width={CHART_WIDTH_HEIGHT}
      height={CHART_WIDTH_HEIGHT}
      data={data}
    >
      <PolarAngleAxis dataKey={EVALUATION_NAME_KEY} stroke="blue" />
      <Radar
        dataKey={EVALUATION_POINT_KEY}
        stroke="red"
        fill="green"
        fillOpacity={radarFillOpacity}
      />
      {evaluationPitch.map((pitch, i) => {
        return (
          <Radar
            key={i}
            dataKey={`${pitch}`}
            stroke="grey"
            fill="grey"
            fillOpacity={gridFillOpacity}
          />
        );
      })}
    </RChart>
  );
};
