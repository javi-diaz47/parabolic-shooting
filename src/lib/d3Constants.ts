import { scaleLinear } from 'd3';

export const r = 3; // (fixed) radius of dots, in pixels

// Margin
export const marginTop = 20; // the top margin, in pixels
export const marginRight = 0; // the right margin, in pixels
export const marginBottom = 40; // the bottom margin, in pixels
export const marginLeft = 50; // the left margin, in pixels

// Inset
export const inset = 15; // inset the default range, in pixels
export const insetTop = inset; // inset the default y-range
export const insetRight = inset; // inset the default x-range
export const insetBottom = inset; // inset the default y-range
export const insetLeft = inset; // inset the default x-range

// Size
export const width = 900; // the outer width of the chart, in pixels
export const height = 600; // the outer height of the chart, in pixels

// Label
export const xLabel = 'X →'; // a label for the y-axis
export const yLabel = '↑ Y'; // a label for the y-axis

// Format in label
export const xFormat = 'm'; // a format specifier string for the x-axis
export const yFormat = 'm'; // a format specifier string for the y-axis

// Scale factos
export const xScalefactor = 10; //x-axis number of values
export const yScalefactor = 12; //y-axis number of values

// number of colors in fill array MUST match number of subsets in data
export const colors = ['red', 'orange', 'green', 'blue', 'purple']; // fill color for dots
export const filled = true; // whether dots should be filled or outlined
export const tooltipBackground = 'white'; // background color of tooltip
export const tooltipTextColor = 'black'; // text color of tooltip

export const xType = scaleLinear;
export const yType = scaleLinear;

export const xRange = [marginLeft + insetLeft, width - marginRight - insetRight]; // [left, right]
export const yRange = [height - marginBottom - insetBottom, marginTop + insetTop]; // [bottom, top]
