import { PokemonBuild, BattleCondition, Stats } from '@/core/types';

export const DEFAULT_IVS: Stats = { hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31 };
export const DEFAULT_EVS: Stats = { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 };

export function createDefaultBuild(pokemonId: string = 'garchomp'): PokemonBuild {
  return {
    pokemonId,
    level: 50,
    nature: 'ganbare',
    ivs: { ...DEFAULT_IVS },
    evs: { ...DEFAULT_EVS },
    abilityId: 'none',
    itemId: 'none',
    teraType: null,
    moves: [],
  };
}

export function createDefaultCondition(): BattleCondition {
  return {
    weather: 'none',
    terrain: 'none',
    isReflect: false,
    isLightScreen: false,
    isHelpingHand: false,
    isCritical: false,
    isBurned: false,
    isDoubleBattle: false,
    attackerRank: 0,
    defenderRank: 0,
    isTerastallized: false,
  };
}
