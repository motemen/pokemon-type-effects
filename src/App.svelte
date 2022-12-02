<script lang="ts">
  let defenderTypes: [number, number | null] = [0, null];

  let openDialog = false;
  let dialogFocusIndex = 0;

  import Dialog from "@smui/dialog";

  const TYPES = [
    "normal",
    "fire",
    "water",
    "electric",
    "grass",
    "ice",
    "psychic",
    "fighting",
    "poison",
    "ground",
    "flying",
    "bug",
    "rock",
    "ghost",
    "dragon",
    "dark",
    "steel",
    "fairy",
  ] as const;

  type TypeName = typeof TYPES[number];

  const TYPE_NAME_AS_JA: Record<TypeName, string> = {
    normal: "ノーマル",
    fire: "ほのお",
    water: "みず",
    electric: "でんき",
    grass: "くさ",
    ice: "こおり",
    psychic: "エスパー",
    fighting: "かくとう",
    poison: "どく",
    ground: "じめん",
    flying: "ひこう",
    bug: "むし",
    rock: "いわ",
    ghost: "ゴースト",
    dragon: "ドラゴン",
    dark: "あく",
    steel: "はがね",
    fairy: "フェアリー",
  };

  // [attacker move type][defender type] = effect ratio
  // prettier-ignore
  const TYPE_EFFECTS_MAXTRIX = [
    [  1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1, 0.5,   0,   1,   1, 0.5,   1],
    [  1, 0.5, 0.5,   1,   2,   2,   1,   1,   1,   1,   1,   2, 0.5,   1, 0.5,   1,   2,   1],
    [  1,   2, 0.5,   1, 0.5,   1,   1,   1,   1,   2,   1,   1,   2,   1, 0.5,   1,   1,   1],
    [  1,   1,   2, 0.5, 0.5,   1,   1,   1,   1,   0,   2,   1,   1,   1, 0.5,   1,   1,   1],
    [  1, 0.5,   2,   1, 0.5,   1,   1,   1, 0.5,   2, 0.5, 0.5,   2,   1, 0.5,   1, 0.5,   1],
    [  1, 0.5, 0.5,   1,   2, 0.5,   1,   1,   1,   2,   2,   1,   1,   1,   2,   1, 0.5,   1],
    [  1,   1,   1,   1,   1,   1, 0.5,   2,   2,   1,   1,   1,   1,   1,   1,   0, 0.5,   1],
    [  2,   1,   1,   1,   1,   2, 0.5,   1, 0.5,   1, 0.5, 0.5,   2,   0,   1,   2,   2, 0.5],
    [  1,   1,   1,   1,   2,   1,   1,   1, 0.5, 0.5,   1,   1, 0.5, 0.5,   1,   1,   0,   2],
    [  1,   2,   1,   2, 0.5,   1,   1,   1,   2,   1,   0, 0.5,   2,   1,   1,   1,   2,   1],
    [  1,   1,   1, 0.5,   2,   1,   1,   2,   1,   1,   1,   2, 0.5,   1,   1,   1, 0.5,   1],
    [  1, 0.5,   1,   1,   2,   1,   2, 0.5, 0.5,   1, 0.5,   1,   1, 0.5,   1,   2, 0.5, 0.5],
    [  1,   2,   1,   1,   1,   2,   1, 0.5,   1, 0.5,   2,   2,   1,   1,   1,   1, 0.5,   1],
    [  0,   1,   1,   1,   1,   1,   2,   1,   1,   1,   1,   1,   1,   2,   1, 0.5,   1,   1],
    [  1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1,   2,   1, 0.5,   0],
    [  1,   1,   1,   1,   1,   1,   2, 0.5,   1,   1,   1,   1,   1,   2,   1, 0.5,   1, 0.5],
    [  1, 0.5, 0.5, 0.5,   1,   2,   1,   1,   1,   1,   1,   1,   2,   1,   1,   1, 0.5,   2],
    [  1, 0.5,   1,   1,   1,   1,   1,   2, 0.5,   1,   1,   1,   1,   1,   2,   2, 0.5,   1]
  ];

  let effectRatios: { type: TypeName; ratio: number }[] = [];
  $: {
    effectRatios = TYPES.map((type, i) => {
      let ratio = 1.0;
      ratio *= TYPE_EFFECTS_MAXTRIX[i][defenderTypes[0]];
      if (defenderTypes[1] !== null && defenderTypes[1] !== defenderTypes[0]) {
        ratio *= TYPE_EFFECTS_MAXTRIX[i][defenderTypes[1]];
      }
      return { type, ratio };
    });
  }
</script>

<main class="p-4 flex justify-center">
  <div class="w-full max-w-md">
    <section class="w-full">
      <h1 class="text-xl py-2 mb-3">相手ポケモンのタイプ</h1>
      <div class="flex gap-4 justify-between">
        {#each defenderTypes as type, i}
          <button
            on:click={() => {
              openDialog = true;
              dialogFocusIndex = i;
            }}
            class="ring-1 ring-offset-1 ring-gray-200 flex-1 text-center transition duration-300 bg-type-{TYPES[
              type
            ]}-300 rounded text-lg px-4 py-2"
            >{TYPE_NAME_AS_JA[TYPES[type]] || "-"}</button
          >
        {/each}
      </div>
    </section>
    <Dialog bind:open={openDialog}>
      <div class="grid grid-cols-2 gap-3 p-6">
        {#each TYPES as type, i}
          <button
            class="text-center bg-type-{type}-300 px-4 py-2 rounded w-32"
            on:click={() => {
              openDialog = false;
              defenderTypes[dialogFocusIndex] = i;
              if (dialogFocusIndex == 0) {
                defenderTypes[1] = null;
              }
            }}
          >
            {TYPE_NAME_AS_JA[type]}
          </button>
        {/each}
      </div>
    </Dialog>

    <section class="w-full mt-4">
      <h1 class="text-xl py-2 mb-3">わざのタイプ別効果倍率</h1>
      {#each effectRatios as ratio}
        {#if ratio.ratio !== 1.0}
          <div class="bg-type-{ratio.type}-300 p-3 flex">
            <span class="grow">{TYPE_NAME_AS_JA[ratio.type]}</span>
            <span class="w-8">× {ratio.ratio === 0.5 ? "½" : ratio.ratio}</span>
          </div>
        {/if}
      {/each}
    </section>
  </div>
</main>

<style lang="postcss">
</style>
