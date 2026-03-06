"use client";

import { useRef, useEffect } from "react";
import * as d3 from "d3";

interface StepData {
  step: number;
  label: string;
  count: number;
  color: string;
}

export default function StepDistributionChart({ data }: { data: StepData[] }) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current || data.length === 0) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const margin = { top: 20, right: 20, bottom: 40, left: 40 };
    const width = 400;
    const height = 240;
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const g = svg
      .attr("viewBox", `0 0 ${width} ${height}`)
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    const x = d3
      .scaleBand()
      .domain(data.map((d) => d.label))
      .range([0, innerWidth])
      .padding(0.3);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.count) || 0])
      .nice()
      .range([innerHeight, 0]);

    // Grid lines
    g.append("g")
      .attr("class", "grid")
      .call(
        d3.axisLeft(y).tickSize(-innerWidth).tickFormat(() => "")
      )
      .call((g) => g.select(".domain").remove())
      .call((g) =>
        g.selectAll(".tick line").attr("stroke", "#DDE1E6").attr("stroke-dasharray", "2,2")
      );

    // Bars
    g.selectAll(".bar")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", (d) => x(d.label) || 0)
      .attr("y", (d) => y(d.count))
      .attr("width", x.bandwidth())
      .attr("height", (d) => innerHeight - y(d.count))
      .attr("fill", (d) => d.color)
      .attr("rx", 4)
      .style("cursor", "pointer")
      .on("mouseenter", function () {
        d3.select(this).attr("opacity", 0.8);
      })
      .on("mouseleave", function () {
        d3.select(this).attr("opacity", 1);
      });

    // Count labels
    g.selectAll(".label")
      .data(data)
      .enter()
      .append("text")
      .attr("x", (d) => (x(d.label) || 0) + x.bandwidth() / 2)
      .attr("y", (d) => y(d.count) - 6)
      .attr("text-anchor", "middle")
      .attr("font-size", "13px")
      .attr("font-weight", "600")
      .attr("fill", "#1A1A2E")
      .text((d) => d.count);

    // X axis
    g.append("g")
      .attr("transform", `translate(0, ${innerHeight})`)
      .call(d3.axisBottom(x))
      .call((g) => g.select(".domain").attr("stroke", "#DDE1E6"))
      .call((g) =>
        g.selectAll(".tick text").attr("fill", "#5A6275").attr("font-size", "12px")
      )
      .call((g) => g.selectAll(".tick line").remove());

    // Y axis
    g.append("g")
      .call(d3.axisLeft(y).ticks(5))
      .call((g) => g.select(".domain").remove())
      .call((g) =>
        g.selectAll(".tick text").attr("fill", "#5A6275").attr("font-size", "11px")
      )
      .call((g) => g.selectAll(".tick line").remove());
  }, [data]);

  return <svg ref={svgRef} className="w-full" />;
}
