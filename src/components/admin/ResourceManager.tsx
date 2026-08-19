/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Pencil, Plus, Trash2, Upload } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { SmartImage } from "@/components/site/SmartImage";

export type Field = {
  key: string;
  label: string;
  type: "text" | "textarea" | "number" | "boolean" | "image" | "list" | "select";
  options?: { value: string; label: string }[];
  bucket?: string;
};

type Props = {
  table: string;
  title: string;
  fields: Field[];
  titleKey?: string;
  orderBy?: { column: string; ascending?: boolean };
  readOnly?: boolean;
};

const input =
  "w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/20";

export function ResourceManager({ table, title, fields, titleKey = "name", orderBy, readOnly }: Props) {
  const db = supabase as any;
  const [rows, setRows] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<any | null>(null);

  async function load() {
    setLoading(true);
    let q = db.from(table).select("*");
    if (orderBy) q = q.order(orderBy.column, { ascending: orderBy.ascending ?? true });
    const { data, error } = await q;
    setLoading(false);
    if (error) {
      toast.error(`تعذّر تحميل ${title}: ${error.message}`);
      return;
    }
    setRows(data ?? []);
  }

  useEffect(() => {
    void load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [table]);

  async function save(values: any) {
    const payload = { ...values };
    delete payload.created_at;
    delete payload.updated_at;
    const res = payload.id
      ? await db.from(table).update(payload).eq("id", payload.id)
      : await db.from(table).insert(payload);
    if (res.error) {
      toast.error(res.error.message);
      return;
    }
    toast.success("تم الحفظ");
    setEditing(null);
    void load();
  }

  async function remove(id: string) {
    if (!confirm("هل تريد حذف هذا العنصر؟")) return;
    const { error } = await db.from(table).delete().eq("id", id);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("تم الحذف");
    void load();
  }

  return (
    <div>
      <div className="mb-5 flex items-center justify-between gap-4">
        <h2 className="text-lg font-extrabold">{title}</h2>
        {!readOnly && (
          <button
            onClick={() => setEditing({})}
            className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-bold text-primary-foreground"
          >
            <Plus className="size-4" aria-hidden /> إضافة
          </button>
        )}
      </div>

      {loading ? (
        <p className="text-sm text-muted-foreground">جارٍ التحميل...</p>
      ) : rows.length === 0 ? (
        <p className="text-sm text-muted-foreground">لا توجد بيانات بعد.</p>
      ) : (
        <div className="grid gap-3">
          {rows.map((r) => (
            <div key={r.id} className="card-soft flex flex-wrap items-center justify-between gap-3 p-4">
              <div className="min-w-0">
                <p className="truncate text-sm font-bold">{r[titleKey] ?? r.title ?? r.question ?? r.id}</p>
                <p className="mt-0.5 truncate text-xs text-muted-foreground">
                  {r.slug ?? r.phone ?? r.excerpt ?? r.answer ?? ""}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setEditing(r)}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs font-bold"
                >
                  <Pencil className="size-3.5" aria-hidden /> تعديل
                </button>
                {!readOnly && (
                  <button
                    onClick={() => remove(r.id)}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-destructive/40 px-3 py-1.5 text-xs font-bold text-destructive"
                  >
                    <Trash2 className="size-3.5" aria-hidden /> حذف
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {editing && (
        <RowEditor fields={fields} value={editing} onCancel={() => setEditing(null)} onSave={save} />
      )}
    </div>
  );
}

function RowEditor({
  fields,
  value,
  onSave,
  onCancel,
}: {
  fields: Field[];
  value: any;
  onSave: (v: any) => void;
  onCancel: () => void;
}) {
  const [form, setForm] = useState<any>(value);
  const [uploading, setUploading] = useState(false);

  function set(k: string, v: any) {
    setForm((f: any) => ({ ...f, [k]: v }));
  }

  async function upload(field: Field, file: File) {
    setUploading(true);
    const bucket = field.bucket ?? "uploads";
    const path = `${Date.now()}-${file.name.replace(/[^\w.-]/g, "_")}`;
    const { error } = await supabase.storage.from(bucket).upload(path, file, { upsert: true });
    setUploading(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    set(field.key, `${bucket}/${path}`);
    toast.success("تم رفع الصورة");
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/50 p-4">
      <div className="my-8 w-full max-w-2xl rounded-2xl bg-card p-6 shadow-lift">
        <h3 className="text-lg font-extrabold">{form.id ? "تعديل عنصر" : "إضافة عنصر"}</h3>
        <div className="mt-5 grid gap-4">
          {fields.map((f) => (
            <div key={f.key}>
              <label className="mb-1.5 block text-sm font-bold" htmlFor={f.key}>{f.label}</label>
              {f.type === "textarea" ? (
                <textarea id={f.key} rows={4} className={input} value={form[f.key] ?? ""} onChange={(e) => set(f.key, e.target.value)} />
              ) : f.type === "boolean" ? (
                <input id={f.key} type="checkbox" className="size-5" checked={!!form[f.key]} onChange={(e) => set(f.key, e.target.checked)} />
              ) : f.type === "number" ? (
                <input id={f.key} type="number" className={input} value={form[f.key] ?? 0} onChange={(e) => set(f.key, Number(e.target.value))} />
              ) : f.type === "select" ? (
                <select id={f.key} className={input} value={form[f.key] ?? ""} onChange={(e) => set(f.key, e.target.value || null)}>
                  <option value="">—</option>
                  {f.options?.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
              ) : f.type === "list" ? (
                <textarea
                  id={f.key}
                  rows={3}
                  className={input}
                  placeholder="كل عنصر في سطر"
                  value={Array.isArray(form[f.key]) ? form[f.key].join("\n") : (form[f.key] ?? "")}
                  onChange={(e) => set(f.key, e.target.value.split("\n").map((s) => s.trim()).filter(Boolean))}
                />
              ) : f.type === "image" ? (
                <div className="flex items-center gap-3">
                  <SmartImage src={form[f.key]} alt="معاينة" className="size-16 rounded-lg object-cover" />
                  <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-border px-3 py-2 text-xs font-bold">
                    <Upload className="size-4" aria-hidden />
                    {uploading ? "جارٍ الرفع..." : "رفع صورة"}
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) void upload(f, file);
                      }}
                    />
                  </label>
                  {form[f.key] && (
                    <button type="button" onClick={() => set(f.key, null)} className="text-xs text-destructive">إزالة</button>
                  )}
                </div>
              ) : (
                <input id={f.key} className={input} value={form[f.key] ?? ""} onChange={(e) => set(f.key, e.target.value)} />
              )}
            </div>
          ))}
        </div>
        <div className="mt-6 flex gap-3">
          <button onClick={() => onSave(form)} className="rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground">
            حفظ
          </button>
          <button onClick={onCancel} className="rounded-full border border-border px-5 py-2.5 text-sm font-bold">
            إلغاء
          </button>
        </div>
      </div>
    </div>
  );
}
