var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined") return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// shared/types/schema.ts
import { pgTable, serial, varchar, text, integer, timestamp, boolean, decimal, jsonb, inet } from "drizzle-orm/pg-core";
var blogCategories, blogPosts, users, mediaFiles, sessions, contacts, settings, analyticsPageViews, analyticsSessions, analyticsDailyStats, analyticsRealtime, documentationSections, documentationContent, documentationMenu, menuItems, documentationSearchIndex, documentationFiles, documentationConversions, documentationContentVersions, documentationContentLocks, emailTemplates, mailingLists, mailingCampaigns, mailingListRecipients, mailingListSubscriptions, products, cartItems, orders, orderItems, paymentTransactions, footerConfigs, footerHistory;
var init_schema = __esm({
  "shared/types/schema.ts"() {
    "use strict";
    blogCategories = pgTable("blog_categories", {
      id: serial("id").primaryKey(),
      name: varchar("name", { length: 255 }).notNull(),
      slug: varchar("slug", { length: 255 }).unique().notNull(),
      description: text("description"),
      parentId: integer("parent_id"),
      sortOrder: integer("sort_order").default(0),
      createdAt: timestamp("created_at").defaultNow(),
      updatedAt: timestamp("updated_at").defaultNow()
    });
    blogPosts = pgTable("blog_posts", {
      id: serial("id").primaryKey(),
      title: text("title").notNull(),
      description: text("description").notNull(),
      content: text("content").notNull(),
      categoryId: integer("category_id").references(() => blogCategories.id, { onDelete: "set null" }),
      imageUrl: text("image_url").default(""),
      thumbnailUrl: text("thumbnail_url"),
      projectUrl: text("project_url"),
      technologies: text("technologies").array().default([]),
      tags: text("tags").array().default([]),
      slug: text("slug"),
      status: varchar("status", { length: 20 }).default("draft"),
      createdAt: timestamp("created_at").defaultNow(),
      updatedAt: timestamp("updated_at").defaultNow()
    });
    users = pgTable("users", {
      id: varchar("id").primaryKey(),
      username: varchar("username").unique(),
      email: varchar("email").unique().notNull(),
      password: varchar("password").notNull(),
      firstName: varchar("first_name"),
      lastName: varchar("last_name"),
      role: varchar("role").default("user").notNull(),
      emailVerified: boolean("email_verified").default(false),
      verificationToken: varchar("verification_token"),
      resetPasswordToken: varchar("reset_password_token"),
      resetPasswordExpires: timestamp("reset_password_expires"),
      profileImageUrl: varchar("profile_image_url"),
      emailNotifications: boolean("email_notifications").default(true),
      marketingEmails: boolean("marketing_emails").default(false),
      isBlocked: boolean("is_blocked").default(false),
      isScheduledForDeletion: boolean("is_scheduled_for_deletion").default(false),
      deletionScheduledAt: timestamp("deletion_scheduled_at"),
      deletionReason: text("deletion_reason"),
      createdAt: timestamp("created_at").defaultNow(),
      updatedAt: timestamp("updated_at").defaultNow()
    });
    mediaFiles = pgTable("media_files", {
      id: serial("id").primaryKey(),
      filename: text("filename").notNull(),
      originalName: text("original_name").notNull(),
      mimeType: text("mime_type").notNull(),
      size: integer("size").notNull(),
      url: text("url").notNull(),
      thumbnailUrl: text("thumbnail_url"),
      category: varchar("category", { length: 50 }),
      source: varchar("source", { length: 20 }).default("general"),
      folderPath: varchar("folder_path", { length: 255 }),
      createdAt: timestamp("created_at").defaultNow()
    });
    sessions = pgTable("sessions", {
      sid: varchar("sid").primaryKey(),
      sess: text("sess").notNull(),
      expire: timestamp("expire").notNull()
    });
    contacts = pgTable("contacts", {
      id: serial("id").primaryKey(),
      firstName: text("first_name").notNull(),
      lastName: text("last_name").notNull(),
      email: text("email").notNull(),
      message: text("message").notNull(),
      createdAt: timestamp("created_at").defaultNow()
    });
    settings = pgTable("settings", {
      id: serial("id").primaryKey(),
      key: varchar("key", { length: 255 }).unique().notNull(),
      value: text("value"),
      updatedAt: timestamp("updated_at").defaultNow()
    });
    analyticsPageViews = pgTable("analytics_page_views", {
      id: serial("id").primaryKey(),
      sessionId: varchar("session_id", { length: 255 }).notNull(),
      pagePath: varchar("page_path", { length: 500 }).notNull(),
      pageTitle: varchar("page_title", { length: 500 }),
      referrer: varchar("referrer", { length: 500 }),
      userAgent: text("user_agent"),
      ipAddress: inet("ip_address"),
      country: varchar("country", { length: 2 }),
      deviceType: varchar("device_type", { length: 50 }),
      browser: varchar("browser", { length: 100 }),
      os: varchar("os", { length: 100 }),
      screenResolution: varchar("screen_resolution", { length: 20 }),
      timeOnPage: integer("time_on_page").default(0),
      createdAt: timestamp("created_at").defaultNow()
    });
    analyticsSessions = pgTable("analytics_sessions", {
      id: varchar("id", { length: 255 }).primaryKey(),
      userId: varchar("user_id").references(() => users.id, { onDelete: "set null" }),
      ipAddress: inet("ip_address"),
      userAgent: text("user_agent"),
      country: varchar("country", { length: 2 }),
      deviceType: varchar("device_type", { length: 50 }),
      browser: varchar("browser", { length: 100 }),
      os: varchar("os", { length: 100 }),
      entryPage: varchar("entry_page", { length: 500 }),
      exitPage: varchar("exit_page", { length: 500 }),
      pageViewsCount: integer("page_views_count").default(0),
      durationSeconds: integer("duration_seconds").default(0),
      isBounce: boolean("is_bounce").default(false),
      createdAt: timestamp("created_at").defaultNow(),
      updatedAt: timestamp("updated_at").defaultNow()
    });
    analyticsDailyStats = pgTable("analytics_daily_stats", {
      id: serial("id").primaryKey(),
      date: varchar("date", { length: 10 }).unique().notNull(),
      pageViews: integer("page_views").default(0),
      uniqueVisitors: integer("unique_visitors").default(0),
      sessions: integer("sessions").default(0),
      bounceRate: decimal("bounce_rate", { precision: 5, scale: 2 }).default("0.00"),
      avgSessionDuration: integer("avg_session_duration").default(0),
      topPages: jsonb("top_pages").default("[]"),
      topReferrers: jsonb("top_referrers").default("[]"),
      deviceBreakdown: jsonb("device_breakdown").default("{}"),
      countryBreakdown: jsonb("country_breakdown").default("{}"),
      createdAt: timestamp("created_at").defaultNow(),
      updatedAt: timestamp("updated_at").defaultNow()
    });
    analyticsRealtime = pgTable("analytics_realtime", {
      id: serial("id").primaryKey(),
      activeUsers: integer("active_users").default(0),
      currentPageViews: jsonb("current_page_views").default("{}"),
      updatedAt: timestamp("updated_at").defaultNow()
    });
    documentationSections = pgTable("documentation_sections", {
      id: serial("id").primaryKey(),
      title: varchar("title", { length: 255 }).notNull(),
      slug: varchar("slug", { length: 255 }).unique().notNull(),
      description: text("description"),
      parentId: integer("parent_id"),
      sortOrder: integer("sort_order").default(0),
      isActive: boolean("is_active").default(true),
      createdAt: timestamp("created_at").defaultNow(),
      updatedAt: timestamp("updated_at").defaultNow()
    });
    documentationContent = pgTable("documentation_content", {
      id: serial("id").primaryKey(),
      sectionId: integer("section_id").references(() => documentationSections.id, { onDelete: "cascade" }),
      title: varchar("title", { length: 255 }).notNull(),
      slug: varchar("slug", { length: 255 }).notNull(),
      content: text("content").notNull(),
      excerpt: text("excerpt"),
      tags: text("tags").array().default([]),
      isPublished: boolean("is_published").default(false),
      publishedAt: timestamp("published_at"),
      authorId: varchar("author_id").references(() => users.id, { onDelete: "set null" }),
      viewCount: integer("view_count").default(0),
      createdAt: timestamp("created_at").defaultNow(),
      updatedAt: timestamp("updated_at").defaultNow()
    });
    documentationMenu = pgTable("documentation_menu", {
      id: serial("id").primaryKey(),
      title: varchar("title", { length: 255 }).notNull(),
      url: varchar("url", { length: 500 }),
      parentId: integer("parent_id"),
      sortOrder: integer("sort_order").default(0),
      isActive: boolean("is_active").default(true),
      createdAt: timestamp("created_at").defaultNow(),
      updatedAt: timestamp("updated_at").defaultNow()
    });
    menuItems = pgTable("menu_items", {
      id: serial("id").primaryKey(),
      title: varchar("title", { length: 255 }).notNull(),
      url: varchar("url", { length: 500 }),
      parentId: integer("parent_id"),
      orderIndex: integer("order_index").default(0),
      isActive: boolean("is_active").default(true),
      target: varchar("target", { length: 10 }).default("_self"),
      icon: varchar("icon", { length: 100 }),
      type: varchar("type", { length: 20 }).default("manual"),
      createdAt: timestamp("created_at").defaultNow(),
      updatedAt: timestamp("updated_at").defaultNow()
    });
    documentationSearchIndex = pgTable("documentation_search_index", {
      id: serial("id").primaryKey(),
      contentId: integer("content_id").references(() => documentationContent.id, { onDelete: "cascade" }),
      title: text("title").notNull(),
      content: text("content").notNull(),
      searchVector: text("search_vector"),
      updatedAt: timestamp("updated_at").defaultNow()
    });
    documentationFiles = pgTable("documentation_files", {
      id: serial("id").primaryKey(),
      contentId: integer("content_id").references(() => documentationContent.id, { onDelete: "cascade" }),
      filename: varchar("filename", { length: 255 }).notNull(),
      originalName: varchar("original_name", { length: 255 }).notNull(),
      mimeType: varchar("mime_type", { length: 100 }).notNull(),
      size: integer("size").notNull(),
      url: text("url").notNull(),
      createdAt: timestamp("created_at").defaultNow()
    });
    documentationConversions = pgTable("documentation_conversions", {
      id: serial("id").primaryKey(),
      sourceFormat: varchar("source_format", { length: 50 }).notNull(),
      targetFormat: varchar("target_format", { length: 50 }).notNull(),
      sourceContent: text("source_content").notNull(),
      convertedContent: text("converted_content").notNull(),
      status: varchar("status", { length: 20 }).default("completed"),
      createdAt: timestamp("created_at").defaultNow()
    });
    documentationContentVersions = pgTable("documentation_content_versions", {
      id: serial("id").primaryKey(),
      contentId: integer("content_id").references(() => documentationContent.id, { onDelete: "cascade" }),
      version: integer("version").notNull(),
      title: varchar("title", { length: 255 }).notNull(),
      content: text("content").notNull(),
      changeLog: text("change_log"),
      authorId: varchar("author_id").references(() => users.id, { onDelete: "set null" }),
      createdAt: timestamp("created_at").defaultNow()
    });
    documentationContentLocks = pgTable("documentation_content_locks", {
      id: serial("id").primaryKey(),
      contentId: integer("content_id").references(() => documentationContent.id, { onDelete: "cascade" }),
      userId: varchar("user_id").references(() => users.id, { onDelete: "cascade" }),
      lockedAt: timestamp("locked_at").defaultNow(),
      expiresAt: timestamp("expires_at").notNull()
    });
    emailTemplates = pgTable("email_templates", {
      id: serial("id").primaryKey(),
      name: varchar("name", { length: 255 }).notNull(),
      subject: varchar("subject", { length: 255 }).notNull(),
      htmlContent: text("html_content").notNull(),
      textContent: text("text_content"),
      variables: jsonb("variables").default("[]"),
      isActive: boolean("is_active").default(true),
      createdAt: timestamp("created_at").defaultNow(),
      updatedAt: timestamp("updated_at").defaultNow()
    });
    mailingLists = pgTable("mailing_lists", {
      id: serial("id").primaryKey(),
      name: varchar("name", { length: 255 }).notNull(),
      description: text("description"),
      isActive: boolean("is_active").default(true),
      subscriberCount: integer("subscriber_count").default(0),
      createdAt: timestamp("created_at").defaultNow(),
      updatedAt: timestamp("updated_at").defaultNow()
    });
    mailingCampaigns = pgTable("mailing_campaigns", {
      id: serial("id").primaryKey(),
      name: varchar("name", { length: 255 }).notNull(),
      subject: varchar("subject", { length: 255 }).notNull(),
      templateId: integer("template_id").references(() => emailTemplates.id, { onDelete: "set null" }),
      mailingListId: integer("mailing_list_id").references(() => mailingLists.id, { onDelete: "cascade" }),
      status: varchar("status", { length: 20 }).default("draft"),
      scheduledAt: timestamp("scheduled_at"),
      sentAt: timestamp("sent_at"),
      recipientCount: integer("recipient_count").default(0),
      openCount: integer("open_count").default(0),
      clickCount: integer("click_count").default(0),
      createdAt: timestamp("created_at").defaultNow(),
      updatedAt: timestamp("updated_at").defaultNow()
    });
    mailingListRecipients = pgTable("mailing_list_recipients", {
      id: serial("id").primaryKey(),
      mailingListId: integer("mailing_list_id").references(() => mailingLists.id, { onDelete: "cascade" }),
      email: varchar("email", { length: 255 }).notNull(),
      firstName: varchar("first_name", { length: 255 }),
      lastName: varchar("last_name", { length: 255 }),
      isActive: boolean("is_active").default(true),
      subscribedAt: timestamp("subscribed_at").defaultNow(),
      unsubscribedAt: timestamp("unsubscribed_at")
    });
    mailingListSubscriptions = pgTable("mailing_list_subscriptions", {
      id: serial("id").primaryKey(),
      email: varchar("email", { length: 255 }).notNull(),
      mailingListId: integer("mailing_list_id").references(() => mailingLists.id, { onDelete: "cascade" }),
      status: varchar("status", { length: 20 }).default("subscribed"),
      subscribedAt: timestamp("subscribed_at").defaultNow(),
      unsubscribedAt: timestamp("unsubscribed_at"),
      confirmationToken: varchar("confirmation_token", { length: 255 }),
      confirmedAt: timestamp("confirmed_at")
    });
    products = pgTable("products", {
      id: varchar("id").primaryKey(),
      // UUID as varchar
      title: varchar("title", { length: 255 }).notNull(),
      description: text("description"),
      content: text("content"),
      price: decimal("price", { precision: 10, scale: 2 }),
      image: varchar("image", { length: 500 }),
      slug: varchar("slug", { length: 255 }).unique().notNull(),
      categoryId: varchar("category_id"),
      // UUID references product_categories
      features: jsonb("features").default("[]"),
      isActive: boolean("is_active").default(true),
      sortOrder: integer("sort_order").default(0),
      createdAt: timestamp("created_at").defaultNow(),
      updatedAt: timestamp("updated_at").defaultNow()
    });
    cartItems = pgTable("cart_items", {
      id: varchar("id").primaryKey(),
      // UUID as varchar
      userId: varchar("user_id").references(() => users.id, { onDelete: "cascade" }),
      sessionId: varchar("session_id", { length: 255 }),
      productId: varchar("product_id"),
      // UUID as varchar, references products.id
      quantity: integer("quantity").notNull().default(1),
      price: decimal("price", { precision: 10, scale: 2 }).notNull(),
      createdAt: timestamp("created_at").defaultNow(),
      updatedAt: timestamp("updated_at").defaultNow()
    });
    orders = pgTable("orders", {
      id: varchar("id").primaryKey(),
      userId: varchar("user_id").references(() => users.id, { onDelete: "set null" }),
      orderNumber: varchar("order_number", { length: 50 }).unique().notNull(),
      status: varchar("status", { length: 50 }).default("pending"),
      subtotal: decimal("subtotal", { precision: 10, scale: 2 }).notNull(),
      taxAmount: decimal("tax_amount", { precision: 10, scale: 2 }).default("0"),
      shippingAmount: decimal("shipping_amount", { precision: 10, scale: 2 }).default("0"),
      totalAmount: decimal("total_amount", { precision: 10, scale: 2 }).notNull(),
      currency: varchar("currency", { length: 3 }).default("USD"),
      paymentStatus: varchar("payment_status", { length: 50 }).default("pending"),
      paymentMethod: varchar("payment_method", { length: 50 }),
      paymentTransactionId: varchar("payment_transaction_id", { length: 255 }),
      shippingAddress: jsonb("shipping_address"),
      billingAddress: jsonb("billing_address"),
      notes: text("notes"),
      createdAt: timestamp("created_at").defaultNow(),
      updatedAt: timestamp("updated_at").defaultNow()
    });
    orderItems = pgTable("order_items", {
      id: varchar("id").primaryKey(),
      orderId: varchar("order_id").references(() => orders.id, { onDelete: "cascade" }),
      productId: varchar("product_id"),
      quantity: integer("quantity").notNull(),
      unitPrice: decimal("unit_price", { precision: 10, scale: 2 }).notNull(),
      totalPrice: decimal("total_price", { precision: 10, scale: 2 }).notNull(),
      productSnapshot: jsonb("product_snapshot")
    });
    paymentTransactions = pgTable("payment_transactions", {
      id: varchar("id").primaryKey(),
      orderId: varchar("order_id").references(() => orders.id, { onDelete: "cascade" }),
      transactionId: varchar("transaction_id", { length: 255 }).unique(),
      paymentMethod: varchar("payment_method", { length: 50 }),
      gateway: varchar("gateway", { length: 50 }),
      amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
      currency: varchar("currency", { length: 3 }).default("USD"),
      status: varchar("status", { length: 50 }).default("pending"),
      gatewayResponse: jsonb("gateway_response"),
      createdAt: timestamp("created_at").defaultNow()
    });
    footerConfigs = pgTable("footer_configs", {
      id: serial("id").primaryKey(),
      version: integer("version").notNull().default(1),
      isActive: boolean("is_active").default(false),
      config: jsonb("config").notNull(),
      createdAt: timestamp("created_at").defaultNow(),
      updatedAt: timestamp("updated_at").defaultNow(),
      createdBy: varchar("created_by").references(() => users.id, { onDelete: "set null" })
    });
    footerHistory = pgTable("footer_history", {
      id: serial("id").primaryKey(),
      footerConfigId: integer("footer_config_id").references(() => footerConfigs.id, { onDelete: "cascade" }),
      config: jsonb("config").notNull(),
      changeDescription: text("change_description"),
      createdAt: timestamp("created_at").defaultNow(),
      createdBy: varchar("created_by").references(() => users.id, { onDelete: "set null" })
    });
  }
});

// server/db/db.ts
var db_exports = {};
__export(db_exports, {
  checkDatabaseConnection: () => checkDatabaseConnection,
  db: () => db,
  pool: () => pool
});
import pkg from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import * as dotenv from "dotenv";
async function checkDatabaseConnection() {
  try {
    const client = await pool.connect();
    console.log("Database connection successful");
    client.release();
    return true;
  } catch (error) {
    console.error("Database connection failed:", error);
    return false;
  }
}
var Pool, connectionString, pool, db;
var init_db = __esm({
  "server/db/db.ts"() {
    "use strict";
    init_schema();
    ({ Pool } = pkg);
    dotenv.config();
    connectionString = process.env.DATABASE_URL || "postgres://postgres:12345@89.169.0.223:5432/Porto1";
    pool = new Pool({
      connectionString,
      max: 20,
      // Maximum number of clients in the pool
      idleTimeoutMillis: 3e4,
      // How long a client is allowed to remain idle before being closed
      connectionTimeoutMillis: 5e3
      // How long to wait for a connection to become available
    });
    pool.on("error", (err) => {
      console.error("Unexpected error on idle client", err);
    });
    db = drizzle(pool, {
      schema: {
        users,
        sessions,
        blogPosts,
        mediaFiles,
        contacts,
        analyticsPageViews,
        analyticsSessions,
        analyticsDailyStats,
        analyticsRealtime,
        products,
        cartItems,
        orders,
        orderItems,
        paymentTransactions,
        footerConfigs,
        footerHistory,
        menuItems
      }
    });
    checkDatabaseConnection().catch((err) => {
      console.error("Initial database connection check failed:", err);
    });
  }
});

// server/db/redis.ts
import { createClient } from "redis";
async function getRedisClient() {
  if (!redisEnabled) {
    return null;
  }
  if (!redisClient) {
    try {
      const url = process.env.REDIS_URL || "redis://89.169.0.223:6379";
      redisClient = createClient({ url });
      redisClient.on("error", (err) => {
        console.error("Redis Client Error:", err);
        if (err.code === "ECONNREFUSED") {
          console.warn("Redis connection failed. Disabling Redis cache.");
          redisEnabled = false;
          redisClient = null;
        }
      });
      await redisClient.connect();
    } catch (error) {
      console.error("Failed to connect to Redis:", error);
      redisEnabled = false;
      return null;
    }
  }
  return redisClient;
}
async function checkRedisConnection() {
  try {
    const client = await getRedisClient();
    if (!client) return false;
    await client.ping();
    return true;
  } catch (error) {
    console.error("Redis connection check failed:", error);
    redisEnabled = false;
    return false;
  }
}
var redisClient, redisEnabled;
var init_redis = __esm({
  "server/db/redis.ts"() {
    "use strict";
    redisClient = null;
    redisEnabled = true;
  }
});

// server/services/userService.ts
var userService_exports = {};
__export(userService_exports, {
  blockUser: () => blockUser,
  createUser: () => createUser,
  deleteUser: () => deleteUser,
  getAllUsers: () => getAllUsers,
  getUserById: () => getUserById,
  getUsersPaginated: () => getUsersPaginated,
  terminateUserSessions: () => terminateUserSessions,
  updateUser: () => updateUser,
  updateUserSessions: () => updateUserSessions,
  verifyUserEmail: () => verifyUserEmail
});
import { eq, like } from "drizzle-orm";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
async function getAllUsers() {
  try {
    const result = await db.select().from(users).orderBy(users.createdAt);
    return result.map((user) => {
      const { password: _, ...userWithoutPassword } = user;
      return userWithoutPassword;
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
}
async function getUsersPaginated(page = 1, limit = 10) {
  try {
    const offset = (page - 1) * limit;
    const allUsers = await db.select().from(users);
    const total = allUsers.length;
    const totalPages = Math.ceil(total / limit);
    const result = await db.select().from(users).orderBy(users.createdAt).limit(limit).offset(offset);
    const data = result.map((user) => {
      const { password: _, ...userWithoutPassword } = user;
      return userWithoutPassword;
    });
    return {
      data,
      total,
      totalPages
    };
  } catch (error) {
    console.error("Error fetching paginated users:", error);
    return {
      data: [],
      total: 0,
      totalPages: 1
    };
  }
}
async function getUserById(userId) {
  const result = await db.select().from(users).where(eq(users.id, userId));
  if (result.length === 0) {
    return null;
  }
  const { password: _, ...userWithoutPassword } = result[0];
  return userWithoutPassword;
}
async function createUser(data) {
  try {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const username = data.username || data.firstName || (data.email ? data.email.split("@")[0] : null);
    let isBlocked = false;
    if (data.isBlocked !== void 0) {
      isBlocked = data.isBlocked;
    } else if (data.isActive !== void 0) {
      isBlocked = !data.isActive;
    } else if (data.status !== void 0) {
      isBlocked = data.status !== "active";
    }
    const result = await db.insert(users).values({
      id: uuidv4(),
      username,
      email: data.email,
      password: hashedPassword,
      firstName: data.firstName || null,
      lastName: data.lastName || null,
      role: data.role || "user",
      isBlocked,
      emailVerified: false,
      profileImageUrl: data.profileImageUrl || null,
      createdAt: /* @__PURE__ */ new Date(),
      updatedAt: /* @__PURE__ */ new Date()
    }).returning();
    if (result.length === 0) {
      throw new Error("Failed to create user");
    }
    const { password: _, ...userWithoutPassword } = result[0];
    return userWithoutPassword;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
}
async function updateUser(userId, data) {
  try {
    const updateData = {};
    if (data.firstName !== void 0) updateData.firstName = data.firstName;
    if (data.lastName !== void 0) updateData.lastName = data.lastName;
    if (data.email !== void 0) updateData.email = data.email;
    if (data.role !== void 0) updateData.role = data.role;
    if (data.emailNotifications !== void 0) updateData.emailNotifications = data.emailNotifications;
    if (data.marketingEmails !== void 0) updateData.marketingEmails = data.marketingEmails;
    if (data.username !== void 0) updateData.username = data.username;
    if (data.isBlocked !== void 0) updateData.isBlocked = data.isBlocked;
    if (data.profileImageUrl !== void 0) updateData.profileImageUrl = data.profileImageUrl;
    if (data.status !== void 0) {
      updateData.isBlocked = data.status !== "active";
    }
    if (data.isActive !== void 0) {
      updateData.isBlocked = !data.isActive;
    }
    if (data.password && data.password.trim()) {
      updateData.password = await bcrypt.hash(data.password, 10);
    }
    updateData.updatedAt = /* @__PURE__ */ new Date();
    const result = await db.update(users).set(updateData).where(eq(users.id, userId)).returning();
    if (result.length === 0) {
      return null;
    }
    const { password: _, ...userWithoutPassword } = result[0];
    return userWithoutPassword;
  } catch (error) {
    console.error(`Error updating user ${userId}:`, error);
    if (error instanceof Error) {
      console.error("Error message:", error.message);
    }
    throw error;
  }
}
async function blockUser(userId, isBlocked) {
  const result = await db.update(users).set({
    isBlocked,
    updatedAt: /* @__PURE__ */ new Date()
  }).where(eq(users.id, userId)).returning();
  if (result.length === 0) {
    return null;
  }
  const { password: _, ...userWithoutPassword } = result[0];
  return userWithoutPassword;
}
async function deleteUser(userId) {
  try {
    const userToDelete = await getUserById(userId);
    if (!userToDelete) {
      throw new Error("User not found");
    }
    if (userToDelete.role === "admin") {
      throw new Error("Administrator accounts cannot be deleted");
    }
    try {
      await db.execute(`DELETE FROM mailing_list_recipients WHERE user_id = '${userId}'`);
      await terminateUserSessions(userId);
    } catch (relatedDataError) {
      console.log("Error deleting related data:", relatedDataError);
    }
    const result = await db.delete(users).where(eq(users.id, userId)).returning();
    return result.length > 0;
  } catch (error) {
    console.error(`Error in deleteUser service for userId ${userId}:`, error);
    throw error;
  }
}
async function updateUserSessions(userId, updatedUser) {
  try {
    const userSessions = await db.select().from(sessions).where(like(sessions.sess, `%"id":"${userId}"%`)).catch(() => []);
    for (const session2 of userSessions) {
      try {
        const sessionData = session2.sess;
        if (sessionData && sessionData.user && sessionData.user.id === userId) {
          const { password: _, ...userWithoutPassword } = updatedUser;
          sessionData.user = userWithoutPassword;
          await db.update(sessions).set({ sess: sessionData }).where(eq(sessions.sid, session2.sid));
        }
      } catch (sessionError) {
        console.log("Error updating individual session:", sessionError);
      }
    }
  } catch (error) {
    console.log("Error in updateUserSessions:", error);
  }
}
async function terminateUserSessions(userId) {
  try {
    const result = await db.select().from(sessions).limit(1).catch(() => null);
    if (result === null) {
      console.log("Sessions table not available, skipping session termination");
      return;
    }
    await db.delete(sessions).where(like(sessions.sess, `%"userId":"${userId}"%`)).catch((err) => {
      console.log("Error deleting sessions, continuing with user deletion:", err);
    });
  } catch (error) {
    console.log("Error in terminateUserSessions, continuing with user deletion:", error);
  }
}
async function verifyUserEmail(userId) {
  try {
    const result = await db.update(users).set({
      emailVerified: true,
      updatedAt: /* @__PURE__ */ new Date()
    }).where(eq(users.id, userId)).returning();
    if (result.length === 0) {
      return null;
    }
    const { password: _, ...userWithoutPassword } = result[0];
    return userWithoutPassword;
  } catch (error) {
    console.error("Error verifying user email:", error);
    throw error;
  }
}
var init_userService = __esm({
  "server/services/userService.ts"() {
    "use strict";
    init_db();
    init_schema();
  }
});

// server/services/emailService.ts
var emailService_exports = {};
__export(emailService_exports, {
  EmailService: () => EmailService,
  emailService: () => emailService
});
import nodemailer from "nodemailer";
var EmailService, emailService;
var init_emailService = __esm({
  "server/services/emailService.ts"() {
    "use strict";
    init_db();
    init_schema();
    EmailService = class {
      constructor() {
        this.transporter = null;
      }
      async initialize() {
        const emailSettings = await this.getEmailSettings();
        if (!emailSettings.smtpHost) {
          console.warn("Email service not configured - SMTP settings missing");
          return;
        }
        this.transporter = nodemailer.createTransport({
          host: emailSettings.smtpHost,
          port: emailSettings.smtpPort,
          secure: emailSettings.smtpPort === 465,
          auth: emailSettings.smtpUser && emailSettings.smtpPass ? {
            user: emailSettings.smtpUser,
            pass: emailSettings.smtpPass
          } : void 0,
          // Для локального Postfix аутентификация может не требоваться
          tls: {
            rejectUnauthorized: false
            // Для локального сервера
          }
        });
      }
      async getEmailSettings() {
        try {
          const allSettings = await db.select().from(settings);
          const settingsObj = allSettings.reduce((acc, setting) => {
            acc[setting.key] = setting.value || "";
            return acc;
          }, {});
          return {
            smtpHost: settingsObj.smtpHost || process.env.SMTP_HOST || "localhost",
            smtpPort: parseInt(settingsObj.smtpPort || process.env.SMTP_PORT || "587"),
            smtpUser: settingsObj.smtpUser || process.env.SMTP_USER || "noreply@blogpro.tech",
            smtpPass: settingsObj.smtpPass || process.env.SMTP_PASS || "",
            recipientEmail: settingsObj.contactRecipientEmail || "genavinogradov@gmail.com"
          };
        } catch (error) {
          console.error("Failed to load email settings:", error);
          return {
            smtpHost: process.env.SMTP_HOST || "localhost",
            smtpPort: parseInt(process.env.SMTP_PORT || "587"),
            smtpUser: process.env.SMTP_USER || "noreply@blogpro.tech",
            smtpPass: process.env.SMTP_PASS || "",
            recipientEmail: "genavinogradov@gmail.com"
          };
        }
      }
      async sendContactMessage(contactData) {
        if (!this.transporter) {
          await this.initialize();
        }
        if (!this.transporter) {
          throw new Error("Email service not configured");
        }
        const emailSettings = await this.getEmailSettings();
        const mailOptions = {
          from: `"${contactData.firstName} ${contactData.lastName}" <${emailSettings.smtpUser}>`,
          to: emailSettings.recipientEmail,
          replyTo: contactData.email,
          subject: `\u{1F4E7} \u041D\u043E\u0432\u043E\u0435 \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0435 \u043E\u0442 ${contactData.firstName} ${contactData.lastName}`,
          html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Contact Message</title>
        </head>
        <body style="margin: 0; padding: 0; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td align="center" style="padding: 40px 20px;">
                <table width="600" cellpadding="0" cellspacing="0" style="background: white; border-radius: 20px; box-shadow: 0 20px 40px rgba(0,0,0,0.1); overflow: hidden;">
                  <tr>
                    <td style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px; text-align: center;">
                      <h1 style="color: white; margin: 0; font-size: 32px; font-weight: 700;">BlogPro</h1>
                      <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0; font-size: 16px;">\u041D\u043E\u0432\u043E\u0435 \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0435</p>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 40px;">
                      <h2 style="color: #333; margin: 0 0 30px 0; font-size: 24px;">\u041A\u043E\u043D\u0442\u0430\u043A\u0442\u043D\u0430\u044F \u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044F</h2>
                      <div style="background: #f8fafc; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
                        <p style="margin: 0 0 10px 0; color: #374151;"><strong>\u0418\u043C\u044F:</strong> ${contactData.firstName} ${contactData.lastName}</p>
                        <p style="margin: 0; color: #374151;"><strong>Email:</strong> ${contactData.email}</p>
                      </div>
                      <h3 style="color: #333; margin: 0 0 15px 0; font-size: 18px;">\u0421\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0435:</h3>
                      <div style="background: #f0f9ff; padding: 20px; border-radius: 10px; border-left: 4px solid #2563eb;">
                        <p style="color: #374151; line-height: 1.6; margin: 0;">${contactData.message.replace(/\n/g, "<br>")}</p>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td style="background: #f8fafc; padding: 30px 40px; text-align: center; border-top: 1px solid #e2e8f0;">
                      <p style="color: #94a3b8; font-size: 12px; margin: 0;">\xA9 2026 BlogPro. \u0412\u0441\u0435 \u043F\u0440\u0430\u0432\u0430 \u0437\u0430\u0449\u0438\u0449\u0435\u043D\u044B.</p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `
        };
        await this.transporter.sendMail(mailOptions);
      }
    };
    emailService = new EmailService();
  }
});

// server/services/blogService.ts
import { eq as eq3, or as or2, ilike, sql, and } from "drizzle-orm";
async function getBlogPosts() {
  try {
    console.log("\u{1F50D} Fetching all blog posts from database...");
    const result = await db.select().from(blogPosts).orderBy(blogPosts.createdAt);
    console.log(`\u2705 Successfully fetched ${result.length} blog posts`);
    if (result.length > 0) {
      console.log("\u{1F4C4} Sample post structure:", {
        id: result[0].id,
        title: result[0].title,
        hasContent: !!result[0].content,
        status: result[0].status,
        createdAt: result[0].createdAt,
        updatedAt: result[0].updatedAt,
        createdAtType: typeof result[0].createdAt,
        updatedAtType: typeof result[0].updatedAt
      });
    }
    return result;
  } catch (error) {
    console.error("\u274C Error fetching blog posts:", error);
    console.error("\u274C Error details:", {
      name: error instanceof Error ? error.name : "Unknown",
      message: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : "No stack trace"
    });
    throw error;
  }
}
async function getBlogPostsPaginated(page = 1, limit = 10) {
  try {
    const offset = (page - 1) * limit;
    const allPosts = await db.select().from(blogPosts);
    const total = allPosts.length;
    const totalPages = Math.ceil(total / limit);
    const data = await db.select().from(blogPosts).orderBy(blogPosts.createdAt).limit(limit).offset(offset);
    return {
      data,
      total,
      totalPages
    };
  } catch (error) {
    console.error("Error fetching paginated blog posts:", error);
    return {
      data: [],
      total: 0,
      totalPages: 1
    };
  }
}
async function getFeaturedBlogPosts() {
  return await db.select().from(blogPosts).where(eq3(blogPosts.status, "published")).orderBy(blogPosts.createdAt);
}
async function getBlogPost(id) {
  const results = await db.select().from(blogPosts).where(eq3(blogPosts.id, id));
  return results[0];
}
async function createBlogPost(data) {
  const cleanContent = data.content.replace(/&nbsp;/g, " ").replace(/\s+/g, " ").trim();
  const dbData = {
    title: data.title,
    description: data.description,
    content: cleanContent,
    categoryId: data.categoryId,
    imageUrl: data.imageUrl || null,
    thumbnailUrl: data.thumbnailUrl || null,
    projectUrl: data.projectUrl || null,
    technologies: data.technologies || [],
    tags: data.tags || [],
    slug: data.slug,
    status: data.status || "draft"
  };
  const result = await db.insert(blogPosts).values(dbData).returning();
  return result[0];
}
async function updateBlogPost(id, data) {
  const dbData = {};
  if (data.title !== void 0) dbData.title = data.title;
  if (data.description !== void 0) dbData.description = data.description;
  if (data.content !== void 0) {
    dbData.content = data.content.replace(/&nbsp;/g, " ").replace(/\s+/g, " ").trim();
  }
  if (data.categoryId !== void 0) dbData.categoryId = data.categoryId;
  if (data.imageUrl !== void 0) dbData.imageUrl = data.imageUrl;
  if (data.thumbnailUrl !== void 0) dbData.thumbnailUrl = data.thumbnailUrl;
  if (data.projectUrl !== void 0) dbData.projectUrl = data.projectUrl;
  if (data.technologies !== void 0) dbData.technologies = data.technologies;
  if (data.tags !== void 0) dbData.tags = data.tags;
  if (data.slug !== void 0) dbData.slug = data.slug;
  if (data.status !== void 0) dbData.status = data.status;
  dbData.updatedAt = /* @__PURE__ */ new Date();
  const result = await db.update(blogPosts).set(dbData).where(eq3(blogPosts.id, id)).returning();
  return result[0];
}
async function deleteBlogPost(id) {
  try {
    console.log(`\u{1F5D1}\uFE0F Attempting to delete blog post with ID: ${id}`);
    console.log(`\u{1F50D} ID type: ${typeof id}, value: ${id}`);
    const existingPost = await db.select().from(blogPosts).where(eq3(blogPosts.id, id));
    console.log(`\u{1F4CB} Post exists check: ${existingPost.length > 0 ? "Found" : "Not found"}`);
    if (existingPost.length === 0) {
      console.log(`\u26A0\uFE0F Blog post with ID ${id} not found in database`);
      return false;
    }
    console.log(`\u{1F4C4} Found post to delete:`, existingPost[0]);
    console.log(`\u{1F525} Executing DELETE query...`);
    const result = await db.delete(blogPosts).where(eq3(blogPosts.id, id)).returning();
    console.log(`\u2705 Delete operation result: ${result.length > 0 ? "Success" : "Failed"}`);
    console.log(`\u{1F522} Deleted rows count: ${result.length}`);
    console.log(`\u{1F4DD} Deleted post data:`, result[0] || "None");
    const verifyPost = await db.select().from(blogPosts).where(eq3(blogPosts.id, id));
    console.log(`\u{1F50D} Verification check: ${verifyPost.length === 0 ? "Post deleted" : "Post still exists!"}`);
    return result.length > 0;
  } catch (error) {
    console.error(`\u274C Error deleting blog post ${id}:`, error);
    throw error;
  }
}
var init_blogService = __esm({
  "server/services/blogService.ts"() {
    "use strict";
    init_db();
    init_schema();
  }
});

// server/services/mediaService.ts
import { eq as eq4 } from "drizzle-orm";
async function getMediaFiles() {
  try {
    return await db.select().from(mediaFiles).orderBy(mediaFiles.createdAt);
  } catch (error) {
    console.error("Error fetching media files:", error);
    return [];
  }
}
async function getMediaFilesPaginated(page = 1, limit = 10) {
  try {
    const offset = (page - 1) * limit;
    const allFiles = await db.select().from(mediaFiles);
    const total = allFiles.length;
    const totalPages = Math.ceil(total / limit);
    const data = await db.select().from(mediaFiles).orderBy(mediaFiles.createdAt).limit(limit).offset(offset);
    return {
      data,
      total,
      totalPages
    };
  } catch (error) {
    console.error("Error fetching paginated media files:", error);
    return {
      data: [],
      total: 0,
      totalPages: 1
    };
  }
}
async function getMediaFile(id) {
  const results = await db.select().from(mediaFiles).where(eq4(mediaFiles.id, id));
  return results[0];
}
async function createMediaFile(data) {
  const result = await db.insert(mediaFiles).values(data).returning();
  return result[0];
}
async function deleteMediaFile(id) {
  const result = await db.delete(mediaFiles).where(eq4(mediaFiles.id, id)).returning();
  return result.length > 0;
}
async function updateMediaFile(id, data) {
  const result = await db.update(mediaFiles).set(data).where(eq4(mediaFiles.id, id)).returning();
  return result[0];
}
var init_mediaService = __esm({
  "server/services/mediaService.ts"() {
    "use strict";
    init_db();
    init_schema();
  }
});

// server/services/contactService.ts
import { eq as eq5 } from "drizzle-orm";
async function getContacts() {
  return await db.select().from(contacts).orderBy(contacts.createdAt);
}
async function getContact(id) {
  const results = await db.select().from(contacts).where(eq5(contacts.id, id));
  return results[0];
}
async function createContact(data) {
  const result = await db.insert(contacts).values(data).returning();
  return result[0];
}
var init_contactService = __esm({
  "server/services/contactService.ts"() {
    "use strict";
    init_db();
    init_schema();
  }
});

// server/services/categoryService.ts
import { eq as eq6, sql as sql2, desc, asc } from "drizzle-orm";
var CategoryService, categoryService;
var init_categoryService = __esm({
  "server/services/categoryService.ts"() {
    "use strict";
    init_db();
    init_schema();
    CategoryService = class {
      // Get all categories as hierarchical tree
      async getCategoriesTree() {
        try {
          console.log("Attempting to fetch categories from database...");
          const categories = await db.select({
            id: blogCategories.id,
            name: blogCategories.name,
            slug: blogCategories.slug,
            description: blogCategories.description,
            parentId: blogCategories.parentId,
            sortOrder: blogCategories.sortOrder,
            createdAt: blogCategories.createdAt,
            updatedAt: blogCategories.updatedAt,
            postCount: sql2`0`
            // Simplified for now
          }).from(blogCategories).orderBy(asc(blogCategories.sortOrder), asc(blogCategories.name));
          console.log("Successfully fetched categories:", categories.length);
          return this.buildCategoryTree(categories);
        } catch (error) {
          console.error("Error in getCategoriesTree:", error);
          console.error("Error details:", {
            message: error instanceof Error ? error.message : "Unknown error",
            stack: error instanceof Error ? error.stack : "No stack trace"
          });
          throw error;
        }
      }
      // Get category by ID with optional children and posts
      async getCategoryById(id, includeChildren = true) {
        const category = await db.select({
          id: blogCategories.id,
          name: blogCategories.name,
          slug: blogCategories.slug,
          description: blogCategories.description,
          parentId: blogCategories.parentId,
          sortOrder: blogCategories.sortOrder,
          createdAt: blogCategories.createdAt,
          updatedAt: blogCategories.updatedAt,
          postCount: sql2`(
          SELECT COUNT(*) FROM blog_posts 
          WHERE category_id = ${blogCategories.id}
        )`
        }).from(blogCategories).where(eq6(blogCategories.id, id)).limit(1);
        if (!category.length) return null;
        const result = {
          ...category[0],
          description: category[0].description || void 0,
          parentId: category[0].parentId || void 0,
          sortOrder: category[0].sortOrder || 0,
          createdAt: category[0].createdAt ? category[0].createdAt.toISOString() : (/* @__PURE__ */ new Date()).toISOString(),
          updatedAt: category[0].updatedAt ? category[0].updatedAt.toISOString() : (/* @__PURE__ */ new Date()).toISOString()
        };
        if (includeChildren) {
          result.children = await this.getCategoryChildren(id);
        }
        return result;
      }
      // Get category by slug
      async getCategoryBySlug(slug) {
        const category = await db.select({
          id: blogCategories.id,
          name: blogCategories.name,
          slug: blogCategories.slug,
          description: blogCategories.description,
          parentId: blogCategories.parentId,
          sortOrder: blogCategories.sortOrder,
          createdAt: blogCategories.createdAt,
          updatedAt: blogCategories.updatedAt,
          postCount: sql2`(
          SELECT COUNT(*) FROM blog_posts 
          WHERE category_id = ${blogCategories.id}
        )`
        }).from(blogCategories).where(eq6(blogCategories.slug, slug)).limit(1);
        if (!category.length) return null;
        return {
          ...category[0],
          description: category[0].description || void 0,
          parentId: category[0].parentId || void 0,
          sortOrder: category[0].sortOrder || 0,
          createdAt: category[0].createdAt ? category[0].createdAt.toISOString() : (/* @__PURE__ */ new Date()).toISOString(),
          updatedAt: category[0].updatedAt ? category[0].updatedAt.toISOString() : (/* @__PURE__ */ new Date()).toISOString()
        };
      }
      // Create new category
      async createCategory(data) {
        const result = await db.insert(blogCategories).values({
          name: data.name,
          slug: data.slug,
          description: data.description,
          parentId: data.parentId,
          sortOrder: data.sortOrder
        }).returning();
        const category = result[0];
        return {
          ...category,
          createdAt: category.createdAt ? category.createdAt.toISOString() : (/* @__PURE__ */ new Date()).toISOString(),
          updatedAt: category.updatedAt ? category.updatedAt.toISOString() : (/* @__PURE__ */ new Date()).toISOString(),
          postCount: 0
        };
      }
      // Update category
      async updateCategory(id, data) {
        const result = await db.update(blogCategories).set({
          ...data,
          updatedAt: /* @__PURE__ */ new Date()
        }).where(eq6(blogCategories.id, id)).returning();
        if (!result.length) return null;
        const category = result[0];
        return {
          ...category,
          createdAt: category.createdAt ? category.createdAt.toISOString() : (/* @__PURE__ */ new Date()).toISOString(),
          updatedAt: category.updatedAt ? category.updatedAt.toISOString() : (/* @__PURE__ */ new Date()).toISOString(),
          postCount: 0
        };
      }
      // Delete category
      async deleteCategory(id) {
        const category = await this.getCategoryById(id, false);
        if (!category) return false;
        await db.update(blogPosts).set({ categoryId: category.parentId || null }).where(eq6(blogPosts.categoryId, id));
        await db.delete(blogCategories).where(eq6(blogCategories.id, id));
        return true;
      }
      // Get posts in category (including subcategories)
      async getCategoryPosts(categoryId, includeSubcategories = true) {
        const category = await this.getCategoryById(categoryId, false);
        if (!category) return null;
        let categoryIds = [categoryId];
        if (includeSubcategories) {
          const descendants = await this.getCategoryDescendants(categoryId);
          categoryIds = [...categoryIds, ...descendants.map((d) => d.id)];
        }
        const posts = await db.select({
          id: blogPosts.id,
          title: blogPosts.title,
          description: blogPosts.description,
          content: blogPosts.content,
          categoryId: blogPosts.categoryId,
          imageUrl: blogPosts.imageUrl,
          thumbnailUrl: blogPosts.thumbnailUrl,
          projectUrl: blogPosts.projectUrl,
          technologies: blogPosts.technologies,
          tags: blogPosts.tags,
          slug: blogPosts.slug,
          status: blogPosts.status,
          createdAt: blogPosts.createdAt,
          updatedAt: blogPosts.updatedAt
        }).from(blogPosts).where(sql2`${blogPosts.categoryId} = ANY(${categoryIds})`).orderBy(desc(blogPosts.createdAt));
        return {
          ...category,
          posts: posts.map((post) => ({
            ...post,
            id: post.id.toString(),
            categoryId: post.categoryId || void 0,
            imageUrl: post.imageUrl || void 0,
            thumbnailUrl: post.thumbnailUrl || void 0,
            projectUrl: post.projectUrl || void 0,
            slug: post.slug || void 0,
            status: post.status || "draft",
            technologies: post.technologies || [],
            tags: post.tags || [],
            created_at: post.createdAt ? post.createdAt.toISOString() : (/* @__PURE__ */ new Date()).toISOString(),
            updated_at: post.updatedAt ? post.updatedAt.toISOString() : (/* @__PURE__ */ new Date()).toISOString()
          }))
        };
      }
      // Get category path (breadcrumb)
      async getCategoryPath(categoryId) {
        const path18 = [];
        let currentId = categoryId;
        while (currentId) {
          const category = await this.getCategoryById(currentId, false);
          if (!category) break;
          path18.unshift(category);
          currentId = category.parentId || null;
        }
        return path18;
      }
      // Private helper methods
      async getCategoryChildren(parentId) {
        const children = await db.select({
          id: blogCategories.id,
          name: blogCategories.name,
          slug: blogCategories.slug,
          description: blogCategories.description,
          parentId: blogCategories.parentId,
          sortOrder: blogCategories.sortOrder,
          createdAt: blogCategories.createdAt,
          updatedAt: blogCategories.updatedAt,
          postCount: sql2`(
          SELECT COUNT(*) FROM blog_posts 
          WHERE category_id = ${blogCategories.id}
        )`
        }).from(blogCategories).where(eq6(blogCategories.parentId, parentId)).orderBy(asc(blogCategories.sortOrder), asc(blogCategories.name));
        return children.map((child) => ({
          ...child,
          description: child.description || void 0,
          parentId: child.parentId || void 0,
          sortOrder: child.sortOrder || 0,
          createdAt: child.createdAt ? child.createdAt.toISOString() : (/* @__PURE__ */ new Date()).toISOString(),
          updatedAt: child.updatedAt ? child.updatedAt.toISOString() : (/* @__PURE__ */ new Date()).toISOString()
        }));
      }
      async getCategoryDescendants(parentId) {
        const descendants = [];
        const children = await this.getCategoryChildren(parentId);
        for (const child of children) {
          descendants.push(child);
          const childDescendants = await this.getCategoryDescendants(child.id);
          descendants.push(...childDescendants);
        }
        return descendants;
      }
      buildCategoryTree(categories) {
        const categoryMap = /* @__PURE__ */ new Map();
        const rootCategories = [];
        categories.forEach((cat) => {
          const node = {
            ...cat,
            createdAt: cat.createdAt ? cat.createdAt.toISOString() : (/* @__PURE__ */ new Date()).toISOString(),
            updatedAt: cat.updatedAt ? cat.updatedAt.toISOString() : (/* @__PURE__ */ new Date()).toISOString(),
            children: [],
            level: 0,
            path: []
          };
          categoryMap.set(cat.id, node);
        });
        categories.forEach((cat) => {
          const node = categoryMap.get(cat.id);
          if (cat.parentId) {
            const parent = categoryMap.get(cat.parentId);
            if (parent) {
              parent.children.push(node);
              node.level = parent.level + 1;
              node.path = [...parent.path, parent.name];
            }
          } else {
            rootCategories.push(node);
          }
        });
        return rootCategories;
      }
    };
    categoryService = new CategoryService();
  }
});

// server/services/storage.ts
var storage_exports = {};
__export(storage_exports, {
  storage: () => storage
});
var storage;
var init_storage = __esm({
  "server/services/storage.ts"() {
    "use strict";
    init_blogService();
    init_mediaService();
    init_userService();
    init_contactService();
    init_categoryService();
    storage = {
      // Blog posts
      getBlogPosts,
      getBlogPostsPaginated,
      getFeaturedBlogPosts,
      getBlogPost,
      createBlogPost,
      updateBlogPost,
      deleteBlogPost,
      // Media files
      getMediaFiles,
      getMediaFilesPaginated,
      getMediaFile,
      createMediaFile,
      updateMediaFile,
      deleteMediaFile,
      // Users
      getUsers: getAllUsers,
      getUsersPaginated,
      getUserById,
      createUser,
      updateUser,
      deleteUser,
      verifyUserEmail,
      // Contacts
      getContacts,
      getContact,
      createContact,
      // Categories
      getCategories: categoryService.getCategoriesTree
    };
  }
});

// server/services/cacheService.ts
var redisDisabled, CacheService, cacheService;
var init_cacheService = __esm({
  "server/services/cacheService.ts"() {
    "use strict";
    init_redis();
    redisDisabled = false;
    CacheService = class {
      constructor(prefix = "app:") {
        this.prefix = prefix;
      }
      getKey(key) {
        return `${this.prefix}${key}`;
      }
      async get(key) {
        if (redisDisabled) {
          return null;
        }
        try {
          const client = await getRedisClient();
          if (!client) {
            redisDisabled = true;
            return null;
          }
          const data = await client.get(this.getKey(key));
          if (!data) {
            return null;
          }
          return JSON.parse(data);
        } catch (error) {
          console.error(`Error getting cache for key ${key}:`, error);
          return null;
        }
      }
      async set(key, data, ttlSeconds = 300) {
        if (redisDisabled) {
          return false;
        }
        try {
          const client = await getRedisClient();
          if (!client) {
            redisDisabled = true;
            return false;
          }
          await client.set(this.getKey(key), JSON.stringify(data), {
            EX: ttlSeconds
          });
          return true;
        } catch (error) {
          console.error(`Error setting cache for key ${key}:`, error);
          return false;
        }
      }
      async delete(key) {
        if (redisDisabled) {
          return true;
        }
        try {
          const client = await getRedisClient();
          if (!client) {
            redisDisabled = true;
            return true;
          }
          await client.del(this.getKey(key));
          return true;
        } catch (error) {
          console.error(`Error deleting cache for key ${key}:`, error);
          return false;
        }
      }
      async deleteByPattern(pattern) {
        if (redisDisabled) {
          return true;
        }
        try {
          const client = await getRedisClient();
          if (!client) {
            redisDisabled = true;
            return true;
          }
          const keys = await client.keys(this.getKey(pattern));
          if (keys.length > 0) {
            await client.del(keys);
          }
          return true;
        } catch (error) {
          console.error(`Error deleting cache by pattern ${pattern}:`, error);
          return false;
        }
      }
      async clear() {
        if (redisDisabled) {
          return true;
        }
        try {
          const client = await getRedisClient();
          if (!client) {
            redisDisabled = true;
            return true;
          }
          const keys = await client.keys(`${this.prefix}*`);
          if (keys.length > 0) {
            await client.del(keys);
          }
          return true;
        } catch (error) {
          console.error("Error clearing cache:", error);
          return false;
        }
      }
      async getStats() {
        if (redisDisabled) {
          return { keys: 0, memory: "0B (Redis disabled)" };
        }
        try {
          const client = await getRedisClient();
          if (!client) {
            redisDisabled = true;
            return { keys: 0, memory: "0B (Redis disabled)" };
          }
          const keys = await client.keys(`${this.prefix}*`);
          const info = await client.info("memory");
          const memoryMatch = info.match(/used_memory_human:(.+)\r\n/);
          const memory = memoryMatch ? memoryMatch[1].trim() : "unknown";
          return {
            keys: keys.length,
            memory
          };
        } catch (error) {
          console.error("Error getting cache stats:", error);
          return { keys: 0, memory: "unavailable" };
        }
      }
    };
    cacheService = new CacheService();
  }
});

// server/middleware/apiCache.ts
var apiCache_exports = {};
__export(apiCache_exports, {
  apiCache: () => apiCache2,
  clearApiCache: () => clearApiCache
});
var defaultKeyFn, apiCache2, clearApiCache;
var init_apiCache = __esm({
  "server/middleware/apiCache.ts"() {
    "use strict";
    init_cacheService();
    defaultKeyFn = (req) => {
      return `api:${req.method}:${req.originalUrl}`;
    };
    apiCache2 = (options2 = {}) => {
      const ttl = options2.ttl || 300;
      const keyFn = options2.keyFn || defaultKeyFn;
      return async (req, res, next) => {
        if (req.method !== "GET") {
          return next();
        }
        if (req.query.noCache === "true" || req.headers["x-no-cache"]) {
          return next();
        }
        const cacheKey = keyFn(req);
        try {
          const cachedData = await cacheService.get(cacheKey);
          if (cachedData) {
            res.setHeader("X-Cache", "HIT");
            return res.json(cachedData);
          }
          res.setHeader("X-Cache", "MISS");
          const originalJson = res.json;
          res.json = function(body) {
            res.json = originalJson;
            if (res.statusCode >= 200 && res.statusCode < 300) {
              cacheService.set(cacheKey, body, ttl).catch((err) => {
                console.error(`Error caching response for ${cacheKey}:`, err);
              });
            }
            return originalJson.call(this, body);
          };
          next();
        } catch (error) {
          console.error(`Cache middleware error for ${cacheKey}:`, error);
          next();
        }
      };
    };
    clearApiCache = async (pattern = "*") => {
      return cacheService.deleteByPattern(`api:${pattern}`);
    };
  }
});

// server/websocket.ts
var websocket_exports = {};
__export(websocket_exports, {
  broadcastCacheInvalidation: () => broadcastCacheInvalidation,
  broadcastCartUpdate: () => broadcastCartUpdate,
  broadcastFooterUpdate: () => broadcastFooterUpdate,
  broadcastMediaUpdate: () => broadcastMediaUpdate,
  broadcastToAll: () => broadcastToAll,
  broadcastUpdate: () => broadcastUpdate,
  createWebSocketHandler: () => createWebSocketHandler
});
import { WebSocket } from "ws";
function broadcastUpdate(wsInstance, type, data) {
  console.log("Broadcasting update:", type, data);
  if (!wsInstance) {
    console.log("No WebSocket instance provided, trying global wss");
    wsInstance = global.wss;
  }
  if (!wsInstance || !wsInstance.clients) {
    console.error("No WebSocket server instance or clients available");
    return;
  }
  const message = JSON.stringify({
    type,
    data,
    timestamp: (/* @__PURE__ */ new Date()).toISOString()
  });
  let clientCount = 0;
  wsInstance.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      try {
        client.send(message);
        clientCount++;
      } catch (error) {
        console.error("Error sending message to client:", error);
      }
    }
  });
  console.log(`Broadcasted ${type} event to ${clientCount} clients`);
}
function broadcastMediaUpdate(action, mediaItem) {
  const wsInstance = global.wss;
  broadcastUpdate(wsInstance, "MEDIA_UPDATE", {
    action,
    item: mediaItem,
    category: mediaItem.category,
    source: mediaItem.source
  });
}
function broadcastCacheInvalidation(cacheKeys) {
  const wsInstance = global.wss;
  broadcastUpdate(wsInstance, "CACHE_INVALIDATED", {
    keys: cacheKeys
  });
}
function broadcastCartUpdate(action, cartData) {
  const wsInstance = global.wss;
  broadcastUpdate(wsInstance, "CART_UPDATE", {
    action,
    cart: cartData,
    timestamp: (/* @__PURE__ */ new Date()).toISOString()
  });
}
function broadcastFooterUpdate(action, footerData) {
  const wsInstance = global.wss;
  broadcastUpdate(wsInstance, `footer:${action}`, {
    action,
    data: footerData,
    timestamp: (/* @__PURE__ */ new Date()).toISOString()
  });
}
function broadcastToAll(type, data) {
  const wsInstance = global.wss;
  broadcastUpdate(wsInstance, type, data);
}
function createWebSocketHandler(app2, path18 = "/") {
  console.log(`Setting up WebSocket handler on path: ${path18}`);
  if (!app2.ws) {
    console.error("app.ws is not defined! Express-ws may not be properly initialized.");
    return;
  }
  app2.ws(path18, (ws) => {
    console.log(`WebSocket connection established on ${path18}`);
    ws.send(JSON.stringify({
      type: "_connected",
      data: { status: "connected" },
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    }));
    const pingInterval = setInterval(() => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.ping();
      }
    }, 3e4);
    ws.on("message", (message) => {
      try {
        const data = JSON.parse(message.toString());
        if (data.type === "ping") {
          if (ws.readyState === WebSocket.OPEN) {
            ws.send(JSON.stringify({
              type: "pong",
              timestamp: (/* @__PURE__ */ new Date()).toISOString()
            }));
          }
          return;
        }
        console.log("Received WebSocket message:", data.type);
      } catch (error) {
        console.error("Error parsing WebSocket message:", error);
      }
    });
    ws.on("pong", () => {
    });
    ws.on("close", () => {
      console.log(`WebSocket connection closed on ${path18}`);
      clearInterval(pingInterval);
    });
    ws.on("error", (error) => {
      console.error("WebSocket error:", error);
      clearInterval(pingInterval);
    });
  });
}
var init_websocket = __esm({
  "server/websocket.ts"() {
    "use strict";
  }
});

// server/services/searchService.ts
var searchService_exports = {};
__export(searchService_exports, {
  SearchService: () => SearchService,
  searchService: () => searchService
});
import { sql as sql3 } from "drizzle-orm";
var SearchService, searchService;
var init_searchService = __esm({
  "server/services/searchService.ts"() {
    "use strict";
    init_db();
    init_schema();
    SearchService = class {
      getLanguageConfig(language) {
        return language === "ru" ? "russian" : "english";
      }
      detectLanguage(query) {
        const cyrillicPattern = /[а-яё]/i;
        return cyrillicPattern.test(query) ? "ru" : "en";
      }
      async searchBlog(query, language = "en", limit = 10) {
        const langConfig = this.getLanguageConfig(language);
        const results = await db.execute(sql3`
      SELECT 
        id::text,
        title,
        description,
        slug,
        GREATEST(
          ts_rank(to_tsvector(${langConfig}, title || ' ' || description || ' ' || content), plainto_tsquery(${langConfig}, ${query})),
          CASE WHEN title ILIKE ${"%" + query + "%"} THEN 0.9 ELSE 0 END,
          CASE WHEN description ILIKE ${"%" + query + "%"} THEN 0.7 ELSE 0 END
        ) as relevance
      FROM ${blogPosts}
      WHERE (
        to_tsvector(${langConfig}, title || ' ' || description || ' ' || content) @@ plainto_tsquery(${langConfig}, ${query})
        OR title ILIKE ${"%" + query + "%"}
        OR description ILIKE ${"%" + query + "%"}
        OR content ILIKE ${"%" + query + "%"}
      )
      ORDER BY relevance DESC
      LIMIT ${limit}
    `);
        return results.rows.map((row) => ({
          id: String(row.id),
          title: String(row.title),
          description: String(row.description || ""),
          url: `/blog/${row.slug}`,
          type: "blog",
          relevance: parseFloat(String(row.relevance))
        }));
      }
      async searchProducts(query, language = "en", limit = 10) {
        const langConfig = this.getLanguageConfig(language);
        const results = await db.execute(sql3`
      SELECT 
        id::text,
        title,
        description,
        slug,
        GREATEST(
          ts_rank(to_tsvector(${langConfig}, title || ' ' || description || ' ' || content), plainto_tsquery(${langConfig}, ${query})),
          CASE WHEN title ILIKE ${"%" + query + "%"} THEN 0.9 ELSE 0 END,
          CASE WHEN description ILIKE ${"%" + query + "%"} THEN 0.7 ELSE 0 END
        ) as relevance
      FROM products
      WHERE (
        to_tsvector(${langConfig}, title || ' ' || description || ' ' || content) @@ plainto_tsquery(${langConfig}, ${query})
        OR title ILIKE ${"%" + query + "%"}
        OR description ILIKE ${"%" + query + "%"}
        OR content ILIKE ${"%" + query + "%"}
      ) AND is_active = true
      ORDER BY relevance DESC
      LIMIT ${limit}
    `);
        return results.rows.map((row) => ({
          id: String(row.id),
          title: String(row.title),
          description: String(row.description || ""),
          url: `/products/${row.slug}`,
          type: "product",
          relevance: parseFloat(String(row.relevance))
        }));
      }
      async searchDocumentation(query, language = "en", limit = 10) {
        const langConfig = this.getLanguageConfig(language);
        const results = await db.execute(sql3`
      SELECT 
        d.id::text,
        d.title,
        d.excerpt as description,
        d.slug,
        GREATEST(
          ts_rank(to_tsvector(${langConfig}, d.title || ' ' || d.excerpt || ' ' || d.content), plainto_tsquery(${langConfig}, ${query})),
          CASE WHEN d.title ILIKE ${"%" + query + "%"} THEN 0.9 ELSE 0 END,
          CASE WHEN d.excerpt ILIKE ${"%" + query + "%"} THEN 0.7 ELSE 0 END
        ) as relevance
      FROM documentation d
      WHERE (
        to_tsvector(${langConfig}, d.title || ' ' || d.excerpt || ' ' || d.content) @@ plainto_tsquery(${langConfig}, ${query})
        OR d.title ILIKE ${"%" + query + "%"}
        OR d.excerpt ILIKE ${"%" + query + "%"}
        OR d.content ILIKE ${"%" + query + "%"}
      ) AND d.is_published = true
      ORDER BY relevance DESC
      LIMIT ${limit}
    `);
        return results.rows.map((row) => ({
          id: String(row.id),
          title: String(row.title),
          description: String(row.description || ""),
          url: `/documentation/${row.slug}`,
          type: "documentation",
          relevance: parseFloat(String(row.relevance))
        }));
      }
      async searchAll(query, language, limit = 30) {
        const detectedLang = language || this.detectLanguage(query);
        const [blogResults, productResults, docResults] = await Promise.all([
          this.searchBlog(query, detectedLang, Math.ceil(limit / 3)),
          this.searchProducts(query, detectedLang, Math.ceil(limit / 3)),
          this.searchDocumentation(query, detectedLang, Math.ceil(limit / 3))
        ]);
        const allResults = [...blogResults, ...productResults, ...docResults].sort((a, b) => b.relevance - a.relevance).slice(0, limit);
        return {
          results: allResults,
          total: allResults.length,
          query,
          language: detectedLang
        };
      }
    };
    searchService = new SearchService();
  }
});

// server/utils/mediaCleanup.ts
var mediaCleanup_exports = {};
__export(mediaCleanup_exports, {
  cleanupOriginalFiles: () => cleanupOriginalFiles,
  cleanupSpecificFile: () => cleanupSpecificFile,
  cleanupSpecificFileInDirectory: () => cleanupSpecificFileInDirectory
});
import path4 from "path";
import fs3 from "fs";
import { exec } from "child_process";
import { promisify } from "util";
async function deleteFileWindows(filePath) {
  try {
    await new Promise((resolve) => setTimeout(resolve, 100));
    await fs3.promises.unlink(filePath);
    return true;
  } catch (error1) {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1e3));
      await fs3.promises.unlink(filePath);
      return true;
    } catch (error2) {
      try {
        await execAsync(`del /f /q "${filePath}"`);
        return true;
      } catch (error3) {
        console.error(`All deletion methods failed for ${filePath}:`, error3);
        return false;
      }
    }
  }
}
async function cleanupOriginalFiles() {
  const uploadsDir = path4.join(process.cwd(), "public/uploads");
  const imageExtensions = [".jpg", ".jpeg", ".png", ".gif", ".bmp", ".tiff", ".jfif"];
  const deletedFiles = [];
  const errors = [];
  if (!fs3.existsSync(uploadsDir)) {
    return { deleted: deletedFiles, errors: ["Uploads directory not found"] };
  }
  try {
    const files = fs3.readdirSync(uploadsDir);
    for (const file of files) {
      const filePath = path4.join(uploadsDir, file);
      if (!fs3.existsSync(filePath) || fs3.statSync(filePath).isDirectory()) {
        continue;
      }
      const fileExt = path4.extname(file).toLowerCase();
      if (!imageExtensions.includes(fileExt)) {
        continue;
      }
      const filenameWithoutExt = path4.parse(file).name;
      const webpFile = `${filenameWithoutExt}.webp`;
      const webpPath = path4.join(uploadsDir, webpFile);
      if (fs3.existsSync(webpPath)) {
        const success = await deleteFileWindows(filePath);
        if (success) {
          deletedFiles.push(file);
          console.log(`Cleanup: Deleted original file: ${file} (WebP equivalent exists)`);
        } else {
          const errorMsg = `Failed to delete ${file}: Windows file lock`;
          errors.push(errorMsg);
          console.error(errorMsg);
        }
      }
    }
    console.log(`Cleanup completed: ${deletedFiles.length} files deleted, ${errors.length} errors`);
    return { deleted: deletedFiles, errors };
  } catch (error) {
    const errorMsg = `Error during cleanup: ${error}`;
    errors.push(errorMsg);
    console.error(errorMsg);
    return { deleted: deletedFiles, errors };
  }
}
async function cleanupSpecificFile(originalFilename) {
  const uploadsDir = path4.join(process.cwd(), "public/uploads");
  const originalPath = path4.join(uploadsDir, originalFilename);
  if (!fs3.existsSync(originalPath)) {
    return true;
  }
  const filenameWithoutExt = path4.parse(originalFilename).name;
  const webpFile = `${filenameWithoutExt}.webp`;
  const webpPath = path4.join(uploadsDir, webpFile);
  if (fs3.existsSync(webpPath)) {
    const success = await deleteFileWindows(originalPath);
    if (success) {
      console.log(`Force cleanup: Deleted original file: ${originalFilename}`);
    } else {
      console.error(`Force cleanup failed for ${originalFilename}: Windows file lock`);
    }
    return success;
  }
  return false;
}
async function cleanupSpecificFileInDirectory(originalFilename, directory) {
  const originalPath = path4.join(process.cwd(), "public", directory, originalFilename);
  if (!fs3.existsSync(originalPath)) {
    return true;
  }
  const filenameWithoutExt = path4.parse(originalFilename).name;
  const webpFile = `${filenameWithoutExt}.webp`;
  const webpPath = path4.join(process.cwd(), "public", directory, webpFile);
  if (fs3.existsSync(webpPath)) {
    const success = await deleteFileWindows(originalPath);
    if (success) {
      console.log(`Directory cleanup: Deleted original file: ${originalFilename} from ${directory}`);
    } else {
      console.error(`Directory cleanup failed for ${originalFilename} in ${directory}: Windows file lock`);
    }
    return success;
  }
  return false;
}
var execAsync;
var init_mediaCleanup = __esm({
  "server/utils/mediaCleanup.ts"() {
    "use strict";
    execAsync = promisify(exec);
  }
});

// server/services/analytics-cache.ts
var AnalyticsCacheService, analyticsCacheService;
var init_analytics_cache = __esm({
  "server/services/analytics-cache.ts"() {
    "use strict";
    init_redis();
    AnalyticsCacheService = class {
      constructor() {
        this.TTL = {
          overview: 300,
          // 5 minutes
          realtime: 30,
          // 30 seconds
          chartData: 600
          // 10 minutes
        };
      }
      async getOverview(days) {
        try {
          const client = await getRedisClient();
          if (!client) return null;
          const key = `analytics:overview:${days}`;
          const cached = await client.get(key);
          return cached ? JSON.parse(cached) : null;
        } catch (error) {
          console.error("Cache get overview error:", error);
          return null;
        }
      }
      async setOverview(days, data) {
        try {
          const client = await getRedisClient();
          if (!client) return;
          const key = `analytics:overview:${days}`;
          await client.setEx(key, this.TTL.overview, JSON.stringify(data));
        } catch (error) {
          console.error("Cache set overview error:", error);
        }
      }
      async getRealtimeStats() {
        try {
          const client = await getRedisClient();
          if (!client) return null;
          const cached = await client.get("analytics:realtime");
          return cached ? JSON.parse(cached) : null;
        } catch (error) {
          console.error("Cache get realtime error:", error);
          return null;
        }
      }
      async setRealtimeStats(data) {
        try {
          const client = await getRedisClient();
          if (!client) return;
          await client.setEx("analytics:realtime", this.TTL.realtime, JSON.stringify(data));
        } catch (error) {
          console.error("Cache set realtime error:", error);
        }
      }
      async invalidateOverview(days) {
        try {
          const client = await getRedisClient();
          if (!client) return;
          if (days) {
            await client.del(`analytics:overview:${days}`);
          } else {
            const keys = await client.keys("analytics:overview:*");
            if (keys.length > 0) {
              await client.del(keys);
            }
          }
        } catch (error) {
          console.error("Cache invalidate error:", error);
        }
      }
      async clearAllCache() {
        try {
          const client = await getRedisClient();
          if (!client) return;
          const keys = await client.keys("analytics:*");
          if (keys.length > 0) {
            await client.del(keys);
            console.log(`\u{1F9F9} Cleared ${keys.length} analytics cache keys`);
          }
        } catch (error) {
          console.error("Cache clear error:", error);
        }
      }
    };
    analyticsCacheService = new AnalyticsCacheService();
  }
});

// server/services/analytics-service.ts
import { eq as eq9, desc as desc3, gte, sql as sql4, and as and2, count, avg } from "drizzle-orm";
import { z as z7 } from "zod";
var trackingSchema, analyticsQuerySchema, AnalyticsService, analyticsService;
var init_analytics_service = __esm({
  "server/services/analytics-service.ts"() {
    "use strict";
    init_db();
    init_schema();
    init_analytics_cache();
    trackingSchema = z7.object({
      sessionId: z7.string().min(1).max(255),
      pagePath: z7.string().min(1).max(500),
      pageTitle: z7.string().optional(),
      referrer: z7.string().optional(),
      userAgent: z7.string().optional(),
      ipAddress: z7.string().optional(),
      country: z7.string().length(2).optional(),
      deviceType: z7.string().max(50).optional(),
      browser: z7.string().max(100).optional(),
      os: z7.string().max(100).optional(),
      screenResolution: z7.string().max(20).optional()
    });
    analyticsQuerySchema = z7.object({
      days: z7.number().min(1).max(365).default(7),
      startDate: z7.string().optional(),
      endDate: z7.string().optional()
    });
    AnalyticsService = class {
      // Track page view
      async trackPageView(data) {
        const validated = trackingSchema.parse(data);
        try {
          await db.insert(analyticsPageViews).values({
            sessionId: validated.sessionId,
            pagePath: validated.pagePath,
            pageTitle: validated.pageTitle,
            referrer: validated.referrer,
            userAgent: validated.userAgent,
            ipAddress: validated.ipAddress,
            country: validated.country,
            deviceType: validated.deviceType,
            browser: validated.browser,
            os: validated.os,
            screenResolution: validated.screenResolution
          });
          await this.updateSession(validated.sessionId, validated);
          await analyticsCacheService.invalidateOverview();
          console.log("\u{1F4CA} Page view tracked and cache invalidated");
        } catch (error) {
          console.error("Error tracking page view:", error);
          throw new Error("Failed to track page view");
        }
      }
      // Update session data
      async updateSession(sessionId, data) {
        try {
          const existingSession = await db.select().from(analyticsSessions).where(eq9(analyticsSessions.id, sessionId)).limit(1);
          if (existingSession.length === 0) {
            await db.insert(analyticsSessions).values({
              id: sessionId,
              ipAddress: data.ipAddress,
              userAgent: data.userAgent,
              country: data.country,
              deviceType: data.deviceType,
              browser: data.browser,
              os: data.os,
              entryPage: data.pagePath,
              pageViewsCount: 1
            });
          } else {
            await db.update(analyticsSessions).set({
              pageViewsCount: sql4`${analyticsSessions.pageViewsCount} + 1`,
              exitPage: data.pagePath,
              updatedAt: /* @__PURE__ */ new Date()
            }).where(eq9(analyticsSessions.id, sessionId));
          }
        } catch (error) {
          console.error("Error updating session:", error);
          throw error;
        }
      }
      // Get real-time stats
      async getRealtimeStats() {
        try {
          const cached = await analyticsCacheService.getRealtimeStats();
          if (cached) {
            return cached;
          }
          const [realtimeData] = await db.select().from(analyticsRealtime).limit(1);
          if (!realtimeData) {
            return { activeUsers: 0, currentPageViews: {} };
          }
          const pageViews = typeof realtimeData.currentPageViews === "string" ? JSON.parse(realtimeData.currentPageViews) : realtimeData.currentPageViews || {};
          const stats = {
            activeUsers: realtimeData.activeUsers || 0,
            currentPageViews: pageViews
          };
          await analyticsCacheService.setRealtimeStats(stats);
          return stats;
        } catch (error) {
          console.error("Error getting realtime stats:", error);
          return { activeUsers: 0, currentPageViews: {} };
        }
      }
      // Get analytics overview
      async getOverview(params) {
        const validated = analyticsQuerySchema.parse(params);
        const cached = await analyticsCacheService.getOverview(validated.days);
        if (cached) {
          console.log(`\u{1F4CA} Analytics overview cache hit for ${validated.days} days`);
          return cached;
        }
        const endDate = /* @__PURE__ */ new Date();
        const startDate = /* @__PURE__ */ new Date();
        startDate.setDate(endDate.getDate() - validated.days);
        try {
          const [pageViewsResult] = await db.select({ count: count() }).from(analyticsPageViews).where(gte(analyticsPageViews.createdAt, startDate));
          const [uniqueVisitorsResult] = await db.select({ count: sql4`COUNT(DISTINCT ${analyticsPageViews.sessionId})` }).from(analyticsPageViews).where(gte(analyticsPageViews.createdAt, startDate));
          const [sessionsResult] = await db.select({ count: count() }).from(analyticsSessions).where(gte(analyticsSessions.createdAt, startDate));
          const [bounceResult] = await db.select({
            bounceRate: sql4`AVG(CASE WHEN ${analyticsSessions.isBounce} THEN 1 ELSE 0 END) * 100`
          }).from(analyticsSessions).where(gte(analyticsSessions.createdAt, startDate));
          const [avgDurationResult] = await db.select({ avgDuration: avg(analyticsSessions.durationSeconds) }).from(analyticsSessions).where(gte(analyticsSessions.createdAt, startDate));
          const topPages = await db.select({
            path: analyticsPageViews.pagePath,
            views: count()
          }).from(analyticsPageViews).where(gte(analyticsPageViews.createdAt, startDate)).groupBy(analyticsPageViews.pagePath).orderBy(desc3(count())).limit(10);
          const topReferrers = await db.select({
            referrer: analyticsPageViews.referrer,
            views: count()
          }).from(analyticsPageViews).where(
            and2(
              gte(analyticsPageViews.createdAt, startDate),
              sql4`${analyticsPageViews.referrer} IS NOT NULL AND ${analyticsPageViews.referrer} != ''`
            )
          ).groupBy(analyticsPageViews.referrer).orderBy(desc3(count())).limit(10);
          const deviceStats = await db.select({
            device: analyticsPageViews.deviceType,
            count: count()
          }).from(analyticsPageViews).where(gte(analyticsPageViews.createdAt, startDate)).groupBy(analyticsPageViews.deviceType);
          const countryStats = await db.select({
            country: analyticsPageViews.country,
            count: count()
          }).from(analyticsPageViews).where(gte(analyticsPageViews.createdAt, startDate)).groupBy(analyticsPageViews.country);
          const chartData = await this.getChartData(validated.days);
          const overview = {
            totalPageViews: pageViewsResult.count,
            uniqueVisitors: uniqueVisitorsResult.count,
            totalSessions: sessionsResult.count,
            bounceRate: Math.round(bounceResult.bounceRate || 0),
            avgSessionDuration: Math.round(Number(avgDurationResult.avgDuration) || 0),
            topPages: topPages.map((p) => ({ path: p.path, views: p.views })),
            topReferrers: topReferrers.map((r) => ({ referrer: r.referrer || "Direct", views: r.views })),
            deviceStats: deviceStats.reduce((acc, d) => ({ ...acc, [d.device || "Unknown"]: d.count }), {}),
            countryStats: countryStats.reduce((acc, c) => ({ ...acc, [c.country || "Unknown"]: c.count }), {}),
            chartData
          };
          await analyticsCacheService.setOverview(validated.days, overview);
          return overview;
        } catch (error) {
          console.error("Error getting analytics overview:", error);
          throw new Error("Failed to get analytics overview");
        }
      }
      // Get chart data for specified days (optimized with single query)
      async getChartData(days) {
        const endDate = /* @__PURE__ */ new Date();
        const startDate = /* @__PURE__ */ new Date();
        startDate.setDate(endDate.getDate() - days);
        try {
          const results = await db.select({
            date: sql4`DATE(${analyticsPageViews.createdAt})`,
            pageViews: count(),
            visitors: sql4`COUNT(DISTINCT ${analyticsPageViews.sessionId})`
          }).from(analyticsPageViews).where(gte(analyticsPageViews.createdAt, startDate)).groupBy(sql4`DATE(${analyticsPageViews.createdAt})`).orderBy(sql4`DATE(${analyticsPageViews.createdAt})`);
          const chartData = [];
          for (let i = days - 1; i >= 0; i--) {
            const date = new Date(endDate);
            date.setDate(date.getDate() - i);
            const dateStr = date.toISOString().split("T")[0];
            const dayData = results.find((r) => r.date === dateStr);
            chartData.push({
              date: dateStr,
              pageViews: dayData?.pageViews || 0,
              visitors: dayData?.visitors || 0
            });
          }
          return chartData;
        } catch (error) {
          console.error("Error getting chart data:", error);
          return [];
        }
      }
      // Aggregate daily stats (for scheduled job)
      async aggregateDailyStats(date) {
        const targetDate = date || (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
        try {
          const dayStart = new Date(targetDate);
          dayStart.setHours(0, 0, 0, 0);
          const dayEnd = new Date(targetDate);
          dayEnd.setHours(23, 59, 59, 999);
          const overview = await this.getOverview({ days: 1 });
          const existingStats = await db.select().from(analyticsDailyStats).where(eq9(analyticsDailyStats.date, targetDate)).limit(1);
          const statsData = {
            date: targetDate,
            pageViews: overview.totalPageViews,
            uniqueVisitors: overview.uniqueVisitors,
            sessions: overview.totalSessions,
            bounceRate: overview.bounceRate.toString(),
            avgSessionDuration: overview.avgSessionDuration,
            topPages: JSON.stringify(overview.topPages),
            topReferrers: JSON.stringify(overview.topReferrers),
            deviceBreakdown: JSON.stringify(overview.deviceStats),
            countryBreakdown: JSON.stringify(overview.countryStats)
          };
          if (existingStats.length === 0) {
            await db.insert(analyticsDailyStats).values(statsData);
          } else {
            await db.update(analyticsDailyStats).set({
              ...statsData,
              updatedAt: /* @__PURE__ */ new Date()
            }).where(eq9(analyticsDailyStats.date, targetDate));
          }
        } catch (error) {
          console.error("Error aggregating daily stats:", error);
          throw new Error("Failed to aggregate daily stats");
        }
      }
      // Clear analytics data (admin only)
      async clearData() {
        try {
          await db.delete(analyticsPageViews);
          await db.delete(analyticsSessions);
          await db.delete(analyticsDailyStats);
          await db.delete(analyticsRealtime);
        } catch (error) {
          console.error("Error clearing analytics data:", error);
          throw new Error("Failed to clear analytics data");
        }
      }
      // Update real-time stats
      async updateRealtimeStats() {
        try {
          const fiveMinutesAgo = /* @__PURE__ */ new Date();
          fiveMinutesAgo.setMinutes(fiveMinutesAgo.getMinutes() - 5);
          const [activeUsersResult] = await db.select({ count: sql4`COUNT(DISTINCT ${analyticsPageViews.sessionId})` }).from(analyticsPageViews).where(gte(analyticsPageViews.createdAt, fiveMinutesAgo));
          const currentPageViews = await db.select({
            path: analyticsPageViews.pagePath,
            count: count()
          }).from(analyticsPageViews).where(gte(analyticsPageViews.createdAt, fiveMinutesAgo)).groupBy(analyticsPageViews.pagePath);
          const pageViewsObj = currentPageViews.reduce((acc, pv) => ({
            ...acc,
            [pv.path]: pv.count
          }), {});
          const pageViewsJson = JSON.stringify(pageViewsObj);
          const existingRealtime = await db.select().from(analyticsRealtime).limit(1);
          if (existingRealtime.length === 0) {
            await db.insert(analyticsRealtime).values({
              activeUsers: activeUsersResult.count,
              currentPageViews: pageViewsJson
            });
          } else {
            await db.update(analyticsRealtime).set({
              activeUsers: activeUsersResult.count,
              currentPageViews: pageViewsJson,
              updatedAt: /* @__PURE__ */ new Date()
            }).where(eq9(analyticsRealtime.id, existingRealtime[0].id));
          }
          return {
            activeUsers: activeUsersResult.count,
            currentPageViews: pageViewsObj
          };
        } catch (error) {
          console.error("Error updating realtime stats:", error);
          throw error;
        }
      }
    };
    analyticsService = new AnalyticsService();
  }
});

// server/services/analytics-cleanup.ts
import { sql as sql5 } from "drizzle-orm";
var AnalyticsCleanupService, analyticsCleanupService;
var init_analytics_cleanup = __esm({
  "server/services/analytics-cleanup.ts"() {
    "use strict";
    init_db();
    init_schema();
    AnalyticsCleanupService = class {
      async cleanupOldData() {
        try {
          console.log("\u{1F9F9} Starting analytics data cleanup...");
          const pageViewsResult = await db.delete(analyticsPageViews).where(sql5`${analyticsPageViews.createdAt} < NOW() - INTERVAL '2 years'`);
          const sessionsResult = await db.delete(analyticsSessions).where(sql5`${analyticsSessions.createdAt} < NOW() - INTERVAL '2 years'`);
          const dailyStatsResult = await db.delete(analyticsDailyStats).where(sql5`${analyticsDailyStats.date} < CURRENT_DATE - INTERVAL '5 years'`);
          const result = {
            deletedPageViews: pageViewsResult.rowCount || 0,
            deletedSessions: sessionsResult.rowCount || 0,
            deletedDailyStats: dailyStatsResult.rowCount || 0
          };
          console.log("\u2705 Analytics cleanup completed:", result);
          return result;
        } catch (error) {
          console.error("\u274C Analytics cleanup failed:", error);
          throw error;
        }
      }
      async getDataRetentionStats() {
        try {
          const [totalPageViews] = await db.select({ count: sql5`COUNT(*)` }).from(analyticsPageViews);
          const [oldPageViews] = await db.select({ count: sql5`COUNT(*)` }).from(analyticsPageViews).where(sql5`${analyticsPageViews.createdAt} < NOW() - INTERVAL '2 years'`);
          const [totalSessions] = await db.select({ count: sql5`COUNT(*)` }).from(analyticsSessions);
          const [oldSessions] = await db.select({ count: sql5`COUNT(*)` }).from(analyticsSessions).where(sql5`${analyticsSessions.createdAt} < NOW() - INTERVAL '2 years'`);
          const [totalDailyStats] = await db.select({ count: sql5`COUNT(*)` }).from(analyticsDailyStats);
          const [oldDailyStats] = await db.select({ count: sql5`COUNT(*)` }).from(analyticsDailyStats).where(sql5`${analyticsDailyStats.date} < CURRENT_DATE - INTERVAL '5 years'`);
          return {
            totalPageViews: totalPageViews.count,
            oldPageViews: oldPageViews.count,
            totalSessions: totalSessions.count,
            oldSessions: oldSessions.count,
            totalDailyStats: totalDailyStats.count,
            oldDailyStats: oldDailyStats.count
          };
        } catch (error) {
          console.error("Error getting retention stats:", error);
          throw error;
        }
      }
    };
    analyticsCleanupService = new AnalyticsCleanupService();
  }
});

// server/utils/scheduler.ts
var scheduler_exports = {};
__export(scheduler_exports, {
  AnalyticsScheduler: () => AnalyticsScheduler,
  analyticsScheduler: () => analyticsScheduler
});
var AnalyticsScheduler, analyticsScheduler;
var init_scheduler = __esm({
  "server/utils/scheduler.ts"() {
    "use strict";
    init_analytics_service();
    init_analytics_cleanup();
    AnalyticsScheduler = class {
      constructor() {
        this.intervalId = null;
        this.cleanupIntervalId = null;
      }
      // Start daily aggregation job (runs every 24 hours at midnight)
      start() {
        if (this.intervalId) {
          console.log("Analytics scheduler already running");
          return;
        }
        const now = /* @__PURE__ */ new Date();
        const tomorrow = new Date(now);
        tomorrow.setDate(tomorrow.getDate() + 1);
        tomorrow.setHours(0, 0, 0, 0);
        const msUntilMidnight = tomorrow.getTime() - now.getTime();
        setTimeout(() => {
          this.runDailyAggregation();
          this.intervalId = setInterval(() => {
            this.runDailyAggregation();
          }, 24 * 60 * 60 * 1e3);
        }, msUntilMidnight);
        console.log(`\u{1F4C5} Analytics scheduler started. Next run in ${Math.round(msUntilMidnight / 1e3 / 60)} minutes`);
        this.startWeeklyCleanup();
      }
      // Start weekly cleanup job
      startWeeklyCleanup() {
        const now = /* @__PURE__ */ new Date();
        const nextSunday = new Date(now);
        nextSunday.setDate(now.getDate() + (7 - now.getDay()));
        nextSunday.setHours(2, 0, 0, 0);
        const msUntilNextSunday = nextSunday.getTime() - now.getTime();
        setTimeout(() => {
          this.runWeeklyCleanup();
          this.cleanupIntervalId = setInterval(() => {
            this.runWeeklyCleanup();
          }, 7 * 24 * 60 * 60 * 1e3);
        }, msUntilNextSunday);
        console.log(`\u{1F9F9} Weekly cleanup scheduled. Next run in ${Math.round(msUntilNextSunday / 1e3 / 60 / 60)} hours`);
      }
      // Stop the scheduler
      stop() {
        if (this.intervalId) {
          clearInterval(this.intervalId);
          this.intervalId = null;
        }
        if (this.cleanupIntervalId) {
          clearInterval(this.cleanupIntervalId);
          this.cleanupIntervalId = null;
        }
        console.log("\u{1F4C5} Analytics scheduler stopped");
      }
      // Run weekly cleanup
      async runWeeklyCleanup() {
        try {
          console.log("\u{1F9F9} Running weekly analytics cleanup...");
          const result = await analyticsCleanupService.cleanupOldData();
          console.log(`\u2705 Weekly cleanup completed:`, result);
        } catch (error) {
          console.error("\u274C Weekly cleanup failed:", error);
        }
      }
      // Run daily aggregation for yesterday's data
      async runDailyAggregation() {
        try {
          const yesterday = /* @__PURE__ */ new Date();
          yesterday.setDate(yesterday.getDate() - 1);
          const dateStr = yesterday.toISOString().split("T")[0];
          console.log(`\u{1F4CA} Running daily analytics aggregation for ${dateStr}`);
          await analyticsService.aggregateDailyStats(dateStr);
          console.log(`\u2705 Daily analytics aggregation completed for ${dateStr}`);
        } catch (error) {
          console.error("\u274C Daily analytics aggregation failed:", error);
        }
      }
      // Manual trigger for testing
      async triggerAggregation(date) {
        try {
          const targetDate = date || (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
          console.log(`\u{1F4CA} Manual analytics aggregation triggered for ${targetDate}`);
          await analyticsService.aggregateDailyStats(targetDate);
          console.log(`\u2705 Manual analytics aggregation completed for ${targetDate}`);
        } catch (error) {
          console.error("\u274C Manual analytics aggregation failed:", error);
          throw error;
        }
      }
      // Manual cleanup trigger
      async triggerCleanup() {
        try {
          console.log("\u{1F9F9} Manual analytics cleanup triggered");
          const result = await analyticsCleanupService.cleanupOldData();
          console.log("\u2705 Manual analytics cleanup completed:", result);
          return result;
        } catch (error) {
          console.error("\u274C Manual analytics cleanup failed:", error);
          throw error;
        }
      }
    };
    analyticsScheduler = new AnalyticsScheduler();
  }
});

// server/services/menuService.ts
var menuService_exports = {};
__export(menuService_exports, {
  menuService: () => menuService
});
var transformMenuItem, transformToDbFormat, buildMenuTree, menuService;
var init_menuService = __esm({
  "server/services/menuService.ts"() {
    "use strict";
    init_db();
    transformMenuItem = (row) => ({
      id: row.id,
      title: row.title,
      url: row.url,
      parent_id: row.parent_id,
      order_index: row.order_index,
      is_active: row.is_active,
      target: row.target,
      icon: row.icon,
      type: row.type || "manual",
      created_at: row.created_at,
      updated_at: row.updated_at
    });
    transformToDbFormat = (data) => ({
      title: data.title,
      url: data.url || null,
      parent_id: data.parent_id || data.parentId || null,
      order_index: data.order_index || data.orderIndex || 0,
      is_active: data.is_active !== void 0 ? data.is_active : data.isActive !== void 0 ? data.isActive : true,
      target: data.target || "_self",
      icon: data.icon || null,
      type: data.type || "manual"
    });
    buildMenuTree = (items) => {
      const itemMap = /* @__PURE__ */ new Map();
      const rootItems = [];
      items.forEach((item) => {
        itemMap.set(item.id, { ...item, children: [] });
      });
      items.forEach((item) => {
        const menuItem = itemMap.get(item.id);
        if (item.parent_id) {
          const parent = itemMap.get(item.parent_id);
          if (parent) {
            parent.children = parent.children || [];
            parent.children.push(menuItem);
          }
        } else {
          rootItems.push(menuItem);
        }
      });
      const sortItems = (items2) => {
        items2.sort((a, b) => a.order_index - b.order_index);
        items2.forEach((item) => {
          if (item.children && item.children.length > 0) {
            sortItems(item.children);
          }
        });
      };
      sortItems(rootItems);
      return rootItems;
    };
    menuService = {
      // Get all menu items with hierarchy
      async getMenuTree() {
        const result = await pool.query(`
      SELECT * FROM menu_items 
      WHERE is_active = true 
      ORDER BY order_index ASC
    `);
        const items = result.rows.map(transformMenuItem);
        return buildMenuTree(items);
      },
      // Get all menu items with hierarchy (including inactive for admin)
      async getFullMenuTree() {
        const result = await pool.query(`
      SELECT * FROM menu_items 
      ORDER BY order_index ASC
    `);
        const items = result.rows.map(transformMenuItem);
        return buildMenuTree(items);
      },
      // Get all menu items (flat list for admin)
      async getAllMenuItems() {
        const result = await pool.query(`
      SELECT * FROM menu_items 
      ORDER BY COALESCE(parent_id, 0), order_index ASC
    `);
        return result.rows.map(transformMenuItem);
      },
      // Get menu item by ID
      async getById(id) {
        const result = await pool.query("SELECT * FROM menu_items WHERE id = $1", [id]);
        return result.rows[0] ? transformMenuItem(result.rows[0]) : null;
      },
      // Get category by ID (for documentation service integration)
      async getCategoryById(id) {
        const result = await pool.query("SELECT * FROM documentation_categories WHERE id = $1", [id]);
        return result.rows[0] ? {
          id: result.rows[0].id,
          name: result.rows[0].name,
          slug: result.rows[0].slug,
          description: result.rows[0].description,
          icon: result.rows[0].icon,
          order_index: result.rows[0].order_index,
          created_at: result.rows[0].created_at,
          updated_at: result.rows[0].updated_at
        } : null;
      },
      // Create new menu item
      async create(data) {
        const dbData = transformToDbFormat(data);
        const result = await pool.query(`
      INSERT INTO menu_items (title, url, parent_id, order_index, is_active, target, icon, type)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *
    `, [
          dbData.title,
          dbData.url,
          dbData.parent_id,
          dbData.order_index,
          dbData.is_active,
          dbData.target,
          dbData.icon,
          dbData.type
        ]);
        return transformMenuItem(result.rows[0]);
      },
      // Update menu item
      async update(id, data) {
        const dbData = transformToDbFormat(data);
        const result = await pool.query(`
      UPDATE menu_items 
      SET title = $2, url = $3, parent_id = $4, order_index = $5, 
          is_active = $6, target = $7, icon = $8, type = $9
      WHERE id = $1
      RETURNING *
    `, [
          id,
          dbData.title,
          dbData.url,
          dbData.parent_id,
          dbData.order_index,
          dbData.is_active,
          dbData.target,
          dbData.icon,
          dbData.type
        ]);
        return transformMenuItem(result.rows[0]);
      },
      // Delete menu item
      async delete(id) {
        const result = await pool.query("DELETE FROM menu_items WHERE id = $1", [id]);
        return (result.rowCount ?? 0) > 0;
      },
      // Find menu item by slug (derived from URL)
      async findBySlug(slug) {
        const result = await pool.query(
          "SELECT * FROM menu_items WHERE url = $1 OR url = $2",
          [`/${slug}`, `/documentation/${slug}`]
        );
        return result.rows[0] ? transformMenuItem(result.rows[0]) : null;
      },
      // Find or create menu item
      async findOrCreate(data) {
        if (data.url) {
          const existing = await this.findBySlug(data.url.replace("/", ""));
          if (existing) {
            return existing;
          }
        }
        return await this.create(data);
      },
      // Get next order index for a parent
      async getNextOrderIndex(parentId) {
        const result = await pool.query(
          "SELECT COALESCE(MAX(order_index), 0) + 1 as next_order FROM menu_items WHERE parent_id = $1",
          [parentId || null]
        );
        return result.rows[0].next_order;
      },
      // Reorder menu items
      async reorder(items) {
        const client = await pool.connect();
        try {
          await client.query("BEGIN");
          for (const item of items) {
            await client.query(
              "UPDATE menu_items SET order_index = $2, parent_id = $3 WHERE id = $1",
              [item.id, item.order_index, item.parent_id || null]
            );
          }
          await client.query("COMMIT");
        } catch (error) {
          await client.query("ROLLBACK");
          throw error;
        } finally {
          client.release();
        }
      }
    };
  }
});

// server/services/documentationMenuService.ts
var documentationMenuService_exports = {};
__export(documentationMenuService_exports, {
  DocumentationMenuService: () => DocumentationMenuService,
  documentationMenuService: () => documentationMenuService
});
var DocumentationMenuService, documentationMenuService;
var init_documentationMenuService = __esm({
  "server/services/documentationMenuService.ts"() {
    "use strict";
    init_documentationService();
    init_menuService();
    DocumentationMenuService = class {
      // Sync documentation to menu system
      async syncDocumentationToMenu(doc) {
        if (!doc.auto_menu || !doc.title || !doc.slug) return;
        const parentMenu = await this.getMenuParent(doc);
        if (doc.is_published) {
          await this.createOrUpdateMenuItem(doc, parentMenu);
        } else {
          await this.removeMenuItem(doc);
        }
      }
      // Get appropriate parent menu for documentation
      async getMenuParent(doc) {
        if (doc.menu_parent_id) {
          const customParent = await menuService.getById(doc.menu_parent_id);
          if (customParent) return customParent;
        }
        if (doc.category_id) {
          return await this.getCategoryMenu(doc.category_id);
        }
        return await this.getDocumentationRootMenu();
      }
      // Get or create category menu with hierarchy support
      async getCategoryMenu(categoryId) {
        const category = await documentationService.getCategoryById(categoryId);
        if (!category) {
          return await this.getDocumentationRootMenu();
        }
        const parentMenu = category.parent_id ? await this.getCategoryMenu(category.parent_id) : await this.getDocumentationRootMenu();
        const categoryPath = await this.buildCategoryPath(category);
        return await menuService.findOrCreate({
          title: category.name,
          url: `/documentation/${categoryPath}`,
          parent_id: parentMenu.id,
          type: "category",
          order_index: category.order_index || await menuService.getNextOrderIndex(parentMenu.id),
          is_active: true,
          target: "_self"
        });
      }
      // Build category path for hierarchical URLs
      async buildCategoryPath(category) {
        if (!category.parent_id) {
          return category.slug;
        }
        const parent = await documentationService.getCategoryById(category.parent_id);
        if (!parent) {
          return category.slug;
        }
        const parentPath = await this.buildCategoryPath(parent);
        return `${parentPath}/${category.slug}`;
      }
      // Get documentation root menu
      async getDocumentationRootMenu() {
        const rootMenu = await menuService.findBySlug("documentation");
        if (!rootMenu) {
          return await menuService.create({
            title: "Documentation",
            url: "/documentation",
            type: "manual",
            order_index: await menuService.getNextOrderIndex(),
            is_active: true,
            target: "_self"
          });
        }
        return rootMenu;
      }
      // Create or update menu item for documentation with category path
      async createOrUpdateMenuItem(doc, parent) {
        const docUrl = await this.buildDocumentationUrl(doc);
        const menuData = {
          title: doc.menu_title || doc.title,
          url: docUrl,
          parent_id: parent.id,
          order_index: doc.order_index || await menuService.getNextOrderIndex(parent.id),
          is_active: doc.is_published,
          type: "documentation",
          target: "_self"
        };
        if (doc.menu_item_id) {
          return await menuService.update(doc.menu_item_id, menuData);
        } else {
          const menuItem = await menuService.create(menuData);
          if (doc.title && doc.slug) {
            await documentationService.update(doc.id, { menu_item_id: menuItem.id });
          }
          return menuItem;
        }
      }
      // Build documentation URL with category hierarchy
      async buildDocumentationUrl(doc) {
        if (!doc.category_id) {
          return `/documentation/${doc.slug}`;
        }
        const category = await documentationService.getCategoryById(doc.category_id);
        if (!category) {
          return `/documentation/${doc.slug}`;
        }
        const categoryPath = await this.buildCategoryPath(category);
        return `/documentation/${categoryPath}/${doc.slug}`;
      }
      // Remove menu item for documentation
      async removeMenuItem(doc) {
        if (doc.menu_item_id) {
          try {
            await menuService.delete(doc.menu_item_id);
            console.log("\u2705 Menu item deleted:", doc.menu_item_id);
            try {
              await documentationService.update(doc.id, { menu_item_id: void 0 });
              console.log("\u2705 Menu reference cleared from document:", doc.id);
            } catch (updateError) {
              console.log("\u2139\uFE0F Could not update menu_item_id (document may be deleted):", updateError);
            }
          } catch (error) {
            console.error("\u274C Failed to remove menu item:", error);
            throw error;
          }
        } else {
          console.log("\u2139\uFE0F No menu item to remove for document:", doc.id);
        }
      }
      // Handle category deletion - move docs to "Uncategorized"
      async handleCategoryDeletion(categoryId) {
        const docs = await documentationService.getAll();
        const categoryDocs = docs.filter((doc) => doc.category_id === categoryId);
        const categoryMenu = await this.findCategoryMenuByCategory(categoryId);
        if (categoryMenu) {
          await menuService.delete(categoryMenu.id);
        }
        for (const doc of categoryDocs) {
          await documentationService.update(doc.id, {
            category_id: void 0,
            menu_item_id: void 0
            // Force menu recreation under new parent
          });
          if (doc.auto_menu && doc.is_published) {
            await this.syncDocumentationToMenu({ ...doc, category_id: void 0, menu_item_id: void 0 });
          }
        }
        this.broadcastCategoryDeletion(categoryId);
      }
      // Broadcast category deletion via WebSocket
      broadcastCategoryDeletion(categoryId) {
        const wss = global.wss;
        if (wss && wss.clients) {
          const message = JSON.stringify({
            type: "category_menu_updated",
            data: {
              categoryId,
              action: "deleted",
              timestamp: (/* @__PURE__ */ new Date()).toISOString()
            },
            timestamp: (/* @__PURE__ */ new Date()).toISOString()
          });
          wss.clients.forEach((client) => {
            if (client.readyState === 1) {
              client.send(message);
            }
          });
        }
      }
      // Find category menu by category ID
      async findCategoryMenuByCategory(categoryId) {
        const category = await menuService.getCategoryById(categoryId);
        if (!category) return null;
        return await menuService.findBySlug(`documentation-category-${category.slug}`);
      }
      // Bulk sync all documentation to menu
      async bulkSyncAllDocumentation() {
        const allDocs = await documentationService.getAll();
        for (const doc of allDocs) {
          try {
            if (!doc.title || !doc.slug) {
              console.warn(`Skipping invalid documentation record ${doc.id}: missing title or slug`);
              continue;
            }
            await this.syncDocumentationToMenu(doc);
          } catch (error) {
            console.error(`Failed to sync documentation ${doc.id} to menu:`, error);
          }
        }
      }
      // Update category menu when category is updated
      async updateCategoryMenu(category) {
        const categoryPath = await this.buildCategoryPath(category);
        const allMenuItems = await menuService.getAllMenuItems();
        const categoryMenuItems = allMenuItems.filter(
          (item) => item.type === "category" && (item.url === `/documentation/${category.slug}` || item.url === `/documentation/${categoryPath}`)
        );
        for (const menuItem of categoryMenuItems) {
          await menuService.update(menuItem.id, {
            title: category.name,
            url: `/documentation/${categoryPath}`
          });
        }
        await this.updateDocumentationUrlsInCategory(category.id);
        this.broadcastCategoryMenuUpdate(category);
      }
      // Update documentation URLs when category hierarchy changes
      async updateDocumentationUrlsInCategory(categoryId) {
        const allDocs = await documentationService.getAll();
        const categoryDocs = allDocs.filter((doc) => doc.category_id === categoryId);
        for (const doc of categoryDocs) {
          if (doc.menu_item_id) {
            const newUrl = await this.buildDocumentationUrl(doc);
            await menuService.update(doc.menu_item_id, { url: newUrl });
          }
        }
        const allCategories = await documentationService.getCategories();
        const subcategories = allCategories.filter((cat) => cat.parent_id === categoryId);
        for (const subcategory of subcategories) {
          await this.updateDocumentationUrlsInCategory(subcategory.id);
        }
      }
      // Broadcast category menu updates via WebSocket
      broadcastCategoryMenuUpdate(category) {
        const wss = global.wss;
        if (wss && wss.clients) {
          const message = JSON.stringify({
            type: "category_menu_updated",
            data: {
              categoryId: category.id,
              action: "updated",
              timestamp: (/* @__PURE__ */ new Date()).toISOString()
            },
            timestamp: (/* @__PURE__ */ new Date()).toISOString()
          });
          wss.clients.forEach((client) => {
            if (client.readyState === 1) {
              client.send(message);
            }
          });
        }
      }
      // Clean up orphaned menu items (documentation menu items without corresponding docs)
      async cleanupOrphanedMenuItems() {
        const allMenuItems = await menuService.getAllMenuItems();
        const docMenuItems = allMenuItems.filter((item) => item.type === "documentation");
        const allDocs = await documentationService.getAll();
        let cleanedCount = 0;
        for (const menuItem of docMenuItems) {
          const hasCorrespondingDoc = allDocs.some((doc) => doc.menu_item_id === menuItem.id);
          if (!hasCorrespondingDoc) {
            console.log(`\u{1F9F9} Cleaning up orphaned menu item: ${menuItem.id} (${menuItem.title})`);
            await menuService.delete(menuItem.id);
            cleanedCount++;
          }
        }
        console.log(`\u2705 Cleanup complete: ${cleanedCount}/${docMenuItems.length} orphaned menu items removed`);
        return { cleaned: cleanedCount, total: docMenuItems.length };
      }
      // Get cleanup statistics
      async getCleanupStats() {
        const allMenuItems = await menuService.getAllMenuItems();
        const docMenuItems = allMenuItems.filter((item) => item.type === "documentation");
        const allDocs = await documentationService.getAll();
        const orphanedCount = docMenuItems.filter(
          (menuItem) => !allDocs.some((doc) => doc.menu_item_id === menuItem.id)
        ).length;
        return { orphaned: orphanedCount, total: docMenuItems.length };
      }
    };
    documentationMenuService = new DocumentationMenuService();
  }
});

// server/services/documentationService.ts
var transformCategory, transformDocumentation, documentationService;
var init_documentationService = __esm({
  "server/services/documentationService.ts"() {
    "use strict";
    init_db();
    transformCategory = (row) => ({
      id: row.id,
      name: row.name,
      slug: row.slug,
      description: row.description,
      icon: row.icon,
      order_index: row.order_index,
      parent_id: row.parent_id,
      created_at: row.created_at,
      updated_at: row.updated_at
    });
    transformDocumentation = (row) => ({
      id: row.id,
      title: row.title,
      slug: row.slug,
      content: row.content,
      excerpt: row.excerpt,
      category_id: row.category_id,
      parent_id: row.parent_id,
      order_index: row.order_index,
      is_published: row.is_published,
      meta_title: row.meta_title,
      meta_description: row.meta_description,
      menu_item_id: row.menu_item_id,
      auto_menu: row.auto_menu ?? true,
      menu_title: row.menu_title,
      menu_parent_id: row.menu_parent_id,
      created_at: row.created_at,
      updated_at: row.updated_at
    });
    documentationService = {
      // Get all categories
      async getCategories() {
        const result = await pool.query(
          "SELECT * FROM documentation_categories ORDER BY order_index ASC"
        );
        return result.rows.map(transformCategory);
      },
      // Get all documentation with categories
      async getAll() {
        const result = await pool.query(`
      SELECT d.*, dc.name as category_name, dc.slug as category_slug
      FROM documentation d
      LEFT JOIN documentation_categories dc ON d.category_id = dc.id
      ORDER BY dc.order_index ASC, d.order_index ASC
    `);
        return result.rows.map(transformDocumentation);
      },
      // Get published documentation for public view
      async getPublished() {
        const result = await pool.query(`
      SELECT d.*, dc.name as category_name, dc.slug as category_slug
      FROM documentation d
      LEFT JOIN documentation_categories dc ON d.category_id = dc.id
      WHERE d.is_published = true
      ORDER BY dc.order_index ASC, d.order_index ASC
    `);
        return result.rows.map(transformDocumentation);
      },
      // Get documentation by slug
      async getBySlug(slug) {
        const result = await pool.query(`
      SELECT d.*, dc.name as category_name, dc.slug as category_slug
      FROM documentation d
      LEFT JOIN documentation_categories dc ON d.category_id = dc.id
      WHERE d.slug = $1
    `, [slug]);
        return result.rows[0] ? transformDocumentation(result.rows[0]) : null;
      },
      // Get category by ID (for menu service integration)
      async getCategoryById(id) {
        const result = await pool.query("SELECT * FROM documentation_categories WHERE id = $1", [id]);
        return result.rows[0] ? transformCategory(result.rows[0]) : null;
      },
      // Create new documentation
      async create(data) {
        console.log("Service create called with:", data);
        try {
          const result = await pool.query(`
        INSERT INTO documentation (title, slug, content, excerpt, category_id, is_published, auto_menu, menu_title, menu_parent_id)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        RETURNING *
      `, [
            data.title,
            data.slug,
            data.content || "",
            data.excerpt || "",
            data.category_id || null,
            data.is_published !== false,
            data.auto_menu !== false,
            data.menu_title || null,
            data.menu_parent_id || null
          ]);
          console.log("Database result:", result.rows[0]);
          const doc = transformDocumentation(result.rows[0]);
          if (doc.is_published && doc.auto_menu) {
            try {
              const { documentationMenuService: documentationMenuService2 } = await Promise.resolve().then(() => (init_documentationMenuService(), documentationMenuService_exports));
              await documentationMenuService2.syncDocumentationToMenu(doc);
            } catch (menuError) {
              console.error("Menu sync failed, but document created:", menuError);
            }
          }
          return doc;
        } catch (error) {
          console.error("Database error in create:", error);
          throw error;
        }
      },
      // Update documentation with retry logic
      async update(id, data, retries = 2) {
        for (let attempt = 0; attempt <= retries; attempt++) {
          try {
            const result = await pool.query(`
          UPDATE documentation 
          SET title = $2, slug = $3, content = $4, excerpt = $5, category_id = $6, 
              parent_id = $7, order_index = $8, is_published = $9, meta_title = $10, meta_description = $11,
              auto_menu = $12, menu_title = $13, menu_parent_id = $14, menu_item_id = $15
          WHERE id = $1
          RETURNING *
        `, [
              id,
              data.title,
              data.slug,
              data.content,
              data.excerpt,
              data.category_id || null,
              data.parent_id || null,
              data.order_index || 0,
              data.is_published !== void 0 ? data.is_published : true,
              data.meta_title || null,
              data.meta_description || null,
              data.auto_menu !== void 0 ? data.auto_menu : true,
              data.menu_title || null,
              data.menu_parent_id || null,
              data.menu_item_id || null
            ]);
            const doc = transformDocumentation(result.rows[0]);
            try {
              const { documentationMenuService: documentationMenuService2 } = await Promise.resolve().then(() => (init_documentationMenuService(), documentationMenuService_exports));
              await documentationMenuService2.syncDocumentationToMenu(doc);
            } catch (menuError) {
              console.error(`Menu sync failed during update (attempt ${attempt + 1}):`, menuError);
              if (attempt === retries) {
                console.error("\u274C Menu sync failed after all retries");
              }
            }
            return doc;
          } catch (error) {
            console.error(`Error updating documentation (attempt ${attempt + 1}):`, error);
            if (attempt === retries) {
              throw error;
            }
            await new Promise((resolve) => setTimeout(resolve, 1e3 * (attempt + 1)));
          }
        }
        throw new Error("Update failed after all retries");
      },
      // Delete documentation
      async delete(id) {
        const result = await pool.query("DELETE FROM documentation WHERE id = $1", [id]);
        return (result.rowCount ?? 0) > 0;
      },
      // Validate menu-document relationships
      async validateMenuRelationships() {
        const issues = [];
        try {
          const allDocs = await this.getAll();
          const { menuService: menuService2 } = await Promise.resolve().then(() => (init_menuService(), menuService_exports));
          const allMenuItems = await menuService2.getAllMenuItems();
          for (const doc of allDocs) {
            if (doc.menu_item_id) {
              const menuExists = allMenuItems.some((item) => item.id === doc.menu_item_id);
              if (!menuExists) {
                issues.push(`Document ${doc.id} (${doc.title}) references non-existent menu item ${doc.menu_item_id}`);
              }
            }
          }
          const docMenuItems = allMenuItems.filter((item) => item.type === "documentation");
          for (const menuItem of docMenuItems) {
            const docExists = allDocs.some((doc) => doc.menu_item_id === menuItem.id);
            if (!docExists) {
              issues.push(`Menu item ${menuItem.id} (${menuItem.title}) has no corresponding documentation`);
            }
          }
          return { valid: issues.length === 0, issues };
        } catch (error) {
          console.error("Error validating menu relationships:", error);
          return { valid: false, issues: ["Validation failed due to error"] };
        }
      },
      // Get documentation by ID
      async getById(id) {
        const result = await pool.query(`
      SELECT d.*, dc.name as category_name, dc.slug as category_slug
      FROM documentation d
      LEFT JOIN documentation_categories dc ON d.category_id = dc.id
      WHERE d.id = $1
    `, [id]);
        return result.rows[0] ? transformDocumentation(result.rows[0]) : null;
      },
      // Get category tree with hierarchy
      async getCategoryTree() {
        const categories = await this.getCategories();
        return this.buildCategoryTree(categories);
      },
      // Build hierarchical category tree
      buildCategoryTree(categories) {
        const categoryMap = /* @__PURE__ */ new Map();
        const rootCategories = [];
        categories.forEach((category) => {
          categoryMap.set(category.id, { ...category, children: [] });
        });
        categories.forEach((category) => {
          const categoryWithChildren = categoryMap.get(category.id);
          if (category.parent_id) {
            const parent = categoryMap.get(category.parent_id);
            if (parent) {
              parent.children = parent.children || [];
              parent.children.push(categoryWithChildren);
            }
          } else {
            rootCategories.push(categoryWithChildren);
          }
        });
        return rootCategories;
      },
      // Validate hierarchy to prevent circular references
      async validateHierarchy(categoryId, parentId) {
        if (categoryId === parentId) return false;
        const checkDescendant = async (checkId) => {
          const result = await pool.query("SELECT parent_id FROM documentation_categories WHERE id = $1", [checkId]);
          if (result.rows.length === 0) return false;
          const parent = result.rows[0].parent_id;
          if (!parent) return false;
          if (parent === categoryId) return true;
          return await checkDescendant(parent);
        };
        return !await checkDescendant(parentId);
      },
      // Create category
      async createCategory(data) {
        if (data.parent_id) {
          const parentExists = await pool.query("SELECT id FROM documentation_categories WHERE id = $1", [data.parent_id]);
          if (parentExists.rows.length === 0) {
            throw new Error("Parent category does not exist");
          }
        }
        const result = await pool.query(`
      INSERT INTO documentation_categories (name, slug, description, icon, order_index, parent_id)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
    `, [
          data.name,
          data.slug,
          data.description || "",
          data.icon || "",
          data.order_index || 0,
          data.parent_id || null
        ]);
        return transformCategory(result.rows[0]);
      },
      // Update category
      async updateCategory(id, data) {
        if (data.parent_id !== void 0 && data.parent_id !== null) {
          const isValid = await this.validateHierarchy(id, data.parent_id);
          if (!isValid) {
            throw new Error("Invalid hierarchy: would create circular reference");
          }
          const parentExists = await pool.query("SELECT id FROM documentation_categories WHERE id = $1", [data.parent_id]);
          if (parentExists.rows.length === 0) {
            throw new Error("Parent category does not exist");
          }
        }
        const result = await pool.query(`
      UPDATE documentation_categories 
      SET name = $2, slug = $3, description = $4, icon = $5, order_index = $6, parent_id = $7
      WHERE id = $1
      RETURNING *
    `, [
          id,
          data.name,
          data.slug,
          data.description,
          data.icon,
          data.order_index,
          data.parent_id || null
        ]);
        const category = transformCategory(result.rows[0]);
        const { documentationMenuService: documentationMenuService2 } = await Promise.resolve().then(() => (init_documentationMenuService(), documentationMenuService_exports));
        await documentationMenuService2.updateCategoryMenu(category);
        return category;
      },
      // Delete category with transaction support
      async deleteCategory(id) {
        const client = await pool.connect();
        try {
          await client.query("BEGIN");
          const { documentationMenuService: documentationMenuService2 } = await Promise.resolve().then(() => (init_documentationMenuService(), documentationMenuService_exports));
          await documentationMenuService2.handleCategoryDeletion(id);
          const result = await client.query("DELETE FROM documentation_categories WHERE id = $1", [id]);
          const success = (result.rowCount ?? 0) > 0;
          if (success) {
            await client.query("COMMIT");
            console.log("\u2705 Category deleted successfully:", id);
          } else {
            await client.query("ROLLBACK");
          }
          return success;
        } catch (error) {
          console.error("\u274C Category deletion failed, rolling back:", error);
          await client.query("ROLLBACK");
          return false;
        } finally {
          client.release();
        }
      }
    };
  }
});

// server/db/connection.ts
var db2;
var init_connection = __esm({
  "server/db/connection.ts"() {
    "use strict";
    init_db();
    db2 = {
      query: (text2, params) => pool.query(text2, params)
    };
  }
});

// server/services/digitalGoodsService.ts
var digitalGoodsService_exports = {};
__export(digitalGoodsService_exports, {
  DigitalGoodsService: () => DigitalGoodsService,
  digitalGoodsService: () => digitalGoodsService
});
var DigitalGoodsService, digitalGoodsService;
var init_digitalGoodsService = __esm({
  "server/services/digitalGoodsService.ts"() {
    "use strict";
    init_emailService();
    init_connection();
    DigitalGoodsService = class {
      async deliverDigitalGoods(orderDetails) {
        try {
          const processedItems = await this.processDigitalItems(orderDetails.items);
          await this.sendDeliveryEmail(orderDetails, processedItems);
          await this.logDelivery(orderDetails.id, orderDetails.customerEmail);
          return { success: true, message: "Digital goods delivered successfully" };
        } catch (error) {
          console.error("Failed to deliver digital goods:", error);
          throw new Error("Failed to deliver digital goods");
        }
      }
      async processDigitalItems(items) {
        return items.map((item) => ({
          ...item,
          downloadUrl: this.generateDownloadUrl(item.id),
          licenseKey: this.generateLicenseKey(item.id),
          instructions: this.getProductInstructions(item.title)
        }));
      }
      generateDownloadUrl(productId) {
        const token = Buffer.from(`${productId}-${Date.now()}`).toString("base64");
        return `${process.env.BASE_URL || "https://blogpro.tech"}/api/downloads/${token}`;
      }
      generateLicenseKey(productId) {
        const timestamp2 = Date.now().toString(36);
        const random = Math.random().toString(36).substring(2, 8);
        return `${productId.substring(0, 4).toUpperCase()}-${timestamp2}-${random}`.toUpperCase();
      }
      getProductInstructions(productTitle) {
        return `
Installation Instructions for ${productTitle}:

1. Download the product files using the secure link provided
2. Extract the files to your desired location
3. Follow the README.md file included in the download
4. Use your license key for activation if required
5. Contact support if you need assistance

Your license is valid for unlimited personal/commercial use.
    `.trim();
      }
      async sendDeliveryEmail(orderDetails, items) {
        if (!emailService.transporter) {
          await emailService.initialize();
        }
        if (!emailService.transporter) {
          throw new Error("Email service not configured");
        }
        for (const item of items) {
          await this.sendProductEmail(orderDetails, item);
        }
      }
      async sendProductEmail(orderDetails, item) {
        try {
          const template = await this.getProductEmailTemplate(item.id);
          const variables = {
            customer_name: orderDetails.customerName,
            customer_email: orderDetails.customerEmail,
            product_title: item.title,
            order_number: orderDetails.orderNumber,
            license_key: item.licenseKey || "",
            download_url: item.downloadUrl || "",
            purchase_date: (/* @__PURE__ */ new Date()).toLocaleDateString(),
            total_amount: orderDetails.totalAmount.toFixed(2)
          };
          const subject = this.replaceVariables(template.subject, variables);
          const content = this.replaceVariables(template.content, variables);
          const mailOptions = {
            from: `"BlogPro Digital Delivery" <${(await emailService.getEmailSettings()).smtpUser}>`,
            to: orderDetails.customerEmail,
            subject,
            html: content
          };
          await emailService.transporter.sendMail(mailOptions);
        } catch (error) {
          console.error(`Failed to send email for product ${item.id}:`, error);
          await this.sendFallbackEmail(orderDetails, item);
        }
      }
      async getProductEmailTemplate(productId) {
        try {
          const result = await db2.query(`
        SELECT 
          COALESCE(p.custom_email_subject, et.subject) as subject,
          COALESCE(p.custom_email_content, et.content) as content
        FROM products p
        LEFT JOIN email_templates et ON p.email_template_id = et.id
        LEFT JOIN email_templates def ON def.is_default = true AND def.template_type = 'product_delivery'
        WHERE p.id = $1
      `, [productId]);
          if (result.rows.length > 0) {
            return result.rows[0];
          }
          const defaultResult = await db2.query(`
        SELECT subject, content FROM email_templates 
        WHERE is_default = true AND template_type = 'product_delivery'
        LIMIT 1
      `);
          return defaultResult.rows[0] || {
            subject: "\u{1F389} Your {{product_title}} is Ready!",
            content: "<p>Hello {{customer_name}}, your {{product_title}} is ready for download!</p>"
          };
        } catch (error) {
          console.error("Failed to get email template:", error);
          return {
            subject: "\u{1F389} Your {{product_title}} is Ready!",
            content: "<p>Hello {{customer_name}}, your {{product_title}} is ready for download!</p>"
          };
        }
      }
      replaceVariables(template, variables) {
        let result = template;
        Object.entries(variables).forEach(([key, value]) => {
          const regex = new RegExp(`{{${key}}}`, "g");
          result = result.replace(regex, value || "");
        });
        return result;
      }
      async sendFallbackEmail(orderDetails, item) {
        const mailOptions = {
          from: `"BlogPro Digital Delivery" <${(await emailService.getEmailSettings()).smtpUser}>`,
          to: orderDetails.customerEmail,
          subject: `\u{1F389} Your ${item.title} is Ready! Order #${orderDetails.orderNumber}`,
          html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1>\u{1F389} Thank you for your purchase!</h1>
          <p>Hello ${orderDetails.customerName},</p>
          <p>Your digital product <strong>${item.title}</strong> is ready for download!</p>
          <p><strong>License Key:</strong> ${item.licenseKey}</p>
          <p><a href="${item.downloadUrl}" style="background: #10b981; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Download ${item.title}</a></p>
        </div>
      `
        };
        await emailService.transporter.sendMail(mailOptions);
      }
      async logDelivery(orderId, customerEmail) {
        try {
          await db2.query(`
        INSERT INTO digital_deliveries (order_id, customer_email, delivered_at, status)
        VALUES ($1, $2, NOW(), 'delivered')
        ON CONFLICT (order_id) DO UPDATE SET
          delivered_at = NOW(),
          status = 'delivered'
      `, [orderId, customerEmail]);
        } catch (error) {
          console.error("Failed to log delivery:", error);
        }
      }
    };
    digitalGoodsService = new DigitalGoodsService();
  }
});

// server/utils/createAdminUser.ts
var createAdminUser_exports = {};
__export(createAdminUser_exports, {
  ensureAdminUserExists: () => ensureAdminUserExists
});
import { eq as eq11, or as or4 } from "drizzle-orm";
import bcrypt3 from "bcrypt";
import crypto3 from "crypto";
async function ensureAdminUserExists() {
  try {
    const existingAdmin = await db.select().from(users).where(or4(eq11(users.username, "Gena"), eq11(users.email, "genavinogradov@gmail.com")));
    if (existingAdmin.length > 0) {
      console.log("\u2705 Admin user already exists");
      return;
    }
    const hashedPassword = await bcrypt3.hash("H76&9j_+867#$", 10);
    await db.insert(users).values({
      id: crypto3.randomUUID(),
      username: "Gena",
      email: "genavinogradov@gmail.com",
      password: hashedPassword,
      firstName: "Admin",
      lastName: "User",
      role: "admin",
      emailVerified: true,
      // Skip email verification for admin
      isBlocked: false,
      createdAt: /* @__PURE__ */ new Date(),
      updatedAt: /* @__PURE__ */ new Date()
    });
    console.log("\u2705 Admin user created successfully");
    console.log("   Login: Gena");
    console.log("   Password: H76&9j_+867#$");
    console.log("   Email: genavinogradov@gmail.com");
  } catch (error) {
    console.error("\u274C Failed to create admin user:", error);
  }
}
var init_createAdminUser = __esm({
  "server/utils/createAdminUser.ts"() {
    "use strict";
    init_db();
    init_schema();
  }
});

// server/services/realtime-analytics.ts
var realtime_analytics_exports = {};
__export(realtime_analytics_exports, {
  RealtimeAnalyticsService: () => RealtimeAnalyticsService,
  realtimeAnalytics: () => realtimeAnalytics
});
var RealtimeAnalyticsService, realtimeAnalytics;
var init_realtime_analytics = __esm({
  "server/services/realtime-analytics.ts"() {
    "use strict";
    init_analytics_service();
    init_websocket();
    RealtimeAnalyticsService = class _RealtimeAnalyticsService {
      constructor() {
        this.updateInterval = null;
        this.wsInstance = null;
      }
      static getInstance() {
        if (!_RealtimeAnalyticsService.instance) {
          _RealtimeAnalyticsService.instance = new _RealtimeAnalyticsService();
        }
        return _RealtimeAnalyticsService.instance;
      }
      // Initialize with WebSocket instance
      initialize(wsInstance) {
        this.wsInstance = wsInstance;
        this.startRealtimeUpdates();
      }
      // Start broadcasting real-time updates
      startRealtimeUpdates() {
        if (this.updateInterval) return;
        this.updateInterval = setInterval(async () => {
          try {
            await this.broadcastAnalyticsUpdate();
            await this.broadcastVisitorCount();
          } catch (error) {
            console.error("Real-time analytics update failed:", error);
          }
        }, 3e4);
        console.log("\u{1F4CA} Real-time analytics broadcasting started");
      }
      // Stop broadcasting
      stop() {
        if (this.updateInterval) {
          clearInterval(this.updateInterval);
          this.updateInterval = null;
          console.log("\u{1F4CA} Real-time analytics broadcasting stopped");
        }
      }
      // Broadcast analytics update to all connected clients
      async broadcastAnalyticsUpdate() {
        try {
          const overview = await analyticsService.getOverview({ days: 7 });
          await analyticsService.updateRealtimeStats();
          console.log("\u{1F4E1} Broadcasting analytics update:", {
            pageViews: overview.totalPageViews,
            visitors: overview.uniqueVisitors,
            sessions: overview.totalSessions
          });
          broadcastUpdate(this.wsInstance, "analytics_updated", {
            totalPageViews: overview.totalPageViews,
            uniqueVisitors: overview.uniqueVisitors,
            totalSessions: overview.totalSessions,
            bounceRate: overview.bounceRate,
            avgSessionDuration: overview.avgSessionDuration,
            topPages: overview.topPages.slice(0, 5),
            topReferrers: overview.topReferrers.slice(0, 5),
            deviceStats: overview.deviceStats,
            countryStats: overview.countryStats,
            // Only send chart data if it has changed
            chartData: overview.chartData,
            timestamp: (/* @__PURE__ */ new Date()).toISOString(),
            updateType: "MERGE_UPDATE"
          });
        } catch (error) {
          console.error("Error broadcasting analytics update:", error);
        }
      }
      // Broadcast immediate update (for manual triggers)
      async broadcastImmediate() {
        await this.broadcastAnalyticsUpdate();
      }
      // Broadcast visitor count update
      async broadcastVisitorCount() {
        try {
          const realtimeStats = await analyticsService.getRealtimeStats();
          console.log("\u{1F4E1} Broadcasting visitor count:", realtimeStats.activeUsers);
          broadcastUpdate(this.wsInstance, "visitor_count_updated", {
            activeVisitors: realtimeStats.activeUsers,
            currentPageViews: realtimeStats.currentPageViews,
            timestamp: (/* @__PURE__ */ new Date()).toISOString()
          });
        } catch (error) {
          console.error("Error broadcasting visitor count:", error);
        }
      }
    };
    realtimeAnalytics = RealtimeAnalyticsService.getInstance();
  }
});

// server/index.ts
import express4 from "express";
import session from "express-session";

// server/middleware/security.ts
import rateLimit from "express-rate-limit";
import cors from "cors";
var rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1e3,
  // 15 minutes
  max: 1e3,
  // limit each IP to 1000 requests per windowMs
  message: "Too many requests from this IP, please try again later.",
  standardHeaders: true,
  legacyHeaders: false,
  skip: (req) => {
    return req.session?.user?.role === "admin";
  }
});
var authRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1e3,
  // 15 minutes
  max: 20,
  // limit each IP to 20 requests per windowMs
  message: "Too many authentication attempts, please try again later.",
  standardHeaders: true,
  legacyHeaders: false,
  skip: (req) => {
    return req.session?.user?.role === "admin";
  }
});
var corsOptions = {
  origin: process.env.NODE_ENV === "production" ? [process.env.CORS_ORIGIN || "https://blogpro.tech", "https://blogpro.tech", "https://www.blogpro.tech"] : ["https://blogpro.tech", "http://localhost:3000", "https://localhost:3000"],
  credentials: true,
  optionsSuccessStatus: 200
};
var corsMiddleware = cors(corsOptions);
var securityHeadersMiddleware = (_req, res, next) => {
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; style-src 'self' 'unsafe-inline'; script-src 'self'; img-src 'self' data: https: blob:; connect-src 'self' ws: wss:; font-src 'self'; object-src 'none'; media-src 'self'; frame-src 'none'"
  );
  res.setHeader("Strict-Transport-Security", "max-age=31536000; includeSubDomains; preload");
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("X-XSS-Protection", "0");
  res.setHeader("Referrer-Policy", "no-referrer");
  next();
};
var sanitizeInput = (req, _res, next) => {
  const sanitize = (obj) => {
    if (typeof obj === "string") {
      return obj.trim().replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "");
    }
    if (typeof obj === "object" && obj !== null) {
      for (const key in obj) {
        obj[key] = sanitize(obj[key]);
      }
    }
    return obj;
  };
  if (req.body) req.body = sanitize(req.body);
  if (req.query) req.query = sanitize(req.query);
  if (req.params) req.params = sanitize(req.params);
  next();
};

// server/config/swagger.ts
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
var options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "BlogPro API",
      version: "1.0.0",
      description: "\u041A\u043E\u043C\u043F\u043B\u0435\u043A\u0441\u043D\u0430\u044F API \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u0430\u0446\u0438\u044F \u0434\u043B\u044F BlogPro - \u043F\u0440\u043E\u0444\u0435\u0441\u0441\u0438\u043E\u043D\u0430\u043B\u044C\u043D\u043E\u0439 \u0431\u043B\u043E\u0433-\u043F\u043B\u0430\u0442\u0444\u043E\u0440\u043C\u044B",
      contact: {
        name: "BlogPro Support",
        email: "support@blogpro.local"
      },
      license: {
        name: "MIT",
        url: "https://opensource.org/licenses/MIT"
      }
    },
    servers: [
      {
        url: process.env.NODE_ENV === "production" ? "https://blogpro.tech" : "https://blogpro.tech",
        description: process.env.NODE_ENV === "production" ? "Production server" : "Development server"
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT"
        },
        cookieAuth: {
          type: "apiKey",
          in: "cookie",
          name: "connect.sid"
        }
      },
      schemas: {
        StandardSuccess: {
          type: "object",
          properties: {
            success: { type: "boolean", example: true },
            data: { type: "object" },
            message: { type: "string" },
            timestamp: { type: "string", format: "date-time" }
          }
        },
        StandardError: {
          type: "object",
          properties: {
            success: { type: "boolean", example: false },
            error: {
              type: "object",
              properties: {
                code: { type: "string" },
                message: { type: "string" },
                details: { type: "object" }
              }
            },
            timestamp: { type: "string", format: "date-time" },
            requestId: { type: "string" }
          }
        },
        User: {
          type: "object",
          properties: {
            id: { type: "string" },
            username: { type: "string" },
            email: { type: "string", format: "email" },
            firstName: { type: "string" },
            lastName: { type: "string" },
            role: { type: "string", enum: ["admin", "editor", "user"] },
            emailVerified: { type: "boolean" },
            profileImageUrl: { type: "string" },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" }
          }
        },
        BlogPost: {
          type: "object",
          properties: {
            id: { type: "number" },
            title: { type: "string" },
            description: { type: "string" },
            content: { type: "string" },
            categoryId: { type: "number" },
            imageUrl: { type: "string" },
            thumbnailUrl: { type: "string" },
            projectUrl: { type: "string" },
            technologies: { type: "array", items: { type: "string" } },
            tags: { type: "array", items: { type: "string" } },
            slug: { type: "string" },
            status: { type: "string", enum: ["published", "draft", "archived"] },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" }
          }
        },
        Category: {
          type: "object",
          properties: {
            id: { type: "number" },
            name: { type: "string" },
            slug: { type: "string" },
            description: { type: "string" },
            parentId: { type: "number", nullable: true },
            sortOrder: { type: "number" },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" }
          }
        },
        MediaFile: {
          type: "object",
          properties: {
            id: { type: "number" },
            filename: { type: "string" },
            originalName: { type: "string" },
            mimeType: { type: "string" },
            size: { type: "number" },
            url: { type: "string" },
            thumbnailUrl: { type: "string" },
            createdAt: { type: "string", format: "date-time" }
          }
        },
        Contact: {
          type: "object",
          properties: {
            id: { type: "number" },
            firstName: { type: "string" },
            lastName: { type: "string" },
            email: { type: "string", format: "email" },
            message: { type: "string" },
            createdAt: { type: "string", format: "date-time" }
          }
        },
        PaginatedResponse: {
          type: "object",
          properties: {
            success: { type: "boolean", example: true },
            data: {
              type: "object",
              properties: {
                items: { type: "array" },
                pagination: {
                  type: "object",
                  properties: {
                    page: { type: "number" },
                    limit: { type: "number" },
                    total: { type: "number" },
                    totalPages: { type: "number" }
                  }
                }
              }
            }
          }
        }
      },
      parameters: {
        PageParam: {
          name: "page",
          in: "query",
          description: "\u041D\u043E\u043C\u0435\u0440 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u044B",
          schema: { type: "integer", minimum: 1, default: 1 }
        },
        LimitParam: {
          name: "limit",
          in: "query",
          description: "\u041A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E \u044D\u043B\u0435\u043C\u0435\u043D\u0442\u043E\u0432 \u043D\u0430 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0435",
          schema: { type: "integer", minimum: 1, maximum: 100, default: 10 }
        },
        SortParam: {
          name: "sort",
          in: "query",
          description: "\u041F\u043E\u043B\u0435 \u0434\u043B\u044F \u0441\u043E\u0440\u0442\u0438\u0440\u043E\u0432\u043A\u0438",
          schema: { type: "string", default: "createdAt" }
        },
        OrderParam: {
          name: "order",
          in: "query",
          description: "\u041F\u043E\u0440\u044F\u0434\u043E\u043A \u0441\u043E\u0440\u0442\u0438\u0440\u043E\u0432\u043A\u0438",
          schema: { type: "string", enum: ["asc", "desc"], default: "desc" }
        }
      }
    }
  },
  apis: ["./server/api/**/*.ts"]
};
var specs = swaggerJsdoc(options);
var setupSwagger = (app2) => {
  const swaggerOptions = {
    customCss: ".swagger-ui .topbar { display: none }",
    customSiteTitle: "BlogPro API Documentation",
    customfavIcon: "/favicon.ico",
    swaggerOptions: {
      persistAuthorization: true,
      displayRequestDuration: true,
      filter: true,
      tryItOutEnabled: true
    }
  };
  app2.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs, swaggerOptions));
  app2.get("/api-docs.json", (_, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(specs);
  });
};

// server/utils/logger.ts
import winston from "winston";
import path from "path";
var logFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.errors({ stack: true }),
  winston.format.json()
);
var logger = winston.createLogger({
  level: process.env.LOG_LEVEL || "info",
  format: logFormat,
  defaultMeta: { service: "blogpro-api" },
  transports: [
    new winston.transports.File({
      filename: path.join(process.cwd(), "logs", "error.log"),
      level: "error"
    }),
    new winston.transports.File({
      filename: path.join(process.cwd(), "logs", "combined.log")
    })
  ]
});
if (process.env.NODE_ENV !== "production") {
  logger.add(new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.simple()
    )
  }));
}

// server/middleware/requestLogger.ts
var requestLogger = (req, res, next) => {
  const start = Date.now();
  res.on("finish", () => {
    const duration = Date.now() - start;
    const logData = {
      method: req.method,
      url: req.originalUrl,
      statusCode: res.statusCode,
      duration: `${duration}ms`,
      userAgent: req.get("User-Agent"),
      ip: req.ip
    };
    if (res.statusCode >= 400) {
      logger.error("HTTP Request Error", logData);
    } else {
      logger.info("HTTP Request", logData);
    }
  });
  next();
};

// server/utils/healthMonitor.ts
init_db();
init_redis();
var HealthMonitor = class {
  constructor(intervalMinutes = 5) {
    this.intervalId = null;
    this.checkInterval = intervalMinutes * 60 * 1e3;
  }
  start() {
    if (this.intervalId) return;
    this.intervalId = setInterval(async () => {
      await this.performHealthCheck();
    }, this.checkInterval);
    logger.info("Health monitor started", { interval: `${this.checkInterval / 1e3}s` });
  }
  stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
      logger.info("Health monitor stopped");
    }
  }
  async performHealthCheck() {
    const dbHealthy = await checkDatabaseConnection();
    const redisHealthy = await checkRedisConnection();
    const healthStatus = {
      database: dbHealthy ? "healthy" : "unhealthy",
      redis: redisHealthy ? "healthy" : "unhealthy",
      overall: dbHealthy && redisHealthy ? "healthy" : "unhealthy"
    };
    if (!dbHealthy || !redisHealthy) {
      logger.error("Health check failed", healthStatus);
    } else {
      logger.debug("Health check passed", healthStatus);
    }
  }
};
var healthMonitor = new HealthMonitor();

// server/utils/metricsCollector.ts
var MetricsCollector = class {
  constructor() {
    this.metrics = [];
    this.intervalId = null;
    this.maxMetrics = 100;
  }
  // Keep last 100 metrics
  start(intervalMinutes = 1) {
    if (this.intervalId) return;
    this.intervalId = setInterval(() => {
      this.collectMetrics();
    }, intervalMinutes * 60 * 1e3);
    logger.info("Metrics collector started", { interval: `${intervalMinutes}m` });
  }
  stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
      logger.info("Metrics collector stopped");
    }
  }
  collectMetrics() {
    const metric = {
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      memory: process.memoryUsage(),
      cpu: process.cpuUsage(),
      uptime: process.uptime()
    };
    this.metrics.push(metric);
    if (this.metrics.length > this.maxMetrics) {
      this.metrics = this.metrics.slice(-this.maxMetrics);
    }
    const heapUsedMB = metric.memory.heapUsed / 1024 / 1024;
    if (heapUsedMB > 100) {
      logger.warn("High memory usage detected", {
        heapUsed: `${heapUsedMB.toFixed(2)}MB`,
        heapTotal: `${(metric.memory.heapTotal / 1024 / 1024).toFixed(2)}MB`
      });
    }
  }
  getMetrics() {
    return [...this.metrics];
  }
  getLatestMetrics() {
    return this.metrics.length > 0 ? this.metrics[this.metrics.length - 1] : null;
  }
};
var metricsCollector = new MetricsCollector();

// server/middleware/compression.ts
import compression from "compression";
var compressionMiddleware = compression({
  filter: (req, res) => {
    if (req.headers["x-no-compression"]) {
      return false;
    }
    return compression.filter(req, res);
  },
  level: 6,
  threshold: 1024,
  windowBits: 15,
  memLevel: 8
});

// server/middleware/performanceMonitor.ts
var performanceMonitor = (req, res, next) => {
  const startTime = process.hrtime.bigint();
  const startCpuUsage = process.cpuUsage();
  res.on("finish", () => {
    const endTime = process.hrtime.bigint();
    const endCpuUsage = process.cpuUsage(startCpuUsage);
    const metrics = {
      responseTime: Number(endTime - startTime) / 1e6,
      // Convert to milliseconds
      memoryUsage: process.memoryUsage(),
      cpuUsage: endCpuUsage
    };
    if (metrics.responseTime > 1e3) {
      logger.warn("Slow request detected", {
        method: req.method,
        url: req.originalUrl,
        responseTime: `${metrics.responseTime.toFixed(2)}ms`,
        statusCode: res.statusCode,
        memoryUsed: `${(metrics.memoryUsage.heapUsed / 1024 / 1024).toFixed(2)}MB`,
        cpuUser: `${(metrics.cpuUsage.user / 1e3).toFixed(2)}ms`
      });
    }
    logger.debug("Request performance", {
      method: req.method,
      url: req.originalUrl,
      responseTime: `${metrics.responseTime.toFixed(2)}ms`,
      statusCode: res.statusCode,
      heapUsed: metrics.memoryUsage.heapUsed,
      cpuUser: metrics.cpuUsage.user
    });
  });
  next();
};

// server/middleware/requestId.ts
function requestIdMiddleware(req, res, next) {
  const requestId = req.headers["x-request-id"] || Math.random().toString(36).substring(2) + Date.now().toString(36);
  req.headers["x-request-id"] = requestId;
  res.setHeader("X-Request-ID", requestId);
  next();
}

// server/index.ts
import pgSession from "connect-pg-simple";

// server/api/index.ts
import { Router as Router50 } from "express";

// server/api/admin/index.ts
import { Router as Router2 } from "express";

// server/api/admin/users.ts
import { Router } from "express";
import { z } from "zod";

// shared/utils/errors.ts
var BadRequestError = class extends Error {
  constructor(message) {
    super(message);
    this.name = "BadRequestError";
  }
};
var NotFoundError = class extends Error {
  constructor(message) {
    super(message);
    this.name = "NotFoundError";
  }
};
var ValidationError = class extends Error {
  constructor(message, errors = []) {
    super(message);
    this.name = "ValidationError";
    this.errors = errors;
  }
};
var UnauthorizedError = class extends Error {
  constructor(message) {
    super(message);
    this.name = "UnauthorizedError";
  }
};

// shared/types/api-responses.ts
function createSuccessResponse(data, message) {
  return {
    success: true,
    data,
    message,
    timestamp: (/* @__PURE__ */ new Date()).toISOString()
  };
}
function createErrorResponse(code, message, details, requestId) {
  return {
    success: false,
    error: {
      code,
      message,
      details
    },
    timestamp: (/* @__PURE__ */ new Date()).toISOString(),
    requestId: requestId || generateRequestId()
  };
}
function createPaginatedResponse(items, page, limit, total) {
  return {
    success: true,
    data: {
      items,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    },
    timestamp: (/* @__PURE__ */ new Date()).toISOString()
  };
}
function generateRequestId() {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

// server/middleware/errorHandler.ts
function notFoundHandler(req, res, _next) {
  const errorResponse = createErrorResponse(
    "NOT_FOUND" /* NOT_FOUND */,
    `Route ${req.originalUrl} not found`,
    { path: req.originalUrl, method: req.method },
    req.headers["x-request-id"]
  );
  res.status(404).json(errorResponse);
}
function errorHandler(err, req, res, _next) {
  const requestId = req.headers["x-request-id"];
  logger.error("Application Error", {
    error: err.message,
    stack: err.stack,
    method: req.method,
    url: req.originalUrl,
    ip: req.ip,
    requestId
  });
  if (err instanceof BadRequestError) {
    const errorResponse2 = createErrorResponse(
      "VALIDATION_ERROR" /* VALIDATION_ERROR */,
      err.message,
      void 0,
      requestId
    );
    return res.status(400).json(errorResponse2);
  }
  if (err instanceof NotFoundError) {
    const errorResponse2 = createErrorResponse(
      "NOT_FOUND" /* NOT_FOUND */,
      err.message,
      void 0,
      requestId
    );
    return res.status(404).json(errorResponse2);
  }
  if (err instanceof ValidationError) {
    const errorResponse2 = createErrorResponse(
      "VALIDATION_ERROR" /* VALIDATION_ERROR */,
      err.message,
      { errors: err.errors },
      requestId
    );
    return res.status(400).json(errorResponse2);
  }
  if (err instanceof UnauthorizedError) {
    const errorResponse2 = createErrorResponse(
      "UNAUTHORIZED" /* UNAUTHORIZED */,
      err.message,
      void 0,
      requestId
    );
    return res.status(401).json(errorResponse2);
  }
  const message = process.env.NODE_ENV === "development" ? err.message : "Internal server error";
  const errorResponse = createErrorResponse(
    "INTERNAL_ERROR" /* INTERNAL_ERROR */,
    message,
    process.env.NODE_ENV === "development" ? { stack: err.stack } : void 0,
    requestId
  );
  res.status(500).json(errorResponse);
}
function asyncHandler(fn) {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

// server/middleware/authMiddleware.ts
import jwt from "jsonwebtoken";
var JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";
function requireAuth(req, res, next) {
  const token = req.headers.authorization?.replace("Bearer ", "");
  if (!token) {
    return res.status(401).json({ message: "Authentication required" });
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = { id: decoded.userId, role: decoded.role };
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
}
function requireAdmin(req, res, next) {
  const token = req.headers.authorization?.replace("Bearer ", "");
  if (!token) {
    return res.status(401).json({ message: "Authentication required" });
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (decoded.role !== "admin") {
      return res.status(403).json({ message: "Admin access required" });
    }
    req.user = { id: decoded.userId, role: decoded.role };
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
}
function requireRole(roles) {
  return (req, res, next) => {
    const token = req.headers.authorization?.replace("Bearer ", "");
    if (!token) {
      return res.status(401).json({ message: "Authentication required" });
    }
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      if (!roles.includes(decoded.role)) {
        return res.status(403).json({ message: "Insufficient permissions" });
      }
      req.user = { id: decoded.userId, role: decoded.role };
      next();
    } catch (error) {
      return res.status(401).json({ message: "Invalid token" });
    }
  };
}

// server/api/admin/users.ts
init_userService();
var router = Router();
router.get(
  "/",
  requireAdmin,
  asyncHandler(async (_req, res) => {
    const users2 = await getAllUsers();
    res.json({ users: users2 });
  })
);
router.get(
  "/:userId",
  requireAdmin,
  asyncHandler(async (req, res) => {
    const user = await getUserById(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ user });
  })
);
router.post(
  "/",
  requireAdmin,
  asyncHandler(async (req, res) => {
    const schema = z.object({
      email: z.string().email(),
      firstName: z.string().optional(),
      lastName: z.string().optional(),
      password: z.string().min(8),
      role: z.enum(["admin", "editor", "user"]).default("user"),
      status: z.string().optional(),
      isActive: z.boolean().optional(),
      username: z.string().optional(),
      profileImageUrl: z.string().optional()
    });
    const validatedData = schema.parse(req.body);
    const user = await createUser(validatedData);
    res.status(201).json({ user });
  })
);
router.put(
  "/:userId",
  requireAdmin,
  asyncHandler(async (req, res) => {
    const schema = z.object({
      firstName: z.string().optional(),
      lastName: z.string().optional(),
      email: z.string().email().optional(),
      role: z.enum(["admin", "editor", "user"]).optional(),
      emailNotifications: z.boolean().optional(),
      marketingEmails: z.boolean().optional(),
      projectUpdates: z.boolean().optional(),
      username: z.string().optional(),
      isBlocked: z.boolean().optional(),
      status: z.string().optional(),
      isActive: z.boolean().optional(),
      password: z.string().min(8).optional(),
      profileImageUrl: z.string().optional()
    });
    const validatedData = schema.parse(req.body);
    const user = await updateUser(req.params.userId, validatedData);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ user });
  })
);
router.put(
  "/:userId/block",
  requireAdmin,
  asyncHandler(async (req, res) => {
    const schema = z.object({
      isBlocked: z.boolean()
    });
    const validatedData = schema.parse(req.body);
    const user = await blockUser(
      req.params.userId,
      validatedData.isBlocked
    );
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (validatedData.isBlocked) {
      await terminateUserSessions(req.params.userId);
    }
    res.json({
      user,
      message: validatedData.isBlocked ? "User blocked successfully" : "User unblocked successfully"
    });
  })
);
router.delete(
  "/:userId",
  requireAdmin,
  asyncHandler(async (req, res) => {
    const user = await getUserById(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (user.role === "admin") {
      return res.status(403).json({
        success: false,
        message: "Administrator accounts cannot be deleted"
      });
    }
    try {
      await deleteUser(req.params.userId);
      res.json({
        success: true,
        message: "User deleted successfully"
      });
    } catch (error) {
      console.error("Error deleting user:", error);
      res.status(500).json({
        success: false,
        message: "Failed to delete user",
        error: error instanceof Error ? error.message : "Unknown error"
      });
    }
  })
);
var users_default = router;

// server/middleware/cacheHeaders.ts
var setCacheHeaders = (options2 = {}) => {
  return (req, res, next) => {
    const cacheControl = [];
    if (options2.public) cacheControl.push("public");
    if (options2.private) cacheControl.push("private");
    if (options2.noCache) cacheControl.push("no-cache");
    if (options2.noStore) cacheControl.push("no-store");
    if (options2.mustRevalidate) cacheControl.push("must-revalidate");
    if (options2.maxAge !== void 0) cacheControl.push(`max-age=${options2.maxAge}`);
    if (options2.sMaxAge !== void 0) cacheControl.push(`s-maxage=${options2.sMaxAge}`);
    if (cacheControl.length > 0) {
      res.set("Cache-Control", cacheControl.join(", "));
    }
    if (options2.etag) {
      const originalSend = res.json;
      res.json = function(data) {
        const etag = `"${Buffer.from(JSON.stringify(data)).toString("base64").slice(0, 16)}"`;
        res.set("ETag", etag);
        if (req.headers["if-none-match"] === etag) {
          return res.status(304).end();
        }
        return originalSend.call(this, data);
      };
    }
    next();
  };
};
var staticAssetCache = setCacheHeaders({
  public: true,
  maxAge: 31536e3,
  // 1 year
  mustRevalidate: true
});
var apiCache = setCacheHeaders({
  public: true,
  maxAge: 300,
  // 5 minutes
  etag: true
});
var noCache = setCacheHeaders({
  noCache: true,
  noStore: true,
  mustRevalidate: true
});
var cacheHeadersMiddleware = setCacheHeaders({
  public: true,
  maxAge: 300
});

// server/api/admin/index.ts
var router2 = Router2();
router2.use(noCache);
router2.use("/users", users_default);
var admin_default = router2;

// server/api/auth/index.ts
import { Router as Router3 } from "express";
import { z as z3 } from "zod";
import jwt2 from "jsonwebtoken";

// server/services/authService.ts
init_db();
init_schema();
import bcrypt2 from "bcrypt";
import crypto from "crypto";
import { eq as eq2, or } from "drizzle-orm";
import sharp from "sharp";
import fs from "fs";
import path2 from "path";
async function sendAccountDeletionEmail(email, userName) {
  try {
    const { emailService: emailService2 } = await Promise.resolve().then(() => (init_emailService(), emailService_exports));
    await emailService2.initialize();
    const emailSettings = await emailService2.getEmailSettings();
    const mailOptions = {
      from: emailSettings.smtpUser,
      to: email,
      subject: "\u26A0\uFE0F \u0417\u0430\u043F\u043B\u0430\u043D\u0438\u0440\u043E\u0432\u0430\u043D\u043E \u0443\u0434\u0430\u043B\u0435\u043D\u0438\u0435 \u0430\u043A\u043A\u0430\u0443\u043D\u0442\u0430 - BlogPro",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Account Deletion Scheduled</title>
        </head>
        <body style="margin: 0; padding: 0; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
          <table width="100%" cellpadding="0" cellspacing="0" style="min-height: 100vh;">
            <tr>
              <td align="center" style="padding: 40px 20px;">
                <table width="600" cellpadding="0" cellspacing="0" style="background: white; border-radius: 20px; box-shadow: 0 20px 40px rgba(0,0,0,0.1); overflow: hidden;">
                  <!-- Header -->
                  <tr>
                    <td style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px; text-align: center;">
                      <h1 style="color: white; margin: 0; font-size: 32px; font-weight: 700;">BlogPro</h1>
                      <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0; font-size: 16px;">Professional Blogging Platform</p>
                    </td>
                  </tr>
                  
                  <!-- Content -->
                  <tr>
                    <td style="padding: 50px 40px; text-align: center;">
                      <div style="font-size: 60px; margin-bottom: 20px;">\u26A0\uFE0F</div>
                      <h2 style="color: #333; margin: 0 0 20px 0; font-size: 28px; font-weight: 600;">Account Deletion Scheduled</h2>
                      <p style="color: #666; font-size: 18px; line-height: 1.6; margin: 0 0 30px 0;">Hello ${userName},</p>
                      <p style="color: #666; font-size: 16px; line-height: 1.6; margin: 0 0 30px 0;">Your BlogPro account has been scheduled for deletion as requested.</p>
                      
                      <div style="background: #fff3cd; border: 1px solid #ffeaa7; border-radius: 8px; padding: 20px; margin: 30px 0; text-align: left;">
                        <p style="color: #856404; font-size: 14px; margin: 0; font-weight: 600;">\u26A0\uFE0F Important Notice:</p>
                        <p style="color: #856404; font-size: 14px; margin: 10px 0 0 0; line-height: 1.4;">Your account is now locked and you will no longer be able to log in. All your data will remain scheduled for deletion.</p>
                      </div>
                      
                      <p style="color: #666; font-size: 14px; line-height: 1.6; margin: 20px 0 0 0;">If you did not request this deletion, please contact our support team immediately.</p>
                    </td>
                  </tr>
                  
                  <!-- Footer -->
                  <tr>
                    <td style="background: #f8fafc; padding: 30px 40px; text-align: center; border-top: 1px solid #e2e8f0;">
                      <p style="color: #64748b; font-size: 14px; margin: 0 0 10px 0;">This is an automated notification from BlogPro.</p>
                      <p style="color: #94a3b8; font-size: 12px; margin: 0;">\xA9 2024 BlogPro. All rights reserved.</p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `
    };
    if (!emailService2.transporter) {
      throw new Error("Email transporter not initialized");
    }
    await emailService2.transporter.sendMail(mailOptions);
    console.log(`\u26A0\uFE0F \u0423\u0432\u0435\u0434\u043E\u043C\u043B\u0435\u043D\u0438\u0435 \u043E\u0431 \u0443\u0434\u0430\u043B\u0435\u043D\u0438\u0438 \u0443\u0447\u0435\u0442\u043D\u043E\u0439 \u0437\u0430\u043F\u0438\u0441\u0438 \u043E\u0442\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u043E: ${email}`);
  } catch (error) {
    console.error("\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u043E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C \u0443\u0434\u0430\u043B\u0435\u043D\u0438\u0435 \u0430\u043A\u043A\u0430\u0443\u043D\u0442\u0430 \u043D\u0430 email:", error);
    console.log(`
\u26A0\uFE0F \u0417\u0430\u043F\u043B\u0430\u043D\u0438\u0440\u043E\u0432\u0430\u043D\u043E \u0443\u0434\u0430\u043B\u0435\u043D\u0438\u0435 \u0443\u0447\u0435\u0442\u043D\u043E\u0439 \u0437\u0430\u043F\u0438\u0441\u0438 (\u0441\u0431\u043E\u0439 \u0432 \u0440\u0430\u0431\u043E\u0442\u0435 \u0441\u043B\u0443\u0436\u0431\u044B \u044D\u043B\u0435\u043A\u0442\u0440\u043E\u043D\u043D\u043E\u0439 \u043F\u043E\u0447\u0442\u044B)`);
    console.log(`To: ${email}`);
    console.log(`User: ${userName}`);
  }
}
async function sendPasswordResetEmail(email, token) {
  const resetUrl = `${process.env.CLIENT_URL || "https://blogpro.tech"}/reset-password/${token}`;
  try {
    const { emailService: emailService2 } = await Promise.resolve().then(() => (init_emailService(), emailService_exports));
    await emailService2.initialize();
    const emailSettings = await emailService2.getEmailSettings();
    const mailOptions = {
      from: emailSettings.smtpUser,
      to: email,
      subject: "\u{1F510} \u0421\u0431\u0440\u043E\u0441\u044C\u0442\u0435 \u0441\u0432\u043E\u0439 \u043F\u0430\u0440\u043E\u043B\u044C BlogPro",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>\u0421\u0431\u0440\u043E\u0441 \u043F\u0430\u0440\u043E\u043B\u044F</title>
        </head>
        <body style="margin: 0; padding: 0; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
          <table width="100%" cellpadding="0" cellspacing="0" style="min-height: 100vh;">
            <tr>
              <td align="center" style="padding: 40px 20px;">
                <table width="600" cellpadding="0" cellspacing="0" style="background: white; border-radius: 20px; box-shadow: 0 20px 40px rgba(0,0,0,0.1); overflow: hidden;">
                  <!-- Header -->
                  <tr>
                    <td style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px; text-align: center;">
                      <h1 style="color: white; margin: 0; font-size: 32px; font-weight: 700;">BlogPro</h1>
                      <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0; font-size: 16px;">Professional Blogging Platform</p>
                    </td>
                  </tr>
                  
                  <!-- Content -->
                  <tr>
                    <td style="padding: 50px 40px; text-align: center;">
                      <div style="font-size: 60px; margin-bottom: 20px;">\u{1F510}</div>
                      <h2 style="color: #333; margin: 0 0 20px 0; font-size: 28px; font-weight: 600;">Reset Your Password</h2>
                      <p style="color: #666; font-size: 18px; line-height: 1.6; margin: 0 0 30px 0;">We received a request to reset your password for your BlogPro account.</p>
                      <p style="color: #666; font-size: 16px; line-height: 1.6; margin: 0 0 40px 0;">Click the button below to create a new password:</p>
                      
                      <!-- CTA Button -->
                      <table cellpadding="0" cellspacing="0" style="margin: 0 auto;">
                        <tr>
                          <td style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 50px; box-shadow: 0 8px 20px rgba(102, 126, 234, 0.3);">
                            <a href="${resetUrl}" style="display: inline-block; padding: 16px 40px; color: white; text-decoration: none; font-weight: 600; font-size: 16px; border-radius: 50px; transition: all 0.3s ease;">\u{1F511} Reset Password</a>
                          </td>
                        </tr>
                      </table>
                      
                      <p style="color: #999; font-size: 14px; line-height: 1.5; margin: 40px 0 0 0;">If the button doesn't work, copy and paste this link:</p>
                      <p style="color: #667eea; font-size: 14px; word-break: break-all; margin: 10px 0;">${resetUrl}</p>
                      
                      <div style="background: #fff3cd; border: 1px solid #ffeaa7; border-radius: 8px; padding: 20px; margin: 30px 0; text-align: left;">
                        <p style="color: #856404; font-size: 14px; margin: 0; font-weight: 600;">\u26A0\uFE0F Security Notice:</p>
                        <p style="color: #856404; font-size: 14px; margin: 10px 0 0 0; line-height: 1.4;">If you didn't request this password reset, please ignore this email. Your password will remain unchanged.</p>
                      </div>
                    </td>
                  </tr>
                  
                  <!-- Footer -->
                  <tr>
                    <td style="background: #f8fafc; padding: 30px 40px; text-align: center; border-top: 1px solid #e2e8f0;">
                      <p style="color: #64748b; font-size: 14px; margin: 0 0 10px 0;">This password reset link will expire in 1 hour.</p>
                      <p style="color: #94a3b8; font-size: 12px; margin: 0;">\xA9 2024 BlogPro. All rights reserved.</p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `
    };
    if (!emailService2.transporter) {
      throw new Error("Email \u0442\u0440\u0430\u043D\u0441\u043F\u043E\u0440\u0442\u0435\u0440 \u043D\u0435 \u0438\u043D\u0438\u0446\u0438\u0430\u043B\u0438\u0437\u0438\u0440\u043E\u0432\u0430\u043D");
    }
    await emailService2.transporter.sendMail(mailOptions);
    console.log(`\u{1F510} Password reset email sent to: ${email}`);
  } catch (error) {
    console.error("Failed to send password reset email:", error);
    console.log(`
\u{1F510} Password Reset Required (Email service failed)`);
    console.log(`To: ${email}`);
    console.log(`Reset URL: ${resetUrl}`);
    console.log(`
Click the link above to reset your password.
`);
  }
}
async function sendVerificationEmail(email, token) {
  const verificationUrl = `${process.env.CLIENT_URL || "https://blogpro.tech"}/verify-email/${token}`;
  try {
    const { emailService: emailService2 } = await Promise.resolve().then(() => (init_emailService(), emailService_exports));
    await emailService2.initialize();
    const emailSettings = await emailService2.getEmailSettings();
    const mailOptions = {
      from: emailSettings.smtpUser,
      to: email,
      subject: "\u{1F389} \u0414\u043E\u0431\u0440\u043E \u043F\u043E\u0436\u0430\u043B\u043E\u0432\u0430\u0442\u044C \u0432 BlogPro \u2014 \u043F\u043E\u0434\u0442\u0432\u0435\u0440\u0434\u0438\u0442\u0435 \u0441\u0432\u043E\u0439 \u0430\u0434\u0440\u0435\u0441 \u044D\u043B\u0435\u043A\u0442\u0440\u043E\u043D\u043D\u043E\u0439 \u043F\u043E\u0447\u0442\u044B",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Email Verification</title>
        </head>
        <body style="margin: 0; padding: 0; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
          <table width="100%" cellpadding="0" cellspacing="0" style="min-height: 100vh;">
            <tr>
              <td align="center" style="padding: 40px 20px;">
                <table width="600" cellpadding="0" cellspacing="0" style="background: white; border-radius: 20px; box-shadow: 0 20px 40px rgba(0,0,0,0.1); overflow: hidden;">
                  <!-- Header -->
                  <tr>
                    <td style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px; text-align: center;">
                      <h1 style="color: white; margin: 0; font-size: 32px; font-weight: 700;">BlogPro</h1>
                      <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0; font-size: 16px;">Professional Blogging Platform</p>
                    </td>
                  </tr>
                  
                  <!-- Content -->
                  <tr>
                    <td style="padding: 50px 40px; text-align: center;">
                      <div style="font-size: 60px; margin-bottom: 20px;">\u{1F389}</div>
                      <h2 style="color: #333; margin: 0 0 20px 0; font-size: 28px; font-weight: 600;">Welcome to BlogPro!</h2>
                      <p style="color: #666; font-size: 18px; line-height: 1.6; margin: 0 0 30px 0;">Thank you for joining our community! We're excited to have you on board.</p>
                      <p style="color: #666; font-size: 16px; line-height: 1.6; margin: 0 0 40px 0;">To get started, please verify your email address by clicking the button below:</p>
                      
                      <!-- CTA Button -->
                      <table cellpadding="0" cellspacing="0" style="margin: 0 auto;">
                        <tr>
                          <td style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 50px; box-shadow: 0 8px 20px rgba(102, 126, 234, 0.3);">
                            <a href="${verificationUrl}" style="display: inline-block; padding: 16px 40px; color: white; text-decoration: none; font-weight: 600; font-size: 16px; border-radius: 50px; transition: all 0.3s ease;">\u2728 Verify Email Address</a>
                          </td>
                        </tr>
                      </table>
                      
                      <p style="color: #999; font-size: 14px; line-height: 1.5; margin: 40px 0 0 0;">If the button doesn't work, copy and paste this link:</p>
                      <p style="color: #667eea; font-size: 14px; word-break: break-all; margin: 10px 0;">${verificationUrl}</p>
                    </td>
                  </tr>
                  
                  <!-- Footer -->
                  <tr>
                    <td style="background: #f8fafc; padding: 30px 40px; text-align: center; border-top: 1px solid #e2e8f0;">
                      <p style="color: #64748b; font-size: 14px; margin: 0 0 10px 0;">This verification link will expire in 24 hours.</p>
                      <p style="color: #94a3b8; font-size: 12px; margin: 0;">\xA9 2024 BlogPro. All rights reserved.</p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `
    };
    if (!emailService2.transporter) {
      throw new Error("Email transporter not initialized");
    }
    await emailService2.transporter.sendMail(mailOptions);
    console.log(`\u{1F4E7} Verification email sent to: ${email}`);
  } catch (error) {
    console.error("Failed to send verification email:", error);
    console.log(`
\u{1F4E7} Email Verification Required (Email service failed)`);
    console.log(`To: ${email}`);
    console.log(`Verification URL: ${verificationUrl}`);
    console.log(`
Click the link above to verify your email address.
`);
  }
}
async function registerUser(userData) {
  const salt = await bcrypt2.genSalt(10);
  const hashedPassword = await bcrypt2.hash(userData.password, salt);
  const verificationToken = crypto.randomBytes(32).toString("hex");
  const result = await db.insert(users).values({
    id: crypto.randomUUID(),
    username: userData.username,
    email: userData.email,
    password: hashedPassword,
    firstName: userData.firstName,
    lastName: userData.lastName,
    role: userData.role || "user",
    verificationToken,
    emailVerified: false
    // Require email verification
  }).returning();
  await sendVerificationEmail(userData.email, verificationToken);
  return result[0];
}
async function verifyUser(token) {
  const result = await db.update(users).set({ emailVerified: true, verificationToken: null }).where(eq2(users.verificationToken, token)).returning();
  if (result.length === 0) {
    return null;
  }
  const user = result[0];
  const { password: _, ...userWithoutPassword } = user;
  return userWithoutPassword;
}
async function authenticateUser(username, password) {
  console.log("Authenticating user:", username);
  const result = await db.select().from(users).where(or(eq2(users.username, username), eq2(users.email, username)));
  console.log("Database query result:", result.length > 0 ? "User found" : "User not found");
  if (result.length === 0) {
    return null;
  }
  const user = result[0];
  console.log("User details:", { id: user.id, username: user.username, emailVerified: user.emailVerified, isBlocked: user.isBlocked });
  if (user.isScheduledForDeletion) {
    console.log("Authentication failed: user scheduled for deletion");
    throw new Error("This account is scheduled for deletion and cannot be accessed");
  }
  const passwordMatch = await bcrypt2.compare(password, user.password);
  console.log("Password match:", passwordMatch);
  if (!passwordMatch) {
    return null;
  }
  if (!user.emailVerified) {
    console.log("Authentication failed: email not verified");
    throw new Error("Please verify your email address before logging in");
  }
  console.log("Authentication successful");
  const { password: _, ...userWithoutPassword } = user;
  return userWithoutPassword;
}
async function initiatePasswordReset(email) {
  const resetToken = crypto.randomBytes(32).toString("hex");
  const resetExpires = new Date(Date.now() + 36e5);
  const result = await db.update(users).set({ resetPasswordToken: resetToken, resetPasswordExpires: resetExpires }).where(eq2(users.email, email)).returning();
  if (result.length > 0) {
    await sendPasswordResetEmail(email, resetToken);
  }
  return result.length > 0;
}
async function resetPassword(token, newPassword) {
  const salt = await bcrypt2.genSalt(10);
  const hashedPassword = await bcrypt2.hash(newPassword, salt);
  const result = await db.update(users).set({
    password: hashedPassword,
    resetPasswordToken: null,
    resetPasswordExpires: null
  }).where(eq2(users.resetPasswordToken, token)).returning();
  return result.length > 0;
}
async function updateUserRole(userId, role) {
  const result = await db.update(users).set({ role }).where(eq2(users.id, userId)).returning();
  if (result.length === 0) {
    return null;
  }
  const { password: _, ...userWithoutPassword } = result[0];
  return userWithoutPassword;
}
async function updateUserAvatar(userId, profileImageUrl) {
  try {
    console.log("Updating avatar for user:", userId);
    console.log("Avatar data:", profileImageUrl ? "URL provided" : "null (removing)");
    const currentUser = await db.select().from(users).where(eq2(users.id, userId)).limit(1);
    if (currentUser.length === 0) {
      console.log("No user found with ID:", userId);
      return null;
    }
    if (profileImageUrl === null && currentUser[0].profileImageUrl) {
      try {
        const currentUrl = currentUser[0].profileImageUrl;
        if (currentUrl.startsWith("/uploads/avatars/")) {
          const filename = path2.basename(currentUrl);
          const filePath = path2.join(process.cwd(), "public/uploads/avatars", filename);
          if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
            console.log("Deleted avatar file:", filename);
          }
        }
      } catch (deleteError) {
        console.error("Failed to delete avatar file:", deleteError);
      }
    }
    const result = await db.update(users).set({
      profileImageUrl,
      updatedAt: /* @__PURE__ */ new Date()
    }).where(eq2(users.id, userId)).returning();
    console.log("Avatar updated successfully");
    const { password: _, ...userWithoutPassword } = result[0];
    return userWithoutPassword;
  } catch (error) {
    console.error("Error in updateUserAvatar:", error);
    throw error;
  }
}
async function updateUserProfile(userId, data) {
  const updateData = {};
  if (data.username !== void 0) updateData.username = data.username;
  if (data.firstName !== void 0) updateData.firstName = data.firstName;
  if (data.lastName !== void 0) updateData.lastName = data.lastName;
  if (data.email !== void 0) updateData.email = data.email;
  if (data.emailNotifications !== void 0) updateData.emailNotifications = data.emailNotifications;
  if (data.marketingEmails !== void 0) updateData.marketingEmails = data.marketingEmails;
  updateData.updatedAt = /* @__PURE__ */ new Date();
  const result = await db.update(users).set(updateData).where(eq2(users.id, userId)).returning();
  if (result.length === 0) {
    return null;
  }
  const { password: _, ...userWithoutPassword } = result[0];
  return userWithoutPassword;
}
async function changeUserPassword(userId, currentPassword, newPassword) {
  const user = await db.select().from(users).where(eq2(users.id, userId)).limit(1);
  if (user.length === 0) {
    return false;
  }
  const passwordMatch = await bcrypt2.compare(currentPassword, user[0].password);
  if (!passwordMatch) {
    return false;
  }
  const salt = await bcrypt2.genSalt(10);
  const hashedPassword = await bcrypt2.hash(newPassword, salt);
  const result = await db.update(users).set({
    password: hashedPassword,
    updatedAt: /* @__PURE__ */ new Date()
  }).where(eq2(users.id, userId)).returning();
  return result.length > 0;
}
async function scheduleUserDeletion(userId, reason = "User requested deletion") {
  const deletionScheduledAt = /* @__PURE__ */ new Date();
  const result = await db.update(users).set({
    isScheduledForDeletion: true,
    deletionScheduledAt,
    deletionReason: reason,
    updatedAt: /* @__PURE__ */ new Date()
  }).where(eq2(users.id, userId)).returning();
  if (result.length > 0) {
    await sendAccountDeletionEmail(result[0].email, result[0].firstName || result[0].username || "User");
    const { terminateUserSessions: terminateUserSessions2 } = await Promise.resolve().then(() => (init_userService(), userService_exports));
    await terminateUserSessions2(userId);
  }
  return result.length > 0;
}
async function cancelUserDeletion(userId) {
  const result = await db.update(users).set({
    isScheduledForDeletion: false,
    deletionScheduledAt: null,
    deletionReason: null,
    updatedAt: /* @__PURE__ */ new Date()
  }).where(eq2(users.id, userId)).returning();
  return result.length > 0;
}
async function getUserDeletionStatus(userId) {
  const result = await db.select({
    isScheduledForDeletion: users.isScheduledForDeletion,
    deletionScheduledAt: users.deletionScheduledAt,
    deletionReason: users.deletionReason
  }).from(users).where(eq2(users.id, userId)).limit(1);
  if (result.length === 0) return null;
  const user = result[0];
  let hoursUntilDeletion = null;
  if (user.isScheduledForDeletion && user.deletionScheduledAt) {
    const deletionTime = new Date(user.deletionScheduledAt.getTime() + 24 * 60 * 60 * 1e3);
    const now = /* @__PURE__ */ new Date();
    hoursUntilDeletion = Math.max(0, Math.ceil((deletionTime.getTime() - now.getTime()) / (1e3 * 60 * 60)));
  }
  return {
    isScheduledForDeletion: user.isScheduledForDeletion || false,
    deletionScheduledAt: user.deletionScheduledAt,
    deletionReason: user.deletionReason,
    hoursUntilDeletion
  };
}
async function processAvatarImage(base64Data, userId) {
  try {
    console.log("Processing avatar for user:", userId);
    console.log("Base64 data length:", base64Data.length);
    const matches = base64Data.match(/^data:image\/([a-zA-Z0-9+]*);base64,(.+)$/);
    if (!matches) {
      console.error("Invalid base64 format");
      throw new Error("Invalid base64 image data");
    }
    const imageFormat = matches[1].toLowerCase();
    console.log("Image format detected:", imageFormat);
    const imageBuffer = Buffer.from(matches[2], "base64");
    console.log("Image buffer size:", imageBuffer.length);
    const supportedFormats = ["jpeg", "jpg", "png", "gif", "webp", "jfif", "pjpeg"];
    if (!supportedFormats.includes(imageFormat)) {
      throw new Error(`Unsupported image format: ${imageFormat}`);
    }
    const avatarsDir = path2.join(process.cwd(), "public/uploads/avatars");
    console.log("Avatars directory:", avatarsDir);
    if (!fs.existsSync(avatarsDir)) {
      console.log("Creating avatars directory");
      fs.mkdirSync(avatarsDir, { recursive: true });
    }
    const filename = `${userId}_${Date.now()}.webp`;
    const filePath = path2.join(avatarsDir, filename);
    console.log("Output file path:", filePath);
    console.log("Starting Sharp processing");
    const sharpInstance = sharp(imageBuffer);
    if (imageFormat === "gif") {
      await sharpInstance.resize(200, 200, { fit: "cover" }).webp({ quality: 85 }).toFile(filePath);
    } else {
      await sharpInstance.resize(200, 200, { fit: "cover" }).webp({ quality: 85 }).toFile(filePath);
    }
    console.log("Sharp processing completed");
    const url = `/uploads/avatars/${filename}`;
    console.log("Returning URL:", url);
    return url;
  } catch (error) {
    console.error("Error processing avatar image:", error);
    console.error("Error stack:", error instanceof Error ? error.stack : "No stack trace");
    throw new Error(`Failed to process avatar image: ${error instanceof Error ? error.message : "Unknown error"}`);
  }
}

// shared/types/deletion.ts
import { z as z2 } from "zod";
var scheduleUserDeletionSchema = z2.object({
  reason: z2.string().optional().default("User requested deletion")
});
var userDeletionStatusSchema = z2.object({
  isScheduledForDeletion: z2.boolean(),
  deletionScheduledAt: z2.date().nullable(),
  deletionReason: z2.string().nullable(),
  hoursUntilDeletion: z2.number().nullable()
});

// server/api/auth/index.ts
var JWT_SECRET2 = process.env.JWT_SECRET || "your-secret-key";
var JWT_EXPIRES_IN = "7d";
var router3 = Router3();
router3.post(
  "/register",
  authRateLimiter,
  asyncHandler(async (req, res) => {
    const schema = z3.object({
      username: z3.string().min(3),
      email: z3.string().email(),
      password: z3.string().min(8),
      firstName: z3.string().optional(),
      lastName: z3.string().optional()
    });
    const validatedData = schema.parse(req.body);
    await registerUser(validatedData);
    res.status(201).json(createSuccessResponse(
      null,
      "User registered. Please check your email to verify your account."
    ));
  })
);
router3.post(
  "/login",
  authRateLimiter,
  asyncHandler(async (req, res) => {
    console.log("Login request body:", req.body);
    const schema = z3.object({
      username: z3.string(),
      password: z3.string()
    });
    try {
      const validatedData = schema.parse(req.body);
      console.log("Validated data:", { username: validatedData.username, password: "[HIDDEN]" });
      const user = await authenticateUser(
        validatedData.username,
        validatedData.password
      );
      if (!user) {
        console.log("Authentication failed: user not found or invalid password");
        return res.status(401).json({ message: "Invalid credentials" });
      }
      if (user.isBlocked) {
        console.log("Authentication failed: user is blocked");
        return res.status(403).json({ message: "Your account has been blocked. Please contact support." });
      }
      const token = jwt2.sign(
        { userId: user.id, role: user.role },
        JWT_SECRET2,
        { expiresIn: JWT_EXPIRES_IN }
      );
      console.log("Login successful for user:", user.username);
      res.json(createSuccessResponse({ user, token }, "Login successful"));
    } catch (error) {
      console.error("Login error:", error);
      if (error instanceof z3.ZodError) {
        return res.status(400).json({ message: "Invalid request data", errors: error.errors });
      }
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
      return res.status(500).json({ message: "Login failed" });
    }
  })
);
router3.post(
  "/logout",
  asyncHandler(async (_req, res) => {
    res.json(createSuccessResponse(null, "Logged out successfully"));
  })
);
router3.get(
  "/verify/:token",
  asyncHandler(async (req, res) => {
    const user = await verifyUser(req.params.token);
    if (!user) {
      return res.status(400).json({ message: "Invalid or expired verification token" });
    }
    const token = jwt2.sign(
      { userId: user.id, role: user.role },
      JWT_SECRET2,
      { expiresIn: JWT_EXPIRES_IN }
    );
    res.json({ message: "Email verified successfully", user, token });
  })
);
router3.post(
  "/forgot-password",
  asyncHandler(async (req, res) => {
    const schema = z3.object({
      email: z3.string().email()
    });
    const validatedData = schema.parse(req.body);
    await initiatePasswordReset(
      validatedData.email
    );
    res.json({
      message: "If your email exists in our system, you will receive a password reset link"
    });
  })
);
router3.post(
  "/reset-password/:token",
  asyncHandler(async (req, res) => {
    const schema = z3.object({
      password: z3.string().min(8)
    });
    const validatedData = schema.parse(req.body);
    const success = await resetPassword(
      req.params.token,
      validatedData.password
    );
    if (!success) {
      return res.status(400).json({ message: "Invalid or expired reset token" });
    }
    res.json({ message: "Password reset successfully" });
  })
);
router3.get(
  "/validate-token",
  asyncHandler(async (req, res) => {
    const authHeader = req.headers.authorization;
    const token = authHeader?.replace("Bearer ", "");
    if (!token) {
      return res.status(401).json({ valid: false, message: "No token provided" });
    }
    try {
      const decoded = jwt2.verify(token, JWT_SECRET2);
      res.json({ valid: true, userId: decoded.userId, role: decoded.role });
    } catch (error) {
      res.status(401).json({ valid: false, message: "Invalid token" });
    }
  })
);
router3.get(
  "/me",
  asyncHandler(async (req, res) => {
    const token = req.headers.authorization?.replace("Bearer ", "");
    if (!token) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    try {
      const decoded = jwt2.verify(token, JWT_SECRET2);
      const { storage: storage2 } = await Promise.resolve().then(() => (init_storage(), storage_exports));
      const freshUser = await storage2.getUserById(decoded.userId);
      if (!freshUser) {
        return res.status(401).json({ message: "User not found" });
      }
      res.json({ user: freshUser });
    } catch (error) {
      return res.status(401).json({ message: "Invalid token" });
    }
  })
);
router3.put(
  "/avatar",
  requireAuth,
  asyncHandler(async (req, res) => {
    if (!req.user) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    try {
      const schema = z3.object({
        profileImageUrl: z3.string().nullable()
      });
      const validatedData = schema.parse(req.body);
      let processedImageUrl = validatedData.profileImageUrl;
      if (validatedData.profileImageUrl && validatedData.profileImageUrl.startsWith("data:image/")) {
        try {
          processedImageUrl = await processAvatarImage(
            validatedData.profileImageUrl,
            req.user.id
          );
          console.log("Avatar processed successfully:", processedImageUrl);
        } catch (error) {
          console.error("Avatar processing failed:", error);
          const errorMessage = error instanceof Error ? error.message : "Failed to process avatar image";
          return res.status(400).json({ message: errorMessage });
        }
      }
      const user = await updateUserAvatar(
        req.user.id,
        processedImageUrl
      );
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      const { clearApiCache: clearApiCache2 } = await Promise.resolve().then(() => (init_apiCache(), apiCache_exports));
      await clearApiCache2("*users*");
      await clearApiCache2("*auth*");
      await clearApiCache2(`GET:/api/users/${user.id}`);
      await clearApiCache2("GET:/api/auth/me");
      console.log("Broadcasting avatar update via WebSocket for user:", user.id);
      console.log("Avatar URL being broadcast:", user.profileImageUrl);
      const { broadcastUpdate: broadcastUpdate2 } = await Promise.resolve().then(() => (init_websocket(), websocket_exports));
      broadcastUpdate2(global.wss, "user_updated", user);
      res.json({ user });
    } catch (error) {
      console.error("Avatar update error:", error);
      const errorMessage = error instanceof Error ? error.message : "Failed to update avatar";
      return res.status(500).json({ message: errorMessage });
    }
  })
);
router3.put(
  "/profile",
  requireAuth,
  asyncHandler(async (req, res) => {
    if (!req.user) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    const schema = z3.object({
      username: z3.string().optional(),
      firstName: z3.string().optional(),
      lastName: z3.string().optional(),
      email: z3.string().email().optional(),
      emailNotifications: z3.boolean().optional(),
      marketingEmails: z3.boolean().optional()
    });
    const validatedData = schema.parse(req.body);
    const user = await updateUserProfile(
      req.user.id,
      validatedData
    );
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const { clearApiCache: clearApiCache2 } = await Promise.resolve().then(() => (init_apiCache(), apiCache_exports));
    await clearApiCache2("*users*");
    await clearApiCache2("*auth*");
    await clearApiCache2(`GET:/api/users/${user.id}`);
    await clearApiCache2("GET:/api/auth/me");
    console.log("Broadcasting profile update via WebSocket for user:", user.id);
    const { broadcastUpdate: broadcastUpdate2 } = await Promise.resolve().then(() => (init_websocket(), websocket_exports));
    broadcastUpdate2(global.wss, "user_updated", user);
    res.json({ user });
  })
);
router3.put(
  "/password",
  requireAuth,
  asyncHandler(async (req, res) => {
    if (!req.user) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    const schema = z3.object({
      currentPassword: z3.string(),
      newPassword: z3.string().min(8)
    });
    const validatedData = schema.parse(req.body);
    const success = await changeUserPassword(
      req.user.id,
      validatedData.currentPassword,
      validatedData.newPassword
    );
    if (!success) {
      return res.status(400).json({ message: "Current password is incorrect" });
    }
    res.json({ message: "Password updated successfully" });
  })
);
router3.post(
  "/schedule-deletion",
  requireAuth,
  asyncHandler(async (req, res) => {
    if (!req.user) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    const validatedData = scheduleUserDeletionSchema.parse(req.body);
    const userId = req.user.id;
    const success = await scheduleUserDeletion(
      userId,
      validatedData.reason
    );
    if (!success) {
      return res.status(500).json({ message: "Failed to schedule account deletion" });
    }
    const { storage: storage2 } = await Promise.resolve().then(() => (init_storage(), storage_exports));
    const updatedUser = await storage2.getUserById(userId);
    const { broadcastUpdate: broadcastUpdate2 } = await Promise.resolve().then(() => (init_websocket(), websocket_exports));
    if (updatedUser) {
      broadcastUpdate2(global.wss, "user_updated", updatedUser);
    }
    broadcastUpdate2(global.wss, "user_deletion_scheduled", {
      userId,
      deletionScheduledAt: /* @__PURE__ */ new Date(),
      deletionReason: validatedData.reason
    });
    res.json({ message: "Account scheduled for deletion in 24 hours" });
  })
);
router3.get(
  "/deletion-status",
  requireAuth,
  asyncHandler(async (req, res) => {
    if (!req.user) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    const userId = req.user.id;
    const status = await getUserDeletionStatus(userId);
    if (!status) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(status);
  })
);
router3.post(
  "/users/:userId/cancel-deletion",
  requireAdmin,
  asyncHandler(async (req, res) => {
    const success = await cancelUserDeletion(req.params.userId);
    if (!success) {
      return res.status(404).json({ message: "User not found" });
    }
    const { storage: storage2 } = await Promise.resolve().then(() => (init_storage(), storage_exports));
    const updatedUser = await storage2.getUserById(req.params.userId);
    const { broadcastUpdate: broadcastUpdate2 } = await Promise.resolve().then(() => (init_websocket(), websocket_exports));
    if (updatedUser) {
      broadcastUpdate2(global.wss, "user_updated", updatedUser);
    }
    broadcastUpdate2(global.wss, "user_deletion_cancelled", {
      userId: req.params.userId
    });
    res.json({ message: "Account deletion cancelled successfully" });
  })
);
router3.put(
  "/users/:userId/role",
  requireAdmin,
  asyncHandler(async (req, res) => {
    const schema = z3.object({
      role: z3.enum(["admin", "editor", "user"])
    });
    const validatedData = schema.parse(req.body);
    const user = await updateUserRole(
      req.params.userId,
      validatedData.role
    );
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ user });
  })
);
router3.post(
  "/users/:userId/verify-email",
  requireAdmin,
  asyncHandler(async (req, res) => {
    const { storage: storage2 } = await Promise.resolve().then(() => (init_storage(), storage_exports));
    const user = await storage2.verifyUserEmail(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const { broadcastUpdate: broadcastUpdate2 } = await Promise.resolve().then(() => (init_websocket(), websocket_exports));
    broadcastUpdate2(global.wss, "user_updated", user);
    res.json({ user, message: "Email verified successfully" });
  })
);
var auth_default = router3;

// server/api/blog/index.ts
init_storage();
init_schema();
import { Router as Router4 } from "express";
import { createInsertSchema } from "drizzle-zod";
import { z as z4 } from "zod";
init_websocket();
init_apiCache();

// server/middleware/advancedCache.ts
init_redis();
var memoryCache = /* @__PURE__ */ new Map();
memoryCache.clear();
console.log("\u{1F9F9} CACHE: Memory cache cleared for comments");
var advancedCache = (options2) => {
  return async (req, res, next) => {
    const key = options2.keyGenerator ? options2.keyGenerator(req) : `${req.method}:${req.originalUrl}`;
    if (options2.condition && !options2.condition(req, res)) {
      return next();
    }
    try {
      const redisClient2 = await getRedisClient();
      if (redisClient2) {
        const cached = await redisClient2.get(key);
        if (cached) {
          const parsedData = JSON.parse(cached);
          logger.debug("Cache hit (Redis)", { key });
          return res.json(parsedData);
        }
      }
      const memoryCached = memoryCache.get(key);
      if (memoryCached && memoryCached.expires > Date.now()) {
        logger.debug("Cache hit (Memory)", { key });
        return res.json(memoryCached.data);
      }
      const originalSend = res.json;
      res.json = function(data) {
        getRedisClient().then((redisClient3) => {
          if (redisClient3) {
            redisClient3.setEx(key, options2.ttl, JSON.stringify(data));
          }
        });
        memoryCache.set(key, {
          data,
          expires: Date.now() + options2.ttl * 1e3,
          tags: options2.tags || []
        });
        logger.debug("Cache set", { key, ttl: options2.ttl });
        return originalSend.call(this, data);
      };
      next();
    } catch (error) {
      logger.error("Cache error", { error: error instanceof Error ? error.message : String(error), key });
      next();
    }
  };
};
var invalidateCache = async (pattern) => {
  try {
    console.log(`\u{1F9F9} CACHE: Invalidating cache pattern: ${pattern}`);
    const redisClient2 = await getRedisClient();
    if (redisClient2) {
      const keys = await redisClient2.keys(pattern);
      if (keys.length > 0) {
        await redisClient2.del(keys);
        logger.info("Cache invalidated (Redis)", { pattern, count: keys.length });
        console.log(`\u{1F9F9} CACHE: Cleared ${keys.length} Redis keys for pattern: ${pattern}`);
      }
    }
    let cleared = 0;
    for (const [key] of memoryCache) {
      if (key.includes(pattern.replace("*", ""))) {
        memoryCache.delete(key);
        cleared++;
      }
    }
    console.log(`\u{1F9F9} CACHE: Cleared ${cleared} memory cache entries for pattern: ${pattern}`);
  } catch (error) {
    logger.error("Cache invalidation error", { error: error instanceof Error ? error.message : String(error), pattern });
  }
};
invalidateCache("*comments*");
invalidateCache("DELETE:*");
invalidateCache("POST:*");

// server/api/blog/index.ts
init_blogService();
init_db();
var insertBlogPostSchema = createInsertSchema(blogPosts);
var transformFromDbFormat = (data) => {
  if (!data) return data;
  return {
    id: data.id,
    title: data.title,
    description: data.description,
    content: data.content,
    categoryId: data.categoryId || data.category_id,
    imageUrl: data.imageUrl || data.image_url,
    thumbnailUrl: data.thumbnailUrl || data.thumbnail_url,
    projectUrl: data.projectUrl || data.project_url,
    technologies: data.technologies || [],
    tags: data.tags || [],
    slug: data.slug,
    status: data.status,
    createdAt: data.createdAt || data.created_at,
    updatedAt: data.updatedAt || data.updated_at
  };
};
var router4 = Router4();
router4.get("/health", asyncHandler(async (_, res) => {
  try {
    console.log("\u{1F3E5} Health check: Testing database connection...");
    const testQuery = await storage.getBlogPosts();
    console.log(`\u{1F3E5} Health check: Database query successful, found ${testQuery.length} posts`);
    res.json({
      success: true,
      message: "Database connection healthy",
      postsCount: testQuery.length,
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    });
  } catch (error) {
    console.error("\u{1F3E5} Health check: Database connection failed:", error);
    res.status(500).json({
      success: false,
      message: "Database connection failed",
      error: error instanceof Error ? error.message : "Unknown error",
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    });
  }
}));
router4.get(
  "/search",
  setCacheHeaders({ public: true, maxAge: 300, etag: true }),
  advancedCache({
    ttl: 300,
    tags: ["blog", "search"],
    keyGenerator: (req) => `blog:search:${req.query.q}:${req.query.lang || "en"}:${req.query.limit || 10}`
  }),
  asyncHandler(async (req, res) => {
    try {
      const { q: query, lang = "en", limit = 10 } = req.query;
      if (!query || typeof query !== "string") {
        throw new BadRequestError("Search query is required");
      }
      const { searchService: searchService2 } = await Promise.resolve().then(() => (init_searchService(), searchService_exports));
      const results = await searchService2.searchBlog(
        query,
        lang,
        parseInt(limit)
      );
      res.json({
        results,
        total: results.length,
        query,
        language: lang
      });
    } catch (error) {
      console.error("Blog search error:", error);
      throw error;
    }
  })
);
router4.get("/all", asyncHandler(async (_, res) => {
  try {
    console.log("\u{1F4DA} /all endpoint: Starting to fetch blog posts...");
    const posts = await getBlogPosts();
    console.log(`\u{1F4DA} /all endpoint: Retrieved ${posts.length} posts directly`);
    const transformedPosts = await Promise.all(
      posts.map(async (post) => {
        const postAny = post;
        const countResult = await pool.query("SELECT COUNT(*) FROM comments WHERE post_id = $1", [post.id]);
        const commentCount = parseInt(countResult.rows[0].count);
        return {
          id: post.id,
          title: post.title || "",
          description: post.description || "",
          content: post.content || "",
          categoryId: post.categoryId || postAny.category_id,
          imageUrl: post.imageUrl || postAny.image_url,
          thumbnailUrl: post.thumbnailUrl || postAny.thumbnail_url,
          projectUrl: post.projectUrl || postAny.project_url,
          technologies: post.technologies || [],
          tags: post.tags || [],
          slug: post.slug,
          status: post.status || "draft",
          createdAt: postAny.created_at || post.createdAt,
          updatedAt: postAny.updated_at || post.updatedAt,
          comment_count: commentCount
        };
      })
    );
    console.log(`\u{1F4DA} /all endpoint: Transformed ${transformedPosts.length} posts`);
    if (transformedPosts.length > 0) {
      console.log("\u{1F4DA} Sample transformed post dates:", {
        id: transformedPosts[0].id,
        createdAt: transformedPosts[0].createdAt,
        updatedAt: transformedPosts[0].updatedAt,
        createdAtType: typeof transformedPosts[0].createdAt,
        updatedAtType: typeof transformedPosts[0].updatedAt
      });
    }
    const response = {
      success: true,
      data: transformedPosts,
      message: "Blog posts retrieved successfully",
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    };
    console.log("\u{1F4DA} /all endpoint: Sending response...");
    res.json(response);
  } catch (error) {
    console.error("\u274C Error in /all endpoint:", error);
    console.error("\u274C Error details:", {
      name: error instanceof Error ? error.name : "Unknown",
      message: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack?.substring(0, 500) : "No stack"
    });
    res.status(500).json({
      success: false,
      message: "Failed to retrieve blog posts",
      error: error instanceof Error ? error.message : "Unknown error",
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    });
  }
}));
router4.get(
  "/",
  setCacheHeaders({ public: true, maxAge: 300, etag: true }),
  advancedCache({
    ttl: 300,
    tags: ["blog", "posts"],
    keyGenerator: (req) => `blog:list:${req.query.page || 1}:${req.query.limit || 10}`
  }),
  asyncHandler(async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const { data, total } = await storage.getBlogPostsPaginated(page, limit);
    res.json(createPaginatedResponse(data.map(transformFromDbFormat), page, limit, total));
  })
);
router4.get(
  "/:id",
  setCacheHeaders({ public: true, maxAge: 600, etag: true }),
  advancedCache({
    ttl: 600,
    tags: ["blog", "post"],
    keyGenerator: (req) => `blog:post:${req.params.id}`
  }),
  asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      throw new BadRequestError("Invalid blog post ID");
    }
    const post = await storage.getBlogPost(id);
    if (!post) {
      throw new NotFoundError("Blog post not found");
    }
    res.json(createSuccessResponse(transformFromDbFormat(post), "Blog post retrieved successfully"));
  })
);
router4.post("/", asyncHandler(async (req, res) => {
  try {
    console.log("\u{1F4DD} Creating blog post with data:", req.body);
    const validatedData = insertBlogPostSchema.parse(req.body);
    console.log("\u2705 Validation passed:", validatedData);
    const post = await storage.createBlogPost(validatedData);
    await clearApiCache("GET:/api/blog");
    await clearApiCache("GET:/api/blog/all");
    await invalidateCache("blog:*");
    broadcastUpdate(null, "blog_created", transformFromDbFormat(post));
    res.status(201).json(createSuccessResponse(transformFromDbFormat(post), "Blog post created successfully"));
  } catch (error) {
    console.error("\u274C Blog post creation error:", error);
    if (error instanceof z4.ZodError) {
      console.error("Validation errors:", error.errors);
      throw new ValidationError("Invalid blog post data", error.errors);
    }
    throw error;
  }
}));
router4.put("/:id", asyncHandler(async (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    throw new BadRequestError("Invalid blog post ID");
  }
  try {
    const validatedData = insertBlogPostSchema.partial().parse(req.body);
    const post = await storage.updateBlogPost(id, validatedData);
    if (!post) {
      throw new NotFoundError("Blog post not found");
    }
    await clearApiCache("GET:/api/blog");
    await clearApiCache("GET:/api/blog/all");
    await clearApiCache(`GET:/api/blog/${id}`);
    await invalidateCache("blog:*");
    broadcastUpdate(null, "blog_updated", transformFromDbFormat(post));
    res.json(createSuccessResponse(transformFromDbFormat(post), "Blog post updated successfully"));
  } catch (error) {
    if (error instanceof z4.ZodError) {
      throw new ValidationError("Invalid blog post data", error.errors);
    }
    throw error;
  }
}));
router4.delete("/:id", asyncHandler(async (req, res) => {
  const id = parseInt(req.params.id);
  console.log(`\u{1F50D} DELETE request for blog post ID: ${id}`);
  console.log(`\u{1F50D} Request params:`, req.params);
  console.log(`\u{1F50D} Parsed ID type:`, typeof id, "value:", id);
  if (isNaN(id)) {
    console.log(`\u274C Invalid ID - not a number`);
    throw new BadRequestError("Invalid blog post ID");
  }
  const existingPost = await storage.getBlogPost(id);
  console.log(`\u{1F4CB} Post exists before delete: ${existingPost ? "YES" : "NO"}`);
  if (existingPost) {
    console.log(`\u{1F4CB} Existing post details:`, {
      id: existingPost.id,
      title: existingPost.title,
      status: existingPost.status
    });
  }
  const deleted = await storage.deleteBlogPost(id);
  console.log(`\u{1F5D1}\uFE0F Delete operation result: ${deleted}`);
  if (!deleted) {
    console.log(`\u26A0\uFE0F Post not found, but considering delete successful`);
  }
  console.log(`\u{1F9F9} Clearing caches...`);
  await clearApiCache("GET:/api/blog");
  await clearApiCache("GET:/api/blog/all");
  await clearApiCache(`GET:/api/blog/${id}`);
  await invalidateCache("blog:*");
  console.log(`\u{1F4E1} Broadcasting delete event...`);
  broadcastUpdate(null, "blog_deleted", { id });
  console.log(`\u2705 Blog post ${id} deleted successfully`);
  res.json(createSuccessResponse({ id }, "Blog post deleted successfully"));
}));
var blog_default = router4;

// server/api/contact/index.ts
init_db();
init_schema();
import { Router as Router5 } from "express";
import { createInsertSchema as createInsertSchema2 } from "drizzle-zod";
import { z as z5 } from "zod";
import { desc as desc2 } from "drizzle-orm";

// server/api/contact/send-message.ts
init_db();
init_schema();
async function sendContactMessage(req, res) {
  try {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({
        error: "Missing required fields",
        message: "Name, email, and message are required"
      });
    }
    const [newContact] = await db.insert(contacts).values({
      firstName: name.split(" ")[0] || name,
      lastName: name.split(" ").slice(1).join(" ") || "",
      email,
      message: `Subject: ${subject || "Contact Form Message"}

${message}`
    }).returning();
    console.log("New contact message:", {
      id: newContact.id,
      name,
      email,
      subject
    });
    res.status(201).json({
      message: "Message sent successfully",
      id: newContact.id
    });
  } catch (error) {
    console.error("Contact message error:", error);
    res.status(500).json({
      error: "Failed to send message",
      message: "Please try again later"
    });
  }
}

// server/api/contact/index.ts
init_emailService();
var insertContactSchema = createInsertSchema2(contacts);
var router5 = Router5();
router5.post("/", asyncHandler(async (req, res) => {
  try {
    const validatedData = insertContactSchema.parse(req.body);
    await db.insert(contacts).values(validatedData).returning();
    try {
      await emailService.sendContactMessage({
        firstName: validatedData.firstName,
        lastName: validatedData.lastName,
        email: validatedData.email,
        message: validatedData.message
      });
    } catch (emailError) {
      console.error("Failed to send email notification:", emailError);
    }
    res.status(201).json({
      message: "Thank you for your message! I'll get back to you soon."
    });
  } catch (error) {
    if (error instanceof z5.ZodError) {
      return res.status(400).json({ message: "Invalid contact data", errors: error.errors });
    }
    throw error;
  }
}));
router5.post("/send", requireAdmin, sendContactMessage);
router5.get("/", requireAdmin, asyncHandler(async (_req, res) => {
  const contactsList = await db.select().from(contacts).orderBy(desc2(contacts.createdAt));
  res.json(contactsList);
}));
var contact_default = router5;

// server/api/users/index.ts
init_storage();
import { Router as Router6 } from "express";
init_apiCache();
init_websocket();
init_db();
init_schema();
import { eq as eq7, ilike as ilike2, or as or3 } from "drizzle-orm";
var getMailingListUsers = async (mailingListId) => {
  try {
    const result = await db.execute(`
      SELECT user_id FROM mailing_list_recipients 
      WHERE mailing_list_id = ${mailingListId}
    `);
    return result.rows.map((row) => row.user_id);
  } catch (error) {
    console.log("Could not fetch mailing list recipients:", error);
    return [];
  }
};
var router6 = Router6();
router6.get("/", requireAdmin, asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const { data, total, totalPages } = await storage.getUsersPaginated(page, limit);
  const sanitizedUsers = data.map((user) => {
    const { password, resetPasswordToken, verificationToken, ...safeUser } = user;
    return safeUser;
  });
  res.set({
    "Cache-Control": "no-cache, no-store, must-revalidate",
    "Pragma": "no-cache",
    "Expires": "0"
  });
  res.json({ data: sanitizedUsers, total, totalPages });
}));
router6.get("/for-mailing", requireAdmin, asyncHandler(async (req, res) => {
  res.set({
    "Cache-Control": "no-cache, no-store, must-revalidate",
    "Pragma": "no-cache",
    "Expires": "0"
  });
  const { search, mailingListId } = req.query;
  if (mailingListId && mailingListId !== "all") {
    const subscribedUserIds = await getMailingListUsers(parseInt(mailingListId));
    if (subscribedUserIds.length === 0) {
      res.json([]);
      return;
    }
    const subscribedUsers = await db.select({
      id: users.id,
      username: users.username,
      firstName: users.firstName,
      lastName: users.lastName,
      email: users.email,
      role: users.role,
      emailVerified: users.emailVerified,
      marketingEmails: users.marketingEmails
    }).from(users).where(or3(...subscribedUserIds.map((userId) => eq7(users.id, userId))));
    res.json(subscribedUsers);
    return;
  }
  let query = db.select({
    id: users.id,
    username: users.username,
    firstName: users.firstName,
    lastName: users.lastName,
    email: users.email,
    role: users.role,
    emailVerified: users.emailVerified,
    marketingEmails: users.marketingEmails
  }).from(users);
  if (search) {
    query = query.where(
      or3(
        ilike2(users.firstName, `%${search}%`),
        ilike2(users.lastName, `%${search}%`),
        ilike2(users.email, `%${search}%`)
      )
    );
  }
  const userList = await query;
  res.json(userList);
}));
router6.get("/:id", requireAdmin, asyncHandler(async (req, res) => {
  res.set({
    "Cache-Control": "no-cache, no-store, must-revalidate",
    "Pragma": "no-cache",
    "Expires": "0"
  });
  const id = req.params.id;
  const user = await storage.getUserById(id);
  if (!user) {
    throw new NotFoundError("User not found");
  }
  const { password, resetPasswordToken, verificationToken, ...safeUser } = user;
  res.json(safeUser);
}));
router6.post("/", requireAdmin, asyncHandler(async (req, res) => {
  const { email, password, firstName, lastName, role, username, profileImageUrl } = req.body;
  if (!email || !password) {
    throw new BadRequestError("Email and password are required");
  }
  try {
    const user = await storage.createUser({
      email,
      password,
      firstName,
      lastName,
      role: role || "user",
      username,
      profileImageUrl
    });
    await clearApiCache("GET:/api/users");
    const sanitizedUser = {
      ...user,
      profileImageUrl: user.profileImageUrl?.startsWith("data:") ? "[base64 image data]" : user.profileImageUrl
    };
    broadcastUpdate(global.wss, "user_created", sanitizedUser);
    res.status(201).json(user);
  } catch (error) {
    if (error instanceof Error && error.message.includes("duplicate key")) {
      throw new BadRequestError("User with this email already exists");
    }
    throw error;
  }
}));
router6.put("/:id", requireAdmin, asyncHandler(async (req, res) => {
  const id = req.params.id;
  const updateData = req.body;
  try {
    const user = await storage.updateUser(id, updateData);
    if (!user) {
      throw new NotFoundError("User not found");
    }
    if (req.session.user && req.session.user.id === id) {
      req.session.user = user;
    }
    await clearApiCache("GET:/api/users*");
    await clearApiCache(`GET:/api/users/${id}`);
    await clearApiCache("GET:/api/auth/me");
    await clearApiCache("*auth*");
    await clearApiCache("*users*");
    broadcastUpdate(global.wss, "user_updated", user);
    res.json(user);
  } catch (error) {
    console.error("Users API error:", error);
    throw error;
  }
}));
router6.delete("/:id", requireAdmin, asyncHandler(async (req, res) => {
  const id = req.params.id;
  const deleted = await storage.deleteUser(id);
  if (!deleted) {
    throw new NotFoundError("User not found");
  }
  await clearApiCache("GET:/api/users");
  await clearApiCache(`GET:/api/users/${id}`);
  broadcastUpdate(global.wss, "user_deleted", { userId: id });
  res.json({ message: "User deleted successfully" });
}));
var users_default2 = router6;

// server/api/media/index.ts
init_storage();
import { Router as Router12 } from "express";

// shared/utils/media.ts
var getFileCategory = (mimeType) => {
  if (mimeType.startsWith("image/")) return "images";
  if (mimeType.startsWith("video/")) return "videos";
  if (mimeType.startsWith("audio/")) return "audio";
  return "documents";
};
var getUploadPath = (fileType, source = "general") => {
  const baseDir = "uploads";
  if (source === "editor") {
    return `${baseDir}/editor/images`;
  }
  const category = getFileCategory(fileType);
  return `${baseDir}/${category}`;
};
var isSupportedFileType = (mimeType) => {
  const supportedTypes = [
    // Images
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/gif",
    "image/webp",
    "image/svg+xml",
    // Videos
    "video/mp4",
    "video/webm",
    "video/ogg",
    "video/avi",
    "video/mov",
    // Audio
    "audio/mp3",
    "audio/wav",
    "audio/ogg",
    "audio/aac",
    "audio/flac",
    // Documents
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "application/vnd.ms-powerpoint",
    "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    "text/plain",
    "text/csv"
  ];
  return supportedTypes.includes(mimeType);
};

// server/api/media/index.ts
import multer from "multer";
import path8 from "path";
import fs7 from "fs";
import { v4 as uuidv42 } from "uuid";
import sharp2 from "sharp";

// server/api/media/cleanup-endpoint.ts
import { Router as Router7 } from "express";

// server/api/media/cleanup.ts
init_db();
init_schema();
import path3 from "path";
import fs2 from "fs";
import { eq as eq8 } from "drizzle-orm";
async function cleanupMissingMediaFiles() {
  try {
    console.log("Starting media files cleanup...");
    const allFiles = await db.select().from(mediaFiles);
    let removedCount = 0;
    for (const file of allFiles) {
      const filePath = path3.join(process.cwd(), "public", file.url.replace(/^\//, ""));
      const fileExists = fs2.existsSync(filePath);
      if (!fileExists) {
        console.log(`Removing missing file from database: ${file.filename} (ID: ${file.id})`);
        await db.delete(mediaFiles).where(eq8(mediaFiles.id, file.id));
        removedCount++;
      }
    }
    console.log(`Media files cleanup completed. Removed ${removedCount} entries for missing files.`);
    return removedCount;
  } catch (error) {
    console.error("Error cleaning up media files:", error);
    throw error;
  }
}

// server/api/media/cleanup-endpoint.ts
var router7 = Router7();
router7.post("/cleanup", asyncHandler(async (_, res) => {
  const removedCount = await cleanupMissingMediaFiles();
  res.json({
    success: true,
    message: `Successfully cleaned up media files. Removed ${removedCount} entries for missing files.`
  });
}));
var cleanup_endpoint_default = router7;

// server/api/media/cleanup-originals.ts
import { Router as Router8 } from "express";
var router8 = Router8();
router8.post("/cleanup-originals", asyncHandler(async (_req, res) => {
  const { cleanupOriginalFiles: cleanupOriginalFiles2 } = await Promise.resolve().then(() => (init_mediaCleanup(), mediaCleanup_exports));
  try {
    const result = await cleanupOriginalFiles2();
    res.json({
      message: `Cleanup completed. Deleted ${result.deleted.length} files.`,
      deleted: result.deleted,
      errors: result.errors
    });
  } catch (error) {
    console.error("Error during cleanup:", error);
    res.status(500).json({ error: "Failed to cleanup files" });
  }
}));
var cleanup_originals_default = router8;

// server/api/media/cleanup-all-originals.ts
import { Router as Router9 } from "express";
import path5 from "path";
import fs4 from "fs";
var router9 = Router9();
function deleteNonWebPImages(dirPath) {
  const imageExtensions = [".jpg", ".jpeg", ".png", ".gif", ".bmp", ".tiff", ".jfif"];
  const deletedFiles = [];
  if (!fs4.existsSync(dirPath)) {
    return deletedFiles;
  }
  const files = fs4.readdirSync(dirPath);
  for (const file of files) {
    const filePath = path5.join(dirPath, file);
    const stat = fs4.statSync(filePath);
    if (stat.isDirectory()) {
      continue;
    }
    const fileExt = path5.extname(file).toLowerCase();
    if (imageExtensions.includes(fileExt)) {
      try {
        fs4.unlinkSync(filePath);
        deletedFiles.push(path5.relative(path5.join(process.cwd(), "public/uploads"), filePath));
        console.log(`Deleted non-WebP file: ${file}`);
      } catch (error) {
        console.error(`Failed to delete ${file}:`, error);
      }
    }
  }
  return deletedFiles;
}
router9.delete("/cleanup-all-originals", asyncHandler(async (_req, res) => {
  const uploadsDir = path5.join(process.cwd(), "public/uploads");
  if (!fs4.existsSync(uploadsDir)) {
    return res.json({ message: "Uploads directory not found", deleted: [] });
  }
  const allDeleted = [];
  try {
    const mainDeleted = deleteNonWebPImages(uploadsDir);
    allDeleted.push(...mainDeleted);
    const avatarsDir = path5.join(uploadsDir, "avatars");
    const avatarDeleted = deleteNonWebPImages(avatarsDir);
    allDeleted.push(...avatarDeleted);
    const thumbnailsDir = path5.join(uploadsDir, "thumbnails");
    const thumbnailDeleted = deleteNonWebPImages(thumbnailsDir);
    allDeleted.push(...thumbnailDeleted);
    res.json({
      message: `Cleanup completed. Deleted ${allDeleted.length} non-WebP files.`,
      deleted: allDeleted
    });
  } catch (error) {
    console.error("Error during cleanup:", error);
    res.status(500).json({ error: "Failed to cleanup files" });
  }
}));
var cleanup_all_originals_default = router9;

// server/api/media/update-database.ts
import { Router as Router10 } from "express";
init_storage();
init_apiCache();
import path6 from "path";
import fs5 from "fs";
var router10 = Router10();
router10.post("/update-database", asyncHandler(async (_req, res) => {
  try {
    const mediaFiles2 = await storage.getMediaFiles();
    let updatedCount = 0;
    for (const file of mediaFiles2) {
      const webpPath = path6.join(process.cwd(), "public", file.url.replace(/^\//, ""));
      if (fs5.existsSync(webpPath) && file.url.endsWith(".webp")) {
        const stats = fs5.statSync(webpPath);
        const filenameWithoutExt = path6.parse(file.filename).name;
        const webpFilename = `${filenameWithoutExt}.webp`;
        await storage.updateMediaFile(file.id, {
          filename: webpFilename,
          mimeType: "image/webp",
          size: stats.size
        });
        updatedCount++;
      }
    }
    await clearApiCache("GET:*/media*");
    res.json({
      message: `Updated ${updatedCount} media files with correct WebP information`,
      updated: updatedCount
    });
  } catch (error) {
    console.error("Error updating database:", error);
    res.status(500).json({ error: "Failed to update database" });
  }
}));
var update_database_default = router10;

// server/api/media/bulk-operations.ts
init_storage();
import { Router as Router11 } from "express";
import path7 from "path";
import fs6 from "fs";
var router11 = Router11();
router11.delete("/bulk", asyncHandler(async (req, res) => {
  const { ids } = req.body;
  if (!Array.isArray(ids) || ids.length === 0) {
    throw new BadRequestError("No file IDs provided");
  }
  const results = {
    deleted: [],
    failed: []
  };
  for (const id of ids) {
    try {
      const mediaFile = await storage.getMediaFile(parseInt(id));
      if (mediaFile) {
        const deleted = await storage.deleteMediaFile(parseInt(id));
        if (deleted) {
          try {
            const urlWithoutPrefix = mediaFile.url.replace(/^\/uploads/, "");
            const filePath = path7.join(process.cwd(), "public/uploads", urlWithoutPrefix);
            if (fs6.existsSync(filePath)) {
              fs6.unlinkSync(filePath);
            }
            if (mediaFile.thumbnailUrl && mediaFile.thumbnailUrl !== mediaFile.url) {
              const thumbnailUrlWithoutPrefix = mediaFile.thumbnailUrl.replace(/^\/uploads/, "");
              const thumbnailPath = path7.join(process.cwd(), "public/uploads", thumbnailUrlWithoutPrefix);
              if (fs6.existsSync(thumbnailPath)) {
                fs6.unlinkSync(thumbnailPath);
              }
            }
          } catch (fileError) {
            console.error(`Failed to delete files for ${id}:`, fileError);
          }
          results.deleted.push(parseInt(id));
        } else {
          results.failed.push({ id: parseInt(id), error: "Not found in database" });
        }
      } else {
        results.failed.push({ id: parseInt(id), error: "File not found" });
      }
    } catch (error) {
      results.failed.push({
        id: parseInt(id),
        error: error instanceof Error ? error.message : "Unknown error"
      });
    }
  }
  res.json({
    message: `Bulk operation completed. ${results.deleted.length} deleted, ${results.failed.length} failed.`,
    results
  });
}));
var bulk_operations_default = router11;

// server/api/media/index.ts
init_apiCache();
init_websocket();
var router12 = Router12();
var upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      const source = req.body.source || "general";
      const uploadPath = getUploadPath(file.mimetype, source);
      const uploadDir = path8.join(process.cwd(), "public", uploadPath);
      if (!fs7.existsSync(uploadDir)) {
        fs7.mkdirSync(uploadDir, { recursive: true });
      }
      cb(null, uploadDir);
    },
    filename: (_, file, cb) => {
      const uniqueFilename = `${uuidv42()}${path8.extname(file.originalname)}`;
      cb(null, uniqueFilename);
    }
  }),
  limits: {
    fileSize: 10 * 1024 * 1024
    // 10MB limit
  }
});
router12.use(cleanup_endpoint_default);
router12.use(cleanup_originals_default);
router12.use(cleanup_all_originals_default);
router12.use(update_database_default);
router12.use(bulk_operations_default);
router12.get("/", apiCache2({ ttl: 300 }), asyncHandler(async (_req, res) => {
  const mediaFiles2 = await storage.getMediaFiles();
  const verifiedData = await Promise.all(mediaFiles2.map(async (file) => {
    const filePath = path8.join(process.cwd(), "public", file.url.replace(/^\//, ""));
    const thumbnailPath = file.thumbnailUrl ? path8.join(process.cwd(), "public", file.thumbnailUrl.replace(/^\//, "")) : null;
    const fileExists = fs7.existsSync(filePath);
    const thumbnailExists = thumbnailPath ? fs7.existsSync(thumbnailPath) : false;
    console.log(`File ${file.filename} exists: ${fileExists}, thumbnail exists: ${thumbnailExists}`);
    return {
      ...file,
      url: fileExists ? file.url : "/images/placeholder-image.png",
      thumbnailUrl: thumbnailExists ? file.thumbnailUrl : fileExists ? file.url : "/images/placeholder-image.png"
    };
  }));
  res.json(verifiedData);
}));
router12.get("/:id", apiCache2({ ttl: 300 }), asyncHandler(async (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    throw new BadRequestError("Invalid media file ID");
  }
  const mediaFile = await storage.getMediaFile(id);
  if (!mediaFile) {
    throw new NotFoundError("Media file not found");
  }
  res.json(mediaFile);
}));
router12.post("/upload", upload.single("file"), asyncHandler(async (req, res) => {
  if (!req.file) {
    throw new BadRequestError("No file uploaded");
  }
  const file = req.file;
  try {
    const avatarsDir = path8.join(process.cwd(), "public/uploads/avatars");
    if (!fs7.existsSync(avatarsDir)) {
      fs7.mkdirSync(avatarsDir, { recursive: true });
    }
    const filenameWithoutExt = path8.parse(file.filename).name;
    const filename = `${filenameWithoutExt}.webp`;
    const webpPath = path8.join(avatarsDir, filename);
    await sharp2(file.path).resize(200, 200, { fit: "cover" }).webp({ quality: 85 }).toFile(webpPath);
    if (fs7.existsSync(file.path)) {
      fs7.unlinkSync(file.path);
    }
    const url = `/uploads/avatars/${filename}`;
    res.status(201).json({
      url,
      success: true
    });
  } catch (error) {
    console.error("Failed to process avatar:", error);
    throw new BadRequestError("Failed to process avatar image");
  }
}));
router12.post("/", upload.single("file"), asyncHandler(async (req, res) => {
  if (!req.file) {
    throw new BadRequestError("No file uploaded");
  }
  const file = req.file;
  const originalName = file.originalname;
  let mimeType = file.mimetype;
  let size = file.size;
  const source = req.body.source || "general";
  if (!isSupportedFileType(mimeType)) {
    throw new BadRequestError(`Unsupported file type: ${mimeType}`);
  }
  const category = getFileCategory(mimeType);
  const folderPath = getUploadPath(mimeType, source);
  let url, thumbnailUrl, filename;
  if (mimeType.startsWith("image/")) {
    const filenameWithoutExt = path8.parse(file.filename).name;
    filename = `${filenameWithoutExt}.webp`;
    const uploadDir = path8.join(process.cwd(), "public", folderPath);
    const webpPath = path8.join(uploadDir, filename);
    const thumbnailsDir = path8.join(process.cwd(), "public/uploads/thumbnails");
    if (!fs7.existsSync(thumbnailsDir)) {
      fs7.mkdirSync(thumbnailsDir, { recursive: true });
    }
    try {
      console.log(`Converting ${file.path} to WebP: ${webpPath}`);
      const webpInfo = await sharp2(file.path).webp({ quality: 80 }).toFile(webpPath);
      console.log(`WebP conversion successful, size: ${webpInfo.size}`);
      const thumbnailFilename = `thumbnails/${filenameWithoutExt}_thumb.webp`;
      const thumbnailPath = path8.join(process.cwd(), "public/uploads", thumbnailFilename);
      await sharp2(file.path).resize(200, 200, { fit: "cover" }).webp({ quality: 70 }).toFile(thumbnailPath);
      console.log(`Thumbnail created: ${thumbnailPath}`);
      mimeType = "image/webp";
      size = webpInfo.size;
      url = `/${folderPath}/${filename}`;
      thumbnailUrl = `/uploads/${thumbnailFilename}`;
      process.nextTick(async () => {
        const { cleanupSpecificFileInDirectory: cleanupSpecificFileInDirectory2 } = await Promise.resolve().then(() => (init_mediaCleanup(), mediaCleanup_exports));
        try {
          await new Promise((resolve) => setTimeout(resolve, 1e3));
          if (fs7.existsSync(file.path)) {
            await fs7.promises.unlink(file.path);
            console.log(`Original temp file deleted: ${file.path}`);
          }
          const success = await cleanupSpecificFileInDirectory2(file.filename, folderPath);
          if (success) {
            console.log(`Original uploaded file deleted: ${file.filename} from ${folderPath}`);
          } else {
            console.log(`Could not delete original file: ${file.filename} from ${folderPath}`);
          }
        } catch (deleteError) {
          console.log(`Could not delete original files: ${deleteError}`);
        }
      });
    } catch (error) {
      console.error("WebP conversion failed:", error instanceof Error ? error.message : String(error));
      console.error("Sharp error details:", error);
      try {
        const basicWebpInfo = await sharp2(file.path).webp().toFile(webpPath);
        const thumbnailFilename = `thumbnails/${filenameWithoutExt}_thumb.webp`;
        const thumbnailPath = path8.join(process.cwd(), "public/uploads", thumbnailFilename);
        await sharp2(file.path).resize(200, 200).webp().toFile(thumbnailPath);
        mimeType = "image/webp";
        size = basicWebpInfo.size;
        url = `/${folderPath}/${filename}`;
        thumbnailUrl = `/uploads/${thumbnailFilename}`;
        setTimeout(async () => {
          const { cleanupSpecificFileInDirectory: cleanupSpecificFileInDirectory2 } = await Promise.resolve().then(() => (init_mediaCleanup(), mediaCleanup_exports));
          try {
            if (fs7.existsSync(file.path)) {
              fs7.unlinkSync(file.path);
            }
            const success = await cleanupSpecificFileInDirectory2(file.filename, folderPath);
            if (success) {
              console.log(`Original uploaded file deleted: ${file.filename} from ${folderPath}`);
            } else {
              console.log(`Could not delete original file: ${file.filename} from ${folderPath}`);
            }
          } catch (deleteError) {
            console.log(`Could not delete original files: ${deleteError}`);
          }
        }, 100);
        console.log("Basic WebP conversion successful");
      } catch (basicError) {
        console.error("Basic WebP conversion also failed:", basicError);
        filename = file.filename;
        url = `/${folderPath}/${filename}`;
        thumbnailUrl = url;
      }
    }
  } else {
    filename = file.filename;
    url = `/${folderPath}/${filename}`;
    thumbnailUrl = url;
  }
  const mediaFile = await storage.createMediaFile({
    filename,
    // This is the WebP filename
    originalName,
    // This is the original uploaded filename
    mimeType,
    size,
    url,
    thumbnailUrl,
    category,
    source,
    folderPath
  });
  console.log(`Database saved: filename=${filename}, originalName=${originalName}, url=${url}`);
  if (mimeType.startsWith("image/") && filename.endsWith(".webp") && file.filename !== filename) {
    process.nextTick(async () => {
      const { cleanupSpecificFileInDirectory: cleanupSpecificFileInDirectory2 } = await Promise.resolve().then(() => (init_mediaCleanup(), mediaCleanup_exports));
      const success = await cleanupSpecificFileInDirectory2(file.filename, folderPath);
      if (success) {
        console.log(`Immediate cleanup: Original uploaded file deleted: ${file.filename} from ${folderPath}`);
      } else {
        console.log(`Immediate cleanup failed, will retry later: ${file.filename} from ${folderPath}`);
      }
    });
  }
  await clearApiCache("GET:/api/media");
  broadcastMediaUpdate("uploaded", mediaFile);
  broadcastCacheInvalidation(["GET:/api/media"]);
  res.status(201).json(mediaFile);
}));
router12.delete("/:id", asyncHandler(async (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    throw new BadRequestError("Invalid media file ID");
  }
  const mediaFile = await storage.getMediaFile(id);
  if (!mediaFile) {
    throw new NotFoundError("Media file not found");
  }
  const deleted = await storage.deleteMediaFile(id);
  if (!deleted) {
    throw new NotFoundError("Media file not found");
  }
  try {
    const filePath = path8.join(process.cwd(), "public", mediaFile.folderPath || "uploads", mediaFile.filename);
    if (fs7.existsSync(filePath)) {
      await fs7.promises.unlink(filePath);
      console.log(`Deleted main file: ${mediaFile.filename} from ${mediaFile.folderPath}`);
    }
    if (mediaFile.thumbnailUrl && mediaFile.thumbnailUrl !== mediaFile.url) {
      const thumbnailPath = path8.join(process.cwd(), "public", mediaFile.thumbnailUrl.replace(/^\//, ""));
      if (fs7.existsSync(thumbnailPath)) {
        await fs7.promises.unlink(thumbnailPath);
        console.log(`Deleted thumbnail: ${mediaFile.thumbnailUrl}`);
      }
    }
    const filenameWithoutExt = path8.parse(mediaFile.filename).name;
    const imageExtensions = [".jpg", ".jpeg", ".png", ".gif", ".bmp", ".tiff", ".jfif"];
    for (const ext of imageExtensions) {
      const originalFilename = `${filenameWithoutExt}${ext}`;
      const originalPath = path8.join(process.cwd(), "public", mediaFile.folderPath || "uploads", originalFilename);
      if (fs7.existsSync(originalPath)) {
        try {
          await fs7.promises.unlink(originalPath);
          console.log(`Deleted corresponding original file: ${originalFilename} from ${mediaFile.folderPath}`);
        } catch (deleteError) {
          console.log(`Could not delete original file: ${originalPath}`);
        }
      }
    }
  } catch (error) {
    console.error("Failed to delete file from disk:", error);
  }
  await clearApiCache("GET:*/media*");
  broadcastMediaUpdate("deleted", { id: mediaFile.id, url: mediaFile.url, category: mediaFile.category, source: mediaFile.source });
  broadcastCacheInvalidation(["GET:/api/media"]);
  res.set({
    "Cache-Control": "no-cache, no-store, must-revalidate",
    "Pragma": "no-cache",
    "Expires": "0"
  });
  res.json({
    message: "Media file deleted successfully",
    deletedUrl: mediaFile.url,
    timestamp: Date.now()
    // For cache busting
  });
}));
var media_default = router12;

// server/api/uploads.ts
import { Router as Router13 } from "express";
import path9 from "path";
import fs8 from "fs";
var router13 = Router13();
router13.get("/*", (req, res) => {
  const filePath = path9.join(process.cwd(), "public/uploads", req.path);
  if (fs8.existsSync(filePath)) {
    return res.sendFile(filePath);
  } else {
    return res.status(404).send("File not found");
  }
});
var uploads_default = router13;

// server/api/health/index.ts
import { Router as Router14 } from "express";
init_db();
init_redis();
var router14 = Router14();
router14.get("/", asyncHandler(async (_, res) => {
  const startTime = Date.now();
  const healthCheck = {
    status: "healthy",
    timestamp: (/* @__PURE__ */ new Date()).toISOString(),
    services: {
      database: { status: "unknown", responseTime: "0ms" },
      redis: { status: "unknown", responseTime: "0ms" }
    }
  };
  const dbStart = Date.now();
  const dbHealthy = await checkDatabaseConnection();
  healthCheck.services.database = {
    status: dbHealthy ? "healthy" : "unhealthy",
    responseTime: `${Date.now() - dbStart}ms`
  };
  const redisStart = Date.now();
  const redisHealthy = await checkRedisConnection();
  healthCheck.services.redis = {
    status: redisHealthy ? "healthy" : "unhealthy",
    responseTime: `${Date.now() - redisStart}ms`
  };
  const isHealthy = dbHealthy && redisHealthy;
  healthCheck.status = isHealthy ? "healthy" : "unhealthy";
  const statusCode = isHealthy ? 200 : 503;
  logger.info("Health check performed", {
    status: healthCheck.status,
    database: healthCheck.services.database.status,
    redis: healthCheck.services.redis.status,
    totalTime: `${Date.now() - startTime}ms`
  });
  res.status(statusCode).json(healthCheck);
}));
router14.get("/ready", asyncHandler(async (_, res) => {
  const dbHealthy = await checkDatabaseConnection();
  if (dbHealthy) {
    res.status(200).json({ status: "ready" });
  } else {
    res.status(503).json({ status: "not ready", reason: "database unavailable" });
  }
}));
router14.get("/live", (_, res) => {
  res.status(200).json({ status: "alive" });
});
var health_default = router14;

// server/api/metrics/index.ts
import { Router as Router15 } from "express";

// server/utils/cacheManager.ts
init_redis();
var CacheManager = class {
  constructor() {
    this.stats = {
      hits: 0,
      misses: 0,
      sets: 0,
      invalidations: 0
    };
  }
  async get(key) {
    try {
      const redisClient2 = await getRedisClient();
      if (redisClient2) {
        const result = await redisClient2.get(key);
        if (result) {
          this.stats.hits++;
          return JSON.parse(result);
        }
      }
      this.stats.misses++;
      return null;
    } catch (error) {
      logger.error("Cache get error", { key, error: error instanceof Error ? error.message : String(error) });
      this.stats.misses++;
      return null;
    }
  }
  async set(key, value, ttl = 300) {
    try {
      const redisClient2 = await getRedisClient();
      if (redisClient2) {
        await redisClient2.setEx(key, ttl, JSON.stringify(value));
        this.stats.sets++;
        logger.debug("Cache set", { key, ttl });
      }
    } catch (error) {
      logger.error("Cache set error", { key, error: error instanceof Error ? error.message : String(error) });
    }
  }
  async invalidate(pattern) {
    try {
      const redisClient2 = await getRedisClient();
      if (redisClient2) {
        const keys = await redisClient2.keys(pattern);
        if (keys.length > 0) {
          await redisClient2.del(keys);
          this.stats.invalidations += keys.length;
          logger.info("Cache invalidated", { pattern, count: keys.length });
          return keys.length;
        }
      }
      return 0;
    } catch (error) {
      logger.error("Cache invalidation error", { pattern, error: error instanceof Error ? error.message : String(error) });
      return 0;
    }
  }
  getStats() {
    const total = this.stats.hits + this.stats.misses;
    return {
      ...this.stats,
      hitRate: total > 0 ? this.stats.hits / total * 100 : 0
    };
  }
  resetStats() {
    this.stats = { hits: 0, misses: 0, sets: 0, invalidations: 0 };
  }
};
var cacheManager = new CacheManager();

// server/api/metrics/index.ts
var router15 = Router15();
router15.get("/", asyncHandler(async (_, res) => {
  const memoryUsage = process.memoryUsage();
  const cpuUsage = process.cpuUsage();
  const metrics = {
    timestamp: (/* @__PURE__ */ new Date()).toISOString(),
    uptime: process.uptime(),
    memory: {
      heapUsed: Math.round(memoryUsage.heapUsed / 1024 / 1024),
      // MB
      heapTotal: Math.round(memoryUsage.heapTotal / 1024 / 1024),
      // MB
      external: Math.round(memoryUsage.external / 1024 / 1024),
      // MB
      rss: Math.round(memoryUsage.rss / 1024 / 1024)
      // MB
    },
    cpu: {
      user: Math.round(cpuUsage.user / 1e3),
      // ms
      system: Math.round(cpuUsage.system / 1e3)
      // ms
    },
    nodeVersion: process.version,
    platform: process.platform,
    cache: cacheManager.getStats()
  };
  logger.info("Metrics requested", {
    heapUsed: metrics.memory.heapUsed,
    uptime: metrics.uptime
  });
  res.json(metrics);
}));
var metrics_default = router15;

// server/api/settings/index.ts
init_db();
init_schema();
import { Router as Router16 } from "express";
var router16 = Router16();
router16.get("/", async (_req, res) => {
  try {
    const allSettings = await db.select().from(settings);
    const settingsObj = allSettings.reduce((acc, setting) => {
      acc[setting.key] = setting.value || "";
      return acc;
    }, {});
    res.json(settingsObj);
  } catch (error) {
    console.error("Settings fetch error:", error);
    res.status(500).json({ error: "Failed to fetch settings" });
  }
});
router16.get("/admin", requireAdmin, async (_req, res) => {
  try {
    const allSettings = await db.select().from(settings);
    const settingsObj = allSettings.reduce((acc, setting) => {
      acc[setting.key] = setting.value || "";
      return acc;
    }, {});
    res.json(settingsObj);
  } catch (error) {
    console.error("Settings fetch error:", error);
    res.status(500).json({ error: "Failed to fetch settings" });
  }
});
router16.post("/", requireAdmin, async (req, res) => {
  try {
    const settingsData = req.body;
    for (const [key, value] of Object.entries(settingsData)) {
      await db.insert(settings).values({ key, value: String(value) }).onConflictDoUpdate({
        target: settings.key,
        set: { value: String(value), updatedAt: /* @__PURE__ */ new Date() }
      });
    }
    res.json({ message: "Settings updated successfully" });
  } catch (error) {
    console.error("Settings update error:", error);
    res.status(500).json({ error: "Failed to update settings" });
  }
});
var settings_default = router16;

// server/api/mailings/index.ts
import { Router as Router20 } from "express";

// server/api/mailings/templates.ts
import { Router as Router17 } from "express";
var router17 = Router17();
router17.get("/", requireAdmin, async (_req, res) => {
  const templates = [];
  res.json(templates);
});
router17.post("/", requireAdmin, async (req, res) => {
  try {
    const { name, subject, content } = req.body;
    console.log("Creating template with data:", { name, subject, content });
    const insertData = {
      name: name?.trim(),
      subject: subject?.trim(),
      content: content?.trim()
    };
    console.log("Insert data:", insertData);
    const template = {
      id: Date.now(),
      ...insertData,
      createdAt: /* @__PURE__ */ new Date()
    };
    console.log("Created template:", template);
    const wss = global.wss;
    if (wss && wss.clients) {
      wss.clients.forEach((client) => {
        if (client.readyState === 1) {
          client.send(JSON.stringify({
            type: "template_created",
            data: template
          }));
        }
      });
    }
    res.status(201).json(template);
  } catch (error) {
    console.error("Error creating template:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("Error details:", errorMessage);
    res.status(500).json({ error: "Failed to create template", details: errorMessage });
  }
});
router17.put("/:id", requireAdmin, async (req, res) => {
  try {
    const { name, subject, content } = req.body;
    console.log("Updating template with data:", { name, subject, content });
    const template = {
      id: parseInt(req.params.id),
      name: name?.trim(),
      subject: subject?.trim(),
      content: content?.trim(),
      updatedAt: /* @__PURE__ */ new Date()
    };
    console.log("Updated template:", template);
    const wss = global.wss;
    if (wss && wss.clients) {
      wss.clients.forEach((client) => {
        if (client.readyState === 1) {
          client.send(JSON.stringify({
            type: "template_updated",
            data: template
          }));
        }
      });
    }
    res.json(template);
  } catch (error) {
    console.error("Error updating template:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("Error details:", errorMessage);
    res.status(500).json({ error: "Failed to update template", details: errorMessage });
  }
});
router17.delete("/:id", requireAdmin, async (req, res) => {
  try {
    const templateId = parseInt(req.params.id);
    console.log("Delete template:", templateId);
    const wss = global.wss;
    if (wss && wss.clients) {
      wss.clients.forEach((client) => {
        if (client.readyState === 1) {
          client.send(JSON.stringify({
            type: "template_deleted",
            data: { id: templateId }
          }));
        }
      });
    }
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting template:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    res.status(500).json({ error: "Failed to delete template", details: errorMessage });
  }
});
var templates_default = router17;

// server/api/mailings/lists.ts
import { Router as Router18 } from "express";
var router18 = Router18();
router18.get("/", requireAdmin, async (_req, res) => {
  const lists = [];
  res.json(lists);
});
router18.post("/", requireAdmin, async (req, res) => {
  try {
    const { name, description, status, templateId } = req.body;
    console.log("Creating mailing list with data:", { name, description, status, templateId });
    const list = {
      id: Date.now(),
      name: name?.trim(),
      description: description?.trim() || null,
      status: status || "draft",
      templateId: templateId && templateId !== "" ? parseInt(templateId) : null,
      createdAt: /* @__PURE__ */ new Date()
    };
    console.log("Created list:", list);
    res.status(201).json(list);
  } catch (error) {
    console.error("Error creating mailing list:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("Error details:", errorMessage);
    res.status(500).json({ error: "Failed to create mailing list", details: errorMessage });
  }
});
router18.put("/:id", requireAdmin, async (req, res) => {
  try {
    const { name, description, status, templateId } = req.body;
    const list = {
      id: parseInt(req.params.id),
      name,
      description,
      status,
      templateId: templateId || null,
      updatedAt: /* @__PURE__ */ new Date()
    };
    res.json(list);
  } catch (error) {
    console.error("Error updating mailing list:", error);
    res.status(500).json({ error: "Failed to update mailing list" });
  }
});
router18.get("/:id/recipients", requireAdmin, async (_, res) => {
  try {
    const recipients = [];
    res.json(recipients);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch recipients" });
  }
});
router18.post("/:id/recipients", requireAdmin, async (req, res) => {
  try {
    const { userIds } = req.body;
    const recipients = userIds?.length > 0 ? userIds.map((userId) => ({
      id: Date.now(),
      mailingListId: parseInt(req.params.id),
      userId
    })) : [];
    res.status(201).json(recipients);
  } catch (error) {
    res.status(500).json({ error: "Failed to add recipients" });
  }
});
router18.delete("/:id/recipients/:userId", requireAdmin, async (req, res) => {
  try {
    console.log("Remove recipient:", req.params.userId, "from list:", req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Failed to remove recipient" });
  }
});
var lists_default = router18;

// server/api/mailings/campaigns.ts
import { Router as Router19 } from "express";

// server/services/mailingService.ts
var MailingService = class {
  async sendMailing(mailingListId) {
    console.log("Sending mailing for list:", mailingListId);
    const campaign = {
      id: Date.now(),
      mailingListId,
      totalRecipients: 0,
      sentCount: 0,
      failedCount: 0,
      status: "completed",
      sentAt: /* @__PURE__ */ new Date()
    };
    console.log("Mailing campaign completed:", campaign);
    return campaign;
  }
};

// server/api/mailings/campaigns.ts
var router19 = Router19();
var mailingService = new MailingService();
router19.get("/", requireAdmin, async (_req, res) => {
  const campaigns = [];
  res.json(campaigns);
});
router19.post("/send", requireAdmin, async (req, res) => {
  try {
    const { mailingListId } = req.body;
    if (!mailingListId) {
      return res.status(400).json({ error: "Mailing list ID is required" });
    }
    await mailingService.sendMailing(mailingListId);
    res.json({ message: "Campaign sent successfully" });
  } catch (error) {
    console.error("Error sending campaign:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    res.status(500).json({ error: "Failed to send campaign", details: errorMessage });
  }
});
router19.post("/", requireAdmin, async (req, res) => {
  const { mailingListId } = req.body;
  const campaign = { id: Date.now(), mailingListId, createdAt: /* @__PURE__ */ new Date() };
  res.status(201).json(campaign);
});
var campaigns_default = router19;

// server/api/mailings/index.ts
var router20 = Router20();
router20.get("/test", (_req, res) => {
  res.json({ message: "Mailings API is working" });
});
router20.use("/templates", templates_default);
router20.use("/lists", lists_default);
router20.use("/campaigns", campaigns_default);
var mailings_default = router20;

// server/api/categories/index.ts
init_categoryService();
import { Router as Router21 } from "express";

// shared/validation/categories.ts
import { z as z6 } from "zod";
var createCategorySchema = z6.object({
  name: z6.string().min(1, "Name is required").max(255, "Name too long"),
  slug: z6.string().min(1, "Slug is required").max(255, "Slug too long").regex(/^[a-z0-9-]+$/, "Slug must contain only lowercase letters, numbers, and hyphens"),
  description: z6.string().optional(),
  parentId: z6.number().optional(),
  sortOrder: z6.number().default(0)
});
var updateCategorySchema = z6.object({
  name: z6.string().min(1, "Name is required").max(255, "Name too long").optional(),
  slug: z6.string().min(1, "Slug is required").max(255, "Slug too long").regex(/^[a-z0-9-]+$/, "Slug must contain only lowercase letters, numbers, and hyphens").optional(),
  description: z6.string().optional(),
  parentId: z6.number().optional(),
  sortOrder: z6.number().optional()
});
var categoryQuerySchema = z6.object({
  includeChildren: z6.boolean().default(true),
  includePosts: z6.boolean().default(false),
  includePostCount: z6.boolean().default(true)
});

// server/api/categories/index.ts
var router21 = Router21();
router21.get("/", async (_, res) => {
  try {
    const categories = await categoryService.getCategoriesTree();
    res.json({
      success: true,
      data: categories
    });
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch categories"
    });
  }
});
router21.get("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid category ID"
      });
    }
    const query = categoryQuerySchema.parse(req.query);
    const category = await categoryService.getCategoryById(
      id,
      query.includeChildren
    );
    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found"
      });
    }
    res.json({
      success: true,
      data: category
    });
  } catch (error) {
    console.error("Error fetching category:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch category"
    });
  }
});
router21.post("/", requireAuth, requireRole(["admin"]), async (req, res) => {
  try {
    const data = createCategorySchema.parse(req.body);
    const category = await categoryService.createCategory(data);
    res.status(201).json({
      success: true,
      data: category,
      message: "Category created successfully"
    });
  } catch (error) {
    console.error("Error creating category:", error);
    if (error instanceof Error && error.name === "ZodError") {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors: error.errors
      });
    }
    res.status(500).json({
      success: false,
      message: "Failed to create category"
    });
  }
});
router21.put("/:id", requireAuth, requireRole(["admin"]), async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid category ID"
      });
    }
    const data = updateCategorySchema.parse(req.body);
    const category = await categoryService.updateCategory(id, data);
    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found"
      });
    }
    res.json({
      success: true,
      data: category,
      message: "Category updated successfully"
    });
  } catch (error) {
    console.error("Error updating category:", error);
    if (error instanceof Error && error.name === "ZodError") {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors: error.errors
      });
    }
    res.status(500).json({
      success: false,
      message: "Failed to update category"
    });
  }
});
router21.delete("/:id", requireAuth, requireRole(["admin"]), async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid category ID"
      });
    }
    const success = await categoryService.deleteCategory(id);
    if (!success) {
      return res.status(404).json({
        success: false,
        message: "Category not found"
      });
    }
    res.json({
      success: true,
      message: "Category deleted successfully"
    });
  } catch (error) {
    console.error("Error deleting category:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete category"
    });
  }
});
var categories_default = router21;

// server/api/analytics/index.ts
init_analytics_service();
import { Router as Router22 } from "express";
import rateLimit2 from "express-rate-limit";
import { z as z10 } from "zod";

// server/utils/deviceDetection.ts
function detectDevice(req) {
  const userAgent = req.get("User-Agent") || "";
  let deviceType = "desktop";
  if (/Mobile|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)) {
    if (/iPad/i.test(userAgent)) {
      deviceType = "tablet";
    } else {
      deviceType = "mobile";
    }
  } else if (/Tablet/i.test(userAgent)) {
    deviceType = "tablet";
  }
  let browser = "Unknown";
  if (userAgent.includes("Chrome") && !userAgent.includes("Edg")) {
    browser = "Chrome";
  } else if (userAgent.includes("Firefox")) {
    browser = "Firefox";
  } else if (userAgent.includes("Safari") && !userAgent.includes("Chrome")) {
    browser = "Safari";
  } else if (userAgent.includes("Edg")) {
    browser = "Edge";
  } else if (userAgent.includes("Opera") || userAgent.includes("OPR")) {
    browser = "Opera";
  } else if (userAgent.includes("Trident") || userAgent.includes("MSIE")) {
    browser = "Internet Explorer";
  }
  let os = "Unknown";
  if (userAgent.includes("Windows NT")) {
    os = "Windows";
  } else if (userAgent.includes("Mac OS X")) {
    os = "macOS";
  } else if (userAgent.includes("Linux")) {
    os = "Linux";
  } else if (userAgent.includes("Android")) {
    os = "Android";
  } else if (userAgent.includes("iPhone OS") || userAgent.includes("iOS")) {
    os = "iOS";
  }
  return {
    deviceType,
    browser,
    os
  };
}
function getClientIP(req) {
  return req.ip || req.connection.remoteAddress || req.socket.remoteAddress || req.connection?.socket?.remoteAddress || "127.0.0.1";
}

// server/api/analytics/index.ts
init_scheduler();

// server/utils/sanitization.ts
import { z as z8 } from "zod";
var InputSanitizer = class {
  // Sanitize string input with enhanced comment-specific protection
  static sanitizeString(input, maxLength = 1e3) {
    if (typeof input !== "string") return "";
    return input.trim().substring(0, maxLength).replace(/[\x00-\x1f\x7f-\x9f]/g, "").replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "").replace(/javascript:/gi, "").replace(/on\w+\s*=/gi, "").replace(/data:(?!image\/)[^;]*;/gi, "").replace(/vbscript:/gi, "").replace(/<iframe\b[^>]*>/gi, "").replace(/<object\b[^>]*>/gi, "").replace(/<embed\b[^>]*>/gi, "");
  }
  // Sanitize URL/path input
  static sanitizePath(input) {
    if (typeof input !== "string") return "/";
    return input.trim().substring(0, 500).replace(/[^\w\-._~:/?#[\]@!$&'()*+,;=%]/g, "").replace(/\.{2,}/g, ".").replace(/^\/+/, "/");
  }
  // Sanitize IP address
  static sanitizeIP(input) {
    if (typeof input !== "string") return null;
    const ipv4Regex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    const ipv6Regex = /^(?:[0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/;
    const cleaned = input.trim();
    if (ipv4Regex.test(cleaned) || ipv6Regex.test(cleaned)) {
      return cleaned;
    }
    return null;
  }
  // Sanitize user agent
  static sanitizeUserAgent(input) {
    if (typeof input !== "string") return "Unknown";
    return input.trim().substring(0, 1e3).replace(/[\x00-\x1f\x7f-\x9f]/g, "").replace(/<[^>]*>/g, "");
  }
  // Validate and sanitize comment data
  static sanitizeCommentData(data) {
    const schema = z8.object({
      postId: z8.number().positive(),
      content: z8.string().min(1).max(2e3).transform((val) => this.sanitizeString(val, 2e3)),
      parentId: z8.number().positive().optional().nullable()
    });
    return schema.parse(data);
  }
  // Validate and sanitize analytics tracking data
  static sanitizeTrackingData(data) {
    const schema = z8.object({
      sessionId: z8.string().min(1).max(255).transform((val) => this.sanitizeString(val, 255)),
      pagePath: z8.string().min(1).max(500).transform((val) => this.sanitizePath(val)),
      pageTitle: z8.string().optional().transform((val) => val ? this.sanitizeString(val, 500) : void 0),
      referrer: z8.string().optional().transform((val) => val ? this.sanitizeString(val, 500) : void 0),
      userAgent: z8.string().optional().transform((val) => val ? this.sanitizeUserAgent(val) : void 0),
      deviceType: z8.string().optional().transform((val) => val ? this.sanitizeString(val, 50) : void 0),
      browser: z8.string().optional().transform((val) => val ? this.sanitizeString(val, 100) : void 0),
      os: z8.string().optional().transform((val) => val ? this.sanitizeString(val, 100) : void 0),
      screenResolution: z8.string().optional().transform((val) => val ? this.sanitizeString(val, 20) : void 0)
    });
    return schema.parse(data);
  }
};

// server/utils/auditLogger.ts
var AuditLogger = class {
  // Log analytics-related audit events
  static logAnalyticsEvent(event) {
    const auditEvent = {
      ...event,
      timestamp: /* @__PURE__ */ new Date()
    };
    const sanitizedEvent = {
      ...auditEvent,
      details: this.sanitizeDetails(auditEvent.details),
      userAgent: auditEvent.userAgent?.substring(0, 200)
      // Limit length
    };
    logger.info("AUDIT_EVENT", sanitizedEvent);
  }
  // Log data clearing operations
  static logDataClear(userId, ipAddress, userAgent) {
    this.logAnalyticsEvent({
      userId,
      action: "CLEAR_ANALYTICS_DATA",
      resource: "analytics",
      details: {
        severity: "HIGH",
        description: "All analytics data cleared by admin"
      },
      ipAddress,
      userAgent
    });
  }
  // Log manual aggregation triggers
  static logManualAggregation(userId, date, ipAddress, userAgent) {
    this.logAnalyticsEvent({
      userId,
      action: "MANUAL_AGGREGATION",
      resource: "analytics",
      details: {
        date,
        description: "Manual analytics aggregation triggered"
      },
      ipAddress,
      userAgent
    });
  }
  // Log failed authentication attempts
  static logAuthFailure(ipAddress, reason, userAgent) {
    this.logAnalyticsEvent({
      action: "AUTH_FAILURE",
      resource: "analytics",
      details: {
        reason,
        severity: "MEDIUM"
      },
      ipAddress,
      userAgent
    });
  }
  // Sanitize audit details to prevent log injection
  static sanitizeDetails(details) {
    if (!details) return details;
    if (typeof details === "string") {
      return details.replace(/[\r\n\t]/g, " ").substring(0, 500);
    }
    if (typeof details === "object") {
      const sanitized = {};
      for (const [key, value] of Object.entries(details)) {
        if (typeof value === "string") {
          sanitized[key] = value.replace(/[\r\n\t]/g, " ").substring(0, 200);
        } else if (typeof value === "number" || typeof value === "boolean") {
          sanitized[key] = value;
        }
      }
      return sanitized;
    }
    return details;
  }
};

// server/services/analytics-export.ts
init_analytics_service();
import { z as z9 } from "zod";
var exportSchema = z9.object({
  format: z9.enum(["csv", "json"]),
  startDate: z9.string().optional(),
  endDate: z9.string().optional(),
  days: z9.number().min(1).max(365).default(30)
});
var AnalyticsExportService = class {
  // Export analytics data
  async exportData(params) {
    const validated = exportSchema.parse(params);
    const overview = await analyticsService.getOverview({ days: validated.days });
    if (validated.format === "csv") {
      return this.exportCSV(overview, validated.days);
    } else {
      return this.exportJSON(overview, validated.days);
    }
  }
  // Export as CSV
  exportCSV(data, days) {
    const headers = [
      "Date",
      "Page Views",
      "Unique Visitors",
      "Sessions",
      "Bounce Rate (%)",
      "Avg Session Duration (s)"
    ];
    const rows = data.chartData.map((item) => [
      item.date,
      item.pageViews,
      item.visitors,
      data.totalSessions,
      data.bounceRate,
      data.avgSessionDuration
    ]);
    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.join(","))
    ].join("\n");
    return {
      data: csvContent,
      filename: `analytics-${days}days-${(/* @__PURE__ */ new Date()).toISOString().split("T")[0]}.csv`,
      mimeType: "text/csv"
    };
  }
  // Export as JSON
  exportJSON(data, days) {
    const exportData = {
      exportDate: (/* @__PURE__ */ new Date()).toISOString(),
      period: `${days} days`,
      summary: {
        totalPageViews: data.totalPageViews,
        uniqueVisitors: data.uniqueVisitors,
        totalSessions: data.totalSessions,
        bounceRate: data.bounceRate,
        avgSessionDuration: data.avgSessionDuration
      },
      topPages: data.topPages,
      topReferrers: data.topReferrers,
      deviceStats: data.deviceStats,
      countryStats: data.countryStats,
      chartData: data.chartData
    };
    return {
      data: JSON.stringify(exportData, null, 2),
      filename: `analytics-${days}days-${(/* @__PURE__ */ new Date()).toISOString().split("T")[0]}.json`,
      mimeType: "application/json"
    };
  }
};
var analyticsExport = new AnalyticsExportService();

// server/api/analytics/index.ts
init_analytics_cleanup();
init_analytics_cache();
var router22 = Router22();
var trackingLimiter = rateLimit2({
  windowMs: 1 * 60 * 1e3,
  // 1 minute
  max: 100,
  // limit each IP to 100 requests per windowMs
  message: { error: "Too many tracking requests" },
  standardHeaders: true,
  legacyHeaders: false
});
var analyticsLimiter = rateLimit2({
  windowMs: 1 * 60 * 1e3,
  // 1 minute
  max: 30,
  // limit each IP to 30 requests per windowMs
  message: { error: "Too many analytics requests" },
  standardHeaders: true,
  legacyHeaders: false
});
console.log("\u{1F680} Analytics System Loading (TS)...");
router22.get("/overview", requireAuth, analyticsLimiter, async (req, res) => {
  try {
    if (req.user?.role !== "admin") {
      AuditLogger.logAuthFailure(
        getClientIP(req),
        "Insufficient permissions for analytics overview",
        req.get("User-Agent")
      );
      return res.status(403).json({ error: "Admin access required" });
    }
    const days = parseInt(req.query.days) || 7;
    if (days < 1 || days > 365) {
      return res.status(400).json({ error: "Days must be between 1 and 365" });
    }
    console.log(`\u{1F4CA} Analytics overview requested for ${days} days by admin: ${req.user?.id}`);
    const overview = await analyticsService.getOverview({ days });
    res.json(overview);
  } catch (error) {
    console.error("Analytics overview error:", error);
    res.status(500).json({ error: "Analytics service error" });
  }
});
router22.post("/track", trackingLimiter, async (req, res) => {
  try {
    const trackingSchema2 = z10.object({
      sessionId: z10.string().min(1).max(255),
      pagePath: z10.string().min(1).max(500),
      pageTitle: z10.string().optional(),
      referrer: z10.string().optional(),
      userAgent: z10.string().optional(),
      deviceType: z10.string().max(50).optional(),
      browser: z10.string().max(100).optional(),
      os: z10.string().max(100).optional(),
      screenResolution: z10.string().max(20).optional()
    });
    const sanitizedInput = InputSanitizer.sanitizeTrackingData(req.body);
    const validated = trackingSchema2.parse(sanitizedInput);
    const deviceInfo = detectDevice(req);
    const trackingData = {
      ...validated,
      ipAddress: InputSanitizer.sanitizeIP(getClientIP(req)) || "127.0.0.1",
      userAgent: InputSanitizer.sanitizeUserAgent(req.get("User-Agent") || ""),
      deviceType: deviceInfo.deviceType,
      browser: deviceInfo.browser,
      os: deviceInfo.os
    };
    await analyticsService.trackPageView(trackingData);
    console.log("\u{1F4C8} Analytics tracking successful:", {
      sessionId: validated.sessionId,
      pagePath: validated.pagePath,
      deviceType: trackingData.deviceType,
      userAgent: trackingData.userAgent?.substring(0, 50) + "..."
    });
    res.json({ success: true, message: "Tracking received" });
  } catch (error) {
    if (error instanceof z10.ZodError) {
      AuditLogger.logAnalyticsEvent({
        action: "TRACKING_VALIDATION_FAILURE",
        resource: "analytics",
        details: {
          errors: error.errors.map((e) => ({ path: e.path.join("."), message: e.message })),
          severity: "LOW"
        },
        ipAddress: getClientIP(req),
        userAgent: req.get("User-Agent")
      });
      return res.status(400).json({
        success: false,
        error: "Invalid tracking data"
      });
    }
    console.error("Analytics tracking error:", error);
    res.json({ success: true, error: "Tracking failed but continuing" });
  }
});
router22.post("/clear-cache", requireAuth, async (req, res) => {
  try {
    if (req.user?.role !== "admin") {
      return res.status(403).json({ error: "Admin access required" });
    }
    await analyticsCacheService.clearAllCache();
    console.log(`\u{1F9F9} Analytics cache cleared by admin: ${req.user?.id}`);
    res.json({ success: true, message: "Analytics cache cleared" });
  } catch (error) {
    console.error("Analytics clear cache error:", error);
    res.status(500).json({ error: "Failed to clear analytics cache" });
  }
});
router22.delete("/clear-data", requireAuth, async (req, res) => {
  try {
    if (req.user?.role !== "admin") {
      return res.status(403).json({ error: "Admin access required" });
    }
    console.log(`\u{1F5D1}\uFE0F Analytics data clear requested by admin: ${req.user?.id}`);
    await analyticsService.clearData();
    AuditLogger.logDataClear(
      req.user?.id || "unknown",
      getClientIP(req),
      req.get("User-Agent")
    );
    console.log(`\u{1F5D1}\uFE0F Analytics data cleared successfully by admin: ${req.user?.id}`);
    res.json({ success: true, message: "Analytics data cleared" });
  } catch (error) {
    console.error("Analytics clear data error:", error);
    res.status(500).json({ error: "Failed to clear analytics data" });
  }
});
router22.post("/aggregate", requireAuth, async (req, res) => {
  try {
    if (req.user?.role !== "admin") {
      return res.status(403).json({ error: "Admin access required" });
    }
    const { date } = req.body;
    const sanitizedDate = InputSanitizer.sanitizeString(date || "", 10);
    await analyticsScheduler.triggerAggregation(sanitizedDate || void 0);
    AuditLogger.logManualAggregation(
      req.user?.id || "unknown",
      sanitizedDate || "today",
      getClientIP(req),
      req.get("User-Agent")
    );
    console.log(`\u{1F4CA} Manual aggregation triggered by admin: ${req.user?.id}`);
    res.json({ success: true, message: "Aggregation completed" });
  } catch (error) {
    console.error("Analytics aggregation error:", error);
    res.status(500).json({ error: "Failed to aggregate analytics data" });
  }
});
router22.get("/realtime", requireAuth, analyticsLimiter, async (req, res) => {
  try {
    if (req.user?.role !== "admin") {
      return res.status(403).json({ error: "Admin access required" });
    }
    const realtimeStats = await analyticsService.getRealtimeStats();
    res.json(realtimeStats);
  } catch (error) {
    console.error("Real-time stats error:", error);
    res.status(500).json({ error: "Failed to get real-time stats" });
  }
});
router22.get("/export", requireAuth, analyticsLimiter, async (req, res) => {
  try {
    if (req.user?.role !== "admin") {
      AuditLogger.logAuthFailure(
        getClientIP(req),
        "Insufficient permissions for analytics export",
        req.get("User-Agent")
      );
      return res.status(403).json({ error: "Admin access required" });
    }
    const format = req.query.format || "csv";
    const days = parseInt(req.query.days) || 30;
    if (!["csv", "json"].includes(format)) {
      return res.status(400).json({ error: "Invalid format. Use 'csv' or 'json'" });
    }
    const exportResult = await analyticsExport.exportData({ format, days });
    AuditLogger.logAnalyticsEvent({
      userId: req.user?.id || "unknown",
      action: "EXPORT_ANALYTICS_DATA",
      resource: "analytics",
      details: { format, days },
      ipAddress: getClientIP(req),
      userAgent: req.get("User-Agent")
    });
    res.setHeader("Content-Type", exportResult.mimeType);
    res.setHeader("Content-Disposition", `attachment; filename="${exportResult.filename}"`);
    res.send(exportResult.data);
  } catch (error) {
    console.error("Analytics export error:", error);
    res.status(500).json({ error: "Failed to export analytics data" });
  }
});
router22.get("/retention-stats", requireAuth, analyticsLimiter, async (req, res) => {
  try {
    if (req.user?.role !== "admin") {
      return res.status(403).json({ error: "Admin access required" });
    }
    const stats = await analyticsCleanupService.getDataRetentionStats();
    res.json(stats);
  } catch (error) {
    console.error("Retention stats error:", error);
    res.status(500).json({ error: "Failed to get retention stats" });
  }
});
router22.post("/cleanup", requireAuth, async (req, res) => {
  try {
    if (req.user?.role !== "admin") {
      return res.status(403).json({ error: "Admin access required" });
    }
    const result = await analyticsCleanupService.cleanupOldData();
    AuditLogger.logAnalyticsEvent({
      userId: req.user?.id || "unknown",
      action: "MANUAL_CLEANUP",
      resource: "analytics",
      details: result,
      ipAddress: getClientIP(req),
      userAgent: req.get("User-Agent")
    });
    res.json({ success: true, result });
  } catch (error) {
    console.error("Manual cleanup error:", error);
    res.status(500).json({ error: "Failed to cleanup analytics data" });
  }
});
router22.get("/health", async (_req, res) => {
  res.json({
    status: "healthy",
    timestamp: (/* @__PURE__ */ new Date()).toISOString(),
    service: "analytics-ts",
    message: "Analytics system operational"
  });
});
console.log("\u2705 Analytics System Loaded Successfully (TS)");
var analytics_default = router22;

// server/api/documentation/index.ts
init_documentationService();
import { Router as Router31 } from "express";

// server/api/documentation/sections.ts
import { Router as Router23 } from "express";

// server/services/enhancedDocumentationService.ts
init_db();
import path10 from "path";
import fs9 from "fs/promises";
import { fileURLToPath } from "url";
import { dirname } from "path";
var __filename = fileURLToPath(import.meta.url);
var __dirname2 = dirname(__filename);
var EnhancedDocumentationService = class {
  constructor() {
    this.DOCS_PATH = path10.join(__dirname2, "../../client/src/plugins/texteditor/docs");
  }
  // ===== SECTIONS MANAGEMENT =====
  async getSectionsHierarchy() {
    const query = `
      SELECT * FROM documentation_sections 
      WHERE is_active = true 
      ORDER BY level, order_index, name
    `;
    const result = await pool.query(query);
    return this.buildSectionHierarchy(result.rows);
  }
  async getSectionsByLibrary(libraryType) {
    const query = `
      SELECT * FROM documentation_sections 
      WHERE library_type = $1 AND is_active = true
      ORDER BY level, order_index, name
    `;
    const result = await pool.query(query, [libraryType]);
    return this.buildSectionHierarchy(result.rows);
  }
  async createSection(data) {
    const query = `
      INSERT INTO documentation_sections (name, slug, description, parent_id, level, order_index, icon, library_type)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *
    `;
    const level = data.parent_id ? await this.calculateSectionLevel(data.parent_id) + 1 : 0;
    const result = await pool.query(query, [
      data.name,
      data.slug,
      data.description,
      data.parent_id,
      level,
      data.order_index || 0,
      data.icon,
      data.library_type || "texteditor"
    ]);
    return result.rows[0];
  }
  async updateSection(id, data) {
    const query = `
      UPDATE documentation_sections 
      SET name = $2, description = $3, icon = $4, order_index = $5, updated_at = NOW()
      WHERE id = $1
      RETURNING *
    `;
    const result = await pool.query(query, [
      id,
      data.name,
      data.description,
      data.icon,
      data.order_index
    ]);
    return result.rows[0];
  }
  async deleteSection(id) {
    const query = `DELETE FROM documentation_sections WHERE id = $1`;
    const result = await pool.query(query, [id]);
    return (result.rowCount ?? 0) > 0;
  }
  // ===== CONTENT MANAGEMENT =====
  async getContent() {
    const query = `
      SELECT * FROM documentation_content 
      ORDER BY section_id, order_index, title
    `;
    const result = await pool.query(query);
    return result.rows;
  }
  async getContentByLibrary(libraryType) {
    const query = `
      SELECT * FROM documentation_content 
      WHERE library_type = $1 AND is_published = true
      ORDER BY order_index, title
    `;
    const result = await pool.query(query, [libraryType]);
    return result.rows;
  }
  async getContentBySlug(slug) {
    const query = `SELECT * FROM documentation_content WHERE slug = $1`;
    const result = await pool.query(query, [slug]);
    return result.rows[0] || null;
  }
  async createContent(data) {
    const query = `
      INSERT INTO documentation_content 
      (title, slug, content, excerpt, section_id, parent_id, order_index, is_published, meta_title, meta_description, tags, library_type, created_by)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
      RETURNING *
    `;
    const result = await pool.query(query, [
      data.title,
      data.slug,
      data.content,
      data.excerpt,
      data.section_id,
      data.parent_id,
      data.order_index || 0,
      data.is_published || false,
      data.meta_title,
      data.meta_description,
      data.tags,
      data.library_type || "texteditor",
      data.created_by
    ]);
    return result.rows[0];
  }
  async updateContent(id, data) {
    const query = `
      UPDATE documentation_content 
      SET title = $2, content = $3, excerpt = $4, section_id = $5, is_published = $6, 
          meta_title = $7, meta_description = $8, tags = $9, updated_by = $10, updated_at = NOW()
      WHERE id = $1
      RETURNING *
    `;
    const result = await pool.query(query, [
      id,
      data.title,
      data.content,
      data.excerpt,
      data.section_id,
      data.is_published,
      data.meta_title,
      data.meta_description,
      data.tags,
      data.updated_by
    ]);
    return result.rows[0];
  }
  async deleteContent(id) {
    const query = `DELETE FROM documentation_content WHERE id = $1`;
    const result = await pool.query(query, [id]);
    return (result.rowCount ?? 0) > 0;
  }
  // ===== FILE SYSTEM INTEGRATION =====
  async scanDocsDirectory() {
    const files = [];
    try {
      await this.scanDirectoryRecursive(this.DOCS_PATH, "", files);
      for (const file of files) {
        await this.upsertFile(file);
      }
      return files;
    } catch (error) {
      console.error("Error scanning docs directory:", error);
      throw error;
    }
  }
  async getFileContent(filepath) {
    const fullPath = path10.join(this.DOCS_PATH, filepath);
    if (!fullPath.startsWith(this.DOCS_PATH)) {
      throw new Error("Invalid file path");
    }
    try {
      const content = await fs9.readFile(fullPath, "utf8");
      const stats = await fs9.stat(fullPath);
      return {
        content,
        metadata: {
          size: stats.size,
          lastModified: stats.mtime,
          type: path10.extname(filepath).slice(1)
        }
      };
    } catch (error) {
      throw new Error(`Failed to read file: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
  }
  async updateFile(filepath, content) {
    const fullPath = path10.join(this.DOCS_PATH, filepath);
    if (!fullPath.startsWith(this.DOCS_PATH)) {
      throw new Error("Invalid file path");
    }
    try {
      const backupPath = `${fullPath}.backup.${Date.now()}`;
      try {
        await fs9.copyFile(fullPath, backupPath);
      } catch {
      }
      await fs9.writeFile(fullPath, content, "utf8");
      await this.updateFileInDatabase(filepath, content);
    } catch (error) {
      throw new Error(`Failed to update file: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
  }
  // ===== SEARCH =====
  async searchContent(query, libraryType) {
    let searchQuery = `
      SELECT 
        c.id, c.title, c.slug, c.excerpt, c.library_type,
        s.name as section_name,
        ts_rank(si.search_vector, plainto_tsquery('russian', $1)) as rank
      FROM documentation_content c
      LEFT JOIN documentation_sections s ON c.section_id = s.id
      LEFT JOIN documentation_search_index si ON c.id = si.content_id
      WHERE si.search_vector @@ plainto_tsquery('russian', $1)
    `;
    const params = [query];
    if (libraryType) {
      searchQuery += ` AND c.library_type = $2`;
      params.push(libraryType);
    }
    searchQuery += ` ORDER BY rank DESC, c.title LIMIT 50`;
    const result = await pool.query(searchQuery, params);
    return result.rows;
  }
  // ===== LIBRARY MANAGEMENT =====
  async getLibraryStats(libraryType) {
    const statsQuery = `
      SELECT 
        (SELECT COUNT(*) FROM documentation_sections WHERE library_type = $1 AND is_active = true) as sections,
        (SELECT COUNT(*) FROM documentation_content WHERE library_type = $1) as content,
        (SELECT COUNT(*) FROM documentation_content WHERE library_type = $1 AND is_published = true) as published
    `;
    const result = await pool.query(statsQuery, [libraryType]);
    return result.rows[0];
  }
  async getAvailableLibraries() {
    const query = `
      SELECT DISTINCT library_type 
      FROM documentation_content 
      WHERE library_type IS NOT NULL
      ORDER BY library_type
    `;
    const result = await pool.query(query);
    return result.rows.map((row) => row.library_type);
  }
  // ===== PRIVATE HELPER METHODS =====
  buildSectionHierarchy(sections) {
    const sectionMap = /* @__PURE__ */ new Map();
    const rootSections = [];
    sections.forEach((section) => {
      section.children = [];
      sectionMap.set(section.id, section);
    });
    sections.forEach((section) => {
      if (section.parent_id) {
        const parent = sectionMap.get(section.parent_id);
        if (parent) {
          parent.children.push(section);
        }
      } else {
        rootSections.push(section);
      }
    });
    return rootSections;
  }
  async calculateSectionLevel(parentId) {
    const query = `SELECT level FROM documentation_sections WHERE id = $1`;
    const result = await pool.query(query, [parentId]);
    return result.rows[0]?.level || 0;
  }
  async scanDirectoryRecursive(dirPath, relativePath, files) {
    const entries = await fs9.readdir(dirPath, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path10.join(dirPath, entry.name);
      const relativeFilePath = path10.join(relativePath, entry.name);
      if (entry.isDirectory()) {
        await this.scanDirectoryRecursive(fullPath, relativeFilePath, files);
      } else {
        const stats = await fs9.stat(fullPath);
        const fileType = path10.extname(entry.name).slice(1).toLowerCase();
        if (["md", "txt", "html", "pdf", "doc", "docx"].includes(fileType)) {
          files.push({
            id: "",
            // Will be set by database
            filename: entry.name,
            filepath: relativeFilePath.replace(/\\/g, "/"),
            // Normalize path separators
            file_type: fileType,
            file_size: stats.size,
            is_synced: false,
            last_modified: stats.mtime
          });
        }
      }
    }
  }
  async upsertFile(file) {
    const query = `
      INSERT INTO documentation_files (filename, filepath, file_type, file_size, last_modified)
      VALUES ($1, $2, $3, $4, $5)
      ON CONFLICT (filepath) DO UPDATE SET
        filename = EXCLUDED.filename,
        file_type = EXCLUDED.file_type,
        file_size = EXCLUDED.file_size,
        last_modified = EXCLUDED.last_modified,
        updated_at = NOW()
    `;
    await pool.query(query, [
      file.filename,
      file.filepath,
      file.file_type,
      file.file_size,
      file.last_modified
    ]);
  }
  async updateFileInDatabase(filepath, content) {
    const query = `
      UPDATE documentation_files 
      SET content = $2, is_synced = true, updated_at = NOW()
      WHERE filepath = $1
    `;
    await pool.query(query, [filepath, content]);
  }
};
var enhancedDocumentationService = new EnhancedDocumentationService();

// server/api/documentation/sections.ts
var router23 = Router23();
router23.get("/", async (_req, res) => {
  try {
    console.log("\u{1F4DA} Sections endpoint called");
    const sections = await enhancedDocumentationService.getSectionsHierarchy();
    console.log("\u{1F4DA} Sections loaded from database:", sections.length);
    res.json(sections);
  } catch (error) {
    console.error("\u{1F4DA} Error fetching sections from database:", error);
    const mockSections = [
      {
        id: "1",
        name: "Getting Started",
        slug: "getting-started",
        description: "Introduction and setup guides",
        level: 0,
        order_index: 0,
        is_active: true,
        children: []
      },
      {
        id: "2",
        name: "API Reference",
        slug: "api-reference",
        description: "Complete API documentation",
        level: 0,
        order_index: 1,
        is_active: true,
        children: []
      },
      {
        id: "3",
        name: "Examples",
        slug: "examples",
        description: "Code examples and tutorials",
        level: 0,
        order_index: 2,
        is_active: true,
        children: []
      }
    ];
    console.log("\u{1F4DA} Returning mock sections:", mockSections.length);
    res.json(mockSections);
  }
});
router23.post("/", requireAdmin, async (req, res) => {
  try {
    const { name, slug, description, parent_id, icon, order_index } = req.body;
    if (!name || !slug) {
      return res.status(400).json({ error: "Name and slug are required" });
    }
    const section = await enhancedDocumentationService.createSection({
      name,
      slug,
      description,
      parent_id,
      icon,
      order_index
    });
    res.status(201).json(section);
  } catch (error) {
    console.error("Error creating section:", error);
    if (error && typeof error === "object" && "code" in error && error.code === "23505") {
      res.status(409).json({ error: "Section with this slug already exists" });
    } else {
      res.status(500).json({ error: "Failed to create section" });
    }
  }
});
router23.put("/:id", requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, icon, order_index } = req.body;
    const section = await enhancedDocumentationService.updateSection(id, {
      name,
      description,
      icon,
      order_index
    });
    if (!section) {
      return res.status(404).json({ error: "Section not found" });
    }
    res.json(section);
  } catch (error) {
    console.error("Error updating section:", error);
    res.status(500).json({ error: "Failed to update section" });
  }
});
router23.delete("/:id", requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const success = await enhancedDocumentationService.deleteSection(id);
    if (!success) {
      return res.status(404).json({ error: "Section not found" });
    }
    res.json({ message: "Section deleted successfully" });
  } catch (error) {
    console.error("Error deleting section:", error);
    res.status(500).json({ error: "Failed to delete section" });
  }
});
router23.post("/reorder", requireAdmin, async (req, res) => {
  try {
    const { sections } = req.body;
    if (!Array.isArray(sections)) {
      return res.status(400).json({ error: "Sections array is required" });
    }
    for (const section of sections) {
      await enhancedDocumentationService.updateSection(section.id, {
        order_index: section.order_index
      });
    }
    res.json({ message: "Sections reordered successfully" });
  } catch (error) {
    console.error("Error reordering sections:", error);
    res.status(500).json({ error: "Failed to reorder sections" });
  }
});
var sections_default = router23;

// server/api/documentation/content.ts
import { Router as Router24 } from "express";
var router24 = Router24();
router24.get("/", async (_req, res) => {
  try {
    const content = await enhancedDocumentationService.getContent();
    res.json(content);
  } catch (error) {
    console.error("Error fetching content:", error);
    res.status(500).json({ error: "Failed to fetch content" });
  }
});
router24.get("/:slug", async (req, res) => {
  try {
    const { slug } = req.params;
    const content = await enhancedDocumentationService.getContentBySlug(slug);
    if (!content) {
      return res.status(404).json({ error: "Content not found" });
    }
    res.json(content);
  } catch (error) {
    console.error("Error fetching content by slug:", error);
    res.status(500).json({ error: "Failed to fetch content" });
  }
});
router24.post("/", requireAdmin, async (req, res) => {
  try {
    const {
      title,
      slug,
      content,
      excerpt,
      section_id,
      parent_id,
      order_index,
      is_published,
      meta_title,
      meta_description,
      tags
    } = req.body;
    if (!title || !slug || !content) {
      return res.status(400).json({ error: "Title, slug, and content are required" });
    }
    const newContent = await enhancedDocumentationService.createContent({
      title,
      slug,
      content,
      excerpt,
      section_id,
      parent_id,
      order_index,
      is_published,
      meta_title,
      meta_description,
      tags,
      created_by: req.user?.id || "admin"
    });
    res.status(201).json(newContent);
  } catch (error) {
    console.error("Error creating content:", error);
    if (error && typeof error === "object" && "code" in error && error.code === "23505") {
      res.status(409).json({ error: "Content with this slug already exists" });
    } else {
      res.status(500).json({ error: "Failed to create content" });
    }
  }
});
router24.put("/:id", requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      content,
      excerpt,
      section_id,
      is_published,
      meta_title,
      meta_description,
      tags
    } = req.body;
    const updatedContent = await enhancedDocumentationService.updateContent(id, {
      title,
      content,
      excerpt,
      section_id,
      is_published,
      meta_title,
      meta_description,
      tags,
      updated_by: req.user?.id || "admin"
    });
    if (!updatedContent) {
      return res.status(404).json({ error: "Content not found" });
    }
    res.json(updatedContent);
  } catch (error) {
    console.error("Error updating content:", error);
    res.status(500).json({ error: "Failed to update content" });
  }
});
router24.delete("/:id", requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const success = await enhancedDocumentationService.deleteContent(id);
    if (!success) {
      return res.status(404).json({ error: "Content not found" });
    }
    res.json({ message: "Content deleted successfully" });
  } catch (error) {
    console.error("Error deleting content:", error);
    res.status(500).json({ error: "Failed to delete content" });
  }
});
router24.post("/reorder", requireAdmin, async (req, res) => {
  try {
    const { content } = req.body;
    if (!Array.isArray(content)) {
      return res.status(400).json({ error: "Content array is required" });
    }
    for (const item of content) {
      await enhancedDocumentationService.updateContent(item.id, {
        order_index: item.order_index
      });
    }
    res.json({ message: "Content reordered successfully" });
  } catch (error) {
    console.error("Error reordering content:", error);
    res.status(500).json({ error: "Failed to reorder content" });
  }
});
var content_default = router24;

// server/api/documentation/menu.ts
import { Router as Router25 } from "express";
init_db();
var router25 = Router25();
router25.get("/", async (_req, res) => {
  try {
    const query = `
      SELECT * FROM documentation_menu 
      WHERE is_active = true 
      ORDER BY level, order_index, title
    `;
    const result = await pool.query(query);
    const menuItems2 = buildMenuHierarchy(result.rows);
    res.json(menuItems2);
  } catch (error) {
    console.error("Error fetching menu:", error);
    res.status(500).json({ error: "Failed to fetch menu" });
  }
});
router25.post("/", requireAdmin, async (req, res) => {
  try {
    const {
      title,
      url,
      content_id,
      section_id,
      parent_id,
      order_index,
      icon,
      target
    } = req.body;
    if (!title) {
      return res.status(400).json({ error: "Title is required" });
    }
    const level = parent_id ? await calculateMenuLevel(parent_id) + 1 : 0;
    const query = `
      INSERT INTO documentation_menu 
      (title, url, content_id, section_id, parent_id, level, order_index, icon, target)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING *
    `;
    const result = await pool.query(query, [
      title,
      url,
      content_id,
      section_id,
      parent_id,
      level,
      order_index || 0,
      icon,
      target || "_self"
    ]);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error creating menu item:", error);
    res.status(500).json({ error: "Failed to create menu item" });
  }
});
router25.put("/:id", requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, url, icon, order_index, target, is_active } = req.body;
    const query = `
      UPDATE documentation_menu 
      SET title = $2, url = $3, icon = $4, order_index = $5, target = $6, is_active = $7
      WHERE id = $1
      RETURNING *
    `;
    const result = await pool.query(query, [
      id,
      title,
      url,
      icon,
      order_index,
      target,
      is_active
    ]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Menu item not found" });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error updating menu item:", error);
    res.status(500).json({ error: "Failed to update menu item" });
  }
});
router25.delete("/:id", requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const query = `DELETE FROM documentation_menu WHERE id = $1`;
    const result = await pool.query(query, [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Menu item not found" });
    }
    res.json({ message: "Menu item deleted successfully" });
  } catch (error) {
    console.error("Error deleting menu item:", error);
    res.status(500).json({ error: "Failed to delete menu item" });
  }
});
router25.post("/reorder", requireAdmin, async (req, res) => {
  try {
    const { items } = req.body;
    if (!Array.isArray(items)) {
      return res.status(400).json({ error: "Items array is required" });
    }
    for (const item of items) {
      const query = `
        UPDATE documentation_menu 
        SET order_index = $2, parent_id = $3, level = $4
        WHERE id = $1
      `;
      await pool.query(query, [
        item.id,
        item.order_index,
        item.parent_id,
        item.level
      ]);
    }
    res.json({ message: "Menu items reordered successfully" });
  } catch (error) {
    console.error("Error reordering menu items:", error);
    res.status(500).json({ error: "Failed to reorder menu items" });
  }
});
function buildMenuHierarchy(menuItems2) {
  const itemMap = /* @__PURE__ */ new Map();
  const rootItems = [];
  menuItems2.forEach((item) => {
    item.children = [];
    itemMap.set(item.id, item);
  });
  menuItems2.forEach((item) => {
    if (item.parent_id) {
      const parent = itemMap.get(item.parent_id);
      if (parent) {
        parent.children.push(item);
      }
    } else {
      rootItems.push(item);
    }
  });
  return rootItems;
}
async function calculateMenuLevel(parentId) {
  const query = `SELECT level FROM documentation_menu WHERE id = $1`;
  const result = await pool.query(query, [parentId]);
  return result.rows[0]?.level || 0;
}
var menu_default = router25;

// server/api/documentation/search.ts
import { Router as Router26 } from "express";
init_db();
var router26 = Router26();
router26.get("/", async (req, res) => {
  try {
    const { q: query, lang = "en", limit = 10 } = req.query;
    if (!query || typeof query !== "string") {
      return res.status(400).json({ error: "Search query is required" });
    }
    const { searchService: searchService2 } = await Promise.resolve().then(() => (init_searchService(), searchService_exports));
    const results = await searchService2.searchDocumentation(
      query,
      lang,
      parseInt(limit)
    );
    res.json({
      results,
      total: results.length,
      query,
      language: lang
    });
  } catch (error) {
    console.error("Documentation search error:", error);
    res.status(500).json({ error: "Documentation search failed" });
  }
});
router26.get("/suggestions", async (req, res) => {
  try {
    const { q: query } = req.query;
    if (!query || typeof query !== "string" || query.length < 2) {
      return res.json({ suggestions: [] });
    }
    const suggestionQuery = `
      SELECT DISTINCT 
        title,
        'content' as type
      FROM documentation_content 
      WHERE title ILIKE $1 
        AND is_published = true
      UNION
      SELECT DISTINCT 
        filename as title,
        'file' as type
      FROM documentation_files 
      WHERE filename ILIKE $1
        AND is_synced = true
      ORDER BY title
      LIMIT 10
    `;
    const result = await pool.query(suggestionQuery, [`%${query}%`]);
    res.json({
      suggestions: result.rows
    });
  } catch (error) {
    console.error("Error getting search suggestions:", error);
    res.status(500).json({ error: "Failed to get suggestions" });
  }
});
router26.post("/index/rebuild", requireAdmin, async (_req, res) => {
  try {
    await pool.query("DELETE FROM documentation_search_index");
    const rebuildQuery = `
      INSERT INTO documentation_search_index (content_id, title, content_text, search_vector)
      SELECT 
        id,
        title,
        content,
        to_tsvector('russian', title || ' ' || content)
      FROM documentation_content
      WHERE is_published = true
    `;
    await pool.query(rebuildQuery);
    const countResult = await pool.query("SELECT COUNT(*) FROM documentation_search_index");
    const indexedCount = countResult.rows[0].count;
    res.json({
      message: "Search index rebuilt successfully",
      indexedItems: parseInt(indexedCount)
    });
  } catch (error) {
    console.error("Error rebuilding search index:", error);
    res.status(500).json({ error: "Failed to rebuild search index" });
  }
});
router26.get("/stats", requireAdmin, async (_req, res) => {
  try {
    const statsQuery = `
      SELECT 
        (SELECT COUNT(*) FROM documentation_content WHERE is_published = true) as published_content,
        (SELECT COUNT(*) FROM documentation_files WHERE is_synced = true) as synced_files,
        (SELECT COUNT(*) FROM documentation_search_index) as indexed_items,
        (SELECT COUNT(DISTINCT section_id) FROM documentation_content WHERE section_id IS NOT NULL) as sections_with_content
    `;
    const result = await pool.query(statsQuery);
    res.json({
      stats: result.rows[0]
    });
  } catch (error) {
    console.error("Error getting search stats:", error);
    res.status(500).json({ error: "Failed to get search statistics" });
  }
});
var search_default = router26;

// server/api/documentation/conversion.ts
import { Router as Router27 } from "express";

// server/services/documentConverter.ts
init_db();
var DocumentConverter = class {
  constructor() {
    this.supportedFormats = [
      {
        extension: "md",
        name: "Markdown",
        mimeType: "text/markdown",
        canConvertTo: ["html", "txt", "pdf"],
        canConvertFrom: ["txt", "html"]
      },
      {
        extension: "html",
        name: "HTML",
        mimeType: "text/html",
        canConvertTo: ["md", "txt", "pdf"],
        canConvertFrom: ["md", "txt"]
      },
      {
        extension: "txt",
        name: "Plain Text",
        mimeType: "text/plain",
        canConvertTo: ["md", "html", "pdf"],
        canConvertFrom: ["md", "html", "pdf", "doc", "docx"]
      },
      {
        extension: "pdf",
        name: "PDF Document",
        mimeType: "application/pdf",
        canConvertTo: ["txt", "md", "html"],
        canConvertFrom: ["txt", "md", "html"]
      },
      {
        extension: "doc",
        name: "Word Document",
        mimeType: "application/msword",
        canConvertTo: ["txt", "md", "html", "pdf"],
        canConvertFrom: ["txt", "md", "html"]
      },
      {
        extension: "docx",
        name: "Word Document (Modern)",
        mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        canConvertTo: ["txt", "md", "html", "pdf"],
        canConvertFrom: ["txt", "md", "html"]
      }
    ];
  }
  /**
   * Get supported formats
   */
  getSupportedFormats() {
    return this.supportedFormats;
  }
  /**
   * Check if conversion is supported
   */
  isConversionSupported(fromFormat, toFormat) {
    const format = this.supportedFormats.find((f) => f.extension === fromFormat);
    return format ? format.canConvertTo.includes(toFormat) : false;
  }
  /**
   * Convert document
   */
  async convertDocument(sourceFileId, targetFormat, sourceContent) {
    try {
      const fileQuery = `SELECT * FROM documentation_files WHERE id = $1`;
      const fileResult = await pool.query(fileQuery, [sourceFileId]);
      if (fileResult.rows.length === 0) {
        throw new Error("Source file not found");
      }
      const sourceFile = fileResult.rows[0];
      const sourceFormat = sourceFile.file_type;
      if (!this.isConversionSupported(sourceFormat, targetFormat)) {
        throw new Error(`Conversion from ${sourceFormat} to ${targetFormat} not supported`);
      }
      const conversionId = await this.createConversionRecord(
        sourceFileId,
        sourceFormat,
        targetFormat
      );
      this.performConversion(
        conversionId,
        sourceContent || sourceFile.content || "",
        sourceFormat,
        targetFormat
      ).catch((error) => {
        console.error("Conversion failed:", error);
        this.updateConversionStatus(conversionId, "failed", error instanceof Error ? error.message : "Unknown error");
      });
      return {
        conversionId,
        status: "pending",
        message: "Conversion started"
      };
    } catch (error) {
      throw new Error(`Conversion failed: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
  }
  /**
   * Get conversion status
   */
  async getConversionStatus(conversionId) {
    const query = `
      SELECT 
        id,
        source_format,
        target_format,
        conversion_status,
        error_message,
        created_at,
        completed_at
      FROM documentation_conversions 
      WHERE id = $1
    `;
    const result = await pool.query(query, [conversionId]);
    if (result.rows.length === 0) {
      throw new Error("Conversion not found");
    }
    return result.rows[0];
  }
  /**
   * Get converted content
   */
  async getConvertedContent(conversionId) {
    const query = `
      SELECT converted_content, conversion_status 
      FROM documentation_conversions 
      WHERE id = $1
    `;
    const result = await pool.query(query, [conversionId]);
    if (result.rows.length === 0) {
      throw new Error("Conversion not found");
    }
    const conversion = result.rows[0];
    if (conversion.conversion_status !== "completed") {
      throw new Error("Conversion not completed");
    }
    return conversion.converted_content;
  }
  /**
   * Perform the actual conversion
   */
  async performConversion(conversionId, content, fromFormat, toFormat) {
    try {
      let convertedContent;
      switch (`${fromFormat}->${toFormat}`) {
        case "md->html":
          convertedContent = this.markdownToHtml(content);
          break;
        case "html->md":
          convertedContent = this.htmlToMarkdown(content);
          break;
        case "txt->md":
          convertedContent = this.textToMarkdown(content);
          break;
        case "md->txt":
          convertedContent = this.markdownToText(content);
          break;
        case "html->txt":
          convertedContent = this.htmlToText(content);
          break;
        case "txt->html":
          convertedContent = this.textToHtml(content);
          break;
        default:
          convertedContent = this.stripFormatting(content);
      }
      await this.updateConversionResult(conversionId, convertedContent, "completed");
    } catch (error) {
      await this.updateConversionStatus(conversionId, "failed", error instanceof Error ? error.message : "Unknown error");
    }
  }
  /**
   * Simple conversion methods (basic implementations)
   */
  markdownToHtml(markdown) {
    return markdown.replace(/^# (.*$)/gim, "<h1>$1</h1>").replace(/^## (.*$)/gim, "<h2>$1</h2>").replace(/^### (.*$)/gim, "<h3>$1</h3>").replace(/\*\*(.*)\*\*/gim, "<strong>$1</strong>").replace(/\*(.*)\*/gim, "<em>$1</em>").replace(/\n/gim, "<br>");
  }
  htmlToMarkdown(html) {
    return html.replace(/<h1>(.*?)<\/h1>/gim, "# $1\n").replace(/<h2>(.*?)<\/h2>/gim, "## $1\n").replace(/<h3>(.*?)<\/h3>/gim, "### $1\n").replace(/<strong>(.*?)<\/strong>/gim, "**$1**").replace(/<em>(.*?)<\/em>/gim, "*$1*").replace(/<br\s*\/?>/gim, "\n").replace(/<[^>]*>/gim, "");
  }
  textToMarkdown(text2) {
    return text2.split("\n").map((line) => line.trim()).filter((line) => line.length > 0).map((line) => {
      if (line.length < 50 && !line.includes(".")) {
        return `## ${line}`;
      }
      return line;
    }).join("\n\n");
  }
  markdownToText(markdown) {
    return markdown.replace(/^#+\s*/gm, "").replace(/\*\*(.*?)\*\*/g, "$1").replace(/\*(.*?)\*/g, "$1").replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").trim();
  }
  htmlToText(html) {
    return html.replace(/<[^>]*>/g, "").replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").trim();
  }
  textToHtml(text2) {
    return text2.split("\n").map((line) => `<p>${line}</p>`).join("\n");
  }
  stripFormatting(content) {
    return content.replace(/<[^>]*>/g, "").replace(/[#*_`]/g, "").trim();
  }
  /**
   * Database helper methods
   */
  async createConversionRecord(sourceFileId, sourceFormat, targetFormat) {
    const query = `
      INSERT INTO documentation_conversions 
      (source_file_id, source_format, target_format)
      VALUES ($1, $2, $3)
      RETURNING id
    `;
    const result = await pool.query(query, [sourceFileId, sourceFormat, targetFormat]);
    return result.rows[0].id;
  }
  async updateConversionResult(conversionId, content, status) {
    const query = `
      UPDATE documentation_conversions 
      SET converted_content = $2, conversion_status = $3, completed_at = NOW()
      WHERE id = $1
    `;
    await pool.query(query, [conversionId, content, status]);
  }
  async updateConversionStatus(conversionId, status, errorMessage) {
    const query = `
      UPDATE documentation_conversions 
      SET conversion_status = $2, error_message = $3, completed_at = NOW()
      WHERE id = $1
    `;
    await pool.query(query, [conversionId, status, errorMessage]);
  }
};
var documentConverter = new DocumentConverter();

// server/api/documentation/conversion.ts
var router27 = Router27();
router27.get("/formats", async (_req, res) => {
  try {
    const formats = documentConverter.getSupportedFormats();
    res.json({ formats });
  } catch (error) {
    console.error("Error getting supported formats:", error);
    res.status(500).json({ error: "Failed to get supported formats" });
  }
});
router27.post("/", requireAdmin, async (req, res) => {
  try {
    const { sourceFileId, targetFormat, sourceContent } = req.body;
    if (!sourceFileId || !targetFormat) {
      return res.status(400).json({
        error: "Source file ID and target format are required"
      });
    }
    const result = await documentConverter.convertDocument(
      sourceFileId,
      targetFormat,
      sourceContent
    );
    res.status(202).json(result);
  } catch (error) {
    console.error("Error starting conversion:", error);
    res.status(500).json({ error: error instanceof Error ? error.message : "Conversion failed" });
  }
});
router27.get("/:id/status", async (req, res) => {
  try {
    const { id } = req.params;
    const status = await documentConverter.getConversionStatus(id);
    res.json(status);
  } catch (error) {
    console.error("Error getting conversion status:", error);
    if (error instanceof Error && error.message.includes("not found")) {
      res.status(404).json({ error: "Conversion not found" });
    } else {
      res.status(500).json({ error: "Failed to get conversion status" });
    }
  }
});
router27.get("/:id/download", async (req, res) => {
  try {
    const { id } = req.params;
    const content = await documentConverter.getConvertedContent(id);
    const status = await documentConverter.getConversionStatus(id);
    const filename = `converted.${status.target_format}`;
    const mimeTypes = {
      "txt": "text/plain",
      "md": "text/markdown",
      "html": "text/html",
      "pdf": "application/pdf",
      "doc": "application/msword",
      "docx": "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    };
    res.setHeader("Content-Type", mimeTypes[status.target_format] || "text/plain");
    res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
    res.send(content);
  } catch (error) {
    console.error("Error downloading converted document:", error);
    if (error instanceof Error && error.message.includes("not found")) {
      res.status(404).json({ error: "Conversion not found" });
    } else if (error instanceof Error && error.message.includes("not completed")) {
      res.status(409).json({ error: "Conversion not completed yet" });
    } else {
      res.status(500).json({ error: "Failed to download converted document" });
    }
  }
});
router27.get("/history", requireAdmin, async (req, res) => {
  try {
    const { limit = 50, offset = 0 } = req.query;
    const query = `
      SELECT 
        c.id,
        c.source_format,
        c.target_format,
        c.conversion_status,
        c.created_at,
        c.completed_at,
        f.filename,
        f.filepath
      FROM documentation_conversions c
      LEFT JOIN documentation_files f ON c.source_file_id = f.id
      ORDER BY c.created_at DESC
      LIMIT $1 OFFSET $2
    `;
    const { pool: pool2 } = await Promise.resolve().then(() => (init_db(), db_exports));
    const result = await pool2.query(query, [
      parseInt(limit),
      parseInt(offset)
    ]);
    res.json({
      conversions: result.rows,
      total: result.rows.length
    });
  } catch (error) {
    console.error("Error getting conversion history:", error);
    res.status(500).json({ error: "Failed to get conversion history" });
  }
});
router27.delete("/:id", requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { pool: pool2 } = await Promise.resolve().then(() => (init_db(), db_exports));
    const query = `DELETE FROM documentation_conversions WHERE id = $1`;
    const result = await pool2.query(query, [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Conversion not found" });
    }
    res.json({ message: "Conversion record deleted successfully" });
  } catch (error) {
    console.error("Error deleting conversion:", error);
    res.status(500).json({ error: "Failed to delete conversion record" });
  }
});
var conversion_default = router27;

// server/api/documentation/analytics.ts
import express from "express";

// server/services/documentation/SearchAnalyticsService.js
init_db();
var SearchAnalyticsService = class {
  /**
   * Track search query
   */
  async trackSearch(query, userId, resultsCount, filters = {}) {
    try {
      await pool.query(`
        INSERT INTO documentation_search_analytics 
        (query, user_id, results_count, filters, created_at)
        VALUES ($1, $2, $3, $4, NOW())
      `, [query, userId, resultsCount, JSON.stringify(filters)]);
    } catch (error) {
      console.error("Failed to track search:", error);
    }
  }
  /**
   * Get popular search terms
   */
  async getPopularSearches(limit = 10, timeframe = "30 days") {
    const result = await pool.query(`
      SELECT 
        query,
        COUNT(*) as search_count,
        AVG(results_count) as avg_results,
        MAX(created_at) as last_searched
      FROM documentation_search_analytics 
      WHERE created_at >= NOW() - INTERVAL '${timeframe}'
        AND query IS NOT NULL 
        AND query != ''
      GROUP BY query
      ORDER BY search_count DESC, last_searched DESC
      LIMIT $1
    `, [limit]);
    return result.rows;
  }
  /**
   * Get search trends over time
   */
  async getSearchTrends(days = 30) {
    const result = await pool.query(`
      SELECT 
        DATE(created_at) as search_date,
        COUNT(*) as search_count,
        COUNT(DISTINCT query) as unique_queries,
        AVG(results_count) as avg_results
      FROM documentation_search_analytics 
      WHERE created_at >= NOW() - INTERVAL '${days} days'
      GROUP BY DATE(created_at)
      ORDER BY search_date DESC
    `);
    return result.rows;
  }
  /**
   * Get zero-result searches (queries that returned no results)
   */
  async getZeroResultSearches(limit = 20) {
    const result = await pool.query(`
      SELECT 
        query,
        COUNT(*) as frequency,
        MAX(created_at) as last_searched
      FROM documentation_search_analytics 
      WHERE results_count = 0
        AND query IS NOT NULL 
        AND query != ''
      GROUP BY query
      ORDER BY frequency DESC, last_searched DESC
      LIMIT $1
    `, [limit]);
    return result.rows;
  }
  /**
   * Get search performance metrics
   */
  async getSearchMetrics(timeframe = "7 days") {
    const result = await pool.query(`
      SELECT 
        COUNT(*) as total_searches,
        COUNT(DISTINCT query) as unique_queries,
        COUNT(DISTINCT user_id) as unique_users,
        AVG(results_count) as avg_results_per_search,
        COUNT(CASE WHEN results_count = 0 THEN 1 END) as zero_result_searches,
        COUNT(CASE WHEN results_count > 0 THEN 1 END) as successful_searches
      FROM documentation_search_analytics 
      WHERE created_at >= NOW() - INTERVAL '${timeframe}'
    `);
    const metrics = result.rows[0];
    const totalSearches = parseInt(metrics.total_searches);
    const successfulSearches = parseInt(metrics.successful_searches);
    const successRate = totalSearches > 0 ? successfulSearches / totalSearches * 100 : 0;
    return {
      ...metrics,
      success_rate: Math.round(successRate * 100) / 100,
      timeframe
    };
  }
  /**
   * Get most searched content
   */
  async getMostSearchedContent(limit = 10) {
    const result = await pool.query(`
      SELECT 
        c.id,
        c.title,
        c.slug,
        c.section_id,
        s.name as section_name,
        COUNT(sa.id) as search_mentions
      FROM documentation_content c
      LEFT JOIN documentation_sections s ON c.section_id = s.id
      LEFT JOIN documentation_search_analytics sa ON (
        sa.query ILIKE '%' || c.title || '%' OR
        c.title ILIKE '%' || sa.query || '%'
      )
      WHERE c.is_published = true
      GROUP BY c.id, c.title, c.slug, c.section_id, s.name
      HAVING COUNT(sa.id) > 0
      ORDER BY search_mentions DESC
      LIMIT $1
    `, [limit]);
    return result.rows;
  }
  /**
   * Get search suggestions based on analytics
   */
  async getSearchSuggestions(partialQuery, limit = 5) {
    const result = await pool.query(`
      SELECT DISTINCT 
        query,
        search_count,
        avg_results
      FROM (
        SELECT 
          query,
          COUNT(*) as search_count,
          AVG(results_count) as avg_results
        FROM documentation_search_analytics 
        WHERE query ILIKE $1
          AND results_count > 0
          AND created_at >= NOW() - INTERVAL '90 days'
        GROUP BY query
      ) popular_queries
      ORDER BY search_count DESC, avg_results DESC
      LIMIT $2
    `, [`%${partialQuery}%`, limit]);
    return result.rows;
  }
  /**
   * Clean old analytics data
   */
  async cleanupOldData(retentionDays = 365) {
    const result = await pool.query(`
      DELETE FROM documentation_search_analytics 
      WHERE created_at < NOW() - INTERVAL '${retentionDays} days'
    `);
    return {
      deleted_records: result.rowCount,
      retention_days: retentionDays
    };
  }
};
var SearchAnalyticsService_default = SearchAnalyticsService;

// server/api/documentation/analytics.ts
var router28 = express.Router();
var analyticsService2 = new SearchAnalyticsService_default();
router28.get("/popular", requireAuth, async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const timeframe = req.query.timeframe || "30 days";
    const popularSearches = await analyticsService2.getPopularSearches(limit, timeframe);
    res.json({
      popular_searches: popularSearches,
      timeframe,
      total: popularSearches.length
    });
  } catch (error) {
    console.error("Error getting popular searches:", error);
    res.status(500).json({ error: "Failed to get popular searches" });
  }
});
router28.get("/trends", requireAuth, async (req, res) => {
  try {
    const days = parseInt(req.query.days) || 30;
    const trends = await analyticsService2.getSearchTrends(days);
    res.json({
      trends,
      period_days: days,
      total_days: trends.length
    });
  } catch (error) {
    console.error("Error getting search trends:", error);
    res.status(500).json({ error: "Failed to get search trends" });
  }
});
router28.get("/metrics", requireAuth, async (req, res) => {
  try {
    const timeframe = req.query.timeframe || "7 days";
    const metrics = await analyticsService2.getSearchMetrics(timeframe);
    res.json(metrics);
  } catch (error) {
    console.error("Error getting search metrics:", error);
    res.status(500).json({ error: "Failed to get search metrics" });
  }
});
router28.get("/zero-results", requireAuth, async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 20;
    const zeroResults = await analyticsService2.getZeroResultSearches(limit);
    res.json({
      zero_result_searches: zeroResults,
      total: zeroResults.length,
      description: "Queries that returned no results - potential content gaps"
    });
  } catch (error) {
    console.error("Error getting zero-result searches:", error);
    res.status(500).json({ error: "Failed to get zero-result searches" });
  }
});
router28.get("/content", requireAuth, async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const mostSearched = await analyticsService2.getMostSearchedContent(limit);
    res.json({
      most_searched_content: mostSearched,
      total: mostSearched.length
    });
  } catch (error) {
    console.error("Error getting most searched content:", error);
    res.status(500).json({ error: "Failed to get most searched content" });
  }
});
router28.get("/suggestions", async (req, res) => {
  try {
    const { q: query } = req.query;
    const limit = parseInt(req.query.limit) || 5;
    if (!query || query.length < 2) {
      return res.json([]);
    }
    const suggestions = await analyticsService2.getSearchSuggestions(query, limit);
    res.json(suggestions);
  } catch (error) {
    console.error("Error getting analytics-based suggestions:", error);
    res.status(500).json({ error: "Failed to get suggestions" });
  }
});
router28.post("/cleanup", requireAuth, async (req, res) => {
  try {
    const retentionDays = parseInt(req.body.retention_days) || 365;
    const result = await analyticsService2.cleanupOldData(retentionDays);
    res.json({
      message: "Analytics data cleanup completed",
      ...result
    });
  } catch (error) {
    console.error("Error cleaning up analytics data:", error);
    res.status(500).json({ error: "Failed to cleanup analytics data" });
  }
});
router28.get("/dashboard", requireAuth, async (_, res) => {
  try {
    const [
      metrics,
      popularSearches,
      trends,
      zeroResults,
      mostSearchedContent
    ] = await Promise.all([
      analyticsService2.getSearchMetrics("7 days"),
      analyticsService2.getPopularSearches(5, "30 days"),
      analyticsService2.getSearchTrends(7),
      analyticsService2.getZeroResultSearches(5),
      analyticsService2.getMostSearchedContent(5)
    ]);
    res.json({
      overview: metrics,
      popular_searches: popularSearches,
      recent_trends: trends,
      zero_result_searches: zeroResults,
      most_searched_content: mostSearchedContent,
      generated_at: (/* @__PURE__ */ new Date()).toISOString()
    });
  } catch (error) {
    console.error("Error getting analytics dashboard:", error);
    res.status(500).json({ error: "Failed to get analytics dashboard" });
  }
});
var analytics_default2 = router28;

// server/api/documentation/public.ts
import { Router as Router28 } from "express";
var router29 = Router28();
router29.get("/sections/:libraryType", async (req, res) => {
  try {
    const { libraryType } = req.params;
    if (!["texteditor", "website"].includes(libraryType)) {
      return res.status(400).json({
        error: 'Invalid library type. Must be "texteditor" or "website"'
      });
    }
    const sections = await enhancedDocumentationService.getSectionsByLibrary(libraryType);
    res.json(sections);
  } catch (error) {
    console.error("Error loading sections:", error);
    res.status(500).json({
      error: "Failed to load sections",
      message: error instanceof Error ? error.message : "Unknown error"
    });
  }
});
router29.get("/content/:libraryType", async (req, res) => {
  try {
    const { libraryType } = req.params;
    if (!["texteditor", "website"].includes(libraryType)) {
      return res.status(400).json({
        error: 'Invalid library type. Must be "texteditor" or "website"'
      });
    }
    const content = await enhancedDocumentationService.getContentByLibrary(libraryType);
    res.json(content);
  } catch (error) {
    console.error("Error loading content:", error);
    res.status(500).json({
      error: "Failed to load content",
      message: error instanceof Error ? error.message : "Unknown error"
    });
  }
});
router29.get("/content/:libraryType/:slug", async (req, res) => {
  try {
    const { libraryType, slug } = req.params;
    if (!["texteditor", "website"].includes(libraryType)) {
      return res.status(400).json({
        error: 'Invalid library type. Must be "texteditor" or "website"'
      });
    }
    const content = await enhancedDocumentationService.getContentBySlug(slug);
    if (!content || content.library_type !== libraryType || !content.is_published) {
      return res.status(404).json({ error: "Content not found" });
    }
    res.json(content);
  } catch (error) {
    console.error("Error loading content by slug:", error);
    res.status(500).json({
      error: "Failed to load content",
      message: error instanceof Error ? error.message : "Unknown error"
    });
  }
});
router29.get("/search/:libraryType", async (req, res) => {
  try {
    const { libraryType } = req.params;
    const { q: query } = req.query;
    if (!["texteditor", "website"].includes(libraryType)) {
      return res.status(400).json({
        error: 'Invalid library type. Must be "texteditor" or "website"'
      });
    }
    if (!query || typeof query !== "string" || query.trim().length < 2) {
      return res.status(400).json({
        error: "Search query must be at least 2 characters long"
      });
    }
    const results = await enhancedDocumentationService.searchContent(query.trim(), libraryType);
    res.json({ results, query: query.trim(), libraryType });
  } catch (error) {
    console.error("Error searching content:", error);
    res.status(500).json({
      error: "Search failed",
      message: error instanceof Error ? error.message : "Unknown error"
    });
  }
});
router29.get("/stats/:libraryType", async (req, res) => {
  try {
    const { libraryType } = req.params;
    if (!["texteditor", "website"].includes(libraryType)) {
      return res.status(400).json({
        error: 'Invalid library type. Must be "texteditor" or "website"'
      });
    }
    const stats = await enhancedDocumentationService.getLibraryStats(libraryType);
    res.json({ ...stats, libraryType });
  } catch (error) {
    console.error("Error loading library stats:", error);
    res.status(500).json({
      error: "Failed to load statistics",
      message: error instanceof Error ? error.message : "Unknown error"
    });
  }
});
router29.get("/libraries", async (_req, res) => {
  try {
    const libraries = await enhancedDocumentationService.getAvailableLibraries();
    res.json({ libraries });
  } catch (error) {
    console.error("Error loading available libraries:", error);
    res.status(500).json({
      error: "Failed to load libraries",
      message: error instanceof Error ? error.message : "Unknown error"
    });
  }
});
var public_default = router29;

// server/api/documentation/versions.ts
import { Router as Router29 } from "express";
init_db();
var router30 = Router29();
router30.get("/content/:id/versions", requireAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      `SELECT 
        id, version, title, excerpt, change_summary, 
        created_by, created_at
       FROM documentation_content_versions 
       WHERE content_id = $1 
       ORDER BY version DESC`,
      [id]
    );
    res.json({
      success: true,
      versions: result.rows
    });
  } catch (error) {
    console.error("Error fetching content versions:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch content versions"
    });
  }
});
router30.get("/content/:id/versions/:version", requireAuth, async (req, res) => {
  try {
    const { id, version } = req.params;
    const result = await pool.query(
      `SELECT * FROM documentation_content_versions 
       WHERE content_id = $1 AND version = $2`,
      [id, version]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: "Version not found"
      });
    }
    res.json({
      success: true,
      version: result.rows[0]
    });
  } catch (error) {
    console.error("Error fetching version:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch version"
    });
  }
});
router30.post(
  "/content/:id/restore/:version",
  requireAuth,
  requireRole(["admin", "editor"]),
  async (req, res) => {
    try {
      const { id, version } = req.params;
      const userId = req.user?.username || req.user?.userId;
      const result = await pool.query(
        "SELECT restore_content_version($1, $2, $3) as success",
        [id, parseInt(version), userId]
      );
      if (!result.rows[0].success) {
        return res.status(404).json({
          success: false,
          error: "Version not found or restore failed"
        });
      }
      res.json({
        success: true,
        message: `Content restored to version ${version}`
      });
    } catch (error) {
      console.error("Error restoring version:", error);
      res.status(500).json({
        success: false,
        error: "Failed to restore version"
      });
    }
  }
);
router30.get("/content/:id/diff/:version1/:version2", requireAuth, async (req, res) => {
  try {
    const { id, version1, version2 } = req.params;
    const result = await pool.query(
      `SELECT 
        v1.version as version1, v1.title as title1, v1.content as content1, v1.created_at as date1,
        v2.version as version2, v2.title as title2, v2.content as content2, v2.created_at as date2
       FROM documentation_content_versions v1
       CROSS JOIN documentation_content_versions v2
       WHERE v1.content_id = $1 AND v1.version = $2
         AND v2.content_id = $1 AND v2.version = $3`,
      [id, parseInt(version1), parseInt(version2)]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: "One or both versions not found"
      });
    }
    const diff = result.rows[0];
    const titleChanged = diff.title1 !== diff.title2;
    const contentChanged = diff.content1 !== diff.content2;
    res.json({
      success: true,
      diff: {
        version1: {
          version: diff.version1,
          title: diff.title1,
          content: diff.content1,
          date: diff.date1
        },
        version2: {
          version: diff.version2,
          title: diff.title2,
          content: diff.content2,
          date: diff.date2
        },
        changes: {
          titleChanged,
          contentChanged,
          summary: `${titleChanged ? "Title" : ""}${titleChanged && contentChanged ? " and " : ""}${contentChanged ? "Content" : ""} changed`
        }
      }
    });
  } catch (error) {
    console.error("Error comparing versions:", error);
    res.status(500).json({
      success: false,
      error: "Failed to compare versions"
    });
  }
});
var versions_default = router30;

// server/api/documentation/locks.ts
import { Router as Router30 } from "express";
init_db();
var router31 = Router30();
router31.get("/content/:id/lock", requireAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      `SELECT * FROM is_content_locked($1)`,
      [id]
    );
    const lockInfo = result.rows[0];
    res.json({
      success: true,
      isLocked: lockInfo.is_locked,
      lock: lockInfo.is_locked ? {
        userId: lockInfo.locked_by,
        userName: lockInfo.locked_by_name,
        expiresAt: lockInfo.expires_at
      } : null
    });
  } catch (error) {
    console.error("Error checking content lock:", error);
    res.status(500).json({
      success: false,
      error: "Failed to check content lock"
    });
  }
});
router31.post(
  "/content/:id/lock",
  requireAuth,
  requireRole(["admin", "editor"]),
  async (req, res) => {
    try {
      const { id } = req.params;
      const userId = req.user?.username || req.user?.userId;
      const userName = req.user?.username || "Unknown User";
      const lockCheck = await pool.query(
        "SELECT * FROM is_content_locked($1)",
        [id]
      );
      const existingLock = lockCheck.rows[0];
      if (existingLock.is_locked && existingLock.locked_by !== userId) {
        return res.status(409).json({
          success: false,
          error: "Content is already locked by another user",
          lock: {
            userId: existingLock.locked_by,
            userName: existingLock.locked_by_name,
            expiresAt: existingLock.expires_at
          }
        });
      }
      await pool.query(
        `INSERT INTO documentation_content_locks (content_id, user_id, user_name)
         VALUES ($1, $2, $3)
         ON CONFLICT (content_id) 
         DO UPDATE SET 
           user_id = $2, 
           user_name = $3, 
           locked_at = NOW(), 
           expires_at = NOW() + INTERVAL '30 minutes'`,
        [id, userId, userName]
      );
      res.json({
        success: true,
        message: "Content locked successfully",
        lock: {
          userId,
          userName,
          expiresAt: new Date(Date.now() + 30 * 60 * 1e3).toISOString()
        }
      });
    } catch (error) {
      console.error("Error locking content:", error);
      res.status(500).json({
        success: false,
        error: "Failed to lock content"
      });
    }
  }
);
router31.delete(
  "/content/:id/lock",
  requireAuth,
  requireRole(["admin", "editor"]),
  async (req, res) => {
    try {
      const { id } = req.params;
      const userId = req.user?.username || req.user?.userId;
      const lockCheck = await pool.query(
        "SELECT * FROM is_content_locked($1)",
        [id]
      );
      const existingLock = lockCheck.rows[0];
      if (!existingLock.is_locked) {
        return res.json({
          success: true,
          message: "Content was not locked"
        });
      }
      if (existingLock.locked_by !== userId && req.user?.role !== "admin") {
        return res.status(403).json({
          success: false,
          error: "You can only unlock content you have locked"
        });
      }
      await pool.query(
        "DELETE FROM documentation_content_locks WHERE content_id = $1",
        [id]
      );
      res.json({
        success: true,
        message: "Content unlocked successfully"
      });
    } catch (error) {
      console.error("Error unlocking content:", error);
      res.status(500).json({
        success: false,
        error: "Failed to unlock content"
      });
    }
  }
);
router31.post("/locks/cleanup", requireAuth, async (_, res) => {
  try {
    const result = await pool.query(
      "DELETE FROM documentation_content_locks WHERE expires_at < NOW()"
    );
    res.json({
      success: true,
      message: `Cleaned up ${result.rowCount} expired locks`
    });
  } catch (error) {
    console.error("Error cleaning up locks:", error);
    res.status(500).json({
      success: false,
      error: "Failed to cleanup expired locks"
    });
  }
});
var locks_default = router31;

// server/api/documentation/index.ts
var router32 = Router31();
router32.use("/public", public_default);
router32.use("/sections", sections_default);
router32.use("/content", content_default);
router32.use("/menu", menu_default);
router32.use("/search", search_default);
router32.use("/conversion", conversion_default);
router32.use("/analytics", analytics_default2);
router32.use("/", versions_default);
router32.use("/", locks_default);
router32.use("/filesystem", (_, __, next) => {
  console.log("Legacy filesystem route accessed, consider migrating to database API");
  next();
});
router32.get("/test", async (_, res) => {
  res.json({ message: "Documentation API is working", timestamp: (/* @__PURE__ */ new Date()).toISOString() });
});
router32.get("/test-directory", async (_, res) => {
  res.json({ message: "Public directory route is working", timestamp: (/* @__PURE__ */ new Date()).toISOString() });
});
router32.get("/public", async (_, res) => {
  try {
    const docs = await documentationService.getPublished();
    res.json(docs);
  } catch (error) {
    console.error("Error fetching public documentation:", error);
    res.status(500).json({ error: "Failed to fetch documentation" });
  }
});
router32.get("/public/:slug", async (req, res) => {
  try {
    const doc = await documentationService.getBySlug(req.params.slug);
    if (!doc || !doc.is_published) {
      return res.status(404).json({ error: "Documentation not found" });
    }
    res.json(doc);
  } catch (error) {
    console.error("Error fetching documentation by slug:", error);
    res.status(500).json({ error: "Failed to fetch documentation" });
  }
});
router32.get("/categories", async (_, res) => {
  try {
    console.log("Fetching categories...");
    const categories = await documentationService.getCategories();
    console.log("Found categories:", categories.length, "items");
    res.json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ error: "Failed to fetch categories" });
  }
});
router32.get("/categories/tree", async (_, res) => {
  try {
    const categoryTree = await documentationService.getCategoryTree();
    res.json(categoryTree);
  } catch (error) {
    console.error("Error fetching category tree:", error);
    res.status(500).json({ error: "Failed to fetch category tree" });
  }
});
router32.get("/", requireAuth, async (_, res) => {
  try {
    console.log("Fetching all documentation...");
    const docs = await documentationService.getAll();
    console.log("Found documentation:", docs.length, "items");
    res.json(docs);
  } catch (error) {
    console.error("Error fetching all documentation:", error);
    res.status(500).json({ error: "Failed to fetch documentation" });
  }
});
router32.get("/:slug", requireAuth, async (req, res) => {
  try {
    const doc = await documentationService.getBySlug(req.params.slug);
    if (!doc) {
      return res.status(404).json({ error: "Documentation not found" });
    }
    res.json(doc);
  } catch (error) {
    console.error("Error fetching documentation by slug:", error);
    res.status(500).json({ error: "Failed to fetch documentation" });
  }
});
router32.post("/", requireAdmin, async (req, res) => {
  try {
    console.log("Creating documentation with data:", req.body);
    const doc = await documentationService.create(req.body);
    console.log("Created documentation:", doc);
    const wss = global.wss;
    if (wss && wss.clients) {
      const message = JSON.stringify({
        type: "documentation_created",
        data: doc,
        timestamp: (/* @__PURE__ */ new Date()).toISOString()
      });
      wss.clients.forEach((client) => {
        if (client.readyState === 1) {
          client.send(message);
        }
      });
      console.log("\u{1F4E1} Broadcasted documentation_created event");
    }
    res.status(201).json(doc);
  } catch (error) {
    console.error("Error creating documentation:", error);
    console.error("Error details:", error instanceof Error ? error.message : error);
    res.status(500).json({ error: "Failed to create documentation" });
  }
});
router32.put("/:id", requireAdmin, async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const doc = await documentationService.update(id, req.body);
    const wss = global.wss;
    if (wss && wss.clients) {
      const message = JSON.stringify({
        type: "documentation_updated",
        data: doc,
        timestamp: (/* @__PURE__ */ new Date()).toISOString()
      });
      wss.clients.forEach((client) => {
        if (client.readyState === 1) {
          client.send(message);
        }
      });
      console.log("\u{1F4E1} Broadcasted documentation_updated event");
    }
    res.json(doc);
  } catch (error) {
    console.error("Error updating documentation:", error);
    res.status(500).json({ error: "Failed to update documentation" });
  }
});
router32.delete("/:id", requireAdmin, async (req, res) => {
  try {
    console.log("DELETE request for documentation ID:", req.params.id);
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid ID" });
    }
    const success = await documentationService.delete(id);
    console.log("Delete result:", success);
    if (success) {
      res.json({ message: "Documentation deleted successfully" });
    } else {
      res.status(404).json({ error: "Documentation not found" });
    }
  } catch (error) {
    console.error("Error deleting documentation:", error);
    res.status(500).json({ error: "Failed to delete documentation" });
  }
});
router32.post("/categories", requireAdmin, async (req, res) => {
  try {
    const category = await documentationService.createCategory(req.body);
    res.status(201).json(category);
  } catch (error) {
    console.error("Error creating category:", error);
    res.status(500).json({ error: "Failed to create category" });
  }
});
router32.put("/categories/:id", requireAdmin, async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const category = await documentationService.updateCategory(id, req.body);
    res.json(category);
  } catch (error) {
    console.error("Error updating category:", error);
    res.status(500).json({ error: "Failed to update category" });
  }
});
router32.delete("/categories/:id", requireAdmin, async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    await documentationService.deleteCategory(id);
    res.json({ message: "Category deleted successfully" });
  } catch (error) {
    console.error("Error deleting category:", error);
    res.status(500).json({ error: "Failed to delete category" });
  }
});
router32.post("/sync-menu", requireAdmin, async (_, res) => {
  try {
    const { documentationMenuService: documentationMenuService2 } = await Promise.resolve().then(() => (init_documentationMenuService(), documentationMenuService_exports));
    await documentationMenuService2.bulkSyncAllDocumentation();
    const wss = global.wss;
    if (wss && wss.clients) {
      const message = JSON.stringify({
        type: "menu_bulk_synced",
        data: { timestamp: (/* @__PURE__ */ new Date()).toISOString() },
        timestamp: (/* @__PURE__ */ new Date()).toISOString()
      });
      wss.clients.forEach((client) => {
        if (client.readyState === 1) {
          client.send(message);
        }
      });
    }
    res.json({ message: "All documentation synced to menu successfully" });
  } catch (error) {
    console.error("Error syncing documentation to menu:", error);
    res.status(500).json({ error: "Failed to sync documentation to menu" });
  }
});
router32.post("/cleanup-menu", requireAdmin, async (_, res) => {
  try {
    const { documentationMenuService: documentationMenuService2 } = await Promise.resolve().then(() => (init_documentationMenuService(), documentationMenuService_exports));
    const stats = await documentationMenuService2.cleanupOrphanedMenuItems();
    res.json({
      message: `Cleanup completed: ${stats.cleaned} orphaned menu items removed`,
      stats
    });
  } catch (error) {
    console.error("Error cleaning up menu items:", error);
    res.status(500).json({ error: "Failed to cleanup menu items" });
  }
});
router32.get("/cleanup-stats", requireAdmin, async (_, res) => {
  try {
    const { documentationMenuService: documentationMenuService2 } = await Promise.resolve().then(() => (init_documentationMenuService(), documentationMenuService_exports));
    const stats = await documentationMenuService2.getCleanupStats();
    res.json(stats);
  } catch (error) {
    console.error("Error getting cleanup stats:", error);
    res.status(500).json({ error: "Failed to get cleanup statistics" });
  }
});
router32.get("/validate-menu", requireAdmin, async (_, res) => {
  try {
    const validation = await documentationService.validateMenuRelationships();
    res.json(validation);
  } catch (error) {
    console.error("Error validating menu relationships:", error);
    res.status(500).json({ error: "Failed to validate menu relationships" });
  }
});
router32.get("/filesystem/directory", async (_, res) => {
  console.log("[DEBUG] Filesystem directory route called");
  try {
    const fs16 = __require("fs").promises;
    const path18 = __require("path");
    const docsPath = path18.resolve(__dirname, "../../../client/src/plugins/texteditor/docs");
    console.log("[DEBUG] Docs path:", docsPath);
    const readDirectory = async (dirPath) => {
      const entries = await fs16.readdir(dirPath, { withFileTypes: true });
      const files = [];
      const directories = [];
      for (const entry of entries) {
        const fullPath = path18.join(dirPath, entry.name);
        const relativePath = path18.relative(docsPath, fullPath);
        if (entry.isDirectory()) {
          directories.push({
            path: relativePath,
            name: entry.name,
            isDirectory: true,
            children: await readDirectory(fullPath)
          });
        } else {
          const stats = await fs16.stat(fullPath);
          files.push({
            path: relativePath,
            name: entry.name,
            isDirectory: false,
            size: stats.size,
            lastModified: stats.mtime
          });
        }
      }
      return { files, directories };
    };
    const structure = await readDirectory(docsPath);
    res.json({
      ...structure,
      totalFiles: structure.files.length,
      totalDirectories: structure.directories.length,
      supportedFiles: structure.files.length
    });
  } catch (error) {
    console.error("Error reading directory:", error);
    res.status(500).json({ error: "Failed to read directory" });
  }
});
router32.get("/filesystem/file", async (req, res) => {
  try {
    const fs16 = __require("fs").promises;
    const path18 = __require("path");
    const filePath = req.query.path;
    if (!filePath) {
      return res.status(400).json({ error: "File path is required" });
    }
    const docsPath = path18.join(__dirname, "../../../client/src/plugins/texteditor/docs");
    const fullPath = path18.join(docsPath, filePath);
    const content = await fs16.readFile(fullPath, "utf8");
    const stats = await fs16.stat(fullPath);
    res.json({
      content,
      size: stats.size,
      lastModified: stats.mtime
    });
  } catch (error) {
    console.error("Error reading file:", error);
    res.status(500).json({ error: "Failed to read file" });
  }
});
router32.post("/filesystem/file", async (req, res) => {
  try {
    const fs16 = __require("fs").promises;
    const path18 = __require("path");
    const { path: filePath, content } = req.body;
    if (!filePath || content === void 0) {
      return res.status(400).json({ error: "File path and content are required" });
    }
    const docsPath = path18.join(__dirname, "../../../client/src/plugins/texteditor/docs");
    const fullPath = path18.join(docsPath, filePath);
    await fs16.writeFile(fullPath, content, "utf8");
    res.json({ message: "File saved successfully" });
  } catch (error) {
    console.error("Error writing file:", error);
    res.status(500).json({ error: "Failed to write file" });
  }
});
var documentation_default = router32;

// server/api/menu/index.ts
init_menuService();
import { Router as Router32 } from "express";
var router33 = Router32();
router33.get("/tree", async (_, res) => {
  try {
    const menuTree = await menuService.getMenuTree();
    res.json(menuTree);
  } catch (error) {
    console.error("Error fetching menu tree:", error);
    res.status(500).json({ error: "Failed to fetch menu" });
  }
});
router33.get("/admin/tree", requireAdmin, async (_, res) => {
  try {
    const menuTree = await menuService.getFullMenuTree();
    res.json(menuTree);
  } catch (error) {
    console.error("Error fetching full menu tree:", error);
    res.status(500).json({ error: "Failed to fetch full menu tree" });
  }
});
router33.get("/", requireAdmin, async (_, res) => {
  console.log("\u2705 Menu endpoint accessed successfully by admin");
  try {
    const menuItems2 = await menuService.getAllMenuItems();
    res.json(menuItems2);
  } catch (error) {
    console.error("Error fetching all menu items:", error);
    res.status(500).json({ error: "Failed to fetch menu items" });
  }
});
router33.get("/:id", requireAdmin, async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid ID" });
    }
    const menuItem = await menuService.getById(id);
    if (!menuItem) {
      return res.status(404).json({ error: "Menu item not found" });
    }
    res.json(menuItem);
  } catch (error) {
    console.error("Error fetching menu item:", error);
    res.status(500).json({ error: "Failed to fetch menu item" });
  }
});
router33.post("/", requireAdmin, async (req, res) => {
  try {
    const menuItem = await menuService.create(req.body);
    if (req.app.locals.io) {
      req.app.locals.io.emit("menuCreated", menuItem);
    }
    res.status(201).json(menuItem);
  } catch (error) {
    console.error("Error creating menu item:", error);
    res.status(500).json({ error: "Failed to create menu item" });
  }
});
router33.put("/:id", requireAdmin, async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid ID" });
    }
    const menuItem = await menuService.update(id, req.body);
    if (req.app.locals.io) {
      req.app.locals.io.emit("menuUpdated", menuItem);
    }
    res.json(menuItem);
  } catch (error) {
    console.error("Error updating menu item:", error);
    res.status(500).json({ error: "Failed to update menu item" });
  }
});
router33.delete("/:id", requireAdmin, async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid ID" });
    }
    const success = await menuService.delete(id);
    if (success) {
      if (req.app.locals.io) {
        req.app.locals.io.emit("menuDeleted", { id });
      }
      res.json({ message: "Menu item deleted successfully" });
    } else {
      res.status(404).json({ error: "Menu item not found" });
    }
  } catch (error) {
    console.error("Error deleting menu item:", error);
    res.status(500).json({ error: "Failed to delete menu item" });
  }
});
router33.post("/reorder", requireAdmin, async (req, res) => {
  try {
    await menuService.reorder(req.body.items);
    if (req.app.locals.io) {
      req.app.locals.io.emit("menuUpdated", { reordered: true });
    }
    res.json({ message: "Menu items reordered successfully" });
  } catch (error) {
    console.error("Error reordering menu items:", error);
    res.status(500).json({ error: "Failed to reorder menu items" });
  }
});
var menu_default2 = router33;

// server/api/spellcheck.ts
import express2 from "express";
import fs10 from "fs";
import path11 from "path";
import { fileURLToPath as fileURLToPath2 } from "url";

// server/api/PartitionLRUCache.ts
var PartitionLRUCache = class {
  constructor(maxSize = 8) {
    this.cache = /* @__PURE__ */ new Map();
    this.accessOrder = /* @__PURE__ */ new Map();
    this.hitCount = 0;
    this.totalRequests = 0;
    // Priority levels for Russian letters
    this.HIGH_PRIORITY = /* @__PURE__ */ new Set(["\u0430", "\u0432", "\u0438", "\u043A", "\u043D", "\u043E", "\u043F", "\u0440", "\u0441", "\u0442"]);
    this.MEDIUM_PRIORITY = /* @__PURE__ */ new Set(["\u0431", "\u0433", "\u0434", "\u0437", "\u043B", "\u043C", "\u0443", "\u0447", "\u044F"]);
    this.maxSize = maxSize;
  }
  /**
   * Get partition from cache
   */
  get(letter) {
    this.totalRequests++;
    if (this.cache.has(letter)) {
      this.hitCount++;
      this.accessOrder.set(letter, Date.now());
      console.log(`\u{1F4E6} Cache HIT for partition '${letter}'`);
      return this.cache.get(letter);
    }
    console.log(`\u274C Cache MISS for partition '${letter}'`);
    return void 0;
  }
  /**
   * Set partition in cache with LRU eviction
   */
  set(letter, partition) {
    if (this.cache.size >= this.maxSize && !this.cache.has(letter)) {
      this.evictLeastRecentlyUsed();
    }
    this.cache.set(letter, partition);
    this.accessOrder.set(letter, Date.now());
    console.log(`\u{1F4BE} Cached partition '${letter}': ${partition.size} words (${this.cache.size}/${this.maxSize})`);
  }
  /**
   * Check if partition exists in cache
   */
  has(letter) {
    return this.cache.has(letter);
  }
  /**
   * Remove specific partition from cache
   */
  delete(letter) {
    const deleted = this.cache.delete(letter);
    this.accessOrder.delete(letter);
    if (deleted) {
      console.log(`\u{1F5D1}\uFE0F Removed partition '${letter}' from cache`);
    }
    return deleted;
  }
  /**
   * Clear entire cache
   */
  clear() {
    const size = this.cache.size;
    this.cache.clear();
    this.accessOrder.clear();
    console.log(`\u{1F9F9} Cleared cache: ${size} partitions removed`);
  }
  /**
   * Get cache statistics
   */
  getStats() {
    return {
      size: this.cache.size,
      maxSize: this.maxSize,
      hitRate: this.totalRequests > 0 ? this.hitCount / this.totalRequests : 0,
      totalRequests: this.totalRequests,
      totalHits: this.hitCount
    };
  }
  /**
   * Get list of cached partitions
   */
  getCachedPartitions() {
    return Array.from(this.cache.keys());
  }
  /**
   * Get total words in cache
   */
  getTotalWords() {
    return Array.from(this.cache.values()).reduce((total, partition) => total + partition.size, 0);
  }
  /**
   * Evict least recently used partition with priority consideration
   */
  evictLeastRecentlyUsed() {
    let candidateForEviction = "";
    let oldestTime = Date.now();
    for (const [letter, time] of this.accessOrder) {
      if (time < oldestTime && this.isLowPriority(letter)) {
        oldestTime = time;
        candidateForEviction = letter;
      }
    }
    if (!candidateForEviction) {
      oldestTime = Date.now();
      for (const [letter, time] of this.accessOrder) {
        if (time < oldestTime && this.isMediumPriority(letter)) {
          oldestTime = time;
          candidateForEviction = letter;
        }
      }
    }
    if (!candidateForEviction) {
      oldestTime = Date.now();
      for (const [letter, time] of this.accessOrder) {
        if (time < oldestTime) {
          oldestTime = time;
          candidateForEviction = letter;
        }
      }
    }
    if (candidateForEviction) {
      const partition = this.cache.get(candidateForEviction);
      const wordCount = partition?.size || 0;
      this.cache.delete(candidateForEviction);
      this.accessOrder.delete(candidateForEviction);
      console.log(`\u{1F504} LRU evicted partition '${candidateForEviction}': ${wordCount} words`);
    }
  }
  /**
   * Check if letter is medium priority
   */
  isMediumPriority(letter) {
    return this.MEDIUM_PRIORITY.has(letter);
  }
  /**
   * Check if letter is low priority
   */
  isLowPriority(letter) {
    return !this.HIGH_PRIORITY.has(letter) && !this.MEDIUM_PRIORITY.has(letter);
  }
  /**
   * Update cache size limit
   */
  setMaxSize(newSize) {
    this.maxSize = newSize;
    while (this.cache.size > this.maxSize) {
      this.evictLeastRecentlyUsed();
    }
    console.log(`\u2699\uFE0F Cache max size updated to ${newSize}`);
  }
  /**
   * Get memory usage estimate in MB
   */
  getMemoryUsageMB() {
    const totalWords = this.getTotalWords();
    return totalWords * 50 / (1024 * 1024);
  }
};

// server/api/MemoryMonitor.ts
var MemoryMonitor = class {
  constructor(cache) {
    this.isMonitoring = false;
    this.cache = cache;
    this.checkInterval = 2 * 60 * 1e3;
    this.thresholds = {
      warning: 300 * 1024 * 1024,
      // 300MB
      cleanup: 400 * 1024 * 1024,
      // 400MB
      critical: 500 * 1024 * 1024
      // 500MB
    };
  }
  /**
   * Start memory monitoring
   */
  startMonitoring() {
    if (this.isMonitoring) {
      console.log("\u26A0\uFE0F Memory monitor already running");
      return;
    }
    this.isMonitoring = true;
    this.intervalId = setInterval(() => {
      this.checkMemoryUsage();
    }, this.checkInterval);
    console.log(`\u{1F50D} Memory monitor started (checking every ${this.checkInterval / 1e3}s)`);
    this.checkMemoryUsage();
  }
  /**
   * Stop memory monitoring
   */
  stopMonitoring() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = void 0;
    }
    this.isMonitoring = false;
    console.log("\u{1F6D1} Memory monitor stopped");
  }
  /**
   * Check current memory usage and trigger cleanup if needed
   */
  checkMemoryUsage() {
    const memUsage = process.memoryUsage();
    const stats = this.formatMemoryStats(memUsage);
    console.log(`\u{1F4CA} Memory: ${Math.round(stats.heapUsed / 1024 / 1024)}MB used, ${Math.round(stats.usagePercent)}% of heap`);
    if (stats.heapUsed > this.thresholds.critical) {
      console.warn(`\u{1F6A8} CRITICAL memory usage: ${Math.round(stats.heapUsed / 1024 / 1024)}MB`);
      this.performAggressiveCleanup();
    } else if (stats.heapUsed > this.thresholds.cleanup) {
      console.warn(`\u26A0\uFE0F High memory usage: ${Math.round(stats.heapUsed / 1024 / 1024)}MB - triggering cleanup`);
      this.performCleanup();
    } else if (stats.heapUsed > this.thresholds.warning) {
      console.warn(`\u26A0\uFE0F Memory warning: ${Math.round(stats.heapUsed / 1024 / 1024)}MB`);
    }
  }
  /**
   * Perform standard cleanup
   */
  performCleanup() {
    console.log("\u{1F9F9} Starting memory cleanup...");
    const beforeStats = this.cache.getStats();
    const beforeMemory = process.memoryUsage().heapUsed;
    this.preserveCurrentErrors();
    const currentMaxSize = beforeStats.maxSize;
    const newMaxSize = Math.max(4, Math.floor(currentMaxSize * 0.75));
    if (newMaxSize < currentMaxSize) {
      this.cache.setMaxSize(newMaxSize);
      console.log(`\u{1F4C9} Reduced cache size from ${currentMaxSize} to ${newMaxSize}`);
    }
    if (global.gc) {
      global.gc();
      console.log("\u{1F5D1}\uFE0F Forced garbage collection");
    }
    const afterMemory = process.memoryUsage().heapUsed;
    const memoryFreed = beforeMemory - afterMemory;
    const afterStats = this.cache.getStats();
    console.log(`\u2705 Cleanup complete: freed ${Math.round(memoryFreed / 1024 / 1024)}MB, cache: ${afterStats.size}/${afterStats.maxSize}`);
  }
  /**
   * Perform aggressive cleanup for critical memory situations
   */
  performAggressiveCleanup() {
    console.log("\u{1F6A8} Starting AGGRESSIVE memory cleanup...");
    const beforeMemory = process.memoryUsage().heapUsed;
    this.preserveCurrentErrors();
    this.cache.setMaxSize(3);
    const cachedPartitions = this.cache.getCachedPartitions();
    const lowPriorityLetters = ["\u0451", "\u0436", "\u0446", "\u0449", "\u044A", "\u044B", "\u044C", "\u044D", "\u044E"];
    cachedPartitions.forEach((letter) => {
      if (lowPriorityLetters.includes(letter)) {
        this.cache.delete(letter);
      }
    });
    if (global.gc) {
      for (let i = 0; i < 3; i++) {
        global.gc();
      }
      console.log("\u{1F5D1}\uFE0F Forced multiple garbage collections");
    }
    const afterMemory = process.memoryUsage().heapUsed;
    const memoryFreed = beforeMemory - afterMemory;
    console.log(`\u2705 Aggressive cleanup complete: freed ${Math.round(memoryFreed / 1024 / 1024)}MB`);
  }
  /**
   * Preserve current spell check errors before cleanup
   */
  preserveCurrentErrors() {
    console.log("\u{1F4BE} Preserving current spell check errors");
  }
  /**
   * Format memory usage into statistics object
   */
  formatMemoryStats(memUsage) {
    return {
      heapUsed: memUsage.heapUsed,
      heapTotal: memUsage.heapTotal,
      external: memUsage.external,
      rss: memUsage.rss,
      usagePercent: memUsage.heapUsed / memUsage.heapTotal * 100,
      timestamp: Date.now()
    };
  }
  /**
   * Get current memory statistics
   */
  getMemoryStats() {
    return this.formatMemoryStats(process.memoryUsage());
  }
  /**
   * Update memory thresholds
   */
  updateThresholds(thresholds) {
    this.thresholds = { ...this.thresholds, ...thresholds };
    console.log("\u2699\uFE0F Memory thresholds updated:", this.thresholds);
  }
  /**
   * Get monitoring status
   */
  getStatus() {
    return {
      isMonitoring: this.isMonitoring,
      checkInterval: this.checkInterval,
      thresholds: this.thresholds,
      currentMemory: this.getMemoryStats()
    };
  }
  /**
   * Force immediate memory check and cleanup if needed
   */
  forceCheck() {
    console.log("\u{1F50D} Forcing immediate memory check...");
    this.checkMemoryUsage();
  }
};

// server/api/TextAnalyzer.ts
var TextAnalyzer = class {
  constructor() {
    this.RUSSIAN_LETTERS = "\u0430\u0431\u0432\u0433\u0434\u0435\u0451\u0436\u0437\u0438\u0439\u043A\u043B\u043C\u043D\u043E\u043F\u0440\u0441\u0442\u0443\u0444\u0445\u0446\u0447\u0448\u0449\u044A\u044B\u044C\u044D\u044E\u044F";
    this.NON_INITIAL_LETTERS = /* @__PURE__ */ new Set(["\u044C", "\u044A", "\u044B"]);
  }
  // ь, ъ, ы cannot start Russian words
  /**
   * Analyze text and return letter frequency data
   */
  analyzeText(text2) {
    const letterFreq = this.getLetterFrequency(text2);
    const topLetters = this.getTopLetters(letterFreq, 5);
    const predictedPartitions = this.predictNextLetters(letterFreq, text2);
    return {
      letterFrequency: letterFreq,
      topLetters,
      predictedPartitions,
      textLength: text2.length,
      uniqueLetters: letterFreq.size
    };
  }
  /**
   * Get letter frequency from text
   */
  getLetterFrequency(text2) {
    const frequency = /* @__PURE__ */ new Map();
    const normalizedText = text2.toLowerCase();
    for (const char of normalizedText) {
      if (this.RUSSIAN_LETTERS.includes(char)) {
        frequency.set(char, (frequency.get(char) || 0) + 1);
      }
    }
    return frequency;
  }
  /**
   * Get top N most frequent letters
   */
  getTopLetters(frequency, count2) {
    return Array.from(frequency.entries()).sort((a, b) => b[1] - a[1]).slice(0, count2).map(([letter]) => letter);
  }
  /**
   * Predict which partitions will be needed based on text patterns
   */
  predictNextLetters(frequency, text2) {
    const predictions = /* @__PURE__ */ new Set();
    const topLetters = this.getTopLetters(frequency, 3).filter((letter) => !this.NON_INITIAL_LETTERS.has(letter));
    topLetters.forEach((letter) => predictions.add(letter));
    const commonPatterns = this.analyzeWordPatterns(text2).filter((letter) => !this.NON_INITIAL_LETTERS.has(letter));
    commonPatterns.forEach((letter) => predictions.add(letter));
    if (text2.length < 100) {
      const highPriority = ["\u0430", "\u0432", "\u0438", "\u043A", "\u043D", "\u043E", "\u043F", "\u0440", "\u0441", "\u0442"];
      highPriority.slice(0, 2).forEach((letter) => predictions.add(letter));
    }
    return Array.from(predictions);
  }
  /**
   * Analyze word patterns to predict needed letters
   */
  analyzeWordPatterns(text2) {
    const patterns = /* @__PURE__ */ new Set();
    const words = text2.toLowerCase().match(/[а-яё]+/g) || [];
    words.forEach((word) => {
      if (word.length > 0) {
        patterns.add(word[0]);
      }
      const prefixes = ["\u043F\u0440\u0435", "\u043F\u0440\u0438", "\u043F\u043E\u0434", "\u043D\u0430\u0434", "\u0431\u0435\u0437", "\u0440\u0430\u0437", "\u0432\u043E\u0437"];
      prefixes.forEach((prefix) => {
        if (word.startsWith(prefix)) {
          prefix.split("").forEach((letter) => patterns.add(letter));
        }
      });
      const suffixes = ["\u043D\u0438\u0435", "\u0442\u0435\u043B\u044C", "\u043E\u0441\u0442\u044C", "\u0435\u043D\u0438\u0435", "\u0430\u043D\u0438\u0435"];
      suffixes.forEach((suffix) => {
        if (word.endsWith(suffix)) {
          suffix.split("").forEach((letter) => patterns.add(letter));
        }
      });
    });
    return Array.from(patterns);
  }
  /**
   * Get detailed frequency statistics
   */
  getFrequencyStats(frequency) {
    const total = Array.from(frequency.values()).reduce((sum, count2) => sum + count2, 0);
    return Array.from(frequency.entries()).map(([letter, count2]) => ({
      letter,
      count: count2,
      percentage: count2 / total * 100
    })).sort((a, b) => b.count - a.count);
  }
  /**
   * Estimate cache efficiency for given partitions
   */
  estimateCacheEfficiency(text2, cachedPartitions) {
    const frequency = this.getLetterFrequency(text2);
    const totalLetters = Array.from(frequency.values()).reduce((sum, count2) => sum + count2, 0);
    let coveredLetters = 0;
    cachedPartitions.forEach((partition) => {
      coveredLetters += frequency.get(partition) || 0;
    });
    return totalLetters > 0 ? coveredLetters / totalLetters * 100 : 0;
  }
};

// server/api/IntelligentPreloader.ts
var IntelligentPreloader = class {
  constructor(cache, loadPartitionFn) {
    this.usageStats = /* @__PURE__ */ new Map();
    this.preloadingStats = {
      totalPreloads: 0,
      successfulPreloads: 0,
      preloadHitRate: 0,
      averagePreloadTime: 0
    };
    this.textAnalyzer = new TextAnalyzer();
    this.cache = cache;
    this.loadPartitionFn = loadPartitionFn;
  }
  /**
   * Analyze text and preload predicted partitions
   */
  async analyzeAndPreload(text2) {
    if (!text2 || text2.length < 10) return;
    const analysis = this.textAnalyzer.analyzeText(text2);
    console.log(`\u{1F52E} Preloader: Analyzing text (${text2.length} chars), predicted partitions:`, analysis.predictedPartitions);
    this.updateUsageStats(analysis.topLetters);
    const preloadPromises = analysis.predictedPartitions.map(
      (letter) => this.preloadPartition(letter)
    );
    Promise.all(preloadPromises).then(() => {
      console.log(`\u2705 Preloader: Completed preloading ${analysis.predictedPartitions.length} partitions`);
    }).catch((error) => {
      console.warn("\u26A0\uFE0F Preloader: Some partitions failed to preload:", error);
    });
  }
  /**
   * Preload a specific partition if not already cached
   */
  async preloadPartition(letter) {
    if (this.cache.has(letter)) {
      console.log(`\u{1F4E6} Preloader: Partition '${letter}' already cached`);
      return;
    }
    const startTime = Date.now();
    this.preloadingStats.totalPreloads++;
    try {
      console.log(`\u{1F504} Preloader: Loading partition '${letter}'...`);
      const partition = await this.loadPartitionFn(letter);
      this.cache.set(letter, partition);
      const loadTime = Date.now() - startTime;
      this.preloadingStats.successfulPreloads++;
      this.updatePreloadStats(loadTime);
      console.log(`\u2705 Preloader: Loaded partition '${letter}' (${partition.size} words) in ${loadTime}ms`);
    } catch (error) {
      console.warn(`\u274C Preloader: Failed to load partition '${letter}':`, error);
    }
  }
  /**
   * Update usage statistics for letters
   */
  updateUsageStats(letters) {
    const now = Date.now();
    letters.forEach((letter) => {
      const existing = this.usageStats.get(letter) || {
        letter,
        accessCount: 0,
        lastAccessed: 0,
        hitRate: 0
      };
      existing.accessCount++;
      existing.lastAccessed = now;
      this.usageStats.set(letter, existing);
    });
  }
  /**
   * Update preloading performance statistics
   */
  updatePreloadStats(loadTime) {
    const stats = this.preloadingStats;
    stats.preloadHitRate = stats.totalPreloads > 0 ? stats.successfulPreloads / stats.totalPreloads * 100 : 0;
    stats.averagePreloadTime = (stats.averagePreloadTime + loadTime) / 2;
  }
  /**
   * Get most frequently used letters for priority adjustment
   */
  getTopUsedLetters(count2 = 10) {
    return Array.from(this.usageStats.values()).sort((a, b) => b.accessCount - a.accessCount).slice(0, count2).map((stat) => stat.letter);
  }
  /**
   * Predict partitions needed for upcoming text
   */
  predictPartitionsForText(text2) {
    const analysis = this.textAnalyzer.analyzeText(text2);
    const historicalData = this.getTopUsedLetters(5);
    const predictions = /* @__PURE__ */ new Set([
      ...analysis.predictedPartitions,
      ...historicalData.slice(0, 3)
    ]);
    return Array.from(predictions);
  }
  /**
   * Get preloading performance statistics
   */
  getPreloadingStats() {
    const cacheStats = this.cache.getStats();
    return {
      ...this.preloadingStats,
      usageStats: Array.from(this.usageStats.values()),
      cacheEfficiency: cacheStats.hitRate * 100
    };
  }
  /**
   * Optimize cache based on usage patterns
   */
  optimizeCache() {
    const topLetters = this.getTopUsedLetters(8);
    const cachedPartitions = this.cache.getCachedPartitions();
    console.log(`\u{1F3AF} Preloader: Optimizing cache based on usage patterns`);
    console.log(`   Top used letters:`, topLetters);
    console.log(`   Currently cached:`, cachedPartitions);
    topLetters.forEach((letter) => {
      if (!cachedPartitions.includes(letter)) {
        this.preloadPartition(letter).catch((error) => {
          console.warn(`Failed to optimize-preload partition '${letter}':`, error);
        });
      }
    });
  }
  /**
   * Clear old usage statistics
   */
  clearOldStats(maxAge = 24 * 60 * 60 * 1e3) {
    const now = Date.now();
    const cutoff = now - maxAge;
    for (const [letter, stats] of this.usageStats.entries()) {
      if (stats.lastAccessed < cutoff) {
        this.usageStats.delete(letter);
      }
    }
    console.log(`\u{1F9F9} Preloader: Cleared old usage statistics, ${this.usageStats.size} entries remaining`);
  }
};

// server/api/MemoryAnalytics.ts
var MemoryAnalytics = class {
  // 1 week of hourly data
  constructor(cache, preloader) {
    this.usageHistory = [];
    this.MAX_HISTORY_SIZE = 168;
    this.cache = cache;
    this.preloader = preloader;
    this.userProfile = this.initializeUserProfile();
    this.startPeriodicAnalysis();
  }
  /**
   * Get comprehensive usage statistics
   */
  getUsageStats() {
    const cacheStats = this.cache.getStats();
    return {
      hitRate: cacheStats.hitRate,
      memoryPressure: this.calculateMemoryPressure(),
      letterFrequency: this.calculateLetterFrequency(),
      partitionEfficiency: this.calculatePartitionEfficiency(),
      timeBasedPatterns: this.getTimeBasedPatterns(),
      userBehaviorProfile: this.userProfile
    };
  }
  /**
   * Analyze memory pressure and predict future needs
   */
  predictMemoryPressure() {
    const currentMemory = process.memoryUsage().heapUsed;
    const memoryTrend = this.calculateMemoryTrend();
    const currentPressure = currentMemory / (400 * 1024 * 1024);
    const predictedPressure = Math.min(1, currentPressure + memoryTrend * 0.5);
    let riskLevel;
    const recommendedActions = [];
    if (predictedPressure > 0.9) {
      riskLevel = "critical";
      recommendedActions.push("Immediate cache reduction required");
      recommendedActions.push("Force garbage collection");
      recommendedActions.push("Reduce cache size to 4 partitions");
    } else if (predictedPressure > 0.7) {
      riskLevel = "high";
      recommendedActions.push("Reduce cache size by 25%");
      recommendedActions.push("Clear low-priority partitions");
    } else if (predictedPressure > 0.5) {
      riskLevel = "medium";
      recommendedActions.push("Monitor memory usage closely");
      recommendedActions.push("Consider preemptive cleanup");
    } else {
      riskLevel = "low";
      recommendedActions.push("Memory usage is optimal");
    }
    return {
      currentPressure,
      predictedPressure,
      riskLevel,
      recommendedActions
    };
  }
  /**
   * Generate optimization recommendations
   */
  generateOptimizationPlan() {
    const stats = this.getUsageStats();
    const memoryAnalysis = this.predictMemoryPressure();
    let optimalCacheSize = 8;
    if (stats.hitRate > 0.95 && memoryAnalysis.currentPressure < 0.6) {
      optimalCacheSize = Math.min(12, Math.ceil(8 * 1.5));
    } else if (stats.hitRate < 0.8 || memoryAnalysis.currentPressure > 0.8) {
      optimalCacheSize = Math.max(4, Math.floor(8 * 0.75));
    }
    const baseWarning = 300 * 1024 * 1024;
    const baseCleanup = 400 * 1024 * 1024;
    const baseCritical = 500 * 1024 * 1024;
    const thresholdMultiplier = this.calculateThresholdMultiplier(stats);
    const partitionPriorities = this.calculateOptimalPriorities(stats.letterFrequency);
    let preloadingStrategy;
    if (memoryAnalysis.currentPressure > 0.7) {
      preloadingStrategy = "conservative";
    } else if (stats.hitRate > 0.9) {
      preloadingStrategy = "aggressive";
    } else {
      preloadingStrategy = "balanced";
    }
    return {
      cacheSize: optimalCacheSize,
      memoryThresholds: {
        warning: Math.floor(baseWarning * thresholdMultiplier),
        cleanup: Math.floor(baseCleanup * thresholdMultiplier),
        critical: Math.floor(baseCritical * thresholdMultiplier)
      },
      partitionPriorities,
      preloadingStrategy
    };
  }
  /**
   * Update user behavior profile based on recent activity
   */
  updateUserProfile(textLength, language, words) {
    this.userProfile.averageTextLength = this.userProfile.averageTextLength * 0.9 + textLength * 0.1;
    if (language === "ru" || language === "en") {
      this.userProfile.preferredLanguage = language;
    }
    words.forEach((word) => {
      if (!this.userProfile.commonWords.includes(word)) {
        this.userProfile.commonWords.push(word);
        if (this.userProfile.commonWords.length > 100) {
          this.userProfile.commonWords.shift();
        }
      }
    });
    this.userProfile.writingStyle = this.analyzeWritingStyle(words);
  }
  /**
   * Start periodic analysis and optimization
   */
  startPeriodicAnalysis() {
    setInterval(() => {
      this.recordCurrentUsage();
      this.cleanupOldHistory();
    }, 10 * 60 * 1e3);
    setInterval(() => {
      const plan = this.generateOptimizationPlan();
      console.log("\u{1F4CA} Analytics: Generated optimization plan:", {
        cacheSize: plan.cacheSize,
        strategy: plan.preloadingStrategy,
        memoryThresholds: {
          warningMB: Math.round(plan.memoryThresholds.warning / 1024 / 1024),
          cleanupMB: Math.round(plan.memoryThresholds.cleanup / 1024 / 1024)
        }
      });
    }, 60 * 60 * 1e3);
  }
  /**
   * Calculate current memory pressure (0-1)
   */
  calculateMemoryPressure() {
    const memUsage = process.memoryUsage();
    return memUsage.heapUsed / (400 * 1024 * 1024);
  }
  /**
   * Calculate letter frequency from recent usage
   */
  calculateLetterFrequency() {
    const frequency = /* @__PURE__ */ new Map();
    const preloaderStats = this.preloader.getPreloadingStats();
    preloaderStats.usageStats.forEach((stat) => {
      frequency.set(stat.letter, stat.accessCount);
    });
    return frequency;
  }
  /**
   * Calculate efficiency of each partition
   */
  calculatePartitionEfficiency() {
    const efficiency = /* @__PURE__ */ new Map();
    const cachedPartitions = this.cache.getCachedPartitions();
    cachedPartitions.forEach((letter) => {
      const partitionHits = this.getPartitionHits(letter);
      const partitionRequests = this.getPartitionRequests(letter);
      const partitionEfficiency = partitionRequests > 0 ? partitionHits / partitionRequests : 0;
      efficiency.set(letter, partitionEfficiency);
    });
    return efficiency;
  }
  /**
   * Get time-based usage patterns
   */
  getTimeBasedPatterns() {
    return this.usageHistory.slice(-24);
  }
  /**
   * Calculate memory usage trend
   */
  calculateMemoryTrend() {
    if (this.usageHistory.length < 2) return 0;
    const recent = this.usageHistory.slice(-6);
    if (recent.length < 2) return 0;
    const firstMemory = recent[0].memoryUsage;
    const lastMemory = recent[recent.length - 1].memoryUsage;
    return (lastMemory - firstMemory) / recent.length;
  }
  /**
   * Calculate optimal threshold multiplier
   */
  calculateThresholdMultiplier(stats) {
    let multiplier = 1;
    if (stats.hitRate > 0.95) {
      multiplier *= 1.2;
    }
    if (stats.memoryPressure > 0.8) {
      multiplier *= 0.8;
    }
    return Math.max(0.5, Math.min(1.5, multiplier));
  }
  /**
   * Calculate optimal partition priorities
   */
  calculateOptimalPriorities(letterFreq) {
    const priorities = /* @__PURE__ */ new Map();
    const totalUsage = Array.from(letterFreq.values()).reduce((sum, count2) => sum + count2, 0);
    letterFreq.forEach((count2, letter) => {
      const frequency = totalUsage > 0 ? count2 / totalUsage : 0;
      priorities.set(letter, frequency);
    });
    return priorities;
  }
  /**
   * Record current usage for historical analysis
   */
  recordCurrentUsage() {
    const now = /* @__PURE__ */ new Date();
    const hour = now.getHours();
    const memUsage = process.memoryUsage().heapUsed / 1024 / 1024;
    const cacheStats = this.cache.getStats();
    const pattern = {
      hour,
      letterUsage: this.calculateLetterFrequency(),
      memoryUsage: memUsage,
      requestCount: cacheStats.totalRequests
    };
    this.usageHistory.push(pattern);
  }
  /**
   * Clean up old historical data
   */
  cleanupOldHistory() {
    if (this.usageHistory.length > this.MAX_HISTORY_SIZE) {
      this.usageHistory = this.usageHistory.slice(-this.MAX_HISTORY_SIZE);
    }
  }
  /**
   * Initialize user profile with defaults
   */
  initializeUserProfile() {
    return {
      preferredLanguage: "ru",
      writingStyle: "mixed",
      averageTextLength: 50,
      commonWords: [],
      sessionDuration: 0
    };
  }
  /**
   * Analyze writing style based on word patterns
   */
  analyzeWritingStyle(words) {
    const technicalWords = ["\u0430\u043B\u0433\u043E\u0440\u0438\u0442\u043C", "\u043F\u0440\u043E\u0433\u0440\u0430\u043C\u043C\u0430", "\u0441\u0438\u0441\u0442\u0435\u043C\u0430", "\u0434\u0430\u043D\u043D\u044B\u0435", "\u043A\u043E\u0434"];
    const academicWords = ["\u0438\u0441\u0441\u043B\u0435\u0434\u043E\u0432\u0430\u043D\u0438\u0435", "\u0430\u043D\u0430\u043B\u0438\u0437", "\u0442\u0435\u043E\u0440\u0438\u044F", "\u043A\u043E\u043D\u0446\u0435\u043F\u0446\u0438\u044F", "\u043C\u0435\u0442\u043E\u0434\u043E\u043B\u043E\u0433\u0438\u044F"];
    const casualWords = ["\u043F\u0440\u0438\u0432\u0435\u0442", "\u0441\u043F\u0430\u0441\u0438\u0431\u043E", "\u0445\u043E\u0440\u043E\u0448\u043E", "\u043E\u0442\u043B\u0438\u0447\u043D\u043E", "\u043A\u0440\u0443\u0442\u043E"];
    let technicalCount = 0;
    let academicCount = 0;
    let casualCount = 0;
    words.forEach((word) => {
      const lowerWord = word.toLowerCase();
      if (technicalWords.includes(lowerWord)) technicalCount++;
      if (academicWords.includes(lowerWord)) academicCount++;
      if (casualWords.includes(lowerWord)) casualCount++;
    });
    const total = technicalCount + academicCount + casualCount;
    if (total === 0) return "mixed";
    if (technicalCount / total > 0.4) return "technical";
    if (academicCount / total > 0.4) return "academic";
    if (casualCount / total > 0.4) return "casual";
    return "mixed";
  }
  /**
   * Get partition-specific hit count (placeholder)
   */
  getPartitionHits(_letter) {
    return Math.floor(Math.random() * 100);
  }
  /**
   * Get partition-specific request count (placeholder)
   */
  getPartitionRequests(_letter) {
    return Math.floor(Math.random() * 150);
  }
};

// server/api/AdaptiveThresholds.ts
var AdaptiveThresholds = class {
  // 30 minutes
  constructor(cache, memoryMonitor2, preloader) {
    this.adjustmentHistory = [];
    this.lastOptimization = Date.now();
    this.OPTIMIZATION_INTERVAL = 30 * 60 * 1e3;
    this.cache = cache;
    this.memoryMonitor = memoryMonitor2;
    this.preloader = preloader;
    this.config = {
      minCacheSize: 4,
      maxCacheSize: 16,
      adjustmentSensitivity: 0.1,
      learningRate: 0.05,
      stabilityThreshold: 0.95
    };
  }
  /**
   * Increase cache size based on performance metrics
   */
  increaseCacheSize() {
    const currentStats = this.cache.getStats();
    const currentSize = currentStats.maxSize;
    const memoryStatus = this.memoryMonitor.getStatus();
    if (memoryStatus.currentMemory.usagePercent > 80) {
      console.log("\u{1F6AB} Adaptive: Cannot increase cache size - high memory pressure");
      return false;
    }
    if (currentSize >= this.config.maxCacheSize) {
      console.log("\u{1F6AB} Adaptive: Cache size already at maximum");
      return false;
    }
    const newSize = Math.min(this.config.maxCacheSize, currentSize + 2);
    const adjustment = {
      type: "cache_size",
      oldValue: currentSize,
      newValue: newSize,
      reason: `High hit rate (${(currentStats.hitRate * 100).toFixed(1)}%) with low memory pressure`,
      expectedImpact: "Improved cache hit rate and reduced response times"
    };
    this.cache.setMaxSize(newSize);
    this.recordAdjustment(adjustment);
    console.log(`\u{1F4C8} Adaptive: Increased cache size from ${currentSize} to ${newSize}`);
    return true;
  }
  /**
   * Decrease cache size to reduce memory pressure
   */
  decreaseCacheSize() {
    const currentStats = this.cache.getStats();
    const currentSize = currentStats.maxSize;
    if (currentSize <= this.config.minCacheSize) {
      console.log("\u{1F6AB} Adaptive: Cache size already at minimum");
      return false;
    }
    const newSize = Math.max(this.config.minCacheSize, currentSize - 1);
    const adjustment = {
      type: "cache_size",
      oldValue: currentSize,
      newValue: newSize,
      reason: "High memory pressure or low hit rate detected",
      expectedImpact: "Reduced memory usage with minimal performance impact"
    };
    this.cache.setMaxSize(newSize);
    this.recordAdjustment(adjustment);
    console.log(`\u{1F4C9} Adaptive: Decreased cache size from ${currentSize} to ${newSize}`);
    return true;
  }
  /**
   * Update partition priorities based on usage frequency
   */
  updatePartitionPriorities(letterFrequency) {
    const totalUsage = Array.from(letterFrequency.values()).reduce((sum, count2) => sum + count2, 0);
    if (totalUsage === 0) return;
    const newPriorities = /* @__PURE__ */ new Map();
    letterFrequency.forEach((count2, letter) => {
      const frequency = count2 / totalUsage;
      newPriorities.set(letter, frequency);
    });
    const sortedLetters = Array.from(newPriorities.entries()).sort((a, b) => b[1] - a[1]);
    const highPriorityCount = Math.ceil(sortedLetters.length * 0.3);
    const mediumPriorityCount = Math.ceil(sortedLetters.length * 0.4);
    const newHighPriority = sortedLetters.slice(0, highPriorityCount).map(([letter]) => letter);
    const newMediumPriority = sortedLetters.slice(highPriorityCount, highPriorityCount + mediumPriorityCount).map(([letter]) => letter);
    const adjustment = {
      type: "partition_priority",
      oldValue: "Static priorities",
      newValue: { high: newHighPriority, medium: newMediumPriority },
      reason: "Updated based on actual usage patterns",
      expectedImpact: "Better cache retention for frequently used partitions"
    };
    this.recordAdjustment(adjustment);
    console.log("\u{1F3AF} Adaptive: Updated partition priorities based on usage patterns");
  }
  /**
   * Optimize memory thresholds based on system performance
   */
  optimizeMemoryThresholds() {
    const memoryStatus = this.memoryMonitor.getStatus();
    const currentThresholds = memoryStatus.thresholds;
    const usagePercent = memoryStatus.currentMemory.usagePercent;
    let multiplier = 1;
    if (usagePercent < 60) {
      multiplier = 1.1;
    } else if (usagePercent > 85) {
      multiplier = 0.9;
    }
    const newThresholds = {
      warning: Math.floor(currentThresholds.warning * multiplier),
      cleanup: Math.floor(currentThresholds.cleanup * multiplier),
      critical: Math.floor(currentThresholds.critical * multiplier)
    };
    const changePercent = Math.abs(multiplier - 1);
    if (changePercent > 0.05) {
      this.memoryMonitor.updateThresholds(newThresholds);
      const adjustment = {
        type: "memory_threshold",
        oldValue: {
          warningMB: Math.round(currentThresholds.warning / 1024 / 1024),
          cleanupMB: Math.round(currentThresholds.cleanup / 1024 / 1024),
          criticalMB: Math.round(currentThresholds.critical / 1024 / 1024)
        },
        newValue: {
          warningMB: Math.round(newThresholds.warning / 1024 / 1024),
          cleanupMB: Math.round(newThresholds.cleanup / 1024 / 1024),
          criticalMB: Math.round(newThresholds.critical / 1024 / 1024)
        },
        reason: `Memory usage consistently at ${usagePercent.toFixed(1)}%`,
        expectedImpact: multiplier > 1 ? "Allow higher memory usage before cleanup" : "More aggressive memory management"
      };
      this.recordAdjustment(adjustment);
      console.log(`\u2699\uFE0F Adaptive: Updated memory thresholds (${multiplier > 1 ? "increased" : "decreased"} by ${(changePercent * 100).toFixed(1)}%)`);
    }
  }
  /**
   * Adjust preloading strategy based on performance
   */
  adjustPreloadingStrategy() {
    const preloaderStats = this.preloader.getPreloadingStats();
    const memoryStatus = this.memoryMonitor.getStatus();
    let newStrategy;
    let reason;
    if (memoryStatus.currentMemory.usagePercent > 80) {
      newStrategy = "conservative";
      reason = "High memory pressure detected";
    } else if (preloaderStats.cacheEfficiency > 90 && memoryStatus.currentMemory.usagePercent < 60) {
      newStrategy = "aggressive";
      reason = "High cache efficiency with low memory pressure";
    } else {
      newStrategy = "balanced";
      reason = "Balanced performance and memory usage";
    }
    const adjustment = {
      type: "preload_strategy",
      oldValue: "Current strategy",
      newValue: newStrategy,
      reason,
      expectedImpact: this.getStrategyImpact(newStrategy)
    };
    this.recordAdjustment(adjustment);
    console.log(`\u{1F3AF} Adaptive: Adjusted preloading strategy to ${newStrategy}`);
  }
  /**
   * Perform comprehensive system optimization
   */
  optimizeSystem() {
    const now = Date.now();
    if (now - this.lastOptimization < this.OPTIMIZATION_INTERVAL) {
      return;
    }
    console.log("\u{1F527} Adaptive: Starting system optimization...");
    const cacheStats = this.cache.getStats();
    const memoryStatus = this.memoryMonitor.getStatus();
    const hitRate = cacheStats.hitRate;
    const memoryPressure = memoryStatus.currentMemory.usagePercent / 100;
    if (hitRate > 0.95 && memoryPressure < 0.7) {
      this.increaseCacheSize();
    } else if (hitRate < 0.8 || memoryPressure > 0.85) {
      this.decreaseCacheSize();
    }
    this.optimizeMemoryThresholds();
    this.adjustPreloadingStrategy();
    const topUsedLetters = this.preloader.getTopUsedLetters(10);
    if (topUsedLetters.length > 0) {
      const letterFreq = /* @__PURE__ */ new Map();
      topUsedLetters.forEach((letter, index) => {
        letterFreq.set(letter, topUsedLetters.length - index);
      });
      this.updatePartitionPriorities(letterFreq);
    }
    this.lastOptimization = now;
    console.log("\u2705 Adaptive: System optimization complete");
  }
  /**
   * Get optimization history
   */
  getOptimizationHistory() {
    return this.adjustmentHistory.slice(-20);
  }
  /**
   * Get system stability score (0-1)
   */
  getStabilityScore() {
    const recentAdjustments = this.adjustmentHistory.slice(-10);
    if (recentAdjustments.length === 0) return 1;
    const adjustmentTypes = new Set(recentAdjustments.map((adj) => adj.type));
    const typeCount = adjustmentTypes.size;
    return Math.max(0, 1 - typeCount * 0.2);
  }
  /**
   * Record an adjustment for historical analysis
   */
  recordAdjustment(adjustment) {
    this.adjustmentHistory.push({
      ...adjustment,
      timestamp: Date.now()
    });
    if (this.adjustmentHistory.length > 50) {
      this.adjustmentHistory = this.adjustmentHistory.slice(-50);
    }
  }
  /**
   * Get expected impact description for preloading strategy
   */
  getStrategyImpact(strategy) {
    switch (strategy) {
      case "conservative":
        return "Reduced memory usage, slightly lower cache hit rate";
      case "balanced":
        return "Optimal balance of memory usage and performance";
      case "aggressive":
        return "Higher cache hit rate, increased memory usage";
      default:
        return "Unknown impact";
    }
  }
};

// server/api/AdaptiveMemoryManager.ts
var AdaptiveMemoryManager = class {
  constructor(cache, memoryMonitor2, preloader) {
    this.isOptimizing = false;
    this.lastOptimizationResult = null;
    this.optimizationCount = 0;
    this.cache = cache;
    this.memoryMonitor = memoryMonitor2;
    this.preloader = preloader;
    this.analytics = new MemoryAnalytics(cache, preloader);
    this.thresholds = new AdaptiveThresholds(cache, memoryMonitor2, preloader);
    this.startAutomaticOptimization();
  }
  /**
   * Perform comprehensive system optimization
   */
  async optimizeBasedOnUsage() {
    if (this.isOptimizing) {
      return {
        success: false,
        adjustmentsMade: 0,
        performanceImprovement: 0,
        memoryReduction: 0,
        errors: ["Optimization already in progress"]
      };
    }
    this.isOptimizing = true;
    console.log("\u{1F680} Adaptive Manager: Starting comprehensive optimization...");
    try {
      const beforeStats = this.getSystemMetrics();
      const adjustmentsMade = await this.performOptimizations();
      const afterStats = this.getSystemMetrics();
      const result = {
        success: true,
        adjustmentsMade,
        performanceImprovement: this.calculatePerformanceImprovement(beforeStats, afterStats),
        memoryReduction: this.calculateMemoryReduction(beforeStats, afterStats),
        errors: []
      };
      this.lastOptimizationResult = result;
      this.optimizationCount++;
      console.log("\u2705 Adaptive Manager: Optimization complete:", {
        adjustments: result.adjustmentsMade,
        performanceGain: `${result.performanceImprovement.toFixed(1)}%`,
        memoryReduction: `${result.memoryReduction.toFixed(1)}%`
      });
      return result;
    } catch (error) {
      console.error("\u274C Adaptive Manager: Optimization failed:", error);
      return {
        success: false,
        adjustmentsMade: 0,
        performanceImprovement: 0,
        memoryReduction: 0,
        errors: [error instanceof Error ? error.message : "Unknown error"]
      };
    } finally {
      this.isOptimizing = false;
    }
  }
  /**
   * Get comprehensive system health assessment
   */
  getSystemHealth() {
    const cacheStats = this.cache.getStats();
    const memoryStatus = this.memoryMonitor.getStatus();
    const preloaderStats = this.preloader.getPreloadingStats();
    const stabilityScore = this.thresholds.getStabilityScore();
    const cacheEfficiency = Math.min(100, cacheStats.hitRate * 100);
    const memoryHealth = Math.max(0, 100 - memoryStatus.currentMemory.usagePercent);
    const responseTime = Math.max(0, 100 - preloaderStats.averagePreloadTime / 10);
    const stability = stabilityScore * 100;
    const overallScore = (cacheEfficiency + memoryHealth + responseTime + stability) / 4;
    let overall;
    if (overallScore >= 90) overall = "excellent";
    else if (overallScore >= 75) overall = "good";
    else if (overallScore >= 60) overall = "fair";
    else if (overallScore >= 40) overall = "poor";
    else overall = "critical";
    const recommendations = this.generateHealthRecommendations(
      cacheEfficiency,
      memoryHealth,
      responseTime,
      stability
    );
    return {
      overall,
      metrics: {
        cacheEfficiency,
        memoryHealth,
        responseTime,
        stability
      },
      recommendations,
      nextOptimization: this.getNextOptimizationTime()
    };
  }
  /**
   * Get optimization statistics
   */
  getOptimizationStats() {
    return {
      totalOptimizations: this.optimizationCount,
      lastResult: this.lastOptimizationResult,
      averageImprovement: this.calculateAverageImprovement(),
      systemUptime: process.uptime()
    };
  }
  /**
   * Force immediate optimization
   */
  async forceOptimization() {
    console.log("\u{1F527} Adaptive Manager: Force optimization requested");
    return await this.optimizeBasedOnUsage();
  }
  /**
   * Update system with new usage data
   */
  updateUsageData(textLength, language, words) {
    this.analytics.updateUserProfile(textLength, language, words);
  }
  /**
   * Start automatic optimization process
   */
  startAutomaticOptimization() {
    setInterval(async () => {
      const health = this.getSystemHealth();
      if (health.overall !== "excellent") {
        console.log(`\u{1F504} Adaptive Manager: Auto-optimization triggered (health: ${health.overall})`);
        await this.optimizeBasedOnUsage();
      }
    }, 2 * 60 * 60 * 1e3);
    setInterval(() => {
      const health = this.getSystemHealth();
      if (health.overall === "critical" && !this.isOptimizing) {
        console.log("\u{1F6A8} Adaptive Manager: Emergency optimization triggered");
        this.optimizeBasedOnUsage().catch((error) => {
          console.error("Emergency optimization failed:", error);
        });
      }
    }, 5 * 60 * 1e3);
  }
  /**
   * Perform all optimization steps
   */
  async performOptimizations() {
    let adjustmentCount = 0;
    const plan = this.analytics.generateOptimizationPlan();
    console.log("\u{1F4CB} Optimization plan:", plan);
    const currentCacheSize = this.cache.getStats().maxSize;
    if (plan.cacheSize !== currentCacheSize) {
      this.cache.setMaxSize(plan.cacheSize);
      adjustmentCount++;
      console.log(`\u{1F4CF} Adjusted cache size: ${currentCacheSize} \u2192 ${plan.cacheSize}`);
    }
    const currentThresholds = this.memoryMonitor.getStatus().thresholds;
    const newWarningMB = Math.round(plan.memoryThresholds.warning / 1024 / 1024);
    const newCleanupMB = Math.round(plan.memoryThresholds.cleanup / 1024 / 1024);
    const currentWarningMB = Math.round(currentThresholds.warning / 1024 / 1024);
    const currentCleanupMB = Math.round(currentThresholds.cleanup / 1024 / 1024);
    if (newWarningMB !== currentWarningMB || newCleanupMB !== currentCleanupMB) {
      this.memoryMonitor.updateThresholds(plan.memoryThresholds);
      adjustmentCount++;
      console.log(`\u{1F39A}\uFE0F Updated memory thresholds: ${newWarningMB}MB/${newCleanupMB}MB`);
    }
    if (plan.partitionPriorities.size > 0) {
      this.thresholds.updatePartitionPriorities(plan.partitionPriorities);
      adjustmentCount++;
      console.log("\u{1F3AF} Updated partition priorities");
    }
    this.thresholds.adjustPreloadingStrategy();
    adjustmentCount++;
    const memoryPressure = this.analytics.predictMemoryPressure();
    if (memoryPressure.riskLevel === "high" || memoryPressure.riskLevel === "critical") {
      this.memoryMonitor.forceCheck();
      adjustmentCount++;
      console.log("\u{1F9F9} Performed memory cleanup");
    }
    return adjustmentCount;
  }
  /**
   * Get current system metrics for comparison
   */
  getSystemMetrics() {
    const cacheStats = this.cache.getStats();
    const memoryStatus = this.memoryMonitor.getStatus();
    const preloaderStats = this.preloader.getPreloadingStats();
    return {
      hitRate: cacheStats.hitRate,
      memoryUsage: memoryStatus.currentMemory.heapUsed,
      responseTime: preloaderStats.averagePreloadTime,
      cacheSize: cacheStats.size
    };
  }
  /**
   * Calculate performance improvement percentage
   */
  calculatePerformanceImprovement(before, after) {
    const hitRateImprovement = (after.hitRate - before.hitRate) / Math.max(before.hitRate, 0.01) * 100;
    const responseTimeImprovement = (before.responseTime - after.responseTime) / Math.max(before.responseTime, 1) * 100;
    return (hitRateImprovement + responseTimeImprovement) / 2;
  }
  /**
   * Calculate memory reduction percentage
   */
  calculateMemoryReduction(before, after) {
    return (before.memoryUsage - after.memoryUsage) / Math.max(before.memoryUsage, 1) * 100;
  }
  /**
   * Generate health-based recommendations
   */
  generateHealthRecommendations(cacheEfficiency, memoryHealth, responseTime, stability) {
    const recommendations = [];
    if (cacheEfficiency < 70) {
      recommendations.push("Consider increasing cache size or improving preloading strategy");
    }
    if (memoryHealth < 50) {
      recommendations.push("High memory usage detected - consider reducing cache size");
    }
    if (responseTime < 60) {
      recommendations.push("Slow response times - optimize partition loading");
    }
    if (stability < 80) {
      recommendations.push("System instability detected - reduce optimization frequency");
    }
    if (recommendations.length === 0) {
      recommendations.push("System is performing optimally");
    }
    return recommendations;
  }
  /**
   * Get next scheduled optimization time
   */
  getNextOptimizationTime() {
    return Date.now() + 2 * 60 * 60 * 1e3;
  }
  /**
   * Calculate average improvement across all optimizations
   */
  calculateAverageImprovement() {
    return this.lastOptimizationResult?.performanceImprovement || 0;
  }
};

// server/api/spellcheck.ts
var __filename2 = fileURLToPath2(import.meta.url);
var __dirname3 = path11.dirname(__filename2);
var router34 = express2.Router();
var partitionCache = new PartitionLRUCache(8);
var fallbackWords = /* @__PURE__ */ new Set();
var memoryMonitor = new MemoryMonitor(partitionCache);
var intelligentPreloader = new IntelligentPreloader(partitionCache, loadPartitionFromFile);
var adaptiveManager = new AdaptiveMemoryManager(partitionCache, memoryMonitor, intelligentPreloader);
var NON_INITIAL_LETTERS = /* @__PURE__ */ new Set(["\u044C", "\u044A", "\u044B"]);
async function loadPartitionFromFile(letter) {
  if (NON_INITIAL_LETTERS.has(letter.toLowerCase())) {
    console.log(`\u{1F4DD} Skipping partition '${letter}' - Russian words cannot start with this letter`);
    return /* @__PURE__ */ new Set();
  }
  const partitionPath = path11.join(__dirname3, `../../client/src/plugins/texteditor/dictionaries/prefixes/rare/ru_${letter}.txt`);
  if (!fs10.existsSync(partitionPath)) {
    throw new Error(`Partition file not found: ru_${letter}.txt`);
  }
  const content = fs10.readFileSync(partitionPath, "utf8");
  const words = /* @__PURE__ */ new Set();
  content.split("\n").forEach((word) => {
    const cleanWord = word.trim().toLowerCase();
    if (cleanWord.length > 0) {
      words.add(cleanWord);
    }
  });
  console.log(`\u{1F4DA} Loaded partition '${letter}': ${words.size} words`);
  return words;
}
function loadPartition(letter) {
  const cachedPartition = partitionCache.get(letter);
  if (cachedPartition) {
    return cachedPartition;
  }
  if (NON_INITIAL_LETTERS.has(letter.toLowerCase())) {
    console.log(`\u{1F4DD} Skipping partition '${letter}' - Russian words cannot start with this letter`);
    return /* @__PURE__ */ new Set();
  }
  try {
    const partitionPath = path11.join(__dirname3, `../../client/src/plugins/texteditor/dictionaries/prefixes/rare/ru_${letter}.txt`);
    if (!fs10.existsSync(partitionPath)) {
      console.error(`Partition file not found: ru_${letter}.txt`);
      return /* @__PURE__ */ new Set();
    }
    const content = fs10.readFileSync(partitionPath, "utf8");
    const words = /* @__PURE__ */ new Set();
    content.split("\n").forEach((word) => {
      const cleanWord = word.trim().toLowerCase();
      if (cleanWord.length > 0) {
        words.add(cleanWord);
      }
    });
    partitionCache.set(letter, words);
    console.log(`\u{1F4DA} Loaded partition '${letter}': ${words.size} words`);
    return words;
  } catch (error) {
    console.error(`Failed to load partition '${letter}':`, error);
    return /* @__PURE__ */ new Set();
  }
}
function initializeFallback() {
  const essentialWords = ["\u043F\u0440\u043E\u0433\u0440\u0430\u043C\u043C\u0430", "\u043F\u0440\u0438\u0432\u0435\u0442", "\u043A\u043E\u043C\u043F\u044C\u044E\u0442\u0435\u0440", "\u0438\u043D\u0442\u0435\u0440\u043D\u0435\u0442", "\u0441\u0438\u0441\u0442\u0435\u043C\u0430", "\u0434\u0430\u043D\u043D\u044B\u0435", "\u0430\u0431\u0430\u0436\u0443\u0440", "\u0430\u0431\u0437\u0430\u0446", "\u0430\u0432\u0442\u043E\u0431\u0443\u0441"];
  essentialWords.forEach((word) => fallbackWords.add(word));
  console.log("\u{1F504} Initialized fallback dictionary with essential words");
}
initializeFallback();
memoryMonitor.startMonitoring();
console.log("\u{1F50D} Memory monitoring started");
function isWordCorrect(word, language = "ru") {
  const normalizedWord = word.toLowerCase().trim();
  console.log(`\u{1F50D} SERVER DEBUG: Checking word "${word}" -> normalized: "${normalizedWord}" in language: ${language}`);
  if (language === "ru" && normalizedWord.length > 0) {
    const firstLetter = normalizedWord[0];
    const partition = loadPartition(firstLetter);
    const result = partition.has(normalizedWord);
    const fallbackResult = !result ? fallbackWords.has(normalizedWord) : false;
    console.log(`\u{1F50D} SERVER DEBUG: "${normalizedWord}" [${firstLetter}] - Partition: ${result}, Fallback: ${fallbackResult}, Final: ${result || fallbackResult}`);
    console.log(`\u{1F4CA} SERVER DEBUG: Partition '${firstLetter}' size: ${partition.size}, Cache stats: ${JSON.stringify(partitionCache.getStats())}`);
    return result || fallbackResult;
  }
  return false;
}
router34.post("/", async (req, res) => {
  try {
    const { word, language = "ru" } = req.body;
    if (!word) {
      return res.status(400).json({ error: "Word is required" });
    }
    const isCorrect = isWordCorrect(word, language);
    res.json({ isCorrect });
  } catch (error) {
    console.error("Legacy spell check error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
router34.post("/check", async (req, res) => {
  try {
    const { words, language = "ru", text: text2 } = req.body;
    if (!Array.isArray(words)) {
      return res.status(400).json({ error: "Words must be an array" });
    }
    if (text2 && typeof text2 === "string" && text2.length > 20) {
      intelligentPreloader.analyzeAndPreload(text2).catch((error) => {
        console.warn("Preloading failed:", error);
      });
      adaptiveManager.updateUsageData(text2.length, language, words);
    }
    const results = words.map((word) => ({
      word,
      correct: isWordCorrect(word, language)
    }));
    res.json({
      results,
      language,
      dictionarySize: language === "ru" ? partitionCache.getTotalWords() + fallbackWords.size : 0
    });
  } catch (error) {
    console.error("Spell check error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
router34.post("/cache/clear", (_req, res) => {
  const beforeStats = partitionCache.getStats();
  partitionCache.clear();
  const afterStats = partitionCache.getStats();
  res.json({
    message: "Cache cleared successfully",
    before: beforeStats,
    after: afterStats
  });
});
router34.post("/cache/resize", (req, res) => {
  const { size } = req.body;
  if (!size || size < 1 || size > 20) {
    return res.status(400).json({ error: "Size must be between 1 and 20" });
  }
  const oldSize = partitionCache.getStats().maxSize;
  partitionCache.setMaxSize(size);
  const newStats = partitionCache.getStats();
  res.json({
    message: `Cache resized from ${oldSize} to ${size}`,
    stats: newStats
  });
});
router34.get("/memory/status", (_req, res) => {
  const status = memoryMonitor.getStatus();
  res.json(status);
});
router34.post("/memory/check", (_req, res) => {
  memoryMonitor.forceCheck();
  const status = memoryMonitor.getStatus();
  res.json({
    message: "Memory check completed",
    status
  });
});
router34.post("/memory/thresholds", (req, res) => {
  const { warning, cleanup, critical } = req.body;
  const thresholds = {};
  if (warning) thresholds.warning = warning * 1024 * 1024;
  if (cleanup) thresholds.cleanup = cleanup * 1024 * 1024;
  if (critical) thresholds.critical = critical * 1024 * 1024;
  memoryMonitor.updateThresholds(thresholds);
  res.json({
    message: "Memory thresholds updated",
    status: memoryMonitor.getStatus()
  });
});
router34.get("/preloader/stats", (_req, res) => {
  const stats = intelligentPreloader.getPreloadingStats();
  res.json(stats);
});
router34.post("/preloader/optimize", (_req, res) => {
  intelligentPreloader.optimizeCache();
  res.json({
    message: "Cache optimization triggered",
    stats: intelligentPreloader.getPreloadingStats()
  });
});
router34.post("/preloader/analyze", (req, res) => {
  const { text: text2 } = req.body;
  if (!text2 || typeof text2 !== "string") {
    return res.status(400).json({ error: "Text is required" });
  }
  intelligentPreloader.analyzeAndPreload(text2).then(() => {
    res.json({
      message: "Text analysis and preloading completed",
      stats: intelligentPreloader.getPreloadingStats()
    });
  }).catch((error) => {
    res.status(500).json({ error: "Analysis failed", details: error.message });
  });
});
router34.get("/dictionaries/:type/:category/:filename", (req, res) => {
  const { type, category, filename } = req.params;
  if (!["prefixes", "partitions"].includes(type)) {
    return res.status(400).json({ error: "Invalid dictionary type" });
  }
  if (type === "prefixes" && !["common", "rare"].includes(category)) {
    return res.status(400).json({ error: "Invalid prefix category" });
  }
  if (!filename.match(/^ru_[а-я]{1,2}\.txt$/)) {
    return res.status(400).json({ error: "Invalid filename format" });
  }
  const filePath = path11.join(__dirname3, "../../client/src/plugins/texteditor/dictionaries", type, category, filename);
  if (!fs10.existsSync(filePath)) {
    return res.status(404).json({ error: "Dictionary file not found" });
  }
  try {
    const content = fs10.readFileSync(filePath, "utf8");
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
    res.setHeader("Pragma", "no-cache");
    res.setHeader("Expires", "0");
    res.send(content);
  } catch (error) {
    res.status(500).json({ error: "Failed to read dictionary file" });
  }
});
router34.get("/dictionaries/:type/:filename", (req, res) => {
  const { type, filename } = req.params;
  if (type !== "partitions") {
    return res.status(400).json({ error: "Invalid dictionary type" });
  }
  if (!filename.match(/^ru_[а-я]\.txt$/)) {
    return res.status(400).json({ error: "Invalid filename format" });
  }
  const filePath = path11.join(__dirname3, "../../client/src/plugins/texteditor/dictionaries", type, filename);
  if (!fs10.existsSync(filePath)) {
    return res.status(404).json({ error: "Dictionary file not found" });
  }
  try {
    const content = fs10.readFileSync(filePath, "utf8");
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
    res.setHeader("Pragma", "no-cache");
    res.setHeader("Expires", "0");
    res.send(content);
  } catch (error) {
    res.status(500).json({ error: "Failed to read dictionary file" });
  }
});
router34.get("/analytics/health", (_req, res) => {
  const health = adaptiveManager.getSystemHealth();
  res.json(health);
});
router34.get("/analytics/stats", (_req, res) => {
  const stats = adaptiveManager.getOptimizationStats();
  res.json(stats);
});
router34.post("/analytics/optimize", async (_req, res) => {
  try {
    const result = await adaptiveManager.forceOptimization();
    res.json({
      message: "System optimization completed",
      result
    });
  } catch (error) {
    res.status(500).json({
      error: "Optimization failed",
      details: error instanceof Error ? error.message : "Unknown error"
    });
  }
});
router34.post("/analytics/usage", (req, res) => {
  const { textLength, language, words } = req.body;
  if (!textLength || !language || !Array.isArray(words)) {
    return res.status(400).json({ error: "Missing required fields: textLength, language, words" });
  }
  adaptiveManager.updateUsageData(textLength, language, words);
  res.json({ message: "Usage data updated successfully" });
});
router34.get("/health", (_req, res) => {
  res.json({
    status: "ok",
    timestamp: (/* @__PURE__ */ new Date()).toISOString(),
    endpoints: ["/", "/check", "/stats", "/cache/clear"],
    dictionaryStatus: partitionCache.getStats()
  });
});
router34.get("/stats", (_req, res) => {
  const cacheStats = partitionCache.getStats();
  const memoryStatus = memoryMonitor.getStatus();
  res.json({
    russian: {
      cache: {
        size: cacheStats.size,
        maxSize: cacheStats.maxSize,
        hitRate: Math.round(cacheStats.hitRate * 100) / 100,
        totalRequests: cacheStats.totalRequests,
        totalHits: cacheStats.totalHits,
        memoryUsageMB: Math.round(partitionCache.getMemoryUsageMB() * 100) / 100
      },
      partitions: {
        loaded: partitionCache.getCachedPartitions(),
        totalWords: partitionCache.getTotalWords(),
        fallbackWords: fallbackWords.size
      },
      memory: {
        isMonitoring: memoryStatus.isMonitoring,
        currentUsageMB: Math.round(memoryStatus.currentMemory.heapUsed / 1024 / 1024),
        usagePercent: Math.round(memoryStatus.currentMemory.usagePercent),
        thresholds: {
          warningMB: Math.round(memoryStatus.thresholds.warning / 1024 / 1024),
          cleanupMB: Math.round(memoryStatus.thresholds.cleanup / 1024 / 1024),
          criticalMB: Math.round(memoryStatus.thresholds.critical / 1024 / 1024)
        }
      }
    }
  });
});
router34.get("/hybrid-stats", (_req, res) => {
  res.json({
    message: "Hybrid dictionary stats are managed client-side",
    serverStats: {
      dictionaryFilesServed: "Available via /dictionaries endpoints",
      cacheDisabled: true,
      filesLocation: "client/src/plugins/texteditor/dictionaries/prefixes/rare/"
    }
  });
});
router34.post("/word", async (req, res) => {
  const { word, language = "ru" } = req.body;
  if (!word || typeof word !== "string") {
    return res.status(400).json({ error: "Word is required" });
  }
  try {
    const isValid = await validateSingleWord(word, language);
    res.json({ word, isValid, language });
  } catch (error) {
    res.status(500).json({ error: "Validation failed" });
  }
});
async function validateSingleWord(word, language) {
  const prefix = word.substring(0, 2);
  const dictionary = await loadDictionaryForPrefix(prefix, language);
  return dictionary.has(word.toLowerCase());
}
async function loadDictionaryForPrefix(prefix, language) {
  const filePath = path11.join(__dirname3, `../../client/src/plugins/texteditor/dictionaries/prefixes/rare/${language}_${prefix}.txt`);
  console.log(`\u{1F50D} SERVER: Looking for dictionary at: ${filePath}`);
  if (!fs10.existsSync(filePath)) {
    console.log(`\u274C SERVER: Dictionary file not found: ${filePath}`);
    return /* @__PURE__ */ new Set();
  }
  try {
    const content = fs10.readFileSync(filePath, "utf8");
    const words = content.split("\n").filter((word) => word.trim() && !word.startsWith("#")).map((word) => word.toLowerCase().trim());
    console.log(`\u2705 SERVER: Loaded ${words.length} words from ${filePath}`);
    return new Set(words);
  } catch (error) {
    console.error(`\u274C SERVER: Error reading dictionary file:`, error);
    return /* @__PURE__ */ new Set();
  }
}
router34.post("/batch", async (req, res) => {
  const { words, language = "ru" } = req.body;
  if (!Array.isArray(words) || words.length === 0) {
    return res.status(400).json({ error: "Words array is required" });
  }
  if (words.length > 100) {
    return res.status(400).json({ error: "Maximum 100 words per batch" });
  }
  try {
    const results = await validateWordsBatch(words, language);
    res.json({ results, language });
  } catch (error) {
    console.error("Batch validation failed:", error);
    const fallbackResults = words.map(() => true);
    res.json({ results: fallbackResults, language, fallback: true });
  }
});
async function validateWordsBatch(words, language) {
  console.log(`\u{1F50D} SERVER BATCH: Validating ${words.length} words:`, words);
  try {
    const prefixGroups = /* @__PURE__ */ new Map();
    words.forEach((word) => {
      const prefix = word.substring(0, 2);
      if (!prefixGroups.has(prefix)) {
        prefixGroups.set(prefix, []);
      }
      prefixGroups.get(prefix).push(word);
    });
    console.log(`\u{1F50D} SERVER BATCH: Grouped into ${prefixGroups.size} prefixes:`, Array.from(prefixGroups.keys()));
    const results = new Array(words.length);
    for (const [prefix, prefixWords] of prefixGroups) {
      try {
        const dictionary = await loadDictionaryForPrefix(prefix, language);
        console.log(`\u{1F50D} SERVER BATCH: Loaded ${dictionary.size} words for prefix '${prefix}'`);
        prefixWords.forEach((word) => {
          const index = words.indexOf(word);
          results[index] = dictionary.has(word.toLowerCase());
        });
      } catch (error) {
        console.warn(`\u{1F50D} SERVER BATCH: Failed to load dictionary for prefix '${prefix}', marking words as valid`);
        prefixWords.forEach((word) => {
          const index = words.indexOf(word);
          results[index] = true;
        });
      }
    }
    console.log(`\u{1F50D} SERVER BATCH: Results:`, results);
    return results;
  } catch (error) {
    console.error("\u{1F50D} SERVER BATCH: Critical error in batch validation:", error);
    return words.map(() => true);
  }
}
var spellcheck_default = router34;

// server/api/editor-analytics.ts
init_db();
import { Router as Router33 } from "express";
var router35 = Router33();
router35.post("/events", async (req, res) => {
  try {
    const { events } = req.body;
    if (!Array.isArray(events) || events.length === 0) {
      return res.status(400).json({ error: "Invalid events data" });
    }
    const tableCheck = await pool.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_name = 'editor_analytics'
      )
    `);
    if (!tableCheck.rows[0].exists) {
      console.warn("Editor analytics table does not exist, skipping storage");
      return res.json({ success: true, processed: events.length, warning: "Table not created yet" });
    }
    const insertQuery = `
      INSERT INTO editor_analytics (session_id, user_id, event_type, timestamp, data, metadata)
      VALUES ($1, $2, $3, to_timestamp($4/1000), $5, $6)
    `;
    for (const event of events) {
      await pool.query(insertQuery, [
        event.sessionId,
        event.userId || null,
        event.eventType,
        event.timestamp,
        JSON.stringify(event.data),
        JSON.stringify(event.metadata)
      ]);
    }
    res.json({ success: true, processed: events.length });
  } catch (error) {
    console.error("Analytics storage error:", error);
    res.status(500).json({ error: "Failed to store analytics" });
  }
});
router35.post("/performance", async (req, res) => {
  try {
    const { metrics } = req.body;
    if (!Array.isArray(metrics)) {
      return res.status(400).json({ error: "Invalid metrics data" });
    }
    const tableCheck = await pool.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_name = 'editor_performance_metrics'
      )
    `);
    if (!tableCheck.rows[0].exists) {
      console.warn("Editor performance metrics table does not exist, skipping storage");
      return res.json({ success: true, processed: metrics.length, warning: "Table not created yet" });
    }
    const insertQuery = `
      INSERT INTO editor_performance_metrics (session_id, operation_type, duration_ms, memory_usage_kb, timestamp, metadata)
      VALUES ($1, $2, $3, $4, to_timestamp($5/1000), $6)
    `;
    for (const metric of metrics) {
      await pool.query(insertQuery, [
        metric.sessionId || "unknown",
        metric.operation,
        metric.duration,
        metric.metadata?.memoryUsage ? Math.round(metric.metadata.memoryUsage / 1024) : null,
        metric.timestamp,
        JSON.stringify(metric.metadata || {})
      ]);
    }
    res.json({ success: true, processed: metrics.length });
  } catch (error) {
    console.error("Performance metrics storage error:", error);
    res.status(500).json({ error: "Failed to store performance metrics" });
  }
});
router35.get("/dashboard/:timeRange", async (req, res) => {
  try {
    const { timeRange } = req.params;
    const intervals = {
      "hour": "1 hour",
      "day": "1 day",
      "week": "7 days",
      "month": "30 days"
    };
    const interval = intervals[timeRange] || "1 day";
    const tablesCheck = await pool.query(`
      SELECT 
        (SELECT EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'editor_performance_metrics')) as perf_exists,
        (SELECT EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'editor_analytics')) as analytics_exists
    `);
    const { perf_exists, analytics_exists } = tablesCheck.rows[0];
    let performanceData = { rows: [] };
    let eventsData = { rows: [] };
    if (perf_exists) {
      const performanceQuery = `
        SELECT 
          operation_type,
          COUNT(*) as total_operations,
          AVG(duration_ms) as avg_duration,
          MAX(duration_ms) as max_duration,
          AVG(memory_usage_kb) as avg_memory
        FROM editor_performance_metrics 
        WHERE timestamp >= NOW() - INTERVAL '${interval}'
        GROUP BY operation_type
        ORDER BY avg_duration DESC
      `;
      performanceData = await pool.query(performanceQuery);
    }
    if (analytics_exists) {
      const eventsQuery = `
        SELECT 
          event_type,
          COUNT(*) as count
        FROM editor_analytics 
        WHERE timestamp >= NOW() - INTERVAL '${interval}'
        GROUP BY event_type
      `;
      eventsData = await pool.query(eventsQuery);
    }
    res.json({
      timeRange,
      performance: performanceData.rows,
      events: eventsData.rows,
      tablesExist: { perf_exists, analytics_exists },
      generatedAt: (/* @__PURE__ */ new Date()).toISOString()
    });
  } catch (error) {
    console.error("Dashboard data error:", error);
    res.status(500).json({ error: "Failed to generate dashboard data" });
  }
});
var editor_analytics_default = router35;

// server/api/editor/upload-image.ts
init_storage();
import { Router as Router35 } from "express";
init_apiCache();
init_websocket();

// server/utils/editorCleanup.ts
import fs11 from "fs";
import path12 from "path";
async function cleanupEditorDirectory() {
  const editorDir = path12.join(process.cwd(), "public/uploads/editor/images");
  const cleaned = [];
  const errors = [];
  if (!fs11.existsSync(editorDir)) {
    return { cleaned, errors: ["Editor directory does not exist"] };
  }
  try {
    const files = fs11.readdirSync(editorDir);
    for (const file of files) {
      const filePath = path12.join(editorDir, file);
      if (!fs11.statSync(filePath).isFile()) continue;
      const ext = path12.extname(file).toLowerCase();
      if ([".jpg", ".jpeg", ".png", ".gif", ".jfif", ".bmp", ".tiff"].includes(ext)) {
        try {
          await fs11.promises.unlink(filePath);
          cleaned.push(file);
          console.log(`Cleaned up original file: ${file}`);
        } catch (error) {
          errors.push(`Failed to delete ${file}: ${error}`);
        }
        continue;
      }
      if (file.endsWith("_thumb.webp")) {
        try {
          await fs11.promises.unlink(filePath);
          cleaned.push(file);
          console.log(`Cleaned up thumbnail file: ${file}`);
        } catch (error) {
          errors.push(`Failed to delete ${file}: ${error}`);
        }
        continue;
      }
    }
    console.log(`Editor cleanup completed: ${cleaned.length} files cleaned, ${errors.length} errors`);
    return { cleaned, errors };
  } catch (error) {
    const errorMsg = `Error during editor cleanup: ${error}`;
    errors.push(errorMsg);
    console.error(errorMsg);
    return { cleaned, errors };
  }
}
async function handleEditorCleanupRequest() {
  const result = await cleanupEditorDirectory();
  return {
    message: `Editor cleanup completed: ${result.cleaned.length} files cleaned, ${result.errors.length} errors`,
    cleaned: result.cleaned,
    errors: result.errors
  };
}

// server/api/editor/cleanup.ts
import { Router as Router34 } from "express";
var router36 = Router34();
router36.post("/cleanup", asyncHandler(async (_req, res) => {
  const result = await handleEditorCleanupRequest();
  res.json({
    success: true,
    ...result
  });
}));
router36.post("/test-cleanup/:filename", asyncHandler(async (req, res) => {
  const { cleanupSpecificFileInDirectory: cleanupSpecificFileInDirectory2 } = await Promise.resolve().then(() => (init_mediaCleanup(), mediaCleanup_exports));
  const filename = req.params.filename;
  console.log(`Testing cleanup for: ${filename}`);
  const success = await cleanupSpecificFileInDirectory2(filename, "uploads/editor/images");
  res.json({
    success: true,
    filename,
    cleaned: success,
    message: success ? `Successfully cleaned ${filename}` : `Failed to clean ${filename}`
  });
}));
var cleanup_default = router36;

// server/api/editor/upload-image.ts
import multer2 from "multer";
import path13 from "path";
import fs12 from "fs";
import { v4 as uuidv43 } from "uuid";
import sharp3 from "sharp";
var router37 = Router35();
router37.use(cleanup_default);
cleanupEditorDirectory().catch((error) => {
  console.error("Failed to run editor cleanup on startup:", error);
});
var upload2 = multer2({
  storage: multer2.diskStorage({
    destination: (_req, _file, cb) => {
      const uploadDir = path13.join(process.cwd(), "public/uploads/editor/images");
      if (!fs12.existsSync(uploadDir)) {
        fs12.mkdirSync(uploadDir, { recursive: true });
      }
      cb(null, uploadDir);
    },
    filename: (_, file, cb) => {
      const uniqueFilename = `${uuidv43()}${path13.extname(file.originalname)}`;
      cb(null, uniqueFilename);
    }
  }),
  limits: {
    fileSize: 5 * 1024 * 1024
    // 5MB limit for editor images
  },
  fileFilter: (_req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new BadRequestError("Only image files are allowed for editor uploads"));
    }
  }
});
router37.post("/", upload2.single("image"), asyncHandler(async (req, res) => {
  if (!req.file) {
    throw new BadRequestError("No image uploaded");
  }
  const file = req.file;
  const originalName = file.originalname;
  let mimeType = file.mimetype;
  let size = file.size;
  const source = "editor";
  if (!isSupportedFileType(mimeType) || !mimeType.startsWith("image/")) {
    throw new BadRequestError(`Unsupported image type: ${mimeType}`);
  }
  const category = getFileCategory(mimeType);
  const folderPath = getUploadPath(mimeType, source);
  let url, thumbnailUrl;
  let filename = "";
  try {
    const filenameWithoutExt = path13.parse(file.filename).name;
    filename = `${filenameWithoutExt}.webp`;
    const webpPath = path13.join(process.cwd(), "public/uploads/editor/images", filename);
    console.log(`Converting ${file.path} to WebP: ${webpPath}`);
    const webpInfo = await sharp3(file.path).resize(300, 300, { fit: "inside", withoutEnlargement: true }).webp({ quality: 80 }).toFile(webpPath);
    console.log(`WebP conversion successful, size: ${webpInfo.size}`);
    mimeType = "image/webp";
    size = webpInfo.size;
    url = `/uploads/editor/images/${filename}`;
    thumbnailUrl = url;
    process.nextTick(async () => {
      const { cleanupSpecificFileInDirectory: cleanupSpecificFileInDirectory2 } = await Promise.resolve().then(() => (init_mediaCleanup(), mediaCleanup_exports));
      try {
        await new Promise((resolve) => setTimeout(resolve, 2e3));
        if (fs12.existsSync(file.path)) {
          await fs12.promises.unlink(file.path);
          console.log(`Editor: Original temp file deleted: ${file.path}`);
        }
        let success = false;
        for (let attempt = 1; attempt <= 3; attempt++) {
          success = await cleanupSpecificFileInDirectory2(file.filename, folderPath);
          if (success) {
            console.log(`Editor: Original file deleted on attempt ${attempt}: ${file.filename}`);
            break;
          } else {
            console.log(`Editor: Cleanup attempt ${attempt} failed for: ${file.filename}`);
            if (attempt < 3) {
              await new Promise((resolve) => setTimeout(resolve, 1e3));
            }
          }
        }
        if (!success) {
          console.error(`Editor: All cleanup attempts failed for: ${file.filename}`);
        }
      } catch (deleteError) {
        console.log(`Editor: Could not delete original files: ${deleteError}`);
      }
    });
    setTimeout(async () => {
      const originalPath = path13.join(process.cwd(), "public", folderPath, file.filename);
      if (fs12.existsSync(originalPath)) {
        console.error(`EDITOR CLEANUP FAILED: Original file still exists: ${originalPath}`);
      } else {
        console.log(`EDITOR CLEANUP SUCCESS: Original file deleted: ${originalPath}`);
      }
    }, 2e3);
  } catch (error) {
    console.error("Editor image processing failed:", error instanceof Error ? error.message : String(error));
    console.error("Sharp error details:", error);
    try {
      const filenameWithoutExt = path13.parse(file.filename).name;
      filename = `${filenameWithoutExt}.webp`;
      const basicWebpPath = path13.join(process.cwd(), "public/uploads/editor/images", filename);
      const basicWebpInfo = await sharp3(file.path).webp({ quality: 80 }).toFile(basicWebpPath);
      mimeType = "image/webp";
      size = basicWebpInfo.size;
      url = `/uploads/editor/images/${filename}`;
      thumbnailUrl = url;
      process.nextTick(async () => {
        const { cleanupSpecificFileInDirectory: cleanupSpecificFileInDirectory2 } = await Promise.resolve().then(() => (init_mediaCleanup(), mediaCleanup_exports));
        try {
          await new Promise((resolve) => setTimeout(resolve, 2e3));
          if (fs12.existsSync(file.path)) {
            await fs12.promises.unlink(file.path);
          }
          let success = false;
          for (let attempt = 1; attempt <= 3; attempt++) {
            success = await cleanupSpecificFileInDirectory2(file.filename, folderPath);
            if (success) {
              console.log(`Editor: Original file deleted on attempt ${attempt} (fallback): ${file.filename}`);
              break;
            } else {
              console.log(`Editor: Fallback cleanup attempt ${attempt} failed for: ${file.filename}`);
              if (attempt < 3) {
                await new Promise((resolve) => setTimeout(resolve, 1e3));
              }
            }
          }
          if (!success) {
            console.error(`Editor: All fallback cleanup attempts failed for: ${file.filename}`);
          }
        } catch (deleteError) {
          console.log(`Editor: Could not delete original files (fallback): ${deleteError}`);
        }
      });
      setTimeout(async () => {
        const originalPath = path13.join(process.cwd(), "public", folderPath, file.filename);
        if (fs12.existsSync(originalPath)) {
          console.error(`EDITOR FALLBACK CLEANUP FAILED: Original file still exists: ${originalPath}`);
        } else {
          console.log(`EDITOR FALLBACK CLEANUP SUCCESS: Original file deleted: ${originalPath}`);
        }
      }, 2e3);
      console.log("Basic WebP conversion successful");
    } catch (basicError) {
      console.error("Basic WebP conversion also failed:", basicError);
      filename = file.filename;
      url = `/uploads/editor/images/${filename}`;
      thumbnailUrl = url;
    }
  }
  const mediaFile = await storage.createMediaFile({
    filename,
    originalName,
    mimeType,
    size,
    url,
    thumbnailUrl,
    category,
    source,
    folderPath
  });
  await clearApiCache("GET:/api/media");
  broadcastMediaUpdate("uploaded", mediaFile);
  broadcastCacheInvalidation(["GET:/api/media"]);
  res.status(201).json({
    id: mediaFile.id,
    url: mediaFile.url,
    thumbnailUrl: mediaFile.thumbnailUrl,
    filename: mediaFile.filename,
    originalName: mediaFile.originalName,
    size: mediaFile.size,
    success: true
  });
}));
var upload_image_default = router37;

// server/api/products/routes.ts
init_connection();
init_websocket();
import { Router as Router36 } from "express";
var router38 = Router36();
router38.get("/", async (req, res) => {
  try {
    const {
      page = 1,
      limit = 12,
      category,
      search,
      active = "true"
    } = req.query;
    const offset = (Number(page) - 1) * Number(limit);
    let whereClause = "WHERE p.is_active = $1";
    let params = [active === "true"];
    let paramCount = 1;
    if (category) {
      paramCount++;
      whereClause += ` AND c.slug = $${paramCount}`;
      params.push(category);
    }
    if (search) {
      paramCount++;
      whereClause += ` AND (
        p.title ILIKE $${paramCount} OR 
        p.description ILIKE $${paramCount} OR
        p.content ILIKE $${paramCount}
      )`;
      params.push(`%${search}%`);
    }
    const query = `
      SELECT 
        p.*,
        c.name as category_name,
        c.slug as category_slug
      FROM products p
      LEFT JOIN product_categories c ON p.category_id = c.id
      ${whereClause}
      ORDER BY p.sort_order ASC, p.created_at DESC
      LIMIT $${paramCount + 1} OFFSET $${paramCount + 2}
    `;
    params.push(Number(limit), offset);
    const result = await db2.query(query, params);
    const countQuery = `
      SELECT COUNT(*) 
      FROM products p
      LEFT JOIN product_categories c ON p.category_id = c.id
      ${whereClause}
    `;
    const countResult = await db2.query(countQuery, params.slice(0, -2));
    const total = parseInt(countResult.rows[0].count);
    const products2 = result.rows.map((row) => ({
      id: row.id,
      title: row.title,
      description: row.description,
      content: row.content,
      image: row.image,
      slug: row.slug,
      categoryId: row.category_id,
      category: row.category_name ? {
        id: row.category_id,
        name: row.category_name,
        slug: row.category_slug,
        sortOrder: 0,
        isActive: true,
        createdAt: /* @__PURE__ */ new Date(),
        updatedAt: /* @__PURE__ */ new Date()
      } : void 0,
      price: row.price ? parseFloat(row.price) : void 0,
      features: row.features || [],
      isActive: row.is_active,
      sortOrder: row.sort_order,
      stockQuantity: row.stock_quantity || 0,
      trackInventory: row.track_inventory || false,
      allowBackorders: row.allow_backorders || false,
      createdAt: row.created_at,
      updatedAt: row.updated_at
    }));
    res.json({
      products: products2,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / Number(limit))
      }
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Failed to fetch products" });
  }
});
router38.post("/", async (req, res) => {
  try {
    const {
      title,
      description,
      content,
      image,
      slug,
      categoryId,
      price,
      features = [],
      sortOrder = 0
    } = req.body;
    const result = await db2.query(`
      INSERT INTO products (
        title, description, content, image, slug, 
        category_id, price, features, sort_order
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING *
    `, [title, description, content, image, slug, categoryId, price, JSON.stringify(features), sortOrder]);
    const product = result.rows[0];
    const productData = {
      id: product.id,
      title: product.title,
      description: product.description,
      content: product.content,
      image: product.image,
      slug: product.slug,
      categoryId: product.category_id,
      price: product.price ? parseFloat(product.price) : void 0,
      features: product.features || [],
      isActive: product.is_active,
      sortOrder: product.sort_order,
      createdAt: product.created_at,
      updatedAt: product.updated_at
    };
    broadcastToAll("product_created", productData);
    res.status(201).json(productData);
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ error: "Failed to create product" });
  }
});
router38.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      description,
      content,
      image,
      slug,
      categoryId,
      price,
      features,
      sortOrder,
      isActive
    } = req.body;
    const result = await db2.query(`
      UPDATE products 
      SET title = COALESCE($1, title),
          description = COALESCE($2, description),
          content = COALESCE($3, content),
          image = COALESCE($4, image),
          slug = COALESCE($5, slug),
          category_id = COALESCE($6, category_id),
          price = COALESCE($7, price),
          features = COALESCE($8, features),
          sort_order = COALESCE($9, sort_order),
          is_active = COALESCE($10, is_active),
          updated_at = NOW()
      WHERE id = $11
      RETURNING *
    `, [
      title,
      description,
      content,
      image,
      slug,
      categoryId,
      price,
      features ? JSON.stringify(features) : null,
      sortOrder,
      isActive,
      id
    ]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Product not found" });
    }
    const product = result.rows[0];
    const productData = {
      id: product.id,
      title: product.title,
      description: product.description,
      content: product.content,
      image: product.image,
      slug: product.slug,
      categoryId: product.category_id,
      price: product.price ? parseFloat(product.price) : void 0,
      features: product.features || [],
      isActive: product.is_active,
      sortOrder: product.sort_order,
      createdAt: product.created_at,
      updatedAt: product.updated_at
    };
    broadcastToAll("product_updated", productData);
    res.json(productData);
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ error: "Failed to update product" });
  }
});
router38.get("/slug/:slug", async (req, res) => {
  try {
    const { slug } = req.params;
    const query = `
      SELECT 
        p.*,
        c.name as category_name,
        c.slug as category_slug
      FROM products p
      LEFT JOIN product_categories c ON p.category_id = c.id
      WHERE p.slug = $1 AND p.is_active = true
    `;
    const result = await db2.query(query, [slug]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Product not found" });
    }
    const row = result.rows[0];
    const product = {
      id: row.id,
      title: row.title,
      description: row.description,
      content: row.content,
      image: row.image,
      slug: row.slug,
      categoryId: row.category_id,
      category: row.category_name ? {
        id: row.category_id,
        name: row.category_name,
        slug: row.category_slug,
        sortOrder: 0,
        isActive: true,
        createdAt: /* @__PURE__ */ new Date(),
        updatedAt: /* @__PURE__ */ new Date()
      } : void 0,
      price: row.price ? parseFloat(row.price) : void 0,
      features: row.features || [],
      isActive: row.is_active,
      sortOrder: row.sort_order,
      stockQuantity: row.stock_quantity || 0,
      trackInventory: row.track_inventory || false,
      allowBackorders: row.allow_backorders || false,
      createdAt: row.created_at,
      updatedAt: row.updated_at
    };
    res.json(product);
  } catch (error) {
    console.error("Error fetching product by slug:", error);
    res.status(500).json({ error: "Failed to fetch product" });
  }
});
router38.get("/search", async (req, res) => {
  try {
    const { q: query, lang = "en", limit = 10 } = req.query;
    if (!query || typeof query !== "string") {
      return res.status(400).json({ error: "Search query is required" });
    }
    const { searchService: searchService2 } = await Promise.resolve().then(() => (init_searchService(), searchService_exports));
    const results = await searchService2.searchProducts(
      query,
      lang,
      parseInt(limit)
    );
    res.json({
      results,
      total: results.length,
      query,
      language: lang
    });
  } catch (error) {
    console.error("Product search error:", error);
    res.status(500).json({ error: "Product search failed" });
  }
});
router38.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db2.query(
      "DELETE FROM products WHERE id = $1 RETURNING *",
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Product not found" });
    }
    broadcastToAll("product_deleted", { id });
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ error: "Failed to delete product" });
  }
});
var routes_default = router38;

// server/api/products/index.ts
var products_default = routes_default;

// server/api/product-categories/routes.ts
init_connection();
import { Router as Router37 } from "express";
init_websocket();
var router39 = Router37();
router39.get("/", async (_req, res) => {
  try {
    const categories = await db2.query(`
      SELECT * FROM product_categories 
      WHERE is_active = true 
      ORDER BY sort_order ASC, name ASC
    `);
    const categoryMap = /* @__PURE__ */ new Map();
    const rootCategories = [];
    categories.rows.forEach((row) => {
      const category = {
        id: row.id,
        name: row.name,
        slug: row.slug,
        description: row.description,
        parentId: row.parent_id,
        sortOrder: row.sort_order,
        isActive: row.is_active,
        createdAt: row.created_at,
        updatedAt: row.updated_at,
        children: []
      };
      categoryMap.set(category.id, category);
    });
    categoryMap.forEach((category) => {
      if (category.parentId) {
        const parent = categoryMap.get(category.parentId);
        if (parent) {
          parent.children.push(category);
          category.parent = parent;
        }
      } else {
        rootCategories.push(category);
      }
    });
    res.json(rootCategories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ error: "Failed to fetch categories" });
  }
});
router39.post("/", requireAuth, requireAdmin, async (req, res) => {
  try {
    const { name, slug, description, parentId, sortOrder = 0 } = req.body;
    const result = await db2.query(`
      INSERT INTO product_categories (name, slug, description, parent_id, sort_order)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `, [name, slug, description, parentId, sortOrder]);
    const category = result.rows[0];
    const categoryData = {
      id: category.id,
      name: category.name,
      slug: category.slug,
      description: category.description,
      parentId: category.parent_id,
      sortOrder: category.sort_order,
      isActive: category.is_active,
      createdAt: category.created_at,
      updatedAt: category.updated_at
    };
    broadcastToAll("category_created", categoryData);
    res.status(201).json(categoryData);
  } catch (error) {
    console.error("Error creating category:", error);
    res.status(500).json({ error: "Failed to create category" });
  }
});
router39.put("/:id", requireAuth, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, slug, description, parentId, sortOrder, isActive } = req.body;
    const result = await db2.query(`
      UPDATE product_categories 
      SET name = COALESCE($1, name),
          slug = COALESCE($2, slug),
          description = COALESCE($3, description),
          parent_id = COALESCE($4, parent_id),
          sort_order = COALESCE($5, sort_order),
          is_active = COALESCE($6, is_active),
          updated_at = NOW()
      WHERE id = $7
      RETURNING *
    `, [name, slug, description, parentId, sortOrder, isActive, id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Category not found" });
    }
    const category = result.rows[0];
    const categoryData = {
      id: category.id,
      name: category.name,
      slug: category.slug,
      description: category.description,
      parentId: category.parent_id,
      sortOrder: category.sort_order,
      isActive: category.is_active,
      createdAt: category.created_at,
      updatedAt: category.updated_at
    };
    broadcastToAll("category_updated", categoryData);
    res.json(categoryData);
  } catch (error) {
    console.error("Error updating category:", error);
    res.status(500).json({ error: "Failed to update category" });
  }
});
router39.delete("/:id", requireAuth, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const productsResult = await db2.query(
      "SELECT COUNT(*) FROM products WHERE category_id = $1",
      [id]
    );
    if (parseInt(productsResult.rows[0].count) > 0) {
      return res.status(400).json({
        error: "Cannot delete category with existing products"
      });
    }
    const result = await db2.query(
      "DELETE FROM product_categories WHERE id = $1 RETURNING *",
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Category not found" });
    }
    broadcastToAll("category_deleted", { id });
    res.json({ message: "Category deleted successfully" });
  } catch (error) {
    console.error("Error deleting category:", error);
    res.status(500).json({ error: "Failed to delete category" });
  }
});
var routes_default2 = router39;

// server/api/product-categories/index.ts
var product_categories_default = routes_default2;

// server/api/cart/routes.ts
import { Router as Router38 } from "express";

// server/api/cart/controller.ts
init_connection();
init_websocket();
var getSessionId = (req) => {
  const userId = req.user?.id;
  if (userId) {
    return userId;
  }
  if (!req.sessionID) {
    req.session.save(() => {
    });
  }
  return req.sessionID || req.ip || "anonymous";
};
var getUserId = (req) => {
  return req.user?.id;
};
var getCart = async (req, res) => {
  try {
    const sessionId = getSessionId(req);
    const userId = getUserId(req);
    const cartResult = await db2.query(`
      SELECT 
        c.id,
        c.product_id as "productId",
        c.quantity,
        c.price,
        p.id as "product_id",
        p.title as "product_title",
        p.image as "product_image"
      FROM cart_items c
      LEFT JOIN products p ON c.product_id = p.id
      WHERE c.session_id = $1 OR (c.user_id = $2 AND $2 IS NOT NULL)
    `, [sessionId, userId]);
    const items = cartResult.rows.map((row) => ({
      id: row.id,
      productId: row.productId,
      quantity: row.quantity,
      price: row.price,
      product: {
        id: row.product_id,
        title: row.product_title || "Product Not Found",
        image: row.product_image
      }
    }));
    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = items.reduce((sum, item) => sum + Number(item.price) * item.quantity, 0);
    res.json({
      items,
      totalItems,
      subtotal,
      taxAmount: 0,
      shippingAmount: 0,
      totalAmount: subtotal
    });
  } catch (error) {
    console.error("Cart error:", error);
    res.status(500).json({ error: "Failed to get cart" });
  }
};
var addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const sessionId = getSessionId(req);
    if (!productId || !quantity || quantity <= 0) {
      return res.status(400).json({ error: "Invalid product ID or quantity" });
    }
    const productResult = await db2.query(`
      SELECT id, title, price, is_active 
      FROM products WHERE id = $1 AND is_active = true
    `, [productId]);
    if (!productResult.rows.length) {
      return res.status(404).json({ error: "Product not found" });
    }
    const productData = productResult.rows[0];
    const existingItemResult = await db2.query(`
      SELECT * FROM cart_items 
      WHERE (session_id = $1 OR user_id = $2) AND product_id = $3
    `, [sessionId, getUserId(req), productId]);
    if (existingItemResult.rows.length > 0) {
      return res.status(409).json({
        error: "Product already in cart",
        message: "This product is already added to your cart"
      });
    }
    const userId = getUserId(req);
    await db2.query(`
      INSERT INTO cart_items (user_id, session_id, product_id, quantity, price)
      VALUES ($1, $2, $3, $4, $5)
    `, [userId, sessionId, productId, quantity, productData.price || "0"]);
    const updatedCart = await getCartData(sessionId, getUserId(req));
    broadcastCartUpdate("added", updatedCart);
    res.json(updatedCart);
  } catch (error) {
    console.error("Add to cart error:", error);
    res.status(500).json({ error: "Failed to add item to cart" });
  }
};
var getCartData = async (sessionId, userId) => {
  const cartResult = await db2.query(`
    SELECT 
      c.id,
      c.product_id as "productId",
      c.quantity,
      c.price,
      p.id as "product_id",
      p.title as "product_title",
      p.image as "product_image"
    FROM cart_items c
    LEFT JOIN products p ON c.product_id = p.id
    WHERE c.session_id = $1 OR (c.user_id = $2 AND $2 IS NOT NULL)
  `, [sessionId, userId]);
  const items = cartResult.rows.map((row) => ({
    id: row.id,
    productId: row.productId,
    quantity: row.quantity,
    price: row.price,
    product: {
      id: row.product_id,
      title: row.product_title || "Product Not Found",
      image: row.product_image
    }
  }));
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + Number(item.price) * item.quantity, 0);
  return {
    items,
    totalItems,
    subtotal,
    taxAmount: 0,
    shippingAmount: 0,
    totalAmount: subtotal
  };
};
var updateCartItem = async (req, res) => {
  try {
    const { itemId } = req.params;
    const { quantity } = req.body;
    const sessionId = getSessionId(req);
    if (!itemId || quantity <= 0) {
      return res.status(400).json({ error: "Invalid item ID or quantity" });
    }
    const cartItemResult = await db2.query(`
      SELECT 1 FROM cart_items
      WHERE id = $1 AND session_id = $2
    `, [itemId, sessionId]);
    if (!cartItemResult.rows.length) {
      return res.status(404).json({ error: "Cart item not found" });
    }
    await db2.query(`
      UPDATE cart_items 
      SET quantity = $1, updated_at = NOW()
      WHERE id = $2 AND session_id = $3
    `, [quantity, itemId, sessionId]);
    const updatedCart = await getCartData(sessionId, getUserId(req));
    broadcastCartUpdate("updated", updatedCart);
    res.json(updatedCart);
  } catch (error) {
    console.error("Update cart item error:", error);
    res.status(500).json({ error: "Failed to update cart item" });
  }
};
var removeCartItem = async (req, res) => {
  try {
    const { itemId } = req.params;
    const sessionId = getSessionId(req);
    if (!itemId) {
      return res.status(400).json({ error: "Invalid item ID" });
    }
    await db2.query(`
      DELETE FROM cart_items 
      WHERE id = $1 AND session_id = $2
    `, [itemId, sessionId]);
    const updatedCart = await getCartData(sessionId, getUserId(req));
    broadcastCartUpdate("removed", updatedCart);
    res.json(updatedCart);
  } catch (error) {
    console.error("Remove cart item error:", error);
    res.status(500).json({ error: "Failed to remove cart item" });
  }
};
var clearCart = async (req, res) => {
  try {
    const sessionId = getSessionId(req);
    await db2.query(`
      DELETE FROM cart_items 
      WHERE session_id = $1
    `, [sessionId]);
    broadcastCartUpdate("cleared", { items: [], totalItems: 0, totalAmount: 0 });
    res.json({
      success: true,
      message: "Cart cleared"
    });
  } catch (error) {
    console.error("Clear cart error:", error);
    res.status(500).json({ error: "Failed to clear cart" });
  }
};

// server/api/cart/routes.ts
var router40 = Router38();
router40.get("/", getCart);
router40.post("/add", addToCart);
router40.put("/update/:itemId", updateCartItem);
router40.delete("/remove/:itemId", removeCartItem);
router40.delete("/clear", clearCart);
var routes_default3 = router40;

// server/api/orders/routes.ts
import { Router as Router39 } from "express";

// server/api/orders/controller.ts
init_connection();
var getUserOrders = async (_req, res) => {
  try {
    const query = `
      SELECT o.*, COUNT(oi.id) as item_count
      FROM orders o
      LEFT JOIN order_items oi ON o.id = oi.order_id
      GROUP BY o.id
      ORDER BY o.created_at DESC
      LIMIT 20
    `;
    const result = await db2.query(query);
    const orders2 = result.rows.map((row) => ({
      id: row.id,
      orderNumber: row.order_number,
      status: row.status,
      totalAmount: row.total_amount,
      currency: row.currency,
      createdAt: row.created_at,
      itemCount: row.item_count,
      customerFirstName: row.customer_first_name,
      customerLastName: row.customer_last_name,
      customerEmail: row.customer_email,
      customerPhone: row.customer_phone,
      notes: row.notes
    }));
    res.json({ orders: orders2 });
  } catch (error) {
    res.status(500).json({ error: "Failed to get orders" });
  }
};
var getOrder = async (_req, res) => {
  try {
    const orderQuery = `
      SELECT * FROM orders 
      LIMIT 1
    `;
    const orderResult = await db2.query(orderQuery);
    if (orderResult.rows.length === 0) {
      return res.status(404).json({ error: "Order not found" });
    }
    const itemsQuery = `
      SELECT oi.*, p.title, p.image
      FROM order_items oi
      LEFT JOIN products p ON oi.product_id = p.id::text
      LIMIT 10
    `;
    const itemsResult = await db2.query(itemsQuery);
    const order = {
      ...orderResult.rows[0],
      items: itemsResult.rows
    };
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: "Failed to get order" });
  }
};
var createOrder = async (req, res) => {
  try {
    const {
      customerFirstName,
      customerLastName,
      customerEmail,
      customerPhone,
      notes,
      paymentMethod
    } = req.body;
    if (!customerFirstName || !customerEmail) {
      return res.status(400).json({ error: "First name and email are required" });
    }
    const cartQuery = `
      SELECT ci.*, p.title, p.description, p.image, p.price as current_price
      FROM cart_items ci
      JOIN products p ON ci.product_id = p.id::text
      LIMIT 10
    `;
    const cartResult = await db2.query(cartQuery);
    if (cartResult.rows.length === 0) {
      return res.status(400).json({ error: "Cart is empty" });
    }
    const cartItems2 = cartResult.rows;
    const subtotal = cartItems2.reduce((sum, item) => sum + Number(item.price || 0) * Number(item.quantity || 0), 0);
    const taxAmount = 0;
    const shippingAmount = 0;
    const totalAmount = subtotal + taxAmount + shippingAmount;
    const orderQuery = `
      INSERT INTO orders (
        customer_first_name, 
        customer_last_name, 
        customer_email, 
        customer_phone, 
        notes,
        payment_method,
        subtotal, 
        tax_amount, 
        shipping_amount, 
        total_amount
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      RETURNING *
    `;
    const orderResult = await db2.query(orderQuery, [
      customerFirstName,
      customerLastName || null,
      customerEmail,
      customerPhone || null,
      notes || null,
      paymentMethod || "dummy",
      totalAmount,
      taxAmount,
      shippingAmount,
      totalAmount
    ]);
    const order = orderResult.rows[0];
    for (const item of cartItems2) {
      await db2.query(`
        INSERT INTO order_items (order_id, product_id, quantity, unit_price, total_price, product_snapshot)
        VALUES ($1, $2, $3, $4, $5, $6)
      `, [
        order.id,
        item.product_id,
        item.quantity,
        item.price,
        Number(item.price) * Number(item.quantity),
        JSON.stringify({
          title: item.title,
          description: item.description,
          image: item.image
        })
      ]);
    }
    res.json({ success: true, order });
  } catch (error) {
    console.error("Create order error:", error);
    res.status(500).json({ error: "Failed to create order" });
  }
};
var updateOrderStatus = async (_req, res) => {
  try {
    const updateQuery = `
      UPDATE orders 
      SET status = 'processing', updated_at = NOW()
      WHERE id IS NOT NULL
    `;
    const result = await db2.query(updateQuery);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Order not found" });
    }
    res.json({ success: true, order: result.rows[0] });
  } catch (error) {
    res.status(500).json({ error: "Failed to update order status" });
  }
};
var trackOrder = async (_req, res) => {
  try {
    const query = `
      SELECT order_number, status, created_at, updated_at
      FROM orders 
      LIMIT 1
    `;
    const result = await db2.query(query);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Order not found" });
    }
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Failed to track order" });
  }
};

// server/api/orders/routes.ts
var router41 = Router39();
router41.get("/", requireAuth, getUserOrders);
router41.get("/:id", requireAuth, getOrder);
router41.post("/create", requireAuth, createOrder);
router41.put("/:id/status", requireAuth, updateOrderStatus);
router41.get("/:id/track", trackOrder);
var routes_default4 = router41;

// server/api/payments/routes.ts
import { Router as Router40 } from "express";

// server/api/payments/controller.ts
init_connection();
var createPaymentIntent = async (_req, res) => {
  try {
    const orderQuery = `
      SELECT * FROM orders 
      WHERE payment_status = 'pending'
      LIMIT 1
    `;
    const orderResult = await db2.query(orderQuery);
    if (orderResult.rows.length === 0) {
      return res.status(404).json({ error: "Order not found or already processed" });
    }
    const order = orderResult.rows[0];
    const paymentIntent = {
      id: `pi_${Date.now()}`,
      clientSecret: `pi_${Date.now()}_secret`,
      amount: order.total_amount || 100,
      currency: order.currency || "USD",
      paymentMethod: "stripe"
    };
    const transactionQuery = `
      INSERT INTO payment_transactions (transaction_id, payment_method, gateway, amount, currency, status)
      VALUES ('sample-transaction', 'stripe', 'stripe', 100.00, 'USD', 'pending')
    `;
    await db2.query(transactionQuery);
    res.json(paymentIntent);
  } catch (error) {
    res.status(500).json({ error: "Failed to create payment intent" });
  }
};
var confirmPayment = async (_req, res) => {
  try {
    const updateTransactionQuery = `
      UPDATE payment_transactions 
      SET status = 'completed'
      WHERE status = 'pending'
    `;
    await db2.query(updateTransactionQuery);
    const updateOrderQuery = `
      UPDATE orders 
      SET payment_status = 'completed', status = 'confirmed', updated_at = NOW()
      WHERE payment_status = 'pending'
      RETURNING *
    `;
    const orderResult = await db2.query(updateOrderQuery);
    if (orderResult.rows.length > 0) {
      const order = orderResult.rows[0];
      await deliverDigitalGoods(order.id);
    }
    res.json({
      success: true,
      transactionId: "sample-transaction",
      orderId: "sample-order",
      message: "Payment confirmed and digital goods delivered"
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to confirm payment" });
  }
};
async function deliverDigitalGoods(orderId) {
  try {
    const orderQuery = `
      SELECT o.*, oi.product_id, p.title, p.price
      FROM orders o
      LEFT JOIN order_items oi ON o.id = oi.order_id
      LEFT JOIN products p ON oi.product_id = p.id::text
      WHERE o.id = $1
    `;
    const result = await db2.query(orderQuery, [orderId]);
    if (result.rows.length === 0) return;
    const orderData = result.rows[0];
    const items = result.rows.map((row) => ({
      id: row.product_id,
      title: row.title || "Digital Product"
    }));
    const orderDetails = {
      id: orderId,
      orderNumber: orderData.order_number || "ORD-SAMPLE",
      customerEmail: "customer@example.com",
      // In real app, get from user table
      customerName: "Valued Customer",
      items,
      totalAmount: parseFloat(orderData.total_amount || "100.00")
    };
    const { digitalGoodsService: digitalGoodsService2 } = await Promise.resolve().then(() => (init_digitalGoodsService(), digitalGoodsService_exports));
    await digitalGoodsService2.deliverDigitalGoods(orderDetails);
  } catch (error) {
    console.error("Failed to deliver digital goods:", error);
  }
}
var handleWebhook = async (_req, res) => {
  try {
    res.json({ received: true });
  } catch (error) {
    res.status(400).json({ error: "Webhook error" });
  }
};
var getPaymentMethods = async (_req, res) => {
  try {
    const paymentMethods = [
      {
        id: "stripe_card",
        type: "card",
        gateway: "stripe",
        name: "Credit/Debit Card",
        description: "Visa, MasterCard, American Express",
        enabled: true,
        supportedCurrencies: ["USD", "EUR", "RUB"],
        icon: "credit-card"
      },
      {
        id: "paypal",
        type: "wallet",
        gateway: "paypal",
        name: "PayPal",
        description: "Pay with your PayPal account",
        enabled: true,
        supportedCurrencies: ["USD", "EUR"],
        icon: "paypal"
      },
      {
        id: "yandex_money",
        type: "wallet",
        gateway: "yandex",
        name: "YooMoney",
        description: "Yandex.Money wallet",
        enabled: true,
        supportedCurrencies: ["RUB"],
        icon: "yandex"
      }
    ];
    res.json(paymentMethods);
  } catch (error) {
    res.status(500).json({ error: "Failed to get payment methods" });
  }
};

// server/api/payments/routes.ts
var router42 = Router40();
router42.post("/create-intent", requireAuth, createPaymentIntent);
router42.post("/confirm", requireAuth, confirmPayment);
router42.post("/webhook", handleWebhook);
router42.get("/methods", getPaymentMethods);
var routes_default5 = router42;

// server/api/downloads/routes.ts
import { Router as Router41 } from "express";

// server/api/downloads/controller.ts
init_connection();
var downloadProduct = async (req, res) => {
  try {
    const { token } = req.params;
    const tokenQuery = `
      SELECT dt.*, p.title, p.slug
      FROM download_tokens dt
      JOIN products p ON dt.product_id = p.id::text
      WHERE dt.token = $1 AND dt.expires_at > NOW()
    `;
    const tokenResult = await db2.query(tokenQuery, [token]);
    if (tokenResult.rows.length === 0) {
      return res.status(404).json({ error: "Invalid or expired download link" });
    }
    const downloadData = tokenResult.rows[0];
    if (downloadData.download_count >= downloadData.max_downloads) {
      return res.status(403).json({ error: "Download limit exceeded" });
    }
    await db2.query(`
      UPDATE download_tokens 
      SET download_count = download_count + 1, last_download_at = NOW()
      WHERE token = $1
    `, [token]);
    const fileName = `${downloadData.slug || "product"}-digital-download.zip`;
    const sampleContent = `
# ${downloadData.title}

This is your digital product download.

## Installation Instructions
1. Extract this archive
2. Follow the README.md instructions
3. Use your license key for activation

## License Key
Your license key was provided in the delivery email.

## Support
Contact support@blogpro.com for assistance.

Thank you for your purchase!
    `;
    res.setHeader("Content-Type", "application/zip");
    res.setHeader("Content-Disposition", `attachment; filename="${fileName}"`);
    res.setHeader("Content-Length", Buffer.byteLength(sampleContent));
    res.send(sampleContent);
  } catch (error) {
    console.error("Download error:", error);
    res.status(500).json({ error: "Failed to process download" });
  }
};
var getDownloadStatus = async (req, res) => {
  try {
    const { token } = req.params;
    const query = `
      SELECT download_count, max_downloads, expires_at
      FROM download_tokens
      WHERE token = $1
    `;
    const result = await db2.query(query, [token]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Token not found" });
    }
    const data = result.rows[0];
    res.json({
      downloadsRemaining: data.max_downloads - data.download_count,
      expiresAt: data.expires_at,
      isExpired: new Date(data.expires_at) < /* @__PURE__ */ new Date()
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to get download status" });
  }
};

// server/api/downloads/routes.ts
var router43 = Router41();
router43.get("/:token", downloadProduct);
router43.get("/:token/status", getDownloadStatus);
var routes_default6 = router43;

// server/api/search/index.ts
init_searchService();
import { Router as Router42 } from "express";
var router44 = Router42();
router44.get("/", async (req, res) => {
  try {
    const { q: query, lang, limit = 30 } = req.query;
    if (!query || typeof query !== "string") {
      return res.status(400).json({ error: "Search query is required" });
    }
    const results = await searchService.searchAll(
      query,
      lang,
      parseInt(limit)
    );
    res.json(results);
  } catch (error) {
    console.error("Unified search error:", error);
    res.status(500).json({ error: "Search failed" });
  }
});
var search_default2 = router44;

// server/api/comments.ts
init_db();
import { Router as Router43 } from "express";

// server/utils/responseHelpers.ts
var createSuccessResponse2 = (data, message = "Operation successful") => ({
  success: true,
  data,
  message,
  timestamp: (/* @__PURE__ */ new Date()).toISOString()
});
var createErrorResponse2 = (error, message = "Operation failed") => ({
  success: false,
  error,
  message,
  timestamp: (/* @__PURE__ */ new Date()).toISOString()
});
var sendSuccessResponse = (res, data, message = "Operation successful", statusCode = 200) => {
  return res.status(statusCode).json(createSuccessResponse2(data, message));
};
var sendErrorResponse = (res, error, message = "Operation failed", statusCode = 500) => {
  return res.status(statusCode).json(createErrorResponse2(error, message));
};
var sendPaginatedResponse = (res, data, pagination, message = "Data retrieved successfully") => {
  return res.status(200).json(createPaginatedResponse2(data, pagination, message));
};
var createPaginatedResponse2 = (data, pagination, message = "Data retrieved successfully") => ({
  success: true,
  data,
  pagination: {
    ...pagination,
    totalPages: Math.ceil(pagination.total / pagination.limit)
  },
  message,
  timestamp: (/* @__PURE__ */ new Date()).toISOString()
});
var HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500
};

// server/api/comments.ts
init_websocket();
var router45 = Router43();
router45.get("/:postId/count", async (req, res) => {
  try {
    res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
    res.setHeader("Pragma", "no-cache");
    res.setHeader("Expires", "0");
    const { postId } = req.params;
    const result = await pool.query("SELECT COUNT(*) FROM comments WHERE post_id = $1", [postId]);
    const count2 = parseInt(result.rows[0].count);
    sendSuccessResponse(res, { count: count2 }, "Comment count retrieved successfully");
  } catch (error) {
    console.error("Error fetching comment count:", error);
    sendErrorResponse(res, error.message, "Failed to retrieve comment count", HTTP_STATUS.INTERNAL_SERVER_ERROR);
  }
});
router45.get("/:commentId/replies", async (req, res) => {
  try {
    res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
    res.setHeader("Pragma", "no-cache");
    res.setHeader("Expires", "0");
    const { commentId } = req.params;
    const { page = 1, limit = 10 } = req.query;
    const offset = (parseInt(page) - 1) * parseInt(limit);
    const query = `
      SELECT 
        c.*,
        u.username,
        u.first_name,
        u.last_name,
        u.profile_image_url,
        COUNT(DISTINCT reactions.id) as like_count
      FROM comments c
      LEFT JOIN users u ON c.user_id = u.id
      LEFT JOIN comment_reactions reactions ON c.id = reactions.comment_id
      WHERE c.parent_id = $1
      GROUP BY c.id, u.username, u.first_name, u.last_name, u.profile_image_url
      ORDER BY c.created_at ASC
      LIMIT $2 OFFSET $3
    `;
    const result = await pool.query(query, [commentId, limit, offset]);
    const countResult = await pool.query("SELECT COUNT(*) FROM comments WHERE parent_id = $1", [commentId]);
    const total = parseInt(countResult.rows[0].count);
    sendPaginatedResponse(res, result.rows, {
      page: parseInt(page),
      limit: parseInt(limit),
      total
    }, "Replies retrieved successfully");
  } catch (error) {
    console.error("Error fetching replies:", error);
    sendErrorResponse(res, error.message, "Failed to retrieve replies", HTTP_STATUS.INTERNAL_SERVER_ERROR);
  }
});
router45.get("/:postId", async (req, res) => {
  try {
    res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
    res.setHeader("Pragma", "no-cache");
    res.setHeader("Expires", "0");
    const { postId } = req.params;
    const { page = 1, limit = 20 } = req.query;
    const offset = (parseInt(page) - 1) * parseInt(limit);
    const query = `
      SELECT 
        c.*,
        u.username,
        u.first_name,
        u.last_name,
        u.profile_image_url,
        COUNT(DISTINCT replies.id) as reply_count,
        COUNT(DISTINCT reactions.id) as like_count
      FROM comments c
      LEFT JOIN users u ON c.user_id = u.id
      LEFT JOIN comments replies ON c.id = replies.parent_id
      LEFT JOIN comment_reactions reactions ON c.id = reactions.comment_id
      WHERE c.post_id = $1 AND c.parent_id IS NULL
      GROUP BY c.id, u.username, u.first_name, u.last_name, u.profile_image_url
      ORDER BY c.created_at DESC
      LIMIT $2 OFFSET $3
    `;
    const result = await pool.query(query, [postId, limit, offset]);
    const countResult = await pool.query("SELECT COUNT(*) FROM comments WHERE post_id = $1 AND parent_id IS NULL", [postId]);
    const total = parseInt(countResult.rows[0].count);
    sendPaginatedResponse(res, result.rows, {
      page: parseInt(page),
      limit: parseInt(limit),
      total
    }, "Comments retrieved successfully");
  } catch (error) {
    console.error("Error fetching comments:", error);
    sendErrorResponse(res, error.message, "Failed to retrieve comments", HTTP_STATUS.INTERNAL_SERVER_ERROR);
  }
});
router45.post("/", requireAuth, async (req, res) => {
  try {
    const { postId, content, parentId } = req.body;
    const userId = req.user.id;
    if (!postId || !content?.trim()) {
      return sendErrorResponse(res, "Post ID and content are required", "Validation failed", HTTP_STATUS.BAD_REQUEST);
    }
    const query = `
      INSERT INTO comments (post_id, user_id, content, content_html, parent_id, ip_address, user_agent)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *
    `;
    const contentHtml = content.replace(/\n/g, "<br>");
    const result = await pool.query(query, [
      postId,
      userId,
      content,
      contentHtml,
      parentId || null,
      req.ip,
      req.get("User-Agent")
    ]);
    const commentQuery = `
      SELECT c.*, u.username, u.first_name, u.last_name, u.profile_image_url
      FROM comments c
      LEFT JOIN users u ON c.user_id = u.id
      WHERE c.id = $1
    `;
    const commentResult = await pool.query(commentQuery, [result.rows[0].id]);
    broadcastToAll("COMMENT_CREATED", {
      postId: parseInt(postId),
      comment: commentResult.rows[0],
      isReply: !!parentId
    });
    sendSuccessResponse(res, commentResult.rows[0], "Comment created successfully", HTTP_STATUS.CREATED);
  } catch (error) {
    console.error("Error creating comment:", error);
    sendErrorResponse(res, error.message, "Failed to create comment", HTTP_STATUS.INTERNAL_SERVER_ERROR);
  }
});
router45.put("/:id", requireAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;
    const userId = req.user.id;
    if (!content?.trim()) {
      return sendErrorResponse(res, "Content is required", "Validation failed", HTTP_STATUS.BAD_REQUEST);
    }
    const contentHtml = content.replace(/\n/g, "<br>");
    const query = `
      UPDATE comments 
      SET content = $1, content_html = $2, updated_at = CURRENT_TIMESTAMP
      WHERE id = $3 AND user_id = $4
      RETURNING *
    `;
    const result = await pool.query(query, [content, contentHtml, id, userId]);
    if (result.rows.length === 0) {
      return sendErrorResponse(res, "Comment not found or unauthorized", "Not found", HTTP_STATUS.NOT_FOUND);
    }
    broadcastToAll("COMMENT_UPDATED", {
      commentId: parseInt(id),
      comment: result.rows[0]
    });
    sendSuccessResponse(res, result.rows[0], "Comment updated successfully");
  } catch (error) {
    console.error("Error updating comment:", error);
    sendErrorResponse(res, error.message, "Failed to update comment", HTTP_STATUS.INTERNAL_SERVER_ERROR);
  }
});
router45.delete("/:id", requireAuth, async (req, res) => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const { id } = req.params;
    const userId = req.user.id;
    console.log("\u{1F5D1}\uFE0F DELETE request received:");
    console.log("  - Comment ID:", id, typeof id);
    console.log("  - User ID from token:", userId, typeof userId);
    const checkQuery = "SELECT * FROM comments WHERE id = $1";
    const checkResult = await client.query(checkQuery, [id]);
    console.log("  - Comment exists:", checkResult.rows.length > 0);
    if (checkResult.rows.length > 0) {
      const comment2 = checkResult.rows[0];
      console.log("  - Comment user_id:", comment2.user_id, typeof comment2.user_id);
      console.log("  - User ID match:", comment2.user_id === userId);
      console.log("  - User ID string match:", String(comment2.user_id) === String(userId));
    } else {
      await client.query("ROLLBACK");
      console.log("  - \u274C Comment not found");
      return sendErrorResponse(res, "Comment not found", "Not found", HTTP_STATUS.NOT_FOUND);
    }
    const comment = checkResult.rows[0];
    if (comment.user_id !== userId) {
      await client.query("ROLLBACK");
      console.log("  - \u274C Unauthorized: User does not own this comment");
      return sendErrorResponse(res, "Unauthorized to delete this comment", "Unauthorized", HTTP_STATUS.FORBIDDEN);
    }
    const result = await client.query("DELETE FROM comments WHERE id = $1 RETURNING *", [id]);
    console.log("  - Delete result rows:", result.rows.length);
    if (result.rows.length === 0) {
      await client.query("ROLLBACK");
      console.log("  - \u274C Delete failed unexpectedly");
      return sendErrorResponse(res, "Delete operation failed", "Internal error", HTTP_STATUS.INTERNAL_SERVER_ERROR);
    }
    await client.query("COMMIT");
    console.log("  - \u2705 Comment deleted and committed successfully");
    const verifyResult = await client.query("SELECT * FROM comments WHERE id = $1", [id]);
    console.log("  - Verification: Comment still exists?", verifyResult.rows.length > 0);
    broadcastToAll("COMMENT_DELETED", {
      commentId: parseInt(id),
      postId: comment.post_id,
      isReply: !!comment.parent_id
    });
    sendSuccessResponse(res, { id: parseInt(id) }, "Comment deleted successfully");
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("\u274C Error deleting comment:", error);
    sendErrorResponse(res, error.message, "Failed to delete comment", HTTP_STATUS.INTERNAL_SERVER_ERROR);
  } finally {
    client.release();
  }
});
router45.post("/:id/reactions", requireAuth, async (req, res) => {
  try {
    const { id: commentId } = req.params;
    const { reactionType } = req.body;
    const userId = req.user.id;
    console.log("\u{1F44D} POST /api/comments/:id/reactions");
    console.log("  - Comment ID:", commentId, typeof commentId);
    console.log("  - User ID:", userId, typeof userId);
    console.log("  - Reaction Type:", reactionType);
    if (!reactionType) {
      console.log("\u274C Missing reaction type");
      return sendErrorResponse(res, "Reaction type is required", "Validation failed", HTTP_STATUS.BAD_REQUEST);
    }
    const query = `
      INSERT INTO comment_reactions (comment_id, user_id, reaction_type)
      VALUES ($1, $2, $3)
      ON CONFLICT (comment_id, user_id, reaction_type) DO NOTHING
      RETURNING *
    `;
    console.log("  - Executing query with params:", [commentId, userId, reactionType]);
    const result = await pool.query(query, [commentId, userId, reactionType]);
    console.log("  - Query result rows:", result.rows.length);
    console.log("  - Query result:", result.rows[0]);
    sendSuccessResponse(res, result.rows[0] || { exists: true }, "Reaction added successfully", HTTP_STATUS.CREATED);
  } catch (error) {
    console.error("\u274C Error adding reaction:", error);
    sendErrorResponse(res, error.message, "Failed to add reaction", HTTP_STATUS.INTERNAL_SERVER_ERROR);
  }
});
router45.delete("/:id/reactions", requireAuth, async (req, res) => {
  try {
    const { id: commentId } = req.params;
    const userId = req.user.id;
    console.log("\u{1F5D1}\uFE0F DELETE /api/comments/:id/reactions");
    console.log("  - Comment ID:", commentId, typeof commentId);
    console.log("  - User ID:", userId, typeof userId);
    const query = "DELETE FROM comment_reactions WHERE comment_id = $1 AND user_id = $2";
    console.log("  - Executing query with params:", [commentId, userId]);
    const result = await pool.query(query, [commentId, userId]);
    console.log("  - Deleted rows:", result.rowCount);
    sendSuccessResponse(res, { deleted: result.rowCount }, "Reaction removed successfully");
  } catch (error) {
    console.error("\u274C Error removing reaction:", error);
    sendErrorResponse(res, error.message, "Failed to remove reaction", HTTP_STATUS.INTERNAL_SERVER_ERROR);
  }
});
router45.get("/:postId/reactions", requireAuth, async (req, res) => {
  try {
    const { postId } = req.params;
    const userId = req.user.id;
    console.log("\u{1F4CA} GET /api/comments/:postId/reactions");
    console.log("  - Post ID:", postId, typeof postId);
    console.log("  - User ID:", userId, typeof userId);
    const query = `
      SELECT cr.comment_id, cr.reaction_type
      FROM comment_reactions cr
      JOIN comments c ON cr.comment_id = c.id
      WHERE c.post_id = $1 AND cr.user_id = $2
    `;
    console.log("  - Executing query with params:", [postId, userId]);
    const result = await pool.query(query, [postId, userId]);
    console.log("  - Query result rows:", result.rows.length);
    console.log("  - Raw rows:", result.rows);
    const reactions = result.rows.reduce((acc, row) => {
      acc[row.comment_id] = row.reaction_type;
      return acc;
    }, {});
    console.log("  - Processed reactions:", reactions);
    sendSuccessResponse(res, reactions, "Reactions retrieved successfully");
  } catch (error) {
    console.error("\u274C Error fetching reactions:", error);
    sendErrorResponse(res, error.message, "Failed to retrieve reactions", HTTP_STATUS.INTERNAL_SERVER_ERROR);
  }
});
var comments_default = router45;

// server/api/admin-comments.ts
import { Router as Router44 } from "express";
init_db();
var router46 = Router44();
router46.use(securityHeadersMiddleware);
router46.get("/", requireAuth, requireAdmin, async (req, res) => {
  try {
    const { page = 1, limit = 20, status } = req.query;
    const offset = (parseInt(page) - 1) * parseInt(limit);
    let whereClause = "WHERE deleted_at IS NULL";
    const params = [limit, offset];
    if (status && status !== "all") {
      whereClause += ` AND COALESCE(c.status, 'approved') = $${params.length + 1}`;
      params.push(status);
    }
    const query = `
      SELECT 
        c.*,
        u.username,
        u.first_name,
        u.last_name,
        bp.title as post_title,
        COALESCE(c.status, 'pending') as status
      FROM comments c
      LEFT JOIN users u ON c.user_id = u.id
      LEFT JOIN blog_posts bp ON c.post_id = bp.id
      ${whereClause}
      ORDER BY c.created_at DESC
      LIMIT $1 OFFSET $2
    `;
    const result = await pool.query(query, params);
    res.json(createSuccessResponse2(
      result.rows,
      "Admin comments retrieved successfully"
    ));
  } catch (error) {
    console.error("Error fetching admin comments:", error);
    res.status(500).json(createErrorResponse2(error.message, "Failed to retrieve admin comments"));
  }
});
router46.get("/stats", requireAuth, requireAdmin, async (_req, res) => {
  try {
    const query = `
      SELECT 
        COUNT(*) as total,
        COUNT(CASE WHEN COALESCE(status, 'approved') = 'pending' THEN 1 END) as pending,
        COUNT(CASE WHEN COALESCE(status, 'approved') = 'approved' THEN 1 END) as approved,
        COUNT(CASE WHEN COALESCE(status, 'approved') = 'rejected' THEN 1 END) as rejected,
        COUNT(CASE WHEN COALESCE(flagged_count, 0) > 0 THEN 1 END) as flagged
      FROM comments
      WHERE deleted_at IS NULL
    `;
    const result = await pool.query(query);
    const stats = result.rows[0];
    const formattedStats = {
      total: parseInt(stats.total) || 0,
      pending: parseInt(stats.pending) || 0,
      approved: parseInt(stats.approved) || 0,
      rejected: parseInt(stats.rejected) || 0,
      flagged: parseInt(stats.flagged) || 0
    };
    res.json(createSuccessResponse2(
      formattedStats,
      "Comment statistics retrieved successfully"
    ));
  } catch (error) {
    console.error("Error fetching comment stats:", error);
    res.status(500).json(createErrorResponse2(error.message, "Failed to retrieve comment statistics"));
  }
});
router46.put("/:id/approve", requireAuth, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const adminId = req.user.id;
    const query = `
      UPDATE comments 
      SET status = 'approved', 
          approved_by = $1, 
          approved_at = CURRENT_TIMESTAMP,
          updated_at = CURRENT_TIMESTAMP
      WHERE id = $2
      RETURNING *
    `;
    const result = await pool.query(query, [adminId, id]);
    const comment = result.rows[0];
    res.json(createSuccessResponse2(
      comment,
      "Comment approved successfully"
    ));
  } catch (error) {
    console.error("Error approving comment:", error);
    res.status(500).json(createErrorResponse2(error.message, "Failed to approve comment"));
  }
});
router46.put("/:id/reject", requireAuth, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const adminId = req.user.id;
    const query = `
      UPDATE comments 
      SET status = 'rejected', 
          approved_by = $1, 
          approved_at = CURRENT_TIMESTAMP,
          updated_at = CURRENT_TIMESTAMP
      WHERE id = $2
      RETURNING *
    `;
    const result = await pool.query(query, [adminId, id]);
    const comment = result.rows[0];
    res.json(createSuccessResponse2(
      comment,
      "Comment rejected successfully"
    ));
  } catch (error) {
    console.error("Error rejecting comment:", error);
    res.status(500).json(createErrorResponse2(error.message, "Failed to reject comment"));
  }
});
router46.delete("/:id", requireAuth, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("UPDATE comments SET deleted_at = CURRENT_TIMESTAMP WHERE id = $1", [id]);
    res.json(createSuccessResponse2(
      { id: parseInt(id) },
      "Comment deleted successfully"
    ));
  } catch (error) {
    console.error("Error deleting comment:", error);
    res.status(500).json(createErrorResponse2(error.message, "Failed to delete comment"));
  }
});
var admin_comments_default = router46;

// server/api/user-comments.ts
import { Router as Router45 } from "express";
init_connection();
var router47 = Router45();
router47.use(securityHeadersMiddleware);
router47.get("/comments", requireAuth, async (req, res) => {
  try {
    const userId = req.user.id;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const offset = (page - 1) * limit;
    const comments = await db2.query(`
      SELECT c.*, u.username, u.first_name, u.last_name, u.profile_image_url
      FROM comments c
      JOIN users u ON c.user_id = u.id
      WHERE c.user_id = $1
      ORDER BY c.created_at DESC
      LIMIT $2 OFFSET $3
    `, [userId, limit, offset]);
    const totalResult = await db2.query("SELECT COUNT(*) FROM comments WHERE user_id = $1", [userId]);
    const total = parseInt(totalResult.rows[0].count);
    res.json({
      success: true,
      data: comments.rows,
      pagination: { page, limit, total },
      message: "User comments retrieved successfully"
    });
  } catch (error) {
    console.error("Error fetching user comments:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});
router47.get("/comment-notifications", requireAuth, async (_req, res) => {
  try {
    res.json({
      success: true,
      data: [],
      message: "Comment notifications retrieved successfully"
    });
  } catch (error) {
    console.error("Error fetching comment notifications:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});
router47.put("/notifications/:id/read", requireAuth, async (_req, res) => {
  try {
    res.json({
      success: true,
      data: null,
      message: "Notification marked as read successfully"
    });
  } catch (error) {
    console.error("Error marking notification as read:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});
var user_comments_default = router47;

// server/api/csrf.ts
import { Router as Router46 } from "express";

// server/middleware/unifiedCSRF.ts
import crypto2 from "crypto";
var UnifiedCSRFProtection = class {
  static {
    this.memoryTokens = /* @__PURE__ */ new Map();
  }
  static {
    this.DEFAULT_EXPIRY = 60 * 60 * 1e3;
  }
  // 1 hour
  static generateToken(sessionId, useSession = true) {
    const token = crypto2.randomBytes(32).toString("hex");
    if (useSession) {
      return token;
    } else {
      const expires = Date.now() + this.DEFAULT_EXPIRY;
      this.memoryTokens.set(sessionId, { token, expires });
      this.cleanupExpiredTokens();
      return token;
    }
  }
  static validateToken(sessionId, token, sessionToken) {
    if (sessionToken && token === sessionToken) {
      return true;
    }
    const stored = this.memoryTokens.get(sessionId);
    if (stored && stored.expires > Date.now() && stored.token === token) {
      return true;
    }
    if (stored && stored.expires <= Date.now()) {
      this.memoryTokens.delete(sessionId);
    }
    return false;
  }
  static cleanupExpiredTokens() {
    const now = Date.now();
    for (const [sessionId, data] of this.memoryTokens.entries()) {
      if (data.expires < now) {
        this.memoryTokens.delete(sessionId);
      }
    }
  }
  static createMiddleware(config2 = {}) {
    const {
      skipPaths = [],
      skipMethods = ["GET", "HEAD", "OPTIONS"]
    } = config2;
    return (req, res, next) => {
      if (skipMethods.includes(req.method)) {
        return next();
      }
      if (skipPaths.some((path18) => req.path.includes(path18))) {
        return next();
      }
      const sessionId = req.sessionID || req.ip || "anonymous";
      const token = req.headers["x-csrf-token"];
      const sessionToken = req.session?.csrfToken;
      if (!token || !this.validateToken(sessionId, token, sessionToken)) {
        return res.status(403).json({
          success: false,
          error: "Invalid CSRF token",
          code: "CSRF_TOKEN_INVALID"
        });
      }
      next();
    };
  }
};
var csrfProtection = UnifiedCSRFProtection.createMiddleware({
  storage: "session"
});
var analyticsCSRFProtection = UnifiedCSRFProtection.createMiddleware({
  skipPaths: ["/api/analytics/track"],
  storage: "memory"
});
var generateCSRFToken = (req, _res, next) => {
  if (!req.session?.csrfToken) {
    const sessionId = req.sessionID || req.ip || "anonymous";
    req.session.csrfToken = UnifiedCSRFProtection.generateToken(sessionId, true);
  }
  next();
};

// server/api/csrf.ts
var router48 = Router46();
router48.get("/csrf-token", generateCSRFToken, (req, res) => {
  const csrfToken = req.session?.csrfToken;
  if (!csrfToken) {
    return res.status(500).json({
      success: false,
      error: "Failed to generate CSRF token"
    });
  }
  sendSuccessResponse(res, { csrfToken }, "CSRF token generated successfully");
});
var csrf_default = router48;

// server/api/footer.ts
import { Router as Router47 } from "express";

// server/services/footerService.ts
init_db();
init_schema();
init_websocket();
init_cacheService();
import { eq as eq10, desc as desc4 } from "drizzle-orm";

// server/middleware/footerErrorHandler.ts
var FooterEditorError = class extends Error {
  constructor(message, code, statusCode = 500, details) {
    super(message);
    this.code = code;
    this.statusCode = statusCode;
    this.details = details;
    this.name = "FooterEditorError";
  }
};
var footerErrorHandler = (err, _req, res, _next) => {
  if (err instanceof FooterEditorError) {
    return res.status(err.statusCode).json({
      success: false,
      error: err.message,
      code: err.code,
      details: err.details
    });
  }
  console.error("Unexpected footer editor error:", err);
  res.status(500).json({
    success: false,
    error: "Internal server error",
    code: "INTERNAL_ERROR"
  });
};
var createNotFoundError = (resource, id) => new FooterEditorError(
  `${resource} not found${id ? ` (ID: ${id})` : ""}`,
  "RESOURCE_NOT_FOUND",
  404
);

// server/services/footerService.ts
var FooterService = class {
  async getActiveConfig() {
    const cacheKey = "footer:active_config";
    try {
      const cached = await cacheService.get(cacheKey);
      if (cached) {
        console.log("Footer active config loaded from cache");
        return cached;
      }
      const result = await db.select().from(footerConfigs).where(eq10(footerConfigs.isActive, true)).limit(1);
      const config2 = result[0] ? this.mapDbToConfig(result[0]) : null;
      if (config2) {
        await cacheService.set(cacheKey, config2, 300);
      }
      return config2;
    } catch (error) {
      console.error("Error getting active footer config:", error);
      throw new FooterEditorError(
        "Failed to get active footer configuration",
        "GET_ACTIVE_CONFIG_ERROR",
        500
      );
    }
  }
  async getAllConfigs() {
    const cacheKey = "footer:all_configs";
    try {
      const cached = await cacheService.get(cacheKey);
      if (cached) {
        console.log("Footer configs loaded from cache");
        return cached;
      }
      const result = await db.select().from(footerConfigs).orderBy(desc4(footerConfigs.createdAt));
      const configs = result.map((row) => this.mapDbToConfig(row));
      await cacheService.set(cacheKey, configs, 300);
      return configs;
    } catch (error) {
      console.error("Error getting footer configs:", error);
      throw new Error("Failed to get footer configurations");
    }
  }
  async createConfig(config2, userId) {
    try {
      if (config2.isActive) {
        await this.deactivateAllConfigs();
      }
      const result = await db.insert(footerConfigs).values({
        config: config2,
        isActive: config2.isActive,
        version: config2.version,
        createdBy: userId
      }).returning();
      const newConfig = this.mapDbToConfig(result[0]);
      await this.addToHistory(newConfig.id, newConfig, "Configuration created", userId);
      await this.invalidateCache();
      broadcastFooterUpdate("config_updated", newConfig);
      return newConfig;
    } catch (error) {
      console.error("Error creating footer config:", error);
      throw new Error("Failed to create footer configuration");
    }
  }
  async updateConfig(id, updates, userId) {
    try {
      if (updates.isActive) {
        await this.deactivateAllConfigs();
      }
      const result = await db.update(footerConfigs).set({
        config: updates,
        isActive: updates.isActive,
        version: updates.version,
        updatedAt: /* @__PURE__ */ new Date()
      }).where(eq10(footerConfigs.id, id)).returning();
      if (!result[0]) {
        throw createNotFoundError("Footer configuration", id);
      }
      const updatedConfig = this.mapDbToConfig(result[0]);
      await this.addToHistory(id, updatedConfig, "Configuration updated", userId);
      await this.invalidateCache();
      await cacheService.delete(`footer:config:${id}`);
      broadcastFooterUpdate("config_updated", updatedConfig);
      return updatedConfig;
    } catch (error) {
      console.error("Error updating footer config:", error);
      throw new Error("Failed to update footer configuration");
    }
  }
  async deleteConfig(id) {
    try {
      const result = await db.delete(footerConfigs).where(eq10(footerConfigs.id, id)).returning();
      if (!result[0]) {
        throw createNotFoundError("Footer configuration", id);
      }
      await this.invalidateCache();
      await cacheService.delete(`footer:config:${id}`);
    } catch (error) {
      console.error("Error deleting footer config:", error);
      throw new Error("Failed to delete footer configuration");
    }
  }
  async activateConfig(id, userId) {
    try {
      await this.deactivateAllConfigs();
      const result = await db.update(footerConfigs).set({ isActive: true, updatedAt: /* @__PURE__ */ new Date() }).where(eq10(footerConfigs.id, id)).returning();
      if (!result[0]) {
        throw createNotFoundError("Footer configuration", id);
      }
      const activatedConfig = this.mapDbToConfig(result[0]);
      await this.addToHistory(id, activatedConfig, "Configuration activated", userId);
      await this.invalidateCache();
      broadcastFooterUpdate("config_updated", activatedConfig);
      return activatedConfig;
    } catch (error) {
      console.error("Error activating footer config:", error);
      throw new Error("Failed to activate footer configuration");
    }
  }
  async getHistory(configId) {
    try {
      const result = await db.select().from(footerHistory).where(eq10(footerHistory.footerConfigId, configId)).orderBy(desc4(footerHistory.createdAt));
      return result.map((row) => ({
        id: row.id,
        footerConfigId: row.footerConfigId,
        config: row.config,
        changeDescription: row.changeDescription || "",
        createdAt: row.createdAt?.toISOString() || "",
        createdBy: row.createdBy || ""
      }));
    } catch (error) {
      console.error("Error getting footer history:", error);
      throw new Error("Failed to get footer configuration history");
    }
  }
  async deactivateAllConfigs() {
    await db.update(footerConfigs).set({ isActive: false }).where(eq10(footerConfigs.isActive, true));
  }
  async addToHistory(configId, config2, description, userId) {
    await db.insert(footerHistory).values({
      footerConfigId: configId,
      config: config2,
      changeDescription: description,
      createdBy: userId
    });
  }
  async invalidateCache() {
    try {
      await cacheService.delete("footer:active_config");
      await cacheService.delete("footer:all_configs");
      console.log("Footer cache invalidated");
    } catch (error) {
      console.error("Error invalidating footer cache:", error);
    }
  }
  mapDbToConfig(row) {
    return {
      id: row.id,
      version: row.version,
      isActive: row.isActive,
      createdAt: row.createdAt?.toISOString(),
      updatedAt: row.updatedAt?.toISOString(),
      createdBy: row.createdBy,
      ...row.config
    };
  }
};
var footerService = new FooterService();

// server/middleware/rateLimiter.ts
import rateLimit3 from "express-rate-limit";
var footerApiLimiter = rateLimit3({
  windowMs: 15 * 60 * 1e3,
  // 15 минут
  max: 100,
  // максимум 100 запросов с одного IP за окно
  message: {
    success: false,
    message: "Too many requests from this IP, please try again later",
    retryAfter: "15 minutes"
  },
  standardHeaders: true,
  // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false,
  // Disable the `X-RateLimit-*` headers
  skipSuccessfulRequests: false,
  // Don't count successful requests
  skipFailedRequests: false
  // Don't count failed requests
});
var footerMutationLimiter = rateLimit3({
  windowMs: 5 * 60 * 1e3,
  // 5 минут
  max: 20,
  // максимум 20 операций записи за 5 минут
  message: {
    success: false,
    message: "Too many write operations, please slow down",
    retryAfter: "5 minutes"
  },
  standardHeaders: true,
  legacyHeaders: false
});
var footerPreviewLimiter = rateLimit3({
  windowMs: 1 * 60 * 1e3,
  // 1 минута
  max: 30,
  // максимум 30 preview запросов в минуту
  message: {
    success: false,
    message: "Too many preview requests, please wait",
    retryAfter: "1 minute"
  },
  standardHeaders: true,
  legacyHeaders: false
});

// server/middleware/apiVersioning.ts
var apiVersioning = (version = "1.0") => {
  return (req, res, next) => {
    res.setHeader("API-Version", version);
    res.setHeader("X-API-Version", version);
    res.setHeader("X-API-Compatibility", "footer-editor-v1");
    const requestedVersion = req.headers["api-version"] || req.headers["x-api-version"];
    if (requestedVersion && requestedVersion !== version) {
      console.warn(`API version mismatch: requested ${requestedVersion}, serving ${version}`);
    }
    next();
  };
};

// server/middleware/validation.ts
var validateConfigId = (req, res, next) => {
  const { id } = req.params;
  if (!id || isNaN(Number(id))) {
    return res.status(400).json({
      success: false,
      error: "Invalid configuration ID"
    });
  }
  req.params.id = String(Number(id));
  next();
};
var validateUserId = (req, res, next) => {
  const userId = req.user?.id;
  if (!userId) {
    return res.status(401).json({
      success: false,
      error: "User not authenticated"
    });
  }
  next();
};

// server/api/footer.ts
import { z as z11 } from "zod";
var router49 = Router47();
router49.use(footerApiLimiter);
router49.use(apiVersioning("1.0"));
var LinkItemSchema = z11.object({
  label: z11.string().min(1).max(200),
  url: z11.string().url(),
  target: z11.enum(["_self", "_blank"]).optional(),
  rel: z11.string().optional(),
  ariaLabel: z11.string().optional()
});
var ImageItemSchema = z11.object({
  src: z11.string().url(),
  alt: z11.string().min(1).max(200),
  width: z11.number().positive().optional(),
  height: z11.number().positive().optional(),
  loading: z11.enum(["lazy", "eager"]).optional(),
  sizes: z11.string().optional()
});
var SocialItemSchema = z11.object({
  platform: z11.enum(["facebook", "twitter", "instagram", "linkedin", "youtube", "github", "telegram"]),
  url: z11.string().url(),
  icon: z11.string().min(1),
  ariaLabel: z11.string().optional()
});
var ContactItemSchema = z11.object({
  type: z11.enum(["phone", "email", "address", "website"]),
  value: z11.string().min(1).max(500),
  label: z11.string().optional(),
  icon: z11.string().optional()
});
var BrandBlockContentSchema = z11.object({
  text: z11.string().max(200).optional(),
  description: z11.string().max(500).optional(),
  image: ImageItemSchema.optional(),
  links: z11.array(LinkItemSchema).optional()
});
var LinksBlockContentSchema = z11.object({
  title: z11.string().max(100).optional(),
  links: z11.array(LinkItemSchema).min(1).max(20),
  showTitle: z11.boolean().optional()
});
var ContactBlockContentSchema = z11.object({
  title: z11.string().max(100).optional(),
  contacts: z11.array(ContactItemSchema).min(1).max(10),
  showTitle: z11.boolean().optional()
});
var SocialBlockContentSchema = z11.object({
  title: z11.string().max(100).optional(),
  social: z11.array(SocialItemSchema).min(1).max(15),
  showTitle: z11.boolean().optional(),
  layout: z11.enum(["horizontal", "vertical", "grid"]).optional()
});
var NewsletterBlockContentSchema = z11.object({
  config: z11.object({
    title: z11.string().max(100).optional(),
    description: z11.string().max(300).optional(),
    placeholder: z11.string().max(100).optional(),
    buttonText: z11.string().max(50).optional(),
    successMessage: z11.string().max(200).optional(),
    errorMessage: z11.string().max(200).optional(),
    privacyText: z11.string().max(200).optional(),
    privacyLink: z11.string().url().optional()
  }),
  gdprCompliant: z11.boolean().optional()
});
var CustomBlockContentSchema = z11.object({
  html: z11.string().max(1e4).optional(),
  css: z11.string().max(5e3).optional(),
  javascript: z11.string().max(1e3).optional()
  // Restricted for security
});
var BlockContentSchema = z11.union([
  BrandBlockContentSchema,
  LinksBlockContentSchema,
  ContactBlockContentSchema,
  SocialBlockContentSchema,
  NewsletterBlockContentSchema,
  CustomBlockContentSchema
]);
var ResponsiveSettingsSchema = z11.object({
  columns: z11.number().min(1).max(6).optional(),
  fontSize: z11.string().regex(/^\d+(\.\d+)?(px|rem|em|%)$/).optional(),
  padding: z11.string().regex(/^\d+(\.\d+)?(px|rem|em|%)( \d+(\.\d+)?(px|rem|em|%)){0,3}$/).optional(),
  margin: z11.string().regex(/^\d+(\.\d+)?(px|rem|em|%)( \d+(\.\d+)?(px|rem|em|%)){0,3}$/).optional(),
  gap: z11.string().regex(/^\d+(\.\d+)?(px|rem|em|%)$/).optional(),
  display: z11.enum(["block", "flex", "grid", "none"]).optional(),
  flexDirection: z11.enum(["row", "column"]).optional(),
  justifyContent: z11.enum(["flex-start", "center", "flex-end", "space-between", "space-around"]).optional(),
  alignItems: z11.enum(["flex-start", "center", "flex-end", "stretch"]).optional()
});
var ResponsiveConfigSchema = z11.object({
  mobile: ResponsiveSettingsSchema.optional(),
  tablet: ResponsiveSettingsSchema.optional(),
  desktop: ResponsiveSettingsSchema.optional()
});
var FooterConfigSchema = z11.object({
  version: z11.number().min(1),
  isActive: z11.boolean(),
  layout: z11.object({
    type: z11.enum(["grid", "flex", "columns"]),
    columns: z11.number().min(1).max(6),
    gap: z11.string().regex(/^\d+(\.\d+)?(px|rem|em|%)$/),
    maxWidth: z11.string().regex(/^\d+(\.\d+)?(px|rem|em|%|vw)$/),
    minHeight: z11.string().regex(/^\d+(\.\d+)?(px|rem|em|vh)$/).optional(),
    padding: z11.string().regex(/^\d+(\.\d+)?(px|rem|em|%)( \d+(\.\d+)?(px|rem|em|%)){0,3}$/).optional(),
    margin: z11.string().regex(/^\d+(\.\d+)?(px|rem|em|%)( \d+(\.\d+)?(px|rem|em|%)){0,3}$/).optional()
  }),
  blocks: z11.array(z11.object({
    id: z11.string().regex(/^[a-zA-Z0-9_-]+$/),
    type: z11.enum(["brand", "links", "contact", "social", "newsletter", "custom"]),
    position: z11.object({
      x: z11.number().min(0).max(2e3),
      y: z11.number().min(0).max(2e3)
    }),
    size: z11.object({
      width: z11.string().regex(/^\d+(\.\d+)?(px|rem|em|%|auto)$/),
      height: z11.string().regex(/^\d+(\.\d+)?(px|rem|em|%|auto)$/)
    }),
    content: BlockContentSchema,
    styles: z11.record(z11.string().regex(/^[a-zA-Z0-9\s#().,%-]+$/)),
    // CSS values validation
    responsive: ResponsiveConfigSchema.optional(),
    order: z11.number().optional(),
    locked: z11.boolean().optional(),
    version: z11.number().optional()
  })).max(50),
  // Limit number of blocks
  styles: z11.object({
    theme: z11.enum(["light", "dark", "custom"]),
    backgroundColor: z11.string().regex(/^#[0-9A-Fa-f]{6}$|^rgb\(\d+,\s*\d+,\s*\d+\)$|^rgba\(\d+,\s*\d+,\s*\d+,\s*[\d.]+\)$/),
    textColor: z11.string().regex(/^#[0-9A-Fa-f]{6}$|^rgb\(\d+,\s*\d+,\s*\d+\)$|^rgba\(\d+,\s*\d+,\s*\d+,\s*[\d.]+\)$/),
    linkColor: z11.string().regex(/^#[0-9A-Fa-f]{6}$|^rgb\(\d+,\s*\d+,\s*\d+\)$|^rgba\(\d+,\s*\d+,\s*\d+,\s*[\d.]+\)$/),
    borderColor: z11.string().regex(/^#[0-9A-Fa-f]{6}$|^rgb\(\d+,\s*\d+,\s*\d+\)$|^rgba\(\d+,\s*\d+,\s*\d+,\s*[\d.]+\)$/),
    padding: z11.string().regex(/^\d+(\.\d+)?(px|rem|em|%)( \d+(\.\d+)?(px|rem|em|%)){0,3}$/),
    margin: z11.string().regex(/^\d+(\.\d+)?(px|rem|em|%)( \d+(\.\d+)?(px|rem|em|%)){0,3}$/),
    borderRadius: z11.string().regex(/^\d+(\.\d+)?(px|rem|em|%)$/).optional(),
    boxShadow: z11.string().max(200).optional(),
    fontFamily: z11.string().regex(/^[a-zA-Z0-9\s,\-'"]+$/).optional(),
    fontSize: z11.string().regex(/^\d+(\.\d+)?(px|rem|em|%)$/).optional(),
    lineHeight: z11.string().regex(/^\d+(\.\d+)?$/).optional()
  }),
  responsive: ResponsiveConfigSchema,
  visibility: z11.object({
    showOnScroll: z11.boolean(),
    hideOnPages: z11.array(z11.string().max(200)).max(100),
    showOnlyOnPages: z11.array(z11.string().max(200)).max(100),
    hideOnMobile: z11.boolean().optional(),
    hideOnTablet: z11.boolean().optional(),
    hideOnDesktop: z11.boolean().optional()
  })
});
router49.get("/config", async (_req, res) => {
  try {
    const config2 = await footerService.getActiveConfig();
    if (!config2) {
      return res.status(404).json({
        success: false,
        message: "Active footer configuration not found"
      });
    }
    res.json({
      success: true,
      data: config2
    });
  } catch (error) {
    if (error instanceof FooterEditorError) {
      return res.status(error.statusCode).json({
        success: false,
        error: error.message,
        code: error.code
      });
    }
    console.error("Error getting active footer config:", error);
    res.status(500).json({
      success: false,
      message: "Failed to get footer configuration"
    });
  }
});
router49.get("/configs", requireAuth, requireAdmin, async (_req, res) => {
  try {
    const configs = await footerService.getAllConfigs();
    res.json({
      success: true,
      data: configs
    });
  } catch (error) {
    console.error("Error getting footer configs:", error);
    res.status(500).json({
      success: false,
      message: "Failed to get footer configurations"
    });
  }
});
router49.post("/config", csrfProtection, footerMutationLimiter, requireAuth, requireAdmin, validateUserId, async (req, res) => {
  try {
    const validatedData = FooterConfigSchema.parse(req.body);
    const userId = req.user?.id;
    const newConfig = await footerService.createConfig(validatedData, userId);
    res.status(201).json({
      success: true,
      data: newConfig,
      message: "Footer configuration created successfully"
    });
  } catch (error) {
    if (error instanceof z11.ZodError) {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors: error.errors
      });
    }
    console.error("Error creating footer config:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create footer configuration"
    });
  }
});
router49.put("/config/:id", csrfProtection, footerMutationLimiter, requireAuth, requireAdmin, validateConfigId, validateUserId, async (req, res) => {
  try {
    const configId = parseInt(req.params.id);
    const validatedData = FooterConfigSchema.partial().parse(req.body);
    const userId = req.user?.id;
    const updatedConfig = await footerService.updateConfig(configId, validatedData, userId);
    res.json({
      success: true,
      data: updatedConfig,
      message: "Footer configuration updated successfully"
    });
  } catch (error) {
    if (error instanceof z11.ZodError) {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors: error.errors
      });
    }
    console.error("Error updating footer config:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update footer configuration"
    });
  }
});
router49.delete("/config/:id", csrfProtection, footerMutationLimiter, requireAuth, requireAdmin, validateConfigId, async (req, res) => {
  try {
    const configId = parseInt(req.params.id);
    await footerService.deleteConfig(configId);
    res.json({
      success: true,
      message: "Footer configuration deleted successfully"
    });
  } catch (error) {
    console.error("Error deleting footer config:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete footer configuration"
    });
  }
});
router49.post("/activate/:id", csrfProtection, footerMutationLimiter, requireAuth, requireAdmin, validateConfigId, validateUserId, async (req, res) => {
  try {
    const configId = parseInt(req.params.id);
    const userId = req.user?.id;
    const activatedConfig = await footerService.activateConfig(configId, userId);
    res.json({
      success: true,
      data: activatedConfig,
      message: "Footer configuration activated successfully"
    });
  } catch (error) {
    console.error("Error activating footer config:", error);
    res.status(500).json({
      success: false,
      message: "Failed to activate footer configuration"
    });
  }
});
router49.get("/history/:id", requireAuth, requireAdmin, validateConfigId, async (req, res) => {
  try {
    const configId = parseInt(req.params.id);
    const history = await footerService.getHistory(configId);
    res.json({
      success: true,
      data: history
    });
  } catch (error) {
    console.error("Error getting footer history:", error);
    res.status(500).json({
      success: false,
      message: "Failed to get footer configuration history"
    });
  }
});
router49.post("/preview", csrfProtection, footerPreviewLimiter, requireAuth, requireAdmin, async (req, res) => {
  try {
    const validatedData = FooterConfigSchema.parse(req.body);
    res.json({
      success: true,
      data: validatedData,
      message: "Preview configuration validated"
    });
  } catch (error) {
    if (error instanceof z11.ZodError) {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors: error.errors
      });
    }
    console.error("Error validating preview config:", error);
    res.status(500).json({
      success: false,
      message: "Failed to validate preview configuration"
    });
  }
});
router49.use(footerErrorHandler);
var footer_default = router49;

// server/api/clock.ts
import { Router as Router48 } from "express";
import path14 from "path";
import fs13 from "fs";
var router50 = Router48();
async function getLatestVersionFromGitHub() {
  try {
    throw new Error("GitHub not configured yet");
    const response = await fetch("https://api.github.com/repos/YOUR_USERNAME/BlogPro/releases", {
      headers: {
        "User-Agent": "CuchaClock-Updater",
        "Accept": "application/vnd.github.v3+json"
      }
    });
    if (!response.ok) {
      throw new Error("GitHub API error");
    }
    const releases = await response.json();
    const clockRelease = releases.find((r) => r.tag_name.startsWith("clock2-v"));
    if (!clockRelease) {
      throw new Error("No clock releases found");
    }
    const exeAsset = clockRelease.assets.find(
      (asset) => asset.name.endsWith(".exe") || asset.name.endsWith(".zip")
    );
    return {
      latest_version: clockRelease.tag_name.replace("clock2-v", ""),
      download_url: exeAsset?.browser_download_url || clockRelease.html_url,
      release_notes: clockRelease.body || "\u041D\u043E\u0432\u0430\u044F \u0432\u0435\u0440\u0441\u0438\u044F",
      required: false,
      release_date: clockRelease.published_at.split("T")[0],
      file_size: exeAsset?.size || 0
    };
  } catch (error) {
    console.error("GitHub API error:", error);
    return getLatestVersionFromLocal();
  }
}
function getLatestVersionFromLocal() {
  const downloadsDir = path14.join(process.cwd(), "public", "downloads");
  try {
    if (!fs13.existsSync(downloadsDir)) {
      fs13.mkdirSync(downloadsDir, { recursive: true });
    }
    const files = fs13.readdirSync(downloadsDir).filter((f) => f.startsWith("CuchaClockSetup-") && f.endsWith(".exe")).map((f) => {
      const match = f.match(/CuchaClockSetup-(\d+\.\d+\.\d+)\.exe/);
      if (match) {
        const version = match[1];
        const filePath = path14.join(downloadsDir, f);
        const stats = fs13.statSync(filePath);
        return {
          version,
          filename: f,
          size: stats.size,
          date: stats.mtime
        };
      }
      return null;
    }).filter((f) => f !== null);
    if (files.length === 0) {
      return {
        latest_version: "2.0.0",
        download_url: "https://blogpro.tech/downloads/CuchaClockSetup-2.0.0.exe",
        release_notes: "\u0421\u0442\u0430\u0431\u0438\u043B\u044C\u043D\u0430\u044F \u0432\u0435\u0440\u0441\u0438\u044F 2.0",
        required: false,
        release_date: "2026-02-14",
        file_size: 0
      };
    }
    files.sort((a, b) => {
      const [aMajor, aMinor, aPatch] = a.version.split(".").map(Number);
      const [bMajor, bMinor, bPatch] = b.version.split(".").map(Number);
      if (aMajor !== bMajor) return bMajor - aMajor;
      if (aMinor !== bMinor) return bMinor - aMinor;
      return bPatch - aPatch;
    });
    const latest = files[0];
    return {
      latest_version: latest.version,
      download_url: `https://blogpro.tech/downloads/${latest.filename}`,
      release_notes: `\u0412\u0435\u0440\u0441\u0438\u044F ${latest.version}`,
      required: false,
      release_date: latest.date.toISOString().split("T")[0],
      file_size: latest.size
    };
  } catch (error) {
    console.error("Error reading downloads directory:", error);
    return {
      latest_version: "2.0.0",
      download_url: "https://blogpro.tech/downloads/CuchaClockSetup-2.0.0.exe",
      release_notes: "\u0421\u0442\u0430\u0431\u0438\u043B\u044C\u043D\u0430\u044F \u0432\u0435\u0440\u0441\u0438\u044F 2.0",
      required: false,
      release_date: "2026-02-14",
      file_size: 0
    };
  }
}
router50.get("/version", async (_req, res) => {
  try {
    const versionInfo = await getLatestVersionFromGitHub();
    res.json(versionInfo);
  } catch (error) {
    console.error("Clock version check error:", error);
    res.status(500).json({ error: "Failed to check version" });
  }
});
router50.get("/download/:version", async (req, res) => {
  try {
    const { version } = req.params;
    const filePath = path14.join(process.cwd(), "public", "downloads", `CuchaClockSetup-${version}.exe`);
    if (!fs13.existsSync(filePath)) {
      return res.status(404).json({ error: "File not found" });
    }
    res.download(filePath, `CuchaClockSetup-${version}.exe`);
  } catch (error) {
    console.error("Clock download error:", error);
    res.status(500).json({ error: "Download failed" });
  }
});
var clock_default = router50;

// server/api/clock-telemetry.ts
init_db();
import { Router as Router49 } from "express";
var router51 = Router49();
router51.post("/telemetry", async (req, res) => {
  try {
    const payload = req.body;
    if (!payload.session_id || !payload.app_version || !Array.isArray(payload.events)) {
      return res.status(400).json({ error: "Invalid payload" });
    }
    if (payload.events.length > 100) {
      return res.status(400).json({ error: "Too many events" });
    }
    const client = await pool.connect();
    try {
      await client.query("BEGIN");
      await client.query(`
                INSERT INTO clock_telemetry_sessions (session_id, app_version, os_version, last_seen, total_events)
                VALUES ($1, $2, $3, CURRENT_TIMESTAMP, $4)
                ON CONFLICT (session_id) DO UPDATE SET
                    last_seen = CURRENT_TIMESTAMP,
                    total_events = clock_telemetry_sessions.total_events + $4
            `, [payload.session_id, payload.app_version, payload.os, payload.events.length]);
      for (const event of payload.events) {
        await client.query(`
                    INSERT INTO clock_telemetry_events (session_id, event_type, event_data)
                    VALUES ($1, $2, $3)
                `, [payload.session_id, event.type, JSON.stringify(event.data || {})]);
      }
      await client.query("COMMIT");
      res.json({ success: true, received: payload.events.length });
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  } catch (error) {
    logger.error("Clock telemetry error:", error);
    res.status(500).json({ error: "Failed to process telemetry" });
  }
});
router51.get("/telemetry/stats", async (_req, res) => {
  try {
    const { rows } = await pool.query(`
            SELECT 
                date,
                total_sessions,
                total_events,
                app_starts,
                sync_catches,
                errors
            FROM clock_telemetry_summary
            ORDER BY date DESC
            LIMIT 30
        `);
    res.json({ stats: rows });
  } catch (error) {
    logger.error("Clock telemetry stats error:", error);
    res.status(500).json({ error: "Failed to fetch stats" });
  }
});
router51.get("/telemetry/dashboard", async (_req, res) => {
  try {
    const totalStats = await pool.query(`
            SELECT 
                COUNT(DISTINCT session_id) as total_users,
                COUNT(*) as total_events,
                COUNT(DISTINCT app_version) as versions_count
            FROM clock_telemetry_sessions
            WHERE last_seen > CURRENT_DATE - INTERVAL '30 days'
        `);
    const modeStats = await pool.query(`
            SELECT 
                event_data->>'mode' as mode,
                COUNT(*) as count
            FROM clock_telemetry_events
            WHERE event_type = 'mode_change'
            AND created_at > CURRENT_DATE - INTERVAL '30 days'
            GROUP BY event_data->>'mode'
            ORDER BY count DESC
        `);
    const versionStats = await pool.query(`
            SELECT 
                app_version,
                COUNT(*) as count
            FROM clock_telemetry_sessions
            WHERE last_seen > CURRENT_DATE - INTERVAL '30 days'
            GROUP BY app_version
            ORDER BY count DESC
        `);
    res.json({
      total: totalStats.rows[0],
      modes: modeStats.rows,
      versions: versionStats.rows
    });
  } catch (error) {
    logger.error("Clock telemetry dashboard error:", error);
    res.status(500).json({ error: "Failed to fetch dashboard data" });
  }
});
var clock_telemetry_default = router51;

// server/api/index.ts
var router52 = Router50();
router52.use("/admin", admin_default);
router52.use("/auth", auth_default);
router52.use("/blog", blog_default);
router52.use("/categories", categories_default);
router52.use("/contact", contact_default);
router52.use("/users", users_default2);
router52.use("/media", media_default);
router52.use("/uploads", uploads_default);
router52.use("/health", health_default);
router52.use("/metrics", metrics_default);
router52.use("/settings", settings_default);
router52.use("/mailings", mailings_default);
router52.use("/analytics", analytics_default);
router52.use("/documentation", documentation_default);
router52.use("/menu", menu_default2);
router52.use("/spellcheck", spellcheck_default);
router52.use("/editor-analytics", editor_analytics_default);
router52.use("/editor/upload-image", upload_image_default);
router52.use("/products", products_default);
router52.use("/product-categories", product_categories_default);
router52.use("/cart", routes_default3);
router52.use("/orders", routes_default4);
router52.use("/payments", routes_default5);
router52.use("/downloads", routes_default6);
router52.use("/search", search_default2);
router52.use("/comments", comments_default);
router52.use("/admin/comments", admin_comments_default);
router52.use("/user", user_comments_default);
router52.use("/footer", footer_default);
router52.use("/clock", clock_default);
router52.use("/clock", clock_telemetry_default);
router52.use("/", csrf_default);
var api_default = router52;

// server/routes.ts
async function registerRoutes(app2) {
  try {
    console.log("\u{1F527} Registering API routes...");
    app2.use("/api", api_default);
    console.log("\u2705 API routes registered successfully");
  } catch (error) {
    console.error("\u274C Failed to register API routes:", error);
    throw error;
  }
}

// server/vite.ts
import express3 from "express";
import fs14 from "fs";
import path16 from "path";
import { createServer as createViteServer, createLogger } from "vite";

// config/vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path15 from "path";
var vite_config_default = defineConfig(() => {
  return {
    plugins: [
      react()
    ],
    resolve: {
      alias: {
        "@": path15.resolve(__dirname, "../client/src"),
        "@shared": path15.resolve(__dirname, "../shared"),
        "@assets": path15.resolve(__dirname, "../attached_assets")
      }
    },
    server: {
      watch: {
        usePolling: true,
        interval: 1e3
      },
      hmr: {
        overlay: true
      }
    },
    root: path15.resolve(__dirname, "../client"),
    build: {
      outDir: path15.resolve(__dirname, "../dist/public"),
      emptyOutDir: true
    }
  };
});

// server/vite.ts
import { nanoid } from "nanoid";
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
function serveStatic(app2) {
  const distPath = path16.resolve(import.meta.dirname, "..", "client", "dist");
  if (!fs14.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express3.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path16.resolve(distPath, "index.html"));
  });
}

// server/utils/portManager.ts
import { promisify as promisify2 } from "util";
import { exec as exec2 } from "child_process";
var execPromise = promisify2(exec2);
async function clearPort(port) {
  try {
    const findCommand = process.platform === "win32" ? `netstat -ano | findstr :${port}` : `lsof -i :${port} | grep LISTEN`;
    const { stdout } = await execPromise(findCommand);
    if (stdout) {
      let pid = null;
      if (process.platform === "win32") {
        const match = stdout.match(/LISTENING\s+(\d+)/);
        if (match && match[1]) {
          pid = match[1];
        }
      } else {
        const match = stdout.match(/\S+\s+(\d+)/);
        if (match && match[1]) {
          pid = match[1];
        }
      }
      if (pid) {
        const killCommand = process.platform === "win32" ? `taskkill /F /PID ${pid}` : `kill -9 ${pid}`;
        await execPromise(killCommand);
        log(`Killed process ${pid} that was using port ${port}`);
      }
    }
  } catch (error) {
  }
}

// server/index.ts
init_db();
init_redis();
import path17 from "path";
import http from "http";
import https from "https";
import fs15 from "fs";
import expressWs from "express-ws";
import { WebSocket as WebSocket2 } from "ws";
var app = express4();
app.use(compressionMiddleware);
app.use(securityHeadersMiddleware);
app.use(corsMiddleware);
app.use(rateLimiter);
app.use(sanitizeInput);
app.use(requestIdMiddleware);
app.use(requestLogger);
app.use(performanceMonitor);
app.use(express4.json({ limit: "50mb" }));
app.use(express4.urlencoded({ extended: false, limit: "50mb" }));
app.use(cacheHeadersMiddleware);
app.use(
  "/uploads",
  express4.static(path17.join(process.cwd(), "public/uploads"), {
    setHeaders: (res) => {
      res.setHeader("Cache-Control", "public, max-age=31536000");
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
    }
  })
);
app.use(
  express4.static(path17.join(process.cwd(), "public"), {
    setHeaders: (res) => {
      res.setHeader("Cache-Control", "public, max-age=31536000");
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
    }
  })
);
var PgSession = pgSession(session);
app.use(
  session({
    store: new PgSession({
      pool,
      // Type assertion to avoid pg Pool version mismatch
      tableName: "sessions",
      createTableIfMissing: true
    }),
    secret: process.env.SESSION_SECRET || "your-secret-key",
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      maxAge: 1e3 * 60 * 60 * 24 * 30
      // 30 days for cart persistence
    }
  })
);
app.use((req, res, next) => {
  const start = Date.now();
  const path18 = req.path;
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path18.startsWith("/api") || path18.startsWith("/uploads")) {
      let logLine = `${req.method} ${path18} ${res.statusCode} in ${duration}ms`;
      log(logLine);
    }
  });
  next();
});
(async () => {
  const dbConnected = await checkDatabaseConnection();
  if (!dbConnected) {
    logger.error("Failed to connect to database. Please check your database configuration.");
    process.exit(1);
  }
  const redisConnected = await checkRedisConnection();
  if (redisConnected) {
    logger.info("Redis connected successfully - caching enabled");
  } else {
    logger.warn("Redis connection failed - caching disabled, using in-memory fallback");
  }
  const { ensureAdminUserExists: ensureAdminUserExists2 } = await Promise.resolve().then(() => (init_createAdminUser(), createAdminUser_exports));
  await ensureAdminUserExists2();
  console.log("\u{1F4DA} Documentation menu sync disabled (database contains invalid records)");
  const { analyticsScheduler: analyticsScheduler2 } = await Promise.resolve().then(() => (init_scheduler(), scheduler_exports));
  analyticsScheduler2.start();
  let server;
  const sslKeyPath = path17.join(process.cwd(), "ssl", "key.pem");
  const sslCertPath = path17.join(process.cwd(), "ssl", "cert.pem");
  if (fs15.existsSync(sslKeyPath) && fs15.existsSync(sslCertPath)) {
    try {
      const httpsOptions = {
        key: fs15.readFileSync(sslKeyPath),
        cert: fs15.readFileSync(sslCertPath)
      };
      server = https.createServer(httpsOptions, app);
      console.log("\u{1F512} HTTPS server enabled");
    } catch (error) {
      console.log("\u26A0\uFE0F  SSL certificate error, falling back to HTTP");
      server = http.createServer(app);
    }
  } else {
    server = http.createServer(app);
    console.log("\u26A0\uFE0F  HTTP server (SSL certificates not found)");
  }
  const wsInstance = expressWs(app, server);
  console.log("Express WebSocket extension initialized");
  console.log("WebSocket instance:", wsInstance ? "Created successfully" : "Failed to create");
  const { createWebSocketHandler: createWebSocketHandler2 } = await Promise.resolve().then(() => (init_websocket(), websocket_exports));
  createWebSocketHandler2(app, "/ws");
  console.log("WebSocket server initialized on /ws");
  app.set("wss", wsInstance.getWss());
  const wss = wsInstance.getWss();
  console.log("WebSocket server:", wss ? "Retrieved successfully" : "Failed to retrieve");
  console.log("WebSocket clients:", wss && wss.clients ? wss.clients.size : "No clients property");
  global.wss = wss;
  console.log("Global WebSocket server set:", global.wss ? "Yes" : "No");
  setInterval(() => {
    if (wss && wss.clients) {
      wss.clients.forEach((client) => {
        if (client && client.readyState === WebSocket2.OPEN) {
          try {
            client.send(
              JSON.stringify({
                type: "ping",
                timestamp: (/* @__PURE__ */ new Date()).toISOString()
              })
            );
          } catch (error) {
            console.error("Error sending ping:", error);
          }
        }
      });
    }
  }, 3e4);
  const { cleanupOriginalFiles: cleanupOriginalFiles2 } = await Promise.resolve().then(() => (init_mediaCleanup(), mediaCleanup_exports));
  setTimeout(async () => {
    try {
      const result = await cleanupOriginalFiles2();
      if (result.deleted.length > 0) {
        console.log(`\u{1F9F9} Startup cleanup: Removed ${result.deleted.length} original image files`);
      }
    } catch (error) {
      console.error("Startup cleanup failed:", error);
    }
  }, 5e3);
  setInterval(async () => {
    try {
      const result = await cleanupOriginalFiles2();
      if (result.deleted.length > 0) {
        console.log(`\u{1F9F9} Scheduled cleanup: Removed ${result.deleted.length} original image files`);
      }
    } catch (error) {
      console.error("Scheduled cleanup failed:", error);
    }
  }, 10 * 60 * 1e3);
  await registerRoutes(app);
  setupSwagger(app);
  if (app.get("env") === "production") {
    serveStatic(app);
  }
  app.use(notFoundHandler);
  app.use(errorHandler);
  const port = parseInt(process.env.PORT || "5000", 10);
  const isHttps = fs15.existsSync(sslKeyPath) && fs15.existsSync(sslCertPath);
  const protocol = isHttps ? "https" : "http";
  await clearPort(port);
  server.listen(
    {
      port,
      host: "0.0.0.0",
      reusePort: true
    },
    async () => {
      log(`\u{1F680} Server running on ${protocol}://localhost:${port}`);
      healthMonitor.start();
      metricsCollector.start();
      const { realtimeAnalytics: realtimeAnalytics2 } = await Promise.resolve().then(() => (init_realtime_analytics(), realtime_analytics_exports));
      realtimeAnalytics2.initialize(wss);
      setTimeout(async () => {
        try {
          await realtimeAnalytics2.broadcastImmediate();
          console.log("\u{1F4CA} Initial analytics broadcast sent");
        } catch (error) {
          console.error("Initial analytics broadcast failed:", error);
        }
      }, 2e3);
    }
  );
})();
