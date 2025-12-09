/**
 * User model
 */
export interface User {
  id: string;
  email: string;
  name?: string;
  phone?: string;
  avatar?: string;
  role: 'customer' | 'courier' | 'admin';
  createdAt: string;
  updatedAt: string;
}

/**
 * Order model
 */
export interface Order {
  id: string;
  trackingNumber: string;
  status: 'pending' | 'picked_up' | 'in_transit' | 'delivered' | 'cancelled';
  sender: {
    name: string;
    phone: string;
    address: string;
  };
  receiver: {
    name: string;
    phone: string;
    address: string;
  };
  package: {
    weight: number;
    dimensions?: {
      length: number;
      width: number;
      height: number;
    };
    description?: string;
  };
  pricing: {
    basePrice: number;
    distance: number;
    totalPrice: number;
  };
  courier?: {
    id: string;
    name: string;
    phone: string;
    avatar?: string;
  };
  timeline: {
    createdAt: string;
    pickedUpAt?: string;
    inTransitAt?: string;
    deliveredAt?: string;
    cancelledAt?: string;
  };
  notes?: string;
}

/**
 * Notification model
 */
export interface Notification {
  id: string;
  type: 'order_update' | 'promotion' | 'system';
  title: string;
  message: string;
  read: boolean;
  data?: any;
  createdAt: string;
}
