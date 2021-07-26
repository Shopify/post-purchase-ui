import React, {PropsWithChildren} from 'react';
import {classNames} from '@shopify/css-utilities';
import {ViewProps} from '@shopify/post-purchase-ui-extensions';

import {useResponsive} from '../../utilities/responsive';
import {
  ThemeBackground,
  ThemeBorderColor,
  ThemeBorderRadius,
  ThemeBorderWidth,
  ThemeBorderStyle,
  ThemeSpacing,
} from '../Theme';

import styles from './View.css';

type ViewportSize = 'aboveSmall' | 'aboveMedium' | 'aboveLarge';
type BorderRadius = Extract<ThemeBorderRadius, 'base' | 'tight' | 'none'>;
type BorderStyle = ThemeBorderStyle | 'none';
type Spacing = Extract<
  ThemeSpacing,
  'tight4x' | 'tight1x' | 'base' | 'loose1x' | 'loose4x' | 'none'
>;

interface Media {
  /*
   * Specifies the viewport size these instruction will apply to.
   */
  viewportSize: ViewportSize;

  padding?: Spacing | [Spacing, Spacing] | [Spacing, Spacing, Spacing, Spacing];

  background?: ThemeBackground;

  border?:
    | BorderStyle
    | [BorderStyle, BorderStyle]
    | [BorderStyle, BorderStyle, BorderStyle, BorderStyle];

  borderWidth?:
    | ThemeBorderWidth
    | [ThemeBorderWidth, ThemeBorderWidth]
    | [ThemeBorderWidth, ThemeBorderWidth, ThemeBorderWidth, ThemeBorderWidth];

  borderColor?: ThemeBorderColor;

  borderRadius?:
    | BorderRadius
    | [BorderRadius, BorderRadius]
    | [BorderRadius, BorderRadius, BorderRadius, BorderRadius];
}

export interface Props extends ViewProps {
  /*
   * Adjust the padding
   */
  padding?: Spacing | [Spacing, Spacing] | [Spacing, Spacing, Spacing, Spacing];

  /**
   * Adjust the background
   */
  background?: ThemeBackground;

  /**
   * Adjust the border style
   */
  border?:
    | BorderStyle
    | [BorderStyle, BorderStyle]
    | [BorderStyle, BorderStyle, BorderStyle, BorderStyle];

  /**
   * Adjust the border width
   */
  borderWidth?:
    | ThemeBorderWidth
    | [ThemeBorderWidth, ThemeBorderWidth]
    | [ThemeBorderWidth, ThemeBorderWidth, ThemeBorderWidth, ThemeBorderWidth];

  /**
   * Adjust the border color
   */
  borderColor?: ThemeBorderColor;

  /*
   * Adjust the border radius
   */
  borderRadius?:
    | BorderRadius
    | [BorderRadius, BorderRadius]
    | [BorderRadius, BorderRadius, BorderRadius, BorderRadius];

  /**
   * Sizes at different media
   */
  media?: Media[];
}

/**
 * A View is a generic container component. Its contents will always be their
 * “natural” size, so this component can be useful in layout components (like `Layout`, `Tiles`,
 * `BlockStack`, `InlineStack`) that would otherwise stretch their children to fit.
 */
export function View({
  blockPadding,
  inlinePadding,
  padding,
  children,
  media,
  ...props
}: PropsWithChildren<Props>) {
  // Support Argo blockPadding & inlinePadding props
  const useArgoPadding = !padding && (blockPadding || inlinePadding);

  const responsiveClassNames = useResponsive(
    {
      ...props,
      padding: useArgoPadding
        ? convertPadding(blockPadding, inlinePadding)
        : padding,
    },
    media,
  );

  return (
    <div
      className={classNames(
        styles.View,
        responsiveClassNames &&
          responsiveClassNames.map((className) => styles[className]),
      )}
    >
      {children}
    </div>
  );
}

// TODO: remove when no longer supported in favor of padding
export function convertPadding(
  blockPadding: ViewProps['blockPadding'],
  inlinePadding: ViewProps['inlinePadding'],
): Props['padding'] {
  const padding = (
    padding: ViewProps['blockPadding'] | ViewProps['inlinePadding'],
  ) => {
    switch (padding) {
      case 'base':
        return 'base';
      case 'tight':
        return 'tight1x';
      case 'extraTight':
        return 'tight4x';
      case 'loose':
        return 'loose1x';
      case 'extraLoose':
        return 'loose4x';
      default:
        return 'none';
    }
  };

  return [padding(blockPadding), padding(inlinePadding)];
}
