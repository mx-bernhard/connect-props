import * as React from "react";
import Paper from "@material-ui/core/Paper";
import { connectProps } from "@devexpress/dx-react-core";
import { EventTracker, HoverState } from "@devexpress/dx-react-chart";
import {
  Chart,
  SplineSeries,
  ArgumentAxis,
  ValueAxis,
  Legend
} from "@devexpress/dx-react-chart-material-ui";
import { energyConsumption as data } from "./demo-data/data-vizualization";

const rootStyles = {
  display: "flex",
  margin: "auto",
  flexDirection: "row"
};
const LegendRoot = (props) => <Legend.Root {...props} style={rootStyles} />;

const defaultLabelStyles = {
  marginBottom: "8px",
  whiteSpace: "nowrap",
  fontSize: "20px",
  color: "lightgray"
};
const hoveredLabelStyles = {
  ...defaultLabelStyles,
  color: "black"
};
const LegendLabel = ({ hoveredSeriesName, text }) => (
  <div
    style={hoveredSeriesName === text ? hoveredLabelStyles : defaultLabelStyles}
  >
    {text}
  </div>
);

const itemStyles = {
  flexDirection: "column-reverse"
};
const LegendItem = (props) => <Legend.Item {...props} style={itemStyles} />;
const LegendLabelFac = hoverRef => props => <LegendLabel {...props} hoveredSeriesName={hoverRef.current ? hoverRef.current.series : undefined} />;

export default (props) => {
  const [state, setState] = React.useState({
    data,
    hover: undefined
  });
  const hoverRef = React.useRef(undefined);

  const changeHover = React.useCallback(
    (hover) => {
      hoverRef.current = hover;
      setState(old => ({...old, hover}));
    },
    []
  );

  const { data: chartData, hover } = state;
  const legendLabel = React.useMemo(() => LegendLabelFac(hoverRef));

  return (
    <Paper>
      <Chart data={chartData}>
        <ArgumentAxis />
        <ValueAxis />

        <SplineSeries
          name="Hydro-electric"
          valueField="hydro"
          argumentField="country"
        />
        <SplineSeries name="Oil" valueField="oil" argumentField="country" />
        <SplineSeries
          name="Natural gas"
          valueField="gas"
          argumentField="country"
        />
        <SplineSeries name="Coal" valueField="coal" argumentField="country" />
        <SplineSeries
          name="Nuclear"
          valueField="nuclear"
          argumentField="country"
        />
        <Legend
          position="bottom"
          rootComponent={LegendRoot}
          itemComponent={LegendItem}
          labelComponent={legendLabel}
        />

        <EventTracker />
        <HoverState hover={hover} onHoverChange={changeHover} />
      </Chart>
    </Paper>
  );
};
