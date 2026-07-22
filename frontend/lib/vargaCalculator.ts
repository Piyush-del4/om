export type VargaType = 'lagna' | 'chandra' | 'hora' | 'chalit' | 'saptamsa' | 'navamsa' | 'dasamsa' | 'dwadasamsa';

export interface VargaChartData {
  chartTitle: string;
  vargaType: VargaType;
  output: any[];
}

/**
 * Calculates Divisional Chart (Varga) planetary positions and house assignments
 * from standard birth chart API output.
 */
export function calculateVargaChart(data: any, vargaType: VargaType): VargaChartData {
  if (!data || !data.output || !data.output[1]) {
    return { chartTitle: getVargaTitle(vargaType), vargaType, output: [{}, {}] };
  }

  const rawPlanets = data.output[1];
  const ascendantObj = rawPlanets["Ascendant"] || (data.output[0] && data.output[0]["0"]) || { current_sign: 1, normDegree: 0 };
  const ascSign = ascendantObj.current_sign || 1;
  const ascNormDeg = ascendantObj.normDegree ?? 0;

  const transformedPlanets: Record<string, any> = {};

  if (vargaType === 'lagna') {
    return {
      chartTitle: 'Lagna Chart (D-1)',
      vargaType,
      output: data.output
    };
  }

  if (vargaType === 'chandra') {
    const moonObj = rawPlanets["Moon"] || { current_sign: 1 };
    const moonSign = moonObj.current_sign || 1;

    Object.entries(rawPlanets).forEach(([pName, pData]: [string, any]) => {
      if (pName === 'ayanamsa' || pName === 'debug') return;
      const pSign = pData.current_sign || 1;
      const houseNum = ((pSign - moonSign + 12) % 12) + 1;

      transformedPlanets[pName] = {
        ...pData,
        house_number: houseNum
      };
    });

    transformedPlanets["Ascendant"] = {
      ...ascendantObj,
      current_sign: moonSign,
      house_number: 1
    };

    return {
      chartTitle: 'Chandra Kundali (Moon Chart)',
      vargaType,
      output: [data.output[0] || {}, transformedPlanets]
    };
  }

  if (vargaType === 'hora') {
    // D-2: 15° divisions. Odd signs -> Sun (5 Leo) or Moon (4 Cancer). Even signs -> Moon (4 Cancer) or Sun (5 Leo).
    const getHoraSign = (sign: number, deg: number) => {
      const isOdd = sign % 2 !== 0;
      const firstHalf = (deg % 30) < 15;
      if (isOdd) {
        return firstHalf ? 5 : 4; // Leo or Cancer
      } else {
        return firstHalf ? 4 : 5; // Cancer or Leo
      }
    };

    const d2LagnaSign = getHoraSign(ascSign, ascNormDeg);

    Object.entries(rawPlanets).forEach(([pName, pData]: [string, any]) => {
      if (pName === 'ayanamsa' || pName === 'debug') return;
      const pSign = pData.current_sign || 1;
      const pDeg = pData.normDegree ?? pData.fullDegree ?? 0;
      const d2Sign = getHoraSign(pSign, pDeg);
      const houseNum = ((d2Sign - d2LagnaSign + 12) % 12) + 1;

      transformedPlanets[pName] = {
        ...pData,
        current_sign: d2Sign,
        house_number: houseNum
      };
    });

    transformedPlanets["Ascendant"] = {
      ...ascendantObj,
      current_sign: d2LagnaSign,
      house_number: 1
    };

    return {
      chartTitle: 'Hora Chart (D-2)',
      vargaType,
      output: [data.output[0] || {}, transformedPlanets]
    };
  }

  if (vargaType === 'chalit') {
    // Bhava Chalit Chart: Midpoint relative to Ascendant degree
    // Calculate full degree relative to zodiac start
    const ascFullDeg = (ascSign - 1) * 30 + ascNormDeg;

    Object.entries(rawPlanets).forEach(([pName, pData]: [string, any]) => {
      if (pName === 'ayanamsa' || pName === 'debug') return;
      const pSign = pData.current_sign || 1;
      const pDeg = pData.normDegree ?? 0;
      const pFullDeg = (pSign - 1) * 30 + pDeg;

      // Distance from Ascendant
      let diff = pFullDeg - ascFullDeg;
      if (diff < 0) diff += 360;

      // Each house is 30 degrees centered around ascendant
      // Shift by +15° so House 1 spans -15° to +15° of Ascendant
      const shifted = (diff + 15) % 360;
      const houseNum = Math.floor(shifted / 30) + 1;
      const chalitSign = ((ascSign - 1 + (houseNum - 1)) % 12) + 1;

      transformedPlanets[pName] = {
        ...pData,
        current_sign: chalitSign,
        house_number: houseNum
      };
    });

    transformedPlanets["Ascendant"] = {
      ...ascendantObj,
      current_sign: ascSign,
      house_number: 1
    };

    return {
      chartTitle: 'Chalit Chart (Bhava Chalit)',
      vargaType,
      output: [data.output[0] || {}, transformedPlanets]
    };
  }

  if (vargaType === 'saptamsa') {
    // D-7: 30° / 7 = 4.2857142857°
    const getD7Sign = (sign: number, deg: number) => {
      const partIdx = Math.floor((deg % 30) / 4.2857142857);
      const isOdd = sign % 2 !== 0;
      const startSign = isOdd ? sign : ((sign + 6 - 1) % 12) + 1;
      return ((startSign - 1 + partIdx) % 12) + 1;
    };

    const d7LagnaSign = getD7Sign(ascSign, ascNormDeg);

    Object.entries(rawPlanets).forEach(([pName, pData]: [string, any]) => {
      if (pName === 'ayanamsa' || pName === 'debug') return;
      const pSign = pData.current_sign || 1;
      const pDeg = pData.normDegree ?? 0;
      const d7Sign = getD7Sign(pSign, pDeg);
      const houseNum = ((d7Sign - d7LagnaSign + 12) % 12) + 1;

      transformedPlanets[pName] = {
        ...pData,
        current_sign: d7Sign,
        house_number: houseNum
      };
    });

    transformedPlanets["Ascendant"] = {
      ...ascendantObj,
      current_sign: d7LagnaSign,
      house_number: 1
    };

    return {
      chartTitle: 'Saptamsa Chart (D-7)',
      vargaType,
      output: [data.output[0] || {}, transformedPlanets]
    };
  }

  if (vargaType === 'navamsa') {
    // D-9: 30° / 9 = 3.3333333333°
    const getD9Sign = (sign: number, deg: number) => {
      const navIdx = Math.floor((deg % 30) / 3.3333333333333335);
      const elem = (sign - 1) % 4;
      const startSign = elem === 0 ? 1 : elem === 1 ? 10 : elem === 2 ? 7 : 4;
      return ((startSign - 1 + navIdx) % 12) + 1;
    };

    const d9LagnaSign = getD9Sign(ascSign, ascNormDeg);

    Object.entries(rawPlanets).forEach(([pName, pData]: [string, any]) => {
      if (pName === 'ayanamsa' || pName === 'debug') return;
      const pSign = pData.current_sign || 1;
      const pDeg = pData.normDegree ?? 0;
      const d9Sign = getD9Sign(pSign, pDeg);
      const houseNum = ((d9Sign - d9LagnaSign + 12) % 12) + 1;

      transformedPlanets[pName] = {
        ...pData,
        current_sign: d9Sign,
        house_number: houseNum
      };
    });

    transformedPlanets["Ascendant"] = {
      ...ascendantObj,
      current_sign: d9LagnaSign,
      house_number: 1
    };

    return {
      chartTitle: 'Navamsa Chart (D-9)',
      vargaType,
      output: [data.output[0] || {}, transformedPlanets]
    };
  }

  if (vargaType === 'dasamsa') {
    // D-10: 30° / 10 = 3.0°
    const getD10Sign = (sign: number, deg: number) => {
      const partIdx = Math.floor((deg % 30) / 3.0);
      const isOdd = sign % 2 !== 0;
      const startSign = isOdd ? sign : ((sign + 8 - 1) % 12) + 1;
      return ((startSign - 1 + partIdx) % 12) + 1;
    };

    const d10LagnaSign = getD10Sign(ascSign, ascNormDeg);

    Object.entries(rawPlanets).forEach(([pName, pData]: [string, any]) => {
      if (pName === 'ayanamsa' || pName === 'debug') return;
      const pSign = pData.current_sign || 1;
      const pDeg = pData.normDegree ?? 0;
      const d10Sign = getD10Sign(pSign, pDeg);
      const houseNum = ((d10Sign - d10LagnaSign + 12) % 12) + 1;

      transformedPlanets[pName] = {
        ...pData,
        current_sign: d10Sign,
        house_number: houseNum
      };
    });

    transformedPlanets["Ascendant"] = {
      ...ascendantObj,
      current_sign: d10LagnaSign,
      house_number: 1
    };

    return {
      chartTitle: 'Dasamsa Chart (D-10)',
      vargaType,
      output: [data.output[0] || {}, transformedPlanets]
    };
  }

  if (vargaType === 'dwadasamsa') {
    // D-12: 30° / 12 = 2.5°
    const getD12Sign = (sign: number, deg: number) => {
      const partIdx = Math.floor((deg % 30) / 2.5);
      return ((sign - 1 + partIdx) % 12) + 1;
    };

    const d12LagnaSign = getD12Sign(ascSign, ascNormDeg);

    Object.entries(rawPlanets).forEach(([pName, pData]: [string, any]) => {
      if (pName === 'ayanamsa' || pName === 'debug') return;
      const pSign = pData.current_sign || 1;
      const pDeg = pData.normDegree ?? 0;
      const d12Sign = getD12Sign(pSign, pDeg);
      const houseNum = ((d12Sign - d12LagnaSign + 12) % 12) + 1;

      transformedPlanets[pName] = {
        ...pData,
        current_sign: d12Sign,
        house_number: houseNum
      };
    });

    transformedPlanets["Ascendant"] = {
      ...ascendantObj,
      current_sign: d12LagnaSign,
      house_number: 1
    };

    return {
      chartTitle: 'Dwadasamsa Chart (D-12)',
      vargaType,
      output: [data.output[0] || {}, transformedPlanets]
    };
  }

  return {
    chartTitle: getVargaTitle(vargaType),
    vargaType,
    output: data.output
  };
}

export function getVargaTitle(vargaType: VargaType): string {
  const titles: Record<VargaType, string> = {
    lagna: 'Lagna Chart (D-1)',
    chandra: 'Chandra Kundali (Moon Chart)',
    hora: 'Hora Chart (D-2)',
    chalit: 'Chalit Chart (Bhava Chalit)',
    saptamsa: 'Saptamsa Chart (D-7)',
    navamsa: 'Navamsa Chart (D-9)',
    dasamsa: 'Dasamsa Chart (D-10)',
    dwadasamsa: 'Dwadasamsa Chart (D-12)'
  };
  return titles[vargaType] || 'Astrological Chart';
}
