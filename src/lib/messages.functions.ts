import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const schema = z.object({
  name: z.string().trim().min(1).max(200),
  email: z.string().trim().email().max(255),
  organization: z.string().trim().max(200).optional().default(""),
  phone: z.string().trim().max(50).optional().default(""),
  practice: z.string().trim().max(200).optional().default(""),
  preferred_date: z.string().trim().max(50).optional().default(""),
  preferred_time: z.string().trim().max(20).optional().default(""),
  message: z.string().trim().min(1).max(5000),
});

export type MessageInput = z.input<typeof schema>;

export const submitMessage = createServerFn({ method: "POST" })
  .inputValidator((data: MessageInput) => schema.parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("contact_messages").insert({
      name: data.name,
      email: data.email,
      organization: data.organization || null,
      phone: data.phone || null,
      practice: data.practice || null,
      preferred_date: data.preferred_date || null,
      preferred_time: data.preferred_time || null,
      message: data.message,
    });
    if (error) throw new Error("Could not send your message. Please try again.");
    return { ok: true as const };
  });
