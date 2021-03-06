import React, {PropsWithChildren} from 'react';
import {classNames, variationName} from '@shopify/css-utilities';
import {TextBlockProps} from '@shopify/post-purchase-ui-extensions';

import {ThemeTypographyStyle} from '../Theme';
import {
  utilityDefaultTextColorSubdued,
  utilityDefaultTextColorEmphasized,
  utilityDefaultColorAccent,
} from '../../utilities/legacy';
import typographyStyles from '../../utilities/typography-styles.css';
import {InlineFormattingContext} from '../../utilities/inlineFormatting';

import styles from './TextBlock.css';

export interface Props
  extends PropsWithChildren<Omit<TextBlockProps, 'appearance'>> {
  /** Changes the text based on the Theme styles */
  style?: ThemeTypographyStyle;
  appearance?: 'accent' | TextBlockProps['appearance'];
}

export function TextBlock({
  children,
  size,
  emphasized,
  subdued,
  appearance,
  style,
  id,
}: Props) {
  const className = classNames(
    styles.TextBlock,
    size && styles[variationName('size', size)],
    emphasized && styles.emphasized,
    emphasized && utilityDefaultTextColorEmphasized,
    subdued && styles.subdued,
    subdued && utilityDefaultTextColorSubdued,
    appearance && styles[variationName('appearance', appearance)],
    appearance && appearance === 'accent' && utilityDefaultColorAccent,
    style && typographyStyles[style],
  );

  const content = emphasized ? <strong>{children}</strong> : children;

  return (
    <InlineFormattingContext.Provider value>
      <p className={className} id={id}>
        {content}
      </p>
    </InlineFormattingContext.Provider>
  );
}
