import React, {ReactNode} from 'react';

import {useLinkComponent} from '../../../AppContext';

export interface Props {
  children?: ReactNode;
  /** CSS class that is applied to the link */
  className?: string;
  /** Destination to navigate to. */
  to: string;
  /** Open the link in a new window or tab */
  external?: boolean;
  /** Unique identifier. Typically used as a target for another component’s controls to associate an accessible label with an action. */
  id?: string;
  /**
   * Indicate the text language. Useful when the text is in a different language than the rest of the page.
   * It will allow assistive technologies such as screen readers to invoke the correct pronunciation.
   */
  language?: string;
  /** Callback when pressed. If `to` is provided, it will execute the callback and navigate specified. */
  onPress?(): void;
}

export function UnstyledLink({
  children,
  className,
  to,
  external,
  id,
  language,
  onPress,
}: Props) {
  const LinkComponent = useLinkComponent();

  const handleClick = onPress && (() => onPress());

  if (LinkComponent) {
    return (
      <LinkComponent
        to={to}
        onClick={handleClick}
        external={external}
        id={id}
        className={className}
        lang={language}
      >
        {children}
      </LinkComponent>
    );
  }

  const target = external ? '_blank' : undefined;
  const rel = external ? 'noopener noreferrer' : undefined;

  return (
    <a
      href={to}
      onClick={handleClick}
      target={target}
      rel={rel}
      id={id}
      className={className}
      lang={language}
    >
      {children}
    </a>
  );
}
