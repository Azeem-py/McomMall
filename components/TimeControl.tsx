import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PlusCircle, X } from 'lucide-react';

type DayKey =
  | 'Monday'
  | 'Tuesday'
  | 'Wednesday'
  | 'Thursday'
  | 'Friday'
  | 'Saturday'
  | 'Sunday';

interface Slot {
  id: string;
  startMinutes: number;
  endMinutes: number;
}

interface DayInput {
  fromHour: number;
  fromMin: number;
  fromPeriod: 'am' | 'pm';
  toHour: number;
  toMin: number;
  toPeriod: 'am' | 'pm';
}

const DAYS: DayKey[] = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

function pad(n: number): string {
  return n.toString().padStart(2, '0');
}

function timeToMinutes(
  hour: number,
  minute: number,
  period: 'am' | 'pm'
): number {
  let h = hour % 12;
  if (period === 'pm') h += 12;
  return h * 60 + minute;
}

function minutesToDisplay(m: number): string {
  const h24 = Math.floor(m / 60);
  const mm = m % 60;
  const period: 'am' | 'pm' = h24 >= 12 ? 'pm' : 'am';
  const h12 = h24 % 12 === 0 ? 12 : h24 % 12;
  return `${h12}:${pad(mm)} ${period}`;
}

function uid(): string {
  return Math.random().toString(36).slice(2, 9);
}

export function OpeningHours() {
  const initialSlots = DAYS.reduce((acc, d) => {
    acc[d] = [] as Slot[];
    return acc;
  }, {} as Record<DayKey, Slot[]>);

  const initialInputs = DAYS.reduce((acc, d) => {
    acc[d] = {
      fromHour: 9,
      fromMin: 0,
      fromPeriod: 'am',
      toHour: 5,
      toMin: 0,
      toPeriod: 'pm',
    };
    return acc;
  }, {} as Record<DayKey, DayInput>);

  const initialError = DAYS.reduce((acc, d) => {
    acc[d] = null;
    return acc;
  }, {} as Record<DayKey, string | null>);

  const [slotsMap, setSlotsMap] =
    useState<Record<DayKey, Slot[]>>(initialSlots);
  const [inputs, setInputs] = useState<Record<DayKey, DayInput>>(initialInputs);
  const [error, setError] =
    useState<Record<DayKey, string | null>>(initialError);

  function handleAddSlot(day: DayKey): void {
    setError(prev => ({ ...prev, [day]: null }));
    const inp = inputs[day];
    const start = timeToMinutes(inp.fromHour, inp.fromMin, inp.fromPeriod);
    const end = timeToMinutes(inp.toHour, inp.toMin, inp.toPeriod);

    if (end <= start) {
      setError(prev => ({
        ...prev,
        [day]: 'Closing time must be later than opening time.',
      }));
      return;
    }

    const exists = slotsMap[day].some(
      s => s.startMinutes === start && s.endMinutes === end
    );
    if (exists) {
      setError(prev => ({ ...prev, [day]: 'This slot already exists.' }));
      return;
    }

    const newSlot: Slot = { id: uid(), startMinutes: start, endMinutes: end };
    setSlotsMap(prev => ({ ...prev, [day]: [...prev[day], newSlot] }));
  }

  function handleRemoveSlot(day: DayKey, id: string): void {
    setSlotsMap(prev => ({
      ...prev,
      [day]: prev[day].filter(s => s.id !== id),
    }));
  }

  function updateInput(day: DayKey, patch: Partial<DayInput>): void {
    setInputs(prev => ({ ...prev, [day]: { ...prev[day], ...patch } }));
  }

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {DAYS.map(day => (
          <div key={day} className="space-y-3">
            <div className="bg-red-500 text-white px-4 py-3 rounded">{day}</div>

            <div className="bg-gray-100 rounded px-4 py-3 min-h-[56px] flex items-center overflow-hidden">
              {slotsMap[day].length === 0 ? (
                <span className="text-gray-500">No slots added</span>
              ) : (
                <div className="flex flex-wrap gap-2 w-full">
                  <AnimatePresence>
                    {slotsMap[day].map(s => (
                      <motion.div
                        key={s.id}
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="bg-white border rounded px-3 py-2 flex items-center gap-3 shadow-sm max-w-full"
                      >
                        <div className="text-sm font-medium">
                          {minutesToDisplay(s.startMinutes)}
                        </div>
                        <div className="text-sm text-gray-400">-</div>
                        <div className="text-sm font-medium">
                          {minutesToDisplay(s.endMinutes)}
                        </div>
                        <button
                          onClick={() => handleRemoveSlot(day, s.id)}
                          aria-label={`Remove slot ${s.id}`}
                          className="ml-2 text-gray-400 hover:text-gray-700"
                        >
                          <X size={14} />
                        </button>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>

            <div className="bg-gray-800 rounded p-3">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="flex flex-wrap items-center gap-3">
                  {/* From controls */}
                  <div className="flex items-center gap-2 bg-gray-700 px-2 py-2 rounded">
                    <select
                      value={inputs[day].fromHour}
                      onChange={e =>
                        updateInput(day, { fromHour: Number(e.target.value) })
                      }
                      className="bg-transparent text-white text-sm outline-none w-12 appearance-none"
                    >
                      {Array.from({ length: 12 }, (_, i) => i + 1).map(h => (
                        <option
                          key={h}
                          value={h}
                          style={{
                            color: '#111827',
                            backgroundColor: '#ffffff',
                          }}
                        >
                          {pad(h)}
                        </option>
                      ))}
                    </select>

                    <span className="text-white">:</span>

                    <select
                      value={inputs[day].fromMin}
                      onChange={e =>
                        updateInput(day, { fromMin: Number(e.target.value) })
                      }
                      className="bg-transparent text-white text-sm outline-none w-14 appearance-none"
                    >
                      {Array.from({ length: 12 }, (_, i) => i * 5).map(m => (
                        <option
                          key={m}
                          value={m}
                          style={{
                            color: '#111827',
                            backgroundColor: '#ffffff',
                          }}
                        >
                          {pad(m)}
                        </option>
                      ))}
                    </select>

                    <select
                      value={inputs[day].fromPeriod}
                      onChange={e =>
                        updateInput(day, {
                          fromPeriod: e.target.value as 'am' | 'pm',
                        })
                      }
                      className="bg-transparent text-white text-sm outline-none w-16 appearance-none"
                    >
                      <option
                        value="am"
                        style={{ color: '#111827', backgroundColor: '#ffffff' }}
                      >
                        am
                      </option>
                      <option
                        value="pm"
                        style={{ color: '#111827', backgroundColor: '#ffffff' }}
                      >
                        pm
                      </option>
                    </select>
                  </div>

                  <div className="text-white">-</div>

                  {/* To controls */}
                  <div className="flex items-center gap-2 bg-gray-700 px-2 py-2 rounded">
                    <select
                      value={inputs[day].toHour}
                      onChange={e =>
                        updateInput(day, { toHour: Number(e.target.value) })
                      }
                      className="bg-transparent text-white text-sm outline-none w-12 appearance-none"
                    >
                      {Array.from({ length: 12 }, (_, i) => i + 1).map(h => (
                        <option
                          key={h}
                          value={h}
                          style={{
                            color: '#111827',
                            backgroundColor: '#ffffff',
                          }}
                        >
                          {pad(h)}
                        </option>
                      ))}
                    </select>

                    <span className="text-white">:</span>

                    <select
                      value={inputs[day].toMin}
                      onChange={e =>
                        updateInput(day, { toMin: Number(e.target.value) })
                      }
                      className="bg-transparent text-white text-sm outline-none w-14 appearance-none"
                    >
                      {Array.from({ length: 12 }, (_, i) => i * 5).map(m => (
                        <option
                          key={m}
                          value={m}
                          style={{
                            color: '#111827',
                            backgroundColor: '#ffffff',
                          }}
                        >
                          {pad(m)}
                        </option>
                      ))}
                    </select>

                    <select
                      value={inputs[day].toPeriod}
                      onChange={e =>
                        updateInput(day, {
                          toPeriod: e.target.value as 'am' | 'pm',
                        })
                      }
                      className="bg-transparent text-white text-sm outline-none w-16 appearance-none"
                    >
                      <option
                        value="am"
                        style={{ color: '#111827', backgroundColor: '#ffffff' }}
                      >
                        am
                      </option>
                      <option
                        value="pm"
                        style={{ color: '#111827', backgroundColor: '#ffffff' }}
                      >
                        pm
                      </option>
                    </select>
                  </div>
                </div>

                {/* Add button placed under controls on mobile and to the right on wider screens */}
                <div className="w-full sm:w-auto flex justify-end">
                  <button
                    onClick={() => handleAddSlot(day)}
                    className="bg-white text-gray-800 px-3 py-1 rounded flex items-center gap-2"
                  >
                    <PlusCircle size={16} />
                    Add
                  </button>
                </div>
              </div>

              {error[day] && (
                <div className="mt-2 text-sm text-red-600">{error[day]}</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
