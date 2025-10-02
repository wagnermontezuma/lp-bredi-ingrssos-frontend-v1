declare module "js-cookie" {
  type SameSite = "strict" | "lax" | "none";

  interface CookieAttributes {
    path?: string;
    domain?: string;
    expires?: number | Date;
    secure?: boolean;
    sameSite?: SameSite;
    [property: string]: any;
  }

  interface CookiesConverter<T = string> {
    read?: (value: string, name: string) => T;
    write?: (value: T, name: string) => string;
  }

  interface CookiesStatic {
    get(name: string): string | undefined;
    get(): Record<string, string>;
    set(name: string, value: string | object, options?: CookieAttributes): CookiesStatic;
    remove(name: string, options?: CookieAttributes): void;
    withAttributes(attributes: CookieAttributes): CookiesStatic;
    withConverter<T = string>(converter: CookiesConverter<T>): CookiesStatic;
  }

  const Cookies: CookiesStatic;

  export type { CookieAttributes, CookiesConverter, CookiesStatic };
  export default Cookies;
}
