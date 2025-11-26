import { useCallback, useState } from "react";

type Validator<T> = (value: T[keyof T], values: T) => string | null;

export function useForm<T extends Record<string, any>>(initialValues: T, rules?: Partial<Record<keyof T, Validator<T>[]>>) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});

  const validateField = useCallback(
    (name: keyof T, value: T[keyof T]) => {
      const validators = rules?.[name] ?? [];
      for (const v of validators) {
        const res = v(value, values);
        if (res) return res;
      }
      return null;
    },
    [rules, values]
  );

  const setFieldValue = useCallback(
    (name: keyof T, value: T[keyof T]) => {
      setValues((prev) => ({ ...prev, [name]: value }));
      const err = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: err ?? undefined }));
    },
    [validateField]
  );

  const validateAll = useCallback(() => {
    const nextErrors: Partial<Record<keyof T, string>> = {};
    (Object.keys(values) as (keyof T)[]).forEach((k) => {
      const err = validateField(k, values[k]);
      if (err) nextErrors[k] = err;
    });
    setErrors(nextErrors);
    return nextErrors;
  }, [values, validateField]);

  const handleSubmit = useCallback(
    (fn: (vals: T) => void) => () => {
      const es = validateAll();
      if (Object.keys(es).length === 0) fn(values);
    },
    [validateAll, values]
  );

  const register = useCallback(
    (name: keyof T) => ({
      value: values[name] as string,
      onChangeText: (t: string) => setFieldValue(name, t as any),
      error: errors[name] as string | undefined,
      onBlur: () => {
        const err = validateField(name, values[name]);
        setErrors((prev) => ({ ...prev, [name]: err ?? undefined }));
      },
    }),
    [values, setFieldValue, errors, validateField]
  );

  return { values, errors, setFieldValue, register, handleSubmit, validateAll };
}

export const rules = {
  required: (msg = "Trường bắt buộc") => <T extends Record<string, any>>(value: T[keyof T]) => {
    if (value === undefined || value === null) return msg;
    if (typeof value === "string" && value.trim() === "") return msg;
    return null;
  },
  email: (msg = "Email không hợp lệ") => <T extends Record<string, any>>(value: T[keyof T]) => {
    if (typeof value !== "string") return msg;
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(value) ? null : msg;
  },
  minLength: (min: number, msg?: string) => <T extends Record<string, any>>(value: T[keyof T]) => {
    if (typeof value !== "string") return msg ?? `Tối thiểu ${min} ký tự`;
    return value.length >= min ? null : msg ?? `Tối thiểu ${min} ký tự`;
  },
};
