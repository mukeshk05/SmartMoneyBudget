import React from "react";
import {ResponsivePieCanvas} from "@nivo/pie";



class FixedExpanceChart extends React.Component {
  render() {
      const data=[
        {
          "id": "haskell",
          "label": "haskell",
          "value": 502,
          "color": "hsl(288, 70%, 50%)"
        },
        {
          "id": "stylus",
          "label": "stylus",
          "value": 257,
          "color": "hsl(160, 70%, 50%)"
        },
        {
          "id": "ruby",
          "label": "ruby",
          "value": 129,
          "color": "hsl(328, 70%, 50%)"
        },
        {
          "id": "hack",
          "label": "hack",
          "value": 55,
          "color": "hsl(320, 70%, 50%)"
        },
        {
          "id": "lisp",
          "label": "lisp",
          "value": 198,
          "color": "hsl(235, 70%, 50%)"
        },
        {
          "id": "php",
          "label": "php",
          "value": 569,
          "color": "hsl(358, 70%, 50%)"
        },
        {
          "id": "java",
          "label": "java",
          "value": 336,
          "color": "hsl(251, 70%, 50%)"
        },
        {
          "id": "erlang",
          "label": "erlang",
          "value": 66,
          "color": "hsl(111, 70%, 50%)"
        },
        {
          "id": "scala",
          "label": "scala",
          "value": 219,
          "color": "hsl(188, 70%, 50%)"
        },
        {
          "id": "elixir",
          "label": "elixir",
          "value": 488,
          "color": "hsl(285, 70%, 50%)"
        },
        {
          "id": "c",
          "label": "c",
          "value": 319,
          "color": "hsl(129, 70%, 50%)"
        },
        {
          "id": "javascript",
          "label": "javascript",
          "value": 80,
          "color": "hsl(327, 70%, 50%)"
        },
        {
          "id": "rust",
          "label": "rust",
          "value": 176,
          "color": "hsl(258, 70%, 50%)"
        },
        {
          "id": "go",
          "label": "go",
          "value": 381,
          "color": "hsl(183, 70%, 50%)"
        },
        {
          "id": "python",
          "label": "python",
          "value": 239,
          "color": "hsl(279, 70%, 50%)"
        },
        {
          "id": "sass",
          "label": "sass",
          "value": 332,
          "color": "hsl(261, 70%, 50%)"
        },
        {
          "id": "css",
          "label": "css",
          "value": 549,
          "color": "hsl(267, 70%, 50%)"
        },
        {
          "id": "make",
          "label": "make",
          "value": 352,
          "color": "hsl(248, 70%, 50%)"
        }
      ];
    return (
        <ResponsivePieCanvas
            data={data}
            margin={{ top: 40, right: 200, bottom: 40, left: 80 }}
            pixelRatio={1}
            innerRadius={0.5}
            padAngle={0.7}
            cornerRadius={3}
            colors={{ scheme: 'paired' }}
            borderColor={{ from: 'color', modifiers: [ [ 'darker', 0.6 ] ] }}
            radialLabelsSkipAngle={10}
            radialLabelsTextXOffset={6}
            radialLabelsTextColor="#333333"
            radialLabelsLinkOffset={0}
            radialLabelsLinkDiagonalLength={16}
            radialLabelsLinkHorizontalLength={24}
            radialLabelsLinkStrokeWidth={1}
            radialLabelsLinkColor={{ from: 'color' }}
            slicesLabelsSkipAngle={10}
            slicesLabelsTextColor="#333333"
            animate={true}
            motionStiffness={90}
            motionDamping={15}
            defs={[
              {
                id: 'dots',
                type: 'patternDots',
                background: 'inherit',
                color: 'rgba(255, 255, 255, 0.3)',
                size: 4,
                padding: 1,
                stagger: true
              },
              {
                id: 'lines',
                type: 'patternLines',
                background: 'inherit',
                color: 'rgba(255, 255, 255, 0.3)',
                rotation: -45,
                lineWidth: 6,
                spacing: 10
              }
            ]}
            fill={[
              {
                match: {
                  id: 'ruby'
                },
                id: 'dots'
              },
              {
                match: {
                  id: 'c'
                },
                id: 'dots'
              },
              {
                match: {
                  id: 'go'
                },
                id: 'dots'
              },
              {
                match: {
                  id: 'python'
                },
                id: 'dots'
              },
              {
                match: {
                  id: 'scala'
                },
                id: 'lines'
              },
              {
                match: {
                  id: 'lisp'
                },
                id: 'lines'
              },
              {
                match: {
                  id: 'elixir'
                },
                id: 'lines'
              },
              {
                match: {
                  id: 'javascript'
                },
                id: 'lines'
              }
            ]}
            legends={[
              {
                anchor: 'right',
                direction: 'column',
                translateX: 140,
                itemWidth: 60,
                itemHeight: 14,
                itemsSpacing: 2,
                symbolSize: 14,
                symbolShape: 'circle'
              }
            ]}
        />
    );
  }
}

export default FixedExpanceChart;