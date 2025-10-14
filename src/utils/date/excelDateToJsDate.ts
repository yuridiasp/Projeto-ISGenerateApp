import dayjs, { Dayjs } from "dayjs"

import { timezone } from "@helpers/timezone"

export function toExcelSerialLocal(d: Dayjs) {
  // ancora 00:00 local do dia desejado (sem ruído)
  const localMidnight = d.tz(timezone, true).startOf("day");

  // base do Excel (conta o bug de 1900)
  const baseUTC = dayjs.utc("1899-12-31");
  const serial = localMidnight.utc().diff(baseUTC, "day"); // inteiro

  return serial; // ex.: 45932
}

export function excelSerialToDayjsLocal(serial: number) {
  // Base correta (1 -> 1900-01-01; já contempla o "leap bug" do Excel sem ajustes extras)
  let d = dayjs.utc("1899-12-30").add(serial, "day");

  // Se for célula só-data (ruído de ponto flutuante)
  const EPS = 1e-9;
  if (Math.abs(serial - Math.round(serial)) < EPS) {
    // Garante 00:00 local do próprio dia, sem escorregar pro anterior
    return d.tz(timezone, true); // mantém 00:00 como hora local
  }

  // Se houver fração legítima (data+hora), preserva ms e mantém hora local
  const whole = Math.floor(serial + EPS);
  const frac  = serial - whole;
  d = dayjs.utc("1899-12-30").add(whole, "day").add(Math.round(frac * 86400000), "millisecond");
  return d.tz(timezone, true);
}

export function excelDateToJsDate(excelDate: string) {

  return excelSerialToDayjsLocal(Number(excelDate))
}