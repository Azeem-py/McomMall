// components/ui/ComparisonTable.tsx
'use client';

import { motion } from 'framer-motion';
import { Info, CheckCircle2, XCircle } from 'lucide-react';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

import type { FeatureCategory, PlanSummary } from '../types';

export interface ComparisonTableProps {
  plans: PlanSummary[]; // id + name (+ isFeatured)
  categories: FeatureCategory[];
}

export function ComparisonTable({ plans, categories }: ComparisonTableProps) {
  return (
    <section aria-labelledby="comparison-heading">
      <div className="mb-6 text-left md:text-center">
        <h2
          id="comparison-heading"
          className="text-2xl font-semibold tracking-tight text-slate-900"
        >
          Compare pricing plans
        </h2>
        <p className="mt-2 text-slate-600">
          See what’s included with PAYG and Co-Branded tiers.
        </p>
      </div>

      {/* Scroll on small screens with sticky first column */}
      <div className="overflow-x-auto rounded-2xl border bg-white">
        <Accordion type="multiple" defaultValue={categories.map(c => c.id)}>
          {categories.map((category, idx) => (
            <AccordionItem
              key={category.id}
              value={category.id}
              className="border-b"
            >
              <AccordionTrigger className="px-4 py-3 text-left hover:no-underline">
                <span className="text-base font-medium">{category.label}</span>
              </AccordionTrigger>
              <AccordionContent className="p-0">
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.25, delay: idx * 0.03 }}
                >
                  <Table className="w-[1000px] min-w-full">
                    <TableHeader>
                      <TableRow className="bg-slate-50">
                        <TableHead className="sticky left-0 z-10 w-80 bg-slate-50 text-slate-700">
                          Feature
                        </TableHead>
                        {plans.map(p => (
                          <TableHead key={p.id} className="text-slate-700">
                            <div className="flex items-center justify-center gap-2">
                              <span className="text-sm md:text-base">
                                {p.name}
                              </span>
                              {p.isFeatured && (
                                <Badge className="bg-sky-100 text-sky-700">
                                  Best value
                                </Badge>
                              )}
                            </div>
                          </TableHead>
                        ))}
                      </TableRow>
                    </TableHeader>

                    <TableBody>
                      {category.features.map(
                        (
                          row: {
                            id: string;
                            name: string;
                            tooltip?: string;
                            values: Record<
                              string,
                              boolean | string | number | undefined
                            >;
                          },
                          rIdx: number
                        ) => (
                          <TableRow
                            key={row.id}
                            className={
                              rIdx % 2 === 1 ? 'bg-slate-50/40' : undefined
                            }
                          >
                            <TableCell className="sticky left-0 z-10 w-80 bg-white pr-6 text-slate-800">
                              <div className="flex items-center gap-2">
                                <span>{row.name}</span>
                                {row.tooltip && (
                                  <TooltipProvider delayDuration={100}>
                                    <Tooltip>
                                      <TooltipTrigger
                                        aria-label={`More info about ${row.name}`}
                                        className="text-slate-500 hover:text-slate-700"
                                      >
                                        <Info className="h-4 w-4" />
                                      </TooltipTrigger>
                                      <TooltipContent className="max-w-xs">
                                        <p className="text-xs">{row.tooltip}</p>
                                      </TooltipContent>
                                    </Tooltip>
                                  </TooltipProvider>
                                )}
                              </div>
                            </TableCell>

                            {plans.map(p => (
                              <TableCell key={p.id} className="text-center">
                                <Cell value={row.values[p.id]} />
                              </TableCell>
                            ))}
                          </TableRow>
                        )
                      )}
                    </TableBody>
                  </Table>
                </motion.div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

/** Render booleans as icons, otherwise print string/number nicely. */
function Cell({ value }: { value: boolean | string | number | undefined }) {
  if (typeof value === 'boolean') {
    return value ? (
      <CheckCircle2
        aria-label="Included"
        className="mx-auto h-5 w-5 text-sky-600"
      />
    ) : (
      <XCircle
        aria-label="Not included"
        className="mx-auto h-5 w-5 text-slate-300"
      />
    );
  }
  if (value === undefined || value === null)
    return <span className="text-slate-400">—</span>;
  return <span className="text-sm text-slate-800">{String(value)}</span>;
}
