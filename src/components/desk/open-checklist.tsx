import { Link } from "@tanstack/react-router";
import { creditSideCode, logAnchorId, pairedPipeline, pipelineTrades, strikePair } from "@/lib/book/pipeline";
import { formatDate } from "@/lib/book/format";
import { useT } from "@/lib/i18n";
import type { Trade } from "@/lib/book/types";
import { Badge } from "@/components/ui/badge";
