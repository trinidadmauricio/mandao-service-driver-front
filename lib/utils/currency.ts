import currency from 'currency.js';

export type CurrencyCode = 'USD' | 'EUR' | 'MXN' | 'GTQ' | 'HNL' | 'NIO' | 'CRC' | 'PAB' | 'BZD' | 'JMD' | 'TTD' | 'BBD' | 'BSD' | 'XCD' | 'AWG' | 'ANG' | 'KYD';

const currencySymbols: Record<CurrencyCode, string> = {
  USD: '$',
  EUR: '€',
  MXN: '$',
  GTQ: 'Q',
  HNL: 'L',
  NIO: 'C$',
  CRC: '₡',
  PAB: 'B/.',
  BZD: 'BZ$',
  JMD: 'J$',
  TTD: 'TT$',
  BBD: 'Bds$',
  BSD: 'B$',
  XCD: '$',
  AWG: 'ƒ',
  ANG: 'ƒ',
  KYD: '$',
};

export function formatCurrency(amount: number, code: CurrencyCode = 'USD'): string {
  return currency(amount, { symbol: currencySymbols[code], precision: 2 }).format();
}

