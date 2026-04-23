"use client";

import dynamic from "next/dynamic";
import * as echarts from "echarts";
import type { ECharts, EChartsOption } from "echarts";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  geoMapData,
  provinceNameMap,
  type ProvinceAgency,
  type ProvinceMetric,
} from "./source-data";

const ReactECharts = dynamic(() => import("echarts-for-react"), {
  ssr: false,
});

type ProvincePoint = ProvinceMetric & {
  displayName: string;
};

type ProvincePopover = {
  province: ProvincePoint;
  x: number;
  y: number;
};

type ChartProvinceData = {
  id?: number | string;
  name?: string;
  value?: unknown;
};

type EChartClickParams = {
  data?: ChartProvinceData;
  name?: string;
  event?: {
    offsetX?: number;
    offsetY?: number;
  };
};

const MAP_NAME = "portfolio-thailand";
const MAP_MAX_VALUE = 20;
const POPOVER_WIDTH = 340;
const POPOVER_HEIGHT = 320;
const MAP_COLORS = ["#deebf7", "#3182bd"];
const ACTIVE_COLOR = "red";
const POPOVER_ACCENT = "#722ED1";

const numberFormatter = new Intl.NumberFormat("th-TH");

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

const normalizeNumber = (value: unknown) => {
  if (typeof value === "number") {
    return Number.isFinite(value) ? value : 0;
  }

  if (typeof value === "string") {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : 0;
  }

  if (Array.isArray(value)) {
    const lastValue = value.at(-1);
    return normalizeNumber(lastValue);
  }

  return 0;
};

const hasThaiCharacters = (value: string) => {
  for (const character of value) {
    const code = character.charCodeAt(0);
    if (code >= 0x0e00 && code <= 0x0e7f) {
      return true;
    }
  }

  return false;
};

const decodeIfNeeded = (value: string) => {
  const bytes = Uint8Array.from(value, (character) => character.charCodeAt(0));
  const decoded = new TextDecoder("utf-8").decode(bytes);

  return hasThaiCharacters(decoded) ? decoded : value;
};

const ProvincePopoverCard = ({
  province,
  onClose,
}: {
  province: ProvincePoint;
  onClose: () => void;
}) => {
  return (
    <div className="w-full rounded-3xl border border-[#d7c3ff] bg-[#f1e3fd] p-5 text-slate-900 shadow-2xl shadow-black/20">
      <div className="mb-4 flex items-start gap-3">
        <div>
          <p
            className="text-sm font-semibold"
            style={{ color: POPOVER_ACCENT }}
          >
            จังหวัด{province.displayName}
          </p>
        </div>
        <button
          className="ml-auto rounded-full border border-slate-300 bg-white px-3 py-1 text-sm text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
          onClick={onClose}
          type="button"
        >
          ปิด
        </button>
      </div>

      <div className="mb-2 grid grid-cols-[1fr_auto] gap-x-6 text-sm font-semibold">
        <span style={{ color: POPOVER_ACCENT, textDecoration: "underline" }}>
          หน่วยงาน
        </span>
        <span style={{ color: POPOVER_ACCENT, textDecoration: "underline" }}>
          ตำแหน่งว่าง
        </span>
      </div>

      <div className="grid max-h-64 gap-2 overflow-y-auto pr-1 text-sm">
        {province.agencies.map((agency: ProvinceAgency) => (
          <div
            key={`${province.id}-${agency.name}`}
            className="grid grid-cols-[1fr_auto] items-start gap-x-6 rounded-2xl bg-white/75 px-3 py-2"
          >
            <span className="text-slate-700">{agency.name}</span>
            <span className="font-medium text-slate-900">
              {numberFormatter.format(normalizeNumber(agency.value))}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

const ThailandMapViewer = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const chartInstanceRef = useRef<ECharts | null>(null);

  const [isMapReady, setIsMapReady] = useState(
    Boolean(echarts.getMap(MAP_NAME)),
  );
  const [loadError, setLoadError] = useState<string | null>(null);
  const [popover, setPopover] = useState<ProvincePopover | null>(null);

  const decodedProvinceNameMap = useMemo<Record<string, string>>(
    () =>
      Object.fromEntries(
        Object.entries(provinceNameMap).map(([englishName, thaiName]) => [
          englishName,
          decodeIfNeeded(thaiName),
        ]),
      ),
    [],
  );

  const provinceMetrics = useMemo<ProvincePoint[]>(() => {
    const englishByThai = Object.fromEntries(
      Object.entries(decodedProvinceNameMap).map(([englishName, thaiName]) => [
        thaiName,
        englishName,
      ]),
    );

    return geoMapData.map((province) => {
      const displayName = decodeIfNeeded(province.name);

      return {
        id: normalizeNumber(province.id),
        displayName,
        name: englishByThai[displayName] ?? province.name,
        value: normalizeNumber(province.value),
        agencies: province.agencies.map((agency) => ({
          name: decodeIfNeeded(agency.name),
          value: normalizeNumber(agency.value),
        })),
      };
    });
  }, [decodedProvinceNameMap]);

  const chartData = useMemo<ProvincePoint[]>(
    () =>
      provinceMetrics.map((province) => ({
        ...province,
        agencies: province.agencies.map((agency) => ({ ...agency })),
      })),
    [provinceMetrics],
  );

  const provinceIndexes = useMemo(() => {
    const byId = new Map<number, ProvincePoint>();
    const byEnglishName = new Map<string, ProvincePoint>();
    const byThaiName = new Map<string, ProvincePoint>();

    for (const province of provinceMetrics) {
      byId.set(province.id, province);
      byEnglishName.set(province.name, province);
      byThaiName.set(province.displayName, province);
    }

    return { byId, byEnglishName, byThaiName };
  }, [provinceMetrics]);

  const totalVacancies = useMemo(
    () =>
      provinceMetrics.reduce(
        (sum, province) => sum + normalizeNumber(province.value),
        0,
      ),
    [provinceMetrics],
  );

  const topProvince = useMemo(() => {
    if (provinceMetrics.length === 0) {
      return {
        id: 0,
        displayName: "-",
        name: "-",
        value: 0,
        agencies: [],
      } satisfies ProvincePoint;
    }

    return provinceMetrics.reduce((currentTop, province) =>
      normalizeNumber(province.value) > normalizeNumber(currentTop.value)
        ? province
        : currentTop,
    );
  }, [provinceMetrics]);

  const option = useMemo<EChartsOption>(
    () => ({
      backgroundColor: "transparent",
      tooltip: {
        show: true,
        formatter: (params: { name?: string; value?: unknown }) => {
          const thaiName =
            (params.name && decodedProvinceNameMap[params.name]) ||
            params.name ||
            "-";
          const value = numberFormatter.format(normalizeNumber(params.value));
          return `${thaiName} ${value} ตำแหน่ง`;
        },
        backgroundColor: "#ffffff",
        borderColor: "#e2e8f0",
        borderWidth: 1,
        textStyle: {
          color: "#0f172a",
        },
        padding: 4,
      },
      visualMap: [
        {
          orient: "horizontal",
          show: false,
          calculable: false,
          left: 0,
          bottom: 0,
          seriesIndex: 0,
          min: 0,
          max: MAP_MAX_VALUE,
          dimension: 0,
          inRange: {
            color: MAP_COLORS,
          },
        },
      ],
      geo: {
        map: MAP_NAME,
        roam: true,
        aspectScale: 0.9,
        label: {
          show: false,
          textBorderColor: "#ffffff",
          textBorderWidth: 2,
        },
        emphasis: {
          label: { show: false },
          itemStyle: {
            areaColor: ACTIVE_COLOR,
          },
        },
        select: {
          disabled: true,
          label: { show: false },
          itemStyle: {
            areaColor: ACTIVE_COLOR,
          },
        },
        nameMap: decodedProvinceNameMap,
      },
      series: [
        {
          type: "map",
          geoIndex: 0,
          map: MAP_NAME,
          selectedMode: true,
          data: chartData,
          nameMap: decodedProvinceNameMap,
        },
      ],
    }),
    [chartData, decodedProvinceNameMap],
  );

  useEffect(() => {
    let isActive = true;

    const registerMap = async () => {
      if (echarts.getMap(MAP_NAME)) {
        setIsMapReady(true);
        return;
      }

      try {
        const response = await fetch("/maps/thailand.json");
        if (!response.ok) {
          throw new Error(`Failed to load map data: ${response.status}`);
        }

        const geoJson = await response.json();
        echarts.registerMap(MAP_NAME, geoJson);

        if (isActive) {
          setIsMapReady(true);
        }
      } catch (error) {
        if (isActive) {
          setLoadError(
            error instanceof Error ? error.message : "Failed to load map data",
          );
        }
      }
    };

    void registerMap();

    return () => {
      isActive = false;
    };
  }, []);

  const resolveProvince = useCallback(
    (params: EChartClickParams) => {
      const provinceId = normalizeNumber(params.data?.id);
      if (provinceIndexes.byId.has(provinceId)) {
        return provinceIndexes.byId.get(provinceId) ?? null;
      }

      const candidateNames = [
        params.name,
        params.data?.name,
        typeof params.name === "string"
          ? decodeIfNeeded(params.name)
          : undefined,
        typeof params.data?.name === "string"
          ? decodeIfNeeded(params.data.name)
          : undefined,
      ].filter((value): value is string => Boolean(value));

      for (const name of candidateNames) {
        if (provinceIndexes.byEnglishName.has(name)) {
          return provinceIndexes.byEnglishName.get(name) ?? null;
        }

        if (provinceIndexes.byThaiName.has(name)) {
          return provinceIndexes.byThaiName.get(name) ?? null;
        }
      }

      return null;
    },
    [provinceIndexes],
  );

  const handleProvinceClick = useCallback(
    (params: EChartClickParams) => {
      const province = resolveProvince(params);
      if (!province) {
        return;
      }

      const bounds = containerRef.current?.getBoundingClientRect();
      const maxX = Math.max((bounds?.width ?? 0) - POPOVER_WIDTH - 16, 16);
      const maxY = Math.max((bounds?.height ?? 0) - POPOVER_HEIGHT - 16, 16);

      setPopover((currentPopover) => {
        if (currentPopover?.province.id === province.id) {
          return null;
        }

        return {
          province,
          x: clamp((params.event?.offsetX ?? 0) + 20, 16, maxX),
          y: clamp(params.event?.offsetY ?? 0, 16, maxY),
        };
      });
    },
    [resolveProvince],
  );

  if (loadError) {
    return (
      <div className="rounded-3xl border border-red-400/30 bg-red-950/40 p-6 text-red-100">
        Failed to load Thailand map: {loadError}
      </div>
    );
  }

  if (!isMapReady) {
    return (
      <div className="rounded-3xl border border-white/10 bg-slate-950/60 p-6 text-slate-200">
        Loading Thailand map...
      </div>
    );
  }

  return (
    <div className="grid gap-6">
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-3xl border border-white/10 bg-slate-950/60 p-5 text-slate-100">
          <p className="text-sm uppercase tracking-[0.3em] text-sky-300/70">
            Total
          </p>
          <p className="mt-3 text-4xl font-semibold">
            {numberFormatter.format(totalVacancies)}
          </p>
          <p className="mt-2 text-sm text-slate-400">จำนวนตำแหน่งว่างรวม</p>
        </div>

        <div className="rounded-3xl border border-white/10 bg-slate-950/60 p-5 text-slate-100">
          <p className="text-sm uppercase tracking-[0.3em] text-sky-300/70">
            จังหวัดสูงสุด
          </p>
          <p className="mt-3 text-2xl font-semibold">
            {topProvince.displayName}
          </p>
          <p className="mt-2 text-sm text-slate-400">
            {numberFormatter.format(normalizeNumber(topProvince.value))}{" "}
            ตำแหน่งว่าง
          </p>
        </div>

        <div className="rounded-3xl border border-white/10 bg-slate-950/60 p-5 text-slate-100">
          <p className="text-sm uppercase tracking-[0.3em] text-sky-300/70">
            Interaction
          </p>
          <p className="mt-3 text-2xl font-semibold">Click Province</p>
          <p className="mt-2 text-sm text-slate-400">
            กดที่จังหวัดเพื่อเปิด popover รายชื่อหน่วยงาน
          </p>
        </div>
      </div>

      <div className="rounded-[2rem] border border-white/10 bg-slate-950/70 p-4 shadow-2xl shadow-black/30 md:p-6">
        <div className="mb-4 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-sky-300/70">
              Thailand Map
            </p>
            <h2 className="text-2xl font-semibold text-white">
              แสดงข้อมูลจำนวนตำแหน่งว่าง
            </h2>
            <p className="mt-1 text-sm text-slate-400">ภาพรวมกระทรวง</p>
          </div>
          <p className="max-w-xl text-sm text-slate-400">
            ใช้ชุดข้อมูลเดียวกับหน้า dashboard ต้นทาง
            และปรับสีของแผนที่ให้ตรงกับคอมโพเนนต์เดิม
          </p>
        </div>

        <div
          ref={containerRef}
          className="relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-white"
        >
          <ReactECharts
            option={option}
            style={{ height: "70vh", minHeight: 520, width: "100%" }}
            onChartReady={(instance) => {
              chartInstanceRef.current = instance;
              instance.off("click");
              instance.on("click", (params: unknown) => {
                handleProvinceClick(params as EChartClickParams);
              });
            }}
            onEvents={{ click: handleProvinceClick }}
          />

          {popover ? (
            <div
              className="absolute z-20 hidden md:block"
              style={{ left: popover.x, top: popover.y, width: POPOVER_WIDTH }}
            >
              <ProvincePopoverCard
                province={popover.province}
                onClose={() => setPopover(null)}
              />
            </div>
          ) : null}
        </div>

        {popover ? (
          <div className="mt-4 md:hidden">
            <ProvincePopoverCard
              province={popover.province}
              onClose={() => setPopover(null)}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default ThailandMapViewer;
