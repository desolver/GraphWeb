import React, { useState } from "react"
import useConfigGraph from "./hooks/useConfigGraph"
import ModelGraph from "./components/ModelGraph"
import { Layout, Row, Col, Button, Spin, Form, InputNumber, Typography, Divider, Collapse } from "antd"
import { LoadingOutlined } from "@ant-design/icons"
import { exportToDocx } from "./helpers/exportHelper"
import "./App.css"
Spin.setDefaultIndicator(<LoadingOutlined style={{ fontSize: 24 }} spin />)

const { Title } = Typography
const { Panel } = Collapse

const App = () => {
    const { configure, loading } = useConfigGraph()

    const [isStart, setIsStart] = useState(false)
    const [isConfig, setIsConfig] = useState(false)
    const [nodesInColumn, setNodesInCoumn] = useState(5)

    const [startConfig, setStartConfig] = useState()
    const [currentState, setCurrentState] = useState()

    const [time, setTime] = useState(100)
    const [interval, setInterval] = useState(1000)

    const configHandler = (data) => {
        console.log(data)
        const nodeCount = data.workingNodeCount + data.serviceNodeCount + data.defectiveNodeCount

        const params = {
            NodeCount: nodeCount,
            WorkingNodeCount: data.workingNodeCount,
            ServiceNodeCount: data.serviceNodeCount,
            DefectiveNodeCount: data.defectiveNodeCount,
            WorkingTimeMilliseconds: data.workingTimeMilliseconds,
            ServiceTimeMilliseconds: data.serviceTimeMilliseconds,
            RepairTimeMilliseconds: data.repairTimeMilliseconds,
            ResourceCount: data.resourceCount,
            ServicePrice: data.servicePrice,
        }

        const nodesInColumn = Math.round(Math.sqrt(nodeCount) / 2)
        setNodesInCoumn(nodesInColumn)

        configure(params).then(() => {
            setStartConfig(params)
            setIsConfig(true)
        })
    }

    const startHandler = () => {
        setIsStart(true)
    }

    const changeModel = (data) => {
        setCurrentState(data)
    }

    return (
        <Layout.Content>
            <Row style={{ width: "80vw", margin: "20px auto" }}>
                <Collapse style={{ width: "100%" }} defaultActiveKey={"1"}>
                    <Panel header="Параметры модели" key="1">
                        <Form onFinish={configHandler} style={{ width: "100%", padding: "20px" }}>
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
                                        label="Кол-во времени в работе (Тг)"
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
                                        label="Кол-во времени в сервисе (Тo)"
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
                                        label="Время обслуживания (Тp)"
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
                                        label="Кол-во ресурсов на один узел"
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
                            <Divider />
                            <Row justify="space-between">
                                <Col span={12}>
                                    <Form.Item label="Время моделирования (единиц времени)">
                                        <InputNumber onChange={(v) => setTime(v)} value={time} />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label="Частота обновления модели (кол-во мс)">
                                        <InputNumber onChange={(v) => setInterval(v)} value={interval} />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Divider />
                            <Form.Item>
                                <Row justify="space-between">
                                    <Button disabled={isConfig} loading={loading} type="primary" htmlType="submit">
                                        Сконфигурировать модель
                                    </Button>

                                    <Button type="primary" onClick={() => exportToDocx(startConfig, currentState)}>
                                        Экспорт в docx
                                    </Button>
                                </Row>
                            </Form.Item>
                        </Form>
                    </Panel>
                </Collapse>
            </Row>

            <ModelGraph
                nodesInColumn={nodesInColumn}
                isStartedModel={isStart}
                isConfig={isConfig}
                time={time}
                interval={interval}
                changeModel={(data) => changeModel(data)}
                startModel={() => startHandler()}
                stopModel={() => setIsStart(false)}
            />
        </Layout.Content>
    )
}

export default App
