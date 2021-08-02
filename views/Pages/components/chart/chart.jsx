import React, { useEffect, useState } from 'react';
import { PieChart } from 'react-minimal-pie-chart';
import ReactTooltip from 'react-tooltip';
import { translate } from '../../../../utlis/translation';

const Chart = props => {
  const [data, setData] = useState([]);
  const [id, setId] = useState(null);

  useEffect(() => {
    let trs = [
      'draftDetails.chartTypeOne',
      'draftDetails.chartTypeTwo',
      'draftDetails.chartTypeThree',
      'draftDetails.chartTypeFour',
      'draftDetails.chartTypeFive'
    ];
    let colors = ['#81BD41', '#40C2CC', '#006C68', '#F3F3F3', '#FF4A4A'];
    let chartData = Object.values(props.data).map((el, i) => {
      return {
        title: translate(trs[i]),
        value: +el.replace('%', ''),
        color: colors[i],
        tooltip: translate(trs[i]) + ' ' + el
      };
    });

    setData(chartData);
  }, []);

  return (
    <div className="chart" data-tip="">
      <PieChart
        data={data}
        animate
        onMouseOver={(_, index) => {
          setId(index);
        }}
        onMouseOut={() => {
          setId(null);
        }}
      ></PieChart>
      <ReactTooltip
        getContent={() =>
          typeof id === 'number' && data ? data[id].tooltip : null
        }
      />
    </div>
  );
};

export default Chart;
