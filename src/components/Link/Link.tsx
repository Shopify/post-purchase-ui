import React from 'react';
import {classNames, variationName} from '@shopify/css-utilities';

import {Button} from '../Button';
import {useThemeConfiguration} from '../Theme';

import {UnstyledLink, UnstyledLinkProps} from './components';
import styles from './Link.css';

export interface Props extends Omit<UnstyledLinkProps, 'to'> {
  /** Destination to navigate to. It will render a plain Button if it’s not provided. */
  to?: string;
  /** Adds an underline to the link */
  underline?: boolean;
}

/**
 * Link is used to navigate the buyer to another page or section within the same page.
 */
export function Link({
  to,
  language,
  children,
  onPress,
  underline,
  ...rest
}: Props) {
  const {
    link: {colorHovered, colorPressed},
  } = useThemeConfiguration();

  if (!to) {
    return (
      <Button onPress={onPress} plain underline {...rest}>
        {children}
      </Button>
    );
  }

  return (
    <UnstyledLink
      className={classNames(
        styles.Link,
        underline && styles.underline,
        colorHovered && styles[variationName('colorHovered', colorHovered)],
        colorPressed && styles[variationName('colorPressed', colorPressed)],
      )}
      to={to}
      onPress={onPress}
      language={language}
      {...rest}
    >
      {children}
    </UnstyledLink>
  );
}
