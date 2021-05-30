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
import { energyConsumption as data } from "../../../demo-data/data-vizualization";

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

export default (props) => {
  const state = React.useState({
    data,
    hover: undefined
  });

  const changeHover = React.useCallback(
    (hover) => this.setState({ hover }),
    []
  );

  const legendLabel = connectProps(LegendLabel, () => {
    const { hover } = state;
    const hoveredSeriesName = hover ? hover.series : undefined;
    return {
      hoveredSeriesName
    };
  });
  React.useEffect(() => legendLabel.update(), [legendLabel]);

  const { data: chartData, hover } = state;

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
