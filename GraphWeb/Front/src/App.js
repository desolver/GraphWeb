import React, { useState } from "react"
import useConfigGraph from "./hooks/useConfigGraph"
import ModelGraph from "./components/ModelGraph"
import { Layout, Row, Col, Button, Spin, message, Form, InputNumber, Typography } from "antd"
import { LoadingOutlined } from "@ant-design/icons"

import "./App.css"
Spin.setDefaultIndicator(<LoadingOutlined style={{ fontSize: 24 }} spin />)

const { Text, Title } = Typography

const App = () => {
    const { configure, loading } = useConfigGraph()

    const [isStart, setIsStart] = useState(false)
    const [nodesInColumn, setNodesInCoumn] = useState(5)

    const [nodes, setNodes] = useState([])

    const startHandler = (data) => {
        console.log(data)
        const nodeCount = data.workingNodeCount + data.serviceNodeCount + data.defectiveNodeCount

        const params = {
            NodeCount: nodeCount,
            WorkingNodeCount: data.workingNodeCount,
            ServiceNodeCount: data.serviceNodeCount,
            DefectiveNodeCount: data.defectiveNodeCount,
            WorkingTimeMilliseconds: data.workingTimeMilliseconds * 1000,
            ServiceTimeMilliseconds: data.serviceTimeMilliseconds * 1000,
            RepairTimeMilliseconds: data.repairTimeMilliseconds * 1000,
            ResourceCount: data.resourceCount,
            ServicePrice: data.servicePrice,
        }

        setNodesInCoumn(Math.round(Math.sqrt(nodeCount)))

        configure(params)
            .then(() => setIsStart(true))
            .catch((error) => {
                message.error("Произошла ошибка: " + error.message)
                setIsStart(false)
                console.log(error)

                setTimeout(() => startHandler(data), 5000)
            })
    }

    return (
        <Layout.Content>
            <Row style={{ width: "80vw", margin: "20px auto" }}>
                <Form
                    onFinish={startHandler}
                    style={{ width: "100%", border: "1px solid rgba(0,0,0,.1)", padding: "20px" }}
                >
                    <Title level={4} style={{ marginBottom: "20px" }}>
                        Параметры модели
                    </Title>
                    <Row justify="space-between">
                        <Col span={12}>
                            <Form.Item
                                name="workingNodeCount"
                                label="Кол-во работающих узлов (Su)"
                                initialValue={20}
                                rules={[{ required: true }]}
                            >
                                <InputNumber />
                            </Form.Item>
                        </Col>

                        <Col span={12}>
                            <Form.Item
                                name="workingTimeMilliseconds"
                                label="Кол-во времени в работе в секундах (Тг)"
                                initialValue={3}
                                rules={[{ required: true }]}
                            >
                                <InputNumber />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row justify="space-between">
                        <Col span={12}>
                            <Form.Item
                                name="serviceNodeCount"
                                label="Кол-во узлов в сервисе (So)"
                                initialValue={20}
                                rules={[{ required: true }]}
                            >
                                <InputNumber />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="serviceTimeMilliseconds"
                                label="Кол-во времени в сервисе в секундах (Тo)"
                                initialValue={4}
                                rules={[{ required: true }]}
                            >
                                <InputNumber />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row justify="space-between">
                        <Col span={12}>
                            <Form.Item
                                name="defectiveNodeCount"
                                label="Кол-во дефектных узлов (Sh)"
                                initialValue={10}
                                rules={[{ required: true }]}
                            >
                                <InputNumber />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="repairTimeMilliseconds"
                                label="Время обслуживания в секундах (Тp)"
                                initialValue={0}
                                rules={[{ required: true }]}
                            >
                                <InputNumber />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row justify="space-between">
                        <Col span={12}>
                            <Form.Item
                                name="resourceCount"
                                label="Кол-во ресурсов"
                                initialValue={10000}
                                rules={[{ required: true }]}
                            >
                                <InputNumber />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="servicePrice"
                                label="Стоимость обслуживания (Ro)"
                                initialValue={15}
                                rules={[{ required: true }]}
                            >
                                <InputNumber />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Form.Item>
                        <Button loading={loading} type="primary" htmlType="submit">
                            Старт модели
                        </Button>
                    </Form.Item>
                </Form>
            </Row>

            {nodes.length > 0 && (
                <Row style={{ width: "80vw", margin: "20px auto" }} justify="space-between">
                    <Col span={8}>
                        <Text>
                            Кол-во работающих узлов:{" "}
                            <Text type="success" strong>
                                {nodes.reduce((sum, node) => (sum += node.state === 0 ? 1 : 0), 0)}
                            </Text>
                        </Text>
                    </Col>
                    <Col span={8}>
                        <Text>
                            Кол-во узлов в сервисе:{" "}
                            <Text type="warning" strong>
                                {nodes.reduce((sum, node) => (sum += node.state === 1 ? 1 : 0), 0)}
                            </Text>
                        </Text>
                    </Col>
                    <Col span={8}>
                        <Text>
                            Кол-во неисправных узлов:{" "}
                            <Text type="danger" strong>
                                {nodes.reduce((sum, node) => (sum += node.state === 2 ? 1 : 0), 0)}
                            </Text>
                        </Text>
                    </Col>
                </Row>
            )}
            <ModelGraph
                nodesInColumn={nodesInColumn}
                isStartedModel={isStart}
                onModelChange={(nodes) => setNodes(nodes)}
            />
        </Layout.Content>
    )
}

export default App
