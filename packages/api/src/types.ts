export type Topping = {
  id: string;
  name: string;
  price: number;
  defaultSelected: boolean;
};

export type Product = {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  price: number;
  rating: number;
  category: 'snacks' | 'meal' | 'vegan' | 'dessert' | 'drinks';
  imageKey: string;
  isBestSeller: boolean;
  isRecommended: boolean;
  toppings: Topping[];
};

export type PromoBanner = {
  id: string;
  label1: string;
  label2: string;
  discount: string;
  bannerKey: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  dob: string;
  avatarUri: string;
};

export type Admin = {
  id: string;
  name: string;
  email: string;
  password: string;
  isActive: boolean;
};

export type Address = {
  id: string;
  userId: string;
  label: string;
  address: string;
  isDefault?: boolean;
};

export type PaymentMethodType = 'card' | 'apple' | 'paypal' | 'google';

export type PaymentMethod = {
  id: string;
  userId: string;
  type: PaymentMethodType;
  label: string;
  holderName?: string;
  cardNumber?: string;
  expiryDate?: string;
};

export type Favorite = {
  id: string;
  userId: string;
  productId: string;
};

export type Notification = {
  id: string;
  userId: string;
  title: string;
  message: string;
  createdAt: string;
  read: boolean;
};

export type OrderStatus = 'Active' | 'Completed' | 'Cancelled';

export type OrderItem = {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  toppings: Topping[];
};

export type Order = {
  id: string;
  userId: string;
  imageKey: string;
  items: OrderItem[];
  subtotal: number;
  tax: number;
  delivery: number;
  total: number;
  address: string;
  paymentMethodLabel: string;
  status: OrderStatus;
  placedAt: string;
  eta: string;
  cancelReason?: string;
};
