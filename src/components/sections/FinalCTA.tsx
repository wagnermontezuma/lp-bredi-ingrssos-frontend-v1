"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { leadFormSchema, type LeadFormSchema } from "@/lib/validations";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const FinalCTA = () => {
  const [submitted, setSubmitted] = useState(false);
  const form = useForm<LeadFormSchema>({
    resolver: zodResolver(leadFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      eventType: "",
    },
  });

  const onSubmit = (values: LeadFormSchema) => {
    console.log("Form Data Submitted:", values);
    setSubmitted(true);
    form.reset();
  };

  return (
    <section id="contact" className="bg-bredi-primary py-20 text-white">
      <div className="container mx-auto grid gap-12 px-6 lg:grid-cols-2 lg:items-center">
        <div className="text-center lg:text-left">
          <h2 className="mb-4 text-4xl font-extrabold uppercase md:text-5xl">
            Chegou a hora de vender seus ingressos com mais eficiência.
          </h2>
          <p className="text-xl opacity-80">
            Preencha o formulário e nossa equipe entrará em contato para criar a solução perfeita para o seu evento.
          </p>
        </div>
        <div>
          {submitted ? (
            <Card className="bg-white text-bredi-primary">
              <CardHeader>
                <CardTitle className="text-center text-2xl">Obrigado!</CardTitle>
              </CardHeader>
              <CardContent className="text-center text-bredi-secondary">
                Recebemos suas informações. Em breve, um de nossos especialistas entrará em contato.
              </CardContent>
            </Card>
          ) : (
            <Card className="bg-white text-bredi-secondary">
              <CardHeader className="text-center">
                <CardTitle className="text-bredi-primary">Quero vender com a Bredi Ingressos</CardTitle>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nome</FormLabel>
                          <FormControl>
                            <Input placeholder="Seu nome completo" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>E-mail</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="voce@empresa.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Telefone</FormLabel>
                          <FormControl>
                            <Input type="tel" placeholder="(11) 99999-9999" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="eventType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tipo de evento</FormLabel>
                          <FormControl>
                            <Input placeholder="Ex: Show, Festa, Congresso" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button type="submit" className="w-full bg-bredi-accent text-bredi-primary hover:bg-bredi-primary hover:text-bredi-accent">
                      Enviar
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
