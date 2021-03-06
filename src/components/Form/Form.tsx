import React, {PropsWithChildren} from 'react';
import {FormProps} from '@shopify/post-purchase-ui-extensions';

import {useTranslate} from '../AppContext';
import {VisuallyHidden} from '../VisuallyHidden';

import styles from './Form.css';

export function Form({
  onSubmit,
  children,
  disabled = false,
  implicitSubmit = true,
}: PropsWithChildren<FormProps>) {
  const t = useTranslate();

  const implicitSubmitContent =
    implicitSubmit === false ? null : (
      <VisuallyHidden>
        <button type="submit" disabled={disabled} tabIndex={-1} aria-hidden>
          {typeof implicitSubmit === 'string' ? implicitSubmit : t('submit')}
        </button>
      </VisuallyHidden>
    );

  return (
    <form
      action=""
      method="POST"
      noValidate
      onSubmit={(event) => {
        if (disabled) return;

        event.preventDefault();
        onSubmit();
      }}
      className={styles.Form}
    >
      {children}
      {implicitSubmitContent}
    </form>
  );
}
