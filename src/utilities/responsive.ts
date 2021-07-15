import {variationName} from '@shopify/css-utilities';

type ViewportSize = 'aboveSmall' | 'aboveMedium' | 'aboveLarge';

const classNamesMap = {
  padding: [
    'paddingInlineStart',
    'paddingInlineEnd',
    'paddingBlockStart',
    'paddingBlockEnd',
  ],
  paddingInline: ['paddingInlineStart', 'paddingInlineEnd'],
  paddingInlineStart: 'paddingInlineStart',
  paddingInlineEnd: 'paddingInlineEnd',
  paddingBlock: ['paddingBlockStart', 'paddingBlockEnd'],
  paddingBlockStart: 'paddingBlockStart',
  paddingBlockEnd: 'paddingBlockEnd',
  background: 'background',
  border: [
    'borderInlineStart',
    'borderInlineEnd',
    'borderBlockStart',
    'borderBlockEnd',
  ],
  borderInline: ['borderInlineStart', 'borderInlineEnd'],
  borderInlineStart: 'borderInlineStart',
  borderInlineEnd: 'borderInlineEnd',
  borderBlock: ['borderBlockStart', 'borderBlockEnd'],
  borderBlockStart: 'borderBlockStart',
  borderBlockEnd: 'borderBlockEnd',
  borderWidth: [
    'borderWidthInlineStart',
    'borderWidthInlineEnd',
    'borderWidthBlockStart',
    'borderWidthBlockEnd',
  ],
  borderWidthInline: ['borderWidthInlineStart', 'borderWidthInlineEnd'],
  borderWidthInlineStart: 'borderWidthInlineStart',
  borderWidthInlineEnd: 'borderWidthInlineEnd',
  borderWidthBlock: ['borderWidthBlockStart', 'borderWidthBlockEnd'],
  borderWidthBlockStart: 'borderWidthBlockStart',
  borderWidthBlockEnd: 'borderWidthBlockEnd',
  borderColor: [
    'borderColorInlineStart',
    'borderColorInlineEnd',
    'borderColorBlockStart',
    'borderColorBlockEnd',
  ],
  borderRadius: [
    'borderRadiusInlineStart',
    'borderRadiusInlineEnd',
    'borderRadiusBlockStart',
    'borderRadiusBlockEnd',
  ],
  borderRadiusInline: ['borderRadiusInlineStart', 'borderRadiusInlineEnd'],
  borderRadiusInlineStart: 'borderRadiusInlineStart',
  borderRadiusInlineEnd: 'borderRadiusInlineEnd',
  borderRadiusBlock: ['borderRadiusBlockStart', 'borderRadiusBlockEnd'],
  borderRadiusBlockStart: 'borderRadiusBlockStart',
  borderRadiusBlockEnd: 'borderRadiusBlockEnd',
  spacing: 'spacing',
};

type Props = {[prop in keyof typeof classNamesMap]?: any};

interface Media {
  viewportSize: ViewportSize;
}

type MediaProps = Media & Props;

export function generateResponsiveClassnames(
  props: Props,
  viewportSize?: ViewportSize,
) {
  return Object.entries(props)
    .filter(([prop, value]) => classNamesMap[prop as keyof Props] && value)
    .reduce((classNames: string[], [prop, value]) => {
      const property = classNamesMap[prop as keyof Props];

      if (Array.isArray(property)) {
        return [
          ...classNames,
          ...property.map((property) =>
            viewportSize
              ? variationName(variationName(viewportSize, property), value)
              : variationName(property, value),
          ),
        ];
      }

      return [
        ...classNames,
        viewportSize
          ? variationName(variationName(viewportSize, property), value)
          : variationName(property, value),
      ];
    }, []);
}

export function convertLogicalProps(props: Props) {
  return Object.assign(
    {},
    ...Object.entries(props).map(([prop, value]) => {
      if (Array.isArray(value)) {
        if (value.length === 2) {
          const [block, inline] = value;

          return {
            [`${prop}Block`]: block,
            [`${prop}Inline`]: inline,
          };
        } else if (value.length === 4) {
          const [blockStart, inlineEnd, blockEnd, inlineStart] = value;

          return {
            [`${prop}BlockStart`]: blockStart,
            [`${prop}InlineEnd`]: inlineEnd,
            [`${prop}BlockEnd`]: blockEnd,
            [`${prop}InlineStart`]: inlineStart,
          };
        }
      }

      return {[prop]: value};
    }),
  );
}

export function useResponsive(props: Props, media?: MediaProps[]) {
  return [
    ...generateResponsiveClassnames(convertLogicalProps(props)),
    ...(media
      ? media
          .map(({viewportSize, ...props}) =>
            generateResponsiveClassnames(
              convertLogicalProps(props),
              viewportSize,
            ),
          )
          .reduce((classNames, className) => classNames.concat(className), [])
      : []),
  ];
}
