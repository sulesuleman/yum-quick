import ApplePayIcon from '@/assets/apple-pay-icon.svg';
import GooglePayIcon from '@/assets/google-play-icon.svg';
import PaymentCardIcon from '@/assets/payment-card-icon.svg';
import PaypalIcon from '@/assets/paypal-icon.svg';

import { PaymentMethodType } from '@services/types';

export const PAYMENT_METHOD_ICONS: Record<
  PaymentMethodType,
  { SvgIcon: typeof PaymentCardIcon; iconWidth: number; iconHeight: number }
> = {
  card: { SvgIcon: PaymentCardIcon, iconWidth: 40, iconHeight: 27 },
  apple: { SvgIcon: ApplePayIcon, iconWidth: 35, iconHeight: 47 },
  paypal: { SvgIcon: PaypalIcon, iconWidth: 32, iconHeight: 40 },
  google: { SvgIcon: GooglePayIcon, iconWidth: 33, iconHeight: 40 }
};
