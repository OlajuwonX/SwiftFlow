"use client";

import React, { useState, use } from 'react';
import ProjectHeader from '@/app/projects/ProjectHeader';
import Board from '../BoardView';
import List from "../ListView/index";
import Timeline from "../Timeline/index";
import Table from "../TableView/index"

type Props = {
  params: Promise<{ id: string }>; // ← make it a promise
};

const Project = ({ params }: Props) => {
  const { id } = use(params); // ← unwrap the promise
  console.log("Resolved project Id", id);

  const [activeTab, setActiveTab] = useState("Board");
  const [isModalNewTaskOpen, setIsModalNewTaskOpen] = useState(false);

  return (
    <div>
      <ProjectHeader activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === "Board" && (
        <Board id={id} setIsModalNewTaskOpen={setIsModalNewTaskOpen} />
      )}
      {activeTab === "List" && (
        <List id={id} setIsModalNewTaskOpen={setIsModalNewTaskOpen} />
      )}
      {activeTab === "Timeline" && (
        <Timeline id={id} setIsModalNewTaskOpen={setIsModalNewTaskOpen} />
      )}
      {activeTab === "Table" && (
        <Table id={id} setIsModalNewTaskOpen={setIsModalNewTaskOpen} />
      )}
    </div>
  );
};

export default Project;
