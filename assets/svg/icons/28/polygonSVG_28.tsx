import * as React from 'react';
import Svg, { SvgProps, Circle, Path } from 'react-native-svg';
const PolygonSVG24 = (props: SvgProps) => (
  <Svg width={28} height={28} fill="none" {...props}>
    <Circle cx={14} cy={14} r={14} fill="#7950DD" />
    <Path
      fill="#fff"
      d="M18.753 10.823c-.345-.207-.793-.207-1.171 0l-2.687 1.588-1.825 1.036-2.686 1.589c-.345.207-.793.207-1.171 0l-2.136-1.243a1.191 1.191 0 0 1-.585-1.002V10.34c0-.415.206-.795.585-1.002L9.178 8.13c.345-.208.792-.208 1.171 0l2.101 1.208c.344.207.586.587.586 1.002v1.588l1.825-1.07V9.269a1.12 1.12 0 0 0-.586-1.001l-3.891-2.28c-.345-.207-.793-.207-1.171 0l-3.961 2.28a1.12 1.12 0 0 0-.585 1.001v4.593c0 .414.206.794.585 1.001l3.96 2.28c.345.206.793.206 1.172 0l2.686-1.555 1.825-1.07 2.687-1.554c.344-.207.792-.207 1.17 0l2.101 1.209c.345.207.586.587.586 1.001v2.452c0 .414-.207.794-.586 1.001l-2.1 1.243c-.345.207-.793.207-1.171 0l-2.101-1.208a1.191 1.191 0 0 1-.586-1.002v-1.588l-1.825 1.07v1.589c0 .414.207.794.585 1.001l3.961 2.28c.345.206.792.206 1.171 0l3.96-2.28c.345-.207.586-.587.586-1.001v-4.593a1.12 1.12 0 0 0-.585-1.001l-3.995-2.314Z"
    />
  </Svg>
);
export default PolygonSVG24;