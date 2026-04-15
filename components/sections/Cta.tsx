"use client";

import { useState, type FormEvent } from "react";
import { content } from "@/lib/content";
import { Button } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/motion/Reveal";

type FormState = {
  nome: string;
  email: string;
  modalidade: string;
  rotina: string;
  objetivo: string;
};

const initial: FormState = {
  nome: "",
  email: "",
  modalidade: "",
  rotina: "",
  objetivo: "",
};

export function Cta() {
  const {
    eyebrow,
    headingBefore,
    headingEmphasis,
    headingAfter,
    sub,
    emailTo,
    emailSubject,
    fallbackContact,
  } = content.cta;
  const [form, setForm] = useState<FormState>(initial);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const body = [
      `Nome: ${form.nome}`,
      `Email: ${form.email}`,
      `Modalidade: ${form.modalidade}`,
      `Rotina: ${form.rotina}`,
      "",
      "O que quero melhorar:",
      form.objetivo,
    ].join("\n");
    const href = `mailto:${emailTo}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(body)}`;
    window.location.href = href;
  };

  const field =
    "w-full rounded-sm border border-line bg-white/[0.03] px-4 py-3 text-[14px] text-ink placeholder:text-ink-muted/60 transition-colors focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/30";

  return (
    <section
      id="cta"
      className="relative z-10 mx-auto w-[min(calc(100%-32px),1240px)] px-2 py-[clamp(80px,12vw,160px)]"
    >
      <Reveal>
        <div className="rounded-[24px] border border-line bg-white/[0.03] p-8 md:p-14">
          <SectionHeader
            eyebrow={eyebrow}
            heading={
              <>
                {headingBefore}
                <em className="not-italic font-display italic text-gold">{headingEmphasis}</em>
                {headingAfter}
              </>
            }
            sub={sub}
          />

          <form onSubmit={handleSubmit} className="mt-10 flex flex-col gap-5">
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <label className="flex flex-col gap-2">
                <span className="text-[11px] uppercase tracking-[0.2em] text-gold">Nome</span>
                <input
                  type="text"
                  name="nome"
                  placeholder="Seu nome"
                  required
                  className={field}
                  value={form.nome}
                  onChange={(e) => setForm({ ...form, nome: e.target.value })}
                />
              </label>
              <label className="flex flex-col gap-2">
                <span className="text-[11px] uppercase tracking-[0.2em] text-gold">Email</span>
                <input
                  type="email"
                  name="email"
                  placeholder="voce@email.com"
                  required
                  className={field}
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </label>
              <label className="flex flex-col gap-2">
                <span className="text-[11px] uppercase tracking-[0.2em] text-gold">Modalidade</span>
                <input
                  type="text"
                  name="modalidade"
                  placeholder="Boxe, MMA, Muay Thai..."
                  required
                  className={field}
                  value={form.modalidade}
                  onChange={(e) => setForm({ ...form, modalidade: e.target.value })}
                />
              </label>
              <label className="flex flex-col gap-2">
                <span className="text-[11px] uppercase tracking-[0.2em] text-gold">
                  Rotina de treino
                </span>
                <select
                  name="rotina"
                  required
                  className={field}
                  value={form.rotina}
                  onChange={(e) => setForm({ ...form, rotina: e.target.value })}
                >
                  <option value="">Selecione</option>
                  <option value="Treino em casa">Treino em casa</option>
                  <option value="Academia ou CT">Academia ou CT</option>
                  <option value="Misto">Misto</option>
                </select>
              </label>
            </div>
            <label className="flex flex-col gap-2">
              <span className="text-[11px] uppercase tracking-[0.2em] text-gold">
                O que você quer melhorar?
              </span>
              <textarea
                name="objetivo"
                rows={4}
                required
                placeholder="Ex.: voltar a treinar com consistência, organizar sessões curtas, melhorar condicionamento..."
                className={field}
                value={form.objetivo}
                onChange={(e) => setForm({ ...form, objetivo: e.target.value })}
              />
            </label>
            <div className="flex flex-wrap items-center gap-3">
              <Button type="submit">Entrar na waitlist</Button>
              <Button href={fallbackContact.href} variant="secondary">
                {fallbackContact.label}
              </Button>
            </div>
            <p className="text-[12px] text-ink-muted/70">
              O envio abre seu cliente de email com assunto e mensagem prontos.
            </p>
          </form>
        </div>
      </Reveal>
    </section>
  );
}
