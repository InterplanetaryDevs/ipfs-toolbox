import { Card, CardContent, CardHeader, CircularProgress, Stack } from '@mui/material';
import Chart from 'chart.js/auto';
import React, { useEffect, useRef, useState } from 'react';
import { ConnectionChecker } from '../components/ConnectionChecker';
import { ToolContainer } from '../components/ToolContainer';
import { useIpfs } from '../context/IpfsContext';
import { useEffectCancel } from '../hooks/UseEffectCancel';


export default function StatusTool() {
	const [idInfo, setIdInfo] = useState<any>();
	const ipfs = useIpfs();

	useEffectCancel((signal) => {
		ipfs.node.id({ signal }).then(setIdInfo);
	}, []);

	return <ConnectionChecker context={ipfs}>
		<ToolContainer>
			<Stack spacing={2}>
				<Card>
					<CardContent>
						{idInfo ? <>
							<p>Id: {idInfo.id.toString()}</p>
							<p>Version: {idInfo.agentVersion}</p>
							<p>Addresses: <ul>{idInfo.addresses?.map((i: any) => <li>{i.toString()}</li>)}</ul></p>
						</> : <CircularProgress />}
					</CardContent>
				</Card>
				<Card>
					<CardHeader title={'Network'} />
					<CardContent>
						<ConnectionChart />
					</CardContent>
				</Card>
			</Stack>
		</ToolContainer>
	</ConnectionChecker>;
}

function ConnectionChart() {
	const { node } = useIpfs();
	const chartRef = useRef<HTMLCanvasElement>(null);
	const [chart, setChart] = useState<Chart>();

	// Load stats
	useEffectCancel((signal) => {
		if (chart) {
			(async () => {
				for await (const item of node.stats.bw({ signal, interval: '1s', poll: true })) {
					chart.data.labels!.push(new Date(Date.now()).toLocaleTimeString());
					chart.data.datasets[0].data.push(item.rateIn);
					chart.data.datasets[1].data.push(-item.rateOut);
					chart.update();
				}
			})();
		}
	}, [chart]);

	// Render graph
	useEffect(() => {
		let chart: Chart;
		if (chartRef.current) {
			chart = new Chart(chartRef.current, {
				type: 'line',
				data: {
					labels: [],
					datasets: [
						{
							label: 'In',
							fill: true,
							tension: 0.3,
							data: [],
						},
						{
							label: 'Out',
							fill: true,
							tension: 0.3,
							data: [],
						},
					],
				},
				options: {
					interaction: {
						mode: 'index',
						intersect: false,
					},
					scales: {
						y: {
							suggestedMax: 1_000_000,
							suggestedMin: -1_000_000,
							ticks: {
								callback: (value) => formatBytes(value),
							},
						}
					},
					plugins: {
						tooltip: {
							callbacks: {
								label: (context) => context.dataset.label ? `${context.dataset.label}: ${formatBytes(context.parsed.y)}` : formatBytes(context.parsed.y),
							},
						},
						decimation: {
							algorithm: 'lttb',
							enabled: true,
							samples: 100,
							threshold: 100,
						}
					},
				},
			});
			setChart(chart);
		}

		return () => {
			chart?.destroy();
		};
	}, []);

	return <canvas ref={chartRef} />;
}

function formatBytes(value: number | string | null): string {
	return typeof value === 'number' ? `${(value / 1024 / 1024).toFixed(1)} MiB/s` : (value ?? '');
}
