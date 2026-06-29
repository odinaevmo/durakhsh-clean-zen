import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  Wrench,
  FlaskConical,
  HeartHandshake,
  BadgeDollarSign,
  Clock,
  Phone,
  MessageCircle,
  Instagram,
  Send,
  MapPin,
  Check,
  Star,
  Menu,
  X,
} from "lucide-react";
import heroImg from "@/assets/hero-cleaning.jpg";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import logoAsset from "@/assets/logo-site.jpg.asset.json";
import { sendTelegramOrder } from "@/lib/telegram-config";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Durakhsh Dushanbe — Профессиональный клининг в Душанбе" },
      {
        name: "description",
        content:
          "Профессиональная уборка квартир, домов и офисов в Душанбе. Своё оборудование и химия. От 20 сомони за м². Заказать уборку онлайн.",
      },
      { property: "og:title", content: "Durakhsh Dushanbe — Профессиональный клининг" },
      {
        property: "og:description",
        content: "Чистота, которой можно доверять. Заказать уборку в Душанбе.",
      },
    ],
  }),
  component: LandingPage,
});

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
};

function Section({
  id,
  className = "",
  children,
}: {
  id?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className={`px-5 py-20 sm:px-8 sm:py-24 lg:py-32 ${className}`}>
      <div className="mx-auto w-full max-w-6xl">{children}</div>
    </section>
  );
}

function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
      <span className="h-1.5 w-1.5 rounded-full bg-accent" />
      {children}
    </span>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mt-4 text-3xl font-bold leading-tight text-foreground sm:text-4xl lg:text-5xl">
      {children}
    </h2>
  );
}

/* ---------- Navigation ---------- */

const navLinks = [
  { href: "#services", label: "Услуги" },
  { href: "#pricing", label: "Цены" },
  { href: "#calculator", label: "Калькулятор" },
  { href: "#order", label: "Заявка" },
  { href: "#reviews", label: "Отзывы" },
  { href: "#contact", label: "Контакты" },
];

function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-lg">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 py-4 sm:px-8">
        <a href="#top" className="flex min-w-0 items-center gap-2">
          <div className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-gradient-primary text-primary-foreground shadow-soft">
            <Sparkles className="h-5 w-5" />
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-bold text-foreground">Durakhsh Dushanbe</p>
            <p className="truncate text-[11px] text-muted-foreground">Профессиональный клининг</p>
          </div>
        </a>

        <nav className="hidden items-center gap-8 lg:flex">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#order"
            className="rounded-full bg-gradient-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-soft transition-transform hover:scale-105"
          >
            Заказать
          </a>
        </nav>

        <button
          className="grid h-10 w-10 place-items-center rounded-xl border border-border lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Открыть меню"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border bg-background lg:hidden">
          <div className="mx-auto flex max-w-6xl flex-col gap-1 px-5 py-4">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-3 text-sm font-medium text-foreground hover:bg-secondary"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#order"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-full bg-gradient-primary px-5 py-3 text-center text-sm font-semibold text-primary-foreground"
            >
              Заказать уборку
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

/* ---------- Hero ---------- */

function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-gradient-hero px-5 pb-20 pt-14 sm:px-8 sm:pb-28 sm:pt-20 lg:pb-32">
      <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-accent/30 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-deep-blue/10 blur-3xl" />

      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-2">
        <motion.div initial="hidden" animate="show" variants={fadeUp}>
          <SectionEyebrow>Душанбе · Клининг 5★</SectionEyebrow>
          <h1 className="mt-5 text-4xl font-extrabold leading-[1.05] text-foreground sm:text-5xl lg:text-6xl">
            Профессиональный
            <br />
            <span className="bg-gradient-primary bg-clip-text text-transparent">клининг</span> в Душанбе
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            <strong className="text-foreground">Чистота, которой можно доверять.</strong> Вернем вашему дому, квартире или
            офису идеальную чистоту. Мы используем профессиональное оборудование и качественную бытовую химию — вам не
            нужно ничего покупать или подготавливать.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#order"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-primary px-7 py-4 text-base font-semibold text-primary-foreground shadow-elegant transition-transform hover:scale-[1.03]"
            >
              Заказать уборку
              <Sparkles className="h-4 w-4" />
            </a>
            <a
              href="#calculator"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-background px-7 py-4 text-base font-semibold text-primary transition-colors hover:bg-secondary"
            >
              Рассчитать стоимость
            </a>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-muted-foreground">
            <span className="flex items-center gap-2"><Check className="h-4 w-4 text-accent" /> Своё оборудование</span>
            <span className="flex items-center gap-2"><Check className="h-4 w-4 text-accent" /> Своя химия</span>
            <span className="flex items-center gap-2"><Check className="h-4 w-4 text-accent" /> Опытная команда</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <div className="absolute inset-0 -z-10 rounded-[2.5rem] bg-gradient-accent opacity-20 blur-2xl" />
          <div className="overflow-hidden rounded-[2rem] border border-border bg-background shadow-elegant">
            <img
              src={heroImg}
              alt="Профессиональный клинер Durakhsh Dushanbe"
              width={1024}
              height={1024}
              className="h-auto w-full object-cover"
            />
          </div>
          <div className="absolute -bottom-6 -left-6 hidden rounded-2xl border border-border bg-background p-4 shadow-elegant sm:block">
            <div className="flex items-center gap-3">
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-primary text-primary-foreground">
                <BadgeDollarSign className="h-6 w-6" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">от</p>
                <p className="text-lg font-bold text-foreground">20 сомони / м²</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------- Services ---------- */

const services = [
  { icon: Sparkles, title: "Генеральная уборка", desc: "Полная уборка помещений с особым вниманием к деталям." },
  { icon: Check, title: "Очистка полов", desc: "Мытье и полировка любых типов напольных покрытий." },
  { icon: Wrench, title: "Удаление пыли", desc: "Тщательное удаление пыли с поверхностей и текстиля." },
  { icon: FlaskConical, title: "Очистка кухни", desc: "Очистка плит, духовок, вытяжек и кухонных поверхностей." },
  { icon: HeartHandshake, title: "Очистка санузлов", desc: "Удаление известкового налета и дезинфекция." },
  { icon: Sparkles, title: "Дезинфекция", desc: "Безопасная дезинфекция профессиональными средствами." },
  { icon: Wrench, title: "Профессиональная техника", desc: "Современное оборудование для максимального результата." },
  { icon: FlaskConical, title: "Профессиональная химия", desc: "Сертифицированные средства, безопасные для дома." },
];

function Services() {
  return (
    <Section id="services" className="bg-background">
      <div className="text-center">
        <SectionEyebrow>Наши услуги</SectionEyebrow>
        <SectionTitle>Что входит в уборку</SectionTitle>
      </div>
      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {services.map((s, i) => (
          <motion.div
            key={s.title}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            transition={{ delay: i * 0.05 }}
            className="group rounded-3xl border border-border bg-card p-6 shadow-soft transition-all hover:-translate-y-1 hover:shadow-elegant"
          >
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-secondary text-primary transition-colors group-hover:bg-gradient-primary group-hover:text-primary-foreground">
              <s.icon className="h-6 w-6" />
            </div>
            <h3 className="mt-5 text-lg font-bold text-foreground">{s.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
          </motion.div>
        ))}
      </div>
      <p className="mx-auto mt-10 max-w-2xl rounded-2xl bg-secondary px-6 py-5 text-center text-sm text-primary">
        Весь инвентарь, оборудование и бытовую химию предоставляет наша компания.
      </p>
    </Section>
  );
}

/* ---------- Pricing + Calculator ---------- */

function PricingAndCalculator() {
  const [areaStr, setAreaStr] = useState("");
  const area = Math.max(0, Number(areaStr) || 0);
  const { base, discount, total } = useMemo(() => {
    const base = area * 20;
    const discount = area > 55 ? base * 0.1 : 0;
    return { base, discount, total: base - discount };
  }, [area]);

  return (
    <Section id="pricing" className="bg-gradient-hero">
      <div className="text-center">
        <SectionEyebrow>Стоимость</SectionEyebrow>
        <SectionTitle>Стоимость генеральной уборки</SectionTitle>
      </div>

      <div className="mt-14 grid items-stretch gap-6 lg:grid-cols-2">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeUp}
          className="flex flex-col justify-between rounded-3xl bg-gradient-primary p-8 text-primary-foreground shadow-elegant sm:p-10"
        >
          <div>
            <p className="text-sm font-medium uppercase tracking-widest text-primary-foreground/70">Базовая цена</p>
            <p className="mt-4 text-5xl font-extrabold sm:text-6xl">
              20 <span className="text-2xl font-semibold sm:text-3xl">сомони / м²</span>
            </p>
            <p className="mt-3 text-primary-foreground/80">
              Прозрачная фиксированная стоимость без скрытых платежей.
            </p>
          </div>
          <div className="mt-8 rounded-2xl bg-white/10 p-5 backdrop-blur">
            <p className="text-base font-medium">
              🎉 Если площадь более 55 м² — автоматически применяется скидка 10%.
            </p>
          </div>
        </motion.div>

        <motion.div
          id="calculator"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeUp}
          className="rounded-3xl border border-border bg-card p-8 shadow-soft sm:p-10"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Калькулятор</p>
          <h3 className="mt-3 text-2xl font-bold text-foreground">Рассчитайте стоимость</h3>

          <label className="mt-6 block text-sm font-medium text-foreground">
            Количество квадратных метров
            <div className="mt-2 flex items-center rounded-2xl border border-border bg-background px-4 py-3 focus-within:border-accent focus-within:ring-4 focus-within:ring-accent/20">
              <input
                type="number"
                min={0}
                inputMode="numeric"
                value={areaStr}
                onChange={(e) => setAreaStr(e.target.value)}
                placeholder="например, 60"
                className="w-full bg-transparent text-lg font-semibold text-foreground outline-none placeholder:text-muted-foreground/60"
              />
              <span className="text-sm font-medium text-muted-foreground">м²</span>
            </div>
          </label>

          <div className="mt-6 space-y-3">
            <Row label="Стоимость" value={`${base.toFixed(0)} сомони`} />
            <Row
              label="Размер скидки"
              value={discount > 0 ? `− ${discount.toFixed(0)} сомони` : "—"}
              accent={discount > 0}
            />
            <div className="mt-2 flex items-center justify-between rounded-2xl bg-gradient-primary px-5 py-4 text-primary-foreground">
              <span className="text-sm font-medium opacity-90">Итоговая цена</span>
              <span className="text-2xl font-extrabold">{total.toFixed(0)} сомони</span>
            </div>
          </div>

          <a
            href="#order"
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full border border-border bg-background px-6 py-3 text-sm font-semibold text-primary transition-colors hover:bg-secondary"
          >
            Перейти к заявке
          </a>
        </motion.div>
      </div>
    </Section>
  );
}

function Row({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="flex items-center justify-between rounded-xl bg-secondary px-5 py-3">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className={`text-base font-bold ${accent ? "text-accent-foreground" : "text-foreground"}`}>
        {value}
      </span>
    </div>
  );
}

/* ---------- Order Form ---------- */

interface FormState {
  area: string;
  name: string;
  phone: string;
  address: string;
}
interface FormErrors {
  area?: string;
  name?: string;
  phone?: string;
  address?: string;
}

function OrderForm() {
  const [form, setForm] = useState<FormState>({ area: "", name: "", phone: "", address: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const update = (k: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((s) => ({ ...s, [k]: e.target.value }));

  function validate(): boolean {
    const e: FormErrors = {};
    const area = Number(form.area);
    if (!form.area || isNaN(area) || area <= 0) e.area = "Укажите площадь больше 0";
    if (!form.name.trim() || form.name.trim().length < 2) e.name = "Введите ваше имя";
    if (!/^[+\d][\d\s\-()]{7,}$/.test(form.phone.trim())) e.phone = "Введите корректный номер телефона";
    if (!form.address.trim() || form.address.trim().length < 3) e.address = "Введите адрес";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function onSubmit(ev: FormEvent) {
    ev.preventDefault();
    if (!validate()) return;
    setLoading(true);
    const area = Number(form.area);
    const base = area * 20;
    const total = area > 55 ? base * 0.9 : base;
    await sendTelegramOrder({
      name: form.name.trim(),
      phone: form.phone.trim(),
      address: form.address.trim(),
      area,
      price: Math.round(total),
    });
    setLoading(false);
    setSubmitted(true);
  }

  return (
    <Section id="order" className="bg-background">
      <div className="mx-auto max-w-3xl text-center">
        <SectionEyebrow>Заявка</SectionEyebrow>
        <SectionTitle>Оставить заявку</SectionTitle>
        <p className="mt-4 text-muted-foreground">
          Заполните форму и мы свяжемся с вами для подтверждения заказа.
        </p>
      </div>

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={fadeUp}
        className="mx-auto mt-12 max-w-2xl rounded-3xl border border-border bg-card p-6 shadow-elegant sm:p-10"
      >
        {submitted ? (
          <div className="py-12 text-center">
            <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-gradient-primary text-primary-foreground">
              <Check className="h-8 w-8" />
            </div>
            <h3 className="mt-6 text-2xl font-bold text-foreground">Спасибо за заказ!</h3>
            <p className="mt-3 text-muted-foreground">Мы скоро вам позвоним.</p>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="space-y-5" noValidate>
            <Field
              label="Количество квадратных метров"
              type="number"
              placeholder="например, 60"
              value={form.area}
              onChange={update("area")}
              error={errors.area}
            />
            <Field
              label="Ваше имя"
              placeholder="Например, Алишер"
              value={form.name}
              onChange={update("name")}
              error={errors.name}
            />
            <Field
              label="Номер телефона"
              type="tel"
              placeholder="+992 ___ __ __ __"
              value={form.phone}
              onChange={update("phone")}
              error={errors.phone}
            />
            <Field
              label="Адрес"
              placeholder="Город, улица, дом, квартира"
              value={form.address}
              onChange={update("address")}
              error={errors.address}
            />

            <button
              type="submit"
              disabled={loading}
              className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-primary px-8 py-4 text-base font-semibold text-primary-foreground shadow-elegant transition-transform hover:scale-[1.02] disabled:opacity-70"
            >
              {loading ? "Отправляем..." : "Заказать уборку"}
              <Sparkles className="h-4 w-4" />
            </button>
          </form>
        )}
      </motion.div>
    </Section>
  );
}

function Field({
  label,
  error,
  ...rest
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string; error?: string }) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-foreground">{label}</span>
      <input
        {...rest}
        className={`mt-2 w-full rounded-2xl border bg-background px-4 py-3 text-base text-foreground outline-none transition focus:ring-4 placeholder:text-muted-foreground/60 ${
          error
            ? "border-destructive focus:ring-destructive/20"
            : "border-border focus:border-accent focus:ring-accent/20"
        }`}
      />
      {error && <span className="mt-1.5 block text-xs text-destructive">{error}</span>}
    </label>
  );
}

/* ---------- Info / Curtains / Furniture ---------- */

function ImportantInfo() {
  return (
    <Section className="bg-background pt-0">
      <div className="rounded-3xl border border-accent/30 bg-secondary p-6 sm:p-8">
        <div className="flex items-start gap-4">
          <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-accent text-accent-foreground">
            <Sparkles className="h-5 w-5" />
          </div>
          <div className="min-w-0">
            <h3 className="text-base font-bold text-foreground">Важная информация</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Стирка штор и мытье посуды не входят в стоимость уборки по квадратным метрам и оплачиваются отдельно.
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}

function CurtainCard({
  title,
  price,
  features,
  highlight,
}: {
  title: string;
  price: string;
  features: string[];
  highlight?: boolean;
}) {
  return (
    <div
      className={`relative flex flex-col rounded-3xl p-8 shadow-soft transition-all hover:-translate-y-1 hover:shadow-elegant ${
        highlight
          ? "border border-transparent bg-gradient-primary text-primary-foreground"
          : "border border-border bg-card text-foreground"
      }`}
    >
      {highlight && (
        <span className="absolute right-6 top-6 rounded-full bg-accent px-3 py-1 text-xs font-bold text-accent-foreground">
          Популярно
        </span>
      )}
      <h3 className={`text-xl font-bold ${highlight ? "" : "text-foreground"}`}>{title}</h3>
      <p className="mt-4 text-4xl font-extrabold">
        {price.split("/")[0]}
        <span className={`ml-1 text-base font-semibold ${highlight ? "opacity-80" : "text-muted-foreground"}`}>
          /{price.split("/")[1]}
        </span>
      </p>
      <ul className="mt-6 space-y-3">
        {features.map((f) => (
          <li key={f} className="flex items-center gap-3 text-sm">
            <Check className={`h-4 w-4 ${highlight ? "text-accent" : "text-accent"}`} />
            <span className={highlight ? "" : "text-muted-foreground"}>{f}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Curtains() {
  return (
    <Section className="bg-gradient-hero">
      <div className="text-center">
        <SectionEyebrow>Стирка штор</SectionEyebrow>
        <SectionTitle>Профессиональная стирка штор</SectionTitle>
      </div>
      <div className="mt-12 grid gap-6 md:grid-cols-2">
        <CurtainCard
          title="Полный сервис"
          price="45 сомони/кг"
          features={["Стирка", "Сушка", "Глажка", "Ароматизация", "Установка после стирки"]}
          highlight
        />
        <CurtainCard
          title="Без установки"
          price="35 сомони/кг"
          features={["Стирка", "Сушка", "Глажка", "Ароматизация"]}
        />
      </div>
    </Section>
  );
}

function Furniture() {
  return (
    <Section className="bg-background">
      <div className="text-center">
        <SectionEyebrow>Химчистка мебели</SectionEyebrow>
        <SectionTitle>Чистка мягкой мебели</SectionTitle>
      </div>
      <div className="mt-12 grid gap-6 md:grid-cols-2">
        <div className="rounded-3xl border border-border bg-card p-8 shadow-soft transition-all hover:-translate-y-1 hover:shadow-elegant">
          <p className="text-xs font-semibold uppercase tracking-widest text-accent">Кресло</p>
          <p className="mt-3 text-4xl font-extrabold text-foreground">60 <span className="text-base font-semibold text-muted-foreground">сомони</span></p>
          <p className="mt-3 text-sm text-muted-foreground">
            Глубокая химчистка кресла с удалением пятен и запахов.
          </p>
        </div>
        <div className="rounded-3xl border border-border bg-card p-8 shadow-soft transition-all hover:-translate-y-1 hover:shadow-elegant">
          <p className="text-xs font-semibold uppercase tracking-widest text-accent">Трехместный диван</p>
          <p className="mt-3 text-4xl font-extrabold text-foreground">300 <span className="text-base font-semibold text-muted-foreground">сомони</span></p>
          <p className="mt-3 text-sm text-muted-foreground">
            Полная химчистка дивана с восстановлением свежести ткани.
          </p>
        </div>
      </div>
    </Section>
  );
}

/* ---------- Why Us ---------- */

const features = [
  { icon: HeartHandshake, title: "Опытная команда", desc: "Квалифицированные специалисты с многолетним опытом." },
  { icon: Wrench, title: "Профессиональное оборудование", desc: "Используем современную технику для лучших результатов." },
  { icon: FlaskConical, title: "Качественная химия", desc: "Безопасные сертифицированные средства." },
  { icon: Sparkles, title: "Бережная уборка", desc: "Аккуратное отношение к вашему имуществу." },
  { icon: BadgeDollarSign, title: "Честные цены", desc: "Прозрачные расценки без скрытых платежей." },
  { icon: Clock, title: "Быстрое выполнение работ", desc: "Работаем точно в согласованные сроки." },
];

function WhyUs() {
  return (
    <Section className="bg-gradient-hero">
      <div className="text-center">
        <SectionEyebrow>Почему мы</SectionEyebrow>
        <SectionTitle>Почему выбирают Durakhsh Dushanbe</SectionTitle>
      </div>
      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            transition={{ delay: i * 0.06 }}
            className="rounded-3xl border border-border bg-card p-7 shadow-soft transition-all hover:-translate-y-1 hover:shadow-elegant"
          >
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-primary text-primary-foreground shadow-soft">
              <f.icon className="h-6 w-6" />
            </div>
            <h3 className="mt-5 text-lg font-bold text-foreground">{f.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

/* ---------- Gallery ---------- */

const galleryImages = [
  { src: gallery1, alt: "До и после уборки гостиной" },
  { src: gallery2, alt: "До и после уборки кухни" },
  { src: gallery3, alt: "До и после уборки санузла" },
];

function Gallery() {
  return (
    <Section className="bg-background">
      <div className="text-center">
        <SectionEyebrow>Галерея</SectionEyebrow>
        <SectionTitle>До и после</SectionTitle>
        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
          Реальные результаты нашей работы в квартирах и домах в Душанбе.
        </p>
      </div>
      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {galleryImages.map((g, i) => (
          <motion.div
            key={i}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
            transition={{ delay: i * 0.08 }}
            className="group overflow-hidden rounded-3xl border border-border shadow-soft transition-all hover:shadow-elegant"
          >
            <img
              src={g.src}
              alt={g.alt}
              loading="lazy"
              width={1024}
              height={1024}
              className="h-64 w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

/* ---------- Reviews ---------- */

const reviews = [
  { name: "Малика Р.", text: "Заказывала генеральную уборку трехкомнатной квартиры. Команда приехала вовремя, всё блестит. Очень довольна!", rating: 5 },
  { name: "Фаррух С.", text: "После ремонта квартира была в ужасном состоянии. Ребята из Durakhsh справились идеально. Рекомендую.", rating: 5 },
  { name: "Зарина Н.", text: "Очень аккуратные специалисты, использовали свою химию, ничего не пришлось покупать. Цена честная.", rating: 5 },
  { name: "Алишер К.", text: "Заказывал чистку диванов и кресел — результат превзошел ожидания, выглядят как новые.", rating: 5 },
  { name: "Нигина М.", text: "Делали уборку в офисе перед открытием. Быстро, чисто, профессионально. Будем работать дальше.", rating: 5 },
  { name: "Рустам Т.", text: "Стирка штор — отличный сервис, забрали, постирали, повесили обратно. Удобно и недорого.", rating: 5 },
];

function Reviews() {
  return (
    <Section id="reviews" className="bg-gradient-hero">
      <div className="text-center">
        <SectionEyebrow>Отзывы</SectionEyebrow>
        <SectionTitle>Что говорят наши клиенты</SectionTitle>
      </div>
      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {reviews.map((r, i) => (
          <motion.div
            key={r.name}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            transition={{ delay: i * 0.05 }}
            className="flex flex-col rounded-3xl border border-border bg-card p-7 shadow-soft"
          >
            <div className="flex items-center gap-1">
              {Array.from({ length: r.rating }).map((_, j) => (
                <Star key={j} className="h-4 w-4 fill-accent text-accent" />
              ))}
            </div>
            <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">"{r.text}"</p>
            <div className="mt-6 flex items-center gap-3 border-t border-border pt-4">
              <div className="grid h-10 w-10 place-items-center rounded-full bg-gradient-primary text-sm font-bold text-primary-foreground">
                {r.name.charAt(0)}
              </div>
              <p className="text-sm font-semibold text-foreground">{r.name}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

/* ---------- Contact ---------- */

const contacts = [
  {
    icon: MapPin,
    label: "Адрес",
    lines: ["г. Душанбе", "Сино, Испечак-2"],
    href: undefined as string | undefined,
  },
  { icon: Instagram, label: "Instagram", lines: ["@durakhshi_dushanbe"], href: "https://instagram.com/durakhshi_dushanbe" },
  { icon: Send, label: "Telegram", lines: ["+992 556 668 797"], href: "https://t.me/+992556668797" },
  { icon: MessageCircle, label: "WhatsApp", lines: ["+992 710 287 979"], href: "https://wa.me/992710287979" },
  { icon: Phone, label: "Телефон", lines: ["+992 710 287 979"], href: "tel:+992710287979" },
];

function Contact() {
  return (
    <Section id="contact" className="bg-background">
      <div className="text-center">
        <SectionEyebrow>Контакты</SectionEyebrow>
        <SectionTitle>Свяжитесь с нами</SectionTitle>
      </div>
      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
        {contacts.map((c) => {
          const Inner = (
            <>
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-secondary text-primary">
                <c.icon className="h-6 w-6" />
              </div>
              <p className="mt-4 text-xs font-semibold uppercase tracking-widest text-muted-foreground">{c.label}</p>
              <div className="mt-1 space-y-0.5">
                {c.lines.map((l) => (
                  <p key={l} className="text-sm font-semibold text-foreground">{l}</p>
                ))}
              </div>
            </>
          );
          const base =
            "block rounded-3xl border border-border bg-card p-6 shadow-soft transition-all hover:-translate-y-1 hover:shadow-elegant";
          return c.href ? (
            <a key={c.label} href={c.href} target="_blank" rel="noopener noreferrer" className={base}>
              {Inner}
            </a>
          ) : (
            <div key={c.label} className={base}>
              {Inner}
            </div>
          );
        })}
      </div>
    </Section>
  );
}

/* ---------- Footer ---------- */

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-border bg-secondary">
      <div className="mx-auto grid w-full max-w-6xl gap-8 px-5 py-12 sm:px-8 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-2">
            <div className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-primary text-primary-foreground shadow-soft">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-foreground">Durakhsh Dushanbe</p>
              <p className="text-[11px] text-muted-foreground">Профессиональный клининг</p>
            </div>
          </div>
          <p className="mt-4 max-w-xs text-sm text-muted-foreground">
            Чистота, которой можно доверять. Уборка квартир, домов и офисов в Душанбе.
          </p>
        </div>
        <div>
          <p className="text-sm font-bold text-foreground">Навигация</p>
          <ul className="mt-4 space-y-2">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="text-sm text-muted-foreground hover:text-primary">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-sm font-bold text-foreground">Документы</p>
          <ul className="mt-4 space-y-2">
            <li><a href="#" className="text-sm text-muted-foreground hover:text-primary">Политика конфиденциальности</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-2 px-5 py-5 text-xs text-muted-foreground sm:flex-row sm:px-8">
          <p>© {year} Durakhsh Dushanbe. Все права защищены.</p>
          <p>Сделано с заботой о вашем доме.</p>
        </div>
      </div>
    </footer>
  );
}

/* ---------- Page ---------- */

function LandingPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <Hero />
      <Services />
      <PricingAndCalculator />
      <OrderForm />
      <ImportantInfo />
      <Curtains />
      <Furniture />
      <WhyUs />
      <Gallery />
      <Reviews />
      <Contact />
      <Footer />
    </main>
  );
}
