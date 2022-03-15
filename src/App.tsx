import "./styles.css";
import { RadarChart as Success } from "./SuccessRadarChart";
import { RadarChart as Failed } from "./FailedRadarChart";

const sampleData: { [key: string]: 1 | 2 | 3 | 4 | 5 } = {
  国語: 2,
  数学: 5,
  社会: 3,
  理科: 4,
  英語: 3
};

export default function App() {
  return (
    <div className="App">
      <h1>Recharts Radar-Chartで隙間ができる</h1>
      <p>※各コンポーネントのGRID_PX_PITCHをいじると動作確認できます・・・</p>
      <p>SuccessRadarChart:隙間なし例</p>
      <p>FailedRadarChart:隙間あり例</p>
      <div className="ChartContainer">
        <div>
          <Success evaluationItems={sampleData} />
          <p>↑グラフグリッドピッチが32px</p>
        </div>
        <div>
          <Failed evaluationItems={sampleData} />
          <p>↑グラフグリッドピッチが30px</p>
        </div>
      </div>
    </div>
  );
}
