import * as React from "react";
import Paper from "@material-ui/core/Paper";
import { EventTracker, HoverState } from "@devexpress/dx-react-chart";
import {
  Chart,
  SplineSeries,
  ArgumentAxis,
  ValueAxis,
  Legend
} from "@devexpress/dx-react-chart-material-ui";
import { energyConsumption as data } from "./demo-data/data-vizualization";
import useCompareDebugger from "react-use-compare-debugger";

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
const LegendLabel = ({ hovered, text }) => (
  <div
    style={hovered ? hoveredLabelStyles : defaultLabelStyles}
  >
    {text}
  </div>
);

const itemStyles = {
  flexDirection: "column-reverse"
};
const LegendItem = (props) => <Legend.Item {...props} style={itemStyles} />;
const LegendLabelFac = hoverRef => {
  console.log("new LegendLabel component");
  return props => {
    console.log("rendering LegendLabel " + props.text);
    const hoveredSeriesName = hoverRef.current ? hoverRef.current.series : undefined;
    const hovered = hoveredSeriesName === props.text;
    //useCompareDebugger("LegendLabel", { ...props, hovered }, []);

    return <LegendLabel key={props.text} {...props} hovered={hovered}/>;
  };
};

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
  const legendLabel = React.useMemo(() => {
    return LegendLabelFac(hoverRef);
  }, [hoverRef]);

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
