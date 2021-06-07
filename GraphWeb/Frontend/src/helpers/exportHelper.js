import { Document, Packer, Paragraph, HeadingLevel, TableRow, TableCell, Table, ImageRun } from "docx"
import { saveAs } from "file-saver"

export const exportToDocx = (startConfig, currentState) => {
    const imageBase64 = getCanvasImage()

    const doc = new Document({
        styles: {
            default: {
                heading1: {
                    run: {
                        size: 32,
                        bold: true,
                        italics: false,
                        color: "000000",
                    },
                    paragraph: {
                        spacing: {
                            after: 240,
                            before: 150,
                        },
                    },
                },
                heading2: {
                    run: {
                        size: 26,
                        bold: false,
                        italics: false,
                        color: "2E74B5",
                    },
                    paragraph: {
                        spacing: {
                            after: 150,
                            before: 250,
                        },
                    },
                },
            },
            paragraphStyles: [
                {
                    id: "p",
                    name: "paragraph",
                    basedOn: "Normal",
                    next: "Normal",
                    quickFormat: true,
                    run: {
                        size: 24,
                        color: "000000",
                    },
                },
            ],
        },
        sections: [
            {
                properties: {},
                children: [
                    new Paragraph({
                        text: "Начальные параметры модели",
                        heading: HeadingLevel.HEADING_1,
                    }),

                    new Paragraph({
                        text: "Начальное кол-во узлов",
                        heading: HeadingLevel.HEADING_2,
                    }),

                    new Table({
                        rows: [
                            new TableRow({
                                children: [
                                    new TableCell({
                                        children: [new Paragraph({ text: "Кол-во работающих узлов (Su)", style: "p" })],
                                    }),
                                    new TableCell({
                                        children: [new Paragraph({ text: "Кол-во узлов в сервисе (So)", style: "p" })],
                                    }),
                                    new TableCell({
                                        children: [new Paragraph({ text: "Кол-во дефектных узлов (Sh)", style: "p" })],
                                    }),
                                ],
                            }),
                            new TableRow({
                                children: [
                                    new TableCell({
                                        children: [
                                            new Paragraph({ text: `${startConfig.WorkingNodeCount}`, style: "p" }),
                                        ],
                                    }),
                                    new TableCell({
                                        children: [
                                            new Paragraph({ text: `${startConfig.ServiceNodeCount}`, style: "p" }),
                                        ],
                                    }),
                                    new TableCell({
                                        children: [
                                            new Paragraph({ text: `${startConfig.DefectiveNodeCount}`, style: "p" }),
                                        ],
                                    }),
                                ],
                            }),
                        ],
                    }),

                    new Paragraph({
                        text: "Параметры времени",
                        heading: HeadingLevel.HEADING_2,
                    }),

                    new Table({
                        rows: [
                            new TableRow({
                                children: [
                                    new TableCell({
                                        children: [
                                            new Paragraph({
                                                text: "Кол-во времени в работе в секундах (Тг)",
                                                style: "p",
                                            }),
                                        ],
                                    }),
                                    new TableCell({
                                        children: [
                                            new Paragraph({
                                                text: "Кол-во времени в сервисе в секундах (Тo)",
                                                style: "p",
                                            }),
                                        ],
                                    }),
                                    new TableCell({
                                        children: [
                                            new Paragraph({ text: "Время обслуживания в секундах (Тp)", style: "p" }),
                                        ],
                                    }),
                                ],
                            }),
                            new TableRow({
                                children: [
                                    new TableCell({
                                        children: [
                                            new Paragraph({
                                                text: `${startConfig.WorkingTimeMilliseconds}`,
                                                style: "p",
                                            }),
                                        ],
                                    }),
                                    new TableCell({
                                        children: [
                                            new Paragraph({
                                                text: `${startConfig.ServiceTimeMilliseconds}`,
                                                style: "p",
                                            }),
                                        ],
                                    }),
                                    new TableCell({
                                        children: [
                                            new Paragraph({
                                                text: `${startConfig.RepairTimeMilliseconds}`,
                                                style: "p",
                                            }),
                                        ],
                                    }),
                                ],
                            }),
                        ],
                    }),

                    new Paragraph({
                        text: "Настройки ресурсов",
                        heading: HeadingLevel.HEADING_2,
                    }),

                    new Table({
                        rows: [
                            new TableRow({
                                children: [
                                    new TableCell({
                                        children: [new Paragraph({ text: "Кол-во ресурсов на один узел", style: "p" })],
                                    }),

                                    new TableCell({
                                        children: [new Paragraph({ text: "Стоимость обслуживания (Ro)", style: "p" })],
                                    }),
                                ],
                            }),
                            new TableRow({
                                children: [
                                    new TableCell({
                                        children: [new Paragraph({ text: `${startConfig.ResourceCount}`, style: "p" })],
                                    }),

                                    new TableCell({
                                        children: [new Paragraph({ text: `${startConfig.ServicePrice}`, style: "p" })],
                                    }),
                                ],
                            }),
                        ],
                    }),

                    new Paragraph({
                        text: "Параметры на конец моделирования",
                        heading: HeadingLevel.HEADING_1,
                    }),

                    new Table({
                        rows: [
                            new TableRow({
                                children: [
                                    new TableCell({
                                        children: [new Paragraph({ text: "Кол-во работающих узлов (Su)", style: "p" })],
                                    }),
                                    new TableCell({
                                        children: [new Paragraph({ text: "Кол-во узлов в сервисе (So)", style: "p" })],
                                    }),
                                    new TableCell({
                                        children: [new Paragraph({ text: "Кол-во дефектных узлов (Sh)", style: "p" })],
                                    }),
                                    new TableCell({
                                        children: [new Paragraph({ text: "Остаток ресурсов", style: "p" })],
                                    }),
                                    new TableCell({
                                        children: [new Paragraph({ text: "Прошедшее время", style: "p" })],
                                    }),
                                ],
                            }),
                            new TableRow({
                                children: [
                                    new TableCell({
                                        children: [
                                            new Paragraph({ text: `${currentState.workingNodeCount}`, style: "p" }),
                                        ],
                                    }),
                                    new TableCell({
                                        children: [
                                            new Paragraph({ text: `${currentState.serviceNodeCount}`, style: "p" }),
                                        ],
                                    }),
                                    new TableCell({
                                        children: [
                                            new Paragraph({ text: `${currentState.defectiveNodeCount}`, style: "p" }),
                                        ],
                                    }),
                                    new TableCell({
                                        children: [
                                            new Paragraph({ text: `${currentState.resourceCount}`, style: "p" }),
                                        ],
                                    }),
                                    new TableCell({
                                        children: [new Paragraph({ text: `${currentState.elapsedTime}`, style: "p" })],
                                    }),
                                ],
                            }),
                        ],
                    }),

                    new Paragraph({
                        text: "Граф на конец моделирования",
                        heading: HeadingLevel.HEADING_1,
                    }),

                    new Paragraph({
                        children: [
                            new ImageRun({
                                data: imageBase64,
                                transformation: {
                                    width: 850,
                                    height: 300,
                                },
                            }),
                        ],
                    }),
                ],
            },
        ],
    })

    Packer.toBlob(doc).then((blob) => {
        saveAs(blob, "modeling_result.docx")
    })
}

const getCanvasImage = () => {
    const canvas = document.querySelector(".vis-network canvas")

    return canvas.toDataURL("image/png;base64;")
}
