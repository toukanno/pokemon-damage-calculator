import { DamageCalcRequest } from '@/core/types';
import LZString from 'lz-string';

/** 計算条件をURL用にエンコード */
export function encodeCalcRequest(request: DamageCalcRequest): string {
  const json = JSON.stringify(request);
  return LZString.compressToEncodedURIComponent(json);
}

/** URLから計算条件をデコード */
export function decodeCalcRequest(encoded: string): DamageCalcRequest | null {
  try {
    const json = LZString.decompressFromEncodedURIComponent(encoded);
    if (!json) return null;
    return JSON.parse(json) as DamageCalcRequest;
  } catch {
    return null;
  }
}

/** 共有URLを生成 */
export function generateShareUrl(request: DamageCalcRequest): string {
  const encoded = encodeCalcRequest(request);
  const base = typeof window !== 'undefined' ? window.location.origin + window.location.pathname : '';
  return `${base}?calc=${encoded}`;
}
