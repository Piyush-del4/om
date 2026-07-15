import { Router } from 'express';
import { requireAuth } from '../../middleware/requireAuth';
import { requireAdmin } from '../../middleware/requireAdmin';
import { validate } from '../../middleware/validate';
import * as shopController from './shop.controller';
import * as schemas from './shop.schema';

export const shopRouter = Router();

// Storefront routes
shopRouter.get('/', shopController.listShopItems);
shopRouter.get('/:id', shopController.getShopItem);

// Cart management
shopRouter.get('/cart/items', requireAuth, shopController.getCart);
shopRouter.post('/cart/items', requireAuth, validate({ body: schemas.addToCartSchema }), shopController.addToCart);
shopRouter.delete('/cart/items/:itemId', requireAuth, shopController.removeFromCart);
shopRouter.post('/cart/clear', requireAuth, shopController.clearCart);

// Payment checkouts
shopRouter.post('/payments/checkout', requireAuth, validate({ body: schemas.checkoutSchema }), shopController.checkout);
shopRouter.post('/payments/direct-checkout', requireAuth, validate({ body: schemas.directCheckoutSchema }), shopController.directCheckout);
shopRouter.post('/payments/verify', requireAuth, validate({ body: schemas.verifyPaymentSchema }), shopController.verifyPayment);

// Order history
shopRouter.get('/orders/me', requireAuth, shopController.getMyOrders);
shopRouter.get('/orders/all', requireAuth, requireAdmin, shopController.getAllOrders);
shopRouter.patch('/orders/:id/status', requireAuth, requireAdmin, shopController.updateOrderStatus);

// Webhook listener (Public route, verified dynamically using headers)
shopRouter.post('/payments/webhook', shopController.handleRazorpayWebhook);

// Admin controls
shopRouter.post('/', requireAuth, requireAdmin, validate({ body: schemas.createShopItemSchema }), shopController.createShopItem);
shopRouter.patch('/:id', requireAuth, requireAdmin, validate({ body: schemas.updateShopItemSchema }), shopController.updateShopItem);
shopRouter.delete('/:id', requireAuth, requireAdmin, shopController.deleteShopItem);

export default shopRouter;
