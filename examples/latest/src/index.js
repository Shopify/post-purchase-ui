import React from 'react';
import {render} from 'react-dom';
import {Context} from '@shopify/post-purchase-ui-react/ui-extensions';
import {
  Heading,
  BlockStack,
  Layout,
  TextBlock,
  Button,
  TextContainer,
  Text,
  Image,
  InlineStack,
  CalloutBanner,
  Separator,
  Tiles,
} from '@shopify/post-purchase-ui-react';

function App() {
  const productTitle = 'Arbor: Copy of A-Frame';
  const productImageURL =
    'https://cdn.shopify.com/s/files/1/0001/4168/products/arbor-aframe-snowboard-m_3_8e9d0dec-2cb1-40d1-b442-b9ea4ae36aaf_large.jpg?v=1517332939';
  const originalPrice = 199.99;
  const discountedPrice = 169.99;
  const productDescription = [
    'This big-mountain freeride-specific board is the answer for those riders who are looking for on-edge performance. The A-Frame’s was designed to lock into and hold a deeply carved line and provide tighter edge control in the steeps.',
  ];
  const shipping = 3.99;
  const taxes = 2.99;
  const total = taxes + shipping + discountedPrice;

  return (
    <Context>
      <BlockStack spacing="loose">
        <CalloutBanner title="Special discount 🎉">
          <Text size="medium">Add the {productTitle} to your order and </Text>
          <Text size="medium" emphasized>
            save 15%.
          </Text>
        </CalloutBanner>
        <Layout
          media={[
            {viewportSize: 'small', sizes: [1, 0, 1], maxInlineSize: 0.9},
            {viewportSize: 'medium', sizes: [532, 0, 1], maxInlineSize: 420},
            {viewportSize: 'large', sizes: [560, 38, 340]},
          ]}
        >
          <Image description="product photo" source={productImageURL} />
          <BlockStack />
          <BlockStack>
            <Heading>{productTitle}</Heading>
            <PriceHeader
              discountedPrice={discountedPrice}
              originalPrice={originalPrice}
            />
            <ProductDescription textLines={productDescription} />
            <PriceBreakdown
              discountedPrice={discountedPrice}
              shipping={shipping}
              taxes={taxes}
              total={total}
            />
            <BlockStack>
              <Button>Pay now · ${total}</Button>
              <Button subdued>Decline this offer</Button>
            </BlockStack>
          </BlockStack>
        </Layout>
      </BlockStack>
    </Context>
  );
}

function PriceHeader({discountedPrice, originalPrice}) {
  return (
    <InlineStack alignment="baseline" spacing="loose">
      <TextContainer alignment="trailing" spacing="loose">
        <Text role="deletion" size="large">
          {originalPrice}
        </Text>
        <Text emphasized size="large">
          {' '}
          ${discountedPrice} CAD
        </Text>
      </TextContainer>
    </InlineStack>
  );
}

function ProductDescription({textLines}) {
  return (
    <BlockStack spacing="xtight">
      {textLines.map((text, index) => (
        <TextBlock key={index} subdued>
          {text}
        </TextBlock>
      ))}
    </BlockStack>
  );
}

function PriceBreakdown({discountedPrice, shipping, taxes, total}) {
  if (total) {
    return (
      <BlockStack spacing="tight">
        <Separator />
        <PriceBreakdownLine label="Subtotal" amount={discountedPrice} />
        <PriceBreakdownLine label="Shipping" amount={shipping ?? 'Free'} />
        <PriceBreakdownLine label="Taxes" amount={taxes ?? 'Free'} />
        <Separator />
        <PriceBreakdownLine label="Total" amount={total} textSize="medium" />
      </BlockStack>
    );
  }
  return null;
}

function PriceBreakdownLine({label, amount, textSize = 'small'}) {
  return (
    <Tiles>
      <TextBlock size="small">{label}</TextBlock>
      <TextContainer alignment="trailing">
        <TextBlock emphasized size={textSize}>
          $ {amount}
        </TextBlock>
      </TextContainer>
    </Tiles>
  );
}

render(<App />, document.querySelector('#app'));
