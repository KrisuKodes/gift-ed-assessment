import { Center, Paper, Stack, Badge, Group, Text, Box, Card } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useDrag, useDrop } from 'react-dnd';

import styles from '../../styles/Home.module.scss';

const DraggableBadge = ({ text, color }: { text: string; color: string }) => {
    const [{ isDragging }, dragRef] = useDrag(
        () => ({
            type: 'badge',
            item: { text },
            collect: (monitor) => ({
                isDragging: !!monitor.isDragging(),
            }),
        }),
        []
    );
    return (
        <Badge
            ref={dragRef}
            size="xl"
            radius="md"
            color={color}
            style={{ opacity: isDragging ? 0.5 : 1, cursor: 'pointer' }}>
            {text}
        </Badge>
    );
};

const DroppableBox = ({
    backgroundColor,
    message,
}: {
    backgroundColor: string;
    message: string;
}) => {
    const [_, drop] = useDrop(() => ({
        accept: 'badge',
        drop: () =>
            showNotification({
                title: "You've triggered:",
                message: message,
            }),
    }));

    return <div ref={drop} className={styles.chartItem} style={{ backgroundColor }}></div>;
};

const ChartLabel = ({ text }: { text: string }) => (
    <Center className={styles.chartItem}>
        <Text size="sm">{text}</Text>
    </Center>
);

export default function Home() {
    return (
        <Center className={styles.container}>
            <DndProvider backend={HTML5Backend}>
                <Stack>
                    <Paper shadow="xs" radius="md" p="md">
                        <Group>
                            <DraggableBadge text="RISK" color="red" />
                            <DraggableBadge text="SAMPLE" color="orange" />
                            <DraggableBadge text="TEST" color="blue" />
                        </Group>
                    </Paper>
                    <Paper shadow="xs" radius="md" p={40}>
                        <Box>
                            <Group style={{ height: '100%' }}>
                                <Stack spacing={5}>
                                    <Center className={styles.chartItem}>
                                        <Text weight="bold" align="right" size="sm">
                                            SEVERITY OF THE IMPACT
                                        </Text>
                                    </Center>
                                    <Group spacing={5}>
                                        <ChartLabel text="Catastrophic" />
                                        <DroppableBox
                                            backgroundColor="#70D1D0"
                                            message="Catastrophic and Improbable"
                                        />
                                        <DroppableBox
                                            backgroundColor="#52B5B5"
                                            message="Catastrophic and Remote"
                                        />
                                        <DroppableBox
                                            backgroundColor="#339A9A"
                                            message="Catastrophic and Occasional"
                                        />
                                        <DroppableBox
                                            backgroundColor="#339A9A"
                                            message="Catastrophic and Probable"
                                        />
                                        <DroppableBox
                                            backgroundColor="#339A9A"
                                            message="Catastrophic and Frequent"
                                        />
                                    </Group>
                                    <Group spacing={5}>
                                        <ChartLabel text="Significant" />
                                        <DroppableBox
                                            backgroundColor="#70D1D0"
                                            message="Significant and Improbable"
                                        />
                                        <DroppableBox
                                            backgroundColor="#52B5B5"
                                            message="Significant and Remote"
                                        />
                                        <DroppableBox
                                            backgroundColor="#52B5B5"
                                            message="Significant and Occasional"
                                        />
                                        <DroppableBox
                                            backgroundColor="#339A9A"
                                            message="Significant and Probable"
                                        />
                                        <DroppableBox
                                            backgroundColor="#339A9A"
                                            message="Significant and Frequent"
                                        />
                                    </Group>
                                    <Group spacing={5}>
                                        <ChartLabel text="Moderate" />
                                        <DroppableBox
                                            backgroundColor="#8CEEED"
                                            message="Moderate and Improbable"
                                        />
                                        <DroppableBox
                                            backgroundColor="#70D1D0"
                                            message="Moderate and Remote"
                                        />
                                        <DroppableBox
                                            backgroundColor="#52B5B5"
                                            message="Moderate and Occasional"
                                        />
                                        <DroppableBox
                                            backgroundColor="#52B5B5"
                                            message="Moderate and Probable"
                                        />
                                        <DroppableBox
                                            backgroundColor="#339A9A"
                                            message="Moderate and Frequent"
                                        />
                                    </Group>
                                    <Group spacing={5}>
                                        <ChartLabel text="Low" />
                                        <DroppableBox
                                            backgroundColor="#8CEEED"
                                            message="Low and Improbable"
                                        />
                                        <DroppableBox
                                            backgroundColor="#8CEEED"
                                            message="Low and Remote"
                                        />
                                        <DroppableBox
                                            backgroundColor="#70D1D0"
                                            message="Low and Occasional"
                                        />
                                        <DroppableBox
                                            backgroundColor="#52B5B5"
                                            message="Low and Probable"
                                        />
                                        <DroppableBox
                                            backgroundColor="#52B5B5"
                                            message="Low and Frequent"
                                        />
                                    </Group>
                                    <Group spacing={5}>
                                        <ChartLabel text="Negligible" />
                                        <DroppableBox
                                            backgroundColor="#8CEEED"
                                            message="Negligible and Improbable"
                                        />
                                        <DroppableBox
                                            backgroundColor="#8CEEED"
                                            message="Negligible and Remote"
                                        />
                                        <DroppableBox
                                            backgroundColor="#8CEEED"
                                            message="Negligible and Occasional"
                                        />
                                        <DroppableBox
                                            backgroundColor="#70D1D0"
                                            message="Negligible and Probable"
                                        />
                                        <DroppableBox
                                            backgroundColor="#70D1D0"
                                            message="Negligible and Frequent"
                                        />
                                    </Group>
                                    <Group spacing={5}>
                                        <div className={styles.chartItem} />
                                        <ChartLabel text="Improbable" />
                                        <ChartLabel text="Remote" />
                                        <ChartLabel text="Occasional" />
                                        <ChartLabel text="Probable" />
                                        <ChartLabel text="Frequent" />
                                    </Group>
                                </Stack>
                                <Stack mt={80} justify="space-between" spacing={220}>
                                    <Card shadow="sm" p="lg" radius="md" withBorder>
                                        <Text weight="bold" mb={5}>
                                            RISK LEVEL
                                        </Text>
                                        <Group>
                                            <Stack>
                                                <div className={styles.riskLevelBar} />
                                            </Stack>
                                            <Stack spacing={50}>
                                                <Text>High risk, urgent action required.</Text>
                                                <Text>Low risk, no action required.</Text>
                                            </Stack>
                                        </Group>
                                    </Card>
                                    <Center className={styles.chartItem}>
                                        <Text weight="bold" align="left" size="sm">
                                            LIKELIHOOD OF OCCURRENCE
                                        </Text>
                                    </Center>
                                </Stack>
                            </Group>
                        </Box>
                    </Paper>
                </Stack>
            </DndProvider>
        </Center>
    );
}
