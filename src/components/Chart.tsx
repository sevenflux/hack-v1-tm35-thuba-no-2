import { AreaSeries, createChart, ColorType, LineSeries, SeriesType, ISeriesApi } from 'lightweight-charts';
import React, { useEffect, useRef } from 'react';

export default function ChartComponent(props) {
  const {
    data,
    newSupplyData,
    newBorrowData,
    colors: {
      backgroundColor = 'transparent',
      minusColor = '#2962FF',
      supplyColor = '#9b87f5',
      borrowColor = '#81c8be',
      textColor = 'white',
    } = {},
    coinSymbol
  } = props;

  const chartContainerRef = useRef<HTMLDivElement>(null);
  const supplySeries = useRef<ISeriesApi<"Line">>(null);
  const borrowSeries = useRef<ISeriesApi<"Line">>(null);

  useEffect(() => {
    const handleResize = () => {
      chart.applyOptions({ width: chartContainerRef.current.clientWidth });
    };

    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: backgroundColor },
        textColor,
      },
      width: chartContainerRef.current.clientWidth,
      height: 300,
      timeScale: {
        timeVisible: true,
        secondsVisible: true
      }
    });
    chart.timeScale().fitContent();

    supplySeries.current = chart.addSeries(LineSeries, { color: supplyColor});
    borrowSeries.current = chart.addSeries(LineSeries, { color: borrowColor});
    if (chartContainerRef.current === null) {
      supplySeries.current.setData(data);
      borrowSeries.current.setData(data);
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);

      chart.remove();
    };

  }, [coinSymbol]);

  useEffect(() => {
    supplySeries.current.update(newSupplyData);
    borrowSeries.current.update(newBorrowData);
  }, [newSupplyData, newBorrowData]);

  return (
    <div
      ref={chartContainerRef}
    />
  );
};
