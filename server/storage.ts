import {
  users,
  articles,
  images,
  products,
  payments,
  analyticsEvents,
  type User,
  type UpsertUser,
  type Article,
  type InsertArticle,
  type Image,
  type InsertImage,
  type Product,
  type InsertProduct,
  type Payment,
  type InsertPayment,
  type AnalyticsEvent,
  type InsertAnalyticsEvent,
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, and, count, sum, sql } from "drizzle-orm";

// Interface for storage operations
export interface IStorage {
  // User operations (IMPORTANT) these user operations are mandatory for Replit Auth.
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  updateUserStripeInfo(userId: string, stripeCustomerId: string, stripeSubscriptionId: string): Promise<User>;
  
  // Article operations
  getArticles(limit?: number, offset?: number): Promise<Article[]>;
  getArticle(id: string): Promise<Article | undefined>;
  createArticle(article: InsertArticle): Promise<Article>;
  updateArticle(id: string, article: Partial<InsertArticle>): Promise<Article>;
  deleteArticle(id: string): Promise<void>;
  incrementArticleViews(id: string): Promise<void>;
  
  // Image operations
  getImages(limit?: number, offset?: number): Promise<Image[]>;
  getImage(id: string): Promise<Image | undefined>;
  createImage(image: InsertImage): Promise<Image>;
  deleteImage(id: string): Promise<void>;
  
  // Product operations
  getProducts(limit?: number, offset?: number): Promise<Product[]>;
  getProduct(id: string): Promise<Product | undefined>;
  createProduct(product: InsertProduct): Promise<Product>;
  updateProduct(id: string, product: Partial<InsertProduct>): Promise<Product>;
  deleteProduct(id: string): Promise<void>;
  
  // Payment operations
  createPayment(payment: InsertPayment): Promise<Payment>;
  getPayments(userId?: string): Promise<Payment[]>;
  updatePaymentStatus(id: string, status: string): Promise<Payment>;
  
  // Analytics operations
  recordEvent(event: InsertAnalyticsEvent): Promise<AnalyticsEvent>;
  getAnalytics(days?: number): Promise<{
    totalArticles: number;
    totalViews: number;
    totalUsers: number;
    totalRevenue: number;
    recentEvents: AnalyticsEvent[];
  }>;
}

export class DatabaseStorage implements IStorage {
  // User operations (IMPORTANT) these user operations are mandatory for Replit Auth.
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }

  async updateUserStripeInfo(userId: string, stripeCustomerId: string, stripeSubscriptionId: string): Promise<User> {
    const [user] = await db
      .update(users)
      .set({
        stripeCustomerId,
        stripeSubscriptionId,
        subscriptionStatus: 'active',
        updatedAt: new Date(),
      })
      .where(eq(users.id, userId))
      .returning();
    return user;
  }

  // Article operations
  async getArticles(limit = 50, offset = 0): Promise<Article[]> {
    return await db
      .select()
      .from(articles)
      .orderBy(desc(articles.createdAt))
      .limit(limit)
      .offset(offset);
  }

  async getArticle(id: string): Promise<Article | undefined> {
    const [article] = await db.select().from(articles).where(eq(articles.id, id));
    return article;
  }

  async createArticle(article: InsertArticle): Promise<Article> {
    const [newArticle] = await db.insert(articles).values(article).returning();
    return newArticle;
  }

  async updateArticle(id: string, article: Partial<InsertArticle>): Promise<Article> {
    const [updatedArticle] = await db
      .update(articles)
      .set({ ...article, updatedAt: new Date() })
      .where(eq(articles.id, id))
      .returning();
    return updatedArticle;
  }

  async deleteArticle(id: string): Promise<void> {
    await db.delete(articles).where(eq(articles.id, id));
  }

  async incrementArticleViews(id: string): Promise<void> {
    await db
      .update(articles)
      .set({ views: sql`${articles.views} + 1` })
      .where(eq(articles.id, id));
  }

  // Image operations
  async getImages(limit = 50, offset = 0): Promise<Image[]> {
    return await db
      .select()
      .from(images)
      .orderBy(desc(images.createdAt))
      .limit(limit)
      .offset(offset);
  }

  async getImage(id: string): Promise<Image | undefined> {
    const [image] = await db.select().from(images).where(eq(images.id, id));
    return image;
  }

  async createImage(image: InsertImage): Promise<Image> {
    const [newImage] = await db.insert(images).values(image).returning();
    return newImage;
  }

  async deleteImage(id: string): Promise<void> {
    await db.delete(images).where(eq(images.id, id));
  }

  // Product operations
  async getProducts(limit = 50, offset = 0): Promise<Product[]> {
    return await db
      .select()
      .from(products)
      .orderBy(desc(products.createdAt))
      .limit(limit)
      .offset(offset);
  }

  async getProduct(id: string): Promise<Product | undefined> {
    const [product] = await db.select().from(products).where(eq(products.id, id));
    return product;
  }

  async createProduct(product: InsertProduct): Promise<Product> {
    const [newProduct] = await db.insert(products).values(product).returning();
    return newProduct;
  }

  async updateProduct(id: string, product: Partial<InsertProduct>): Promise<Product> {
    const [updatedProduct] = await db
      .update(products)
      .set({ ...product, updatedAt: new Date() })
      .where(eq(products.id, id))
      .returning();
    return updatedProduct;
  }

  async deleteProduct(id: string): Promise<void> {
    await db.delete(products).where(eq(products.id, id));
  }

  // Payment operations
  async createPayment(payment: InsertPayment): Promise<Payment> {
    const [newPayment] = await db.insert(payments).values(payment).returning();
    return newPayment;
  }

  async getPayments(userId?: string): Promise<Payment[]> {
    const query = db.select().from(payments).orderBy(desc(payments.createdAt));
    
    if (userId) {
      return await query.where(eq(payments.userId, userId));
    }
    
    return await query;
  }

  async updatePaymentStatus(id: string, status: string): Promise<Payment> {
    const [payment] = await db
      .update(payments)
      .set({ status, updatedAt: new Date() })
      .where(eq(payments.id, id))
      .returning();
    return payment;
  }

  // Analytics operations
  async recordEvent(event: InsertAnalyticsEvent): Promise<AnalyticsEvent> {
    const [newEvent] = await db.insert(analyticsEvents).values(event).returning();
    return newEvent;
  }

  async getAnalytics(days = 30): Promise<{
    totalArticles: number;
    totalViews: number;
    totalUsers: number;
    totalRevenue: number;
    recentEvents: AnalyticsEvent[];
  }> {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);

    const [articleCount] = await db.select({ count: count() }).from(articles);
    const [totalViews] = await db.select({ views: sum(articles.views) }).from(articles);
    const [userCount] = await db.select({ count: count() }).from(users);
    const [revenue] = await db
      .select({ total: sum(payments.amount) })
      .from(payments)
      .where(eq(payments.status, 'completed'));

    const recentEvents = await db
      .select()
      .from(analyticsEvents)
      .where(sql`${analyticsEvents.createdAt} >= ${cutoffDate}`)
      .orderBy(desc(analyticsEvents.createdAt))
      .limit(10);

    return {
      totalArticles: articleCount.count,
      totalViews: Number(totalViews.views) || 0,
      totalUsers: userCount.count,
      totalRevenue: Number(revenue.total) || 0,
      recentEvents,
    };
  }
}

export const storage = new DatabaseStorage();
