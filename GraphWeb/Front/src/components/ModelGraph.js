import React, { useEffect, useState } from "react"

import useNextState from "../hooks/useNextState"
import Graph from "react-graph-vis"
import { Row, Col, Typography } from "antd"

const { Text } = Typography

const ModelGraph = ({ isStartedModel, nodesInColumn, time, interval }) => {
    const { data, fetch } = useNextState()
    const [elapsedTime, setElapsedTime] = useState(0)

    useEffect(() => {
        if (isStartedModel && elapsedTime < time) {
            const intervalId = setInterval(() => {
                setElapsedTime(elapsedTime + 1)
                fetch()
            }, interval)

            return () => clearInterval(intervalId)
        }
    }, [fetch, setElapsedTime, isStartedModel, elapsedTime, interval, time])

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
        interaction: {
            dragNodes: false,
            selectable: false,
        },
        nodes: {
            shape: "dot",
            size: 28,
            font: {
                size: 24,
                color: "#222",
            },
            borderWidth: 2,
        },
        edges: {
            width: 2,
        },
    }

    return (
        <Row style={{ marginBottom: "50px" }}>
            <div style={{ width: "80vw", margin: "20px auto" }}>
                <Row gutter={[20, 20]} justify="space-between">
                    <Col span={8}>
                        <Text>
                            Кол-во работающих узлов:{" "}
                            <Text type="success" strong>
                                {data.workingNodeCount || 0}
                            </Text>
                        </Text>
                    </Col>
                    <Col span={8}>
                        <Text>
                            Кол-во узлов в сервисе:{" "}
                            <Text type="warning" strong>
                                {data.serviceNodeCount || 0}
                            </Text>
                        </Text>
                    </Col>
                    <Col span={8}>
                        <Text>
                            Кол-во неисправных узлов:{" "}
                            <Text type="danger" strong>
                                {data.defectiveNodeCount || 0}
                            </Text>
                        </Text>
                    </Col>
                    <Col span={8}>
                        <Text>
                            Ресурсов осталось: <Text strong>{data.resourceCount || 0}</Text>
                        </Text>
                    </Col>
                    <Col span={8}>
                        <Text>
                            Прошедшее время: <Text strong>{data.elapsedTime || 0}</Text>
                        </Text>
                    </Col>
                </Row>
            </div>
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
        </Row>
    )
}

export default ModelGraph
