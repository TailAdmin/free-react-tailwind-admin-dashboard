import type en from "@/messages/en.json"; // type-only, zero bundle cost

export type Messages = typeof en;

/** Every dot-path in Messages that points to an object (= a valid namespace). */
type NamespacePaths<T, P extends string = ""> = {
  [K in keyof T & string]: T[K] extends Record<string, unknown>
    ? `${P}${K}` | NamespacePaths<T[K], `${P}${K}.`>
    : never;
}[keyof T & string];

export type Namespace = NamespacePaths<Messages>;
export type TranslationValues = Record<string, string | number | Date>;
export type Translator = (key: string, values?: TranslationValues) => string;
