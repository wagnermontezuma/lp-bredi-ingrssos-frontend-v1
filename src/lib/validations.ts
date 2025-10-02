import { z } from "zod";

export const leadFormSchema = z.object({
  name: z.string().min(2, "Informe seu nome completo"),
  email: z.string().email("Informe um e-mail válido"),
  phone: z
    .string()
    .min(10, "Informe um telefone válido")
    .transform((value) => value.trim()),
  eventType: z.string().min(2, "Conte qual é o seu tipo de evento"),
});

export type LeadFormSchema = z.infer<typeof leadFormSchema>;
