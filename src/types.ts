import {TextFieldProps} from '@shopify/post-purchase-ui-extensions';

type GetObject<T> = T extends object ? T : never;

export type Autocomplete = NonNullable<TextFieldProps['autocomplete']>;
export type AutocompleteDescriptor = GetObject<Autocomplete>;
