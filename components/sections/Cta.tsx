"use client";

import { useState, type FormEvent } from "react";
import { content } from "@/lib/content";
import { Button } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/motion/Reveal";
import { Monogram } from "@/components/ui/Monogram";

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
    section,
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
    "w-full border-b border-line-2 bg-transparent px-0 py-3 text-[15px] text-ink placeholder:text-ink-muted/60 transition-colors focus:border-steel focus:outline-none";

  const label =
    "flex flex-col gap-3 font-mono text-[10px] uppercase tracking-[0.24em] text-ink-muted";

  return (
    <section
      id="cta"
      className="relative z-10 mx-auto w-[min(100%-32px,1360px)] border-t border-line px-2 py-[clamp(96px,14vw,180px)]"
    >
      <Reveal>
        <div className="relative overflow-hidden border border-line-2 bg-obsidian-2/70 p-6 sm:p-10 lg:p-14">
          {/* Corner brackets — hidden on small to avoid visual clutter */}
          <div className="brackets hidden md:block">
            <span /><span /><span /><span />
          </div>

          {/* Top meta row — always stacked on top of the content */}
          <div className="relative flex flex-wrap items-center gap-3 border-b border-line pb-5">
            <Monogram size={24} />
            <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-ink-muted">
              {section} · {eyebrow}
            </span>
            <span className="ml-auto hidden font-mono text-[10px] uppercase tracking-[0.24em] text-steel sm:inline">
              —— Waitlist aberta
            </span>
          </div>

          <div className="relative mt-10 grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
            <div className="flex flex-col gap-6 lg:border-r lg:border-line lg:pr-12">
              <h2 className="font-display text-[clamp(30px,4.5vw,60px)] uppercase leading-[0.96] tracking-[-0.025em] text-ink text-balance">
                {headingBefore}
                <em className="not-italic font-editorial italic text-steel">{headingEmphasis}</em>
                {headingAfter}
              </h2>
              <p className="max-w-[44ch] text-[14px] leading-relaxed text-ink-dim md:text-[15px]">
                {sub}
              </p>
              <span className="mt-2 font-editorial text-[17px] italic leading-snug text-steel-soft">
                “Não vende atalho. Trilha.”
              </span>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-7">
              <div className="grid grid-cols-1 gap-7 sm:grid-cols-2">
                <label className={label}>
                  <span>Nome</span>
                  <input
                    type="text"
                    name="nome"
                    placeholder="Seu nome"
                    required
                    autoComplete="name"
                    className={field}
                    value={form.nome}
                    onChange={(e) => setForm({ ...form, nome: e.target.value })}
                  />
                </label>
                <label className={label}>
                  <span>Email</span>
                  <input
                    type="email"
                    name="email"
                    placeholder="voce@email.com"
                    required
                    autoComplete="email"
                    className={field}
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                  />
                </label>
                <label className={label}>
                  <span>Modalidade</span>
                  <input
                    type="text"
                    name="modalidade"
                    placeholder="Boxe, MMA, Muay Thai…"
                    required
                    className={field}
                    value={form.modalidade}
                    onChange={(e) => setForm({ ...form, modalidade: e.target.value })}
                  />
                </label>
                <label className={label}>
                  <span>Rotina</span>
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
              <label className={label}>
                <span>O que você quer melhorar?</span>
                <textarea
                  name="objetivo"
                  rows={3}
                  required
                  placeholder="Ex.: voltar a treinar com consistência, organizar sessões curtas, melhorar condicionamento…"
                  className={field}
                  value={form.objetivo}
                  onChange={(e) => setForm({ ...form, objetivo: e.target.value })}
                />
              </label>
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Button type="submit" className="w-full sm:w-auto">
                  Entrar na waitlist
                </Button>
                <Button href={fallbackContact.href} variant="secondary" className="w-full sm:w-auto">
                  {fallbackContact.label}
                </Button>
              </div>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-muted">
                —— O envio abre seu cliente de email com assunto e mensagem prontos.
              </p>
            </form>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
