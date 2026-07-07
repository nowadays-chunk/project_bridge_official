"use client";

import { useMemo, useState } from "react";
import { PageShell } from "@/components/page-shell";

const NOTE_NAMES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"] as const;

type NoteName = (typeof NOTE_NAMES)[number];
type EntityKind = "chord" | "scale" | "arpeggio";
type InstrumentKind = "piano" | "guitar" | "bass" | "ukulele" | "violin";

type MusicEntity = {
  id: string;
  kind: EntityKind;
  root: NoteName;
  name: string;
  abbreviation: string;
  intervals: number[];
};

type Suggestion = MusicEntity & {
  notes: NoteName[];
  score: number;
  matched: number;
  missing: number;
  extra: number;
  isExact: boolean;
};

type StringedInstrument = {
  kind: Exclude<InstrumentKind, "piano">;
  label: string;
  tuning: NoteName[];
  fretCount: number;
};

const KIND_LABEL: Record<EntityKind, string> = {
  chord: "Chord",
  scale: "Scale",
  arpeggio: "Arpeggio",
};

const KIND_PREFIX: Record<EntityKind, string> = {
  chord: "CH",
  scale: "SC",
  arpeggio: "ARP",
};

const INSTRUMENTS: { kind: InstrumentKind; label: string; description: string }[] = [
  { kind: "piano", label: "Piano", description: "Two octaves of playable keys." },
  { kind: "guitar", label: "Guitar", description: "Standard E A D G B E tuning." },
  { kind: "bass", label: "Bass", description: "Four-string standard E A D G tuning." },
  { kind: "ukulele", label: "Ukulele", description: "Re-entrant G C E A tuning." },
  { kind: "violin", label: "Violin", description: "Fifth tuning G D A E." },
];

const STRINGED: Record<Exclude<InstrumentKind, "piano">, StringedInstrument> = {
  guitar: {
    kind: "guitar",
    label: "Guitar",
    tuning: ["E", "B", "G", "D", "A", "E"],
    fretCount: 12,
  },
  bass: {
    kind: "bass",
    label: "Bass",
    tuning: ["G", "D", "A", "E"],
    fretCount: 12,
  },
  ukulele: {
    kind: "ukulele",
    label: "Ukulele",
    tuning: ["A", "E", "C", "G"],
    fretCount: 12,
  },
  violin: {
    kind: "violin",
    label: "Violin",
    tuning: ["E", "A", "D", "G"],
    fretCount: 12,
  },
};

const FORMULAS: Omit<MusicEntity, "id" | "root">[] = [
  { kind: "chord", name: "major chord", abbreviation: "maj", intervals: [0, 4, 7] },
  { kind: "chord", name: "minor chord", abbreviation: "min", intervals: [0, 3, 7] },
  { kind: "chord", name: "diminished chord", abbreviation: "dim", intervals: [0, 3, 6] },
  { kind: "chord", name: "augmented chord", abbreviation: "aug", intervals: [0, 4, 8] },
  { kind: "chord", name: "suspended second chord", abbreviation: "sus2", intervals: [0, 2, 7] },
  { kind: "chord", name: "suspended fourth chord", abbreviation: "sus4", intervals: [0, 5, 7] },
  { kind: "chord", name: "dominant seventh chord", abbreviation: "7", intervals: [0, 4, 7, 10] },
  { kind: "chord", name: "major seventh chord", abbreviation: "maj7", intervals: [0, 4, 7, 11] },
  { kind: "chord", name: "minor seventh chord", abbreviation: "min7", intervals: [0, 3, 7, 10] },
  { kind: "chord", name: "minor major seventh chord", abbreviation: "mMaj7", intervals: [0, 3, 7, 11] },
  { kind: "chord", name: "half-diminished seventh chord", abbreviation: "m7b5", intervals: [0, 3, 6, 10] },
  { kind: "chord", name: "diminished seventh chord", abbreviation: "dim7", intervals: [0, 3, 6, 9] },
  { kind: "chord", name: "sixth chord", abbreviation: "6", intervals: [0, 4, 7, 9] },
  { kind: "chord", name: "minor sixth chord", abbreviation: "m6", intervals: [0, 3, 7, 9] },
  { kind: "scale", name: "major scale", abbreviation: "Ion", intervals: [0, 2, 4, 5, 7, 9, 11] },
  { kind: "scale", name: "natural minor scale", abbreviation: "Aeol", intervals: [0, 2, 3, 5, 7, 8, 10] },
  { kind: "scale", name: "harmonic minor scale", abbreviation: "Hmin", intervals: [0, 2, 3, 5, 7, 8, 11] },
  { kind: "scale", name: "melodic minor scale", abbreviation: "Mmin", intervals: [0, 2, 3, 5, 7, 9, 11] },
  { kind: "scale", name: "Dorian mode", abbreviation: "Dor", intervals: [0, 2, 3, 5, 7, 9, 10] },
  { kind: "scale", name: "Phrygian mode", abbreviation: "Phr", intervals: [0, 1, 3, 5, 7, 8, 10] },
  { kind: "scale", name: "Lydian mode", abbreviation: "Lyd", intervals: [0, 2, 4, 6, 7, 9, 11] },
  { kind: "scale", name: "Mixolydian mode", abbreviation: "Mix", intervals: [0, 2, 4, 5, 7, 9, 10] },
  { kind: "scale", name: "Locrian mode", abbreviation: "Loc", intervals: [0, 1, 3, 5, 6, 8, 10] },
  { kind: "scale", name: "major pentatonic scale", abbreviation: "MajP", intervals: [0, 2, 4, 7, 9] },
  { kind: "scale", name: "minor pentatonic scale", abbreviation: "MinP", intervals: [0, 3, 5, 7, 10] },
  { kind: "scale", name: "blues scale", abbreviation: "Blues", intervals: [0, 3, 5, 6, 7, 10] },
  { kind: "scale", name: "chromatic scale", abbreviation: "Chr", intervals: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] },
  { kind: "arpeggio", name: "major arpeggio", abbreviation: "maj", intervals: [0, 4, 7, 12] },
  { kind: "arpeggio", name: "minor arpeggio", abbreviation: "min", intervals: [0, 3, 7, 12] },
  { kind: "arpeggio", name: "dominant seventh arpeggio", abbreviation: "7", intervals: [0, 4, 7, 10, 12] },
  { kind: "arpeggio", name: "major seventh arpeggio", abbreviation: "maj7", intervals: [0, 4, 7, 11, 12] },
  { kind: "arpeggio", name: "minor seventh arpeggio", abbreviation: "min7", intervals: [0, 3, 7, 10, 12] },
  { kind: "arpeggio", name: "diminished arpeggio", abbreviation: "dim", intervals: [0, 3, 6, 12] },
  { kind: "arpeggio", name: "augmented arpeggio", abbreviation: "aug", intervals: [0, 4, 8, 12] },
];

function noteIndex(note: NoteName) {
  return NOTE_NAMES.indexOf(note);
}

function transpose(root: NoteName, interval: number): NoteName {
  return NOTE_NAMES[(noteIndex(root) + interval) % NOTE_NAMES.length];
}

function buildEntities(): MusicEntity[] {
  return NOTE_NAMES.flatMap((root) =>
    FORMULAS.map((formula) => ({
      ...formula,
      root,
      id: `${root}-${formula.kind}-${formula.abbreviation}-${formula.name}`,
    })),
  );
}

function entityNotes(entity: MusicEntity): NoteName[] {
  return Array.from(new Set(entity.intervals.map((interval) => transpose(entity.root, interval))));
}

function fullTitle(entity: Pick<MusicEntity, "root" | "name" | "kind">) {
  return `${entity.root} ${entity.name} (${KIND_LABEL[entity.kind]})`;
}

function shortTitle(entity: Pick<MusicEntity, "root" | "abbreviation" | "kind">) {
  return `${KIND_PREFIX[entity.kind]}: ${entity.root}${entity.abbreviation}`;
}

function scoreEntity(entity: MusicEntity, selected: NoteName[]): Suggestion {
  const notes = entityNotes(entity);
  const selectedSet = new Set(selected);
  const entitySet = new Set(notes);
  const matched = selected.filter((note) => entitySet.has(note)).length;
  const missing = notes.filter((note) => !selectedSet.has(note)).length;
  const extra = selected.filter((note) => !entitySet.has(note)).length;
  const containsSelection = selected.length > 0 && extra === 0;
  const isExact = selected.length > 0 && extra === 0 && missing === 0;
  const score = matched * 12 - missing * 2 - extra * 8 + (containsSelection ? 10 : 0) + (isExact ? 20 : 0);

  return { ...entity, notes, score, matched, missing, extra, isExact };
}

function classNames(...classes: (string | false | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

function DetectorPage() {
  const [instrument, setInstrument] = useState<InstrumentKind>("piano");
  const [selectedNotes, setSelectedNotes] = useState<NoteName[]>([]);
  const [hoveredSuggestionId, setHoveredSuggestionId] = useState<string | null>(null);
  const [activeSuggestionId, setActiveSuggestionId] = useState<string | null>(null);

  const entities = useMemo(buildEntities, []);
  const suggestions = useMemo(() => {
    if (selectedNotes.length === 0) {
      return [];
    }

    const scored = entities
      .map((entity) => scoreEntity(entity, selectedNotes))
      .filter((suggestion) => suggestion.matched > 0)
      .sort((a, b) => {
        if (a.isExact !== b.isExact) return a.isExact ? -1 : 1;
        if (a.extra !== b.extra) return a.extra - b.extra;
        if (a.missing !== b.missing) return a.missing - b.missing;
        return b.score - a.score;
      });

    const exact = scored.filter((suggestion) => suggestion.extra === 0 && suggestion.missing === 0);
    const closest = scored.filter((suggestion) => !exact.some((item) => item.id === suggestion.id));

    return [...exact, ...closest].slice(0, 10);
  }, [entities, selectedNotes]);

  const previewSuggestion = useMemo(() => {
    return suggestions.find((suggestion) => suggestion.id === hoveredSuggestionId) ?? suggestions.find((suggestion) => suggestion.id === activeSuggestionId) ?? suggestions[0];
  }, [activeSuggestionId, hoveredSuggestionId, suggestions]);

  const previewNotes = previewSuggestion?.notes.filter((note) => !selectedNotes.includes(note)) ?? [];
  const currentTitle = previewSuggestion
    ? fullTitle(previewSuggestion)
    : "Select notes to detect a chord, arpeggio, or scale";

  const toggleNote = (note: NoteName) => {
    setActiveSuggestionId(null);
    setSelectedNotes((current) =>
      current.includes(note) ? current.filter((item) => item !== note) : [...current, note],
    );
  };

  const applySuggestion = (suggestion: Suggestion) => {
    setSelectedNotes(suggestion.notes);
    setActiveSuggestionId(suggestion.id);
  };

  const clearNotes = () => {
    setSelectedNotes([]);
    setActiveSuggestionId(null);
    setHoveredSuggestionId(null);
  };

  return (
    <PageShell>
      <main className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 pb-10 pt-6 sm:px-6 lg:px-8">
        <section className="surface-panel px-6 py-8 sm:px-8">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-end">
            <div className="space-y-5">
              <span className="inline-flex items-center rounded-full border border-line-strong bg-surface-subtle px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.3em] text-muted">
                Play detector
              </span>
              <div className="space-y-3">
                <h1 className="text-balance text-4xl font-semibold tracking-[-0.055em] text-foreground sm:text-5xl lg:text-6xl">
                  Detect, preview, and complete musical entities.
                </h1>
                <p className="max-w-2xl text-base leading-7 text-muted sm:text-lg">
                  Pick a visualizer, click notes into an empty instrument, then inspect the closest chord, scale, and arpeggio matches. Hover a suggestion to preview the transparent completion, or click it to fill the visualizer.
                </p>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {INSTRUMENTS.map((item) => (
                <button
                  key={item.kind}
                  type="button"
                  onClick={() => setInstrument(item.kind)}
                  className={classNames(
                    "rounded-3xl border px-4 py-4 text-left",
                    instrument === item.kind
                      ? "border-line-strong bg-foreground text-background shadow-lg"
                      : "border-line-soft bg-surface-subtle text-foreground hover:border-line-strong",
                  )}
                >
                  <span className="block text-sm font-semibold uppercase tracking-[0.22em]">
                    {item.label}
                  </span>
                  <span className={classNames("mt-2 block text-sm leading-6", instrument === item.kind ? "text-background/75" : "text-muted")}>
                    {item.description}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="surface-panel px-4 py-5 sm:px-6 sm:py-6">
          <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="min-w-0 space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-muted">
                Currently displayed
              </p>
              <h2 className="text-balance text-2xl font-semibold tracking-[-0.045em] text-foreground sm:text-3xl">
                {currentTitle}
              </h2>
            </div>

            <div className="flex flex-wrap gap-2">
              {suggestions.length > 0 ? (
                suggestions.map((suggestion) => (
                  <button
                    key={suggestion.id}
                    type="button"
                    title={`${fullTitle(suggestion)} — missing ${suggestion.missing}, extra ${suggestion.extra}`}
                    onClick={() => applySuggestion(suggestion)}
                    onMouseEnter={() => setHoveredSuggestionId(suggestion.id)}
                    onMouseLeave={() => setHoveredSuggestionId(null)}
                    className={classNames(
                      "rounded-2xl border px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em]",
                      activeSuggestionId === suggestion.id || hoveredSuggestionId === suggestion.id
                        ? "border-line-strong bg-foreground text-background"
                        : "border-line-soft bg-surface-subtle text-secondary hover:border-line-strong",
                    )}
                  >
                    {shortTitle(suggestion)}
                  </button>
                ))
              ) : (
                <span className="rounded-2xl border border-line-soft bg-surface-subtle px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-muted">
                  CH / SC / ARP suggestions appear here
                </span>
              )}
            </div>
          </div>

          <div className="rounded-[1.75rem] border border-line-soft bg-surface-subtle p-3 sm:p-5">
            {instrument === "piano" ? (
              <PianoVisualizer selectedNotes={selectedNotes} previewNotes={previewNotes} onToggleNote={toggleNote} />
            ) : (
              <StringedVisualizer instrument={STRINGED[instrument]} selectedNotes={selectedNotes} previewNotes={previewNotes} onToggleNote={toggleNote} />
            )}
          </div>
        </section>

        <section className="grid gap-4 lg:grid-cols-[minmax(0,0.72fr)_minmax(280px,0.28fr)]">
          <article className="surface-panel px-5 py-5 sm:px-6">
            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-muted">Suggestions</p>
                <h3 className="mt-1 text-2xl font-semibold tracking-[-0.045em] text-foreground">
                  Closest matches {suggestions.length > 0 ? `(${suggestions.length})` : ""}
                </h3>
              </div>
              <button
                type="button"
                onClick={clearNotes}
                className="rounded-2xl border border-line-soft bg-surface-subtle px-4 py-2 text-sm font-semibold text-secondary hover:border-line-strong"
              >
                Clear notes
              </button>
            </div>

            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
              {suggestions.length > 0 ? (
                suggestions.map((suggestion) => (
                  <button
                    key={suggestion.id}
                    type="button"
                    title={fullTitle(suggestion)}
                    onClick={() => applySuggestion(suggestion)}
                    onMouseEnter={() => setHoveredSuggestionId(suggestion.id)}
                    onMouseLeave={() => setHoveredSuggestionId(null)}
                    className={classNames(
                      "group rounded-3xl border p-4 text-left",
                      activeSuggestionId === suggestion.id || hoveredSuggestionId === suggestion.id
                        ? "border-line-strong bg-foreground text-background"
                        : "border-line-soft bg-surface-subtle text-foreground hover:border-line-strong",
                    )}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <span className="text-[11px] font-semibold uppercase tracking-[0.24em] opacity-70">
                          {KIND_PREFIX[suggestion.kind]}
                        </span>
                        <strong className="mt-1 block text-lg tracking-[-0.035em]">
                          {suggestion.root} {suggestion.abbreviation}
                        </strong>
                      </div>
                      <span className="rounded-full border border-current px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] opacity-70">
                        {suggestion.isExact ? "Exact" : "Close"}
                      </span>
                    </div>
                    <p className="mt-3 text-sm leading-6 opacity-75">{fullTitle(suggestion)}</p>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {suggestion.notes.map((note) => (
                        <span
                          key={note}
                          className={classNames(
                            "rounded-full border px-2 py-1 text-xs font-semibold",
                            selectedNotes.includes(note) ? "border-current opacity-100" : "border-current opacity-45",
                          )}
                        >
                          {note}
                        </span>
                      ))}
                    </div>
                  </button>
                ))
              ) : (
                <div className="rounded-3xl border border-line-soft bg-surface-subtle px-5 py-6 text-sm leading-7 text-muted md:col-span-2 xl:col-span-3">
                  Start by clicking notes on the selected visualizer. The detector will show up to ten exact or closest completions.
                </div>
              )}
            </div>
          </article>

          <aside className="surface-panel px-5 py-5 sm:px-6">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-muted">Inserted notes</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {selectedNotes.length > 0 ? (
                selectedNotes.map((note) => (
                  <button
                    key={note}
                    type="button"
                    onClick={() => toggleNote(note)}
                    className="rounded-full border border-line-strong bg-foreground px-3 py-2 text-sm font-semibold text-background"
                  >
                    {note}
                  </button>
                ))
              ) : (
                <p className="text-sm leading-7 text-muted">No notes inserted yet.</p>
              )}
            </div>

            {previewNotes.length > 0 && (
              <div className="mt-6 rounded-3xl border border-line-soft bg-surface-subtle p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted">Transparent completion</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {previewNotes.map((note) => (
                    <span key={note} className="rounded-full border border-line-strong px-3 py-2 text-sm font-semibold text-secondary opacity-55">
                      {note}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </section>
      </main>
    </PageShell>
  );
}

function PianoVisualizer({
  selectedNotes,
  previewNotes,
  onToggleNote,
}: {
  selectedNotes: NoteName[];
  previewNotes: NoteName[];
  onToggleNote: (note: NoteName) => void;
}) {
  const keys = Array.from({ length: 24 }, (_, index) => NOTE_NAMES[index % NOTE_NAMES.length]);

  return (
    <div className="overflow-x-auto pb-2">
      <div className="flex min-w-[820px] gap-1">
        {keys.map((note, index) => {
          const isBlack = note.includes("#");
          const selected = selectedNotes.includes(note);
          const preview = previewNotes.includes(note);

          return (
            <button
              key={`${note}-${index}`}
              type="button"
              onClick={() => onToggleNote(note)}
              className={classNames(
                "relative flex h-44 flex-1 items-end justify-center rounded-b-2xl border px-1 pb-4 text-sm font-semibold",
                isBlack ? "-mx-3 z-10 h-28 max-w-10 rounded-2xl bg-foreground text-background" : "bg-background text-foreground",
                selected && "ring-4 ring-foreground ring-offset-2 ring-offset-background",
                preview && !selected && "opacity-45 ring-4 ring-accent ring-offset-2 ring-offset-background",
                !selected && !preview && "border-line-soft hover:border-line-strong",
              )}
            >
              <span>{note}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function StringedVisualizer({
  instrument,
  selectedNotes,
  previewNotes,
  onToggleNote,
}: {
  instrument: StringedInstrument;
  selectedNotes: NoteName[];
  previewNotes: NoteName[];
  onToggleNote: (note: NoteName) => void;
}) {
  return (
    <div className="overflow-x-auto pb-2">
      <div className="min-w-[860px] space-y-2">
        <div className="grid gap-1" style={{ gridTemplateColumns: `5rem repeat(${instrument.fretCount + 1}, minmax(3rem, 1fr))` }}>
          <div />
          {Array.from({ length: instrument.fretCount + 1 }, (_, fret) => (
            <div key={fret} className="text-center text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">
              {fret === 0 ? "Open" : fret}
            </div>
          ))}
        </div>

        {instrument.tuning.map((openNote, stringIndex) => (
          <div
            key={`${instrument.kind}-${openNote}-${stringIndex}`}
            className="grid items-center gap-1"
            style={{ gridTemplateColumns: `5rem repeat(${instrument.fretCount + 1}, minmax(3rem, 1fr))` }}
          >
            <div className="rounded-2xl border border-line-soft bg-surface-subtle px-3 py-2 text-sm font-semibold text-secondary">
              {openNote}
            </div>
            {Array.from({ length: instrument.fretCount + 1 }, (_, fret) => {
              const note = transpose(openNote, fret);
              const selected = selectedNotes.includes(note);
              const preview = previewNotes.includes(note);

              return (
                <button
                  key={`${openNote}-${stringIndex}-${fret}`}
                  type="button"
                  onClick={() => onToggleNote(note)}
                  className={classNames(
                    "relative h-12 rounded-2xl border text-sm font-semibold",
                    selected
                      ? "border-line-strong bg-foreground text-background shadow-lg"
                      : preview
                        ? "border-line-strong bg-foreground/30 text-foreground opacity-55"
                        : "border-line-soft bg-background/50 text-secondary hover:border-line-strong",
                  )}
                >
                  {note}
                </button>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

export default DetectorPage;
