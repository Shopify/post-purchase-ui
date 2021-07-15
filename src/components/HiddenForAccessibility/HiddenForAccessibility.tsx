import React, {PropsWithChildren} from 'react';
import {HiddenForAccessibilityProps} from '@shopify/post-purchase-ui-extensions';

export function HiddenForAccessibility({
  children,
}: PropsWithChildren<HiddenForAccessibilityProps>) {
  return <span aria-hidden="true">{children}</span>;
}
