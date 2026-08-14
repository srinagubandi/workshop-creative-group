import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { publicProcedure, router } from "./_core/trpc";
import {
  createQuoteRequest,
  createContactSubmission,
  getAllBlogPosts,
  getBlogPostBySlug,
  getFeaturedBlogPost,
  getPublishedGalleryMedia,
  getPublishedSiteAsset,
  getPublishedTestimonials,
  listSiteTextOverrides,
} from "./db";
import { storagePut } from "./storage";
import { adminRouter } from "./adminRouter";
import { sendQuoteAlert, sendContactAlert } from "./email";
import { getPublicThumbnailSource } from "../shared/thumbnailPresentation";
import { orderTestimonials } from "../shared/testimonialPresentation";

export const appRouter = router({
  admin: adminRouter,

  /**
   * Quote request submission.
   * Accepts base64-encoded file data, stores it in S3, saves the request to the DB,
   * and notifies the owner.
   */
  quotes: router({
    submit: publicProcedure
      .input(
        z.object({
          companyName: z.string().min(1, "Company name is required"),
          contactName: z.string().min(1, "Contact name is required"),
          email: z.string().email("Valid email is required"),
          phone: z.string().optional(),
          projectType: z.string().optional(),
          quantity: z.string().optional(),
          sizeSpecs: z.string().optional(),
          deadline: z.string().optional(),
          description: z.string().optional(),
          // File upload: base64 encoded content + metadata
          invoiceFile: z
            .object({
              name: z.string(),
              type: z.string(),
              data: z.string(), // base64
            })
            .optional(),
        })
      )
      .mutation(async ({ input }) => {
        let invoiceFileKey: string | undefined;
        let invoiceFileUrl: string | undefined;
        let invoiceFileName: string | undefined;

        // Upload invoice file to S3 if provided
        if (input.invoiceFile) {
          try {
            const buffer = Buffer.from(input.invoiceFile.data, "base64");
            const timestamp = Date.now();
            const safeName = input.invoiceFile.name.replace(/[^a-zA-Z0-9._-]/g, "_");
            const fileKey = `invoices/${timestamp}-${safeName}`;

            const { key, url } = await storagePut(
              fileKey,
              buffer,
              input.invoiceFile.type
            );

            invoiceFileKey = key;
            invoiceFileUrl = url;
            invoiceFileName = input.invoiceFile.name;
          } catch (err) {
            console.error("[Quote] Failed to upload invoice file:", err);
            // Non-fatal: continue without the file
          }
        }

        // Save to database
        try {
          await createQuoteRequest({
            companyName: input.companyName,
            contactName: input.contactName,
            email: input.email,
            phone: input.phone ?? null,
            projectType: input.projectType ?? null,
            quantity: input.quantity ?? null,
            sizeSpecs: input.sizeSpecs ?? null,
            deadline: input.deadline ?? null,
            description: input.description ?? null,
            invoiceFileKey: invoiceFileKey ?? null,
            invoiceFileUrl: invoiceFileUrl ?? null,
            invoiceFileName: invoiceFileName ?? null,
          });
        } catch (err) {
          console.error("[Quote] Failed to save quote request:", err);
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Failed to save quote request. Please try again.",
          });
        }

        // Send Resend email alert (non-fatal)
        sendQuoteAlert({
          companyName: input.companyName,
          contactName: input.contactName,
          email: input.email,
          phone: input.phone,
          projectType: input.projectType,
          quantity: input.quantity,
          sizeSpecs: input.sizeSpecs,
          deadline: input.deadline,
          description: input.description,
          invoiceFileName: invoiceFileName,
          invoiceFileUrl: invoiceFileUrl,
        }).catch((e) => console.warn("[Quote] Resend alert failed:", e));

        return { success: true };
      }),
  }),

  /**
   * Contact form submissions — saves to DB and notifies owner.
   */
  contact: router({
    submit: publicProcedure
      .input(z.object({
        name: z.string().min(1),
        email: z.string().email(),
        phone: z.string().optional(),
        message: z.string().min(1),
      }))
      .mutation(async ({ input }) => {
        try {
          await createContactSubmission({
            name: input.name,
            email: input.email,
            phone: input.phone ?? null,
            message: input.message,
          });
        } catch (err) {
          console.error("[Contact] Failed to save:", err);
        }
        // Send Resend email alert (non-fatal)
        sendContactAlert({
          name: input.name,
          email: input.email,
          phone: input.phone,
          message: input.message,
        }).catch((e) => console.warn("[Contact] Resend alert failed:", e));

        return { success: true };
      }),
  }),

  /**
   * Blog post procedures.
   */
  blog: router({
    list: publicProcedure.query(async () => {
      return getAllBlogPosts();
    }),
    featured: publicProcedure.query(async () => {
      return getFeaturedBlogPost();
    }),
    bySlug: publicProcedure
      .input(z.object({ slug: z.string() }))
      .query(async ({ input }) => {
        return getBlogPostBySlug(input.slug);
      }),
  }),

  media: router({
    siteAsset: publicProcedure
      .input(z.object({ slotKey: z.string().min(1).max(128) }))
      .query(async ({ input }) => {
        const record = await getPublishedSiteAsset(input.slotKey);
        if (!record) return null;
        return { id: record.asset.id, src: `/media/${record.asset.id}`, alt: record.asset.altText || record.asset.title || "Workshop Creative Group" };
      }),
    gallery: publicProcedure
      .input(z.object({ category: z.string().optional() }).optional())
      .query(async ({ input }) => {
        const records = await getPublishedGalleryMedia(input?.category);
        const categoryLabels: Record<string, string> = {
          "large-format": "Large Format Printing",
          "graphic-design": "Graphic Design",
          branding: "Branding",
          "print-procurement": "Print Procurement",
          logos: "Client Logos",
        };
        return records.map(({ asset, placement }) => ({
          id: asset.id,
          src: `/media/${asset.id}`,
          thumbnailSrc: getPublicThumbnailSource(asset.thumbnailMediaId),
          mediaType: asset.mediaType,
          category: placement.category ?? "uncategorized",
          categoryLabel: categoryLabels[placement.category ?? ""] ?? "Our Work",
          client: placement.client ?? asset.title ?? "Workshop Creative Group",
          project: placement.project ?? asset.caption ?? "Print project",
          alt: asset.altText || asset.title || placement.project || "Workshop Creative Group project",
          caption: asset.caption,
          sortOrder: placement.sortOrder,
        }));
      }),
  }),
  testimonials: router({
    list: publicProcedure.query(async () => {
      const records = await getPublishedTestimonials();
      return orderTestimonials(records.map(({ testimonial, media }) => ({
        ...testimonial,
        mediaSrc: media ? `/media/${media.id}` : null,
        mediaAlt: media?.altText || media?.title || testimonial.company || testimonial.authorName,
      })));
    }),
  }),
  content: router({
    overrides: publicProcedure.input(z.object({ routePath: z.string().max(255).optional() }).optional()).query(async ({ input }) => {
      return listSiteTextOverrides(input?.routePath);
    }),
  }),
});

export type AppRouter = typeof appRouter;
