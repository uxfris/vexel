import { Decimal } from "@prisma/client/runtime/library";
import { Plugin } from "../prisma/client";

// Helper function to serialize Decimal fields to numbers
export function serializePlugin(plugin: Plugin) {
  return {
    ...plugin,
    price:
      plugin.price instanceof Decimal
        ? Number(plugin.price)
        : (plugin.price ?? null),
    discountPrice:
      plugin.discountPrice instanceof Decimal
        ? Number(plugin.discountPrice)
        : (plugin.discountPrice ?? null),
  };
}
