import React, { useState, useRef } from 'react';
import './style.css';
import CytoscapeComponent from 'react-cytoscapejs';

export default function App() {
  const [width, setWith] = useState('100%');
  const [height, setHeight] = useState('400px');
  const myCyRef = useRef(null);
  const [graphData, setGraphData] = useState({
    nodes: [
      { data: { id: '1', label: 'IP 1', type: 'ip' } },
      { data: { id: '2', label: 'Device 1', type: 'device' } },
      { data: { id: '3', label: 'IP 2', type: 'ip' } },
      { data: { id: '4', label: 'Device 2', type: 'device' } },
      { data: { id: '5', label: 'Device 3', type: 'device' } },
      { data: { id: '6', label: 'IP 3', type: 'ip' } },
      { data: { id: '7', label: 'Device 5', type: 'device' } },
      { data: { id: '8', label: 'Device 6', type: 'device' } },
      { data: { id: '9', label: 'Device 7', type: 'device' } },
      { data: { id: '10', label: 'Device 8', type: 'device' } },
      { data: { id: '11', label: 'Device 9', type: 'device' } },
      { data: { id: '12', label: 'IP 3', type: 'ip' } },
      { data: { id: '13', label: 'Device 10', type: 'device' } },
    ],
    edges: [
      {
        data: {
          source: '1',
          target: '2',
          label: 'Node2',
          attribute: 'score',
          value: 0.95,
        },
        style: { width: 14 },
      },
      {
        data: { source: '3', target: '4', label: 'Node4' },
      },
      {
        data: { source: '3', target: '5', label: 'Node5' },
      },
      {
        data: { source: '6', target: '5', label: ' 6 -> 5' },
      },
      {
        data: { source: '6', target: '7', label: ' 6 -> 7' },
      },
      {
        data: { source: '6', target: '8', label: ' 6 -> 8' },
      },
      {
        data: { source: '6', target: '9', label: ' 6 -> 9' },
      },
      {
        data: { source: '3', target: '13', label: ' 3 -> 13' },
      },
    ],
  });

  const layout = {
    name: 'breadthfirst',
    fit: true,
    // circle: true,
    directed: true,
    padding: 50,
    // spacingFactor: 1.5,
    animate: true,
    animationDuration: 1000,
    avoidOverlap: true,
    nodeDimensionsIncludeLabels: false,
  };

  const styleSheet = [
    {
      selector: '.hasLabel',
      css: {
        label: (ele) => ele.data('label')
      },
    },
    {
      selector: 'node',
      style: {
        backgroundColor: '#4a56a6',
        width: 30,
        height: 30,
        label: 'data(label)',

        // "width": "mapData(score, 0, 0.006769776522008331, 20, 60)",
        // "height": "mapData(score, 0, 0.006769776522008331, 20, 60)",
        // "text-valign": "center",
        // "text-halign": "center",
        'overlay-padding': '6px',
        'z-index': '10',
        //text props
        'text-outline-color': '#4a56a6',
        'text-outline-width': '2px',
        color: 'white',
        fontSize: 20,
      },
    },
    {
      selector: 'node:selected',
      style: {
        'border-width': '6px',
        'border-color': '#AAD8FF',
        'border-opacity': '0.5',
        'background-color': '#77828C',
        width: 50,
        height: 50,
        //text props
        'text-outline-color': '#77828C',
        'text-outline-width': 8,
      },
    },
    {
      selector: "node[type='device']",
      style: {
        shape: 'rectangle',
      },
    },
    {
      selector: 'edge',
      style: {
        width: 3,
        // "line-color": "#6774cb",
        'line-color': '#AAD8FF',
        'target-arrow-color': '#6774cb',
        'target-arrow-shape': 'triangle',
        'curve-style': 'bezier',
      },
    },
  ];

  const toggleEdgeLabels = () => {
    myCyRef.current._cy.elements().toggleClass('hasLabel')
  };

  return (
    <>
      <div>
        <h1>Cytoscape example</h1>
        <button onClick={toggleEdgeLabels}>Toggle edge labels</button>
        <div
          style={{
            border: '1px solid',
            backgroundColor: '#f5f6fe',
          }}
        >
          <CytoscapeComponent
            elements={CytoscapeComponent.normalizeElements(graphData)}
            // pan={{ x: 200, y: 200 }}
            style={{ width: width, height: height }}
            zoomingEnabled={true}
            maxZoom={3}
            minZoom={0.1}
            autounselectify={false}
            boxSelectionEnabled={true}
            layout={layout}
            stylesheet={styleSheet}
            ref={myCyRef}
            cy={(cy) => {
              cy.on('tap', 'edge', (evt) => {
                const edge = evt.target;
                const attribute = edge.data().attribute;
                const value = edge.data().value;
                console.log('ATTRIBUTE', attribute);
                console.log('VALUE', value);
                edge.style().label = `${attribute}: ${value}`;
                console.log(edge.style());
              });
            }}
          />
        </div>
      </div>
    </>
  );
}
