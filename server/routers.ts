import { COOKIE_NAME } from "@shared/const";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { getSessionCookieOptions } from "./_core/cookies";
import { notifyOwner } from "./_core/notification";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import {
  createQuoteRequest,
  getAllBlogPosts,
  getBlogPostBySlug,
  getFeaturedBlogPost,
} from "./db";
import { storagePut } from "./storage";

export const appRouter = router({
  system: systemRouter,

  auth: router({
    me: publicProcedure.query((opts) => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),

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

        // Notify the owner
        const fileNote = invoiceFileName
          ? `\nInvoice File: ${invoiceFileName}`
          : "\nNo invoice file uploaded.";

        await notifyOwner({
          title: `New Quote Request from ${input.companyName}`,
          content: `
New quote request received!

Company: ${input.companyName}
Contact: ${input.contactName}
Email: ${input.email}
Phone: ${input.phone ?? "Not provided"}
Project Type: ${input.projectType ?? "Not specified"}
Quantity: ${input.quantity ?? "Not specified"}
Size/Specs: ${input.sizeSpecs ?? "Not specified"}
Deadline: ${input.deadline ?? "Not specified"}
Description: ${input.description ?? "None"}${fileNote}
          `.trim(),
        });

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
});

export type AppRouter = typeof appRouter;
