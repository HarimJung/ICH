"use client";

import { useRef, useEffect } from "react";
import * as d3 from "d3";

interface CategoryData {
  name: string;
  count: number;
  color: string;
}

export default function CategoryDonutChart({ data }: { data: CategoryData[] }) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current || data.length === 0) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const width = 280;
    const height = 280;
    const radius = Math.min(width, height) / 2;
    const innerRadius = radius * 0.6;

    const g = svg
      .attr("viewBox", `0 0 ${width} ${height}`)
      .append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`);

    const pie = d3.pie<CategoryData>().value((d) => d.count).sort(null);

    const arc = d3
      .arc<d3.PieArcDatum<CategoryData>>()
      .innerRadius(innerRadius)
      .outerRadius(radius - 10)
      .cornerRadius(4)
      .padAngle(0.02);

    const hoverArc = d3
      .arc<d3.PieArcDatum<CategoryData>>()
      .innerRadius(innerRadius)
      .outerRadius(radius - 4)
      .cornerRadius(4)
      .padAngle(0.02);

    const arcs = g
      .selectAll(".arc")
      .data(pie(data))
      .enter()
      .append("g")
      .attr("class", "arc");

    arcs
      .append("path")
      .attr("d", arc)
      .attr("fill", (d) => d.data.color)
      .style("cursor", "pointer")
      .on("mouseenter", function (_event, d) {
        d3.select(this).transition().duration(200).attr("d", hoverArc(d) as string);
      })
      .on("mouseleave", function (_event, d) {
        d3.select(this).transition().duration(200).attr("d", arc(d) as string);
      });

    // Center text
    const total = data.reduce((sum, d) => sum + d.count, 0);
    g.append("text")
      .attr("text-anchor", "middle")
      .attr("dy", "-0.2em")
      .attr("font-size", "28px")
      .attr("font-weight", "bold")
      .attr("fill", "#1A1A2E")
      .text(total);

    g.append("text")
      .attr("text-anchor", "middle")
      .attr("dy", "1.4em")
      .attr("font-size", "12px")
      .attr("fill", "#5A6275")
      .text("Total Guidelines");

  }, [data]);

  return (
    <div className="flex flex-col items-center">
      <svg ref={svgRef} className="w-full max-w-[280px]" />
      <div className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2">
        {data.map((d) => (
          <div key={d.name} className="flex items-center gap-2">
            <div
              className="h-3 w-3 rounded-full"
              style={{ backgroundColor: d.color }}
            />
            <span className="text-sm text-textSecondary">
              {d.name} ({d.count})
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
