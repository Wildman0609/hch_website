import { trustBlocks } from "@/data/site";

export function TrustBlocks() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {trustBlocks.map((block) => {
        const Icon = block.icon;
        return (
          <div
            key={block.title}
            className="rounded-[1.2rem] border border-holly-ink/10 bg-white p-6 shadow-soft"
          >
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-holly-sky text-holly-leaf">
              <Icon aria-hidden size={23} />
            </div>
            <h3 className="text-lg font-semibold text-holly-ink">{block.title}</h3>
            <p className="mt-3 text-sm leading-7 text-holly-ink/70">{block.text}</p>
          </div>
        );
      })}
    </div>
  );
}
