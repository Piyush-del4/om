import { Request, Response, NextFunction } from 'express';
import { ShopItem } from './shopItem.model';
import { Cart } from './cart.model';
import { Order } from './order.model';
import { User } from '../users/user.model';
import * as razorpayService from '../../services/razorpay.service';
import { sendOrderReceiptEmail, sendPurchaseAdminNotification } from '../../services/email.service';
import { env } from '../../config/env';
import { logger } from '../../utils/logger';

// ── Storefront public / admin APIs ──────────────────────────────────────────

export async function listShopItems(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const items = await ShopItem.find({}).sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      data: items,
    });
  } catch (error) {
    next(error);
  }
}

export async function getShopItem(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id } = req.params;
    const item = await ShopItem.findById(id);

    if (!item) {
      res.status(404).json({
        success: false,
        error: {
          code: 'NOT_FOUND',
          message: 'Shop item not found',
        },
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: item,
    });
  } catch (error) {
    next(error);
  }
}

export async function createShopItem(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { title, price, description, imageUrl, images, specialOfferTitle, offerPrice, offerExpiresAt, inStock, stockCount } = req.body;
 
    const newItem = await ShopItem.create({
      title,
      price,
      description: description || '',
      imageUrl: imageUrl || '',
      images: images || [],
      specialOfferTitle: specialOfferTitle || '',
      offerPrice: offerPrice !== undefined ? offerPrice : undefined,
      offerExpiresAt: offerExpiresAt ? new Date(offerExpiresAt) : undefined,
      inStock: inStock !== undefined ? inStock : true,
      stockCount: (stockCount !== undefined && stockCount !== null && stockCount !== '') ? stockCount : undefined,
    });
 
    res.status(201).json({
      success: true,
      data: newItem,
    });
  } catch (error) {
    next(error);
  }
}
 
export async function updateShopItem(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id } = req.params;
    const { title, price, description, imageUrl, images, specialOfferTitle, offerPrice, offerExpiresAt, inStock, stockCount } = req.body;
 
    const item = await ShopItem.findById(id);
    if (!item) {
      res.status(404).json({
        success: false,
        error: {
          code: 'NOT_FOUND',
          message: 'Shop item not found',
        },
      });
      return;
    }
 
    if (title) item.title = title;
    if (price !== undefined) item.price = price;
    if (description !== undefined) item.description = description;
    if (imageUrl !== undefined) item.imageUrl = imageUrl;
    if (images !== undefined) item.images = images;
    if (specialOfferTitle !== undefined) item.specialOfferTitle = specialOfferTitle;
    if (offerPrice !== undefined) item.offerPrice = offerPrice;
    if (offerExpiresAt !== undefined) item.offerExpiresAt = offerExpiresAt ? new Date(offerExpiresAt) : undefined;
    if (inStock !== undefined) item.inStock = inStock;
    if (stockCount !== undefined) item.stockCount = (stockCount !== null && stockCount !== '') ? stockCount : undefined;
 
    await item.save();

    res.status(200).json({
      success: true,
      data: item,
    });
  } catch (error) {
    next(error);
  }
}

export async function deleteShopItem(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id } = req.params;
    const item = await ShopItem.findById(id);

    if (!item) {
      res.status(404).json({
        success: false,
        error: {
          code: 'NOT_FOUND',
          message: 'Shop item not found',
        },
      });
      return;
    }

    // Soft delete
    item.isDeleted = true;
    await item.save();

    res.status(200).json({
      success: true,
      data: {
        message: 'Shop item deleted successfully',
      },
    });
  } catch (error) {
    next(error);
  }
}

// ── Cart APIs ───────────────────────────────────────────────────────────────

export async function getCart(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const userId = req.user?._id;
    let cart = await Cart.findOne({ userId }).populate('items.itemId');

    if (!cart) {
      cart = await Cart.create({ userId, items: [] });
    }

    res.status(200).json({
      success: true,
      data: cart,
    });
  } catch (error) {
    next(error);
  }
}

export async function addToCart(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const userId = req.user?._id;
    const { itemId, quantity } = req.body;

    // Check item exists
    const shopItem = await ShopItem.findById(itemId);
    if (!shopItem) {
      res.status(404).json({
        success: false,
        error: {
          code: 'NOT_FOUND',
          message: 'Shop item not found',
        },
      });
      return;
    }
 
    if (shopItem.inStock === false || (shopItem.stockCount !== undefined && shopItem.stockCount <= 0)) {
      res.status(400).json({
        success: false,
        error: {
          code: 'OUT_OF_STOCK',
          message: 'This item is currently out of stock',
        },
      });
      return;
    }
 
    if (shopItem.stockCount !== undefined && quantity > shopItem.stockCount) {
      res.status(400).json({
        success: false,
        error: {
          code: 'INSUFFICIENT_STOCK',
          message: `Only ${shopItem.stockCount} pieces are left in stock`,
        },
      });
      return;
    }

    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    // Check if item already in cart
    const existingIndex = cart.items.findIndex(item => item.itemId.toString() === itemId);
    if (existingIndex > -1) {
      cart.items[existingIndex].quantity = quantity;
    } else {
      cart.items.push({ itemId: itemId as any, quantity });
    }

    await cart.save();
    
    // Return populated cart
    const populatedCart = await Cart.findOne({ userId }).populate('items.itemId');

    res.status(200).json({
      success: true,
      data: populatedCart,
    });
  } catch (error) {
    next(error);
  }
}

export async function removeFromCart(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const userId = req.user?._id;
    const { itemId } = req.params;

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      res.status(200).json({ success: true, data: { items: [] } });
      return;
    }

    cart.items = cart.items.filter(item => item.itemId.toString() !== itemId);
    await cart.save();

    const populatedCart = await Cart.findOne({ userId }).populate('items.itemId');

    res.status(200).json({
      success: true,
      data: populatedCart,
    });
  } catch (error) {
    next(error);
  }
}

export async function clearCart(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const userId = req.user?._id;
    const cart = await Cart.findOne({ userId });

    if (cart) {
      cart.items = [];
      await cart.save();
    }

    res.status(200).json({
      success: true,
      data: cart || { items: [] },
    });
  } catch (error) {
    next(error);
  }
}

// ── Checkout & Payments APIs ────────────────────────────────────────────────

export async function checkout(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const userId = req.user?._id;
    const { address } = req.body;

    // Fetch user cart
    const cart = await Cart.findOne({ userId }).populate('items.itemId');
    if (!cart || cart.items.length === 0) {
      res.status(400).json({
        success: false,
        error: {
          code: 'CART_EMPTY',
          message: 'Your cart is empty',
        },
      });
      return;
    }

    // Build items snapshots and verify pricing on server-side to prevent tampering
    const orderItems: any[] = [];
    let totalAmount = 0;

    for (const item of cart.items) {
      const dbItem = item.itemId as any;
      if (!dbItem || dbItem.isDeleted) {
        res.status(400).json({
          success: false,
          error: {
            code: 'ITEM_NOT_FOUND',
            message: `Item ${item.itemId} is no longer available`,
          },
        });
        return;
      }
 
      if (dbItem.inStock === false || (dbItem.stockCount !== undefined && dbItem.stockCount <= 0)) {
        res.status(400).json({
          success: false,
          error: {
            code: 'OUT_OF_STOCK',
            message: `Item "${dbItem.title}" is currently out of stock`,
          },
        });
        return;
      }
 
      if (dbItem.stockCount !== undefined && item.quantity > dbItem.stockCount) {
        res.status(400).json({
          success: false,
          error: {
            code: 'INSUFFICIENT_STOCK',
            message: `Only ${dbItem.stockCount} pieces are left for "${dbItem.title}"`,
          },
        });
        return;
      }

      let activePrice = dbItem.price;
      if (dbItem.offerPrice !== undefined && dbItem.offerPrice !== null) {
        const now = new Date();
        if (!dbItem.offerExpiresAt || now < new Date(dbItem.offerExpiresAt)) {
          activePrice = dbItem.offerPrice;
        }
      }

      const itemTotal = activePrice * item.quantity;
      totalAmount += itemTotal;

      orderItems.push({
        itemId: dbItem._id,
        title: dbItem.title,
        quantity: item.quantity,
        price: activePrice,
      });
    }

    // Create DB Order
    const order = await Order.create({
      userId,
      items: orderItems,
      totalAmount,
      status: 'pending',
      address,
    });

    // Create Razorpay Order
    const razorpayOrder = await razorpayService.createRazorpayOrder(totalAmount, order._id.toString());

    // Update DB Order with Razorpay Order ID
    order.razorpayOrderId = razorpayOrder.id;
    await order.save();

    res.status(200).json({
      success: true,
      data: {
        orderId: order._id,
        razorpayOrderId: razorpayOrder.id,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
        key: env.RAZORPAY_KEY_ID, // Expose public key ID for SDK launch
      },
    });
  } catch (error) {
    next(error);
  }
}

export async function directCheckout(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const userId = req.user?._id;
    const { itemId, quantity, address } = req.body;

    const shopItem = await ShopItem.findById(itemId);
    if (!shopItem || shopItem.isDeleted) {
      res.status(404).json({
        success: false,
        error: {
          code: 'NOT_FOUND',
          message: 'Shop item not found',
        },
      });
      return;
    }
 
    if (shopItem.inStock === false || (shopItem.stockCount !== undefined && shopItem.stockCount <= 0)) {
      res.status(400).json({
        success: false,
        error: {
          code: 'OUT_OF_STOCK',
          message: 'This item is currently out of stock',
        },
      });
      return;
    }
 
    if (shopItem.stockCount !== undefined && quantity > shopItem.stockCount) {
      res.status(400).json({
        success: false,
        error: {
          code: 'INSUFFICIENT_STOCK',
          message: `Only ${shopItem.stockCount} pieces are left in stock`,
        },
      });
      return;
    }

    let activePrice = shopItem.price;
    if (shopItem.offerPrice !== undefined && shopItem.offerPrice !== null) {
      const now = new Date();
      if (!shopItem.offerExpiresAt || now < new Date(shopItem.offerExpiresAt)) {
        activePrice = shopItem.offerPrice;
      }
    }

    const totalAmount = activePrice * quantity;

    const orderItems = [
      {
        itemId: shopItem._id,
        title: shopItem.title,
        quantity,
        price: activePrice,
      },
    ];

    const order = await Order.create({
      userId,
      items: orderItems,
      totalAmount,
      status: 'pending',
      address,
      isDirectCheckout: true,
    });

    const razorpayOrder = await razorpayService.createRazorpayOrder(totalAmount, order._id.toString());

    order.razorpayOrderId = razorpayOrder.id;
    await order.save();

    res.status(200).json({
      success: true,
      data: {
        orderId: order._id,
        razorpayOrderId: razorpayOrder.id,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
        key: env.RAZORPAY_KEY_ID,
      },
    });
  } catch (error) {
    next(error);
  }
}

export async function verifyPayment(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const userId = req.user?._id;
    const { razorpayOrderId, razorpayPaymentId, razorpaySignature } = req.body;

    const order = await Order.findOne({ razorpayOrderId, userId });
    if (!order) {
      res.status(404).json({
        success: false,
        error: {
          code: 'NOT_FOUND',
          message: 'Order not found',
        },
      });
      return;
    }

    // Verify signature
    const isValid = razorpayService.verifyPaymentSignature(
      razorpayOrderId,
      razorpayPaymentId,
      razorpaySignature
    );

    if (!isValid) {
      order.status = 'failed';
      await order.save();

      res.status(400).json({
        success: false,
        error: {
          code: 'PAYMENT_VERIFICATION_FAILED',
          message: 'Payment signature verification failed',
        },
      });
      return;
    }

    // Payment successful
    order.status = 'paid';
    order.razorpayPaymentId = razorpayPaymentId;
    order.razorpaySignature = razorpaySignature;
    await order.save();
 
    // Deduct stock
    for (const orderItem of order.items) {
      const dbItem = await ShopItem.findById(orderItem.itemId);
      if (dbItem) {
        if (dbItem.stockCount !== undefined) {
          dbItem.stockCount = Math.max(0, dbItem.stockCount - orderItem.quantity);
          if (dbItem.stockCount === 0) {
            dbItem.inStock = false;
          }
          await dbItem.save();
        }
      }
    }

    // Clear cart if not direct checkout
    if (!order.isDirectCheckout) {
      const cart = await Cart.findOne({ userId });
      if (cart) {
        cart.items = [];
        await cart.save();
      }
    }

    // Send invoice email receipt
    const user = await User.findById(userId);
    if (user) {
      await sendOrderReceiptEmail(user.email, {
        name: user.name,
        orderId: order._id.toString(),
        totalAmount: order.totalAmount,
        items: order.items,
      });
      // Send admin alert for purchase
      await sendPurchaseAdminNotification({
        userName: user.name,
        userEmail: user.email,
        userPhone: user.phone,
        orderId: order._id.toString(),
        totalAmount: order.totalAmount,
        items: order.items,
        address: order.address,
      });
    }

    res.status(200).json({
      success: true,
      data: order,
    });
  } catch (error) {
    next(error);
  }
}

/**
 * Handle incoming webhooks from Razorpay (capturing payments directly from gateway in case client verification fails/disconnects)
 */
export async function handleRazorpayWebhook(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const signature = req.headers['x-razorpay-signature'] as string;
    const rawBody = req.rawBody;

    if (!signature || !rawBody) {
      res.status(400).send('Missing signature or payload');
      return;
    }

    const isValid = razorpayService.verifyWebhookSignature(rawBody, signature);
    if (!isValid) {
      logger.warn('⚠️ Razorpay webhook signature validation failed.');
      res.status(400).send('Invalid signature');
      return;
    }

    const event = JSON.parse(rawBody);
    logger.info(`📥 Razorpay Webhook received event: "${event.event}"`);

    // We look for payment.captured or order.paid
    if (event.event === 'order.paid' || event.event === 'payment.captured') {
      const entity = event.payload.payment?.entity || event.payload.order?.entity;
      const razorpayOrderId = entity.order_id || entity.id;

      const order = await Order.findOne({ razorpayOrderId });
      if (order && order.status === 'pending') {
        order.status = 'paid';
        order.razorpayPaymentId = entity.id || entity.payment_id;
        await order.save();

        // Clear user's cart if not direct checkout
        if (!order.isDirectCheckout) {
          const cart = await Cart.findOne({ userId: order.userId });
          if (cart) {
            cart.items = [];
            await cart.save();
          }
        }

        // Email receipt
        const user = await User.findById(order.userId);
        if (user) {
          await sendOrderReceiptEmail(user.email, {
            name: user.name,
            orderId: order._id.toString(),
            totalAmount: order.totalAmount,
            items: order.items,
          });
          // Send admin alert for purchase
          await sendPurchaseAdminNotification({
            userName: user.name,
            userEmail: user.email,
            userPhone: user.phone,
            orderId: order._id.toString(),
            totalAmount: order.totalAmount,
            items: order.items,
            address: order.address,
          });
        }
        
        logger.info(`💳 Webhook successfully finalized order ${order._id}`);
      }
    }

    // Always respond 200 OK to Razorpay webhook acknowledgements
    res.status(200).send('OK');
  } catch (error) {
    logger.error('❌ Error handling Razorpay Webhook:', error);
    res.status(500).send('Webhook Processing Error');
  }
}

export async function getMyOrders(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const userId = req.user?._id;
    const orders = await Order.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (error) {
    next(error);
  }
}

export async function getAllOrders(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const orders = await Order.find({}).populate('userId', 'name email phone').sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (error) {
    next(error);
  }
}

export async function updateOrderStatus(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const order = await Order.findById(id);
    if (!order) {
      res.status(404).json({
        success: false,
        error: {
          code: 'NOT_FOUND',
          message: 'Order not found',
        },
      });
      return;
    }
    if (status) order.status = status;
    await order.save();
    res.status(200).json({
      success: true,
      data: order,
    });
  } catch (error) {
    next(error);
  }
}
