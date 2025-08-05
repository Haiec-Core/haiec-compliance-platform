"use client";
import { motion } from "motion/react";
import { BarChartActive } from "./BarChartActive";
import { BarChartInteractive } from "./BarChartInteractive";
import { LineChartInteractive } from "./LineChartInteractive";
import { RadarChartGridCircleFilled } from "./RadarChartGridCircleFilled";
import { RadialChartGrid } from "./RadialChartGrid";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
    },
  },
};

export function WorkspaceGraphs() {
  return (
    <motion.div
      className="flex flex-col gap-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants}>
        <BarChartInteractive />
      </motion.div>
      <motion.div variants={itemVariants}>
        <LineChartInteractive />
      </motion.div>
      <motion.div
        className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 grid-flow-row auto-rows-max gap-6"
        variants={containerVariants}
      >
        <motion.div variants={itemVariants}>
          <BarChartActive />
        </motion.div>
        <motion.div variants={itemVariants}>
          <RadialChartGrid />
        </motion.div>
        <motion.div variants={itemVariants}>
          <RadarChartGridCircleFilled />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
