import { cookies } from "next/headers";
import { ZodSchema } from "zod";

export class Errors {
  static errors: Record<string, string> = {};

  static set(name: string, value: string) {
    "use server";
    this.errors[name] = value;
  }

  static flash() {
    "use server";

    try {
      cookies().set("errors", JSON.stringify(this.errors), { expires: 1 });
    } catch (error) {}
  }

  static get(name: string) {
    "use server";

    try {
      const errorsCookie = cookies().get("errors")?.value;
      if (errorsCookie) {
        const errors: Record<string, string> = JSON.parse(errorsCookie);
        return errors[name];
      }
    } catch (error) {}
  }

  static validateZod<T>(
    schema: ZodSchema<T>,
    data: unknown
  ): {
    error: boolean;
    data: T | null;
  } {
    "use server";

    const result = schema.safeParse(data);
    if (!result.success) {
      result.error.errors.forEach((err) => {
        this.set(err.path[0].toString(), err.message);
      });
      this.flash();
      return {
        error: true,
        data: null,
      };
    } else {
      return {
        error: false,
        data: result.data,
      };
    }
  }
}
