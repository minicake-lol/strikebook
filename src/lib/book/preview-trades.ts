import { nbisWatchSeed } from "@/lib/book/pipeline";
import type { Trade } from "@/lib/book/types";

/** Preview blotter until desk_book hydration lands. */
export const PREVIEW_TRADES: Trade[] = [nbisWatchSeed(1)];
