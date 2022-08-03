import NumberFormat, { NumberFormatProps } from 'react-number-format';

export function NumberFormatMoney(props: NumberFormatProps) {
  return (
    <NumberFormat
      thousandSeparator={true}
      fixedDecimalScale={true}
      decimalScale={2}
      prefix="$"
      {...props}
    />
  );
}
