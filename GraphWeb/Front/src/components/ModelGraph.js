import React, { useEffect } from "react"

import useNextState from "../hooks/useNextState"
import Graph from "react-graph-vis"

const ModelGraph = ({ isStartedModel, nodesInColumn, onModelChange }) => {
    const { data, fetch } = useNextState()

    useEffect(() => {
        if (isStartedModel) {
            const intervalId = setInterval(() => {
                fetch()
            }, 1000)

            return () => clearInterval(intervalId)
        }
    }, [fetch, isStartedModel])

    useEffect(() => {
        onModelChange(data.nodes || [])
    }, [data, onModelChange])

    const nodes = data.nodes || []

    const getColor = (state) => {
        if (state === 0) {
            return "#00bb00"
        }

        if (state === 1) {
            return "#FFED3D"
        }

        return "#bb0000"
    }

    const generateEdges = (countInRow) => {
        const edges = []
        nodes.forEach((node) => {
            if (node.level !== nodesInColumn) edges.push({ from: node.id, to: node.id + 1 })
            edges.push({ from: node.id, to: node.id + countInRow })
        })

        return edges
    }

    nodes.forEach((node, i) => {
        node.label = node.id.toString()
        node.color = getColor(node.state)
        node.level = (i % nodesInColumn) + 1
    })

    const edges = generateEdges(nodesInColumn)

    const options = {
        layout: {
            hierarchical: true,
        },
        physics: false,
    }

    return (
        <Graph
            style={{
                width: "100%",
                height: "600px",
                background: "#f5f5f5",
                borderTop: "solid 1px rgba(0,0,0,.1)",
                borderBottom: "solid 1px rgba(0,0,0,.1)",
            }}
            graph={{ nodes, edges }}
            options={options}
        />
    )
}

export default ModelGraph
